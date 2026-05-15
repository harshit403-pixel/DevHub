import {
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";
import usePageMotion from "../hooks/usePageMotion";

function Profile() {
  const { user } = useAuth();
  const rootRef =
    useRef(null);

  const [projects, setProjects] =
    useState([]);

  usePageMotion(rootRef, [
    projects,
  ]);

  useEffect(() => {
    const fetchProjects =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await api.get(
              "/projects",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setProjects(res.data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchProjects();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#f5f1ea] text-zinc-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 md:px-10">
        {/* Hero */}
        <section className="mb-24">
          <div className="overflow-hidden rounded-[42px] border border-black/5 bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
            {/* Banner */}
           <div className="relative h-[340px] overflow-hidden">
  {user.coverImage ? (
    <img
      src={user.coverImage}
      alt="Cover"
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="h-full w-full bg-gradient-to-br from-[#d8f36f] via-[#efe7db] to-[#d9d1c5]" />
  )}

  <div className="absolute inset-0 bg-black/10" />

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.7),transparent_30%)]" />
</div>

            {/* Content */}
            <div className="relative px-8 pb-10 md:px-14">
              {/* Avatar */}
              <div className="-mt-20 mb-8 h-40 w-40 overflow-hidden rounded-full border-[10px] border-[#f5f1ea] bg-gradient-to-br from-[#1f1b16] to-[#5f564d]">
  {user.profilePicture ? (
    <img
      src={user.profilePicture}
      alt="Profile"
      className="h-full w-full object-cover"
    />
  ) : null}
</div> 

              <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p
                    data-hero-item
                    className="mb-4 text-sm uppercase tracking-[0.3em] text-[#7a6d60]"
                  >
                    Developer Profile
                  </p>

                  <h1
                    data-hero-item
                    className="text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-balance"
                  >
                    {user.name}
                  </h1>

                  <p
                    data-hero-item
                    className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6b6258]"
                  >
                    {user.bio ||
                      "No bio added yet"}
                  </p>

                  <div
                    data-hero-item
                    className="mt-8 flex flex-wrap gap-3"
                  >
                    {user.skills?.map(
                      (
                        skill,
                        index
                      ) => (
                        <span
                          key={index}
                          className="rounded-full bg-[#f3ede4] px-5 py-3 text-sm text-[#5e5448]"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div
                  data-hero-item
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    to="/profile/edit"
                    data-motion-button
                    className="rounded-full bg-zinc-900 px-7 py-4 text-sm font-medium text-white transition hover:scale-[1.02]"
                  >
                    Edit Profile
                  </Link>

                  <Link
                    to="/projects/add"
                    data-motion-button
                    className="rounded-full border border-black/10 bg-white/60 px-7 py-4 text-sm font-medium backdrop-blur-xl"
                  >
                    Add Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section data-motion-section>
          <div
            data-motion-item
            className="mb-12 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4"
          >
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#7a6d60]">
                Portfolio
              </p>

              <h2 className="text-5xl font-semibold tracking-[-0.05em]">
                Projects
              </h2>
            </div>

            <p className="text-[#6b6258]">
              {projects.length} projects
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {projects.map(
                (project) => (
                  <Link
                    to={`/projects/${project._id}`}
                    key={project._id}
                    data-motion-card
                    data-motion-hover
                    className="overflow-hidden rounded-[32px] border border-black/5 bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
                  >
                   <div className="h-60 overflow-hidden">
  {project.thumbnail ? (
    <img
      src={project.thumbnail}
      alt={project.title}
      data-motion-media
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="h-full w-full bg-gradient-to-br from-[#d8f36f] via-[#efe7db] to-[#d9d1c5]" />
  )}
</div>

                    <div className="p-7">
                      <h3 className="mb-4 text-3xl font-semibold tracking-[-0.04em]">
                        {project.title}
                      </h3>

                      <p className="mb-6 leading-relaxed text-[#6b6258]">
                        {
                          project.description
                        }
                      </p>

                      <div className="mb-7 flex flex-wrap gap-2">
                        {project.techStack.map(
                          (
                            tech,
                            index
                          ) => (
                            <span
                              key={index}
                              className="rounded-full bg-[#f3ede4] px-4 py-2 text-sm text-[#5e5448]"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>

                      <div className="flex items-center gap-5">
                        <a
                          href={
                            project.githubLink
                          }
                          target="_blank"
                          className="text-sm font-medium text-zinc-900"
                        >
                          GitHub
                        </a>

                        <a
                          href={
                            project.liveLink
                          }
                          target="_blank"
                          className="text-sm font-medium text-[#6b6258]"
                        >
                          Live Demo
                        </a>
                      </div>
                      {(
  project.createdBy?._id ||
  project.createdBy
) === user?._id && (
  <button
    onClick={async (e) => {
      e.preventDefault();

      e.stopPropagation();

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await api.delete(
          `/projects/${project._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProjects(
          projects.filter(
            (p) =>
              p._id !==
              project._id
          )
        );

        toast.success(
          "Project deleted"
        );
      } catch (error) {
        toast.error(
          "Delete failed"
        );
      }
    }}
    className="mt-4 text-sm font-medium text-red-500"
  >
    Delete Project
  </button>
)}
                    </div>
                  </Link>

                )
              )}
            </div>
          ) : (
            <p className="text-[#7b7065]">
              No projects added yet
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;
