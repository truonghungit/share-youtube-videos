import { addDoc, collection } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { auth, db } from '@/core/firebase';
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
              <Button variant='primary' type='submit' className='w-full' disabled={isLoading} isLoading={isLoading}>
                Share
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
