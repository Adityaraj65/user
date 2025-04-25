import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";

function UserPage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [username]);

  if (!user) return <div className="container">Loading...</div>;

  return (
    <div className="container user-info">
      <h2>{user.name || user.login}</h2>
      <img src={user.avatar_url} width="100" alt="avatar" />
      <p><strong>Username:</strong> {user.login}</p>
      <p><strong>Bio:</strong> {user.bio || "N/A"}</p>
      <p><strong>Location:</strong> {user.location || "N/A"}</p>
      <p><strong>Public Repos:</strong> {user.public_repos}</p>
      <a href={user.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
    </div>
  );
}

export default UserPage;
