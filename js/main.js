(function () {
  'use strict';

  var AREAS_OF_LAW = [
    '3rd Party Claims',
    'Bail Applications',
    'Bills of Legal Costs',
    'Child Abuse',
    'Civil Rights',
    'Company Registrations',
    'Constitutional',
    'Debtor and Creditor',
    'Drunk Driving',
    'Immigration / Emigration',
    'Labour Law',
    'Litigation (Civil)',
    'Partnership Agreements',
    'Privacy Law',
    'Sale of Business'
  ];

  function renderAreas() {
    var grid = document.getElementById('areas-grid');
    if (!grid) return;
    var html = AREAS_OF_LAW.map(function (area) {
      return '<li>' + area + '</li>';
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
      if (window.scrollY > 24) {
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
      { threshold: 0.18 }
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
