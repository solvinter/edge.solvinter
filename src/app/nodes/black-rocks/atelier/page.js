const atelierImages = [
  "/images/atelier/EIXR4459.JPG",
  "/images/atelier/MZWZ3036.JPG",
  "/images/atelier/PLDF3567.JPG",
  "/images/atelier/WMSA0536.JPG",
];

export default function AtelierPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <section className="mx-auto max-w-5xl space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Black Rocks
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Atelier</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Atelier är en separat byggnad på Black Rocks — en plats för arbete,
            bilder, material, skisser och långsam produktion.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {atelierImages.map((src) => (
            <img
              key={src}
              src={src}
              alt="Atelier at Black Rocks"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
