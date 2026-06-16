import { useState } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "../lib/api";

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode]         = useState<"login" | "signup">("login");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  if (!open) return null;

  const reset = () => { setName(""); setEmail(""); setPassword(""); setError(""); };
  const switchMode = (m: "login" | "signup") => { setMode(m); reset(); };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError("Email and password are required."); return; }
    if (mode === "signup" && password.length < 8) { setError("Password must be at least 8 characters."); return; }

    setLoading(true);
    setError("");
    try {
      if (mode === "login") {
        await authApi.login(email, password);
        toast.success("Welcome back!");
      } else {
        await authApi.register(email, password, name || email.split("@")[0]);
        toast.success("Account created!", { description: "Welcome to Prompt Bot." });
      }
      onClose();
      window.location.reload();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#094067]/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-2 border-[#094067] rounded-2xl p-8 relative shadow-[8px_8px_0_0_#094067]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-[#094067]/5 text-[#5f6c7b]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-[#094067] mb-1 text-[20px] font-bold">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </div>
        <p className="text-[#5f6c7b] mb-6 text-[14px]">
          {mode === "login" ? "Log in to save favourites and submit prompts." : "Join to build, save, and share prompts."}
        </p>

        {/* OAuth placeholders */}
        <div className="space-y-2 mb-5">
          <button onClick={() => toast.info("Coming soon", { description: "Google login is not yet available." })} className="w-full h-10 rounded-lg bg-[#094067]/5 border border-[#094067]/20 text-[#094067] hover:bg-[#094067]/10 text-[14px]">
            Continue with Google
          </button>
          <button onClick={() => toast.info("Coming soon", { description: "GitHub login is not yet available." })} className="w-full h-10 rounded-lg bg-[#094067]/5 border border-[#094067]/20 text-[#094067] hover:bg-[#094067]/10 text-[14px]">
            Continue with GitHub
          </button>
        </div>

        <div className="flex items-center gap-3 my-4 text-[#5f6c7b] text-[13px]">
          <div className="flex-1 h-px bg-[#094067]/10" /> or <div className="flex-1 h-px bg-[#094067]/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#094067]/5 border border-[#094067]/20 text-[#094067] placeholder:text-[#5f6c7b] outline-none focus:border-[#ffd803] text-[14px]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full h-10 px-3 rounded-lg bg-[#094067]/5 border border-[#094067]/20 text-[#094067] placeholder:text-[#5f6c7b] outline-none focus:border-[#ffd803] text-[14px]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full h-10 px-3 rounded-lg bg-[#094067]/5 border border-[#094067]/20 text-[#094067] placeholder:text-[#5f6c7b] outline-none focus:border-[#ffd803] text-[14px]"
          />

          {error && (
            <div className="flex items-center gap-2 text-[#ef4565] text-[13px] bg-[#ef4565]/5 border border-[#ef4565]/20 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-lg bg-[#ffd803] text-[#094067] font-bold hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[14px]"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Please wait…</> : (mode === "login" ? "Log in" : "Create account")}
          </button>
        </form>

        <div className="mt-5 text-center text-[#5f6c7b] text-[14px]">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button onClick={() => switchMode(mode === "login" ? "signup" : "login")} className="text-[#ef4565] hover:underline font-medium">
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
