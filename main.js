document.addEventListener('DOMContentLoaded', function() {
    const expandButtons = document.querySelectorAll('.expand-btn');

    expandButtons.forEach(button => {
        button.classList.add('flash'); // Add flash class to each expand button

        button.addEventListener('click', function() {
            const additionalInfo = this.nextElementSibling;
            if (additionalInfo.style.display === 'none' || additionalInfo.style.display === '') {
                additionalInfo.style.display = 'flex';
                this.textContent = '▲';
            } else {
                additionalInfo.style.display = 'none';
                this.textContent = '▼';
            }
            this.classList.remove('flash'); // Remove flash class when clicked
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
            cursorGlow.style.display = 'block';
            cursorGlow.style.width = `${100}px`;
            cursorGlow.style.height = `${100}px`;
            cursorGlow.style.transform = `translate3d(${e.pageX-50}px, ${e.pageY -50}px, 0)`;
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