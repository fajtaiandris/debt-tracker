import React from 'react';
import { Outlet } from 'react-router-dom';

export function PrivateOutlet() {
  const isAuthenticated = false; // Your auth logic goes here
  // might wanna redirect to login page

  return isAuthenticated ? <Outlet /> : <>Sorry, but you are not authenticated</>;
}
