import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import api from "../api/axios";
import usePageMotion from "../hooks/usePageMotion";

function ProjectDetails() {
  const rootRef =
    useRef(null);

  const { id } =
    useParams();

  const [project, setProject] =
    useState(null);

  usePageMotion(rootRef, [
    project,
  ]);

  useEffect(() => {
    const fetchProject =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await api.get(
              `/projects/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setProject(
            res.data
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchProject();
  }, [id]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f1ea]">
        Loading...
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#f5f1ea] text-zinc-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 md:px-10">
        {/* Hero */}
        <div
          data-motion-section
          className="overflow-hidden rounded-[40px] border border-black/5 bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
        >
          {/* Thumbnail */}
          <div className="h-[500px] overflow-hidden">
            {project.thumbnail ? (
              <img
                src={
                  project.thumbnail
                }
                alt={
                  project.title
                }
                data-motion-media
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-[#d8f36f] via-[#efe7db] to-[#d9d1c5]" />
            )}
          </div>

          {/* Content */}
          <div className="p-8 md:p-14">
            <p
              data-hero-item
              className="mb-5 text-sm uppercase tracking-[0.3em] text-[#7a6d60]"
            >
              Project Showcase
            </p>

            <h1
              data-hero-item
              className="max-w-5xl text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-balance"
            >
              {project.title}
            </h1>

            <p
              data-hero-item
              className="mt-8 max-w-4xl text-lg leading-relaxed text-[#6b6258]"
            >
              {
                project.description
              }
            </p>

            {/* Tech Stack */}
            <div
              data-motion-item
              className="mt-10 flex flex-wrap gap-3"
            >
              {project.techStack?.map(
                (
                  tech,
                  index
                ) => (
                  <span
                    key={index}
                    className="rounded-full bg-[#f3ede4] px-5 py-3 text-sm text-[#5e5448]"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* Creator */}
            <div
              data-motion-item
              className="mt-14 flex items-center gap-4"
            >
              <div className="h-16 w-16 overflow-hidden rounded-full bg-[#efe7db]">
                {project.createdBy
                  ?.profilePicture && (
                  <img
                    src={
                      project
                        .createdBy
                        .profilePicture
                    }
                    alt={
                      project
                        .createdBy
                        .name
                    }
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div>
                <p className="font-medium">
                  {
                    project
                      .createdBy
                      ?.name
                  }
                </p>

                <p className="text-sm text-[#7a6d60]">
                  DevHub Creator
                </p>
              </div>
            </div>

            {/* Links */}
            <div
              data-motion-item
              className="mt-14 flex flex-wrap gap-5"
            >
              <a
                href={
                  project.githubLink
                }
                target="_blank"
                data-motion-button
                className="rounded-full bg-zinc-900 px-7 py-4 text-sm font-medium text-white transition hover:scale-[1.02]"
              >
                View GitHub
              </a>

              <a
                href={
                  project.liveLink
                }
                target="_blank"
                data-motion-button
                className="rounded-full border border-black/10 bg-white/60 px-7 py-4 text-sm font-medium backdrop-blur-xl"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
