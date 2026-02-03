import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <div>
        <h1>Welcome to the Home Page</h1>
        <Link to="file-tracking-progress">Go to File Tracking Progress</Link>
        <Link to="tax-files">Go to download tax files</Link>
        <Link to="register-login">Go to register and login</Link>
      </div>
    </>
  );
}
