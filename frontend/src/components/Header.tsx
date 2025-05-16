import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthChange, logout } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function Header() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/"); // redirect to home after logout
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="border-b px-4 py-3 md:px-6 flex items-center justify-between bg-background">
      <div className="text-xl font-bold tracking-tight">TargetCV</div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
}
