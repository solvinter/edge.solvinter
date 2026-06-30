import { researchData } from "../generated/research-data";

export const metadata = {
  title: "Docs | Solvinter Edge",
  description: "Source material and research fragments for Solvinter Edge.",
};

export default function DocsPage() {
  return (
    <main className="document-page">
      <header className="document-page__header">
        <a href="../" className="document-page__back">Solvinter Edge</a>
        <p className="panel-eyebrow">Source material</p>
        <h1>Docs</h1>
        <p>
          Research material lives here as source fragments. Rendered pages and
          whitepapers should point back to these documents as their source of truth.
        </p>
      </header>

      <section className="document-grid">
        {researchData.fields.map((field) => (
          <article key={field.id} className="document-card">
            <p className="panel-eyebrow">{field.id}</p>
            <h2>{field.title}</h2>
            <p>{field.summary}</p>
            <div className="document-card__parts">
              {(field.parts.length ? field.parts : researchData.parts).map((part) => (
                <span key={`${field.id}-${part.id ?? part}`}>{part.id ?? part}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
