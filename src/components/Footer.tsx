import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            <p>&copy; 2024 10percent.no. Alle rettigheter reservert.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              Om oss
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
