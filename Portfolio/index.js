document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById('contactButton').addEventListener('click', function () {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({
        behavior: 'smooth'
    });
});

document.getElementById('readMoreButton').addEventListener('click', function () {
    const aboutText = document.getElementById('aboutText');
    aboutText.classList.toggle('expanded');
});
