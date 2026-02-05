import { Link } from "react-router-dom";
export function NavbarC() {
  return (
    <>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/file-tracking-progress">File Tracking</Link>
        <Link to="/tax-files">Tax files</Link>
      </nav>
    </>
  );
}
