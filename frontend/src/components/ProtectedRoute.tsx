// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { onAuthChange } from "@/hooks/useAuth";


export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
