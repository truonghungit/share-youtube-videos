import { RouteObject } from 'react-router-dom';

import DefaultLayout from '../layout/default-layout/default-layout';

const appRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <DefaultLayout />,
  },
];

export default appRoutes;
