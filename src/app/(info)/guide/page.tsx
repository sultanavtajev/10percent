"use client";

export default function Komponent() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 pt-24">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
            Forbedre helsen din med 10percent
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Oppdag hvordan vår app kan hjelpe deg med å måle og forstå
            kroppssammensetning og fettprosent.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <UploadIcon className="flex-shrink-0 w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">
                  Steg 1: Registrer målingene dine
                </h3>
                <p className="text-muted-foreground">
                  Start med å registrere alder, høyde, vekt og hudfoldmålinger
                  for en nøyaktig beregning.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ScanIcon className="flex-shrink-0 w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">
                  Steg 2: Kalkuler fettprosent
                </h3>
                <p className="text-muted-foreground">
                  Vår kalkulator bruker avanserte formler for å beregne
                  fettprosent basert på målingene dine.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <DownloadIcon className="flex-shrink-0 w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">
                  Steg 3: Spor fremgangen din
                </h3>
                <p className="text-muted-foreground">
                  Lagre og se historikk over målingene dine for å følge fremgang
                  mot dine mål.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FlagIcon className="flex-shrink-0 w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">
                  Hvorfor velge 10percent?
                </h3>
                <p className="text-muted-foreground">Appen gir deg:</p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary" />
                    Nøyaktige og enkle kalkulasjoner for fettprosent
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary" />
                    Mulighet til å sette og spore mål for fettprosent og vekt
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-primary" />
                    Oversiktlig historikk over målingene dine
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckIcon className="flex-shrink-0 w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">
                  Bygget for nøyaktighet
                </h3>
                <p className="text-muted-foreground">
                  Beregningene baseres på vitenskapelige formler og gir deg
                  pålitelige resultater for bedre helseforståelse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function FlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function ScanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    </svg>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
