"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import HistoryList from "@/components/HistoryList";
import type { User } from "@supabase/supabase-js";
import ProfileForm from "@/components/ProfileForm";
import MeasurementHistory from "@/components/MeasurementHistory";

export default function ProfilePage() {
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
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* ProfileForm-komponenten */}
      <ProfileForm user={user} />

      <div className="mt-8">
        {/* HistoryList komponent */}
        <HistoryList />
      </div>

      <div className="mt-8">
        {/* Measurement History komponent */}
        <MeasurementHistory userId={user.id} />
      </div>
    </div>
  );
}
