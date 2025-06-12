import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col lg:flex-row'> 
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
        <h1 className='text-3xl w-full lg:text-5xl font-semibold text-yellow-100 text-center'>
          Discover Your Next Great Read
        </h1>
        <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
          Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
        </p>
        <div className='mt-8'>
          <button
            className='text-yellow-100 text-xl lg:text-2xl border border-yellow-100 font-semibold px-10 py-3 rounded-full hover:bg-zinc-800 transition duration-300'
            onClick={() => navigate('/all-books')}
          >
            Discover Books
          </button>
        </div>
      </div>
      <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
        <img src="./image.png" alt="hero img" />
      </div>
    </div>
  );
}

export default Hero;
