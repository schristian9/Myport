(() => {
  'use strict';
  const data = window.PORTFOLIO;
  const e = window.PortfolioUI.escape;
  const pad = window.PortfolioUI.pad;
  const byId = id => document.getElementById(id);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const EASE = 'cubic-bezier(.16,1,.3,1)';
  document.documentElement.classList.add('js');
  const safeUrl = value => {
    if (!value || typeof value !== 'string') return '';
    try {
      const url = new URL(value, 'https://portfolio.invalid/');
      return ['https:', 'http:'].includes(url.protocol) ? value : '';
    } catch { return ''; }
  };

  // Navigation is a disclosure, not an application-style menu.
  const menu = byId('menu-toggle');
  const navigation = byId('navigation');
  const header = byId('site-header');
  const mobile = window.matchMedia('(max-width: 1000px)');
  const setMenu = open => {
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('open', open);
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenu(false);
    if (mobile.matches) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
      }
    }
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenu(false); menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) setMenu(false);
  });
  header.addEventListener('focusout', event => {
    if (mobile.matches && !header.contains(event.relatedTarget)) setMenu(false);
  });
  mobile.addEventListener('change', () => setMenu(false));

  // Header state and reading progress.
  const progress = byId('scroll-progress');
  let headerTicking = false;
  const updateHeader = () => {
    if (headerTicking) return;
    headerTicking = true;
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--progress', max > 0 ? Math.min(window.scrollY / max, 1).toFixed(4) : '0');
      headerTicking = false;
    });
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);
  updateHeader();

  // Navigation follows the reader.
  const navLinks = [...navigation.querySelectorAll('a[href^="#"]:not(.button)')];
  const setCurrent = (links, test) => links.forEach(link => {
    if (test(link)) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  const setChapter = section => {
    setCurrent(navLinks, link => link.getAttribute('href') === `#${section.id}`);
  };

  // Native modal dialog provides focus containment and Escape dismissal.
  const dialog = byId('detail-dialog');
  let dialogTrigger;
  const openDialog = (kicker, content) => {
    dialogTrigger = document.activeElement;
    byId('dialog-kicker').textContent = kicker;
    byId('dialog-content').innerHTML = content;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
    byId('close-dialog').focus();
  };
  byId('close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (dialogTrigger?.isConnected) dialogTrigger.focus();
  });
  document.querySelectorAll('.case-open').forEach(button => button.addEventListener('click', () => {
    const item = data.cases[Number(button.dataset.case)];
    const sections = [['Context', item.context], ['Customer challenge', item.challenge], ['Strategy', item.strategy]];
    openDialog('CASE STUDY', `<h2 id="dialog-title">${e(item.subtitle)}</h2><p>${e(item.title)}</p>${sections.map(([title, text]) => `<h3>${e(title)}</h3><p>${e(text)}</p>`).join('')}<h3>Actions taken</h3><ul>${item.actions.map(text => `<li>${e(text)}</li>`).join('')}</ul><h3>Cross-functional collaboration</h3><p>${e(item.collaboration)}</p><div class="dialog-result"><strong>${e(item.metric)}</strong><p>${e(item.metricLabel)} · ${e(item.secondary)}</p></div><h3>Result</h3><p>${e(item.result)}</p><h3>The takeaway</h3><p>${e(item.takeaway)}</p>`);
  }));
  document.querySelectorAll('.article-open').forEach(button => button.addEventListener('click', () => {
    const item = data.insights[Number(button.dataset.article)];
    openDialog('EDITORIAL INSIGHT', `<h2 id="dialog-title">${e(item.title)}</h2><p>${e(item.category)} · ${e(item.readingTime)} · ${e(item.date)}</p>${item.paragraphs.map(text => `<p>${e(text)}</p>`).join('')}`);
  }));

  // Case index rows drive the sticky preview; the whole row is a target, the button remains the accessible control.
  const previews = [...document.querySelectorAll('.case-preview-panel')];
  const showPreview = index => previews.forEach(panel => panel.toggleAttribute('data-active', Number(panel.dataset.case) === index));
  document.querySelectorAll('.case-row').forEach(row => {
    const index = Number(row.dataset.case);
    ['mouseenter', 'focusin'].forEach(type => row.addEventListener(type, () => showPreview(index)));
    row.addEventListener('click', event => {
      if (event.target.closest('button, a')) return;
      row.querySelector('.case-open').click();
    });
  });

  document.querySelectorAll('.resume-action').forEach(button => {
    const resume = safeUrl(data.resumeUrl);
    if (resume) {
      const link = document.createElement('a');
      link.className = button.className;
      link.style.cssText = button.style.cssText;
      link.innerHTML = button.innerHTML;
      link.href = resume;
      link.setAttribute('download', '');
      button.replaceWith(link);
    } else {
      button.setAttribute('aria-haspopup', 'dialog');
      button.addEventListener('click', () => openDialog('RESUME NOT YET PROVIDED', '<h2 id="dialog-title">A real story deserves a real resume.</h2><p>This preview does not include a verified resume. Add your resume file and set <code>resumeUrl</code> in <code>portfolio-data.js</code> to enable downloading.</p>'));
    }
  });

  // Shared roving interaction: pointer, keyboard focus, touch and arrow keys.
  const roving = (buttons, select) => buttons.forEach((button, index) => {
    button.addEventListener('click', () => select(index));
    button.addEventListener('focus', () => select(index));
    button.addEventListener('mouseenter', () => select(index));
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') select(index);
    });
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== undefined) { event.preventDefault(); buttons[next].focus(); }
    });
  });

  // Framework rail: the active step expands, the rest fold into their titles.
  const steps = [...document.querySelectorAll('.framework-step')];
  roving(steps, index => steps.forEach((step, i) => step.setAttribute('aria-pressed', String(i === index))));

  // Customer journey: indicator, index and detail follow the selected stage.
  const stages = [...document.querySelectorAll('.journey-stage')];
  const stageList = byId('journey-stages');
  const detail = byId('journey-detail');
  const selectStage = index => {
    const item = data.journey[index];
    stages.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    stageList.style.setProperty('--stage', index);
    byId('journey-stage-index').textContent = `${pad(index + 1)} / ${pad(data.journey.length)}`;
    byId('journey-stage-title').textContent = item.title;
    if (!reduced.matches && detail.animate) detail.animate([{ opacity: .35, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: EASE });
  };
  roving(stages, selectStage);
  if (data.journey && data.journey.length) {
    stageList.style.setProperty('--count', data.journey.length);
    selectStage(Math.min(2, data.journey.length - 1));
  }

  // Testimonials: a snap track with explicit controls on every viewport.
  const carousel = byId('testimonials-grid');
  const moveCarousel = direction => {
    const card = carousel.querySelector('.testimonial-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 24;
    carousel.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reduced.matches ? 'instant' : 'smooth' });
  };
  byId('testimonial-prev').addEventListener('click', () => moveCarousel(-1));
  byId('testimonial-next').addEventListener('click', () => moveCarousel(1));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); moveCarousel(event.key === 'ArrowLeft' ? -1 : 1); }
  });

  // Hero stage: layers drift with the pointer according to their depth.
  const stage = byId('hero-stage');
  const hero = stage.closest('section');
  if (finePointer.matches) {
    let frame;
    hero.addEventListener('pointermove', event => {
      if (reduced.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
        stage.style.setProperty('--px', x.toFixed(3));
        stage.style.setProperty('--py', y.toFixed(3));
      });
    });
    hero.addEventListener('pointerleave', () => {
      stage.style.setProperty('--px', '0');
      stage.style.setProperty('--py', '0');
    });
  }

  // Pointer spotlight for ledger cells and index rows.
  let spotFrame;
  document.addEventListener('pointermove', event => {
    const target = event.target.closest?.('[data-spot]');
    if (!target) return;
    cancelAnimationFrame(spotFrame);
    spotFrame = requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      target.style.setProperty('--sx', `${event.clientX - rect.left}px`);
      target.style.setProperty('--sy', `${event.clientY - rect.top}px`);
    });
  }, { passive: true });

  // Blank contact details never become fake addresses or third-party destinations.
  const email = typeof data.email === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email) ? data.email : '';
  const emailUrl = email ? `mailto:${encodeURIComponent(email)}` : '';
  const linkedin = safeUrl(data.linkedin);
  const calendar = safeUrl(data.calendar);
  const contactItem = (icon, label, value, url) => {
    const isExternal = url && /^https?:/i.test(url);
    const extAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<div class="contact-item"><span class="contact-icon" aria-hidden="true">${e(icon)}</span><div><small>${e(label)}</small>${url ? `<a href="${e(url)}"${extAttrs}>${e(value)} ↗</a>` : `<span>${e(value)}</span>`}</div></div>`;
  };
  byId('contact-links').innerHTML = contactItem('✉', 'EMAIL', email || '[Email address — not provided]', emailUrl) + contactItem('in', 'LINKEDIN', linkedin ? 'Connect on LinkedIn' : '[LinkedIn profile — not provided]', linkedin) + contactItem('⌖', 'LOCATION', data.location || '[Location — not provided]', '') + (calendar ? contactItem('▦', 'CALENDAR', 'Schedule a conversation', calendar) : '');
  if (email) { byId('footer-email').href = emailUrl; byId('footer-email').textContent = 'Email'; }
  if (linkedin) {
    byId('footer-linkedin').href = linkedin;
    byId('footer-linkedin').textContent = 'LinkedIn';
    byId('footer-linkedin').setAttribute('target', '_blank');
    byId('footer-linkedin').setAttribute('rel', 'noopener noreferrer');
  }
  const form = byId('contact-form');
  const status = byId('form-status');
  if (email) byId('form-mode').textContent = 'Prepare an email draft, then send it with your email app. This website does not send messages.';
  const name = byId('contact-name');
  const message = byId('contact-message');
  const validateText = () => {
    name.setCustomValidity(name.value.trim() ? '' : 'Please enter your name.');
    message.setCustomValidity(message.value.trim().length >= 10 ? '' : 'Please enter a message of at least 10 characters.');
  };
  form.addEventListener('input', () => { validateText(); status.replaceChildren(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    validateText();
    if (!form.reportValidity()) return;
    if (!email) {
      status.textContent = 'Demo validation successful. Nothing was sent or stored. Add a real email address in portfolio-data.js to enable email drafts.';
      return;
    }
    const body = `Name: ${name.value.trim()}\nEmail: ${byId('contact-email').value.trim()}\nCompany: ${byId('contact-company').value.trim() || 'Not provided'}\n\n${message.value.trim()}`;
    status.textContent = 'Your email draft is ready. Open your email app to review and send it. No message has been sent yet. ';
    const draft = document.createElement('a');
    draft.href = `${emailUrl}?subject=${encodeURIComponent(`Portfolio enquiry from ${name.value.trim()}`)}&body=${encodeURIComponent(body)}`;
    draft.textContent = 'Open email draft →';
    status.append(draft);
  });
  // The HTML starts disabled so no-JavaScript submission cannot leak form values into a URL.
  byId('contact-fields').disabled = false;

  // Observers: reveals, chapter tracking and counters. Without support, everything is simply visible.
  const reveals = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(node => revealObserver.observe(node));
    const chapterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setChapter(entry.target);
    }), { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[data-chapter]').forEach(section => chapterObserver.observe(section));
    const counters = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counters.unobserve(entry.target);
      if (reduced.matches) return;
      const metric = data.metrics[Number(entry.target.dataset.metric)];
      const output = entry.target.querySelector('span');
      const start = performance.now();
      const tick = now => {
        const progressValue = Math.min((now - start) / 1200, 1);
        const value = metric.value * (1 - Math.pow(1 - progressValue, 3));
        output.textContent = `${metric.prefix || ''}${value.toFixed(metric.decimals || 0)}${metric.suffix || ''}`;
        if (progressValue < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(node => counters.observe(node));
  } else {
    reveals.forEach(node => node.classList.add('is-visible'));
  }
})();
