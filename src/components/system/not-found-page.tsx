import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <p>404 Not Found</p>
      <br/>
      <Link to="/">To main page</Link>
    </div>
  );
}
