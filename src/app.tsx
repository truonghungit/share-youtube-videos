import { useRoutes } from 'react-router-dom';

import appRoutes from './routes';

export default function App() {
  const routes = useRoutes(appRoutes);

  return <>{routes}</>;
}