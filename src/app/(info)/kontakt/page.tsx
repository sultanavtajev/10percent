"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function KontaktOss() {
  return (
    <div>
      <div className="w-full max-w-4xl mx-auto py-12 md:py-16 px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Kontakt oss – 10percent
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Har du spørsmål om appen, dataene dine eller tjenestene vi tilbyr?
            Kontakt oss gjerne!
          </p>
        </div>
        <form className="mt-10 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Navn</Label>
              <Input id="name" placeholder="Skriv inn ditt navn" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                type="email"
                placeholder="Skriv inn din e-postadresse"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Melding</Label>
            <Textarea
              id="message"
              placeholder="Skriv inn din melding"
              className="min-h-[120px]"
            />
          </div>
          <Button type="submit" className="w-full">
            Send melding
          </Button>
        </form>
      </div>
    </div>
  );
}
