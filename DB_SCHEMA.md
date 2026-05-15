# DevHub Database Schema

---

# User Schema

```js
{
  name: String,
  email: String,
  password: String,

  bio: String,

  skills: [String],

  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
  },

  profilePicture: String,

  coverImage: String,
}
```

---

# Project Schema

```js
{
  title: String,

  description: String,

  techStack: [String],

  githubLink: String,

  liveLink: String,

  thumbnail: String,

  likes: [
    ObjectId
  ],

  createdBy: ObjectId,
}
```

---

# Blog Schema

```js
{
  title: String,

  content: String,

  category: String,

  tags: [String],

  author: ObjectId,
}
```

---

# Relationships

## User → Projects
One user can create many projects.

## User → Blogs
One user can publish many blogs.

## Project → Likes
Many users can like many projects.

---

# Media Storage

Images are uploaded using:
- Multer
- Cloudinary

Stored as image URLs inside MongoDB.
