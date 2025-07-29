'use client';

import UserProfileCard from '../components/UserLabel';
import HomePage from './homepage';

export default function Home() {
  return (
    <>
    <HomePage/>
        <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <h1>Hello World</h1>
      {/* conclusion: The Home component renders a simple layout with login and logout links. */}
    </div>
    </>

  );
}
