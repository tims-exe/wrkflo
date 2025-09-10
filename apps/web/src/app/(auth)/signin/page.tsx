import AuthForm from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
        <AuthForm isSignUp={false} redirectText="Sign Up?" redirectPath="/signup" />
      </div>
    </div>
  );
}