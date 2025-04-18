// const bar = document.getElementById("bar");
// const nav = document.getElementById("navbar");
// const close = document.getElementById("close");

// if (bar) {
//   bar.addEventListener("click", () => {
//     nav.classList.add("active");
//   });
// }

// if (close) {
//   close.addEventListener("click", () => {
//     nav.classList.remove("active");
//   });
// }

const menuIcon = document.getElementById("menu-icon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active"); // Toggle the menu visibility
  menuIcon.classList.toggle("fa-times"); // Change icon to 'X' when open
});

// Ensure it works when resizing back to desktop view
window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    navbar.classList.remove("active"); // Hide menu on desktop
    menuIcon.classList.remove("fa-times");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop(); // Get current page filename
  const menuItems = document.querySelectorAll("#navbar li a");

  menuItems.forEach((item) => {
    if (item.getAttribute("href") === currentPage) {
      item.classList.add("active"); // Add active class to the matching menu item
    } else {
      item.classList.remove("active"); // Remove active class from others
    }
  });
});

  const submitBtn = document.getElementById('newsletter-submit');
  const emailInput = document.getElementById('newsletter-email');

  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
  
    const email = emailInput.value.trim();
  
    if (!email || !email.includes('@')) {
      showSnackbar("Please enter a valid email address.");
      return;
    }
  
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
  
      const data = await res.json();
      showSnackbar(data.message);
  
      emailInput.value = '';
    } catch (err) {
      showSnackbar("Something went wrong. Please try again later.");
      console.error(err);
    }
  });
  

  function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.classList.add("show");
  
    setTimeout(() => {
      snackbar.classList.remove("show");
    }, 3000);
  }
  
  document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
  
    if (!name || !email || !subject || !message) {
      showSnackbar("Please fill in all fields.");
      return;
    }
  
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
  
      const data = await res.json();
      showSnackbar(data.message);
      this.reset();
    } catch (err) {
      console.error(err);
      showSnackbar("Something went wrong. Please try again.");
    }
  });
  