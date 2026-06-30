import { researchData } from "../generated/research-data";

export const metadata = {
  title: "Whitepaper | Solvinter Edge",
  description: "Rendered Solvinter Edge whitepapers generated from docs.",
};

export default function WhitepaperPage() {
  const aiOperations = researchData.fields.find((field) => field.id === "ai-operations");

  return (
    <main className="document-page">
      <header className="document-page__header">
        <a href="../" className="document-page__back">Solvinter Edge</a>
        <p className="panel-eyebrow">Rendered publication</p>
        <h1>Whitepaper</h1>
        <p>
          Whitepapers are generated views. The original source material remains
          in docs as structured research fragments.
        </p>
      </header>

      <section className="document-grid">
        <article className="document-card document-card--featured">
          <p className="panel-eyebrow">generated from docs/ai-operations</p>
          <h2>{aiOperations?.title ?? "AI Operations"}</h2>
          <p>{aiOperations?.summary}</p>
          <a href="./ai-operations/" className="document-link">Open AI Operations</a>
        </article>
      </section>
    </main>
  );
}
