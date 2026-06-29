"use client";

import { useEffect, useMemo, useState } from "react";
import { researchData } from "./generated/research-data";

const languages = [
  { code: "sv", short: "SV", label: "Svenska", flag: "🇸🇪" },
  { code: "en", short: "EN", label: "English", flag: "🇬🇧" },
];

const starPoints = [
  ["8%", "14%", "near"], ["14%", "82%", "mid"], ["19%", "43%", "far"],
  ["27%", "22%", "near"], ["34%", "71%", "far"], ["42%", "12%", "mid"],
  ["48%", "91%", "near"], ["56%", "37%", "far"], ["63%", "16%", "near"],
  ["71%", "77%", "mid"], ["79%", "29%", "far"], ["86%", "66%", "near"],
  ["93%", "18%", "mid"], ["96%", "86%", "far"], ["5%", "58%", "near"],
  ["31%", "53%", "mid"], ["67%", "48%", "near"], ["88%", "42%", "mid"],
];

const systemVisuals = {
  solvinter: {
    core: "solvinter",
    tone: "gold",
    nodes: {
      "cow-lane": { angle: -7, radius: 28, accent: "#f1c983", glow: "rgba(241, 201, 131, 0.42)", size: "3.3rem", depth: 1 },
      "black-rocks": { angle: 76, radius: 39, accent: "#86b7d6", glow: "rgba(134, 183, 214, 0.24)", size: "2.25rem", depth: 0.72 },
      winneba: { angle: 156, radius: 39, accent: "#a7c87a", glow: "rgba(167, 200, 122, 0.24)", size: "2.25rem", depth: 0.72 },
      apam: { angle: 238, radius: 38, accent: "#d89158", glow: "rgba(216, 145, 88, 0.25)", size: "2.35rem", depth: 0.76 },
    },
  },
  "cape-coast": {
    core: "cape-coast",
    tone: "blue",
    nodes: {
      "cape-coast": { angle: -15, radius: 31, accent: "#75d3d1", glow: "rgba(117, 211, 209, 0.28)", size: "2.6rem", depth: 0.86 },
      elmina: { angle: 104, radius: 39, accent: "#86b7d6", glow: "rgba(134, 183, 214, 0.22)", size: "2.15rem", depth: 0.7 },
      kakum: { angle: 218, radius: 40, accent: "#a7c87a", glow: "rgba(167, 200, 122, 0.22)", size: "2.1rem", depth: 0.68 },
    },
  },
  volta: {
    core: "volta",
    tone: "green",
    nodes: {
      ho: { angle: -24, radius: 31, accent: "#77cfc1", glow: "rgba(119, 207, 193, 0.25)", size: "2.3rem", depth: 0.82 },
      hohoe: { angle: 42, radius: 39, accent: "#b7cf93", glow: "rgba(183, 207, 147, 0.24)", size: "2.2rem", depth: 0.74 },
      biakpa: { angle: 128, radius: 38, accent: "#9db6a7", glow: "rgba(157, 182, 167, 0.2)", size: "2.1rem", depth: 0.68 },
      wli: { angle: 224, radius: 42, accent: "#77cfc1", glow: "rgba(119, 207, 193, 0.22)", size: "2.05rem", depth: 0.66 },
    },
  },
  sweden: {
    core: "sweden",
    tone: "blue",
    nodes: {
      gothenburg: { angle: -16, radius: 30, accent: "#9bb8e7", glow: "rgba(155, 184, 231, 0.28)", size: "2.45rem", depth: 0.86 },
      umea: { angle: 78, radius: 40, accent: "#c6c0b8", glow: "rgba(198, 192, 184, 0.2)", size: "2.05rem", depth: 0.68 },
      stockholm: { angle: 158, radius: 38, accent: "#86b7d6", glow: "rgba(134, 183, 214, 0.24)", size: "2.2rem", depth: 0.74 },
      lund: { angle: 238, radius: 41, accent: "#d8b36f", glow: "rgba(216, 179, 111, 0.22)", size: "2.1rem", depth: 0.7 },
    },
  },
};

function getNodePosition(visual, rotation, zoom) {
  const radians = ((visual.angle + rotation) * Math.PI) / 180;
  const radius = visual.radius * zoom;
  const x = 50 + Math.cos(radians) * radius;
  const y = 50 + Math.sin(radians) * radius * 0.55;

  return {
    x: Math.min(92, Math.max(8, x)),
    y: Math.min(84, Math.max(16, y)),
  };
}

const content = {
  sv: {
    brand: {
      title: "Solvinter Edge",
      subtitle: "Economic Observatory",
    },
    nav: {
      whitepaper: "whitepaper",
      docs: "docs",
      atlas: "atlas",
      stars: "stars",
      center: "center",
      close: "close",
      next: "next system",
      drag: "drag",
      rotate: "rotate",
      scroll: "scroll",
      zoom: "zoom",
      click: "click",
      select: "select",
      jump: "jumping...",
      lightYears: "0.8 light years",
    },
    panels: {
      whitepaper: {
        eyebrow: "Open document",
        title: "Whitepaper",
        body: "Solvinter Edge dokumenterar först hur människor kan skapa intäkter med digitalt arbete i Accra, innan fler fysiska noder byggs.",
        items: ["Accra Node 0.1", "2 arbetsstationer", "Training through practice", "Documentation first"],
        link: "https://github.com/solvinter/edge.solvinter/blob/main/docs/finance/five-year-plan.md",
        linkLabel: "open whitepaper",
      },
      docs: {
        eyebrow: "Documentation",
        title: "Operativ loggbok",
        body: "Loggen ska visa uppgifter, utrustning, uppkoppling, kostnader, träning, arbetsrutiner och lärdomar innan nätverket skalas.",
        items: ["workspace log", "task log", "cost log", "lessons learned"],
        link: "https://github.com/solvinter/edge.solvinter",
        linkLabel: "open docs",
      },
      atlas: {
        eyebrow: "Atlas mode",
        title: "Solvinter-systemet",
        body: "Atlaset är en läsbar modell över nuvarande och framtida noder. Accra är den enda aktiva ekonomiska motorn i första fasen.",
        items: ["active node: Accra", "future nodes: observation", "local demand unknown"],
      },
      stars: {
        eyebrow: "Stars",
        title: "Flera system",
        body: "Hoppa mellan Solvinter-systemet och framtida sektorer. De andra systemen är observationslägen, inte bevisade intäktsmodeller.",
        items: ["Cow Lane system", "Cape Coast system", "Volta system", "Sweden / Gothenburg"],
      },
    },
    systems: [
      {
        id: "solvinter",
        label: "Solvinter / Cow Lane System",
        sector: "Economic Observatory",
        headline: "Cow Lane first, future nodes later",
        coreLabel: "Cow Lane",
        summary: "Cow Lane / Accra är aktiv nod. Black Rocks, Winneba och Apam är planerade observationsnoder.",
        nodes: [
          { id: "cow-lane", role: "primary", name: "Cow Lane / Accra", code: "active node", state: "economic engine", phase: "Första operativa workspace och ekonomisk startpunkt.", status: "Cow Lane är platsen för två arbetsstationer och mänskligt digitalt arbete i första fasen.", evidence: "Dokumentera uppdrag, intäkter, träning, rutiner, utrustning, uppkoppling och öppna frågor.", facts: ["active node", "2 workstations", "human digital work", "documentation first"] },
          { id: "black-rocks", role: "future", name: "Black Rocks", code: "planned", state: "planned node", phase: "Observation. Lokal efterfrågan är okänd.", status: "Black Rocks är planerad som möjlig framtida nod, inte som bevisad intäktsmodell.", evidence: "Följ lokal efterfrågan, svalka, laddning och möjliga lärandeflöden.", facts: ["planned", "observation", "local demand unknown"] },
          { id: "winneba", role: "future", name: "Winneba", code: "planned", state: "planned node", phase: "Observation och lärande.", status: "Winneba kan senare kopplas till utbildning och studentflöden, men ekonomin startar inte här.", evidence: "Mät lärandebehov, uppkoppling, laddning och lokala arbetsmönster.", facts: ["planned", "learning", "observation"] },
          { id: "apam", role: "future", name: "Apam", code: "planned", state: "planned node", phase: "Observation. Lokal efterfrågan är okänd.", status: "Apam är en planerad framtida nod som kräver observation innan roll eller ekonomi antas.", evidence: "Möjliga roller senare: laddning, svalka, compute och lokal service.", facts: ["planned", "observation", "charging later"] },
        ],
      },
      {
        id: "cape-coast",
        label: "Cape Coast System",
        sector: "Future coastal system",
        headline: "Coastal reference and learning",
        coreLabel: "Cape Coast",
        summary: "Cape Coast är planerad. Elmina och Kakum är optional satellites för kultur, kust och inland learning.",
        nodes: [
          { id: "cape-coast", role: "future", name: "Cape Coast", code: "planned", state: "planned node", phase: "Framtida kustreferens.", status: "Cape Coast kan bli relevant för lärande, partnerskap, svalka och kustnära observation.", evidence: "Dokumentera lokal efterfrågan, värme, uppkoppling, partnerskap och möjliga arbetsflöden.", facts: ["planned", "coastal reference", "learning later"] },
          { id: "elmina", role: "future", name: "Elmina", code: "optional satellite", state: "optional satellite", phase: "Observation.", status: "Elmina är en optional satellite nära Cape Coast-systemet.", evidence: "Observera lokala flöden, kultur, utbildning och möjliga partnerskap.", facts: ["optional", "observation"] },
          { id: "kakum", role: "future", name: "Kakum / inland learning node", code: "optional satellite", state: "optional satellite", phase: "Inland learning observation.", status: "Kakum kan läsas som inland learning node, inte som aktiv ekonomisk motor.", evidence: "Mät utbildningsvärde, lokala behov och praktisk åtkomst.", facts: ["optional", "learning", "inland"] },
        ],
      },
      {
        id: "volta",
        label: "Volta System",
        sector: "Future mountain-water system",
        headline: "Observation without Takoradi",
        coreLabel: "Volta",
        summary: "Volta-systemet innehåller Ho, Hohoe, Biakpa och Wli. Takoradi hör inte hit.",
        nodes: [
          { id: "ho", role: "future", name: "Ho", code: "planned", state: "future node", phase: "Observation.", status: "Ho kan senare kopplas till lärande eller lokal service, men ingen modell är bevisad.", evidence: "Dokumentera efterfrågan, uppkoppling, laddning och arbetsmönster.", facts: ["future node", "local demand unknown"] },
          { id: "hohoe", role: "future", name: "Hohoe", code: "planned", state: "future node", phase: "Observation.", status: "Hohoe är en framtida observationspunkt i Volta-systemet.", evidence: "Mät lokala behov innan någon roll definieras.", facts: ["future node", "observation"] },
          { id: "biakpa", role: "future", name: "Biakpa", code: "planned", state: "future node", phase: "Mountain observation.", status: "Biakpa kan vara relevant för miljö, svalka och lärande senare.", evidence: "Observera klimat, åtkomst, energi och lokala behov.", facts: ["future node", "cooling later"] },
          { id: "wli", role: "future", name: "Wli / mountain-water node", code: "optional", state: "optional satellite", phase: "Mountain-water observation.", status: "Wli är optional och ska bara läsas som möjlig framtida observation.", evidence: "Dokumentera vatten, klimat, åtkomst och lokala frågor innan roll antas.", facts: ["optional", "observation"] },
        ],
      },
      {
        id: "sweden",
        label: "Sweden / Gothenburg System",
        sector: "Northern partner system",
        headline: "Academic and partner observation",
        coreLabel: "Gothenburg",
        summary: "Gothenburg, Umeå, Stockholm och Lund är möjliga svenska partner- och akademinoder.",
        nodes: [
          { id: "gothenburg", role: "future", name: "Gothenburg", code: "planned", state: "partner node", phase: "Partner and coordination observation.", status: "Gothenburg kan fungera som svensk koordinations- och partnerpunkt.", evidence: "Dokumentera partnerskap, akademiska kopplingar, finansiering och stödflöden.", facts: ["partner node", "observation"] },
          { id: "umea", role: "future", name: "Umeå", code: "planned", state: "future node", phase: "Northern observation.", status: "Umeå är en möjlig framtida svensk nod för kunskap och partnerskap.", evidence: "Mät relevans för utbildning, klimatkunskap och forskning.", facts: ["future node", "research"] },
          { id: "stockholm", role: "future", name: "Stockholm", code: "planned", state: "future node", phase: "Institutional observation.", status: "Stockholm kan vara relevant för institutionella relationer och finansiering.", evidence: "Observera partners, finansiering och policykopplingar.", facts: ["future node", "partners"] },
          { id: "lund", role: "future", name: "Lund / academic node", code: "optional", state: "optional academic node", phase: "Academic observation.", status: "Lund är optional och kopplas främst till akademisk kunskap och dokumentation.", evidence: "Dokumentera akademiska samarbeten och forskningsfrågor.", facts: ["optional", "academic"] },
        ],
      },
    ],  },
  en: {
    brand: {
      title: "Solvinter Edge",
      subtitle: "Economic Observatory",
    },
    nav: {
      whitepaper: "whitepaper",
      docs: "docs",
      atlas: "atlas",
      stars: "stars",
      center: "center",
      close: "close",
      next: "next system",
      drag: "drag",
      rotate: "rotate",
      scroll: "scroll",
      zoom: "zoom",
      click: "click",
      select: "select",
      jump: "jumping...",
      lightYears: "0.8 light years",
    },
    panels: {
      whitepaper: {
        eyebrow: "Open document",
        title: "Whitepaper",
        body: "Solvinter Edge documents how people can generate revenue through digital work in Accra before additional physical nodes are built.",
        items: ["Accra Node 0.1", "2 workstations", "Training through practice", "Documentation first"],
        link: "https://github.com/solvinter/edge.solvinter/blob/main/docs/finance/five-year-plan.md",
        linkLabel: "open whitepaper",
      },
      docs: {
        eyebrow: "Documentation",
        title: "Operational logbook",
        body: "The logbook should show tasks, equipment, connectivity, costs, training, routines and lessons before the network scales.",
        items: ["workspace log", "task log", "cost log", "lessons learned"],
        link: "https://github.com/solvinter/edge.solvinter",
        linkLabel: "open docs",
      },
      atlas: {
        eyebrow: "Atlas mode",
        title: "The Solvinter system",
        body: "The atlas is a legible model of current and future nodes. Accra is the only active economic engine in the first phase.",
        items: ["active node: Accra", "future nodes: observation", "local demand unknown"],
      },
      stars: {
        eyebrow: "Stars",
        title: "Multiple systems",
        body: "Move between the Solvinter system and future sectors. The other systems are observation modes, not proven revenue models.",
        items: ["Cow Lane system", "Cape Coast system", "Volta system", "Sweden / Gothenburg"],
      },
    },
    systems: [
      {
        id: "solvinter",
        label: "Solvinter / Cow Lane System",
        sector: "Economic Observatory",
        headline: "Cow Lane first, future nodes later",
        coreLabel: "Cow Lane",
        summary: "Cow Lane / Accra is the active node. Black Rocks, Winneba and Apam are planned observation nodes.",
        nodes: [
          { id: "cow-lane", role: "primary", name: "Cow Lane / Accra", code: "active node", state: "economic engine", phase: "First operational workspace and economic starting point.", status: "Cow Lane is the place for two workstations and human digital work in the first phase.", evidence: "Document tasks, revenue, training, routines, equipment, connectivity and open questions.", facts: ["active node", "2 workstations", "human digital work", "documentation first"] },
          { id: "black-rocks", role: "future", name: "Black Rocks", code: "planned", state: "planned node", phase: "Observation. Local demand is unknown.", status: "Black Rocks is planned as a possible future node, not as a proven revenue model.", evidence: "Track local demand, cooling, charging and possible learning flows.", facts: ["planned", "observation", "local demand unknown"] },
          { id: "winneba", role: "future", name: "Winneba", code: "planned", state: "planned node", phase: "Observation and learning.", status: "Winneba may later connect to education and student flows, but the economy does not start here.", evidence: "Measure learning needs, connectivity, charging and local work patterns.", facts: ["planned", "learning", "observation"] },
          { id: "apam", role: "future", name: "Apam", code: "planned", state: "planned node", phase: "Observation. Local demand is unknown.", status: "Apam is a planned future node that requires observation before any role or economics are assumed.", evidence: "Possible later roles: charging, cooling, compute and local service.", facts: ["planned", "observation", "charging later"] },
        ],
      },
      {
        id: "cape-coast",
        label: "Cape Coast System",
        sector: "Future coastal system",
        headline: "Coastal reference and learning",
        coreLabel: "Cape Coast",
        summary: "Cape Coast is planned. Elmina and Kakum are optional satellites for culture, coast and inland learning.",
        nodes: [
          { id: "cape-coast", role: "future", name: "Cape Coast", code: "planned", state: "planned node", phase: "Future coastal reference.", status: "Cape Coast may become relevant for learning, partnerships, cooling and coastal observation.", evidence: "Document local demand, heat, connectivity, partnerships and possible work patterns.", facts: ["planned", "coastal reference", "learning later"] },
          { id: "elmina", role: "future", name: "Elmina", code: "optional satellite", state: "optional satellite", phase: "Observation.", status: "Elmina is an optional satellite near the Cape Coast system.", evidence: "Observe local flows, culture, education and possible partnerships.", facts: ["optional", "observation"] },
          { id: "kakum", role: "future", name: "Kakum / inland learning node", code: "optional satellite", state: "optional satellite", phase: "Inland learning observation.", status: "Kakum can be read as an inland learning node, not as an active economic engine.", evidence: "Measure educational value, local needs and practical access.", facts: ["optional", "learning", "inland"] },
        ],
      },
      {
        id: "volta",
        label: "Volta System",
        sector: "Future mountain-water system",
        headline: "Observation without Takoradi",
        coreLabel: "Volta",
        summary: "The Volta system contains Ho, Hohoe, Biakpa and Wli. Takoradi does not belong here.",
        nodes: [
          { id: "ho", role: "future", name: "Ho", code: "planned", state: "future node", phase: "Observation.", status: "Ho may later connect to learning or local services, but no model is proven.", evidence: "Document demand, connectivity, charging and work patterns.", facts: ["future node", "local demand unknown"] },
          { id: "hohoe", role: "future", name: "Hohoe", code: "planned", state: "future node", phase: "Observation.", status: "Hohoe is a future observation point in the Volta system.", evidence: "Measure local needs before defining any role.", facts: ["future node", "observation"] },
          { id: "biakpa", role: "future", name: "Biakpa", code: "planned", state: "future node", phase: "Mountain observation.", status: "Biakpa may later become relevant for environment, cooling and learning.", evidence: "Observe climate, access, energy and local needs.", facts: ["future node", "cooling later"] },
          { id: "wli", role: "future", name: "Wli / mountain-water node", code: "optional", state: "optional satellite", phase: "Mountain-water observation.", status: "Wli is optional and should only be read as possible future observation.", evidence: "Document water, climate, access and local questions before assuming any role.", facts: ["optional", "observation"] },
        ],
      },
      {
        id: "sweden",
        label: "Sweden / Gothenburg System",
        sector: "Northern partner system",
        headline: "Academic and partner observation",
        coreLabel: "Gothenburg",
        summary: "Gothenburg, Umeå, Stockholm and Lund are possible Swedish partner and academic nodes.",
        nodes: [
          { id: "gothenburg", role: "future", name: "Gothenburg", code: "planned", state: "partner node", phase: "Partner and coordination observation.", status: "Gothenburg may serve as a Swedish coordination and partner point.", evidence: "Document partnerships, academic links, funding and support flows.", facts: ["partner node", "observation"] },
          { id: "umea", role: "future", name: "Umeå", code: "planned", state: "future node", phase: "Northern observation.", status: "Umeå is a possible future Swedish node for knowledge and partnerships.", evidence: "Measure relevance for education, climate knowledge and research.", facts: ["future node", "research"] },
          { id: "stockholm", role: "future", name: "Stockholm", code: "planned", state: "future node", phase: "Institutional observation.", status: "Stockholm may become relevant for institutional relationships and funding.", evidence: "Observe partners, funding and policy links.", facts: ["future node", "partners"] },
          { id: "lund", role: "future", name: "Lund / academic node", code: "optional", state: "optional academic node", phase: "Academic observation.", status: "Lund is optional and mainly connected to academic knowledge and documentation.", evidence: "Document academic collaborations and research questions.", facts: ["optional", "academic"] },
        ],
      },
    ],  },
};

export default function Page() {
  const [language, setLanguage] = useState("sv");
  const [activeSystemId, setActiveSystemId] = useState("solvinter");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [activePanelId, setActivePanelId] = useState(null);
  const [systemRotation, setSystemRotation] = useState(0);
  const [dragState, setDragState] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [jumping, setJumping] = useState(false);
  const t = content[language];
  const activeSystem = t.systems.find((system) => system.id === activeSystemId) ?? t.systems[0];
  const activeVisual = systemVisuals[activeSystem.id] ?? systemVisuals.solvinter;
  const selectedNode = activeSystem.nodes.find((node) => node.id === selectedNodeId) ?? null;
  const activePanel = activePanelId ? t.panels[activePanelId] : null;

  const renderedNodes = useMemo(
    () =>
      activeSystem.nodes.map((node) => {
        const visual = activeVisual.nodes[node.id] ?? Object.values(activeVisual.nodes)[0];
        const position = getNodePosition(visual, systemRotation, zoom);
        return { node, visual, position };
      }),
    [activeSystem, activeVisual, systemRotation, zoom],
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frameId;
    let previousTime = performance.now();

    const tick = (time) => {
      const elapsed = time - previousTime;
      previousTime = time;

      if (!dragState) {
        setSystemRotation((rotation) => (rotation + elapsed * 0.002) % 360);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [dragState]);

  const openPanel = (panelId) => {
    setSelectedNodeId(null);
    setActivePanelId((current) => (current === panelId ? null : panelId));
  };

  const selectNode = (nodeId) => {
    setActivePanelId(null);
    setSelectedNodeId((current) => (current === nodeId ? null : nodeId));
  };

  const switchSystem = (systemId) => {
    if (systemId === activeSystemId) {
      return;
    }

    setJumping(true);
    setSelectedNodeId(null);
    setActivePanelId(null);
    setActiveSystemId(systemId);
    setSystemRotation(0);
    window.setTimeout(() => setJumping(false), 720);
  };

  const switchToNextSystem = () => {
    const index = t.systems.findIndex((system) => system.id === activeSystemId);
    const nextSystem = t.systems[(index + 1) % t.systems.length];
    switchSystem(nextSystem.id);
  };

  const handleCanvasPointerDown = (event) => {
    const target = event.target;

    if (target instanceof HTMLElement && target.closest(".system-node")) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      pointerId: event.pointerId,
      x: event.clientX,
      rotation: systemRotation,
    });
  };

  const handleCanvasPointerMove = (event) => {
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    setSystemRotation(dragState.rotation + (event.clientX - dragState.x) * 0.26);
  };

  const handleCanvasPointerEnd = (event) => {
    if (dragState?.pointerId === event.pointerId) {
      setDragState(null);
    }
  };

  const handleWheel = (event) => {
    setZoom((currentZoom) => {
      const nextZoom = currentZoom + (event.deltaY > 0 ? -0.04 : 0.04);
      return Math.min(1.16, Math.max(0.82, nextZoom));
    });
  };

  const resetView = () => {
    setSystemRotation(0);
    setZoom(1);
  };

  return (
    <main
      className={`space-experience space-experience--${activeSystem.id} ${
        jumping ? "space-experience--jumping" : ""
      }`}
      lang={language}
    >
      <div className="star-field star-field--far" aria-hidden="true" />
      <div className="star-field star-field--mid" aria-hidden="true" />
      <div className="star-field star-field--near" aria-hidden="true">
        {starPoints.map(([x, y, depth]) => (
          <span key={`${x}-${y}`} className={`star star--${depth}`} style={{ "--x": x, "--y": y }} />
        ))}
      </div>

      <header className="space-header">
        <a href="#atlas" className="brand-mark" aria-label="Solvinter Edge atlas">
          <span className="brand-mark__symbol">S</span>
          <span>
            <span className="brand-mark__title">{t.brand.title}</span>
            <span className="brand-mark__subtitle">{t.brand.subtitle}</span>
          </span>
        </a>

        <nav className="top-orbit-nav" aria-label="Primary navigation">
          {["whitepaper", "docs", "atlas", "stars"].map((item) => (
            <button
              key={item}
              type="button"
              className={activePanelId === item ? "top-orbit-nav__item top-orbit-nav__item--active" : "top-orbit-nav__item"}
              onClick={() => openPanel(item)}
            >
              {t.nav[item]}
            </button>
          ))}
        </nav>

        <div className="header-actions">
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
          <button type="button" className="icon-button" onClick={switchToNextSystem} aria-label={t.nav.next}>
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      <aside className="edge-nav" aria-label="Observatory controls">
        {["whitepaper", "docs", "atlas", "stars"].map((item) => (
          <button
            key={item}
            type="button"
            className={activePanelId === item ? "edge-nav__item edge-nav__item--active" : "edge-nav__item"}
            onClick={() => openPanel(item)}
          >
            <span className={`edge-nav__icon edge-nav__icon--${item}`} aria-hidden="true" />
            <span>{t.nav[item]}</span>
            <span className="edge-nav__arrow" aria-hidden="true">&gt;</span>
          </button>
        ))}
      </aside>

      <section className="space-stage" id="atlas" aria-label="Solvinter Edge atlas">
        <div className="system-label" aria-hidden="true">
          <span>{activeSystem.sector}</span>
          <strong>{activeSystem.headline}</strong>
        </div>

        <div
          className={`system-canvas ${dragState ? "system-canvas--dragging" : ""}`}
          onPointerDown={handleCanvasPointerDown}
          onPointerMove={handleCanvasPointerMove}
          onPointerUp={handleCanvasPointerEnd}
          onPointerCancel={handleCanvasPointerEnd}
          onWheel={handleWheel}
        >
          <div className="space-dust space-dust--a" aria-hidden="true" />
          <div className="space-dust space-dust--b" aria-hidden="true" />

          <div className="orbit-field" aria-hidden="true">
            <span className="orbit orbit--one" />
            <span className="orbit orbit--two" />
            <span className="orbit orbit--three" />
            <span className="orbit orbit--four" />
            <span className={`system-core system-core--${activeVisual.tone}`}>
              <span className="system-core__sun" />
              <span className="system-core__ring" />
              <span className="system-core__word">{activeSystem.coreLabel}</span>
            </span>
          </div>

          <svg className="system-links" viewBox="0 0 100 100" aria-hidden="true">
            {renderedNodes.map(({ node, position }) => (
              <line key={node.id} x1="50" y1="50" x2={position.x} y2={position.y} />
            ))}
          </svg>

          {renderedNodes.map(({ node, visual, position }) => (
            <button
              key={node.id}
              type="button"
              className={`system-node system-node--${node.role} ${
                selectedNodeId === node.id ? "system-node--active" : ""
              }`}
              style={{
                "--x": `${position.x}%`,
                "--y": `${position.y}%`,
                "--node-accent": visual.accent,
                "--node-glow": visual.glow,
                "--node-size": visual.size,
                "--node-depth": visual.depth,
              }}
              onClick={() => selectNode(node.id)}
              aria-pressed={selectedNodeId === node.id}
              aria-label={`${node.name}: ${node.phase}`}
            >
              <span className="system-node__orbit" aria-hidden="true" />
              <span className="system-node__planet" aria-hidden="true" />
              <span className="system-node__text">
                <span className="system-node__name">{node.name}</span>
                <span className="system-node__code">{node.code}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="control-hint control-hint--left">
          <span>{t.nav.drag}<strong>{t.nav.rotate}</strong></span>
          <span>{t.nav.scroll}<strong>{t.nav.zoom}</strong></span>
          <span>{t.nav.click}<strong>{t.nav.select}</strong></span>
        </div>

        <button type="button" className="center-button" onClick={resetView}>
          <span aria-hidden="true" />
          {t.nav.center}
        </button>

        <div className="system-dock" aria-label="System navigation">
          {t.systems.map((system) => (
            <button
              key={system.id}
              type="button"
              className={activeSystem.id === system.id ? "system-card system-card--active" : "system-card"}
              onClick={() => switchSystem(system.id)}
            >
              <span className="system-card__map" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span>
                <strong>{system.label}</strong>
                <em>{system.summary}</em>
              </span>
            </button>
          ))}
        </div>
      </section>

      {(selectedNode || activePanel) && (
        <aside className={`detail-panel ${selectedNode?.role === "primary" ? "detail-panel--primary" : ""}`}>
          <button type="button" className="detail-panel__close" onClick={() => { setSelectedNodeId(null); setActivePanelId(null); }}>
            {t.nav.close}
          </button>

          {selectedNode ? (
            <>
              <p className="panel-eyebrow">{selectedNode.state}</p>
              <h1>{selectedNode.name}</h1>
              <p className="detail-panel__phase">{selectedNode.phase}</p>
              <p>{selectedNode.status}</p>
              <div className="detail-panel__divider" />
              <p>{selectedNode.evidence}</p>
              <div className="tag-row">
                {selectedNode.facts.map((fact) => (
                  <span key={fact} className="tag">{fact}</span>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="panel-eyebrow">{activePanel.eyebrow}</p>
              <h1>{activePanel.title}</h1>
              <p>{activePanel.body}</p>
              <div className="detail-panel__divider" />
              <div className="tag-row">
                {activePanel.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
              {activePanel.link ? (
                <a className="detail-panel__link" href={activePanel.link}>
                  {activePanel.linkLabel}
                </a>
              ) : null}
            </>
          )}
        </aside>
      )}
    </main>
  );
}
