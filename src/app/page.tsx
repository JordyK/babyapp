export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-display text-neutral-900 mb-4">
          Baby Planning Platform
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          A modern platform that helps expecting parents create personalized baby essentials checklists.
        </p>
        <div className="bg-white rounded-2xl shadow-soft p-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-neutral-600">
            We're building a calm, trustworthy, and premium experience to help you prepare for your journey into parenthood.
          </p>
        </div>
      </div>
    </main>
  );
}
