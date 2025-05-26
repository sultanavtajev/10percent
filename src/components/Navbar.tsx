"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              10PERCENT
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              hjem
            </Link>

            {user ? (
              <>
                <Link
                  href="/leaderboard"
                  className="text-gray-700 hover:text-gray-900"
                >
                  leaderboard
                </Link>
                <Link href="/add" className="text-gray-700 hover:text-gray-900">
                  legg til
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-gray-900"
                >
                  profil
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Logg ut
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Logg inn
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Registrer</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
