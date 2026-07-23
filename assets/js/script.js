const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".navbar a");

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// ================================
// Restore saved theme
// ================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    } else {

        document.body.classList.remove("light-theme");

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

    }

} else {

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (!prefersDark) {

        document.body.classList.add("light-theme");

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }

}
// ================================
// Theme Toggle
// ================================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    if (isLight) {

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    } else {

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

    }

    localStorage.setItem("theme", isLight ? "light" : "dark");

});

// ================================
// Active Navigation
// ================================

function updateActiveNav() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);