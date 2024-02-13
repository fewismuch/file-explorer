import {Navigate} from 'dumi';
import React from 'react';

export const patchClientRoutes = ({routes}: any) => {
  routes.unshift({
    path: '/',
    element: <Navigate to="/example" replace/>,
  });
};
