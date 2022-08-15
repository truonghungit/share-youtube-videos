import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { signOut } from 'firebase/auth';
import { Fragment, useEffect, useState } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { Link, Outlet, useNavigate } from 'react-router-dom';

// import { useAuth, UserCredential } from '@/core/auth';
import { auth } from '@/core/firebase';
import { Button } from '@/ui-components/button';

import { AuthForm } from '../components/auth-form/auth-form';

export default function DefaultLayout() {
  const navigate = useNavigate();
  const [user, authLoading] = useAuthState(auth);
  const [loginUser, setLoginUser] = useState<{ email: string; password: string }>(null!);

  const [loginWithEmailPassword, _user, loadingLogin, loginError] = useSignInWithEmailAndPassword(auth);
  const [createUser, createdUser, loadingCrateUser] = useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (loginError?.code === 'auth/user-not-found' && !createdUser && !user && !loadingCrateUser) {
      createUser(loginUser.email, loginUser.password);
    }
  }, [loginError, createUser, loginUser, createdUser, user, loadingCrateUser]);

  const login = (email: string, password: string) => {
    loginWithEmailPassword(email, password);
    setLoginUser({ email, password });
  };

  const logout = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <>
      <div className='bg-white'>
        <Popover className='relative bg-white shadow'>
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

            <div className='-mr-2 -my-2 md:hidden'>
              <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                <span className='sr-only'>Open menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>

            <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
              {!authLoading && (
                <>
                  {user ? (
                    <div className='flex items-center gap-3'>
                      <span>Welcome {user.email}</span>
                      <Link to='/share-movie'>
                        <Button variant='primary'>Share a movie</Button>
                      </Link>
                      <Button variant='secondary' onClick={() => logout()}>
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <AuthForm onSubmit={login} />
                  )}
                </>
              )}
            </div>
          </div>

          <Transition
            as={Fragment}
            enter='duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel
              focus
              className='absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
            >
              <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
                <div className='pt-5 pb-6 px-5'>
                  <div className='flex items-center justify-end'>
                    <div className='-mr-2'>
                      <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                        <span className='sr-only'>Close menu</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className='py-6 px-5'>
                  {!authLoading && (
                    <>
                      {user ? (
                        <div>
                          <div className='mb-6 flex justify-between items-center'>
                            <span>Welcome {user.email}</span>

                            <Button variant='secondary' onClick={() => logout()}>
                              Logout
                            </Button>
                          </div>
                          <Link to='/share-movie'>
                            <Button variant='primary' className='w-full'>
                              Share a movie
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <AuthForm onSubmit={login} />
                      )}
                    </>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        <main className='max-w-7xl mx-auto px-4 py-6'>
          <Outlet />
        </main>
      </div>
    </>
  );
}
