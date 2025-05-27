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
import { Trash2, Eye } from "lucide-react";

interface Measurement {
  id: string;
  user_id: string;
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
}

export default function HistoryList() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMeasurement, setExpandedMeasurement] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchMeasurements();
  }, []);

  const fetchMeasurements = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("measurements")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching measurements:", error);
    } else {
      setMeasurements(data || []);
    }

    setLoading(false);
  };

  const deleteMeasurement = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne målingen?")) {
      return;
    }

    const { error } = await supabase.from("measurements").delete().eq("id", id);

    if (error) {
      console.error("Error deleting measurement:", error);
      alert("Feil ved sletting av måling");
    } else {
      setMeasurements((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("no-NO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mine målinger</CardTitle>
        </CardHeader>
        <CardContent>
          {measurements.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Du har ingen målinger ennå.</p>
              <Button onClick={() => (window.location.href = "/add")}>
                Legg til første måling
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="font-semibold border-r">
                      Kroppsfett
                    </TableHead>
                    <TableHead className="font-semibold border-r">
                      Metode
                    </TableHead>
                    <TableHead className="font-semibold border-r">
                      Vekt
                    </TableHead>
                    <TableHead className="font-semibold border-r">
                      Dato
                    </TableHead>
                    <TableHead className="w-[50px] border-r"></TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {measurements.map((measurement) => (
                    <React.Fragment key={measurement.id}>
                      <TableRow className="border-b">
                        <TableCell className="border-r">
                          {measurement.body_fat_percentage.toFixed(1)}%
                        </TableCell>
                        <TableCell className="border-r">
                          {measurement.method || "-"}
                        </TableCell>
                        <TableCell className="border-r">
                          {measurement.weight
                            ? `${measurement.weight} kg`
                            : "-"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground border-r">
                          {formatDate(measurement.created_at)}
                        </TableCell>
                        <TableCell className="border-r">
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
                            className="text-gray-600 hover:text-gray-700 border border-gray-300 rounded-md hover:border-gray-500"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteMeasurement(measurement.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-gray-300 rounded-md hover:border-gray-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedMeasurement === measurement.id && (
                        <TableRow className="border-b">
                          <TableCell colSpan={7} className="bg-gray-50">
                            <div className="py-4">
                              <div className="rounded-md border bg-white">
                                <Table>
                                  <TableBody>
                                    <TableRow className="border-b">
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Registrert
                                      </TableCell>
                                      <TableCell
                                        className="border-r"
                                        colSpan={2}
                                      >
                                        {formatDate(measurement.created_at)}
                                      </TableCell>

                                      <TableCell className="font-medium border-r bg-gray-100 w-1/4">
                                        Metode
                                      </TableCell>
                                      <TableCell>
                                        {measurement.method || "Ikke oppgitt"}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow className="border-b">
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Vekt (kg)
                                      </TableCell>
                                      <TableCell
                                        className="border-r"
                                        colSpan={2}
                                      >
                                        {measurement.weight
                                          ? `${measurement.weight}`
                                          : "Ikke oppgitt"}
                                      </TableCell>
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Høyde (cm)
                                      </TableCell>
                                      <TableCell>
                                        {measurement.height
                                          ? `${measurement.height}`
                                          : "Ikke oppgitt"}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow className="border-b">
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Alder (år)
                                      </TableCell>
                                      <TableCell
                                        className="border-r"
                                        colSpan={2}
                                      >
                                        {measurement.age
                                          ? `${measurement.age}`
                                          : "Ikke oppgitt"}
                                      </TableCell>
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Kjønn
                                      </TableCell>
                                      <TableCell>
                                        {measurement.gender || "Ikke oppgitt"}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow className="border-b">
                                      <TableCell className="font-medium border-r bg-gray-100 w-1/4">
                                        Kroppsfett (%)
                                      </TableCell>
                                      <TableCell
                                        className="border-b"
                                        colSpan={2}
                                      >
                                        {measurement.body_fat_percentage.toFixed(
                                          1
                                        )}
                                      </TableCell>
                                    </TableRow>

                                    <TableRow className="border-b">
                                      <TableCell
                                        colSpan={7}
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
                                        {measurement.fett_kcal_rest?.toFixed(
                                          0
                                        ) ?? "Ikke beregnet"}
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
                                        colSpan={7}
                                        className="font-medium bg-blue-50 text-center py-2"
                                      ></TableCell>
                                    </TableRow>

                                    <TableRow className="border-b">
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Bryst (mm)
                                      </TableCell>
                                      <TableCell
                                        className="border-r"
                                        colSpan={2}
                                      >
                                        {measurement.chest
                                          ? `${measurement.chest}`
                                          : "Ikke målt"}
                                      </TableCell>
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Mage (mm)
                                      </TableCell>
                                      <TableCell>
                                        {measurement.abdomen
                                          ? `${measurement.abdomen}`
                                          : "Ikke målt"}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow className="border-b">
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Hofte (mm)
                                      </TableCell>
                                      <TableCell
                                        className="border-r"
                                        colSpan={2}
                                      >
                                        {measurement.hip
                                          ? `${measurement.hip}`
                                          : "Ikke målt"}
                                      </TableCell>
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Midtaksillær (mm)
                                      </TableCell>
                                      <TableCell>
                                        {measurement.midaxillary
                                          ? `${measurement.midaxillary}`
                                          : "Ikke målt"}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow className="border-b">
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Triceps (mm)
                                      </TableCell>
                                      <TableCell
                                        className="border-r"
                                        colSpan={2}
                                      >
                                        {measurement.triceps
                                          ? `${measurement.triceps}`
                                          : "Ikke målt"}
                                      </TableCell>
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Skulderblad (mm)
                                      </TableCell>
                                      <TableCell>
                                        {measurement.scapular
                                          ? `${measurement.scapular}`
                                          : "Ikke målt"}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell className="font-medium border-r bg-gray-100">
                                        Lår (mm)
                                      </TableCell>
                                      <TableCell colSpan={2}>
                                        {measurement.thigh
                                          ? `${measurement.thigh}`
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
    </div>
  );
}
