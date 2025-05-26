"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default function FatPercentageForm() {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    weight: "",
    height: "",
  });
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const calculateBodyFat = () => {
    setLoading(true);

    // Simple body fat calculation using BMI-based formula
    // This is a simplified version - you might want to use a more sophisticated formula
    const weight = Number.parseFloat(formData.weight);
    const height = Number.parseFloat(formData.height) / 100; // Convert cm to meters
    const age = Number.parseInt(formData.age);

    if (!weight || !height || !age) {
      setLoading(false);
      return;
    }

    const bmi = weight / (height * height);

    let bodyFat: number;

    if (formData.gender === "male") {
      bodyFat = 1.2 * bmi + 0.23 * age - 16.2;
    } else {
      bodyFat = 1.2 * bmi + 0.23 * age - 5.4;
    }

    // Ensure reasonable bounds
    bodyFat = Math.max(3, Math.min(50, bodyFat));

    setResult(Math.round(bodyFat * 10) / 10);
    setLoading(false);
  };

  const saveMeasurement = async () => {
    if (!result) return;

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("measurements").insert({
      user_id: user.id,
      body_fat_percentage: result,
      weight: Number.parseFloat(formData.weight),
      height: Number.parseFloat(formData.height),
      age: Number.parseInt(formData.age),
      gender: formData.gender,
      method: "kalkulator",
    });

    if (error) {
      console.error("Error saving measurement:", error);
      alert("Feil ved lagring av måling");
    } else {
      router.push("/profile");
    }

    setSaving(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setResult(null); // Reset result when form changes
  };

  const isFormValid =
    formData.gender && formData.age && formData.weight && formData.height;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fettprosent kalkulator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gender">Kjønn</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Velg kjønn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Mann</SelectItem>
                <SelectItem value="female">Kvinne</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="age">Alder</Label>
            <Input
              id="age"
              type="number"
              placeholder="f.eks. 25"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              min="10"
              max="100"
            />
          </div>

          <div>
            <Label htmlFor="weight">Vekt (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="f.eks. 70"
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              min="30"
              max="300"
              step="0.1"
            />
          </div>

          <div>
            <Label htmlFor="height">Høyde (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="f.eks. 175"
              value={formData.height}
              onChange={(e) => handleInputChange("height", e.target.value)}
              min="100"
              max="250"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={calculateBodyFat}
            disabled={!isFormValid || loading}
            size="lg"
          >
            {loading ? "Beregner..." : "Beregn fettprosent"}
          </Button>
        </div>

        {result !== null && (
          <div className="text-center space-y-4">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Din estimerte fettprosent:
              </h3>
              <div className="text-4xl font-bold text-blue-600">{result}%</div>
              <p className="text-sm text-gray-600 mt-2">
                Dette er et estimat basert på BMI og alder
              </p>
            </div>

            <Button
              onClick={saveMeasurement}
              disabled={saving}
              size="lg"
              className="w-full"
            >
              {saving ? "Lagrer..." : "Lagre måling"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
