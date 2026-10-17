const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const html = read('index.html');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
function loadData() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(read('portfolio-data.js'), context);
  return context.window.PORTFOLIO;
}
function render(data) {
  const nodes = Object.fromEntries(ids.map(id => [id, { innerHTML: '', hidden: false }]));
  const names = [{ textContent: '' }, { textContent: '' }];
  const meta = {};
  const document = {
    title: '',
    getElementById(id) { return nodes[id] || null; },
    querySelectorAll(selector) { assert.equal(selector, '[data-name]'); return names; },
    querySelector(selector) { assert.equal(selector, 'meta[property="og:title"]'); return meta; }
  };
  const context = vm.createContext({ window: { PORTFOLIO: data }, document });
  vm.runInContext(read('portfolio-render.js'), context);
  return { nodes, names, document, meta };
}
test('all application scripts parse', () => {
  for (const file of ['portfolio-data.js', 'portfolio-render.js', 'app.js']) {
    assert.doesNotThrow(() => new vm.Script(read(file), { filename: file }));
  }
});
test('local scripts and stylesheet exist; scripts load in dependency order', () => {
  const scripts = [...html.matchAll(/<script defer src="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(scripts, ['portfolio-data.js', 'portfolio-render.js', 'app.js']);
  for (const file of [...scripts, 'styles.css']) assert.ok(read(file).length > 100);
});
test('static IDs are unique and navigation anchors resolve', () => {
  assert.equal(new Set(ids).size, ids.length);
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]), match[1]);
});
test('all interaction DOM references exist in the static document', () => {
  for (const match of read('app.js').matchAll(/byId\('([^']+)'\)/g)) assert.ok(ids.includes(match[1]), match[1]);
});
test('form has labels and cannot submit without JavaScript', () => {
  assert.match(html, /<fieldset id="contact-fields" disabled>/);
  for (const match of html.matchAll(/<(?:input|textarea) id="([^"]+)"/g)) {
    assert.ok(html.includes(`for="${match[1]}"`), `Missing label: ${match[1]}`);
  }
  assert.match(read('app.js'), /event\.preventDefault\(\)/);
  assert.match(read('app.js'), /Nothing was sent or stored/);
});
test('illustrative scenarios have full case study content', () => {
  const data = loadData();
  assert.equal(data.cases.length, 3);
  for (const item of data.cases) {
    for (const key of ['title', 'challenge', 'context', 'strategy', 'collaboration', 'result', 'takeaway']) assert.ok(item[key]);
    assert.ok(item.actions.length >= 3);
    assert.match(item.result, /Illustrative outcome/);
  }
});
test('renders portfolio with clear examples and no unverified credentials', () => {
  const data = loadData();
  const { nodes } = render(data);
  assert.equal(nodes.credentials.hidden, data.credentials.filter(item => item.verified === true).length === 0);
  assert.match(nodes['case-grid'].innerHTML, /class="case-result"/);
  if (nodes['testimonials-grid']) {
    assert.match(nodes['testimonials-grid'].innerHTML, /SAMPLE TESTIMONIAL/);
  }
  assert.doesNotMatch(nodes.metrics.innerHTML, /Placeholder/);
  assert.match(nodes['journey-stages'].innerHTML, /aria-pressed="true"/);
});
test('interactive rails render with a single initial active state', () => {
  const { nodes } = render(loadData());
  if (nodes.framework) {
    assert.equal((nodes.framework.innerHTML.match(/aria-pressed="true"/g) || []).length, 1);
  }
  assert.equal((nodes['case-preview'].innerHTML.match(/ data-active/g) || []).length, 1);
  assert.match(nodes['case-grid'].innerHTML, /class="text-link case-open"/);
  if (nodes['insights-grid']) {
    assert.match(nodes['insights-grid'].innerHTML, /class="text-link article-open"/);
  }
});
test('section chapters and navigation anchors resolve', () => {
  const chapters = [...html.matchAll(/<section[^>]*id="([^"]+)"[^>]*data-chapter="(\d\d)"/g)].map(match => match[1]);
  assert.ok(chapters.length > 0);
  for (const match of html.matchAll(/<nav[^>]*id="navigation"[^>]*>[\s\S]*?<\/nav>/g)) {
    for (const link of match[0].matchAll(/href="#([^"]+)"/g)) assert.ok(chapters.includes(link[1]), link[1]);
  }
});
test('custom names are text and card content is escaped', () => {
  const data = loadData();
  data.name = 'Taylor & Co';
  data.cases[0].title = '<img src=x onerror=alert(1)>';
  const result = render(data);
  assert.equal(result.names[0].textContent, 'Taylor & Co');
  assert.match(result.document.title, /^Taylor & Co/);
  assert.equal(result.meta.content, result.document.title);
  assert.match(result.nodes['case-grid'].innerHTML, /&lt;img/);
  assert.doesNotMatch(result.nodes['case-grid'].innerHTML, /<img/);
});
test('only explicitly verified credentials render; insights can be hidden', () => {
  const data = loadData();
  data.credentials = [
    { name: 'Verified course', issuer: 'Issuer', year: '2026', verified: true },
    { name: 'Unverified course', issuer: 'Issuer', year: '2026', verified: false }
  ];
  data.showInsights = false;
  const { nodes } = render(data);
  assert.equal(nodes.credentials.hidden, false);
  if (nodes.insights) {
    assert.equal(nodes.insights.hidden, true);
  }
  assert.match(nodes['credentials-grid'].innerHTML, /Verified course/);
  assert.doesNotMatch(nodes['credentials-grid'].innerHTML, /Unverified course/);
});
test('stylesheet has balanced blocks and responsive accessibility rules', () => {
  const css = read('styles.css');
  let depth = 0;
  for (const char of css) {
    if (char === '{') depth++;
    if (char === '}') depth--;
    assert.ok(depth >= 0, 'Unexpected closing CSS block');
  }
  assert.equal(depth, 0, 'Unclosed CSS block');
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /max-width:640px/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.chapter-nav\{display:none\}/);
  assert.match(css, /\.js \.reveal\.is-visible/);
  assert.match(css, /#navigation>a:not\(\.button\)\{[^}]*white-space:nowrap/);
  assert.match(css, /\.nav-wrap\{[^}]*display:flex/);
  assert.match(css, /@media print/);
});
