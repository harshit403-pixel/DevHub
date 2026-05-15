import {
  useNavigate,
} from "react-router-dom";

import {
  useForm,
} from "react-hook-form";

import toast from "react-hot-toast";

import api from "../api/axios";

function AddBlog() {
  const navigate =
    useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit =
    async (data) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const payload = {
          title: data.title,

          content:
            data.content,

          tags: data.tags
            .split(",")
            .map((tag) =>
              tag.trim()
            ),

          category:
            data.category,
        };

        await api.post(
          "/blogs",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Blog published"
        );

        navigate(
          "/blogs"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to publish blog"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
        {/* Header */}
        <section className="mb-16">
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-[#7a6d60]">
            Technical Writing
          </p>

          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
            Share your ideas &
            engineering insights.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#6b6258]">
            Publish technical blogs,
            tutorials and experiences
            for the DevHub community.
          </p>
        </section>

        {/* Form */}
        <div className="rounded-[40px] border border-black/5 bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] md:p-12">
          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-7"
          >
            {/* Title */}
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                Blog Title
              </label>

              <input
                type="text"
                placeholder="Enter blog title"
                className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                {...register(
                  "title"
                )}
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                Category
              </label>

              <input
                type="text"
                placeholder="Frontend, Backend, AI..."
                className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                {...register(
                  "category"
                )}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                Tags
              </label>

              <input
                type="text"
                placeholder="React, MERN, MongoDB..."
                className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                {...register(
                  "tags"
                )}
              />
            </div>

            {/* Content */}
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                Content
              </label>

              <textarea
                placeholder="Write your technical blog..."
                className="h-[420px] w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                {...register(
                  "content"
                )}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                className="rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition hover:scale-[1.02]"
              >
                Publish Blog
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/blogs"
                  )
                }
                className="rounded-full border border-black/10 bg-white/60 px-8 py-4 text-sm font-medium backdrop-blur-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;