import { useParams } from 'react-router-dom';

export default function ShowDetails() {
  // This hook grabs the dynamic ':id' from the URL (e.g., /show/1396)
  const { id } = useParams();

  return (
    <div>
      <h1>Show Details</h1>
      <p>Fetching data for TMDB Show ID: <strong>{id}</strong></p>
    </div>
  );
}