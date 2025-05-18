import { LoginForm } from "@/components/login-form";
export default function Login() {
return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md">
        <LoginForm />
      </div>
    </div>
  );
}