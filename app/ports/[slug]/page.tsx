import { notFound } from "next/navigation";
import fs from "fs-extra";
import path from "path";
import Link from "next/link";

interface Tour {
  pk: number;
  headline: string;
  short_description: string;
  price_range: string;
  duration_minutes: number;
  categories: string[];
}

async function getTours(slug: string): Promise<Tour[]> {
  const filePath = path.join(process.cwd(), "public", "data", "tours", `${slug}.json`);
  try {
    if (!fs.existsSync(filePath)) return [];
    return await fs.readJSON(filePath);
  } catch (error) {
    return [];
  }
}

export default async function PortPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tours = await getTours(slug);
  const portName = slug.charAt(0).toUpperCase() + slug.slice(1);

  if (!tours || tours.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{portName}</h1>
        <p className="text-lg text-gray-600">No tours found.</p>
        <Link href="/" className="mt-6 text-blue-600 hover:underline">← Back Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link href="/" className="text-gray-500 hover:text-blue-600 transition">← Back</Link>
                <h1 className="text-2xl font-bold text-gray-900">{portName} Excursions</h1>
            </div>
            <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                {tours.length} Active Tours
            </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <article key={tour.pk} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{tour.headline}</h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{tour.short_description}</p>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <p className="text-lg font-bold text-gray-900">{tour.price_range}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">View Details</button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
