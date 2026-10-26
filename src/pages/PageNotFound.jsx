import { Link } from "react-router";

export default function PageNotFound() {
  return (
    <main className="grid min-h-dvh place-content-center gap-4 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="underline underline-offset-4" to="/">
        Return home
      </Link>
    </main>
  );
}
