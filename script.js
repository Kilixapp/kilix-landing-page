document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. MENU
    ========================================== */

    const menuToggle = document.getElementById("menuToggle");
    const menuWrapper = document.querySelector(".menu-wrapper");
    const menuDropdown = document.getElementById("menuDropdown");

    if (menuToggle && menuWrapper && menuDropdown) {

        function openMenu() {
            menuWrapper.classList.add("open");
            menuToggle.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");
        }

        function closeMenu() {
            menuWrapper.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

        menuToggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (menuWrapper.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.addEventListener("click", function (event) {
            if (!menuWrapper.contains(event.target)) {
                closeMenu();
            }
        });

        menuDropdown.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu();
            });
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }


    /* =========================================
       2. SMOOTH SCROLL
    ========================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    );

    internalLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(".navbar");
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =========================================
       3. SCROLL REVEAL
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".hero-content, .feature-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach(function (element, index) {
            element.style.transitionDelay = (index * 0.08) + "s";
            element.classList.add("reveal-element");
            observer.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
    }


    /* =========================================
       4. iPHONE REGISTRATION / SUPABASE
    ========================================== */

    const iosButton = document.getElementById("iosRegistrationButton");
    const iosModal = document.getElementById("iosRegistrationModal");
    const iosCloseButton = document.getElementById("iosModalClose");
    const iosForm = document.getElementById("iosRegistrationForm");
    const iosMessage = document.getElementById("iosFormMessage");
    const iosSubmitButton = document.getElementById("iosSubmitButton");

    // Kilix View Supabase project
    const SUPABASE_URL = "https://xsswxjaaqhkbsheeclge.supabase.co";
    const SUPABASE_ANON_KEY = "sb_publishable_4Zq8XdOzwyqElOEd-4tPvQ_70y1weCa";

    const supabaseClient = window.supabase
        ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
        : null;

    function openIosModal() {
        if (!iosModal) return;

        iosModal.classList.add("is-open");
        iosModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("ios-modal-open");

        window.setTimeout(function () {
            const nameInput = document.getElementById("iosFullName");
            if (nameInput) nameInput.focus();
        }, 80);
    }

    function closeIosModal() {
        if (!iosModal) return;

        iosModal.classList.remove("is-open");
        iosModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("ios-modal-open");
    }

    function showIosMessage(message, type) {
        if (!iosMessage) return;

        iosMessage.textContent = message;
        iosMessage.className = "ios-form-message " + (type || "");
    }

    if (iosButton && iosModal) {
        iosButton.addEventListener("click", function (event) {
            event.preventDefault();
            openIosModal();
        });
    }

    if (iosCloseButton) {
        iosCloseButton.addEventListener("click", closeIosModal);
    }

    if (iosModal) {
        iosModal.querySelectorAll("[data-ios-close]").forEach(function (element) {
            element.addEventListener("click", closeIosModal);
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && iosModal && iosModal.classList.contains("is-open")) {
            closeIosModal();
        }
    });

    if (iosForm) {
        iosForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            if (!supabaseClient) {
                showIosMessage("تعذر الاتصال بالخدمة حالياً. حاول مرة أخرى.", "error");
                return;
            }

            if (!iosForm.checkValidity()) {
                iosForm.reportValidity();
                return;
            }

            const fullName = document.getElementById("iosFullName").value.trim();
            const email = document.getElementById("iosEmail").value.trim().toLowerCase();
            const phoneValue = document.getElementById("iosPhone").value.trim();
            const role = document.getElementById("iosRole").value;

            iosSubmitButton.disabled = true;
            iosSubmitButton.classList.add("is-loading");
            showIosMessage("جارٍ حفظ تسجيلك...", "loading");

            const { error } = await supabaseClient
                .from("ios_waitlist_registrations")
                .insert({
                    full_name: fullName,
                    email: email,
                    phone: phoneValue || null,
                    role: role
                });

            iosSubmitButton.disabled = false;
            iosSubmitButton.classList.remove("is-loading");

            if (error) {
                if (error.code === "23505") {
                    showIosMessage("هذا البريد مسجل مسبقاً لدينا. تم حفظ تسجيلك من قبل.", "success");
                } else {
                    console.error("iOS registration error:", error);
                    showIosMessage("لم نتمكن من حفظ التسجيل حالياً. حاول مرة أخرى.", "error");
                }
                return;
            }

            showIosMessage("✓ تم حفظ تسجيلك بنجاح. سنخبرك عند توفر تطبيق iPhone.", "success");
            iosForm.reset();
        });
    }


    /* =========================================
       5. REDUCE MOTION
    ========================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        document.documentElement.classList.add("reduce-motion");
    }

});
