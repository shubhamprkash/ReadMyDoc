import React from 'react';

export default function Banner() {
  return (
    <section className='flex justify-between items-center bg-yellow-300 border-y border-black py-10'>
    <div className='px-10 space-y-5'>
      <h1 className='text-6xl max-w-xl font-serif'>
          <span className='underline decoration-black' >ReadMyDoc</span> 
          is heaven to write, read and share.
      </h1>
      <h2 className='' >
          Its free, open and easy to post your thinking on any topic and 
          connect with millions of readers.
      </h2>
    </div>
    <img 
      className='hidden md:inline-flex h-32 lg:h-full'
      src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" 
      alt="logo-img" />
  </section>
  )
}
