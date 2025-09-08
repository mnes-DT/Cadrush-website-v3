document.addEventListener("DOMContentLoaded", function () {
  const fea_scrollContainer = document.getElementById("fea-cards-scroll");
  if (fea_scrollContainer) {
    let fea_isUserInteracting = false;
    let fea_autoScrollInterval;
    let fea_scrollDirection = "right";

    // Observe visibility of the section
    const fea_observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fea_isUserInteracting) {
            fea_startAutoScroll();
          } else {
            fea_stopAutoScroll();
          }
        });
      },
      { threshold: 0.5 }
    );

    fea_observer.observe(fea_scrollContainer);

    function fea_startAutoScroll() {
      fea_stopAutoScroll(); // Ensure no double intervals

      fea_autoScrollInterval = setInterval(() => {
        if (fea_isUserInteracting) {
          fea_stopAutoScroll();
          return;
        }

        if (fea_scrollDirection === "right") {
          fea_scrollContainer.scrollBy({ left: 100, behavior: "smooth" });
          fea_scrollDirection = "left";
        } else {
          fea_scrollContainer.scrollBy({ left: -100, behavior: "smooth" });
          fea_scrollDirection = "right";
        }
      }, 3000); // every 3 seconds
    }

    function fea_stopAutoScroll() {
      clearInterval(fea_autoScrollInterval);
    }

    // Stop on user scroll or touch interaction
    fea_scrollContainer.addEventListener("wheel", () => {
      fea_isUserInteracting = true;
      fea_stopAutoScroll();
    });

    fea_scrollContainer.addEventListener("touchstart", () => {
      fea_isUserInteracting = true;
      fea_stopAutoScroll();
    });

    fea_scrollContainer.addEventListener("mousedown", () => {
      fea_isUserInteracting = true;
      fea_stopAutoScroll();
    });
  }

  // Why Finite Element Analysis Auto scroll
  const why_fea_scrollContainer = document.getElementById(
    "why-finite-cards-scroll"
  );
  if (why_fea_scrollContainer) {
    let isUserInteracting = false;
    let autoScrollInterval;
    let scrollDirection = "right";

    // Observe visibility of the section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isUserInteracting) {
            startAutoScroll();
          } else {
            stopAutoScroll();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(why_fea_scrollContainer);

    function startAutoScroll() {
      stopAutoScroll(); // Ensure no double intervals

      autoScrollInterval = setInterval(() => {
        if (isUserInteracting) {
          stopAutoScroll();
          return;
        }

        if (scrollDirection === "right") {
          why_fea_scrollContainer.scrollBy({ left: 100, behavior: "smooth" });
          scrollDirection = "left";
        } else {
          why_fea_scrollContainer.scrollBy({ left: -100, behavior: "smooth" });
          scrollDirection = "right";
        }
      }, 3000); // every 3 seconds
    }

    function stopAutoScroll() {
      clearInterval(autoScrollInterval);
    }

    // Stop on user scroll or touch interaction
    why_fea_scrollContainer.addEventListener("wheel", () => {
      isUserInteracting = true;
      stopAutoScroll();
    });

    why_fea_scrollContainer.addEventListener("touchstart", () => {
      isUserInteracting = true;
      stopAutoScroll();
    });

    why_fea_scrollContainer.addEventListener("mousedown", () => {
      isUserInteracting = true;
      stopAutoScroll();
    });
  }

  // Flip card logic: only one can be flipped at a time
  // document.querySelectorAll(".flip-card").forEach((card) => {
  //     card.addEventListener("click", function (e) {
  //         // Prevent event bubbling from "flip back" click
  //         if (e.target.closest('.flip-back')) return;
  //         document.querySelectorAll(".flip-card").forEach((fc) => {
  //             if (fc !== card) fc.classList.remove("flipped");
  //         });
  //         card.classList.toggle("flipped");
  //     });
  // });

  // Flip back only the parent card
  window.removeFlip = function (el) {
    const card = el.closest(".flip-card");
    if (card) card.classList.remove("flipped");
  };

  // NOTE: Accordion for faq donn't touch
  // Close all on load
  document.querySelectorAll(".accordion-content").forEach((c) => {
    c.style.maxHeight = "0";
    c.style.overflow = "hidden";
  });

  document.querySelectorAll(".accordion-toggle").forEach((btn) => {
    btn.addEventListener("click", function () {
      // Find the content div immediately after the button's parent (.accordion)
      const content = this.parentElement.querySelector(".accordion-content");
      // Close all others
      document.querySelectorAll(".accordion-content").forEach((c) => {
        if (c !== content) c.style.maxHeight = "0";
      });
      // Toggle this one
      if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
