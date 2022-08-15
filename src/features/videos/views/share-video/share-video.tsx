import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { auth, db, firebaseApp } from '@/core/firebase';
import { Button } from '@/ui-components/button';
import { Input } from '@/ui-components/input';

import { MOVIES_COLLECTION_NAME, YOUTUBE_VIDEO_URL_REGEX } from '../../constant';
import youtubeDataService from '../../services/youtube-data-service';
import { Video } from '../../typings';

const shareVideoValidationSchema = Yup.object().shape({
  videoUrl: Yup.string().required('Youtube URL is required').matches(YOUTUBE_VIDEO_URL_REGEX, {
    message: 'Invalid Youtube URL',
  }),
});

export type ShareVideoProps = {
  name: string;
};

export default function ShareVideo() {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSharingSuccess, setIsSharingSuccess] = useState(false);

  const form = useFormik({
    initialValues: { videoUrl: '' },
    validationSchema: shareVideoValidationSchema,
    onSubmit: values => {
      handleSubmit(values.videoUrl);
    },
  });

  const handleSubmit = (videoUrl: string): void => {
    setIsSharingSuccess(false);
    setIsLoading(true);

    const videoId = youtubeDataService.extractVideoID(videoUrl);

    if (!videoId) {
      setErrorMessage('It seems your Youtube URL is not correct, please check again');
      return;
    }

    youtubeDataService
      .getVideoData(videoId)
      .then(res => res.json())
      .then(res => {
        if (!res || res?.items?.length === 0) {
          setErrorMessage('It seems your Youtube URL is not correct, please check again');
        } else {
          setErrorMessage('');

          const { id, snippet } = res.items[0];
          const { description, title } = snippet;
          const video: Video = {
            id,
            title,
            description,
            sharedBy: user?.email as string,
          };

          addDoc(collection(db, MOVIES_COLLECTION_NAME), video).then(() => {
            setIsLoading(false);
            setIsSharingSuccess(true);
          });
        }
      });
  };

  return (
    <div className='max-w-xl mx-auto'>
      {isSharingSuccess && (
        <>
          <div id='alert-1' className='flex p-4 mb-4 bg-blue-100 rounded-lg dark:bg-blue-200' role='alert'>
            <span className='font-medium'>👌</span> Shared by {user?.email} successfully.
            <button
              type='button'
              className='ml-auto -mx-1.5 -my-1.5 bg-blue-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300'
              data-dismiss-target='#alert-1'
              aria-label='Close'
              onClick={() => setIsSharingSuccess(false)}
            >
              <span className='sr-only'>Close</span>
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
        </>
      )}

      <form className='mt-10' onSubmit={form.handleSubmit}>
        <fieldset className='border border-solid border-gray-300 rounded px-6 py-10'>
          <legend className='font-medium'>Share a Youtube movie</legend>
          <div className='flex flex-col md:flex-row gap-4'>
            <label htmlFor='url' className='flex-shrink-0 mt-2 min-w-fit'>
              Youtube URL:
            </label>
            <div className='w-full'>
              <div className='mb-4'>
                <Input
                  type='text'
                  id='url'
                  name='videoUrl'
                  value={form.values.videoUrl}
                  onBlur={form.handleBlur}
                  onChange={form.handleChange}
                />
                {form.touched.videoUrl && Boolean(form.errors.videoUrl) && (
                  <small className='text-red-500'>{form.touched.videoUrl && form.errors.videoUrl}</small>
                )}
                {errorMessage && <small className='text-red-500'>{errorMessage}</small>}
              </div>
              <Button variant='primary' type='submit' className='w-full' disabled={isLoading}>
                {isLoading ? (
                  <svg
                    aria-hidden='true'
                    role='status'
                    className='inline ml-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='#1C64F2'
                    />
                  </svg>
                ) : (
                  'Share'
                )}
              </Button>
            </div>
          </div>
        </fieldset>
      </form>

      <div className='flex justify-end'>
        <Link to={'/'}>
          <Button variant='secondary' type='submit' className='mt-5'>
            Back to list
          </Button>
        </Link>
      </div>
    </div>
  );
}
