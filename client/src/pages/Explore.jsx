import {
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import api from "../api/axios";
import { Link } from "react-router-dom";
import usePageMotion from "../hooks/usePageMotion";

function Explore() {
  const rootRef =
    useRef(null);

  const [query, setQuery] = useState("");

  const [results, setResults] = useState({
    users: [],
    projects: [],
  });

  usePageMotion(rootRef, [
    results,
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
        toast.error(
  "Enter something to search"
);


  return;
}

    try {
      const res = await api.get(
        `/search?q=${query}`
      );

      setResults(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#f5f1ea] text-zinc-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 md:px-10">
        {/* Header */}
        <section className="mb-16 max-sm:mb-12">
          <p
            data-hero-item
            className="mb-5 text-sm uppercase tracking-[0.3em] text-[#7a6d60]"
          >
            Discovery
          </p>

          <h1
            data-hero-item
            className="max-w-5xl text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-balance"
          >
            Explore developers,
            projects & technologies.
          </h1>

          <p
            data-hero-item
            className="mt-7 max-w-2xl text-lg leading-relaxed text-[#6b6258]"
          >
            Discover talented developers,
            innovative projects and ideas
            from the DevHub ecosystem.
          </p>
        </section>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          data-hero-item
          className="mb-20 flex flex-col gap-4 md:flex-row"
        >
          <input
            type="text"
            placeholder="Search developers, skills, projects..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="flex-1 rounded-full border border-black/5 bg-white/70 px-7 py-5 text-zinc-900 outline-none backdrop-blur-xl placeholder:text-[#8a7d6f]"
          />

          <button
            type="submit"
            data-motion-button
            className="rounded-full bg-zinc-900 px-8 py-5 text-white transition hover:scale-[1.02]"
          >
            Search
          </button>
        </form>

        {/* Developers */}
        <section
          data-motion-section
          className="mb-24"
        >
          <div
            data-motion-item
            className="mb-10 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-3"
          >
            <h2 className="text-4xl font-semibold tracking-[-0.04em]">
              Developers
            </h2>

            <p className="text-[#6b6258]">
              {results.users.length} results
            </p>
          </div>

          {results.users.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.users.map((user) => (
                <div
                  key={user._id}
                  data-motion-card
                  data-motion-hover
                  className="rounded-[32px] border border-black/5 bg-white/70 p-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
                >
                  <div className="mb-6 h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-[#d8f36f] via-[#efe7db] to-[#d9d1c5]">
  {user.profilePicture && (
    <img
      src={user.profilePicture}
      alt={user.name}
      data-motion-media
      className="h-full w-full object-cover"
    />
  )}
</div>

                  <h3 className="mb-3 text-2xl font-semibold tracking-[-0.03em]">
                    {user.name}
                  </h3>

                  <p className="mb-6 leading-relaxed text-[#6b6258]">
                    {user.bio || "No bio"}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {user.skills?.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-[#f3ede4] px-4 py-2 text-sm text-[#5e5448]"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#7b7065]">
              No developers found
            </p>
          )}
        </section>

        {/* Projects */}
        <section data-motion-section>
          <div
            data-motion-item
            className="mb-10 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-3"
          >
            <h2 className="text-4xl font-semibold tracking-[-0.04em]">
              Projects
            </h2>

            <p className="text-[#6b6258]">
              {results.projects.length} results
            </p>
          </div>

          {results.projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.projects.map(
                (project) => (
                  <Link
                    to={`/projects/${project._id}`} 
                    key={project._id}
                    data-motion-card
                    data-motion-hover
                    className="overflow-hidden rounded-[32px] border border-black/5 bg-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
                  >
                   <div className="h-56 overflow-hidden">
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
                        {
                          project.description
                        }
                      </p>

                      <div className="mb-6 flex flex-wrap gap-2">
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

                      <p className="text-sm text-[#8a7d6f]">
                        By{" "}
                        {
                          project
                            .createdBy
                            ?.name
                        }
                      </p>
                      
                    </div>
                  </Link>
                )
              )}
            </div>
          ) : (
            <p className="text-[#7b7065]">
              No projects found
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Explore;
