import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline';

import { EmbedVideo } from '../embed-video/embed-video';

export const VideoItem = () => {
  return (
    <div className='flex gap-6 h-60'>
      <div className='w-5/12 flex-shrink-0'>
        <EmbedVideo videoId='gGLxPY3qDYY' title='YouTube video player' />
      </div>
      <div className='flex-grow'>
        <h3 className='text-gray-900 text-xl font-medium mb-2'>Video title</h3>
        <div className='font-semibold'>
          Shared by: <span>someone@gmail.com</span>
        </div>
        <div className='flex'>
          <div className='flex gap-2 items-center'>
            <strong>89</strong>
            <ThumbUpIcon className='h-5 w-5' />
          </div>
          <div className='ml-6 flex gap-2 items-center'>
            <strong>12</strong>
            <ThumbDownIcon className='h-5 w-5' />
          </div>
        </div>
        <div className='font-semibold mt-2'>Description:</div>
        <p className='text-gray-700 text-base mb-4 mt-2'>
          Sed porttitor lectus nibh. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus
          suscipit tortor eget felis porttitor volutpat. Donec rutrum congue leo eget malesuada.
        </p>
      </div>
    </div>
  );
};
