import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/user/${search.trim()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <h2>GitHub Users</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="card-grid">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.avatar_url} alt={user.login} />
            <Link to={`/user/${user.login}`}>{user.login}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
