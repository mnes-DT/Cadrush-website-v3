document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Get all panels and content items
    const images = gsap.utils.toArray('.image-container img');
    const textItems = gsap.utils.toArray('.text-item');
    const steps = gsap.utils.toArray('.steps-container > div');
    const totalSections = images.length;
    let currentIndex = 0;
    let autoScrollInterval;
    const AUTO_SCROLL_DELAY = 2500; // 2.5 seconds between auto-scrolls

    // Set initial state
    function setActiveSection(index) {
        currentIndex = index;

        // Update all elements
        images.forEach((img, i) => {
            gsap.to(img, {
                opacity: i === index ? 1 : 0,
                duration: 0.5,
                ease: 'power2.inOut'
            });
        });

        textItems.forEach((text, i) => {
            gsap.to(text, {
                opacity: i === index ? 1 : 0,
                duration: 0.5,
                ease: 'power2.inOut'
            });
        });

        // Update step indicators
        steps.forEach((step, i) => {
            if (i === index) {
                step.classList.add('bg-[#7c6ee6]', 'text-white');
                step.classList.remove('text-[#7c6ee6]');
            } else {
                step.classList.remove('bg-[#7c6ee6]', 'text-white');
                step.classList.add('text-[#7c6ee6]');
            }
        });
    }

    // Handle wheel and touch events for snap scrolling within the panel
    let isScrolling = false;
    let scrollTimeout;
    const SCROLL_DELAY = 1000; // Time to wait before allowing next scroll
    let panelElement = document.querySelector('.panel');
    let isCursorOverPanel = false;

    // Track if cursor is over the panel
    if (panelElement) {
        panelElement.addEventListener('mouseenter', () => {
            isCursorOverPanel = true;
        });
        panelElement.addEventListener('mouseleave', () => {
            isCursorOverPanel = false;
        });
    }

    function handleScroll(e) {
        // Only handle scroll events when cursor is over the panel
        if (!isCursorOverPanel) return;

        const delta = Math.sign(e.deltaY || e.detail || -e.wheelDelta);

        // Check if we're at the top and scrolling up, or at the bottom and scrolling down
        const atTop = currentIndex === 0 && delta < 0;
        const atBottom = currentIndex === totalSections - 1 && delta > 0;

        // If we're at the boundary and trying to scroll beyond, allow default scroll behavior
        if ((atTop || atBottom) &&
            (e.target === document.documentElement ||
                e.target === document.body ||
                e.target === panelElement ||
                panelElement.contains(e.target))) {
            // Don't prevent default - let the page scroll naturally
            isScrolling = false;
            return;
        }

        // Otherwise, handle the scroll for the panel
        e.preventDefault();

        if (isScrolling) return;
        isScrolling = true;
        clearTimeout(scrollTimeout);

        let newIndex = currentIndex;
        if (delta > 0 && currentIndex < totalSections - 1) {
            newIndex = currentIndex + 1;
        } else if (delta < 0 && currentIndex > 0) {
            newIndex = currentIndex - 1;
        } else {
            isScrolling = false;
            return;
        }

        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            setActiveSection(currentIndex);
        }

        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, SCROLL_DELAY);
    }

    function handleKeyDown(e) {
        if (e.key === 'ArrowDown' && currentIndex < totalSections - 1) {
            e.preventDefault();
            currentIndex++;
            setActiveSection(currentIndex);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            currentIndex--;
            setActiveSection(currentIndex);
        }
    }

    function handleStepClick(e) {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        if (index !== currentIndex) {
            currentIndex = index;
            setActiveSection(currentIndex);
        }
    }

    // Auto-scroll to next section
    function autoScrollNext() {
        const nextIndex = (currentIndex + 1) % totalSections;
        currentIndex = nextIndex;
        setActiveSection(currentIndex);
    }

    // Start auto-scrolling
    function startAutoScroll() {
        stopAutoScroll(); // Clear any existing interval
        autoScrollInterval = setInterval(autoScrollNext, AUTO_SCROLL_DELAY);
    }

    // Stop auto-scrolling
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Initialize
    function init() {
        setActiveSection(0);
        startAutoScroll();

        // Add event listeners
        // window.addEventListener('wheel', handleScroll, { passive: false });
        // window.addEventListener('touchmove', handleScroll, { passive: false });
        // document.addEventListener('keydown', handleKeyDown);

        // Add click handlers for step indicators
        steps.forEach(step => {
            step.addEventListener('click', handleStepClick);
        });

        // Pause auto-scroll on hover over content container
        const contentContainer = document.querySelector('.content-container');
        if (contentContainer) {
            contentContainer.addEventListener('mouseenter', () => {
                isCursorOverPanel = true;
                stopAutoScroll();
            });
            contentContainer.addEventListener('mouseleave', () => {
                isCursorOverPanel = false;
                startAutoScroll();
            });
        }

        document.querySelectorAll('.explore-btn').forEach(btn => {
            const arrowContainer = btn.querySelector('.arrow-container');
            const arrowImg = btn.querySelector('.arrow-img');

            btn.addEventListener('mouseenter', () => {
                arrowContainer.style.backgroundColor = "#695bf9";
                arrowImg.style.transform = 'rotate(58deg)';
                arrowImg.style.transition = 'transform 0.3s ease';
                arrowImg.style.filter = 'brightness(0) invert(1)';
            });

            btn.addEventListener('mouseleave', () => {
                arrowContainer.style.backgroundColor = "transparent";
                arrowImg.style.transform = 'rotate(0deg)';
                // reset to default

                arrowImg.style.filter = '';
            });
        });


    }


    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.our-service-card').forEach((card, index) => {
        // Add delay based on index for staggered animation
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Initialize the scroll animation
    init();
});