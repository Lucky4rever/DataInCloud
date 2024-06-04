import { z } from "zod";

const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  birthdate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

const postSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  content: z.string().min(1),
  createdAt: z.string().refine((date) => !isNaN(new Date(date).getUTCHours()), {
    message: "Invalid date format",
  }),
  userId: z.number(),
});

const validateUser = (user: any) => {
  try {
    userSchema.parse(user);
    return { error: null };
  } catch (e: any) {
    return { error: e.errors };
  }
};

const validatePost = (post: any) => {
  try {
    postSchema.parse(post);
    return { error: null };
  } catch (e: any) {
    return { error: e.errors };
  }
};

export {
  validateUser,
  validatePost,
}; 
