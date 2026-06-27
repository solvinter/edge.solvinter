"use client";

import { useEffect, useState } from "react";

const languages = [
  { code: "sv", short: "SV", label: "Svenska", flag: "🇸🇪" },
  { code: "en", short: "EN", label: "English", flag: "🇬🇧" },
];

const content = {
  sv: {
    nav: {
      atlas: "Atlas",
      network: "Noder",
      docs: "Dokumentation",
    },
    hero: {
      eyebrow: "Solvinter Edge / Accra först",
      title: "Accra Node 0.1 är den ekonomiska startpunkten.",
      copy: "Atlaset börjar i Accra: två arbetsstationer för mänskligt digitalt arbete under första året. Kustnoderna finns kvar som framtida observationspunkter, men den omedelbara ekonomiska motorn är människor som utför remote tasks, AI-assisterat arbete, data annotation, support, research och liknande tjänster.",
      primaryAction: "Se Node 0.1",
      secondaryAction: "Öppna dokumentation",
    },
    metrics: [
      { value: "0.1", label: "första operativa noden i Accra" },
      { value: "02", label: "arbetsstationer under år ett" },
      { value: "04", label: "framtida kustnoder under observation" },
    ],
    atlas: {
      label: "Ekonomiskt observatorium",
      title: "Accra först, kustnoder senare",
      instruction: "Välj en nod för att se om den är ekonomisk motor eller framtida observationspunkt.",
      selectedLabel: "Vald nod",
      phaseLabel: "Fas",
      evidenceLabel: "Dokumentation som ska samlas",
      factsLabel: "Fakta",
    },
    nodes: [
      {
        id: "accra",
        role: "primary",
        name: "Accra / Node 0.1",
        code: "0.1",
        x: 76,
        y: 58,
        phase: "Första operativa workspace och ekonomisk startpunkt",
        status:
          "Accra är projektets första ekonomiska motor: två arbetsstationer för personer som arbetar via Upwork-liknande plattformar och liknande digitala arbetsflöden.",
        evidence:
          "Logg över arbetsstationer, uppdragstyper, intäkter, träning genom praktik, utrustning, uppkoppling, arbetsrutiner och dokumentation först.",
        facts: [
          "Economic engine",
          "2 arbetsstationer",
          "Human digital work",
          "Upwork-liknande plattformar",
          "Training through practice",
          "Documentation first",
        ],
      },
      {
        id: "mumford",
        role: "future",
        name: "Mumford",
        code: "MFD",
        x: 18,
        y: 72,
        phase: "Future node / observation",
        status:
          "Mumford ligger kvar i atlaset som framtida kustnod. Lokal efterfrågan är okänd och ska observeras innan någon intäktsmodell antas.",
        evidence:
          "Platsfoto, social rytm, klimat, byggbarhet, laddningsbehov, svalka, lokal lärandepotential och eventuell framtida compute-roll.",
        facts: ["Future node", "Observation", "Local demand unknown", "Cooling", "Charging", "Learning"],
      },
      {
        id: "apam",
        role: "future",
        name: "Apam",
        code: "APM",
        x: 36,
        y: 61,
        phase: "Future node / observation",
        status:
          "Apam är en sekundär nod för observation. Ingen intäktsmodell antas ännu.",
        evidence:
          "Lokala flöden, laddning, internetbehov, temperatur, möjliga arbetsmönster och om compute eller svalka blir relevant senare.",
        facts: ["Future node", "Observation", "Local demand unknown", "Possible compute", "Cooling", "Charging"],
      },
      {
        id: "winneba",
        role: "future",
        name: "Winneba",
        code: "WNB",
        x: 53,
        y: 47,
        phase: "Future node / learning context",
        status:
          "Winneba kan senare bli relevant för lärande och kapacitet nära studentflöden, men ekonomin startar inte här.",
        evidence:
          "Studentflöden, träningsformat, laddningsmönster, lokala tjänstebehov och om en framtida nod bör stödja arbete, compute eller kylning.",
        facts: ["Future node", "Observation", "Learning", "Local demand unknown", "Compute later"],
      },
      {
        id: "cape-coast",
        role: "future",
        name: "Cape Coast",
        code: "CCT",
        x: 64,
        y: 33,
        phase: "Future coastal reference node",
        status:
          "Cape Coast är en framtida referenspunkt i atlaset. Rollen kan bli svalka, laddning, compute eller lärande, men först efter observation.",
        evidence:
          "Kustläge, lokala arbetsflöden, publik laddning, värme, uppkoppling, möjliga partnerskap och dokumenterade behov.",
        facts: ["Future node", "Observation", "Cooling later", "Charging later", "Learning"],
      },
    ],
    principles: {
      eyebrow: "Ekonomisk logik",
      title: "Intäkterna börjar med mänskligt digitalt arbete i Accra.",
      items: [
        {
          label: "Node 0.1",
          title: "Accra som motor",
          text: "Första året mäter två arbetsstationer om människor kan tjäna pengar på remote tasks, AI-assisterat arbete, data annotation, support och research.",
        },
        {
          label: "Praktik",
          title: "Träning genom arbete",
          text: "Utbildningen sker genom verkliga uppgifter, dokumenterade rutiner och stegvis högre kvalitet i leveranserna.",
        },
        {
          label: "Kustnoder",
          title: "Observation före intäkter",
          text: "Mumford, Apam, Winneba och Cape Coast är framtida noder. Lokal efterfrågan, compute, laddning och svalka kan bli viktiga senare.",
        },
        {
          label: "Dokumentation",
          title: "Öppen loggbok först",
          text: "Projektet ska visa vad som faktiskt händer: arbete, uppdrag, utrustning, träning, kostnader och lärdomar innan skala.",
        },
      ],
    },
    docs: {
      eyebrow: "Dokumentation först",
      title: "Node 0.1 behöver en operativ loggbok innan nätverket skalas.",
      copy:
        "Dokumentationen ska börja i Accra och göra arbetsstationerna läsbara: vilka uppgifter som utförs, hur träningen sker, vilken utrustning som krävs och vad som lärs innan kustnoderna byggs ut.",
      items: [
        {
          title: "Accra workspace logg",
          status: "Node 0.1",
          text: "Två arbetsstationer, schema, uppkoppling, utrustning, arbetsmiljö och daglig drift.",
        },
        {
          title: "Digitalt arbete",
          status: "År ett",
          text: "Remote tasks, AI-assisterat arbete, data annotation, support, research och andra Upwork-liknande tjänster.",
        },
        {
          title: "Träning genom praktik",
          status: "Pågående",
          text: "Uppgifter dokumenteras så nya personer kan lära sig kvalitet, tempo, verktyg och kundkommunikation.",
        },
        {
          title: "Future node-observation",
          status: "Sekundärt",
          text: "Mumford, Apam, Winneba och Cape Coast följs för lokal efterfrågan, svalka, laddning, compute och lärande.",
        },
      ],
    },
  },
  en: {
    nav: {
      atlas: "Atlas",
      network: "Nodes",
      docs: "Documentation",
    },
    hero: {
      eyebrow: "Solvinter Edge / Accra first",
      title: "Accra Node 0.1 is the economic starting point.",
      copy: "The atlas begins in Accra: two workstations for human digital work during the first year. The coastal nodes remain as future observation points, but the immediate economic engine is people doing remote tasks, AI-assisted work, data annotation, support, research and similar services.",
      primaryAction: "View Node 0.1",
      secondaryAction: "Open documentation",
    },
    metrics: [
      { value: "0.1", label: "first operational node in Accra" },
      { value: "02", label: "workstations in year one" },
      { value: "04", label: "future coastal nodes under observation" },
    ],
    atlas: {
      label: "Economic observatory",
      title: "Accra first, coastal nodes later",
      instruction: "Select a node to see whether it is the economic engine or a future observation point.",
      selectedLabel: "Selected node",
      phaseLabel: "Phase",
      evidenceLabel: "Evidence to collect",
      factsLabel: "Facts",
    },
    nodes: [
      {
        id: "accra",
        role: "primary",
        name: "Accra / Node 0.1",
        code: "0.1",
        x: 76,
        y: 58,
        phase: "First operational workspace and economic starting point",
        status:
          "Accra is the project's first economic engine: two workstations for people working through Upwork-like platforms and similar digital workflows.",
        evidence:
          "Logs for workstations, task types, revenue, training through practice, equipment, connectivity, work routines and documentation first.",
        facts: [
          "Economic engine",
          "2 workstations",
          "Human digital work",
          "Upwork-like platforms",
          "Training through practice",
          "Documentation first",
        ],
      },
      {
        id: "mumford",
        role: "future",
        name: "Mumford",
        code: "MFD",
        x: 18,
        y: 72,
        phase: "Future node / observation",
        status:
          "Mumford remains in the atlas as a future coastal node. Local demand is unknown and should be observed before any revenue model is assumed.",
        evidence:
          "Site photography, social rhythm, climate, buildability, charging needs, cooling, local learning potential and any future compute role.",
        facts: ["Future node", "Observation", "Local demand unknown", "Cooling", "Charging", "Learning"],
      },
      {
        id: "apam",
        role: "future",
        name: "Apam",
        code: "APM",
        x: 36,
        y: 61,
        phase: "Future node / observation",
        status:
          "Apam is a secondary observation node. No revenue model is assumed yet.",
        evidence:
          "Local flows, charging, internet needs, temperature, possible work patterns and whether compute or cooling becomes relevant later.",
        facts: ["Future node", "Observation", "Local demand unknown", "Possible compute", "Cooling", "Charging"],
      },
      {
        id: "winneba",
        role: "future",
        name: "Winneba",
        code: "WNB",
        x: 53,
        y: 47,
        phase: "Future node / learning context",
        status:
          "Winneba may later become relevant for learning and capacity near student flows, but the economic start is not here.",
        evidence:
          "Student flows, training formats, charging patterns, local service needs and whether a future node should support work, compute or cooling.",
        facts: ["Future node", "Observation", "Learning", "Local demand unknown", "Compute later"],
      },
      {
        id: "cape-coast",
        role: "future",
        name: "Cape Coast",
        code: "CCT",
        x: 64,
        y: 33,
        phase: "Future coastal reference node",
        status:
          "Cape Coast is a future reference point in the atlas. Its role may become cooling, charging, compute or learning, but only after observation.",
        evidence:
          "Coastal context, local work patterns, public charging, heat, connectivity, possible partnerships and documented demand.",
        facts: ["Future node", "Observation", "Cooling later", "Charging later", "Learning"],
      },
    ],
    principles: {
      eyebrow: "Economic logic",
      title: "Revenue starts with human digital work in Accra.",
      items: [
        {
          label: "Node 0.1",
          title: "Accra as engine",
          text: "In year one, two workstations test whether people can earn through remote tasks, AI-assisted work, data annotation, support and research.",
        },
        {
          label: "Practice",
          title: "Training through work",
          text: "Training happens through real tasks, documented routines and gradually higher quality in delivery.",
        },
        {
          label: "Coastal nodes",
          title: "Observation before revenue",
          text: "Mumford, Apam, Winneba and Cape Coast are future nodes. Local demand, compute, charging and cooling may become important later.",
        },
        {
          label: "Documentation",
          title: "Open logbook first",
          text: "The project should show what actually happens: work, tasks, equipment, training, costs and lessons before scale.",
        },
      ],
    },
    docs: {
      eyebrow: "Documentation first",
      title: "Node 0.1 needs an operating logbook before the network scales.",
      copy:
        "Documentation should begin in Accra and make the workstations legible: which tasks are performed, how training happens, what equipment is required and what is learned before coastal nodes expand.",
      items: [
        {
          title: "Accra workspace log",
          status: "Node 0.1",
          text: "Two workstations, schedule, connectivity, equipment, work environment and daily operations.",
        },
        {
          title: "Digital work",
          status: "Year one",
          text: "Remote tasks, AI-assisted work, data annotation, support, research and other Upwork-like services.",
        },
        {
          title: "Training through practice",
          status: "Ongoing",
          text: "Tasks are documented so new people can learn quality, pace, tools and client communication.",
        },
        {
          title: "Future node observation",
          status: "Secondary",
          text: "Mumford, Apam, Winneba and Cape Coast are observed for local demand, cooling, charging, compute and learning.",
        },
      ],
    },
  },
};

export default function Page() {
  const [language, setLanguage] = useState("sv");
  const [selectedNodeId, setSelectedNodeId] = useState("accra");
  const t = content[language];
  const selectedNode = t.nodes.find((node) => node.id === selectedNodeId) ?? t.nodes[0];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className="site-shell" lang={language}>
      <div className="observatory-background" aria-hidden="true">
        <span className="observatory-background__line" />
        <span className="observatory-background__line observatory-background__line--slow" />
        <span className="observatory-background__glow" />
      </div>

      <header className="site-header container">
        <a href="#atlas" className="brand-mark" aria-label="Solvinter Edge atlas">
          <span className="brand-mark__symbol">SE</span>
          <span>
            <span className="brand-mark__title">Solvinter Edge</span>
            <span className="brand-mark__subtitle">Node 0.1 atlas</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#atlas">{t.nav.atlas}</a>
          <a href="#network">{t.nav.network}</a>
          <a href="#documentation">{t.nav.docs}</a>
        </nav>

        <div className="language-switcher" aria-label="Language selector">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={`language-switcher__button ${
                language === item.code ? "language-switcher__button--active" : ""
              }`}
              onClick={() => setLanguage(item.code)}
              aria-pressed={language === item.code}
              aria-label={`Show site in ${item.label}`}
            >
              <span aria-hidden="true">{item.flag}</span>
              <span>{item.short}</span>
            </button>
          ))}
        </div>
      </header>

      <section className="observatory container" id="atlas">
        <div className="observatory__intro">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="lead">{t.hero.copy}</p>
          <div className="hero__actions">
            <a href="#network" className="button button--solid">
              {t.hero.primaryAction}
            </a>
            <a href="#documentation" className="button button--ghost">
              {t.hero.secondaryAction}
            </a>
          </div>
        </div>

        <div className="metric-strip" aria-label="Network summary">
          {t.metrics.map((metric) => (
            <article key={metric.label} className="metric">
              <span className="metric__value">{metric.value}</span>
              <span className="metric__label">{metric.label}</span>
            </article>
          ))}
        </div>

        <div className="atlas-shell">
          <section className="atlas-panel atlas-panel--map" aria-labelledby="atlas-title">
            <div className="atlas-panel__top">
              <p className="eyebrow">{t.atlas.label}</p>
              <h2 id="atlas-title">{t.atlas.title}</h2>
            </div>

            <div className="atlas-canvas">
              <div className="atlas-grid" aria-hidden="true" />
              <div className="atlas-scan" aria-hidden="true" />
              <svg className="atlas-path" viewBox="0 0 100 100" aria-hidden="true">
                <polyline points="18,72 36,61 53,47 64,33 76,58" />
              </svg>

              {t.nodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  className={`atlas-node atlas-node--${node.role} ${
                    selectedNode.id === node.id ? "atlas-node--active" : ""
                  }`}
                  style={{ "--x": `${node.x}%`, "--y": `${node.y}%` }}
                  onClick={() => setSelectedNodeId(node.id)}
                  aria-pressed={selectedNode.id === node.id}
                >
                  <span className="atlas-node__pulse" aria-hidden="true" />
                  <span className="atlas-node__dot" aria-hidden="true" />
                  <span className="atlas-node__label">{node.name}</span>
                  <span className="atlas-node__code">{node.code}</span>
                </button>
              ))}
            </div>

            <p className="atlas-instruction">{t.atlas.instruction}</p>
          </section>

          <aside className={`atlas-panel atlas-panel--detail atlas-panel--${selectedNode.role}`}>
            <p className="eyebrow">{t.atlas.selectedLabel}</p>
            <h2>{selectedNode.name}</h2>
            <div className="detail-row">
              <span>{t.atlas.phaseLabel}</span>
              <strong>{selectedNode.phase}</strong>
            </div>
            <p>{selectedNode.status}</p>

            <div className="evidence-block">
              <span>{t.atlas.evidenceLabel}</span>
              <p>{selectedNode.evidence}</p>
            </div>

            <div className="tag-row" aria-label={t.atlas.factsLabel}>
              {selectedNode.facts.map((fact) => (
                <span key={fact} className="tag">
                  {fact}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section container" id="network">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.principles.eyebrow}</p>
            <h2>{t.principles.title}</h2>
          </div>
        </div>

        <div className="principle-grid">
          {t.principles.items.map((item) => (
            <article key={item.title} className="principle-card">
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--ledger">
        <div className="container">
          <div className="ledger">
            {t.nodes.map((node, index) => (
              <button
                key={node.id}
                type="button"
                className={`ledger-row ledger-row--${node.role}`}
                onClick={() => setSelectedNodeId(node.id)}
              >
                <span className="ledger-row__index">
                  {node.role === "primary" ? "0.1" : String(index).padStart(2, "0")}
                </span>
                <span className="ledger-row__name">{node.name}</span>
                <span className="ledger-row__phase">{node.phase}</span>
                <span className="ledger-row__code">{node.code}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section container" id="documentation">
        <div className="section-heading section-heading--docs">
          <div>
            <p className="eyebrow">{t.docs.eyebrow}</p>
            <h2>{t.docs.title}</h2>
          </div>
          <p>{t.docs.copy}</p>
        </div>

        <div className="docs-grid">
          {t.docs.items.map((item) => (
            <article key={item.title} className="doc-card">
              <div>
                <span className="doc-card__status">{item.status}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
