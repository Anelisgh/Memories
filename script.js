document.addEventListener("DOMContentLoaded", function() {
  
  const dropdown = document.querySelector('.dropdown');
  const dropdownContent = dropdown.querySelector('.dropdown-content');

  function adjustDropdownPosition() {
    const screenWidth = window.innerWidth;
    const dropdownRect = dropdown.getBoundingClientRect();
    const dropdownWidth = dropdownRect.width;

    if (screenWidth - dropdownRect.right < dropdownWidth) {
      dropdownContent.classList.add('left');
      dropdownContent.classList.remove('right');
    } else {
      dropdownContent.classList.add('right');
      dropdownContent.classList.remove('left');
    }
  }

  dropdown.addEventListener('mouseenter', () => {
    dropdownContent.style.display = 'block';
    adjustDropdownPosition();
  });

  dropdown.addEventListener('mouseleave', () => {
    dropdownContent.style.display = 'none';
  });

  window.addEventListener('resize', () => {
    adjustDropdownPosition();
  });

  const postElements = Array.from(document.querySelectorAll(".post"));
  const images = [];

  postElements.forEach(function(postElement) {
    const postImages = Array.from(postElement.querySelectorAll("img"));
    images.push(...postImages);
  });

  const totalImages = images.length;
  let currentIndex = 0;

  function showImage(index) {
    const image = images[index];
    const src = image.getAttribute("src");
    const lightboxImage = document.querySelector(".lightbox-image");
    lightboxImage.setAttribute("src", src);
    currentIndex = index;
  }

  function showPreviousImage() {
    const previousIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(previousIndex);
  }

  function showNextImage() {
    const nextIndex = (currentIndex + 1) % totalImages;
    showImage(nextIndex);
  }

  images.forEach(function(image, index) {
    image.addEventListener("click", function() {
      const src = this.getAttribute("src");
      const index = images.findIndex(img => img.getAttribute("src") === src);

      const lightbox = document.createElement("div");
      lightbox.classList.add("lightbox");

      const lightboxImage = document.createElement("img");
      lightboxImage.classList.add("lightbox-image");
      lightboxImage.setAttribute("src", src);

      const lightboxClose = document.createElement("span");
      lightboxClose.classList.add("lightbox-close");
      lightboxClose.innerHTML = "&times;";

      const lightboxNavigation = document.createElement("div");
      lightboxNavigation.classList.add("lightbox-navigation");

      const lightboxPrev = document.createElement("span");
      lightboxPrev.classList.add("lightbox-prev");
      lightboxPrev.innerHTML = "&lt;";

      const lightboxNext = document.createElement("span");
      lightboxNext.classList.add("lightbox-next");
      lightboxNext.innerHTML = "&gt;";

      lightboxNavigation.appendChild(lightboxPrev);
      lightboxNavigation.appendChild(lightboxNext);

      lightbox.appendChild(lightboxImage);
      lightbox.appendChild(lightboxClose);
      lightbox.appendChild(lightboxNavigation);

      document.body.appendChild(lightbox);

      lightboxClose.addEventListener("click", function() {
        document.body.removeChild(lightbox);
      });

      lightboxPrev.addEventListener("click", showPreviousImage);
      lightboxNext.addEventListener("click", showNextImage);

      document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
          showPreviousImage();
        } else if (event.key === "ArrowRight") {
          showNextImage();
        }
      });

      showImage(index);
    });
  });
});
