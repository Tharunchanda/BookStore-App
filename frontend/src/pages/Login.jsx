import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    console.log('Login successful', credentials);
  };

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 px-8 py-5 rounded-lg shadow-lg w-full md:w-3/6 lg:w-2/6'>
        <h2 className='text-xl font-bold text-center mb-6 text-zinc-200'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='text-zinc-400'>Username</label>
            <input
              type='text'
              name='username'
              className='w-full mt-2 border border-zinc-700 bg-zinc-900 rounded p-2 outline-none text-zinc-100'
              placeholder='Username'
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className='mb-4 relative'>
            <label className='text-zinc-400'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              className='w-full p-2 text-zinc-100 bg-zinc-900 border border-zinc-700 rounded mt-1'
              placeholder='Password'
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button
              type='button'
              className='absolute right-2 top-9 text-sm text-gray-500'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

          <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-400 shadow-lg transition duration-300'>
            Login
          </button>
        </form>

        <p className='text-center text-zinc-400 mt-4'>
          Don't have an account? <Link to='/signup' className='text-blue-600'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
