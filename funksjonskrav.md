🧾 Kravspesifikasjon – 10percent
1. Formål
10percent.no skal være en brukervennlig webplattform som lar brukere registrere og sammenligne fettprosent ved hjelp av en kalkulator. Brukere skal kunne logge inn, legge til egne målinger, og se hvordan de ligger an i forhold til andre.

2. Teknisk Stack
Frontend: Next.js
Backend: Supabase
Database: Supabase (PostgreSQL)
Autentisering: Supabase Auth
UI-bibliotek: Shadcn
Deploy: Vercel

3. Funksjonelle krav
3.1 Brukerautentisering
Brukere skal kunne registrere seg med e-post og passord.

Brukere skal kunne logge inn og logge ut.

Kun innloggede brukere kan legge til registreringer og se andres data.

3.2 Registrering av fettprosent
Brukeren skal kunne fylle ut en kalkulator som estimerer fettprosent basert på relevante felter (eks. høyde, vekt, kjønn, alder, målinger).

Resultatet skal lagres i databasen sammen med tidspunkt og bruker-ID.

Brukeren skal kunne se sin egen historikk.

3.3 Hovedside for sammenligning
En "Leaderboard"-visning skal vise totalt de 20 siste registreringene fra alle brukere.
Mulighet for å sortere etter høyeste/laveste fettprosent eller dato.

4. Ikke-funksjonelle krav
Brukervennlighet: UI skal være responsivt og moderne, bygget med Shadcn UI og Tailwind
Sikkerhet: Autentisering og database-tilgang håndteres via Supabase
Skalerbarhet: Tjenesten skal kunne håndtere vekst i antall brukere og registreringer
Ytelse: Lastetid på < 1 sekund for hovedsiden
Tilgjengelighet: Tjenesten skal fungere på desktop og mobil

5. Datamodell (Supabase)
Tabell: users
id (UUID, PK)
email (tekst)
created_at (timestamp)

Tabell: measurements
id (UUID, PK)
user_id (UUID, FK → users.id)
body_fat_percentage (float)
method (tekst, f.eks. "kalkulator")
created_at (timestamp)

6. Oversikt over sider
├── Home ("/")
│   ├── Header (NavBar)
│   ├── Tittel: "Siste registreringer"
│   ├── Liste over andres siste registreringer
│   │   ├── Brukernavn
│   │   ├── Fettprosent
│   │   └── Dato
│   ├── Sorteringsvalg (fettprosent, dato)
│   └── Footer

/login
├── Header (NavBar)
├── Tittel: "Logg inn"
├── E-postfelt
├── Passordfelt
├── Logg inn-knapp
├── Link til "Registrer"
└── Footer

/register
├── Header (NavBar)
├── Tittel: "Registrer deg"
├── E-postfelt
├── Passordfelt
├── Registrer-knapp
├── Link til "Logg inn"
└── Footer

/add
├── Header (NavBar)
├── Tittel: "Legg til ny registrering"
├── Kalkulator-komponent
│   ├── Felt: Kjønn
│   ├── Felt: Alder
│   ├── Felt: Vekt, høyde
│   ├── Eventuelle målepunkter (valgfritt)
│   ├── Kalkuler-knapp
│   └── Resultat vises
├── Lagre-knapp
└── Footer

/profile
├── Header (NavBar)
├── Tittel: "Min profil"
├── Brukerinfo (navn / e-post)
├── Historisk graf over fettprosent (valgfritt)
├── Liste over tidligere registreringer
│   ├── Fettprosent
│   ├── Dato
│   └── Mulighet for slett/rediger (senere)
└── Footer

/about (valgfritt)
├── Header (NavBar)
├── Tittel: "Om Rønn.no"
├── Tekst: Hensikt, hvem som laget det, kanskje et bilde eller inside joke
└── Footer

7. Oversikt over mappestruktur og komponenter
/app
├── layout.jsx                → Felles layout (NavBar, Footer)
├── page.jsx                  → Home (/)
│
├── login/
│   └── page.jsx              → /login
│
├── register/
│   └── page.jsx              → /register
│
├── add/
│   └── page.jsx              → /add
│
├── profile/
│   └── page.jsx              → /profile
│
├── about/
│   └── page.jsx              → /about (valgfritt)
│
/components
├── Navbar.jsx                → Navigasjonsmeny
├── Footer.jsx                → Footer
├── FatPercentageForm.jsx     → Kalkulator-komponent for /add
├── LeaderboardList.jsx       → Viser siste registreringer på /
├── HistoryList.jsx           → Viser brukerens tidligere registreringer
├── ProtectedRoute.jsx        → Wrapper for å beskytte sider (hvis du bruker client-side auth)
│
/lib
├── supabaseClient.js         → Initierer Supabase
├── auth.js                   → Hjelpefunksjoner for login/logout/user