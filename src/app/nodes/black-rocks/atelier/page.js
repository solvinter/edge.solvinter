import Image from "next/image";

export default function AtelierPage() {
  return (
    <main>
      <h1>BLACK ROCKS — Atelier</h1>

      <Image
        src="/images/atelier/EIXR4459.JPG"
        alt="Black Rocks Atelier"
        width={1600}
        height={900}
      />

      <p>
        The atelier is the primary workspace at Black Rocks. It is designed for
        art, writing, AI research, documentation and long-term thinking.
      </p>

      <nav>
        <a href="/nodes/black-rocks">← Back to Black Rocks</a>
      </nav>
    </main>
  );
}
