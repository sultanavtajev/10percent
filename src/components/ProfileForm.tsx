"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@supabase/supabase-js";
import { Pencil, Lock } from "lucide-react";

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    height: "",
    weight: "",
    fat_goal: "",
    weight_goal: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "first_name, last_name, age, height, weight, fat_goal, weight_goal, gender"
        )
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Feil ved henting av profil:", error);
      } else if (data) {
        setFormData({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          age: data.age?.toString() ?? "",
          height: data.height?.toString() ?? "",
          weight: data.weight?.toString() ?? "",
          fat_goal: data.fat_goal?.toString() ?? "",
          weight_goal: data.weight_goal?.toString() ?? "",
          gender: data.gender ?? "",
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    const {
      first_name,
      last_name,
      age,
      height,
      weight,
      fat_goal,
      weight_goal,
      gender,
    } = formData;

    if (
      [
        first_name,
        last_name,
        age,
        height,
        weight,
        fat_goal,
        weight_goal,
        gender,
      ].some((val) => val === "") ||
      isNaN(Number(age)) ||
      isNaN(Number(height)) ||
      isNaN(Number(weight)) ||
      isNaN(Number(fat_goal)) ||
      isNaN(Number(weight_goal))
    ) {
      alert("Vennligst fyll ut alle feltene med gyldige verdier");
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("profiles").upsert(
      {
        user_id: user.id,
        first_name,
        last_name,
        age: parseInt(age),
        height: parseFloat(height),
        weight: parseFloat(weight),
        fat_goal: parseFloat(fat_goal),
        weight_goal: parseFloat(weight_goal),
        gender,
      },
      { onConflict: "user_id" }
    );

    if (error) {
      console.error("Feil ved lagring av profil:", error);
      alert("Kunne ikke lagre profilen.");
    } else {
      alert("Profilen er lagret!");
      setIsEditable(false);
    }

    setSaving(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(formData).every((val) => val !== "");

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Card className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsEditable(!isEditable)}
        className="absolute top-4 right-4"
      >
        {isEditable ? <Lock size={20} /> : <Pencil size={20} />}
      </Button>

      <CardHeader>
        <CardTitle>Fyll ut profilinformasjon</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gender">Kjønn</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
              disabled={!isEditable} // Disabled for Select
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

          {[
            { label: "Fornavn", id: "first_name", placeholder: "f.eks. Ola" },
            {
              label: "Etternavn",
              id: "last_name",
              placeholder: "f.eks. Nordmann",
            },
            { label: "Alder", id: "age", placeholder: "f.eks. 25" },
            { label: "Høyde (cm)", id: "height", placeholder: "f.eks. 175" },
            { label: "Vekt (kg)", id: "weight", placeholder: "f.eks. 70" },
            {
              label: "Fettprosent-mål (%)",
              id: "fat_goal",
              placeholder: "f.eks. 20",
            },
            {
              label: "Vekt-mål (kg)",
              id: "weight_goal",
              placeholder: "f.eks. 65",
            },
          ].map((field) => (
            <div key={field.id}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                type={
                  field.id.includes("goal") ||
                  field.id === "age" ||
                  field.id === "height" ||
                  field.id === "weight"
                    ? "number"
                    : "text"
                }
                placeholder={field.placeholder}
                value={formData[field.id as keyof typeof formData]}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                disabled={!isEditable} // Disabled for Input
              />
            </div>
          ))}
        </div>

        {isEditable && (
          <div className="flex justify-center">
            <Button
              onClick={handleSaveProfile}
              disabled={!isFormValid || saving}
            >
              {saving ? "Lagrer..." : "Lagre profil"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
