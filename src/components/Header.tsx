"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";
import type { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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
    router.push("/");
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-4 lg:px-6 h-14 flex items-center bg-transparent">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Image
          src="/10.png" // 🔥 Tilpass filnavnet etter din bildefil i public-mappen
          alt="Logo"
          width={48}
          height={32}
        />
        <span className="text-lg font-semibold">PERCENT</span>
      </Link>
      <div className="ml-auto flex items-center gap-4 sm:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full sm:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Link
                href="/"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Hjem
              </Link>
            </DropdownMenuItem>
            {user ? (
              <>
                <DropdownMenuItem>
                  <Link
                    href="/leaderboard"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Oversikt
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/add"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Legg til
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/profile"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleSignOut}>
                  <span className="text-sm font-medium hover:underline underline-offset-4 cursor-pointer">
                    Logg ut
                  </span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Logg inn
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/register"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    prefetch={false}
                  >
                    Registrer
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <nav className="hidden sm:flex gap-4 sm:gap-6 items-center">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4 flex items-center"
            prefetch={false}
          >
            Hjem
          </Link>
          {user ? (
            <>
              <Link
                href="/leaderboard"
                className="text-sm font-medium hover:underline underline-offset-4 flex items-center"
                prefetch={false}
              >
                Oversikt
              </Link>
              <Link
                href="/add"
                className="text-sm font-medium hover:underline underline-offset-4 flex items-center"
                prefetch={false}
              >
                Legg til
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium hover:underline underline-offset-4 flex items-center"
                prefetch={false}
              >
                Profil
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
        </nav>
      </div>
    </header>
  );
}


function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
