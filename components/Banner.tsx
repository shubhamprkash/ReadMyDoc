
import React from 'react';

export default function Banner() {
  return (
    <section className='flex justify-between items-center bg-yellow-300 border-y border-black py-10 '>
      <div className='px-10 space-y-5'>
        <h1 className='text-6xl max-w-xl font-serif'>
            <span className='underline decoration-black' >ReadMyDoc</span> 
            &nbsp; is a heaven to read, write and share.
        </h1>
        <h2 className='' >
            Its free, open and easy to post your thinking on any topic and 
            share with millions of readers.
        </h2>
      </div>
      <img 
        className='hidden md:inline-flex h-32 lg:h-full rounded-full px-2'
        src="./logo-removebg.png" 
        alt="logo-img" />
  </section>
  )
}


