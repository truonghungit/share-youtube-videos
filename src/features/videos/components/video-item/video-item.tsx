import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline';

import { Video } from '../../typings';
import { EmbedVideo } from '../embed-video/embed-video';

export type VideoProps = {
  video: Video;
};

export const VideoItem = ({ video }: VideoProps) => {
  return (
    <div className='flex flex-col lg:flex-row gap-6 lg:h-60'>
      <div className='w-full h-48 lg:h-auto lg:w-5/12 lg:flex-shrink-0'>
        <EmbedVideo videoId={video.id} title={video.title || 'YouTube video player'} />
      </div>
      <div className='lg:flex-grow'>
        <h3 className='text-gray-900 text-xl font-medium mb-2 line-clamp-1'>{video.title}</h3>
        <div className='font-semibold'>
          Shared by: <span>{video.sharedBy}</span>
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
        <p className='text-gray-700 text-base mb-4 mt-2 line-clamp-5'>{video.description}</p>
      </div>
    </div>
  );
};
