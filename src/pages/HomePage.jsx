import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/products">Products</Link>
    </div>
  );
}

export default HomePage;
