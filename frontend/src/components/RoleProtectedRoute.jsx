import { Navigate } from 'react-router-dom';

function RoleProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!userStr) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RoleProtectedRoute;
