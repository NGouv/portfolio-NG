// ===============================
// EMAILJS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    if (window.emailjs) {
        window.emailjs.init({
            publicKey: "UfCE3z5i2KZjkFjaA"
        });
    }

});

// ===============================
// MENU MOBILE
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        const isActive = navMenu.classList.toggle("active");
        menuBtn.classList.toggle("active", isActive);
        menuBtn.setAttribute("aria-expanded", String(isActive));

    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuBtn.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", (event) => {
        if (window.innerWidth <= 900 && !navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
            navMenu.classList.remove("active");
            menuBtn.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
        }
    });

}

// ===============================
// NAVBAR AO ROLAR A PÁGINA
// ===============================

const header = document.querySelector(".header");

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scroll", window.scrollY > 50);
    });
}

// ===============================
// SCROLL REVEAL
// ===============================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });

}, {
    threshold: 0.15
});

const hiddenElements = document.querySelectorAll(
    ".hero-content, .hero-image, .about, .services, .skills, .projects, .contact"
);

hiddenElements.forEach((el) => observer.observe(el));

// ===============================
// FORMULÁRIO DE CONTATO
// ===============================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitButton = this.querySelector("button[type='submit']");
        const originalText = submitButton ? submitButton.textContent : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Enviando...";
        }

        formStatus.textContent = "Enviando sua mensagem...";

        if (!window.emailjs) {
            formStatus.textContent = "Erro: serviço de envio indisponível.";
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
            return;
        }

        window.emailjs.sendForm(
            "service_hjjwkmu",
            "template_q4sfv6f",
            this
        )
        .then(() => {
            formStatus.textContent = "Mensagem enviada com sucesso!";
            contactForm.reset();
        })
        .catch((error) => {
            console.error(error);
            formStatus.textContent = "Erro ao enviar a mensagem. Tente novamente.";
        })
        .finally(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });

    });

}