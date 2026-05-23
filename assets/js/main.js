(function($) {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

        /* Loader */
        window.addEventListener('load', function () {
            // Check if the preloader element exists before accessing its style property
            setTimeout(() => {
                $('.preloader-wrap').delay('500').fadeOut(1000);
            }, 200);
            setTimeout(() => {
                AOS.init({
                    duration: 1500,
                    offset: 60
                });
            }, 200);
            let body = document.querySelector('body');


            /* Custom Cursor */
            const cursorBall = document.getElementById('ball');
            document.addEventListener('mousemove', function (e) {
                if (cursorBall) {
                    gsap.to(cursorBall, {
                        duration: 1,
                        x: e.clientX,
                        y: e.clientY,
                        opacity: 1,
                        ease: 'power2.out'
                    });
                }
            });
            const hoverElements = document.querySelectorAll('a');
            const hoverElements2 = document.querySelectorAll('.feature-project');
            hoverElements2.forEach(function (element) {
                element.addEventListener('mouseenter', function () {
                    if (cursorBall) {
                        cursorBall.style.opacity = 0;
                        cursorBall.classList.add('hide-mouse');
                    }
                });
                element.addEventListener('mouseleave', function () {
                    if (cursorBall) {
                        cursorBall.style.opacity = 1;
                        cursorBall.classList.remove('hide-mouse');
                    }
                });
            })
            hoverElements.forEach(function (element) {
                element.addEventListener('mouseenter', function () {
                    if (cursorBall) {
                        cursorBall.classList.add('hovered');
                        gsap.to(cursorBall, {
                            duration: 0.3,
                            scale: 1, // 2
                            opacity: 0,
                            ease: 0.1
                        });
                    }
                });
                element.addEventListener('mouseleave', function () {
                    if (cursorBall) {
                        cursorBall.classList.remove('hovered');
                        gsap.to(cursorBall, {
                            duration: 0.3,
                            scale: 1,
                            opacity: 1,
                            ease: 'power2.out'
                        });
                    }
                });
            });

            const dropdownMenu = $('.header-menu-wrap .navbar > ul > li.dropdown-menu-item > a')
            if (dropdownMenu) {
                $(dropdownMenu).on('click', function(e) {
                    e.preventDefault();
                })
            }


            // price ranger
            // Contact Form Budget Slider
            if ($('#budget-value').length) {
                const value = document.querySelector("#budget-value");
                const input = document.querySelector("#pi_input");
                const budgetInput = document.querySelector('input[name="budget"]'); // Added this line
            
                value.textContent = input.value;
                budgetInput.value = input.value; // Store the budget value in the hidden input field
            
                input.addEventListener("input", (event) => {
                    value.textContent = event.target.value;
                    budgetInput.value = event.target.value; // Update the hidden input field when the user changes the budget
                });
            }

            // Sidebar Menu
            const hamburgMenu = document.querySelector('.hamburg-menu');
            const closeHeaderSidebar = document.querySelector('.header-sidebar-wrap .header-sidebar-content .close-header-sidebar');
            const headerSidebar = document.querySelector('.header-sidebar-wrap');
            const headerSidebarMenu = document.querySelectorAll('.header-sidebar-wrap .header-sidebar-content .sidebar-menu ul li');

            if (hamburgMenu) {
                hamburgMenu.addEventListener('click', function (e) {
                    e.preventDefault();
                    headerSidebar.classList.add('active');
                    body.style.overflow = 'hidden';
                });
                if (closeHeaderSidebar) {
                    closeHeaderSidebar.addEventListener('click', function (e) {
                        e.preventDefault();
                        headerSidebar.classList.remove('active');
                        body.style.overflow = 'inherit';
                    });
                }

                window.addEventListener('scroll', function () {
                    let scrollAmount = window.scrollY;
                    if (scrollAmount >= 100) {
                        hamburgMenu.classList.add('active');
                    } else {
                        hamburgMenu.classList.remove('active');
                    }
                });
            }
            if (headerSidebarMenu) {
                headerSidebarMenu.forEach(menu => {
                    const menuList = menu.querySelector('a');
                    
                    menuList.addEventListener('click', function () {
                        headerSidebar.classList.remove('active');
                        body.style.overflow = 'inherit';
                    });
                });
            }

            if (document.querySelectorAll('.notch-bar-menu-wrap')) {
                document.addEventListener("scroll", onScroll);

                // smooth scroll
                document.querySelectorAll('.notch-bar-menu-wrap a[href^="#"]').forEach(function(anchor) {
                    anchor.addEventListener('click', function (e) {
                        e.preventDefault();
                        document.removeEventListener("scroll", onScroll);

                        document.querySelectorAll('a').forEach(function (link) {
                            link.classList.remove('active');
                        });
                        this.classList.add('active');

                        var target = this.hash;
                        var $target = document.querySelector(target);
                        window.scrollTo({
                            top: $target.offsetTop,
                            behavior: 'smooth'
                        });

                        window.setTimeout(function() {
                            window.location.hash = target;
                            document.addEventListener("scroll", onScroll);
                        }, 500);
                    });
                });
            }

            function onScroll(event) {
                var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
                document.querySelectorAll('.notch-bar-menu-wrap a').forEach(function(currLink) {
                    var refElement = document.querySelector(currLink.getAttribute("href"));
                    if (refElement) {
                        if (refElement.offsetTop <= scrollPos && refElement.offsetTop + refElement.offsetHeight > scrollPos) {
                            document.querySelectorAll('.notch-bar-menu-wrap ul li a').forEach(function (link) {
                                link.classList.remove("active");
                            });
                            currLink.classList.add("active");
                        } else {
                            currLink.classList.remove("active");
                        }
                    }
                });
            }

            const tabs = document.querySelectorAll(".pricing_nav .nav-link");
            const indicator = document.querySelector(".pricing_nav_wrap .nav-hover-shape");

            function updateIndicatorPosition(element) {
                const offsetLeft = element.offsetLeft;
                const width = element.offsetWidth;
                indicator.style.left = `${offsetLeft}px`;
                indicator.style.opacity = 1;
                // indicator.style.width = `${width}px`;
            }

            tabs.forEach(tab => {
                tab.addEventListener("click", function() {
                    tabs.forEach(t => t.classList.remove("active"));
                    this.classList.add("active");
                    updateIndicatorPosition(this);
                });
            });

            // Initialize the indicator position
            const activeTab = document.querySelector(".nav-link.active");
            if (activeTab) {
                updateIndicatorPosition(activeTab);
            }


            if (document.querySelectorAll('.feature-project')) {
                document.querySelectorAll('.feature-project').forEach(box => {
                    const hoverElement = box.querySelector('.hover_mouse');

                    box.addEventListener('mousemove', (event) => {
                        const boxRect = box.getBoundingClientRect();
                        const mouseX = event.clientX - boxRect.left;
                        const mouseY = event.clientY - boxRect.top;

                        if (hoverElement) {
                            hoverElement.style.transform = `translate3d(${mouseX - 50}px, ${mouseY - 50}px, 0)`;
                            hoverElement.classList.add('active');
                        }
                    });

                    if (hoverElement) {
                        box.addEventListener('mouseleave', () => {
                            // hoverElement.style.transform = `translate3d(0, 0, 0)`;
                            hoverElement.classList.remove('active');
                        });
                    }
                });
            }
            if (document.querySelector('.testimonial-lists-wrap')) {
                const hoverElement3 = document.querySelector('.testimonial-lists-wrap .hover_mouse');
                document.querySelector('.testimonial-lists-wrap').addEventListener('mousemove', (event) => {
                    const boxRect = document.querySelector('.testimonial-lists-wrap').getBoundingClientRect();
                    const mouseX = event.clientX - boxRect.left;
                    const mouseY = event.clientY - boxRect.top;

                    if (hoverElement3) {
                        hoverElement3.style.transform = `translate3d(${mouseX - 50}px, ${mouseY - 50}px, 0)`;
                        hoverElement3.classList.add('active');
                    }
                });

                if (hoverElement3) {
                    document.querySelector('.testimonial-lists-wrap').addEventListener('mouseleave', (testimonial) => {
                        hoverElement3.classList.remove('active');
                    });
                }
				
				document.querySelector('.testimonial-lists-wrap').addEventListener('mouseenter', function () {
                    if (cursorBall) {
                        cursorBall.style.opacity = 0;
                        cursorBall.classList.add('hide-mouse');
                    }
                });
                document.querySelector('.testimonial-lists-wrap').addEventListener('mouseleave', function () {
                    if (cursorBall) {
                        cursorBall.style.opacity = 1;
                        cursorBall.classList.remove('hide-mouse');
                    }
                });
            }


            /* Gsap */
            gsap.registerPlugin(ScrollTrigger);
            const splitTypes = document.querySelectorAll('.reveal-type');
            if (splitTypes) {
                splitTypes.forEach((char, i) => {
                    const text = new SplitType(char, {types: 'chars, words'});

                    gsap.from(text.chars, {
                        scrollTrigger: {
                            opacity: 1, // Initial state
                            trigger: char,
                            start: 'top 80%',
                            end: 'top -10%',
                            scrub: true,
                            marker: false
                        },
                        opacity: 0.2,
                        stagger: 0.5
                    })
                });
            }


            const allDivs = document.querySelectorAll('.aixor-main > div');
            const scaleDownAnimEl = document.querySelectorAll('.scaleDown');
            if (scaleDownAnimEl.length) {
                allDivs.forEach(div => {
                    gsap.fromTo(
                        ".scaleDown", // Target element
                        { scale: 2 }, // From: Start scale (1 means normal size)
                        {
                            scale: 1, // To: End scale (2 means zoomed in)
                            ease: "none", // Animation ease (change as needed)
                            scrollTrigger: {
                                trigger: div, // Trigger element
                                // start: "top top", // Trigger animation at the top of .full-image-sec
                                // end: "bottom top", // End animation at the top of .full-image-sec
                                scrub: true, // Smooth scrubbing effect
                                markers: false // Show ScrollTrigger markers (for debugging)
                            },
                            start: "top top", // Trigger at the top of .full-image-sec
                            end: "bottom top", // End trigger at the top of .full-image-sec
                        }
                    );
                });
            }



            // Contact Form
            const form = document.getElementById("contactForm");
            const result = document.getElementById("result");

            if (form) {
                form.addEventListener("submit", function (e) {
                    e.preventDefault();

                    const formData = new FormData(form);
                    var object = {};
                    formData.forEach((value, key) => {
                        object[key] = value;
                    });
                    if (!object.email) {
                        result.innerHTML = 'Email field is required!';
                        result.style.display = 'block';
                        return;
                    }
                    var json = JSON.stringify(object);
                    result.innerHTML = "Please wait...";
                    result.style.display = 'block';

                    const rawAction = form.getAttribute("action");
                    const actionUrl = rawAction.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/");

                    fetch(actionUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: json
                    })
                        .then(async (response) => {
                            // FormSubmit returns HTML (not JSON) when email is not yet activated.
                            // Read as text first to avoid JSON parse errors.
                            const text = await response.text();
                            let responseData;
                            try {
                                responseData = JSON.parse(text);
                            } catch (err) {
                                // FormSubmit returned HTML — most likely the email isn't activated yet.
                                // The submission still went through; show success and inform user to check email.
                                responseData = null;
                            }

                            if (responseData && (responseData.success === "true" || responseData.success === true)) {
                                result.innerHTML = responseData.message || "Message sent successfully!";
                                result.classList.remove("text-gray-500", "text-red-500");
                                result.classList.add("text-green-500");
                                form.reset();
                            } else if (responseData && responseData.success === "false") {
                                result.innerHTML = responseData.message || "An error occurred. Please try again.";
                                result.classList.remove("text-gray-500", "text-green-500");
                                result.classList.add("text-red-500");
                            } else {
                                // FormSubmit not yet activated — submission received but email confirmation needed.
                                result.innerHTML = "Please check your inbox at official.kodlyx@gmail.com to activate FormSubmit, then resubmit.";
                                result.classList.remove("text-gray-500", "text-red-500");
                                result.classList.add("text-green-500");
                            }
                        })
                        .catch((error) => {
                            console.error('FormSubmit error:', error);
                            result.innerHTML = "Network error. Please check your connection and try again.";
                            result.classList.remove("text-gray-500", "text-green-500");
                            result.classList.add("text-red-500");
                        })
                        .finally(function () {
                            result.style.display = 'block';
                            setTimeout(() => {
                                result.style.display = "none";
                            }, 7000);
                        });
                });
            }
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
        // Set the first link as active when the page loads
        var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        document.querySelectorAll('.notch-bar-menu-wrap a').forEach(function(currLink) {
            var refElement = document.querySelector(currLink.getAttribute("href"));
            if (refElement && refElement.offsetTop <= scrollPos && refElement.offsetTop + refElement.offsetHeight > scrollPos) {
                currLink.classList.add("active");
            }
        });
    });

    window.addEventListener("scroll", function(event) {
        var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        document.querySelectorAll('.notch-bar-menu-wrap a').forEach(function(currLink) {
            var refElement = document.querySelector(currLink.getAttribute("href"));
            if (refElement) {
                if (refElement.offsetTop <= scrollPos && refElement.offsetTop + refElement.offsetHeight > scrollPos) {
                    document.querySelectorAll('.notch-bar-menu-wrap ul li a').forEach(function(link) {
                        link.classList.remove("active");
                    });
                    currLink.classList.add("active");
                } else {
                    currLink.classList.remove("active");
                }
            }
        });
    });

// const appendClones = (containerSelector, itemSelector, times) => {
//     const container = document.querySelector(containerSelector);
//     if (!container) {
//         console.error(`Container not found for selector: ${containerSelector}`);
//         return;
//     }
//     const items = Array.from(container.querySelectorAll(itemSelector));
//     if (items.length === 0) {
//         console.error(`No items found for selector: ${itemSelector}`);
//         return;
//     }
//     for (let i = 0; i < times; i++) {
//         items.forEach(item => container.appendChild(item.cloneNode(true)));
//     }
// };

// appendClones('.our-partner-sec ul', 'li', 2); // Append partner logos
// appendClones('.testimonial-lists', '.testimonial-box', 2); // Append testimonials


})(jQuery);
