import React from "react";
import Stories from "../components/Stories";
import Post from "../components/Post";

const Home = () => {
  const posts = [
    {
      id: 1,
      username: "alex",
      userImg: "/images/story2.jpg",
      image: "/images/post1.jpg",
      caption: "Beautiful sunset 🌅",
      likes: 120,
      comments: 15,
    },
    {
      id: 2,
      username: "maria",
      userImg: "/images/story3.jpg",
      image: "/images/post2.jpg",
      caption: "Chilling with friends 🍕",
      likes: 200,
      comments: 40,
    },
  ];

  return (
    <div className="home">
      <Stories />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;
