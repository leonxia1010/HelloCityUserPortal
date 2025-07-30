import UserProfileCard from '../components/UserLabel';
export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <h1>Hello World</h1>
      {/* Login link(must use <a> link to define Auth0 component) */}
      <a href="/auth/login">Login</a>
      {/* Logout link(must use <a> link to define Auth0 component) */}
      <a href="/auth/logout">Logout</a>
      {/* conclusion: The Home component renders a simple layout with login and logout links. */}
    </div>
  );
}
