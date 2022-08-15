import { collection, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firebaseApp } from '@/core/firebase';
import { Loading } from '@/ui-components/loading/loading';

import { VideoItem } from '../../components/video-item/video-item';
import { MOVIES_COLLECTION_NAME } from '../../constant';
import { Video } from '../../typings';

export default function ListVideo() {
  const [videos, loading] = useCollection(collection(getFirestore(firebaseApp), MOVIES_COLLECTION_NAME), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [filteredVideos, setFilteredVideos] = useState<Array<Video>>([]);

  useEffect(() => {
    if (videos && videos.docs.length > 0) {
      const filterVideos = videos.docs.map(doc => doc.data()).filter(video => video.id && video.title);
      setFilteredVideos(filterVideos as Array<Video>);
    }
  }, [videos]);

  return (
    <div className='max-w-4xl py-10 m-auto'>
      {loading ? (
        <div className='flex flex-col items-center justify-center'>
          <Loading />
          <div className='mt-4'>Loading</div>
        </div>
      ) : (
        <>
          {filteredVideos.length > 0 ? (
            <div className='flex flex-col gap-10'>
              {filteredVideos && filteredVideos.map(video => <VideoItem key={video.id} video={video as Video} />)}
            </div>
          ) : (
            <div className='max-w-lg mx-auto'>
              <img src='/images/empty.svg' alt='Empty data' />
              <div className='mt-6 text-center text-2xl text-gray-800'>
                No videos here, Lets share your interesting videos t o people
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
