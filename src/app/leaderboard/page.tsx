"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import LeaderboardList from "@/components/LeaderboardList";
import type { User } from "@supabase/supabase-js";

export default function LeaderboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Siste registreringer
        </h1>
        <p className="text-lg text-gray-600">
          Se hvordan andre ligger an med fettprosent
        </p>
      </div>

      <LeaderboardList />
    </div>
  );
}
