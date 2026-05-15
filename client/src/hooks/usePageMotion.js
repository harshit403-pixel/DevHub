import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function usePageMotion(
  rootRef,
  dependencies = []
) {
  useLayoutEffect(() => {
    const root = rootRef.current;

    if (
      !root ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return undefined;
    }

    const context = gsap.context(() => {
      const heroItems = Array.from(
        root.querySelectorAll(
          "[data-hero-item]"
        )
      );

      if (heroItems.length) {
        // Hero content enters first to set the page rhythm.
        gsap.set(heroItems, {
          opacity: 0,
          y: 28,
        });

        gsap.to(heroItems, {
          opacity: 1,
          y: 0,
          duration: 0.82,
          stagger: 0.08,
          ease: "power3.out",
          clearProps:
            "opacity,transform",
        });
      }
    }, root);

    return () => context.revert();
  }, [rootRef]);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (
      !root ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return undefined;
    }

    const cleanups = [];

    const context = gsap.context(() => {
      const sections = Array.from(
        root.querySelectorAll(
          "[data-motion-section]"
        )
      );

      sections.forEach((section) => {
        const items = Array.from(
          section.querySelectorAll(
            "[data-motion-item], [data-motion-card]"
          )
        );

        if (!items.length) {
          return;
        }

        // Each section gets a subtle fade-up reveal with stagger for cards.
        gsap.set(items, {
          opacity: 0,
          y: 34,
        });

        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.88,
          stagger: 0.09,
          ease: "power3.out",
          clearProps:
            "opacity,transform",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });
      });

      if (
        window.matchMedia(
          "(pointer: fine)"
        ).matches
      ) {
        const hoverTargets = Array.from(
          root.querySelectorAll(
            "[data-motion-hover], [data-motion-button]"
          )
        );

        hoverTargets.forEach((element) => {
          const media =
            element.querySelector(
              "[data-motion-media]"
            );

          const isButton =
            element.hasAttribute(
              "data-motion-button"
            );

          const handleEnter = () => {
            gsap.to(element, {
              y: isButton ? -2 : -6,
              scale: isButton
                ? 1.01
                : 1.015,
              duration: 0.35,
              ease: "power3.out",
              overwrite: true,
            });

            if (media) {
              gsap.to(media, {
                scale: 1.04,
                duration: 0.45,
                ease: "power3.out",
                overwrite: true,
              });
            }
          };

          const handleLeave = () => {
            gsap.to(element, {
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
              overwrite: true,
            });

            if (media) {
              gsap.to(media, {
                scale: 1,
                duration: 0.45,
                ease: "power3.out",
                overwrite: true,
              });
            }
          };

          element.addEventListener(
            "pointerenter",
            handleEnter
          );
          element.addEventListener(
            "pointerleave",
            handleLeave
          );

          cleanups.push(() => {
            element.removeEventListener(
              "pointerenter",
              handleEnter
            );
            element.removeEventListener(
              "pointerleave",
              handleLeave
            );
          });
        });
      }
    }, root);

    return () => {
      cleanups.forEach((cleanup) =>
        cleanup()
      );
      context.revert();
    };
  }, [rootRef, ...dependencies]);
}

export default usePageMotion;
