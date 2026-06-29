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
    <div className="fixed inset-0 z-50 bg-[#0a0a0a]/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-2 border-[#0a0a0a] rounded-2xl p-8 relative shadow-[8px_8px_0_0_#0a0a0a]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-[#0a0a0a]/5 text-[#6b7280]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-[#0a0a0a] mb-1 text-[20px] font-bold">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </div>
        <p className="text-[#6b7280] mb-6 text-[14px]">
          {mode === "login" ? "Log in to save favourites and submit prompts." : "Join to build, save, and share prompts."}
        </p>

        {/* OAuth placeholders */}
        <div className="space-y-2 mb-5">
          <button onClick={() => toast.info("Coming soon", { description: "Google login is not yet available." })} className="w-full h-10 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a] hover:bg-[#0a0a0a]/10 text-[14px]">
            Continue with Google
          </button>
          <button onClick={() => toast.info("Coming soon", { description: "GitHub login is not yet available." })} className="w-full h-10 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a] hover:bg-[#0a0a0a]/10 text-[14px]">
            Continue with GitHub
          </button>
        </div>

        <div className="flex items-center gap-3 my-4 text-[#6b7280] text-[13px]">
          <div className="flex-1 h-px bg-[#0a0a0a]/10" /> or <div className="flex-1 h-px bg-[#0a0a0a]/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a] placeholder:text-[#6b7280] outline-none focus:border-[#4FC3F7] text-[14px]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full h-10 px-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a] placeholder:text-[#6b7280] outline-none focus:border-[#4FC3F7] text-[14px]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full h-10 px-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a] placeholder:text-[#6b7280] outline-none focus:border-[#4FC3F7] text-[14px]"
          />

          {error && (
            <div className="flex items-center gap-2 text-[#0a0a0a] text-[13px] bg-[#4FC3F7]/5 border border-[#4FC3F7]/20 rounded-lg px-3 py-2">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-lg bg-[#4FC3F7] text-[#0a0a0a] font-bold hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[14px]"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Please waitâ€¦</> : (mode === "login" ? "Log in" : "Create account")}
          </button>
        </form>

        <div className="mt-5 text-center text-[#6b7280] text-[14px]">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button onClick={() => switchMode(mode === "login" ? "signup" : "login")} className="text-[#0a0a0a] hover:underline font-medium">
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
