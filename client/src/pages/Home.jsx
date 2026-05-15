import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import usePageMotion from "../hooks/usePageMotion";

function Home() {
  const rootRef =
    useRef(null);

  const [projects, setProjects] =
    useState([]);

  const [blogs, setBlogs] =
    useState([]);

  usePageMotion(rootRef, [
    projects,
    blogs,
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
              "/projects/all",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setProjects(res.data);

          const blogsRes =
            await api.get(
              "/blogs",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setBlogs(blogsRes.data);
        } catch (error) {
          console.log(error);
        }
      };

    fetchProjects();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#f5f1ea] text-zinc-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 md:px-10">
        {/* Hero */}
        <section className="mb-20 max-sm:mb-16">
          <div className="max-w-4xl">
            <p
              data-hero-item
              className="mb-6 text-sm uppercase tracking-[0.3em] text-[#7a6d60]"
            >
              Developer Community
            </p>

            <h1
              data-hero-item
              className="text-[clamp(3rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-balance"
            >
              Discover developers,
              projects & ideas shaping
              the future.
            </h1>

            <p
              data-hero-item
              className="mt-8 max-w-2xl text-lg leading-relaxed text-[#6b6258]"
            >
              Explore innovative projects,
              technical blogs and creative
              developers from the DevHub
              community.
            </p>

            <div
              data-hero-item
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/explore"
                data-motion-button
                className="rounded-full bg-zinc-900 px-7 py-4 text-sm font-medium text-white transition hover:scale-[1.02]"
              >
                Explore Platform
              </Link>

              <Link
                to="/projects/add"
                data-motion-button
                className="rounded-full border border-black/10 bg-white/60 px-7 py-4 text-sm font-medium backdrop-blur-xl transition hover:bg-white"
              >
                Add Project
              </Link>
            </div>
          </div>
        </section>

        {/* Trending Projects */}
        <section
          data-motion-section
          className="mb-24"
        >
          <div
            data-motion-item
            className="mb-10 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4"
          >
            <h2 className="text-4xl font-semibold tracking-[-0.04em]">
              Trending Projects
            </h2>

            <Link
              to="/explore"
              className="text-sm text-[#6b6258]"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Link
                to={`/projects/${project._id}`}
                key={project._id}
                data-motion-card
                data-motion-hover
                className="overflow-hidden rounded-[32px] border border-black/5 bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="h-64 overflow-hidden">
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
                  <h3 className="mb-3 text-2xl font-semibold tracking-[-0.03em]">
                    {project.title}
                  </h3>

                  <p className="mb-6 leading-relaxed text-[#6b6258]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[#f3ede4] px-4 py-2 text-sm text-[#5e5448]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={async (e) => {
                      e.preventDefault();

                      try {
                        const token =
                          localStorage.getItem(
                            "token"
                          );

                        const res =
                          await api.put(
                            `/projects/like/${project._id}`,
                            {},
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );

                        setProjects(
                          projects.map((p) =>
                            p._id ===
                            project._id
                              ? res.data
                              : p
                          )
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    className="mt-6 text-sm font-medium text-[#6b6258]"
                  >
                    {"\u2764\uFE0F"}{" "}
                    {project.likes?.length || 0}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Blogs */}
        <section
          data-motion-section
          className="mb-24"
        >
          <div
            data-motion-item
            className="mb-10 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-4"
          >
            <h2 className="text-4xl font-semibold tracking-[-0.04em]">
              Latest Blogs
            </h2>

            <Link
              to="/blogs"
              className="text-sm text-[#6b6258]"
            >
              Read all
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                data-motion-card
                data-motion-hover
                className="rounded-[32px] border border-black/5 bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-[#efe7db]">
                    {blog.author?.profilePicture && (
                      <img
                        src={blog.author.profilePicture}
                        alt={blog.author.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  <div>
                    <p className="font-medium">
                      {blog.author?.name}
                    </p>

                    <p className="text-sm text-[#8a7d6f]">
                      DevHub Author
                    </p>
                  </div>
                </div>

                <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#8a7d6f]">
                  {blog.category}
                </p>

                <h3 className="mb-5 text-3xl font-semibold leading-tight tracking-[-0.04em]">
                  {blog.title}
                </h3>

                <p className="leading-relaxed text-[#6b6258]">
                  {blog.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section data-motion-section>
          <div
            data-motion-item
            className="rounded-[40px] bg-zinc-900 p-10 text-white md:p-16 max-sm:p-8"
          >
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white/50">
              Quick Actions
            </p>

            <h2 className="max-w-4xl text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-balance">
              Start building your developer
              presence on DevHub.
            </h2>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/projects/add"
                data-motion-button
                className="rounded-full bg-[#d8f36f] px-7 py-4 text-sm font-medium text-[#1d1b16]"
              >
                Add Project
              </Link>

              <Link
                to="/blogs/add"
                data-motion-button
                className="rounded-full border border-white/10 px-7 py-4 text-sm font-medium"
              >
                Write Blog
              </Link>

              <Link
                to="/profile/edit"
                data-motion-button
                className="rounded-full border border-white/10 px-7 py-4 text-sm font-medium"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
