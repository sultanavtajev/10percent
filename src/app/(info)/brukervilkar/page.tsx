"use client";

export default function Komponent() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 md:py-16 lg:py-24">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Vilkår og betingelser
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Ved å bruke 10percent godtar du følgende vilkår og betingelser.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">Datasikkerhet</h2>
            <p className="mt-2 text-muted-foreground">
              Vi tar ditt personvern på alvor. All brukerdata, inkludert
              registrert fettprosent, personlige mål og profilinformasjon,
              lagres sikkert i vår database. Vi deler aldri data med
              tredjeparter uten ditt uttrykkelige samtykke. Du har rett til å få
              innsyn i, endre eller slette dine data når som helst.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Brukerinnhold og ansvar</h2>
            <p className="mt-2 text-muted-foreground">
              Du samtykker til at all informasjon du registrerer i 10percent er
              sannferdig og korrekt. Innhold som er misvisende, uriktig eller i
              strid med gjeldende lover og forskrifter kan bli fjernet uten
              forvarsel. 10percent forbeholder seg retten til å avslutte eller
              begrense tilgangen for brukere som bryter disse reglene.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Åndsverk</h2>
            <p className="mt-2 text-muted-foreground">
              Alt innhold og materiale knyttet til 10percent – inkludert design,
              kode, databaser og merkevare – tilhører 10percent. Du får en
              begrenset, ikke-eksklusiv rett til å bruke appen til personlig
              bruk. Uautorisert kopiering eller kommersiell utnyttelse er ikke
              tillatt.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Ansvarsbegrensninger</h2>
            <p className="mt-2 text-muted-foreground">
              10percent gir ingen garantier for nøyaktigheten av beregnet
              fettprosent eller andre helserelaterte data i appen. Vi fraskriver
              oss alt ansvar for eventuelle skader eller tap som følge av bruk
              av appen. Vårt totale ansvar er begrenset til eventuelle beløp du
              har betalt for appen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
