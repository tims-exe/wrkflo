import AuthForm from "@/components/auth/AuthForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
        <AuthForm isSignUp={true} redirectText="Sign In?" redirectPath="/signin" />
      </div>
    </div>
  );
}