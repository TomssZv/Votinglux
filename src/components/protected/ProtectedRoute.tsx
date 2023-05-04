import React from 'react'
import { Navigate, Outlet, redirect } from 'react-router-dom'

function ProtectedRoute({ 
  logedIn,
  redirectPath = '/'
}: {logedIn: boolean, redirectPath: string}) {
  if (!logedIn) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />;
}

export default ProtectedRoute