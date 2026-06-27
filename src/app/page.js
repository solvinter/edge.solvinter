"use client";

import { useState } from "react";

const systems = {
  solvinter: {
    label: "SOLVINTER SYSTEM",
    nodes: [
      { id: "accra", name: "Accra", status: "active", orbit: 1 },
      { id: "mumford", name: "Mumford", status: "planned", orbit: 2 },
      { id: "apam", name: "Apam", status: "planned", orbit: 3 },
      { id: "winneba", name: "Winneba", status: "planned", orbit: 4 },
      { id: "cape-coast", name: "Cape Coast", status: "planned", orbit: 5 },
    ],
  },
  volta: {
    label: "VOLTA SECTOR",
    nodes: [
      { id: "ho", name: "Ho", status: "possible", orbit: 1 },
      { id: "hohoe", name: "Hohoe", status: "possible", orbit: 2 },
      { id: "kpando", name: "Kpando", status: "possible", orbit: 3 },
      { id: "keta", name: "Keta", status: "possible", orbit: 4 },
    ],
  },
  ashanti: {
    label: "ASHANTI NETWORK",
    nodes: [
      { id: "kumasi", name: "Kumasi", status: "possible", orbit: 1 },
      { id: "obuasi", name: "Obuasi", status: "possible", orbit: 2 },
      { id: "sunyani", name: "Sunyani", status: "possible", orbit: 3 },
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
        <a href="https://github.com/solvinter/edge.solvinter/blob/main/docs/finance/five-year-plan.md">
          whitepaper
        </a>
        <a href="https://github.com/solvinter/edge.solvinter">
          docs
        </a>
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
          <a href="https://github.com/solvinter/edge.solvinter/tree/main/docs">
            open documentation
          </a>
        </aside>
      )}
    </main>
  );
}
