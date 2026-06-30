export const metadata = {
  title: "Accra Node 0.1 | Solvinter Edge",
  description: "First operational workspace and economic starting point for Solvinter Edge.",
};

export default function AccraNodePage() {
  return (
    <main className="document-page">
      <header className="document-page__header">
        <a href="../../" className="document-page__back">Solvinter Edge</a>
        <p className="panel-eyebrow">Active node</p>
        <h1>Accra / Node 0.1</h1>
        <p>
          First operational workspace and economic starting point. The first year
          goal is two workstations for human digital work, training through practice
          and documentation before replication.
        </p>
      </header>

      <section className="document-grid">
        <article className="document-card document-card--featured">
          <p className="panel-eyebrow">Economic engine</p>
          <h2>Cow Lane / Accra</h2>
          <p>
            Remote tasks, AI-assisted work, data annotation, support, research and
            similar services are the immediate focus. Peripheral nodes remain
            observation points until local demand is understood.
          </p>
          <div className="document-card__parts">
            <span>2 workstations</span>
            <span>human digital work</span>
            <span>documentation first</span>
          </div>
          <a href="../../whitepaper/ai-operations/" className="document-link">Open AI Operations</a>
        </article>
      </section>
    </main>
  );
}
