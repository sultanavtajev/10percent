import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calculator, TrendingUp, Users, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Spor din <span className="text-blue-600">fettprosent</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Beregn, registrer og følg utviklingen av din fettprosent over tid.
            Sammenlign deg med andre og hold motivasjonen oppe!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-3">
                Kom i gang gratis
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Logg inn
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hvorfor velge 10percent.no?
            </h2>
            <p className="text-lg text-gray-600">
              Alt du trenger for å følge med på din kroppssammensetning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Enkel kalkulator</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Beregn fettprosent basert på kjønn, alder, vekt og høyde med
                  vår presise kalkulator
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Følg utvikling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Se hvordan fettprosenten din endrer seg over tid med detaljert
                  historikk
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Sammenlign</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Se hvordan du ligger an i forhold til andre brukere på
                  leaderboardet
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Trygt og privat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Dine data er sikre hos oss. Vi deler aldri personlig
                  informasjon
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Klar til å begynne?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Registrer deg i dag og start å spore din fettprosent. Det tar bare
            et minutt!
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-3">
              Opprett gratis konto
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
