/* ============
   DATA (Projects)
   - Titles shown without prefixes
   - Links preserved
============== */

const PROJECTS = [
  { name: "OOP-Project", owner: "Sania1125", desc: "Object-oriented programming project.", tags: ["OOP", "C++/Java?"] },
  { name: "delish-bites-restaurant", owner: "Sania1125", desc: "Restaurant website UI.", tags: ["Web", "UI"] },
  { name: "Mathematical_Modeling_and_Computing", owner: "Muqtasid-Khan", desc: "Math modeling & computing work.", tags: ["Math", "Computing"] },
  { name: "AI-Exam-Generator", owner: "Sania1125", desc: "AI-based exam generation concept/project.", tags: ["AI", "Automation"] },
  { name: "My-Portfolio", owner: "Sania1125", desc: "Previous portfolio iteration.", tags: ["Web", "Portfolio"] },
  { name: "Ggoogle_Sign-in_-pg-clone-", owner: "Arfat-Anam", desc: "Google sign-in page clone.", tags: ["Clone", "HTML/CSS"] },
  { name: "Airport-Management-System", owner: "Sania1125", desc: "Airport management system project.", tags: ["System", "CRUD"] },
  { name: "E-commerce-system-", owner: "Sania1125", desc: "E-commerce system project.", tags: ["E-commerce", "Web"] },
  { name: "Smart-House", owner: "Sania1125", desc: "Smart house concept/project.", tags: ["IoT", "Automation"] },
  { name: "Shopping-website", owner: "rebiyamalik", desc: "Shopping website project.", tags: ["Web", "UI"] },
  { name: "Number-Guessing-Game", owner: "Sania1125", desc: "Fun number guessing game.", tags: ["Game", "Logic"] },
  { name: "Student-performance-tracker", owner: "Sania1125", desc: "Track student performance & results.", tags: ["Tracking", "Data"] },
  { name: "Hospital-System", owner: "Sania1125", desc: "Hospital system project.", tags: ["System", "Records"] },
  { name: "Mobile-AI-Assistant", owner: "Sania1125", desc: "Mobile AI assistant concept/project.", tags: ["Mobile", "AI"] },
  { name: "Library-Project", owner: "Sania1125", desc: "Library management project.", tags: ["System", "OOP"] },
  { name: "inventory-management-system", owner: "Sania1125", desc: "Inventory management system.", tags: ["Inventory", "CRUD"] },
];

function repoUrl(p) {
  return `https://github.com/${p.owner}/${p.name}`;
}

/* ============
   UI: Nav toggle (mobile)
============== */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu after clicking a link on mobile
  navMenu.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.tagName === "A" && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ============
   Projects render + search + sort
============== */
const grid = document.getElementById("projectGrid");
const search = document.getElementById("projectSearch");
const sortBtn = document.getElementById("sortBtn");

let asc = true;
let current = [...PROJECTS];

function renderProjects(list) {
  if (!grid) return;
  grid.innerHTML = "";

  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card project reveal";
    card.setAttribute("data-name", p.name.toLowerCase());

    const h = document.createElement("h3");
    h.textContent = p.name;

    const d = document.createElement("p");
    d.textContent = p.desc || "Project on GitHub.";

    const meta = document.createElement("div");
    meta.className = "meta";
    (p.tags || []).slice(0, 4).forEach((t) => {
      const b = document.createElement("span");
      b.className = "badge";
      b.textContent = t;
      meta.appendChild(b);
    });

    const a = document.createElement("a");
    a.href = repoUrl(p);
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = "View on GitHub →";

    card.appendChild(h);
    card.appendChild(d);
    card.appendChild(meta);
    card.appendChild(a);

    grid.appendChild(card);
  });

  // re-apply reveal observer
  observeReveals();
}

function applyFilters() {
  const q = (search?.value || "").trim().toLowerCase();
  const filtered = current.filter((p) => p.name.toLowerCase().includes(q));
  renderProjects(filtered);
}

if (search) {
  search.addEventListener("input", applyFilters);
}

if (sortBtn) {
  sortBtn.addEventListener("click", () => {
    asc = !asc;
    sortBtn.textContent = asc ? "Sort A→Z" : "Sort Z→A";
    current.sort((a, b) => asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    applyFilters();
  });
}

/* ============
   Reveal on scroll
============== */
let revealObserver;

function observeReveals() {
  const items = document.querySelectorAll(".reveal:not(.visible)");
  if (!items.length) return;

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }

  items.forEach((el) => revealObserver.observe(el));
}

/* ============
   3D Background (Three.js)
   - lightweight, responsive
   - honors prefers-reduced-motion
============== */
const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initThree() {
  const canvas = document.getElementById("bg");
  if (!canvas || typeof THREE === "undefined") return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0.2, 6);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambient);

  const key = new THREE.PointLight(0xffffff, 1.1);
  key.position.set(3, 2.2, 6);
  scene.add(key);

  const fill = new THREE.PointLight(0xffffff, 0.6);
  fill.position.set(-4, -1, 4);
  scene.add(fill);

  // Main object (torus knot for “4D vibe”)
  const geom = new THREE.TorusKnotGeometry(1.15, 0.36, 180, 24);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.35,
    roughness: 0.22,
    transparent: true,
    opacity: 0.85,
  });
  const knot = new THREE.Mesh(geom, mat);
  knot.position.set(1.4, 0.35, 0);
  scene.add(knot);

  // Floating particles
  const pCount = 900;
  const pGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
  }
  pGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.55 });
  const points = new THREE.Points(pGeom, pMat);
  scene.add(points);

  // Depth / parallax from mouse
  let mouseX = 0, mouseY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  // Scroll-based subtle movement
  let scrollY = 0;
  window.addEventListener("scroll", () => {
    scrollY = window.scrollY || 0;
  }, { passive: true });

  function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", onResize);

  // Animation loop
  function tick() {
    // keep it calm for reduced motion users
    const t = Date.now() * 0.001;

    if (!prefersReduced) {
      knot.rotation.x = t * 0.25;
      knot.rotation.y = t * 0.35;
      points.rotation.y = t * 0.02;
    }

    // Parallax “depth”
    const parX = mouseX * 0.25;
    const parY = -mouseY * 0.18;

    knot.position.x = 1.4 + parX;
    knot.position.y = 0.35 + parY - (scrollY * 0.00012);

    camera.position.x = parX * 0.55;
    camera.position.y = 0.2 + parY * 0.35;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }

  tick();
}

/* ============
   Footer year
============== */
document.getElementById("year").textContent = String(new Date().getFullYear());

/* Init */
renderProjects(current);
observeReveals();
initThree();
