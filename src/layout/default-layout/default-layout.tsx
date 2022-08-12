import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Button } from '@/ui-components/button';

import { AuthForm } from '../components/auth-form/auth-form';

export default function DefaultLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser] = useState({ email: 'someone@gmail.com' });

  return (
    <>
      <div className='bg-white'>
        <header className='relative bg-white shadow'>
          <div className='flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <Link to='/'>
                <span className='flex gap-2 justify-start items-center '>
                  <span className='sr-only'>Share youtube videos</span>
                  <svg
                    className='h-8 w-auto sm:h-10 text-indigo-600'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                  </svg>
                  <span className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'>
                    Funny Movies
                  </span>
                </span>
              </Link>
            </div>

            <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
              {isAuthenticated ? (
                <div className='flex items-center gap-3'>
                  <span>Welcome {loggedInUser.email}</span>
                  <Button variant='primary'>Share a movie</Button>
                  <Button variant='secondary' onClick={() => setIsAuthenticated(false)}>
                    Logout
                  </Button>
                </div>
              ) : (
                <AuthForm onSubmit={() => setIsAuthenticated(true)} />
              )}
            </div>
          </div>
        </header>

        <main className='max-w-7xl mx-auto px-4 py-6'>
          Main content
          <Outlet />
        </main>
      </div>
    </>
  );
}
