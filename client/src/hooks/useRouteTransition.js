import { useLayoutEffect } from "react";
import gsap from "gsap";

function useRouteTransition(
  rootRef,
  dependency,
  options = {}
) {
  const {
    duration = 0.72,
    y = 22,
    scale = 1,
    ease = "power3.out",
    delay = 0,
  } = options;

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
      gsap.killTweensOf(root);

      gsap.fromTo(
        root,
        {
          opacity: 0,
          y,
          scale,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease,
          clearProps:
            "opacity,transform",
        }
      );
    }, root);

    return () => context.revert();
  }, [rootRef, dependency, duration, y, scale, ease, delay]);
}

export default useRouteTransition;
