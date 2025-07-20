document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");
    });
  }

  const toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  Object.assign(toastContainer.style, {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    zIndex: 1000,
  });
  document.body.appendChild(toastContainer);

  window.showToast = (message, duration = 3000) => {
    const toast = document.createElement("div");
    toast.className = "px-4 py-2 mb-2 rounded shadow-lg bg-gray-800 text-white";
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-500");
      toast.addEventListener("transitionend", () => toast.remove(), {
        once: true,
      });
    }, duration);
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
