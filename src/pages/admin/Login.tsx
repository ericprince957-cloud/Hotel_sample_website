import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setAuthError("");

    const result = await signIn(data.email, data.password);

    if (result.error) {
      setAuthError(result.error);
      setIsSubmitting(false);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-[Fraunces] font-semibold text-[#0F3D3E] mb-2">
            Admin Login
          </h1>
          <p className="text-[16px] text-[#4A5553]">
            Sign in to manage your hotel
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[14px] p-6 shadow-sm border border-[#E2DBC9]">
          {authError && (
            <div className="mb-4 p-3 rounded-[10px] bg-[#B3372F]/10 border border-[#B3372F] text-[#B3372F] text-[14px]">
              {authError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                placeholder="admin@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-[12px] text-[#B3372F]">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[14px] font-medium text-[#0F3D3E] mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full h-11 px-3 rounded-[10px] border border-[#E2DBC9] text-[16px] text-[#14211F] focus:outline-none focus:ring-2 focus:ring-[#B8893B]"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-[12px] text-[#B3372F]">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/admin/forgot-password"
            className="text-[14px] text-[#0F3D3E] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
