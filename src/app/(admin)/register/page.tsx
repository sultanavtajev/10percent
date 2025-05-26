"use client";

import type React from "react";

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
import { signUp } from "@/lib/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passordene matcher ikke");
      setLoading(false);
      return;
    }

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Registrering vellykket!
              </h2>
              <p className="text-gray-600">
                Du blir omdirigert til innloggingssiden...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Registrer deg</CardTitle>
          <CardDescription>
            Opprett en konto for å begynne å registrere målinger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Passord</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Bekreft passord</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registrerer..." : "Registrer deg"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Har du allerede konto?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Logg inn her
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
