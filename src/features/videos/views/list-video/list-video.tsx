import { useState } from 'react';

import { VideoItem } from '../../components/video-item/video-item';

export default function ListVideo() {
  const [videos] = useState([1, 2, 3, 4, 5]);

  return (
    <div className='max-w-4xl py-10 m-auto'>
      <div className='flex flex-col gap-10'>
        {videos.map(video => (
          <VideoItem key={video} />
        ))}
      </div>
    </div>
  );
}
