import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const { username } = useParams();

  return (
    <div>
      <h1>User Profile: {username}</h1>
      <p>Review history will go here.</p>
    </div>
  );
}