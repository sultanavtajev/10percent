"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [recovery, setRecovery] = useState(false); // 🔥 Legg til recovery-status
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecovery(true);
      } else if (session) {
        router.push("/");
      }
    });

    return () => data?.subscription?.unsubscribe(); // 🔥 Løsningen
  }, [router]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Passordet er oppdatert. Du vil bli logget inn automatisk.");
      setTimeout(() => {
        router.push("/"); // Eller router.push("/login") hvis ønskelig
      }, 3000);
    }

    setLoading(false);
  };

  if (!recovery) {
    // 🔒 Ikke recovery – vis loading eller redirecter
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Laster...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Tilbakestill passord</h1>
        <p className="text-muted-foreground">
          Velg et nytt passord for kontoen din.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleUpdatePassword}>
        <div className="space-y-2">
          <Label htmlFor="password">Nytt passord</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {message && <div className="text-green-600">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Oppdaterer..." : "Oppdater passord"}
        </Button>
      </form>
    </div>
  );
}
