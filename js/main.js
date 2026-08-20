(function () {
  'use strict';

  var AREA_ICONS = {
    '3rd Party Claims':
      '<path d="M7 12h10M12 7v10" /><circle cx="12" cy="12" r="8.25" />',
    'Bail Applications':
      '<rect x="5" y="4" width="14" height="16" rx="1.5" /><path d="M9 9h6M9 13h6M9 17h3" />',
    'Bills of Legal Costs':
      '<path d="M6 5h9l3 3v11H6V5z" /><path d="M15 5v3h3M9 12h6M9 16h4" />',
    'Child Abuse':
      '<circle cx="12" cy="9" r="3.2" /><path d="M5.5 19c1.2-3.2 3.6-4.8 6.5-4.8S17.8 15.8 19 19" />',
    'Civil Rights':
      '<path d="M12 3l8 4v5c0 4.8-3.4 8.2-8 9.7C7.4 20.2 4 16.8 4 12V7l8-4z" />',
    'Company Registrations':
      '<rect x="4" y="8" width="16" height="12" /><path d="M8 8V6h8v2M9 12h2M13 12h2M9 16h2M13 16h2" />',
    Constitutional:
      '<path d="M4 18V7l8-3 8 3v11" /><path d="M4 18h16M9 18v-5h6v5" />',
    'Debtor and Creditor':
      '<circle cx="12" cy="12" r="8.25" /><path d="M12 7v10M9.5 9.5c.6-1 1.5-1.5 2.5-1.5 1.4 0 2.5.8 2.5 2s-1.1 2-2.5 2h-1c-1.4 0-2.5.8-2.5 2s1.1 2 2.5 2c1 0 1.9-.5 2.5-1.5" />',
    'Drunk Driving':
      '<circle cx="8" cy="16" r="2.5" /><circle cx="17" cy="16" r="2.5" /><path d="M4 16h1.5M10.5 16H14M19.5 16H21M6 12l2-5h7l3 5" />',
    'Immigration / Emigration':
      '<circle cx="12" cy="12" r="8.25" /><path d="M3.5 12h17M12 3.5a13 13 0 010 17M12 3.5a13 13 0 000 17" />',
    'Labour Law':
      '<path d="M8 10V7a4 4 0 018 0v3" /><rect x="5" y="10" width="14" height="10" rx="1.5" />',
    'Litigation (Civil)':
      '<path d="M12 4v3M8 21h8M10 7h4l3 7H7l3-7zM9 14l-2 7M15 14l2 7" />',
    'Partnership Agreements':
      '<circle cx="9" cy="10" r="3" /><circle cx="15" cy="10" r="3" /><path d="M4.5 19c1-3 3-4.5 4.5-4.5S12 16 13 19M11 19c1-3 3-4.5 4.5-4.5S19 16 20 19" />',
    'Privacy Law':
      '<rect x="6" y="10" width="12" height="10" rx="1.5" /><path d="M9 10V8a3 3 0 016 0v2" />',
    'Sale of Business':
      '<path d="M4 10l8-5 8 5v10H4V10z" /><path d="M11 20v-6h2v6" />'
  };

  var AREAS_OF_LAW = Object.keys(AREA_ICONS);

  function renderAreas() {
    var grid = document.getElementById('areas-grid');
    if (!grid) return;
    var html = AREAS_OF_LAW.map(function (area) {
      var paths = AREA_ICONS[area] || '';
      return (
        '<li>' +
        '<span class="areas-grid__icon" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">' +
        paths +
        '</svg>' +
        '</span>' +
        '<span>' +
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
      { threshold: 0.14 }
    );

    Array.prototype.forEach.call(sections, function (section) {
      observer.observe(section);
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
    initForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
