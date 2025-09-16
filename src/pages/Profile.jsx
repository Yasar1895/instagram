export default function Profile() {
  return (
    <div className="page">
      <div className="profile-header">
        <img src="/images/user1.jpg" alt="User" className="avatar" />
        <h2>john_doe</h2>
      </div>
      <div className="explore-grid">
        <img src="/images/post1.jpg" alt="Post 1" />
        <img src="/images/post2.jpg" alt="Post 2" />
        <img src="/images/post3.jpg" alt="Post 3" />
      </div>
    </div>
  );
}