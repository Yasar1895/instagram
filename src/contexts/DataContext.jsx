import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const DataContext = createContext();
const DB_KEY = "insta_clone_db_v1";

function seed() {
  const users = [
    { id: "u1", username: "alex", email: "alex@example.com", password: "1234", avatar: "/images/avatar1.jpg", bio: "Photographer & traveler" },
    { id: "u2", username: "maya", email: "maya@example.com", password: "1234", avatar: "/images/avatar2.jpg", bio: "Baker | Food lover" }
  ];

  const posts = [
    {
      id: "p1",
      userId: "u1",
      image: "/images/post1.jpg",
      caption: "Sunset at the beach 🌅",
      likes: ["u2"],
      comments: [{ id: uuid(), userId: "u2", text: "Wow! beautiful." }],
      createdAt: Date.now() - 1000 * 60 * 60 * 24
    },
    {
      id: "p2",
      userId: "u2",
      image: "/images/post2.jpg",
      caption: "Freshly baked bread 🥖",
      likes: ["u1"],
      comments: [],
      createdAt: Date.now() - 1000 * 60 * 60 * 2
    }
  ];

  const stories = [
    { id: "s1", userId: "u1", image: "/images/story1.jpg", createdAt: Date.now() - 1000 * 60 * 30 },
    { id: "s2", userId: "u2", image: "/images/post2.jpg", createdAt: Date.now() - 1000 * 60 * 10 }
  ];

  const messages = [
    {
      id: "m1",
      members: ["u1", "u2"],
      threads: [
        { id: uuid(), sender: "u1", text: "Hey, how are you?", at: Date.now() - 1000 * 60 * 60 },
        { id: uuid(), sender: "u2", text: "Good! Baking now 😄", at: Date.now() - 1000 * 60 * 50 }
      ]
    }
  ];

  const follows = { u1: ["u2"], u2: ["u1"] };

  return { users, posts, stories, messages, follows };
}

export function DataProvider({ children }) {
  const [db, setDb] = useState(() => {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
    const s = seed();
    localStorage.setItem(DB_KEY, JSON.stringify(s));
    return s;
  });

  useEffect(() => {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }, [db]);

  // Users
  const addUser = ({ username, email, password, avatar }) => {
    if (db.users.some(u => u.email === email)) return { ok: false, message: "Email already taken" };
    const user = { id: uuid(), username, email, password, avatar: avatar || "/images/avatar1.jpg", bio: "" };
    setDb(prev => ({ ...prev, users: [user, ...prev.users] }));
    return { ok: true, user };
  };

  // Posts
  const addPost = ({ userId, image, caption }) => {
    const p = { id: uuid(), userId, image, caption, likes: [], comments: [], createdAt: Date.now() };
    setDb(prev => ({ ...prev, posts: [p, ...prev.posts] }));
    return p;
  };

  const deletePost = (postId) => setDb(prev => ({ ...prev, posts: prev.posts.filter(p => p.id !== postId) }));

  const toggleLike = (postId, userId) => {
    setDb(prev => ({
      ...prev,
      posts: prev.posts.map(p => {
        if (p.id !== postId) return p;
        const has = p.likes.includes(userId);
        return { ...p, likes: has ? p.likes.filter(l => l !== userId) : [...p.likes, userId] };
      })
    }));
  };

  const addComment = (postId, userId, text) => {
    const comment = { id: uuid(), userId, text, createdAt: Date.now() };
    setDb(prev => ({ ...prev, posts: prev.posts.map(p => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p)) }));
  };

  // Stories
  const addStory = (userId, image) => {
    const s = { id: uuid(), userId, image, createdAt: Date.now() };
    setDb(prev => ({ ...prev, stories: [s, ...prev.stories] }));
  };

  // Follows
  const toggleFollow = (currentUserId, targetUserId) => {
    setDb(prev => {
      const list = prev.follows[currentUserId] || [];
      const isFollowing = list.includes(targetUserId);
      const newFollows = { ...prev.follows, [currentUserId]: isFollowing ? list.filter(i => i !== targetUserId) : [...list, targetUserId] };
      return { ...prev, follows: newFollows };
    });
  };

  // Messages
  const sendMessage = (members, sender, text) => {
    setDb(prev => {
      const key = members.slice().sort().join("|");
      const existing = prev.messages.find(m => m.members.slice().sort().join("|") === key);
      const msg = { id: uuid(), sender, text, at: Date.now() };
      if (existing) {
        return { ...prev, messages: prev.messages.map(m => (m.id === existing.id ? { ...m, threads: [...m.threads, msg] } : m)) };
      } else {
        const thread = { id: uuid(), members, threads: [msg] };
        return { ...prev, messages: [thread, ...prev.messages] };
      }
    });
  };

  // Profile update
  const updateProfile = (userId, changes) => {
    setDb(prev => ({ ...prev, users: prev.users.map(u => (u.id === userId ? { ...u, ...changes } : u)) }));
  };

  return (
    <DataContext.Provider value={{
      db,
      addUser,
      addPost,
      deletePost,
      toggleLike,
      addComment,
      addStory,
      toggleFollow,
      sendMessage,
      updateProfile
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
