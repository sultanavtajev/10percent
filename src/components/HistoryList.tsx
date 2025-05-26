"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Trash2 } from "lucide-react"

interface Measurement {
  id: string
  body_fat_percentage: number
  weight: number
  height: number
  age: number
  gender: string
  created_at: string
}

export default function HistoryList() {
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMeasurements()
  }, [])

  const fetchMeasurements = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from("measurements")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching measurements:", error)
    } else {
      setMeasurements(data || [])
    }

    setLoading(false)
  }

  const deleteMeasurement = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette denne målingen?")) {
      return
    }

    const { error } = await supabase.from("measurements").delete().eq("id", id)

    if (error) {
      console.error("Error deleting measurement:", error)
      alert("Feil ved sletting av måling")
    } else {
      setMeasurements((prev) => prev.filter((m) => m.id !== id))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("no-NO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mine målinger</CardTitle>
      </CardHeader>
      <CardContent>
        {measurements.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Du har ingen målinger ennå.</p>
            <Button onClick={() => (window.location.href = "/add")}>Legg til første måling</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {measurements.map((measurement) => (
              <div key={measurement.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {measurement.body_fat_percentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Vekt: {measurement.weight} kg</p>
                      <p>Høyde: {measurement.height} cm</p>
                      <p>Alder: {measurement.age} år</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{formatDate(measurement.created_at)}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMeasurement(measurement.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
