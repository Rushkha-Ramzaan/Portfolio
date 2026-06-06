// Scroll-triggered reveal animations
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-up').forEach((el) => obs.observe(el));

// Skill bar animation logic
const barObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((bar) => {
          bar.style.width = bar.dataset.w;
        });
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('#skills').forEach((el) => barObs.observe(el));

// Floating navigation scrolled state
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// Mobile menu toggle logic
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('menu-open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('menu-open');
    });
  });
}

// Email CTA Handler (copy to clipboard and show toast)
const emailCta = document.querySelector('.btn-email-cta');
if (emailCta) {
  emailCta.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent opening blank browser tabs or triggering mailto protocol error
    const email = 'rushkharamzaan2001@gmail.com';
    
    // Copy email to clipboard
    const copyToClipboard = (text) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; // Avoid scrolling to bottom
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          document.body.removeChild(textarea);
          return Promise.resolve();
        } catch (err) {
          document.body.removeChild(textarea);
          return Promise.reject(err);
        }
      }
    };

    copyToClipboard(email).then(() => {
      // Create toast container if it doesn't exist
      let toast = document.querySelector('.email-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'email-toast';
        document.body.appendChild(toast);
      }
      toast.textContent = 'Email copied to clipboard!';
      toast.classList.add('show');
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }).catch(err => {
      console.error('Could not copy email address: ', err);
    });
  });
}
