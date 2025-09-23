export default function UserDashboard({ currentUser }) {
  if (!currentUser) {
    return <h2>Please log in first.</h2>;
  }

  return (
    <div className="page-container">
      <h1>Welcome {currentUser.name}</h1>
      <p>You can browse and adopt pets here.</p>
      <a href="/pets">Go to Pet List</a>
      <br />
      <a href="/profile">View Profile</a>
    </div>
  );
}
