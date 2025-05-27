"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase";
import { TrendingUp, TrendingDown, Eye } from "lucide-react";

interface Measurement {
  id: string;
  body_fat_percentage: number;
  method?: string;
  weight?: number;
  height?: number;
  age?: number;
  gender?: string;
  created_at: string;
  chest?: number;
  abdomen?: number;
  hip?: number;
  midaxillary?: number;
  triceps?: number;
  scapular?: number;
  thigh?: number;
  fett_kg?: number;
  fett_kcal?: number;
  fett_kg_rest?: number;
  fett_kcal_rest?: number;
  benmasse?: number;
  organer?: number;
  muskelmasse?: number;
  profiles: {
    first_name: string;
    last_name: string;
  };
}

export default function LeaderboardList() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "percentage">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);
  const [expandedMeasurement, setExpandedMeasurement] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchMeasurements = async () => {
      setLoading(true);

      let query = supabase
        .from("measurements")
        .select(
          `
          *,
          profiles (
            first_name,
            last_name
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
          (data || []).map((item) => ({
            ...item,
            profiles: (Array.isArray(item.profiles)
              ? item.profiles[0]
              : item.profiles) ?? {
              first_name: "Ukjent",
              last_name: "",
            },
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
    if (!dateString) return "Ukjent dato";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Ugyldig dato"
      : date.toLocaleDateString("no-NO", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const getDisplayName = (profile: {
    first_name: string;
    last_name: string;
  }) => {
    const name = `${profile.first_name} ${profile.last_name}`.trim();
    return name || "Ukjent";
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
          <CardTitle>Siste registreringer</CardTitle>
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
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Ingen registreringer ennå.</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="font-semibold border-r">Navn</TableHead>
                  <TableHead className="font-semibold border-r">
                    Kroppsfett
                  </TableHead>
                  <TableHead className="font-semibold border-r">
                    Metode
                  </TableHead>
                  <TableHead className="font-semibold border-r">Vekt</TableHead>
                  <TableHead className="font-semibold border-r">Dato</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {measurements.map((measurement, index) => (
                  <React.Fragment key={measurement.id}>
                    <TableRow className="border-b">
                      <TableCell className="border-r">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-500">
                            #{index + 1}
                          </span>
                          <span>{getDisplayName(measurement.profiles)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="border-r">
                        {measurement.body_fat_percentage.toFixed(1)}%
                      </TableCell>
                      <TableCell className="border-r">
                        {measurement.method || "-"}
                      </TableCell>
                      <TableCell className="border-r">
                        {measurement.weight ? `${measurement.weight} kg` : "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground border-r">
                        {formatDate(measurement.created_at)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setExpandedMeasurement(
                              expandedMeasurement === measurement.id
                                ? null
                                : measurement.id
                            )
                          }
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedMeasurement === measurement.id && (
                      <TableRow className="border-b">
                        <TableCell colSpan={6} className="bg-gray-50">
                          <div className="py-4">
                            <div className="rounded-md border bg-white">
                              <Table>
                                <TableBody>
                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Navn
                                    </TableCell>
                                    <TableCell className="border-r" colSpan={2}>
                                      {getDisplayName(measurement.profiles)}
                                    </TableCell>
                                    <TableCell className="font-medium border-r bg-gray-100 w-1/4">
                                      Registrert
                                    </TableCell>
                                    <TableCell>
                                      {formatDate(measurement.created_at)}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Metode
                                    </TableCell>
                                    <TableCell className="border-r" colSpan={2}>
                                      {measurement.method || "Ikke oppgitt"}
                                    </TableCell>
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Vekt (kg)
                                    </TableCell>
                                    <TableCell>
                                      {measurement.weight
                                        ? `${measurement.weight}`
                                        : "Ikke oppgitt"}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Høyde (cm)
                                    </TableCell>
                                    <TableCell className="border-r" colSpan={2}>
                                      {measurement.height
                                        ? `${measurement.height}`
                                        : "Ikke oppgitt"}
                                    </TableCell>
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Alder (år)
                                    </TableCell>
                                    <TableCell>
                                      {measurement.age
                                        ? `${measurement.age}`
                                        : "Ikke oppgitt"}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Kjønn
                                    </TableCell>
                                    <TableCell className="border-r" colSpan={2}>
                                      {measurement.gender || "Ikke oppgitt"}
                                    </TableCell>
                                    <TableCell className="font-medium border-r bg-gray-100 w-1/4">
                                      Kroppsfett (%)
                                    </TableCell>
                                    <TableCell>
                                      {measurement.body_fat_percentage.toFixed(
                                        1
                                      )}
                                    </TableCell>
                                  </TableRow>

                                  <TableRow className="border-b">
                                    <TableCell
                                      colSpan={5}
                                      className="font-medium bg-blue-50 text-center py-2"
                                    ></TableCell>
                                  </TableRow>

                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Fettmasse (kg)
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                      {measurement.fett_kg?.toFixed(1) ??
                                        "Ikke beregnet"}
                                    </TableCell>
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Fett (kcal)
                                    </TableCell>
                                    <TableCell>
                                      {measurement.fett_kcal?.toFixed(0) ??
                                        "Ikke beregnet"}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Rest fettmasse (kg)
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                      {measurement.fett_kg_rest?.toFixed(1) ??
                                        "Ikke beregnet"}
                                    </TableCell>
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Rest fett (kcal)
                                    </TableCell>
                                    <TableCell>
                                      {measurement.fett_kcal_rest?.toFixed(0) ??
                                        "Ikke beregnet"}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Benmasse (kg)
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                      {measurement.benmasse?.toFixed(1) ??
                                        "Ikke beregnet"}
                                    </TableCell>
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Organvekt (kg)
                                    </TableCell>
                                    <TableCell>
                                      {measurement.organer?.toFixed(1) ??
                                        "Ikke beregnet"}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Muskelmasse (kg)
                                    </TableCell>
                                    <TableCell className="border-b">
                                      {measurement.muskelmasse?.toFixed(1) ??
                                        "Ikke beregnet"}
                                    </TableCell>
                                  </TableRow>

                                  <TableRow className="border-b">
                                    <TableCell
                                      colSpan={5}
                                      className="font-medium bg-blue-50 text-center py-2"
                                    ></TableCell>
                                  </TableRow>

                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Bryst
                                    </TableCell>
                                    <TableCell className="border-r" colSpan={2}>
                                      {measurement.chest
                                        ? `${measurement.chest} mm`
                                        : "Ikke målt"}
                                    </TableCell>
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Mage
                                    </TableCell>
                                    <TableCell>
                                      {measurement.abdomen
                                        ? `${measurement.abdomen} mm`
                                        : "Ikke målt"}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Hofte
                                    </TableCell>
                                    <TableCell className="border-r" colSpan={2}>
                                      {measurement.hip
                                        ? `${measurement.hip} mm`
                                        : "Ikke målt"}
                                    </TableCell>
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Midtaksillær
                                    </TableCell>
                                    <TableCell>
                                      {measurement.midaxillary
                                        ? `${measurement.midaxillary} mm`
                                        : "Ikke målt"}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="border-b">
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Triceps
                                    </TableCell>
                                    <TableCell className="border-r" colSpan={2}>
                                      {measurement.triceps
                                        ? `${measurement.triceps} mm`
                                        : "Ikke målt"}
                                    </TableCell>
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Skulderblad
                                    </TableCell>
                                    <TableCell>
                                      {measurement.scapular
                                        ? `${measurement.scapular} mm`
                                        : "Ikke målt"}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium border-r bg-gray-100">
                                      Lår
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                      {measurement.thigh
                                        ? `${measurement.thigh} mm`
                                        : "Ikke målt"}
                                    </TableCell>
                                    <TableCell></TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
