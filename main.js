document.addEventListener('DOMContentLoaded', function() {
    // Hide all gated sections initially
    document.querySelectorAll('.gated').forEach(section => {
        section.style.display = 'none';
    });
    const gateMessage = document.getElementById('gate-message');
    if (gateMessage) gateMessage.hidden = false;

    // Show gated sections when gate button is pressed
    const openGateBtn = document.getElementById('open-gate');
    if (openGateBtn) {
        openGateBtn.addEventListener('click', function() {
            document.querySelectorAll('.gated').forEach(section => {
                section.style.display = '';
            });
            if (gateMessage) {
                gateMessage.hidden = true;
                gateMessage.style.display = 'none';
            }
        });
    }
    // Make research images toggle dropdowns
    const researchImages = document.querySelectorAll('.research-image');
    researchImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const researchSection = img.closest('.research-section');
            const researchInfo = researchSection.querySelector('.research-info');
            const dropdownBtn = researchSection.querySelector('.expand-btn.research-dropdown');
            if (researchInfo.style.display === 'none' || researchInfo.style.display === '') {
                researchInfo.style.display = 'flex';
                if (dropdownBtn) dropdownBtn.textContent = '▲';
            } else {
                researchInfo.style.display = 'none';
                if (dropdownBtn) dropdownBtn.textContent = '▼';
            }
            if (dropdownBtn) dropdownBtn.classList.remove('flash');
        });
    });
    const expandButtons = document.querySelectorAll('.expand-btn');

    expandButtons.forEach(button => {
        button.classList.add('flash'); // Add flash class to each expand button

        button.addEventListener('click', function() {
            // For research dropdowns, find the nearest .research-section and toggle its .research-info
            if (button.classList.contains('research-dropdown')) {
                const researchSection = button.closest('.research-section');
                const researchInfo = researchSection.querySelector('.research-info');
                if (researchInfo.style.display === 'none' || researchInfo.style.display === '') {
                    researchInfo.style.display = 'flex';
                    button.textContent = '▲';
                } else {
                    researchInfo.style.display = 'none';
                    button.textContent = '▼';
                }
                button.classList.remove('flash');
            } else {
                // Legacy dropdown logic for other sections
                const additionalInfo = button.nextElementSibling;
                if (additionalInfo && (additionalInfo.style.display === 'none' || additionalInfo.style.display === '')) {
                    additionalInfo.style.display = 'flex';
                    button.textContent = '▲';
                } else if (additionalInfo) {
                    additionalInfo.style.display = 'none';
                    button.textContent = '▼';
                }
                button.classList.remove('flash');
            }
        });
    });

    // Add handlers for new inline "View details" links (class .details-toggle)
    const detailToggles = document.querySelectorAll('.details-toggle');
    detailToggles.forEach(link => {
        // set initial arrow state based on whether details are visible
        const researchSection = link.closest('.research-section');
        const researchInfo = researchSection ? researchSection.querySelector('.research-info') : null;
        if (researchInfo) {
            const shown = !(researchInfo.style.display === 'none' || researchInfo.style.display === '');
            if (shown) {
                link.textContent = 'View details ▲';
            } else {
                link.textContent = 'View details ▼';
            }
            link.setAttribute('aria-expanded', shown ? 'true' : 'false');
        }

        link.addEventListener('click', function(e) {
            e.preventDefault();
            const researchSection = link.closest('.research-section');
            if (!researchSection) return;
            const researchInfo = researchSection.querySelector('.research-info');
            if (!researchInfo) return;
            const isHidden = (researchInfo.style.display === 'none' || researchInfo.style.display === '');
            if (isHidden) {
                researchInfo.style.display = 'flex';
                link.textContent = 'View details ▲';
                link.setAttribute('aria-expanded', 'true');
            } else {
                researchInfo.style.display = 'none';
                link.textContent = 'View details ▼';
                link.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const cursorGlow = document.querySelector('.cursor-glow');
    let offset_x = 0;
    let offset_y = 0;
    let offset_size = 0;
    const max = 2;
    const min = 0;
    document.addEventListener('mousemove', function(e) {
        const isOverBox = e.target.closest('.portfolio-box') !== null || e.target.closest('.nav-box') !== null || e.target.closest('.scroll-btn') !== null;
        const isOverTitle = e.target.closest('#intro') !== null || e.target.closest('#portfolio') !== null || e.target.closest('#contact') !== null || e.target.closest('.header-text') !== null;
        offset_x = offset_x + Math.random() * (max - min) + min;
        offset_y = offset_y + Math.random() * (max - min) + min;
        offset_size = offset_size + Math.random() * (max - min) + min;
        if (isOverBox) {
            cursorGlow.style.display = 'none';
        } else if(isOverTitle) {
            cursorGlow.style.display = 'block';
            cursorGlow.style.width = `${300}px`;
            cursorGlow.style.height = `${300}px`;
            cursorGlow.style.transform = `translate3d(${e.pageX-150}px, ${e.pageY -150}px, 0)`;
        } else {
            cursorGlow.style.display = 'none';
            cursorGlow.style.display = 'block';
            cursorGlow.style.width = `${20}px`;
            cursorGlow.style.height = `${20}px`;
            cursorGlow.style.transform = `translate3d(${e.pageX-10}px, ${e.pageY -10}px, 0)`;
        }
    });

    const offset = 30; // Adjust this value to your desired offset
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });

    const scrollButtons = document.querySelectorAll('.scroll-btn');
    if (scrollButtons.length > 0) {
        const firstScrollBtn = scrollButtons[0];
        firstScrollBtn.classList.add('flash');

        firstScrollBtn.addEventListener('click', function() {
            firstScrollBtn.classList.remove('flash');
        });
    }
});

(function () {
  // Hide gated sections initially
  const gated = Array.from(document.querySelectorAll(".research-section.gated"));
  gated.forEach(sec => sec.style.display = "none");

  // Show button handler
  const showBtn = document.getElementById("show-rest");
  const gateMsg = document.getElementById("gate-message");
  if (showBtn) {
    showBtn.addEventListener("click", () => {
      gated.forEach(sec => sec.style.display = "");
      if (gateMsg) gateMsg.style.display = "none";
    });
  }
})();

