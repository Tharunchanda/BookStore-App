import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ data }) => {
  return (
    <Link to={`/view-book-details/${data._id}`} className="block transition-transform transform hover:scale-105">
      <div className="bg-zinc-800 rounded-lg p-4 flex flex-col shadow-lg hover:shadow-xl">
        <div className="bg-zinc-900 rounded-lg flex items-center justify-center overflow-hidden">
          <img 
            src={data.url} 
            alt={data.title} 
            className="h-[25vh] object-cover rounded-lg" 
            loading="lazy" 
          />
        </div>
        <h2 className="mt-4 text-lg text-zinc-100 font-semibold truncate">{data.title}</h2>
        <p className="mt-2 text-zinc-400 font-medium">by {data.author}</p>
        <p className="mt-2 text-green-400 font-semibold">₹ {data.price}</p>
      </div>
    </Link>
  );
};

export default BookCard;
