import React from "react";
import "./Stories.css";

const Stories = () => {
  const stories = [
    { id: 1, username: "you", img: "/images/story1.jpg" },
    { id: 2, username: "alex", img: "/images/story2.jpg" },
    { id: 3, username: "maria", img: "/images/story3.jpg" },
    { id: 4, username: "john", img: "/images/story4.jpg" },
  ];

  return (
    <div className="stories">
      {stories.map((story) => (
        <div key={story.id} className="story">
          <div className="story-ring">
            <img src={story.img} alt={story.username} />
          </div>
          <p>{story.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Stories;