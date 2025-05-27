import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative w-full h-screen">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/10v.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Warm Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <div className="max-w-4xl space-y-8">
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight">
              Spor din <span className="font-medium text-white/">fettprosent</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Beregn, registrer og følg utviklingen av din fettprosent over tid.
              Sammenlign deg med andre og hold motivasjonen oppe.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-amber-50 hover:scale-105 font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-lg"
                >
                  Kom i gang gratis
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border border-white/40 hover:bg-white/15 hover:border-white/60 font-medium px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  Logg inn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
