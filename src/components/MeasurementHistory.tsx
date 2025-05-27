"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { supabase } from "@/lib/supabase"; // Bruk samme supabase-oppsett som i HistoryList

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

interface MeasurementField {
  key: keyof Measurement;
  label: string;
  unit: string;
  color: string;
}

const measurementFields: MeasurementField[] = [
  {
    key: "body_fat_percentage",
    label: "Kroppsfett %",
    unit: "%",
    color: "hsl(var(--chart-1))",
  },
  { key: "weight", label: "Vekt", unit: "kg", color: "hsl(var(--chart-2))" },
  { key: "height", label: "Høyde", unit: "cm", color: "hsl(var(--chart-3))" },
  { key: "chest", label: "Bryst", unit: "cm", color: "hsl(var(--chart-4))" },
  { key: "abdomen", label: "Mage", unit: "cm", color: "hsl(var(--chart-5))" },
  { key: "hip", label: "Hofte", unit: "cm", color: "hsl(var(--chart-1))" },
  {
    key: "midaxillary",
    label: "Midtaksillær",
    unit: "mm",
    color: "hsl(var(--chart-2))",
  },
  {
    key: "triceps",
    label: "Triceps",
    unit: "mm",
    color: "hsl(var(--chart-3))",
  },
  {
    key: "scapular",
    label: "Skulderblad",
    unit: "mm",
    color: "hsl(var(--chart-4))",
  },
  { key: "thigh", label: "Lår", unit: "mm", color: "hsl(var(--chart-5))" },
  {
    key: "fett_kg",
    label: "Fett (kg)",
    unit: "kg",
    color: "hsl(var(--chart-1))",
  },
  {
    key: "fett_kg_rest",
    label: "Fett kg rest (kg)",
    unit: "kg",
    color: "hsl(var(--chart-2))",
  },
  {
    key: "fett_kcal",
    label: "Fett (kcal)",
    unit: "kcal",
    color: "hsl(var(--chart-2))",
  },
  {
    key: "fett_kcal_rest",
    label: "Fett kcal rest(kcal)",
    unit: "kcal",
    color: "hsl(var(--chart-2))",
  },
  {
    key: "muskelmasse",
    label: "Muskelmasse",
    unit: "kg",
    color: "hsl(var(--chart-3))",
  },
  {
    key: "benmasse",
    label: "Benmasse",
    unit: "kg",
    color: "hsl(var(--chart-4))",
  },
  {
    key: "organer",
    label: "Organmasse",
    unit: "kg",
    color: "hsl(var(--chart-5))",
  },
];

interface MeasurementHistoryProps {
  userId: string;
}

export default function MeasurementHistory({
  userId,
}: MeasurementHistoryProps) {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState<MeasurementField>(
    measurementFields[0]
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const { data, error } = await supabase
          .from("measurements")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: true });

        if (error) {
          throw error;
        }

        setMeasurements(data || []);
      } catch (err) {
        setError("Kunne ikke hente målinger");
        console.error("Error fetching measurements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, [userId]);

  const chartData = measurements
    .map((measurement) => ({
      date: format(new Date(measurement.created_at), "dd.MM.yyyy", {
        locale: nb,
      }),
      value: measurement[selectedField.key] as number,
      fullDate: measurement.created_at,
    }))
    .filter((item) => item.value !== null && item.value !== undefined);

  const chartConfig = {
    value: { label: selectedField.label, color: selectedField.color },
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historikk</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historikk</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (measurements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historikk</CardTitle>
          <CardDescription>
            Ingen målinger funnet. Legg til din første måling for å se
            utviklingen over tid.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historikk</CardTitle>
          <CardDescription>
            Klikk på en variabel nedenfor for å se utviklingen over tid
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {measurementFields.map((field) => {
                const hasData = measurements.some(
                  (m) => m[field.key] !== null && m[field.key] !== undefined
                );
                if (!hasData) return null;

                return (
                  <Button
                    key={field.key}
                    variant={
                      selectedField.key === field.key ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedField(field)}
                    className="text-xs"
                  >
                    {field.label}
                  </Button>
                );
              })}
            </div>

            {chartData.length > 0 ? (
              <div className="h-[300px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, left: 12, right: 12, bottom: 20 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `${value}${selectedField.unit}`}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          hideLabel
                          formatter={(value) => [
                            `${value}${selectedField.unit}`,
                          ]}
                        />
                      }
                    />
                    <Line
                      dataKey="value"
                      type="monotone"
                      stroke={selectedField.color}
                      strokeWidth={2}
                      dot={{ fill: selectedField.color, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Ingen data tilgjengelig for {selectedField.label}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
