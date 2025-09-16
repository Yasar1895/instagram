export default function Stories() {
  const stories = [
    { id: 1, username: "john_doe", image: "/images/user1.jpg" },
    { id: 2, username: "emma_w", image: "/images/user2.jpg" },
    { id: 3, username: "alex99", image: "/images/user3.jpg" },
  ];

  return (
    <div className="stories">
      {stories.map(story => (
        <div key={story.id} className="story">
          <img src={story.image} alt={story.username} className="story-avatar" />
          <p>{story.username}</p>
        </div>
      ))}
    </div>
  );
}