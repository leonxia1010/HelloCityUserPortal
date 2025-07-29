import UserProfileCard from '../components/UserLabel';
export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <h1>Hello World</h1>
      {/* Login link(must use <a> link to define Auth0 component) */}
      <a href="/auth/login">Login</a>
      {/* Logout link(must use <a> link to define Auth0 component) */}
      <a href="/auth/logout" >Logout</a>
      {/* conclusion: The Home component renders a simple layout with login and logout links. */}
    </div>
  );
}