(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const fill = (id, html) => { document.getElementById(id).innerHTML = html; };
  const tags = items => `<div class="tags">${items.map(item => `<span>${escape(item)}</span>`).join('')}</div>`;
  const pad = value => String(value).padStart(2, '0');
  const counter = (index, total) => `${pad(index + 1)} / ${pad(total)}`;
  window.PortfolioUI = { escape, pad };
  document.querySelectorAll('[data-name]').forEach(node => { node.textContent = data.name; });
  document.title = `${data.name} — Customer Success Manager | SaaS & Customer Experience`;
  document.querySelector('meta[property="og:title"]').content = document.title;

  // Value strip: numbered editorial columns.
  fill('pillars', data.pillars.map((item, index) => `<article class="pillar reveal"><div class="pillar-top"><span class="pillar-index" aria-hidden="true">${pad(index + 1)}</span><span class="pillar-icon" aria-hidden="true">${escape(item.icon)}</span></div><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p></article>`).join(''));

  // Experience: a ledger of roles with progressive disclosure.
  fill('timeline', data.roles.map((role, index) => `<article class="role reveal"><div><span class="role-date">${escape(role.dates)}</span><p class="role-company">${escape(role.company)}</p></div><div><h3>${escape(role.title)}</h3><p class="role-summary">${escape(role.summary)}</p><details ${index === 0 ? 'open' : ''}><summary>Explore responsibilities</summary><ul>${role.bullets.map(text => `<li>${escape(text)}</li>`).join('')}</ul></details>${role.metrics.length ? tags(role.metrics) : ''}</div></article>`).join(''));

  // Framework: an expanding rail. Each step is a button so the whole surface is tactile.
  fill('framework', data.framework.map((step, index) => `<button type="button" class="framework-step" data-step="${index}" aria-pressed="${index === 0}"><span class="step-number">${counter(index, data.framework.length)}</span><span class="step-title">${escape(step.title)}</span><span class="step-text">${escape(step.text)}</span></button>`).join(''));

  const art = {
    adoption: '<div class="mini-chart"><div class="mini-chart-top"><span>Feature engagement</span><strong>Trending up ↗</strong></div><div class="bars"><i style="--bar:24%"></i><i style="--bar:38%"></i><i style="--bar:34%"></i><i style="--bar:57%"></i><i style="--bar:72%"></i><i style="--bar:85%"></i><i style="--bar:100%"></i></div></div>',
    retention: '<div class="renewal-art"><span>✓</span><div><strong>Partnership renewed</strong><small>A new chapter of shared success</small></div></div>',
    onboarding: '<div class="onboarding-art"><span><b>✓</b> Align on success</span><span><b>✓</b> Reach the first milestone</span><span><b>↗</b> Realize value, sooner</span></div>'
  };

  // Case studies: an editorial index with a separate live preview panel.
  fill('case-grid', data.cases.map((item, index) => `<article class="case-row reveal" data-case="${index}" data-spot><span class="case-index" aria-hidden="true">${pad(index + 1)}</span><div class="case-main"><p class="eyebrow">${escape(item.category)}</p><h3>${escape(item.title)}</h3><p class="case-description">${escape(item.challenge)}</p></div><div class="case-result"><strong>${escape(item.metric)}</strong><span>${escape(item.metricLabel)}</span></div><button class="text-link case-open" type="button" data-case="${index}" aria-label="Read case study: ${escape(item.subtitle)}" aria-haspopup="dialog">Read Case Study <span aria-hidden="true">↗</span></button></article>`).join(''));
  fill('case-preview', data.cases.map((item, index) => `<div class="case-preview-panel ${escape(item.visual)}" data-case="${index}"${index === 0 ? ' data-active' : ''}>${art[item.visual] || ''}<p class="preview-subtitle">${escape(item.subtitle)}</p><span class="preview-index">${counter(index, data.cases.length)}</span></div>`).join(''));

  // Impact: a night-mode ledger. Counters animate in app.js.
  fill('metrics', data.metrics.map((metric, index) => {
    const formatted = `${metric.prefix || ''}${metric.value.toFixed(metric.decimals || 0)}${metric.suffix || ''}`;
    return `<article class="metric" data-spot><div class="metric-top"><strong class="counter" data-metric="${index}" aria-label="${escape(formatted)}"><span aria-hidden="true">${escape(formatted)}</span></strong><svg viewBox="0 0 120 40" aria-hidden="true"><polyline points="${escape(metric.points)}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></div><h3>${escape(metric.label)}</h3><p>${escape(metric.caption)}</p></article>`;
  }).join(''));

  fill('skills-grid', data.skills.map((skill, index) => `<article class="skill-card reveal"><div class="skill-top"><span class="skill-index" aria-hidden="true">${pad(index + 1)}</span><span class="skill-icon" aria-hidden="true">${escape(skill.icon)}</span></div><h3>${escape(skill.title)}</h3><p>${escape(skill.description)}</p>${tags(skill.items)}</article>`).join(''));
  fill('journey-stages', data.journey.map((stage, index) => `<button type="button" class="journey-stage" data-stage="${index}" aria-pressed="${index === 2}" aria-controls="journey-detail">${escape(stage.title)}</button>`).join(''));
  fill('testimonials-grid', data.testimonials.map((item, index) => `<article class="testimonial-card"><div class="testimonial-top"><span class="quote-mark" aria-hidden="true">“</span><span class="testimonial-index" aria-hidden="true">${counter(index, data.testimonials.length)}</span></div><blockquote>${escape(item.quote)}</blockquote><div class="testimonial-author"><span class="avatar" aria-hidden="true">${escape(item.initials)}</span><div><strong>${escape(item.name)}</strong><small>${escape(item.role)}</small></div></div></article>`).join(''));

  const verified = data.credentials.filter(item => item.verified === true);
  document.getElementById('credentials').hidden = verified.length === 0;
  fill('credentials-grid', verified.map(item => `<article class="credential"><h3>${escape(item.name)}</h3><p>${escape(item.issuer)} · ${escape(item.year)}</p></article>`).join(''));

  document.getElementById('insights').hidden = !data.showInsights;
  fill('insights-grid', data.insights.map((item, index) => `<article class="insight-card reveal" data-spot><div class="insight-meta"><p class="eyebrow">${escape(item.category)}</p><span>${escape(item.readingTime)}</span><time datetime="${escape(item.date)}">${escape(new Date(`${item.date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }))}</time></div><div class="insight-body"><h3>${escape(item.title)}</h3><p>${escape(item.excerpt)}</p></div><button class="text-link article-open" type="button" data-article="${index}" aria-label="Read article: ${escape(item.title)}" aria-haspopup="dialog">Read article <span aria-hidden="true">↗</span></button></article>`).join(''));
})();
