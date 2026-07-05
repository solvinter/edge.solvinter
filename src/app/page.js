use client";

const cards = [

  ["Nodes", "Infrastructure overview", "▦"],

  ["Terminals", "Access shells & sessions", ">_"],

  ["Documentation", "Guides, instructions & knowledge", "□"],

  ["Sol CLI", "Solvinter command language", ">_"],

  ["AI Assistant", "Ask, automate, accelerate", "✺"],

  ["Projects", "Active work & roadmap", "◇"],

  ["Logs", "System & activity logs", "▤"],

  ["AI Playground", "Models, prompts & experiments", "✣"],

  ["Storage", "Files, backups & data", "◎"],

  ["Network", "Topology & connections", "⌘"],

  ["Education", "Learn, teach, grow", "⌂"],

  ["Tasks", "To-dos & assignments", "☑"],

  ["Monitoring", "Metrics & alerts", "⌁"],

  ["Settings", "Preferences & configuration", "⚙"],

  ["Graffiti", "Ideas, sketches, fragments", "✎"],

];

const nav = [

  "Overview",

  "Nodes",

  "Terminals",

  "Documentation",

  "AI Assistant",

  "Projects",

  "Logs",

  "Storage",

  "Network",

  "Education",

  "Monitoring",

  "Settings",

];

export default function Page() {

  return (

    <main className="solvinter-desktop">

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-symbol">☼</div>

          <div>

            <strong>SOLVINTER EDGE</strong>

            <span>ECONOMIC OBSERVATORY</span>

          </div>

        </div>

        <nav>

          {nav.map((item, index) => (

            <button key={item} className={index === 0 ? "active" : ""}>

              <span>{index === 0 ? "●" : "□"}</span>

              {item}

            </button>

          ))}

        </nav>

        <div className="quote">

          <div />

          <p>“An observatory<br />for the long game.”</p>

          <span>— Solvinter</span>

        </div>

      </aside>

      <section className="topbar">

        <div>

          <span className="dot" /> SYSTEM STATUS <strong>ALL GOOD</strong>

        </div>

        <div className="top-actions">

          <span>Gate</span>

          <span>☼</span>

          <span className="avatar">D</span>

        </div>

      </section>

      <section className="hero">

        <div className="intro">

          <h1>Welcome to<br />Solvinter Edge</h1>

          <p className="small">Cow Lane first, future nodes later.</p>

          <i />

          <p>

            Solvinter Edge is a distributed network of compute, knowledge and

            people. Built for long-term value, stable infrastructure and human

            digital work.

          </p>

          <button className="glass-button">▣ View system architecture</button>

        </div>

        <div className="card-grid">

          {cards.map(([title, body, icon]) => (

            <article key={title} className="tile">

              <div className="tile-icon">{icon}</div>

              <h2>{title}</h2>

              <p>{body}</p>

              <span>→</span>

            </article>

          ))}

        </div>

        <aside className="right-panel">

          <div className="panel">

            <h3>SYSTEM OVERVIEW</h3>

            <p><span className="dot" /> Gate1 <b>Online</b></p>

            <p><span className="dot" /> Node 250 <b>Online</b></p>

            <p><span className="dot" /> Dell Storage <b>Online</b></p>

            <hr />

            <p>Uptime <b>23d 14h</b></p>

            <p>Load avg <b>0.37</b></p>

            <p>Temperature <b>41°C</b></p>

          </div>

          <div className="panel">

            <h3>RECENT ACTIVITY</h3>

            <p><span className="blue-dot" /> Node 250<br /><small>GPU status available</small></p>

            <p><span className="blue-dot" /> Gate1<br /><small>Sol CLI active</small></p>

            <p><span className="blue-dot" /> Storage<br /><small>Storj mounted</small></p>

          </div>

        </aside>

      </section>

      <section className="bottom-dock">

        <div className="dock-card"><span className="dot" /> <b>NODE 250</b><em>Online</em><p>3× GPU · Compute node</p></div>

        <div className="dock-card"><span className="dot" /> <b>GATE1</b><em>Online</em><p>Control plane · Sol CLI</p></div>

        <div className="dock-card"><span className="dot" /> <b>NETWORK</b><em>All Good</em><p>Tailscale · Router · Switch</p></div>

        <div className="terminal"><b>SOL CLI</b><pre>{"> sol status\nSystem is all good."}</pre></div>

      </section>

    </main>

  );

}
