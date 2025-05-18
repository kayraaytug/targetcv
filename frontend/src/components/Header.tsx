import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthChange, logout } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const goToAbout = () => navigate("/about");
  const goToContact = () => navigate("/contact");

  return (
    <header className="border-b px-4 py-3 md:px-6 flex items-center justify-between bg-background">
      <Link to="/">
        <div className="text-xl font-bold tracking-tight cursor-pointer">
          TargetCV
        </div>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Public navigation */}
        <Button variant="ghost" size="sm" onClick={goToAbout}>
          About
        </Button>
        <Button variant="ghost" size="sm" onClick={goToContact}>
          Contact
        </Button>

        {/* Auth buttons */}
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
