"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Komponent() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/passwordreset`, // Sett korrekt URL
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        "Vi har sendt en e-post med instruksjoner for tilbakestilling av passord."
      );
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Glemt passord</h1>
        <p className="text-muted-foreground">
          Skriv inn e-posten din for å tilbakestille passordet ditt.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleResetPassword}>
        <div className="space-y-2">
          <Label htmlFor="email">E-post</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {message && <div className="text-green-600">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sender..." : "Tilbakestill passord"}
        </Button>
      </form>
    </div>
  );
}
