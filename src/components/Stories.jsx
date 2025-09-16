import React from "react";
import { useData } from "../contexts/DataContext";

export default function Stories() {
  const { db } = useData();
  const stories = db.stories || [];
  const users = db.users || [];

  return (
    <div className="stories container">
      {stories.map(s => {
        const u = users.find(x => x.id === s.userId);
        return (
          <div key={s.id} className="story">
            <img src={u?.avatar} alt={u?.username} className="img" />
            <div style={{ marginTop: 8 }}>{u?.username}</div>
          </div>
        );
      })}
    </div>
  );
}
