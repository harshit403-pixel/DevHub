import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import usePageMotion from "../hooks/usePageMotion";

function Blogs() {
  const rootRef =
    useRef(null);

  const [blogs, setBlogs] = useState([]);

  usePageMotion(rootRef, [
    blogs,
  ]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");

        setBlogs(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-[#f5f1ea] text-zinc-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-14 md:px-10">
        {/* Header */}
        <section className="mb-20 max-sm:mb-16">
          <p
            data-hero-item
            className="mb-5 text-sm uppercase tracking-[0.3em] text-[#7a6d60]"
          >
            Technical Writing
          </p>

          <h1
            data-hero-item
            className="max-w-5xl text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-balance"
          >
            Thoughts, engineering &
            developer stories.
          </h1>

          <p
            data-hero-item
            className="mt-7 max-w-2xl text-lg leading-relaxed text-[#6b6258]"
          >
            Read technical blogs, ideas
            and experiences shared by the
            DevHub community.
          </p>

          <div
            data-hero-item
            className="mt-10"
          >
            <Link
              to="/blogs/add"
              data-motion-button
              className="inline-flex rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition hover:scale-[1.02]"
            >
              Write Blog
            </Link>
          </div>
        </section>

        {/* Blogs Grid */}
        {blogs.length > 0 ? (
          <div
            data-motion-section
            className="grid gap-8 lg:grid-cols-2"
          >
            {blogs.map((blog) => (
              <article
                key={blog._id}
                data-motion-card
                data-motion-hover
                className="rounded-[36px] border border-black/5 bg-white/70 p-9 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
              >
                <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#8a7d6f]">
                  {blog.category}
                </p>

                <h2 className="mb-6 text-4xl font-semibold leading-tight tracking-[-0.05em]">
                  {blog.title}
                </h2>

                <p className="mb-8 leading-relaxed text-[#6b6258] line-clamp-4">
                  {blog.content}
                </p>

                <div className="mb-8 flex flex-wrap gap-2">
                  {blog.tags.map(
                    (tag, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-[#f3ede4] px-4 py-2 text-sm text-[#5e5448]"
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </div>

                <div className="flex items-center justify-between">
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
                  <p className="text-sm text-[#8a7d6f]">
                    By{" "}
                    {
                      blog.author?.name
                    }
                  </p>

                  <button className="text-sm font-medium text-zinc-900">
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-[#7b7065]">
            No blogs found
          </p>
        )}
      </div>
    </div>
  );
}

export default Blogs;
