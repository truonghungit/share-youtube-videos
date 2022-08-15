import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { Button } from '@/ui-components/button';
import { Input } from '@/ui-components/input';

import { YOUTUBE_VIDEO_URL_REGEX } from '../../constant';
import youtubeDataService from '../../services/youtube-data-service';

const shareVideoValidationSchema = Yup.object().shape({
  videoUrl: Yup.string().required('Youtube URL is required').matches(YOUTUBE_VIDEO_URL_REGEX, {
    message: 'Invalid Youtube URL',
  }),
});

export type ShareVideoProps = {
  name: string;
};

export default function ShareVideo() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useFormik({
    initialValues: { videoUrl: '' },
    validationSchema: shareVideoValidationSchema,
    onSubmit: values => {
      handleSubmit(values.videoUrl);
    },
  });

  const handleSubmit = (videoUrl: string): void => {
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
        setIsLoading(false);
        if (!res || res?.items?.length === 0) {
          setErrorMessage('It seems your Youtube URL is not correct, please check again');
        } else {
          setErrorMessage('');
        }
      });
  };

  return (
    <div className='max-w-xl mx-auto'>
      <form className='mt-10' onSubmit={form.handleSubmit}>
        <fieldset className='border border-solid border-gray-300 rounded px-6 py-10'>
          <legend className='font-medium'>Share a Youtube movie</legend>
          <div className='flex gap-4'>
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
