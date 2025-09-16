import Stories from "../components/Stories";
import Post from "../components/Post";

export default function Home() {
  return (
    <div className="page">
      <Stories />
      <Post
        username="john_doe"
        avatar="/images/user1.jpg"
        image="/images/post1.jpg"
        likes={120}
        caption="Enjoying the sunny vibes!"
      />
      <Post
        username="emma_w"
        avatar="/images/user2.jpg"
        image="/images/post2.jpg"
        likes={340}
        caption="Coffee time ☕"
      />
    </div>
  );
}