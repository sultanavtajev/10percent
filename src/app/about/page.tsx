export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Om 10percent.no
        </h1>
        <p className="text-xl text-gray-600">
          Din plattform for å spore og sammenligne fettprosent
        </p>
      </div>

      <div className="prose prose-lg mx-auto">
        <h2>Hva er 10percent.no?</h2>
        <p>
          10percent.no er en enkel og brukervennlig plattform som lar deg
          beregne, registrere og sammenligne din fettprosent med andre brukere.
          Målet vårt er å gjøre det enkelt å følge med på din
          kroppssammensetning over tid.
        </p>

        <h2>Hvordan fungerer det?</h2>
        <p>
          Vår kalkulator bruker en BMI-basert formel som tar hensyn til kjønn,
          alder, vekt og høyde for å estimere fettprosent. Selv om dette ikke er
          like nøyaktig som profesjonelle målemetoder, gir det en god indikasjon
          på utviklingen over tid.
        </p>

        <h2>Personvern</h2>
        <p>
          Vi tar personvern på alvor. Dine data lagres sikkert, og vi deler
          aldri personlig informasjon med tredjeparter. På leaderboardet vises
          kun brukernavn (første del av e-postadressen) og fettprosent.
        </p>

        <h2>Kontakt</h2>
        <p>
          Har du spørsmål eller tilbakemeldinger? Ta gjerne kontakt med oss!
        </p>
      </div>
    </div>
  );
}
