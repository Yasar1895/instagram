import React from "react";

const Stories = () => {
  const stories = [
    { id: 1, username: "you", img: "/images/story1.jpg" },
    { id: 2, username: "alex", img: "/images/story2.jpg" },
    { id: 3, username: "maria", img: "/images/story3.jpg" },
    { id: 4, username: "john", img: "/images/story4.jpg" },
  ];

  const storyStyle = {
    textAlign: "center",
    fontSize: "12px",
    color: "#262626",
  };

  const ringStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    padding: "2px",
    background: "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle = {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    border: "2px solid white",
  };

  const storiesContainer = {
    display: "flex",
    overflowX: "auto",
    gap: "12px",
    padding: "12px",
    borderBottom: "1px solid #dbdbdb",
  };

  return (
    <div style={storiesContainer}>
      {stories.map((story) => (
        <div key={story.id} style={storyStyle}>
          <div style={ringStyle}>
            <img src={story.img} alt={story.username} style={imgStyle} />
          </div>
          <p>{story.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Stories;