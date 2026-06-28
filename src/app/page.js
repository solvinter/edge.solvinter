"use client";

import { useEffect, useMemo, useState } from "react";

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
      accra: { angle: -7, radius: 28, accent: "#f1c983", glow: "rgba(241, 201, 131, 0.42)", size: "3.3rem", depth: 1 },
      mumford: { angle: 104, radius: 38, accent: "#86b7d6", glow: "rgba(134, 183, 214, 0.28)", size: "2.35rem", depth: 0.78 },
      apam: { angle: 152, radius: 39, accent: "#d89158", glow: "rgba(216, 145, 88, 0.25)", size: "2.35rem", depth: 0.72 },
      winneba: { angle: 214, radius: 39, accent: "#a7c87a", glow: "rgba(167, 200, 122, 0.24)", size: "2.25rem", depth: 0.72 },
      "cape-coast": { angle: 48, radius: 39, accent: "#75d3d1", glow: "rgba(117, 211, 209, 0.26)", size: "2.4rem", depth: 0.82 },
    },
  },
  volta: {
    core: "volta",
    tone: "green",
    nodes: {
      ho: { angle: -24, radius: 31, accent: "#77cfc1", glow: "rgba(119, 207, 193, 0.25)", size: "2.3rem", depth: 0.82 },
      hohoe: { angle: 42, radius: 39, accent: "#b7cf93", glow: "rgba(183, 207, 147, 0.24)", size: "2.2rem", depth: 0.74 },
      kpando: { angle: 116, radius: 37, accent: "#9db6a7", glow: "rgba(157, 182, 167, 0.2)", size: "2.1rem", depth: 0.68 },
      keta: { angle: 192, radius: 42, accent: "#77cfc1", glow: "rgba(119, 207, 193, 0.22)", size: "2.05rem", depth: 0.66 },
      sogakope: { angle: 268, radius: 40, accent: "#a7b1bd", glow: "rgba(167, 177, 189, 0.2)", size: "2rem", depth: 0.66 },
    },
  },
  ashanti: {
    core: "ashanti",
    tone: "blue",
    nodes: {
      kumasi: { angle: -18, radius: 30, accent: "#9bb8e7", glow: "rgba(155, 184, 231, 0.28)", size: "2.45rem", depth: 0.86 },
      obuasi: { angle: 92, radius: 38, accent: "#d8b36f", glow: "rgba(216, 179, 111, 0.22)", size: "2.2rem", depth: 0.72 },
      sunyani: { angle: 205, radius: 39, accent: "#a7c87a", glow: "rgba(167, 200, 122, 0.22)", size: "2.1rem", depth: 0.68 },
    },
  },
  horizon: {
    core: "horizon",
    tone: "blue",
    nodes: {
      mumford: { angle: -14, radius: 29, accent: "#86b7d6", glow: "rgba(134, 183, 214, 0.3)", size: "2.45rem", depth: 0.86 },
      apam: { angle: 51, radius: 38, accent: "#d89158", glow: "rgba(216, 145, 88, 0.25)", size: "2.25rem", depth: 0.74 },
      winneba: { angle: 129, radius: 38, accent: "#a7c87a", glow: "rgba(167, 200, 122, 0.22)", size: "2.25rem", depth: 0.72 },
      "cape-coast": { angle: 204, radius: 38, accent: "#75d3d1", glow: "rgba(117, 211, 209, 0.24)", size: "2.3rem", depth: 0.78 },
      future: { angle: 276, radius: 42, accent: "#c6c0b8", glow: "rgba(198, 192, 184, 0.16)", size: "1.9rem", depth: 0.58 },
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
        items: ["Solvinter system", "Volta sector", "Ashanti network", "Coastal horizon"],
      },
    },
    systems: [
      {
        id: "solvinter",
        label: "Solvinter System",
        sector: "Economic Observatory",
        headline: "People before buildings",
        coreLabel: "Solvinter",
        summary: "Accra är den aktiva ekonomiska motorn. Kustnoderna är framtida observation.",
        nodes: [
          {
            id: "accra",
            role: "primary",
            name: "Accra / Node 0.1",
            code: "active node",
            state: "economic engine",
            phase: "Första operativa workspace och ekonomisk startpunkt.",
            status: "År ett börjar med två arbetsstationer för människor som arbetar med remote tasks, AI-assisterat arbete, data annotation, support och research.",
            evidence: "Dokumentera uppdrag, intäkter, träning, rutiner, utrustning, uppkoppling och vad som faktiskt går att upprepa.",
            facts: ["economic engine", "2 workstations", "human digital work", "Upwork-like platforms"],
          },
          {
            id: "mumford",
            role: "future",
            name: "Mumford",
            code: "planned",
            state: "future node",
            phase: "Observation. Lokal efterfrågan är okänd.",
            status: "Mumford finns kvar i atlaset som möjlig framtida kustnod, men ingen intäktsmodell antas ännu.",
            evidence: "Möjliga roller senare: svalka, laddning, lärande och lokal efterfrågan.",
            facts: ["future node", "observation", "local demand unknown"],
          },
          {
            id: "apam",
            role: "future",
            name: "Apam",
            code: "planned",
            state: "future node",
            phase: "Observation. Lokal efterfrågan är okänd.",
            status: "Apam är sekundär i första fasen. Rollen avgörs först efter dokumenterad observation.",
            evidence: "Möjliga roller senare: laddning, svalka, compute och lärande.",
            facts: ["future node", "observation", "compute later"],
          },
          {
            id: "winneba",
            role: "future",
            name: "Winneba",
            code: "planned",
            state: "future node",
            phase: "Observation och lärandekontext.",
            status: "Winneba kan bli relevant för träning nära studentflöden, men ekonomin startar inte här.",
            evidence: "Möjliga roller senare: lärande, lokala tjänster, laddning och compute.",
            facts: ["future node", "learning", "local demand unknown"],
          },
          {
            id: "cape-coast",
            role: "future",
            name: "Cape Coast",
            code: "planned",
            state: "future node",
            phase: "Framtida kustreferens.",
            status: "Cape Coast är en framtida referenspunkt. Rollen ska dokumenteras innan något byggs.",
            evidence: "Möjliga roller senare: svalka, laddning, compute, lärande och partnerskap.",
            facts: ["future node", "observation", "cooling later"],
          },
        ],
      },
      {
        id: "volta",
        label: "Volta Sector",
        sector: "Future sector",
        headline: "Observation beyond Node 0.1",
        coreLabel: "Volta",
        summary: "En framtida sektor för lärande, compute och lokal observation. Inte en aktiv intäktsmotor.",
        nodes: [
          { id: "ho", role: "future", name: "Ho", code: "possible", state: "future node", phase: "Observation.", status: "Ho kan senare kopplas till lärande eller lokal service, men ingen modell är bevisad.", evidence: "Dokumentera efterfrågan, uppkoppling, laddning och arbetsmönster.", facts: ["future node", "local demand unknown"] },
          { id: "hohoe", role: "future", name: "Hohoe", code: "planned", state: "future node", phase: "Observation.", status: "Hohoe är endast en framtida observationspunkt i detta atlasläge.", evidence: "Mät lokala behov innan någon roll definieras.", facts: ["future node", "observation"] },
          { id: "kpando", role: "future", name: "Kpando", code: "possible", state: "future node", phase: "Observation.", status: "Kpando är en möjlig framtida punkt i Volta-sektorn, utan antagen intäktsmodell.", evidence: "Observera lokal efterfrågan, uppkoppling, laddning och lärandebehov.", facts: ["future node", "observation"] },
          { id: "keta", role: "future", name: "Keta", code: "possible", state: "future node", phase: "Observation.", status: "Keta är en framtida observationspunkt nära kusten. Rollen måste dokumenteras innan den byggs.", evidence: "Möjliga roller senare: svalka, laddning, compute och lokal service.", facts: ["future node", "coastal observation"] },
          { id: "sogakope", role: "future", name: "Sogakope", code: "possible", state: "future node", phase: "Observation.", status: "Sogakope är en möjlig framtida punkt bortom första fasen.", evidence: "Observera klimat, logistik, uppkoppling och lokala flöden.", facts: ["future node", "observation"] },
        ],
      },
      {
        id: "ashanti",
        label: "Ashanti Network",
        sector: "Future network",
        headline: "Partner and learning observation",
        coreLabel: "Ashanti",
        summary: "Kumasi, Obuasi och Sunyani är möjliga framtida noder. Accra är fortfarande ekonomisk startpunkt.",
        nodes: [
          { id: "kumasi", role: "future", name: "Kumasi", code: "possible", state: "future node", phase: "Learning and partner observation.", status: "Kumasi kan senare vara relevant för utbildning och partnerskap, men första ekonomin ligger i Accra.", evidence: "Observera träningsbehov, digital kompetens, lokala partners och möjlig infrastruktur.", facts: ["future node", "learning", "partners later"] },
          { id: "obuasi", role: "future", name: "Obuasi", code: "possible", state: "future node", phase: "Observation.", status: "Obuasi är en möjlig framtida punkt utan bevisad intäktsmodell.", evidence: "Dokumentera lokala behov, uppkoppling, laddning och möjliga arbetsflöden.", facts: ["future node", "observation"] },
          { id: "sunyani", role: "future", name: "Sunyani", code: "possible", state: "future node", phase: "Observation.", status: "Sunyani ligger bortom första fasen och ska bara läsas som framtida observation.", evidence: "Mät lärande, lokal efterfrågan och infrastruktur innan någon roll antas.", facts: ["future node", "local demand unknown"] },
        ],
      },
      {
        id: "horizon",
        label: "Coastal Horizon",
        sector: "Secondary nodes",
        headline: "Possible roles, not proven revenue",
        coreLabel: "Horizon",
        summary: "Kusten kan senare få roller inom svalka, laddning, compute och lärande. Accra är fortfarande startpunkten.",
        nodes: [
          { id: "mumford", role: "future", name: "Mumford", code: "future", state: "observation", phase: "Local demand unknown.", status: "Mumford följs som kustnod, inte som bevisad affär.", evidence: "Cooling, charging, compute and learning may become relevant later.", facts: ["future node", "observation"] },
          { id: "apam", role: "future", name: "Apam", code: "future", state: "observation", phase: "Local demand unknown.", status: "Apam hålls som framtida nod tills observation visar faktisk efterfrågan.", evidence: "Dokumentera uppkoppling, laddning, klimat och lokal rytm.", facts: ["future node", "charging later"] },
          { id: "winneba", role: "future", name: "Winneba", code: "future", state: "observation", phase: "Learning later.", status: "Winneba kan kopplas till utbildning senare, men inte som första intäktsmotor.", evidence: "Träning, studentflöden och lokal efterfrågan ska mätas.", facts: ["future node", "learning"] },
          { id: "cape-coast", role: "future", name: "Cape Coast", code: "future", state: "observation", phase: "Coastal reference.", status: "Cape Coast är framtida referens för kustmiljö och möjliga partnerskap.", evidence: "Cooling, charging, compute och lärande kan bli relevant efter observation.", facts: ["future node", "cooling later"] },
          { id: "future", role: "future", name: "Future nodes", code: "unknown", state: "beyond horizon", phase: "No model assumed.", status: "Ytterligare noder finns bara som öppna frågor.", evidence: "Inga lokala intäktsmodeller antas utan loggad observation.", facts: ["open question", "documentation first"] },
        ],
      },
    ],
  },
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
        items: ["Solvinter system", "Volta sector", "Ashanti network", "Coastal horizon"],
      },
    },
    systems: [
      {
        id: "solvinter",
        label: "Solvinter System",
        sector: "Economic Observatory",
        headline: "People before buildings",
        coreLabel: "Solvinter",
        summary: "Accra is the active economic engine. The coastal nodes remain future observation points.",
        nodes: [
          {
            id: "accra",
            role: "primary",
            name: "Accra / Node 0.1",
            code: "active node",
            state: "economic engine",
            phase: "First operational workspace and economic starting point.",
            status: "Year one starts with two workstations for people doing remote tasks, AI-assisted work, data annotation, support and research.",
            evidence: "Document tasks, revenue, training, routines, equipment, connectivity and what can actually be repeated.",
            facts: ["economic engine", "2 workstations", "human digital work", "Upwork-like platforms"],
          },
          {
            id: "mumford",
            role: "future",
            name: "Mumford",
            code: "planned",
            state: "future node",
            phase: "Observation. Local demand is unknown.",
            status: "Mumford remains in the atlas as a possible future coastal node, but no revenue model is assumed yet.",
            evidence: "Possible later roles: cooling, charging, learning and local demand.",
            facts: ["future node", "observation", "local demand unknown"],
          },
          {
            id: "apam",
            role: "future",
            name: "Apam",
            code: "planned",
            state: "future node",
            phase: "Observation. Local demand is unknown.",
            status: "Apam is secondary in the first phase. Its role should be decided only after documented observation.",
            evidence: "Possible later roles: charging, cooling, compute and learning.",
            facts: ["future node", "observation", "compute later"],
          },
          {
            id: "winneba",
            role: "future",
            name: "Winneba",
            code: "planned",
            state: "future node",
            phase: "Observation and learning context.",
            status: "Winneba may become relevant for training near student flows, but the economy does not start here.",
            evidence: "Possible later roles: learning, local services, charging and compute.",
            facts: ["future node", "learning", "local demand unknown"],
          },
          {
            id: "cape-coast",
            role: "future",
            name: "Cape Coast",
            code: "planned",
            state: "future node",
            phase: "Future coastal reference.",
            status: "Cape Coast is a future reference point. Its role should be documented before anything is built.",
            evidence: "Possible later roles: cooling, charging, compute, learning and partnerships.",
            facts: ["future node", "observation", "cooling later"],
          },
        ],
      },
      {
        id: "volta",
        label: "Volta Sector",
        sector: "Future sector",
        headline: "Observation beyond Node 0.1",
        coreLabel: "Volta",
        summary: "A future sector for learning, compute and local observation. Not an active revenue engine.",
        nodes: [
          { id: "ho", role: "future", name: "Ho", code: "possible", state: "future node", phase: "Observation.", status: "Ho may later connect to learning or local services, but no model is proven.", evidence: "Document demand, connectivity, charging and work patterns.", facts: ["future node", "local demand unknown"] },
          { id: "hohoe", role: "future", name: "Hohoe", code: "planned", state: "future node", phase: "Observation.", status: "Hohoe is only a future observation point in this atlas mode.", evidence: "Measure local needs before defining any role.", facts: ["future node", "observation"] },
          { id: "kpando", role: "future", name: "Kpando", code: "possible", state: "future node", phase: "Observation.", status: "Kpando is a possible future point in the Volta sector, without an assumed revenue model.", evidence: "Observe local demand, connectivity, charging and learning needs.", facts: ["future node", "observation"] },
          { id: "keta", role: "future", name: "Keta", code: "possible", state: "future node", phase: "Observation.", status: "Keta is a future observation point near the coast. Its role must be documented before it is built.", evidence: "Possible later roles: cooling, charging, compute and local service.", facts: ["future node", "coastal observation"] },
          { id: "sogakope", role: "future", name: "Sogakope", code: "possible", state: "future node", phase: "Observation.", status: "Sogakope is a possible future point beyond phase one.", evidence: "Observe climate, logistics, connectivity and local flows.", facts: ["future node", "observation"] },
        ],
      },
      {
        id: "ashanti",
        label: "Ashanti Network",
        sector: "Future network",
        headline: "Partner and learning observation",
        coreLabel: "Ashanti",
        summary: "Kumasi, Obuasi and Sunyani are possible future nodes. Accra remains the economic starting point.",
        nodes: [
          { id: "kumasi", role: "future", name: "Kumasi", code: "possible", state: "future node", phase: "Learning and partner observation.", status: "Kumasi may later become relevant for training and partnerships, but the first economics remain in Accra.", evidence: "Observe training needs, digital skills, local partners and possible infrastructure.", facts: ["future node", "learning", "partners later"] },
          { id: "obuasi", role: "future", name: "Obuasi", code: "possible", state: "future node", phase: "Observation.", status: "Obuasi is a possible future point without a proven revenue model.", evidence: "Document local needs, connectivity, charging and possible work patterns.", facts: ["future node", "observation"] },
          { id: "sunyani", role: "future", name: "Sunyani", code: "possible", state: "future node", phase: "Observation.", status: "Sunyani sits beyond phase one and should only be read as future observation.", evidence: "Measure learning, local demand and infrastructure before assuming any role.", facts: ["future node", "local demand unknown"] },
        ],
      },
      {
        id: "horizon",
        label: "Coastal Horizon",
        sector: "Secondary nodes",
        headline: "Possible roles, not proven revenue",
        coreLabel: "Horizon",
        summary: "The coast may later have roles in cooling, charging, compute and learning. Accra remains the starting point.",
        nodes: [
          { id: "mumford", role: "future", name: "Mumford", code: "future", state: "observation", phase: "Local demand unknown.", status: "Mumford is tracked as a coastal node, not as a proven business.", evidence: "Cooling, charging, compute and learning may become relevant later.", facts: ["future node", "observation"] },
          { id: "apam", role: "future", name: "Apam", code: "future", state: "observation", phase: "Local demand unknown.", status: "Apam remains a future node until observation shows actual demand.", evidence: "Document connectivity, charging, climate and local rhythm.", facts: ["future node", "charging later"] },
          { id: "winneba", role: "future", name: "Winneba", code: "future", state: "observation", phase: "Learning later.", status: "Winneba may connect to training later, but not as the first revenue engine.", evidence: "Training, student flows and local demand should be measured.", facts: ["future node", "learning"] },
          { id: "cape-coast", role: "future", name: "Cape Coast", code: "future", state: "observation", phase: "Coastal reference.", status: "Cape Coast is a future reference for coastal conditions and possible partnerships.", evidence: "Cooling, charging, compute and learning may become relevant after observation.", facts: ["future node", "cooling later"] },
          { id: "future", role: "future", name: "Future nodes", code: "unknown", state: "beyond horizon", phase: "No model assumed.", status: "Additional nodes exist only as open questions.", evidence: "No local revenue model is assumed without logged observation.", facts: ["open question", "documentation first"] },
        ],
      },
    ],
  },
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
