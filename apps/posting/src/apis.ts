import { type PostType, type UserType } from "./types";

export const getPosts = async (token: string): Promise<PostType[]> => {
  const res = await fetch("http://localhost:4000/posts?_sort=id_order=desc", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

export const createPost = async (
  token: string,
  body: { message: string }
): Promise<void> => {
  await fetch("http://localhost:4000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
};

export const removePost = async (token: string, id: number): Promise<void> => {
  await fetch(`http://localhost:4000/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUser = async (token: string): Promise<UserType> => {
  const res = await fetch(`http://localhost:4000/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
