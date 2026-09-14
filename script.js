(() => {

    const header =
        document.querySelector(".header");

    const menuButton =
        document.querySelector(".menu-button");

    const navLinksContainer =
        document.querySelector(".nav-links");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("[data-section]");

    const reveals =
        document.querySelectorAll(".reveal");

    const filters =
        document.querySelectorAll(".filter");

    const projectCards =
        document.querySelectorAll(".project-card");

    const interactiveCards =
        document.querySelectorAll(".interactive-card");

    const copyEmailButton =
        document.getElementById("copyEmailButton");


    /* HEADER */

    function updateHeader() {

        if (window.scrollY > 12) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* MOBILE MENU */

    function closeMenu() {

        navLinksContainer
            .classList
            .remove("open");


        menuButton
            .setAttribute(
                "aria-expanded",
                "false"
            );


        document.body.style.overflow =
            "";

    }


    menuButton.addEventListener(
        "click",
        () => {

            const open =
                navLinksContainer
                    .classList
                    .toggle("open");


            menuButton.setAttribute(
                "aria-expanded",
                String(open)
            );


            document.body.style.overflow =
                open
                    ? "hidden"
                    : "";

        }
    );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* REVEAL */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },

                {
                    threshold:
                        0.08,

                    rootMargin:
                        "0px 0px -30px 0px"
                }

            );


        reveals.forEach(element => {

            revealObserver
                .observe(element);

        });


    } else {


        reveals.forEach(element => {

            element
                .classList
                .add("visible");

        });

    }


    /* ACTIVE NAVIGATION */

    const sectionObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    navLinks.forEach(link => {

                        link.classList
                            .remove(
                                "active"
                            );

                    });


                    const currentLink =
                        document.querySelector(
                            `.nav-link[href="#${entry.target.id}"]`
                        );


                    if (currentLink) {

                        currentLink
                            .classList
                            .add("active");

                    }

                });

            },

            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold:
                    0
            }

        );


    sections.forEach(section => {

        sectionObserver
            .observe(section);

    });


    /* PROJECT FILTERING */

    filters.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    button.dataset.filter;


                filters.forEach(
                    filterButton => {

                        filterButton
                            .classList
                            .remove(
                                "active"
                            );

                    }
                );


                button
                    .classList
                    .add("active");


                projectCards.forEach(card => {

                    const categoryText =
                        card.dataset.category
                        || "";


                    const categories =
                        categoryText
                            .trim()
                            .split(/\s+/);


                    const shouldShow =
                        selectedFilter
                        ===
                        "all"

                        ||

                        categories.includes(
                            selectedFilter
                        );


                    card.classList
                        .toggle(
                            "is-hidden",
                            !shouldShow
                        );

                });

            }
        );

    });


    /* INTERACTIVE CARD LIGHT */

    interactiveCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card
                        .getBoundingClientRect();


                const x =
                    event.clientX
                    -
                    rect.left;


                const y =
                    event.clientY
                    -
                    rect.top;


                card.style
                    .setProperty(
                        "--mouse-x",
                        `${x}px`
                    );


                card.style
                    .setProperty(
                        "--mouse-y",
                        `${y}px`
                    );

            }
        );

    });


    /* COPY EMAIL */

    if (copyEmailButton) {

        copyEmailButton.addEventListener(
            "click",
            async () => {

                const email =
                    "Sedrah.aa@hotmail.com";


                try {

                    await navigator.clipboard
                        .writeText(email);


                    copyEmailButton
                        .classList
                        .add("copied");


                    copyEmailButton.title =
                        "Email copied";


                    copyEmailButton
                        .setAttribute(
                            "aria-label",
                            "Email copied"
                        );


                    setTimeout(
                        () => {

                            copyEmailButton
                                .classList
                                .remove("copied");


                            copyEmailButton.title =
                                "Copy email";


                            copyEmailButton
                                .setAttribute(
                                    "aria-label",
                                    "Copy email address"
                                );

                        },
                        1400
                    );


                } catch (error) {

                    const temporaryInput =
                        document.createElement(
                            "textarea"
                        );


                    temporaryInput.value =
                        email;


                    temporaryInput.style.position =
                        "fixed";


                    temporaryInput.style.opacity =
                        "0";


                    document.body
                        .appendChild(
                            temporaryInput
                        );


                    temporaryInput.select();


                    document.execCommand(
                        "copy"
                    );


                    temporaryInput.remove();


                    copyEmailButton
                        .classList
                        .add("copied");


                    setTimeout(
                        () => {

                            copyEmailButton
                                .classList
                                .remove("copied");

                        },
                        1400
                    );

                }

            }
        );

    }


    /* RESIZE */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeMenu();

            }

        }
    );

})();