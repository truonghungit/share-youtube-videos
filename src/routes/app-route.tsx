import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { RequireAuth } from '@/core/auth';
import { NotFoundPage } from '@/core/error';

import DefaultLayout from '../layout/default-layout/default-layout';

const ListVideo = lazy(() => import('../features/videos/views/list-video/list-video'));
const ShareVideo = lazy(() => import('../features/videos/views/share-video/share-video'));

const appRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <ListVideo />,
      },
      {
        path: 'share-movie',
        element: (
          <RequireAuth>
            <ShareVideo />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default appRoutes;
