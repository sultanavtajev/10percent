"use client";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16 lg:py-24">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Om 10percent.no
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Din plattform for å spore og sammenligne fettprosent
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">Hva er 10percent.no?</h2>
            <p className="mt-2 text-muted-foreground">
              10percent.no er en enkel og brukervennlig plattform som lar deg
              beregne, registrere og sammenligne din fettprosent med andre
              brukere. Målet vårt er å gjøre det enkelt å følge med på din
              kroppssammensetning over tid.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Hvordan fungerer det?</h2>
            <p className="mt-2 text-muted-foreground">
              Vår kalkulator bruker en BMI-basert formel som tar hensyn til
              kjønn, alder, vekt og høyde for å estimere fettprosent. Selv om
              dette ikke er like nøyaktig som profesjonelle målemetoder, gir det
              en god indikasjon på utviklingen over tid.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Personvern</h2>
            <p className="mt-2 text-muted-foreground">
              Vi tar personvern på alvor. Dine data lagres sikkert, og vi deler
              aldri personlig informasjon med tredjeparter. På leaderboardet
              vises kun brukernavn (første del av e-postadressen) og
              fettprosent.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Kontakt</h2>
            <p className="mt-2 text-muted-foreground">
              Har du spørsmål eller tilbakemeldinger? Ta gjerne kontakt med oss!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
