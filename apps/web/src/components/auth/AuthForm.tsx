// components/auth/AuthForm.tsx
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface AuthFormProps {
  isSignUp: boolean;
  redirectText: string;
  redirectPath: string;
}

export default function AuthForm({ isSignUp, redirectText, redirectPath }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // ✅ added error state
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password) return;

    setIsLoading(true);
    setError(null); 

    try {
      const endpoint = isSignUp ? "/signup" : "/signin";
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users${endpoint}`,
        { email, password }
      );

      const data = response.data;

      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        router.push("/workflow");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("auth error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    router.push(redirectPath);
  };

  return (
    <div>
      <div className="border border-neutral-600 rounded-2xl p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-600 rounded-2xl focus:outline-none focus:border-neutral-400 transition-colors"
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-600 rounded-2xl focus:outline-none focus:border-neutral-400 transition-colors"
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isLoading || !email || !password}
            className="w-full bg-neutral-800 text-white py-3 rounded-2xl hover:bg-neutral-700 hover:cursor-pointer transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : (isSignUp ? "Sign Up" : "Sign In")}
          </button>

          {error && (
            <div className="text-red-500 text-sm text-center mt-2">
              {error}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <span 
          onClick={handleRedirect}
          className="text-neutral-500 text-base underline hover:cursor-pointer hover:text-neutral-400 transition-colors"
        >
          {redirectText}
        </span>
      </div>
    </div>
  );
}
