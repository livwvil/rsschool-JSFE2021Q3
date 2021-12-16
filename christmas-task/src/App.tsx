/* eslint-disable @typescript-eslint/no-shadow */
import { Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';

import { AppRoutes } from './enumerations';

import { LazyImagesExample } from '@/components/LazyImagesExample';

const TreeManager = lazy(() => import('./views/TreeManager')
  .then(({ TreeManager }) => ({ default: TreeManager })));

const ToysManager = lazy(() => import('./views/ToysManager')
  .then(({ ToysManager }) => ({ default: ToysManager })));

const Welcome = lazy(() => import('./views/Welcome')
  .then(({ Welcome }) => ({ default: Welcome })));

export const App = (): JSX.Element => (
  <Suspense fallback="loading">
    <Routes>

      <Route path={AppRoutes.Welcome} element={<Welcome />}/>
      <Route path="img" element={<LazyImagesExample />}/>
      <Route path={AppRoutes.TreeManager} element={<TreeManager />}/>
      <Route path={AppRoutes.ToysManager} element={<ToysManager />}/>    

    </Routes>
  </Suspense>
);
