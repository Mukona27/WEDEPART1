// ========================
// Responsive Navbar (Hamburger Menu)
// ========================
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('navLinks');

if (menuIcon && navLinks) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('open');   // Animate hamburger
    navLinks.classList.toggle('active'); // Show/hide menu
  });

  // Optional: close menu if click outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
      navLinks.classList.remove('active');
      menuIcon.classList.remove('open');
    }
  });
}

// ========================
// Password Toggle
// ========================
function togglePassword(el) {
  const input = el.previousElementSibling;
  if (input.type === 'password') {
    input.type = 'text';
    el.textContent = 'Hide Password';
  } else {
    input.type = 'password';
    el.textContent = 'Show Password';
  }
}

// ========================
// Redirect Logged-in Users Away from Login/Register
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const path = window.location.pathname;

  if (loggedInUser && (path.includes('login.html') || path.includes('register.html'))) {
    window.location.href = 'tutorials.html';
  }

  // ========================
  // Tutorials Page Interactivity
  // ========================
  if (path.includes('tutorials.html')) {
    if (!loggedInUser) {
      alert('Please login first!');
      window.location.href = 'login.html';
      return;
    }

    // Welcome message
    const welcomeMsg = document.getElementById('welcome-msg');
    if (welcomeMsg) {
      welcomeMsg.textContent = `Hello ${loggedInUser.name}, select a language to start learning:`;
    }

    // Logout button
    const nav = document.querySelector('nav');
    if (nav) {
      const logoutBtn = document.createElement('button');
      logoutBtn.textContent = 'Logout';
      logoutBtn.className = 'sign-in-button';
      logoutBtn.style.marginLeft = '20px';
      nav.appendChild(logoutBtn);

      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        alert('You have been logged out.');
        window.location.href = 'login.html';
      });
    }

    // Lesson code toggle
    const lessons = document.querySelectorAll(".lesson-box");
    lessons.forEach(box => {
      const codeBlock = box.querySelector("pre");
      const outputBox = box.querySelector(".output-box");
      if (outputBox) {
        outputBox.style.display = "none";
        box.addEventListener("click", () => {
          if (outputBox.style.display === "none") {
            outputBox.style.display = "block";
            outputBox.innerHTML = codeBlock.textContent;
            outputBox.classList.add("fade-in");
          } else {
            outputBox.style.display = "none";
            outputBox.classList.remove("fade-in");
          }
        });
      }
    });
  }
});

// ========================
// Registration
// ========================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="password"]').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.email === email)) {
      alert('Email already registered!');
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    alert('Registration successful! You are now logged in.');
    window.location.href = 'tutorials.html';
  });
}

// ========================
// Login
// ========================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('input[name="username"]').value.trim();
    const password = document.querySelector('input[name="password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'tutorials.html';
    } else {
      alert('Invalid email or password!');
    }
  });
}
