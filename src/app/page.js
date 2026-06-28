"use client";

import { useState } from "react";

const links = {
  repo: "https://github.com/solvinter/edge.solvinter",
  docs: "https://github.com/solvinter/edge.solvinter/tree/main/docs",
  whitepaper:
    "https://github.com/solvinter/edge.solvinter/blob/main/docs/finance/five-year-plan.md",
  accra:
    "https://github.com/solvinter/edge.solvinter/blob/main/docs/operations/accra-node-01-room.md",
  budget:
    "https://github.com/solvinter/edge.solvinter/blob/main/docs/finance/year-01-build-budget.md",
  finance:
    "https://github.com/solvinter/edge.solvinter/tree/main/docs/finance",
  career:
    "https://github.com/solvinter/edge.solvinter/blob/main/career/master.md",
};

const systems = {
  solvinter: {
    label: "SOLVINTER SYSTEM",
    nodes: [
      { id: "accra", name: "Accra / Node 0.1", status: "active", orbit: 1, href: links.accra },
      { id: "mumford", name: "Mumford", status: "planned", orbit: 2, href: links.docs },
      { id: "apam", name: "Apam", status: "planned", orbit: 3, href: links.docs },
      { id: "winneba", name: "Winneba", status: "planned", orbit: 4, href: links.docs },
      { id: "cape-coast", name: "Cape Coast", status: "planned", orbit: 5, href: links.docs },
    ],
  },
  volta: {
    label: "VOLTA SECTOR",
    nodes: [
      { id: "ho", name: "Ho", status: "possible", orbit: 1, href: links.docs },
      { id: "hohoe", name: "Hohoe", status: "possible", orbit: 2, href: links.docs },
      { id: "kpando", name: "Kpando", status: "possible", orbit: 3, href: links.docs },
      { id: "keta", name: "Keta", status: "possible", orbit: 4, href: links.docs },
    ],
  },
  ashanti: {
    label: "ASHANTI NETWORK",
    nodes: [
      { id: "kumasi", name: "Kumasi", status: "possible", orbit: 1, href: links.docs },
      { id: "obuasi", name: "Obuasi", status: "possible", orbit: 2, href: links.docs },
      { id: "sunyani", name: "Sunyani", status: "possible", orbit: 3, href: links.docs },
    ],
  },
};

export default function Page() {
  const [system, setSystem] = useState("solvinter");
  const [selected, setSelected] = useState(null);

  const current = systems[system];

  return (
    <main className={`space-shell space-shell--${system}`}>
      <div className="stars stars--far" />
      <div className="stars stars--mid" />
      <div className="stars stars--near" />

      <nav className="minimal-nav" aria-label="Solvinter navigation">
        <button onClick={() => { setSystem("solvinter"); setSelected(null); }}>
          SOLVINTER
        </button>

        <a href={links.whitepaper} target="_blank" rel="noreferrer">whitepaper</a>
        <a href={links.repo} target="_blank" rel="noreferrer">docs</a>

        <button onClick={() => { setSystem("solvinter"); setSelected(null); }}>
          atlas
        </button>

        <button onClick={() => { setSystem("volta"); setSelected(null); }}>
          stars
        </button>
      </nav>

      <section className="orbital-stage" aria-label={current.label}>
        <p className="system-label">{current.label}</p>

        <div className="solvinter-sun" aria-hidden="true">
          <div className="sun-core" />
          <div className="sun-ring">SOLVINTER</div>
        </div>

        {current.nodes.map((node) => (
          <button
            key={node.id}
            className={`planet planet--${node.status} planet--orbit-${node.orbit}`}
            onClick={() => setSelected(node)}
            aria-label={`${node.name}, ${node.status}`}
          >
            <span className="planet-dot" />
            <span className="planet-label">{node.name}</span>
          </button>
        ))}

        <button className="jump jump--volta" onClick={() => { setSystem("volta"); setSelected(null); }}>
          Volta Sector
        </button>

        <button className="jump jump--ashanti" onClick={() => { setSystem("ashanti"); setSelected(null); }}>
          Ashanti Network
        </button>
      </section>

      {selected && (
        <aside className="node-drawer">
          <button onClick={() => setSelected(null)}>close</button>
          <p>{selected.status}</p>
          <h2>{selected.name}</h2>
          <a href={selected.href} target="_blank" rel="noreferrer">open node file</a>
          {selected.id === "accra" && (
            <>
              <a href={links.budget} target="_blank" rel="noreferrer">build budget</a>
              <a href={links.finance} target="_blank" rel="noreferrer">finance docs</a>
            </>
          )}
        </aside>
      )}
    </main>
  );
}
