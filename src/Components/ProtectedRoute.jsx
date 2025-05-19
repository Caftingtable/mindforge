import React from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../Hooks/useUser';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { mongoUser, isPending } = useUser();

  if (isPending) return <p className="text-center mt-24 text-xl">Loading...</p>;

  if (!mongoUser || !allowedRoles.includes(mongoUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
