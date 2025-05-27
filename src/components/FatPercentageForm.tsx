"use client"; // Dette markerer at komponenten kjører på klientsiden

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";

export default function FatPercentageForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    fat_goal: "", // 🔥 Legger til fettprosentmål
    chest: "",
    abdomen: "",
    hip: "",
    midaxillary: "",
    triceps: "",
    scapular: "",
    thigh: "",
  });

  const [result, setResult] = useState<{
    fettProsent: number;
    fettKg: number;
    fettKcal: number;
    fettKgRest: number | null;
    fettKcalRest: number | null;
    benmasse: number;
    organer: number;
    muskelmasse: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("age, gender, height, fat_goal")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Feil ved henting av profil:", error);
        alert("Kunne ikke hente profilinformasjon.");
      } else if (data) {
        setFormData((prev) => ({
          ...prev,
          age: data.age?.toString() ?? "",
          gender: data.gender ?? "",
          height: data.height?.toString() ?? "",
          fat_goal: data.fat_goal?.toString() ?? "",
        }));
        setProfileLoaded(true);
      }
    };

    fetchProfile();
  }, [router]);

  const calculateBodyFat = () => {
    setLoading(true);

    const age = Number.parseInt(formData.age);
    const weight = Number.parseFloat(formData.weight);
    const fatGoal = Number.parseFloat(formData.fat_goal);
    const gender = formData.gender;

    const measurements = [
      Number.parseFloat(formData.chest),
      Number.parseFloat(formData.abdomen),
      Number.parseFloat(formData.hip),
      Number.parseFloat(formData.midaxillary),
      Number.parseFloat(formData.triceps),
      Number.parseFloat(formData.scapular),
      Number.parseFloat(formData.thigh),
    ];

    if (!age || !weight || measurements.some(isNaN)) {
      alert("Vennligst fyll ut alle målinger og vekt");
      setLoading(false);
      return;
    }

    const sum = measurements.reduce((acc, val) => acc + val, 0);
    const densitet =
      1.112 - 0.00043499 * sum + 0.00000055 * Math.sqrt(sum) - 0.00028826 * age;
    const bodyFat = 495 / densitet - 450;

    const fettProsent = Math.round(bodyFat * 10) / 10;
    const fettKg = (fettProsent * weight) / 100;
    const fettKcal = fettKg * 7700;
    const fettKgRest = fatGoal
      ? (fettKg / fettProsent) * (fettProsent - fatGoal)
      : null;
    const fettKcalRest = fettKgRest ? fettKgRest * 7700 : null;
    const benmasse = gender === "male" ? 0.15 * weight : 0.12 * weight;
    const organer = 0.09 * weight;
    const muskelmasse = weight - fettKg - benmasse;

    setResult({
      fettProsent,
      fettKg,
      fettKcal,
      fettKgRest,
      fettKcalRest,
      benmasse,
      organer,
      muskelmasse,
    });

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
      body_fat_percentage: result.fettProsent,
      fett_kg: result.fettKg,
      fett_kcal: result.fettKcal,
      fett_kg_rest: result.fettKgRest,
      fett_kcal_rest: result.fettKcalRest,
      benmasse: result.benmasse,
      organer: result.organer,
      muskelmasse: result.muskelmasse,
      age: Number.parseInt(formData.age),
      gender: formData.gender,
      height: Number.parseFloat(formData.height),
      weight: Number.parseFloat(formData.weight),
      chest: Number.parseFloat(formData.chest),
      abdomen: Number.parseFloat(formData.abdomen),
      hip: Number.parseFloat(formData.hip),
      midaxillary: Number.parseFloat(formData.midaxillary),
      triceps: Number.parseFloat(formData.triceps),
      scapular: Number.parseFloat(formData.scapular),
      thigh: Number.parseFloat(formData.thigh),
      method: "Hudfold Kalkulasjon",
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
    setResult(null);
  };

  const isFormValid =
    formData.gender &&
    formData.age &&
    formData.height &&
    formData.weight &&
    formData.chest &&
    formData.abdomen &&
    formData.hip &&
    formData.midaxillary &&
    formData.triceps &&
    formData.scapular &&
    formData.thigh;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fettprosent kalkulator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gender">Kjønn</Label>
            <Select
              value={formData.gender}
              disabled
              onValueChange={(value) => handleInputChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Velg kjønn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mann">Mann</SelectItem>
                <SelectItem value="Kvinne">Kvinne</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="age">Alder</Label>
            <Input id="age" type="number" value={formData.age} disabled />
          </div>
          <div>
            <Label htmlFor="height">Høyde (cm)</Label>
            <Input id="height" type="number" value={formData.height} disabled />
          </div>
          <div>
            <Label htmlFor="weight">Vekt (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="f.eks. 70"
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
            />
          </div>
          {[
            { label: "Bryst (mm)", id: "chest" },
            { label: "Mage (mm)", id: "abdomen" },
            { label: "Hofte (mm)", id: "hip" },
            { label: "Midaxillary (mm)", id: "midaxillary" },
            { label: "Triceps (mm)", id: "triceps" },
            { label: "Skulderblad (mm)", id: "scapular" },
            { label: "Lår (mm)", id: "thigh" },
          ].map((field) => (
            <div key={field.id}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                type="number"
                placeholder={field.label}
                value={formData[field.id as keyof typeof formData]}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        {profileLoaded ? (
          <>
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
                  <div className="text-4xl font-bold text-blue-600">
                    {result.fettProsent}%
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Basert på hudfoldmålinger og alder.
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
          </>
        ) : (
          <p className="text-center text-gray-500">
            Laster profilinformasjon...
          </p>
        )}
      </CardContent>
    </Card>
  );
}
