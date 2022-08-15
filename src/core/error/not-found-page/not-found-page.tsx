import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <>
      <div className='min-h-full pt-16 pb-12 flex flex-col bg-white'>
        <main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex-shrink-0 flex justify-center'>
            <Link to='/' className='inline-flex'>
              <span className='sr-only'>Share youtube videos</span>
              <svg
                className='h-12 w-auto sm:h-10 text-indigo-600'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
              </svg>
            </Link>
          </div>
          <div className='py-16'>
            <div className='text-center'>
              <h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>Page not found.</h1>
              <p className='mt-2 text-base text-gray-500'>Sorry, we couldn’t find the page you’re looking for.</p>
              <div className='mt-6'>
                <Link to='/' className='text-base font-medium text-indigo-600 hover:text-indigo-500'>
                  Go back home<span aria-hidden='true'> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
