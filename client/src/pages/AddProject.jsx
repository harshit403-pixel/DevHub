import {
  useNavigate,
} from "react-router-dom";
import { useState } from "react";

import {
  useForm,
} from "react-hook-form";

import toast from "react-hot-toast";

import api from "../api/axios";

function AddProject() {
  const navigate =
    useNavigate();
    const [thumbnail, setThumbnail] =
  useState(null);

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

      const formData =
        new FormData();

      formData.append(
        "title",
        data.title
      );

      formData.append(
        "description",
        data.description
      );

      formData.append(
        "githubLink",
        data.githubLink
      );

      formData.append(
        "liveLink",
        data.liveLink
      );

      formData.append(
        "techStack",
        JSON.stringify(
          data.techStack
            .split(",")
            .map((tech) =>
              tech.trim()
            )
        )
      );

      if (thumbnail) {
        formData.append(
          "thumbnail",
          thumbnail
        );
      }

      await api.post(
        "/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Project added"
      );

      navigate(
        "/profile"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to add project"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
        {/* Header */}
        <section className="mb-16">
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-[#7a6d60]">
            Project Showcase
          </p>

          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
            Publish your latest
            project.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#6b6258]">
            Showcase your work,
            technologies and creative
            engineering projects to
            the DevHub community.
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
            {/* Thumbnail */}
<div>
  <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
    Project Thumbnail
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setThumbnail(
        e.target.files[0]
      )
    }
    className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5"
  />
</div>
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                Project Title
              </label>

              <input
                type="text"
                placeholder="Enter project title"
                className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                {...register(
                  "title"
                )}
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                Description
              </label>

              <textarea
                placeholder="Describe your project..."
                className="h-44 w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                {...register(
                  "description"
                )}
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                Tech Stack
              </label>

              <input
                type="text"
                placeholder="React, Node.js, MongoDB..."
                className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                {...register(
                  "techStack"
                )}
              />
            </div>

            {/* Links */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                  GitHub Link
                </label>

                <input
                  type="text"
                  placeholder="GitHub repository"
                  className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                  {...register(
                    "githubLink"
                  )}
                />
              </div>

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                  Live Demo
                </label>

                <input
                  type="text"
                  placeholder="Live project URL"
                  className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                  {...register(
                    "liveLink"
                  )}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                className="rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition hover:scale-[1.02]"
              >
                Publish Project
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/profile"
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

export default AddProject;