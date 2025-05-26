"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Measurement {
  id: string;
  body_fat_percentage: number;
  created_at: string;
  users: {
    email: string;
  };
}

// Definer en midlertidig type for Supabase-responsen (users som array)
interface RawMeasurement extends Omit<Measurement, "users"> {
  users: { email: string }[];
}

export default function LeaderboardList() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "percentage">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeasurements = async () => {
      setLoading(true);

      let query = supabase
        .from("measurements")
        .select(
          `
          id,
          body_fat_percentage,
          created_at,
          users (
            email
          )
        `
        )
        .limit(20);

      if (sortBy === "date") {
        query = query.order("created_at", { ascending: sortOrder === "asc" });
      } else {
        query = query.order("body_fat_percentage", {
          ascending: sortOrder === "asc",
        });
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching measurements:", error);
      } else {
        setMeasurements(
          ((data as RawMeasurement[]) || []).map((item) => ({
            ...item,
            users: item.users[0] ?? { email: "Ukjent" }, // fallback hvis users er tomt
          }))
        );
      }

      setLoading(false);
    };

    fetchMeasurements();
  }, [sortBy, sortOrder]);

  const toggleSort = (newSortBy: "date" | "percentage") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("no-NO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getUserName = (email: string) => {
    return email.split("@")[0];
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Leaderboard</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={sortBy === "date" ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSort("date")}
            >
              Dato{" "}
              {sortBy === "date" &&
                (sortOrder === "desc" ? (
                  <TrendingDown className="ml-1 h-4 w-4" />
                ) : (
                  <TrendingUp className="ml-1 h-4 w-4" />
                ))}
            </Button>
            <Button
              variant={sortBy === "percentage" ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSort("percentage")}
            >
              Fettprosent{" "}
              {sortBy === "percentage" &&
                (sortOrder === "desc" ? (
                  <TrendingDown className="ml-1 h-4 w-4" />
                ) : (
                  <TrendingUp className="ml-1 h-4 w-4" />
                ))}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {measurements.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Ingen registreringer ennå. Vær den første!
          </p>
        ) : (
          <div className="space-y-4">
            {measurements.map((measurement, index) => (
              <div
                key={measurement.id}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-500">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium">
                      {getUserName(measurement.users.email)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(measurement.created_at)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    {measurement.body_fat_percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
