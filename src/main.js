import './style.css';

const practiceAreas = [
  {
    title: 'Commercial Law',
    body: 'Company formation, contracts, shareholder agreements and day-to-day advisory for growing businesses.',
  },
  {
    title: 'Property & Conveyancing',
    body: 'Transfers, bond registrations, leases and property disputes handled with precision and care.',
  },
  {
    title: 'Family Law',
    body: 'Divorce, maintenance, custody and estate planning approached with sensitivity and discretion.',
  },
  {
    title: 'Litigation & Disputes',
    body: 'Strategic representation in the Magistrate\u2019s and High Courts, arbitration and mediation.',
  },
];

const team = [
  {
    name: 'Xolani Lekoma',
    role: 'Founding Attorney',
    bio: 'Leads the firm\u2019s commercial and litigation practice with 15+ years at the bar.',
  },
  {
    name: 'Naledi Mokoena',
    role: 'Senior Associate',
    bio: 'Specialises in property law and conveyancing across Gauteng.',
  },
  {
    name: 'Sipho Dlamini',
    role: 'Associate',
    bio: 'Focuses on family law and dispute resolution with a client-first approach.',
  },
];

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function renderCards(containerId, items, renderItem) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items.map(renderItem).join('');
}

renderCards(
  'practice-cards',
  practiceAreas,
  (area) => `
    <article class="card">
      <h3>${area.title}</h3>
      <p>${area.body}</p>
    </article>
  `
);

renderCards(
  'team-cards',
  team,
  (member) => `
    <article class="card card-person">
      <div class="avatar" aria-hidden="true">${initials(member.name)}</div>
      <h3>${member.name}</h3>
      <p class="role">${member.role}</p>
      <p>${member.bio}</p>
    </article>
  `
);

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const form = document.getElementById('contact-form');
const successEl = document.getElementById('form-success');

const validators = {
  name: (value) => (value.trim().length >= 2 ? '' : 'Please enter your full name.'),
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
      ? ''
      : 'Please enter a valid email address.',
  area: (value) => (value ? '' : 'Please choose an area of law.'),
  message: (value) =>
    value.trim().length >= 10
      ? ''
      : 'Please give us a little more detail (at least 10 characters).',
};

function setError(field, message) {
  const errorEl = form.querySelector(`[data-error-for="${field}"]`);
  const input = form.elements[field];
  if (errorEl) errorEl.textContent = message;
  if (input) input.classList.toggle('invalid', Boolean(message));
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    for (const [field, validate] of Object.entries(validators)) {
      const value = form.elements[field]?.value ?? '';
      const message = validate(value);
      setError(field, message);
      if (message) isValid = false;
    }

    if (!isValid) {
      successEl.hidden = true;
      return;
    }

    successEl.hidden = false;
    form.reset();
    successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  form.addEventListener('input', (event) => {
    const field = event.target.name;
    if (field && validators[field]) {
      setError(field, validators[field](event.target.value));
    }
  });
}
