//Navbar
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".dropdown-submenu > a").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const submenu = el.nextElementSibling;
      if (submenu) {
        submenu.classList.toggle("show");

        // Close others
        document.querySelectorAll(".dropdown-submenu .dropdown-menu").forEach(function (menu) {
          if (menu !== submenu) menu.classList.remove("show");
        });
      }
    });
  });

  // Hide all submenus if clicked outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-menu.show").forEach(function (menu) {
        menu.classList.remove("show");
      });
    }
  });
});

// Slider timing - safely initialize Bootstrap carousel
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('#guestCarousel');
  if (carousel && typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
    new bootstrap.Carousel(carousel, {
      interval: 5000,
      ride: 'carousel'
    });
  } else {
    console.warn('⚠️ guestCarousel element not found or Bootstrap Carousel not loaded.');
  }


  // Counter animation
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target); // Only count once
      }
    });
  }, { threshold: 0.3 }); // Trigger when 30% visible

  counters.forEach(counter => counterObserver.observe(counter));

  function startCounting(counter) {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      counter.innerText = `${current} +`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.innerText = `${target} +`;
      }
    }

    requestAnimationFrame(update);
  }
  
  // Image gallery filtering
  if (typeof GLightbox === 'function') {
    const lightbox = GLightbox({ selector: '.glightbox' });
  } else {
    console.warn('⚠️ GLightbox not loaded!');
  }
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.filter-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.classList.remove('d-none');
        } else {
          item.classList.add('d-none');
        }
      });
    });
  });

  // Payment form validation
  const form = document.getElementById('feesForm');
  const errorBox = document.getElementById('studentError');
  const admissionInput = document.getElementById('admissionInput');

  if (form && admissionInput && errorBox) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const admissionNo = admissionInput.value.trim();

      if (admissionNo !== '12345') {
        errorBox.classList.remove('d-none');
      } else {
        errorBox.classList.add('d-none');
        alert('Student found! Continue to payment...');
      }
    });
  } else {
    console.warn('⚠️ feesForm or inputs not found!');
  }
});
