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
  const [recovery, setRecovery] = useState(false); // Styrer om skjema vises
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecovery(true); // Kun i recovery-modus tillates skjemaet
      } else {
        // Ikke recovery – redirect til login eller forside
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
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
      setMessage("Passordet er oppdatert. Du vil bli logget ut for sikkerhet.");
      setTimeout(async () => {
        await supabase.auth.signOut(); // 🔥 Logg ut for å sikre ny innlogging
        router.push("/login"); // Send til login
      }, 3000);
    }

    setLoading(false);
  };

  if (!recovery) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Laster eller omdirigerer...</p>
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
