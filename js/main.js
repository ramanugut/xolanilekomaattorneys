(function () {
  'use strict';

  var AREA_ICONS = {
    '3rd Party Claims':
      '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />',
    'Bail Applications':
      '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" />',
    'Bills of Legal Costs':
      '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5M12 9h4" />',
    'Child Abuse':
      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><circle cx="12" cy="10" r="3" />',
    'Civil Rights':
      '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />',
    'Company Registrations':
      '<rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />',
    Constitutional:
      '<path d="M3 21h18M3 7h18M6 7v14M10 7v14M14 7v14M18 7v14M12 3l9 4H3l9-4z" />',
    'Debtor and Creditor':
      '<rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 12h12M12 8v8" />',
    'Drunk Driving':
      '<circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2M8 16h8" />',
    'Immigration / Emigration':
      '<circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />',
    'Labour Law':
      '<rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v3" />',
    'Litigation (Civil)':
      '<path d="M3 6l9-4 9 4v2H3V6zM4 21h16M7 8v13M17 8v13M12 8v13" />',
    'Partnership Agreements':
      '<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />',
    'Privacy Law':
      '<rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />',
    'Sale of Business':
      '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path d="M9 22V12h6v10" />'
  };

  var AREAS_OF_LAW = Object.keys(AREA_ICONS);

  function renderAreas() {
    var grid = document.getElementById('areas-grid');
    if (!grid) return;
    var html = AREAS_OF_LAW.map(function (area, index) {
      var paths = AREA_ICONS[area] || '<circle cx="12" cy="12" r="8" />';
      return (
        '<li style="--i: ' + index + '">' +
        '<span class="areas-grid__icon" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        paths +
        '</svg>' +
        '</span>' +
        '<span class="areas-grid__label">' +
        area +
        '</span>' +
        '</li>'
      );
    }).join('');
    grid.innerHTML = html;
  }

  function setYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function initHeader() {
    var header = document.getElementById('site-header');
    var toggle = document.getElementById('menu-toggle');
    if (!header) return;

    var onScroll = function () {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = header.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        var label = toggle.querySelector('.sr-only');
        if (label) label.textContent = open ? 'Close menu' : 'Open menu';
      });
    }

    var mobileLinks = document.querySelectorAll('#mobile-nav a');
    Array.prototype.forEach.call(mobileLinks, function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initReveal() {
    var sections = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(sections, function (section) {
        section.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    Array.prototype.forEach.call(sections, function (section) {
      observer.observe(section);
    });
  }

  function initCallbackForm() {
    var form = document.getElementById('callback-form');
    var note = document.getElementById('cb-note');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var nameEl = document.getElementById('cb-name');
      var phoneEl = document.getElementById('cb-phone');
      var matterEl = document.getElementById('cb-matter');

      var name = nameEl ? nameEl.value.trim() : '';
      var phone = phoneEl ? phoneEl.value.trim() : '';
      var matter = matterEl ? matterEl.value : '';

      var valid = true;

      function setFieldErr(fieldId, msg) {
        var errEl = form.querySelector('[data-error-for="' + fieldId + '"]');
        var inputEl = document.getElementById(fieldId);
        if (errEl) errEl.textContent = msg;
        if (inputEl) {
          if (msg) inputEl.classList.add('is-invalid');
          else inputEl.classList.remove('is-invalid');
        }
      }

      if (name.length < 2) {
        setFieldErr('cb-name', 'Please enter your name.');
        valid = false;
      } else {
        setFieldErr('cb-name', '');
      }

      if (phone.length < 7) {
        setFieldErr('cb-phone', 'Please enter a valid phone number.');
        valid = false;
      } else {
        setFieldErr('cb-phone', '');
      }

      if (!matter) {
        setFieldErr('cb-matter', 'Please choose a matter.');
        valid = false;
      } else {
        setFieldErr('cb-matter', '');
      }

      if (!valid) return;

      if (note) note.hidden = false;

      var subject = encodeURIComponent('URGENT: Call Back Request from ' + name);
      var body = encodeURIComponent(
        'CALL BACK REQUEST\n\n' +
          'Name: ' + name + '\n' +
          'Phone: ' + phone + '\n' +
          'Matter: ' + matter + '\n\n' +
          'Please call me back at your earliest convenience.'
      );

      setTimeout(function () {
        window.location.href =
          'mailto:xolanie2@gmail.com?subject=' + subject + '&body=' + body;
      }, 350);
    });

    ['cb-name', 'cb-phone', 'cb-matter'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', function () {
          var errEl = form.querySelector('[data-error-for="' + id + '"]');
          if (errEl) errEl.textContent = '';
          el.classList.remove('is-invalid');
        });
      }
    });
  }

  function initForm() {
    var form = document.getElementById('contact-form');
    var note = document.getElementById('form-note');
    if (!form) return;

    var validators = {
      name: function (v) {
        return v.trim().length >= 2 ? '' : 'Please enter your full name.';
      },
      email: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
          ? ''
          : 'Please enter a valid email address.';
      },
      matter: function (v) {
        return v ? '' : 'Please choose an area of law.';
      },
      message: function (v) {
        return v.trim().length >= 10
          ? ''
          : 'Please give us a little more detail (at least 10 characters).';
      }
    };

    function setError(field, message) {
      var input = form.elements[field];
      var errorEl = form.querySelector('[data-error-for="' + field + '"]');
      if (errorEl) errorEl.textContent = message;
      if (input) {
        if (message) {
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;
      var values = {};

      Object.keys(validators).forEach(function (field) {
        var el = form.elements[field];
        var value = el ? el.value : '';
        values[field] = value;
        var message = validators[field](value);
        setError(field, message);
        if (message) valid = false;
      });

      if (!valid) {
        if (note) note.hidden = true;
        return;
      }

      var subject = encodeURIComponent(
        'Consultation request from ' + (values.name.trim() || 'website visitor')
      );
      var body = encodeURIComponent(
        'Name: ' + values.name.trim() + '\n' +
          'Email: ' + values.email.trim() + '\n' +
          'Area of law: ' + values.matter + '\n\n' +
          values.message.trim()
      );

      if (note) note.hidden = false;
      window.location.href =
        'mailto:xolanie2@gmail.com?subject=' + subject + '&body=' + body;
    });

    form.addEventListener('input', function (event) {
      var field = event.target.name;
      if (field && validators[field]) {
        setError(field, validators[field](event.target.value));
      }
    });
  }

  function init() {
    renderAreas();
    setYear();
    initHeader();
    initReveal();
    initCallbackForm();
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
