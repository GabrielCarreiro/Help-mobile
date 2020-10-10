import React from 'react';

import { AuthProvider } from './auth';

const AppProvider = ({children}) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

export default AppProvider;