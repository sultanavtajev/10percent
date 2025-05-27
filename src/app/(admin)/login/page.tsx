"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    } else {
      const { user } = data;
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("user_id", user.id)
        .single();

      if (profileError || !profileData) {
        router.push("/profile");
      } else {
        router.push("/leaderboard");
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4 pt-24">
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Logg inn</CardTitle>
        <CardDescription>
          Skriv inn e-post og passord for å logge inn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Passord</Label>
              <Link
                href="/password"
                className="ml-auto inline-block text-sm underline"
              >
                Glemt passordet ditt?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logger inn..." : "Logg inn"}
          </Button>

        </form>

        <div className="mt-4 text-center text-sm">
          Har du ikke en konto?{" "}
          <Link href="/register" className="underline">
            Registrer deg
          </Link>
        </div>
      </CardContent>
      </Card>
    </div>
  );
}
