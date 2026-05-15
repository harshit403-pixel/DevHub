import {
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useAuth } from "../context/AuthContext";
import mainPhoto from "../assets/main.webp";

import photo1 from "../assets/photosForHero/1.jpg";
import photo2 from "../assets/photosForHero/2.jpg";
import photo3 from "../assets/photosForHero/3.jpg";
import photo4 from "../assets/photosForHero/4.jpg";
import photo5 from "../assets/photosForHero/5.jpg";
import photo6 from "../assets/photosForHero/6.jpg";
import photo7 from "../assets/photosForHero/7.jpg";
import photo8 from "../assets/photosForHero/8.jpg";
import photo9 from "../assets/photosForHero/9.jpg";
import photo10 from "../assets/photosForHero/10.jpg";
import photo11 from "../assets/photosForHero/11.jpg";
import photo12 from "../assets/photosForHero/12.jpg";
import photo13 from "../assets/photosForHero/13.jpg";
import photo14 from "../assets/photosForHero/14.jpg";
import photo15 from "../assets/photosForHero/15.jpg";
import photo16 from "../assets/photosForHero/16.jpg";
import photo17 from "../assets/photosForHero/17.jpg";

gsap.registerPlugin(ScrollTrigger);

const heroPhotos = [
  {
    src: photo17,
    alt: "Vintage computer",
    className:
      "left-[-1%] top-[4%] hidden lg:block w-24 xl:w-28 aspect-[4/5]",
    rotate: -4,
  },
  {
    src: photo5,
    alt: "Megaphone collage",
    className:
      "left-[12%] top-[8%] hidden xl:block w-24 aspect-[16/10]",
    rotate: 3,
  },
  {
    src: photo12,
    alt: "Camera on laptop collage",
    className:
      "left-[-4%] top-[22%] hidden md:block w-28 lg:w-[8.5rem] xl:w-[9.5rem] aspect-[6/5]",
    rotate: -2,
  },
  {
    src: photo1,
    alt: "Notebook and idea sketch",
    className:
      "left-[7%] top-[45%] w-20 md:w-[5.5rem] lg:w-[6.5rem] aspect-[5/6]",
    rotate: -3,
  },
  {
    src: photo11,
    alt: "Digital collaboration artwork",
    className:
      "left-[28%] top-[12%] w-24 md:w-28 lg:w-32 aspect-[1/1]",
    rotate: -4,
  },
  {
    src: photo10,
    alt: "Keep going design poster",
    className:
      "left-[38%] top-[3%] hidden md:block w-28 md:w-32 lg:w-36 xl:w-[9.5rem] aspect-[4/5]",
    rotate: 1,
  },
  {
    src: photo16,
    alt: "Team around a timer",
    className:
      "right-[29%] top-[13%] hidden md:block w-24 md:w-28 lg:w-32 xl:w-36 aspect-[1/1]",
    rotate: 3,
  },
  {
    src: photo15,
    alt: "Red dramatic poster",
    className:
      "right-[4%] top-[6%] hidden lg:block w-[4.5rem] xl:w-[5.5rem] aspect-[1/1]",
    rotate: -2,
  },
  {
    src: photo4,
    alt: "Hackathon poster",
    className:
      "right-[6%] top-[27%] w-32 sm:w-40 md:w-44 lg:w-[12.5rem] xl:w-[13.5rem] aspect-[4/5]",
    rotate: 2,
  },
  {
    src: photo8,
    alt: "Editorial red collage poster",
    className:
      "right-[-1%] top-[60%] hidden lg:block w-16 xl:w-20 aspect-[4/5]",
    rotate: -5,
  },
  {
    src: photo6,
    alt: "Time collage artwork",
    className:
      "left-[15%] bottom-[14%] hidden md:block w-28 lg:w-32 xl:w-36 aspect-[1/1]",
    rotate: -2,
  },
  {
    src: photo3,
    alt: "Design shortcut poster",
    className:
      "left-[30%] bottom-[22%] hidden md:block w-20 lg:w-24 xl:w-28 aspect-[1/1]",
    rotate: 4,
  },
  {
    src: photo14,
    alt: "Typing keyboard collage",
    className:
      "left-[-2%] bottom-[12%] hidden xl:block w-28 aspect-[1/1]",
    rotate: -3,
  },
  {
    src: photo7,
    alt: "Idea bulb collage",
    className:
      "left-[42%] bottom-[6%] hidden xl:block w-24 aspect-[1/1]",
    rotate: 2,
  },
  {
    src: photo13,
    alt: "Creative book cover",
    className:
      "right-[18%] bottom-[9%] w-32 sm:w-40 md:w-48 lg:w-56 xl:w-60 aspect-[16/10]",
    rotate: -2,
  },
  {
    src: photo2,
    alt: "Ask anything laptop collage",
    className:
      "right-[-3%] bottom-[18%] hidden xl:block w-28 aspect-[16/10]",
    rotate: -4,
  },
  {
    src: photo9,
    alt: "Blue keyboard hands collage",
    className:
      "right-[6%] bottom-[2%] hidden xl:block w-28 aspect-[1/1]",
    rotate: 2,
  },
];

function FloatingPhoto({
  src,
  alt,
  className,
  rotate,
}) {
  const photoRef = useRef(null);

  useEffect(() => {
    const photo = photoRef.current;

    if (!photo || !window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    const handlePointerEnter = () => {
      gsap.to(photo, {
        scale: 1.045,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const handlePointerMove = (event) => {
      const bounds = photo.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(photo, {
        x: x * 12,
        y: y * 12,
        rotate: rotate + x * 6,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handlePointerLeave = () => {
      gsap.to(photo, {
        x: 0,
        y: 0,
        rotate,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      });
    };

    photo.addEventListener("pointerenter", handlePointerEnter);
    photo.addEventListener("pointermove", handlePointerMove);
    photo.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      photo.removeEventListener("pointerenter", handlePointerEnter);
      photo.removeEventListener("pointermove", handlePointerMove);
      photo.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [rotate]);

  return (
    <div
      ref={photoRef}
      data-photo
      data-tunnel-photo
      className={`absolute z-10 transform-gpu will-change-transform ${className}`}
      style={{ rotate: `${rotate}deg` }}
    >
      <div className="h-full w-full overflow-hidden bg-white shadow-[0_18px_40px_rgba(58,40,18,0.14)] ring-1 ring-black/[0.06]">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          draggable="false"
        />
      </div>
    </div>
  );
}

function LandingFooter() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 md:bottom-6 md:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1880px] flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div
          aria-hidden="true"
          className="hidden md:block md:w-[8.75rem] lg:w-[9.5rem]"
        />

        <div className="pointer-events-auto flex justify-center">
          <div className="w-full max-w-[640px] rounded-[28px] bg-white px-6 py-4 shadow-[0_24px_70px_rgba(58,40,18,0.14)] ring-1 ring-black/[0.06] md:px-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/"
                className="text-center text-3xl font-semibold tracking-[-0.07em] text-[#171411] sm:text-left sm:text-4xl"
              >
                DevHub
              </Link>

              <div className="flex items-center justify-center gap-3 sm:justify-end">
                {user ? (
                  <>
                    <Link
                      to="/home"
                      className="px-4 py-3 text-sm uppercase tracking-[0.24em] text-[#171411] transition-opacity duration-300 hover:opacity-70"
                    >
                      Home
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="rounded-full bg-[#d9f46d] px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#171411] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-3 text-sm uppercase tracking-[0.24em] text-[#171411] transition-opacity duration-300 hover:opacity-70"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="rounded-full bg-[#d9f46d] px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#171411] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 md:justify-end">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#5d564d]">
            Scroll
          </p>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_18px_40px_rgba(58,40,18,0.12)] ring-1 ring-black/[0.06]">
            <ChevronDown className="h-6 w-6 text-[#171411]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Landing() {
  const rootRef = useRef(null);
  const tunnelSectionRef = useRef(null);
  const tunnelStageRef = useRef(null);
  const tunnelCanvasRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroTopLineRef = useRef(null);
  const heroBottomLeftRef = useRef(null);
  const heroBottomRightRef = useRef(null);
  const tunnelGapRef = useRef(null);
  const tunnelOriginRef = useRef(null);
  const tunnelFrameRef = useRef(null);
  const tunnelImageRef = useRef(null);
  const tunnelShadeRef = useRef(null);
  const tunnelOverlayRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set("[data-reveal]", {
        opacity: 0,
        y: 26,
      });

      gsap.set("[data-photo]", {
        opacity: 0,
        scale: 0.88,
      });

      gsap
        .timeline({
          defaults: {
            ease: "power3.out",
          },
        })
        .to(
          "[data-photo]",
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.06,
          },
          0
        )
        .to(
          "[data-reveal]",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
          },
          0.18
        );

      const tunnelSection = tunnelSectionRef.current;
      const tunnelStage = tunnelStageRef.current;
      const tunnelCanvas = tunnelCanvasRef.current;
      const heroCopy = heroCopyRef.current;
      const heroTopLine = heroTopLineRef.current;
      const heroBottomLeft = heroBottomLeftRef.current;
      const heroBottomRight = heroBottomRightRef.current;
      const tunnelGap = tunnelGapRef.current;
      const tunnelOrigin = tunnelOriginRef.current;
      const tunnelFrame = tunnelFrameRef.current;
      const tunnelImage = tunnelImageRef.current;
      const tunnelShade = tunnelShadeRef.current;
      const tunnelOverlay = tunnelOverlayRef.current;

      if (
        tunnelSection &&
        tunnelStage &&
        tunnelCanvas &&
        heroCopy &&
        heroTopLine &&
        heroBottomLeft &&
        heroBottomRight &&
        tunnelGap &&
        tunnelOrigin &&
        tunnelFrame &&
        tunnelImage &&
        tunnelShade &&
        tunnelOverlay
      ) {
        const tunnelPhotos = gsap
          .utils
          .toArray("[data-tunnel-photo]")
          .filter((photo) => photo.offsetParent !== null);

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const canvasBounds = tunnelCanvas.getBoundingClientRect();
        const originBounds = tunnelOrigin.getBoundingClientRect();
        const canvasCenterX = canvasBounds.width / 2;
        const canvasCenterY = canvasBounds.height / 2;
        const originCenterX =
          originBounds.left - canvasBounds.left + originBounds.width / 2;
        const originCenterY =
          originBounds.top - canvasBounds.top + originBounds.height / 2;
        const originOffsetX = originCenterX - canvasCenterX;
        const originOffsetY = originCenterY - canvasCenterY;
        const photoTargets = tunnelPhotos.map((photo) => {
          const bounds = photo.getBoundingClientRect();
          const dx = bounds.left + bounds.width / 2 - centerX;
          const dy = bounds.top + bounds.height / 2 - centerY;
          const xDirection = dx >= 0 ? 1 : -1;
          const yDirection = dy >= 0 ? 1 : -1;

          return {
            x: dx * 1.35 + xDirection * window.innerWidth * 0.2,
            y: dy * 1.35 + yDirection * window.innerHeight * 0.2,
            scale: 1.9,
          };
        });

        gsap.set(tunnelPhotos, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        });

        gsap.set(tunnelGap, {
          width: 0,
        });

        gsap.set(tunnelFrame, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          x: originOffsetX,
          y: originOffsetY,
          width: originBounds.width,
          height: originBounds.height,
          opacity: 0,
          scale: 1,
          borderRadius: 8,
          force3D: true,
        });

        gsap.set(tunnelImage, {
          scale: 1.26,
          force3D: true,
        });

        gsap.set(tunnelShade, {
          opacity: 0,
        });

        gsap.set(tunnelOverlay, {
          opacity: 0,
          y: 28,
        });

        const tunnelTimeline = gsap.timeline({
          defaults: {
            ease: "none",
          },
          scrollTrigger: {
            trigger: tunnelSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.05,
            pin: tunnelStage,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tunnelTimeline
          .to(
            heroTopLine,
            {
              opacity: 0.14,
              y: -18,
            },
            0.08
          )
          .to(
            tunnelGap,
            {
              width: originBounds.width,
            },
            0.1
          )
          .to(
            tunnelFrame,
            {
              opacity: 1,
            },
            0.08
          );

        photoTargets.forEach((target, index) => {
          tunnelTimeline.to(
            tunnelPhotos[index],
            {
              x: target.x,
              y: target.y,
              scale: target.scale,
              opacity: 0,
            },
            0.16
          );
        });

        tunnelTimeline
          .to(
            heroCopy,
            {
              scale: 1.18,
            },
            0.26
          )
          .to(
            tunnelFrame,
            {
              x: 0,
              y: 0,
              width: window.innerWidth,
              height: window.innerHeight,
              borderRadius: 0,
              boxShadow: "0 0 0 rgba(58, 40, 18, 0)",
            },
            0.22
          )
          .to(
            tunnelImage,
            {
              scale: 1.01,
            },
            0.22
          )
          .to(
            heroCopy,
            {
              opacity: 0,
            },
            0.26
          )
          .to(
            tunnelShade,
            {
              opacity: 0.18,
            },
            0.4
          )
          .to(
            tunnelOverlay,
            {
              opacity: 1,
              y: 0,
            },
            0.48
          );
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => context.revert();
  }, []);

  return (  
    <main
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#f4efe7] text-[#171411]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(214,233,171,0.22),transparent_24%)]" />

      <section
        ref={tunnelSectionRef}
        className="relative h-[320svh]"
      >
        <div
          ref={tunnelStageRef}
          className="relative flex h-[100svh] items-center justify-center overflow-hidden px-4 pt-0 sm:px-6 md:px-10"
        >
          <div
            ref={tunnelCanvasRef}
            className="relative mx-auto flex h-full w-full max-w-[1880px] items-center justify-center"
          >
            {heroPhotos.map((photo) => (
              <FloatingPhoto
                key={photo.alt}
                src={photo.src}
                alt={photo.alt}
                className={photo.className}
                rotate={photo.rotate}
              />
            ))}

            <div
              ref={tunnelFrameRef}
              className="pointer-events-none absolute z-10 overflow-hidden bg-[#7b7368] shadow-[0_20px_55px_rgba(58,40,18,0.12)] transform-gpu will-change-transform"
            >
              <div
                ref={tunnelShadeRef}
                className="absolute inset-0 z-10 bg-black/40"
              />

              <img
                ref={tunnelImageRef}
                src={mainPhoto}
                alt="Featured developer portrait"
                className="h-full w-full object-cover"
                draggable="false"
              />
            </div>

            <div
              ref={heroCopyRef}
              className="relative z-20 max-w-5xl px-4 text-center"
            >
              <h1
                data-reveal
                className="text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-[#171411]"
              >
                <span
                  ref={heroTopLineRef}
                  className="block"
                >
                  Real developer stories
                </span>

                <span className="mt-2 inline-grid grid-cols-[auto_auto_auto] items-center whitespace-nowrap">
                  <span ref={heroBottomLeftRef}>
                    by real
                  </span>

                  <span
                    ref={tunnelGapRef}
                    className="relative inline-block h-[2.6rem] w-0 align-middle md:h-[3.2rem]"
                  >
                    <span
                      ref={tunnelOriginRef}
                      className="absolute left-1/2 top-1/2 inline-block h-[2.6rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 align-middle md:h-[3.2rem] md:w-[5.8rem]"
                    />
                  </span>

                  <span
                    ref={heroBottomRightRef}
                    className="pl-[0.2em]"
                  >
                    builders
                  </span>
                </span>
              </h1>
            </div>

            <div
              ref={tunnelOverlayRef}
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6 text-center"
            >
              <p className="max-w-5xl text-[clamp(1.8rem,4.3vw,4.2rem)] font-normal leading-[1.02] tracking-[-0.05em] text-white">
                Featuring developers from around the world
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}

export default Landing;
