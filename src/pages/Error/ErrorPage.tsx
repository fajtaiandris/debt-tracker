import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const isRouteError = isRouteErrorResponse(error);

  return (
    <div className="h-screen bg-gray-100">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 transform">
        <h1 className="text-xl font-semibold">{isRouteError ? error.status : 'Unexpected Error'}</h1>
        <p>{isRouteError ? error.statusText : 'Something went wrong.'}</p>
      </div>
    </div>
  );
}
