import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useForm,
} from "react-hook-form";

import toast from "react-hot-toast";

import api from "../api/axios";

import {
  useAuth,
} from "../context/AuthContext";

function EditProfile() {
    
  const {
    user,
    setUser,
  } = useAuth();

  const navigate =
    useNavigate();
    const [profileImage, setProfileImage] =
  useState(null);

const [coverImage, setCoverImage] =
  useState(null);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        bio:
          user.bio || "",

        skills:
          user.skills?.join(
            ", "
          ) || "",

        github:
          user.socialLinks
            ?.github || "",

        linkedin:
          user.socialLinks
            ?.linkedin || "",

        twitter:
          user.socialLinks
            ?.twitter || "",
      });
    }
  }, [user, reset]);

  const onSubmit =
    async (data) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );
          /* Upload Profile Picture */
if (profileImage) {
  const formData =
    new FormData();

  formData.append(
    "image",
    profileImage
  );

  const res =
    await api.post(
      "/upload/profile-picture",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  setUser(res.data);
}

/* Upload Cover Image */
if (coverImage) {
  const formData =
    new FormData();

  formData.append(
    "image",
    coverImage
  );

  const res =
    await api.post(
      "/upload/cover-image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  setUser(res.data);
}

        const payload = {
          bio: data.bio,

          skills:
            data.skills
              .split(",")
              .map((skill) =>
                skill.trim()
              ),

          socialLinks: {
            github:
              data.github,

            linkedin:
              data.linkedin,

            twitter:
              data.twitter,
          },
        };

        const res =
          await api.put(
            "/users/update",
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setUser(res.data);

        toast.success(
          "Profile updated"
        );

        navigate(
          "/profile"
        );
      } catch (error) {
        console.log(error);

        toast.error(
          "Update failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-14 md:px-10">
        {/* Header */}
        <section className="mb-16">
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-[#7a6d60]">
            Profile Settings
          </p>

          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
            Edit your developer
            identity.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#6b6258]">
            Update your profile,
            showcase your skills and
            personalize your DevHub
            presence.
          </p>
        </section>

        {/* Form */}
        <div className="rounded-[40px] border border-black/5 bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] md:p-12">
          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-7"
          >{/* Images */}
<div className="grid gap-6 md:grid-cols-2">
  {/* Profile Picture */}
  <div>
    <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
      Profile Picture
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setProfileImage(
          e.target.files[0]
        )
      }
      className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5"
    />
  </div>

  {/* Cover Image */}
  <div>
    <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
      Cover Image
    </label>

    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setCoverImage(
          e.target.files[0]
        )
      }
      className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5"
    />
  </div>
</div>
            {/* Bio */}
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                Bio
              </label>

              <textarea
                placeholder="Tell the community about yourself..."
                className="h-40 w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                {...register(
                  "bio"
                )}
              />
            </div>

            {/* Skills */}
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                Skills
              </label>

              <input
                type="text"
                placeholder="React, Node.js, MongoDB..."
                className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                {...register(
                  "skills"
                )}
              />
            </div>

            {/* Socials */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                  GitHub
                </label>

                <input
                  type="text"
                  placeholder="GitHub profile link"
                  className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                  {...register(
                    "github"
                  )}
                />
              </div>

              <div>
                <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                  LinkedIn
                </label>

                <input
                  type="text"
                  placeholder="LinkedIn profile link"
                  className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                  {...register(
                    "linkedin"
                  )}
                />
              </div>
            </div>

            {/* Twitter */}
            <div>
              <label className="mb-3 block text-sm uppercase tracking-[0.2em] text-[#7a6d60]">
                Twitter / X
              </label>

              <input
                type="text"
                placeholder="Twitter profile link"
                className="w-full rounded-[28px] border border-black/5 bg-[#faf7f2] px-6 py-5 outline-none placeholder:text-[#8a7d6f]"
                {...register(
                  "twitter"
                )}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="submit"
                className="rounded-full bg-zinc-900 px-8 py-4 text-sm font-medium text-white transition hover:scale-[1.02]"
              >
                Save Changes
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

export default EditProfile;