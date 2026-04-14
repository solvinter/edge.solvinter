const nodes = [
  {
    name: "Mumford",
    stage: "Experimentell community-nod",
    description:
      "Första platsen för att testa bygglogik, social rytm, ventilation, solskorsten och hur en nod känns i verkligheten.",
    stats: ["Prototyp", "Låg kostnad", "Lärlingar"],
  },
  {
    name: "Apam",
    stage: "Första proof-of-concept-noden",
    description:
      "Här testas den ekonomiska modellen: sval stilla inomhusmiljö, gaming, arbetszoner och fri access utanför.",
    stats: ["Proof of concept", "Betald insida", "Fri utsida"],
  },
  {
    name: "Winneba",
    stage: "Skalbar studentnod",
    description:
      "Nästa steg för att visa hur modellen fungerar i en starkare nod nära campus med högre flöde och tydligare drift.",
    stats: ["Studenter", "Högre kapacitet", "Träning"],
  },
  {
    name: "Cape Coast / Accra",
    stage: "Utbyggnad och förfining",
    description:
      "Större noder med samma DNA: stillhet, luft, ljus, data, laddning och tydliga sociala zoner.",
    stats: ["Skalning", "Stadsmiljö", "Referensprojekt"],
  },
];

const principles = [
  {
    title: "Svalka utan överdriven mekanik",
    text: "Passiv ventilation, solskorsten, skuggning, höjd, luftflöde och material som fungerar i klimatet.",
  },
  {
    title: "Öppen utsida, förfinad insida",
    text: "Utanför finns laddning och internet. Inuti finns en stilla, enkel och betald miljö för fokus, arbete och spel.",
  },
  {
    title: "Byggt för lärlingar",
    text: "Murare, elektriker, snickare och lärlingar växer in i roller. Noden är också en plats för att träna nästa byggare.",
  },
  {
    title: "Estetik genom funktion",
    text: "Ljusbrunnar, sluttande tak, ljusbruna material, teak, aluminium och en form som känns lugn snarare än spektakulär.",
  },
];

const gallery = [
  {
    label: "Fotografier från platsen",
    note: "Lägg in bilder från Mumford, marken, hantverkarna och klimatet här.",
  },
  {
    label: "Handritade skisser",
    note: "Visa sektioner, torn, nivåskillnader, zoner och materialidéer.",
  },
  {
    label: "Byggprocess",
    note: "Dokumentera fundament, väggar, tak, torn, el och första drift.",
  },
  {
    label: "Nod i användning",
    note: "Visa människor som laddar mobiler utanför, arbetar inne och samlas kring gaming på kvällen.",
  },
];

export default function Page() {
  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero__glow hero__glow--left" />
        <div className="hero__glow hero__glow--right" />
        <div className="container hero__grid">
          <div>
            <p className="eyebrow">Solvinter / Edge</p>
            <h1>Lokala noder för svalka, data, laddning och stillhet.</h1>
            <p className="lead">
              En arkitektur för Ghana byggd kring luft, ljus, hantverk och digital
              infrastruktur. Gratis access utanför. Förfinad, stilla och fokuserad miljö inuti.
            </p>
            <div className="hero__actions">
              <a href="#gallery" className="button button--solid">
                Bygg visuellt
              </a>
              <a href="#nodes" className="button button--ghost">
                Se noderna
              </a>
            </div>
          </div>

          <div className="hero__cards">
            <article className="media-card">
              <div className="media-card__frame" />
              <p className="media-card__title">Fotografi</p>
              <p className="media-card__copy">Plats, klimat, material, människor.</p>
            </article>
            <article className="media-card">
              <div className="media-card__frame media-card__frame--warm" />
              <p className="media-card__title">Skiss</p>
              <p className="media-card__copy">Nivåskillnader, torn, zoner och luftflöde.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section container" id="gallery">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Visuell byggyta</p>
            <h2>Bygg webbplatsen med fotografier och skisser</h2>
          </div>
          <p>
            Den här sidan är upplagd för att du ska kunna ersätta platshållare med riktiga bilder,
            handritade sektioner och dokumentation från varje nod.
          </p>
        </div>

        <div className="gallery-grid">
          {gallery.map((item) => (
            <article key={item.label} className="panel panel--soft">
              <div className="placeholder placeholder--portrait" />
              <h3>{item.label}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--contrast">
        <div className="container split-grid">
          <div>
            <p className="eyebrow">Arkitektoniska principer</p>
            <h2>En märkligt enkel byggnad med tydlig funktion</h2>
            <div className="principles-list">
              {principles.map((item) => (
                <article key={item.title} className="panel">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="panel panel--diagram">
            <div className="placeholder placeholder--square" />
            <h3>Sektion för en första nod</h3>
            <p>
              Låg zon för egen telefon och bänkar. Mellanzon för skärmar och server. Högre zon nära
              tornet för gaming, där människor och maskiner driver luftflödet uppåt.
            </p>
          </aside>
        </div>
      </section>

      <section className="section container" id="nodes">
        <p className="eyebrow">Nodkarta</p>
        <h2>En kedja av noder</h2>

        <div className="nodes-grid">
          {nodes.map((node) => (
            <article key={node.name} className="panel panel--node">
              <div className="node-head">
                <div>
                  <h3>{node.name}</h3>
                  <p className="muted">{node.stage}</p>
                </div>
                <div className="tag-row">
                  {node.stats.map((stat) => (
                    <span key={stat} className="tag">
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
              <p>{node.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split-grid">
          <div>
            <p className="eyebrow eyebrow--dark">Drift och kultur</p>
            <h2>Byggt av människor som lär upp nästa</h2>
            <p className="section-copy">
              Noderna är inte bara byggnader. De är träningsplatser för murare, elektriker,
              snickare, lärlingar, operatörer och framtida byggare av lokal energi- och
              datainfrastruktur.
            </p>
          </div>

          <aside className="panel panel--dark">
            <h3>Nästa steg</h3>
            <ul className="steps">
              <li>Lägg in dina första fotografier från platsen.</li>
              <li>Lägg in handritade skisser på nivåer, torn och tak.</li>
              <li>Bestäm om detta ska ligga under solvinter.com/edge eller solvinter.com/nodes.</li>
              <li>Utveckla sidan gradvis som ett visuellt arbetsrum, inte bara en publik hemsida.</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
