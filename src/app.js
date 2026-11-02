(function(){
"use strict";
const $ = (s, el) => (el||document).querySelector(s);
const $$ = (s, el) => Array.from((el||document).querySelectorAll(s));
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = s => esc(s).replace(/\n/g, "<br>");
const hashStr = s => { let h = 7; for (const ch of s) h = (Math.imul(h, 31) + ch.codePointAt(0)) | 0; return (h >>> 0).toString(36); };
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const DAY = 864e5;
const LETTERS = ["A","B","C","D","E","F"];
const NAME = "Anne";
const PRAISE = ["Goed zo!","Klopt.","Helemaal goed.","Netjes, Anne.","Ja, dat is hem.","Goed gezien.","Mooi, die zit erin."];
const STREAK = {3:"Drie goed op rij.",5:"Vijf op rij, lekker bezig Anne!",10:"Tien op rij! Dit zit er goed in.",15:"Vijftien op rij. Heel sterk."};
const NOPE = ["Niet goed. Lees even waarom.","Deze niet. Kijk naar de uitleg.","Niet goed, maar nu weet je het wel."];
const heart = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 5.3 3.1 1.7-1.9 3.2-3.1 5.3-3.1 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';
const comma = n => String(Math.round(n * 10) / 10).replace(".", ",");
const gradeStr = g => Number(g).toFixed(1).replace(".", ",");
const SUP = {"-":"⁻","0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"};
const sci = (x, unit) => { if (Math.abs(x) >= 1e-3 && Math.abs(x) < 1e4) return String(Math.round(x * 100) / 100).replace(".", ",") + " " + unit; const e = Math.floor(Math.log10(Math.abs(x))); const m = x / Math.pow(10, e); return m.toFixed(2).replace(".", ",") + " · 10" + String(e).split("").map(ch => SUP[ch]).join("") + " " + unit; };
const num = s => { if (s === undefined || s === null) return NaN; const t = String(s).trim().replace(/\s/g, "").replace(",", "."); return t === "" ? NaN : Number(t); };
let toastT = null;
function toast(msg){
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role","status"); t.setAttribute("aria-live","polite"); document.body.appendChild(t); }
  t.innerHTML = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 1800);
}

// ---------- vakken ----------
const COURSES = window.COURSE_DATA || {};
const ORDER = Object.keys(COURSES);
ORDER.forEach(id => {
  const D = COURSES[id];
  D.FLASH.forEach(c => c.id = "f" + hashStr(c.q));
  D.MC.forEach(q => q.id = "m" + hashStr(q.q));
  D.TK = Object.keys(D.TOPICS);
  D.IMG = D.IMG || {};
});
let CID = null, D = null, INFO = {}, TOPICS = {}, TK = [], FLASH = [], MC = [], OPEN = [], SPRINT = [], TABLES = [], LESSONS = {}, EXAM = null, CONES = [], BANDS = {}, IMG = {}, CAP = {};
const L = k => `#${CID}-${k}`;
const tName = t => (TOPICS[t] && TOPICS[t].s) || t;

// ---------- opslag (per vak) ----------
const fresh = () => ({cards:{}, mc:{}, open:{}, sprint:{}, exams:[], examDate:"", cur:null, lastIds:[]});
const STORES = {};
function loadStore(id){
  if (STORES[id]) return STORES[id];
  let s = fresh();
  try { const raw = localStorage.getItem("anne-" + id + "-v1"); if (raw) s = Object.assign(fresh(), JSON.parse(raw)); } catch (e) {}
  STORES[id] = s; return s;
}
let S = fresh();
function save(){ if (!CID) return; try { localStorage.setItem("anne-" + CID + "-v1", JSON.stringify(S)); } catch (e) {} }

// ---------- thema (standaard licht; donker alleen als Anne dat kiest) ----------
let THEME = "light";
try { THEME = localStorage.getItem("anne-theme") === "dark" ? "dark" : "light"; } catch (e) {}
function applyTheme(){
  document.documentElement.setAttribute("data-theme", THEME);
  const b = $("#themeBtn"); if (b) b.textContent = THEME === "dark" ? "Thema: donker" : "Thema: licht";
}
function cycleTheme(){ THEME = THEME === "dark" ? "light" : "dark"; try { localStorage.setItem("anne-theme", THEME); } catch (e) {} applyTheme(); }

// ---------- statistiek ----------
const cardState = c => S.cards[c.id];
const mastered = c => (cardState(c) && cardState(c).box >= 3);
const isDue = c => { const s = cardState(c); return s && s.due <= Date.now(); };
const topicCards = t => FLASH.filter(c => t === "all" || c.t === t);
const topicMc = t => MC.filter(q => t === "all" || q.t === t);
function mcStats(list){ let ans = 0, ok = 0; list.forEach(q => { const s = S.mc[q.id]; if (s) { ans++; if (s.last) ok++; } }); return {ans, ok, total:list.length}; }
function recordMc(q, right){ const s = S.mc[q.id] || {r:0, w:0, last:false}; if (right) s.r++; else s.w++; s.last = right; S.mc[q.id] = s; save(); }
function daysUntil(str){ if (!str) return null; const d = new Date(str + "T09:00:00"); if (isNaN(d)) return null; const t = new Date(); t.setHours(0,0,0,0); d.setHours(0,0,0,0); return Math.round((d - t) / DAY); }

// ---------- kegeltjes ----------
function coneAt(l){
  const C = CONES; if (!C.length || isNaN(l)) return null;
  if (l <= C[0][0]) return {S:C[0][1], M:C[0][2], L:C[0][3]};
  if (l >= C[C.length-1][0]) { const z = C[C.length-1]; return {S:z[1], M:z[2], L:z[3]}; }
  for (let i = 0; i < C.length - 1; i++) {
    const a = C[i], b = C[i+1];
    if (l >= a[0] && l <= b[0]) { const f = (l - a[0]) / (b[0] - a[0]); const v = k => Math.round(a[k] + f * (b[k] - a[k])); return {S:v(1), M:v(2), L:v(3)}; }
  }
  return null;
}

// ---------- iconen ----------
const I = {
  start:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  kaarten:'<rect x="3" y="7" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
  oefenen:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
  toets:'<path d="M7 3h8l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M9.5 13h6M9.5 17h4"/>',
  open:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  sprint:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  naslag:'<path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M5 18a2 2 0 0 1 2-2h11"/>',
  leerpunten:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.8 10.6c.6.6.8 1.3.8 2.4h6c0-1.1.2-1.8.8-2.4A6 6 0 0 0 12 3z"/>',
  terug:'<path d="M15 5l-7 7 7 7"/>',
  vakken:'<rect x="3" y="4" width="7" height="16" rx="1.5"/><rect x="14" y="4" width="7" height="16" rx="1.5"/>'
};
const icon = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const NAV = [["start","Start"],["kaarten","Flashcards"],["oefenen","Oefenvragen"],["toets","Proeftoets"],["open","Open vragen"],["sprint","Sprint"],["naslag","Naslag"],["leerpunten","Leerpunten"]];
function renderNav(cur){
  const app = $(".app"); if (app) { app.dataset.course = CID || ""; app.dataset.accent = CID ? (INFO.accent || "blauw") : "roze"; }
  const mark = $("#brandMark"), sub = $("#brandSub"), brand = $(".brand");
  if (!CID) {
    if (mark) { mark.textContent = "A"; mark.classList.remove("txt"); }
    if (sub) sub.textContent = "5 havo · alle vakken";
    if (brand) brand.setAttribute("href", "#home");
    $("#nav").innerHTML = `<a href="#home" aria-current="page">${icon("vakken")}<span>Alle vakken</span></a>` +
      ORDER.map(id => `<a href="#${id}-start">${icon("start")}<span>${esc(COURSES[id].INFO.short)}</span></a>`).join("");
    return;
  }
  if (mark) { mark.textContent = INFO.short; mark.classList.add("txt"); }
  if (sub) sub.textContent = INFO.name;
  if (brand) brand.setAttribute("href", L("start"));
  $("#nav").innerHTML = `<a href="#home" class="nav-back">${icon("terug")}<span>Alle vakken</span></a>` +
    NAV.map(([k, t]) => `<a href="${L(k)}" ${k === cur ? 'aria-current="page"' : ""}>${icon(k)}<span>${t}</span></a>`).join("");
}
function topicChips(cur, group, list){
  list = list || TK;
  return `<div class="chips" role="group" aria-label="Kies onderwerp">
    <button class="chip" data-${group}="all" aria-pressed="${cur === "all"}">Alles</button>
    ${list.map(t => `<button class="chip" data-${group}="${t}" aria-pressed="${cur === t}">${esc(tName(t))}</button>`).join("")}
  </div>`;
}
const topicTag = t => `<span class="tag">${esc(TOPICS[t] ? TOPICS[t].n + " · " + TOPICS[t].s : t)}</span>`;

// ======================================================================
// FIGUREN EN SCHEMA'S
// ======================================================================
const ARROW = '<svg class="ptr-svg" viewBox="0 0 56 22" width="56" height="22" aria-hidden="true"><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h50M3 11l10-7M3 11l10 7" stroke="#14213d" stroke-width="7"/><path d="M3 11h50M3 11l10-7M3 11l10 7" stroke="#ffffff" stroke-width="3.2"/></g></svg>';
function paintHTML(name, arrow, cap){
  const src = IMG[name]; if (!src) return "";
  const ptr = arrow ? `<span class="pointer ${arrow[0] > 75 ? "flip" : ""}" style="left:${arrow[0]}%;top:${arrow[1]}%">${ARROW}</span>` : "";
  return `<figure class="paint"><span class="paint-wrap"><img src="${src}" alt="${esc(CAP[name] || name)}" loading="lazy">${ptr}</span><figcaption>${esc(cap || CAP[name] || "")}</figcaption></figure>`;
}
function figHTML(fig){
  if (!fig) return "";
  const out = [];
  if (fig.mols) out.push(`<div class="mols">${fig.mols.map(([n, lab]) => `<figure class="mol ${fig.mols.length === 1 || /caroteen|linol|stearine/.test(n) ? "wide" : ""}"><img src="${IMG[n] || ""}" alt="Structuurformule ${esc(lab)}"><figcaption>${esc(lab)}</figcaption></figure>`).join("")}</div>`);
  const paints = [];
  if (fig.img) paints.push(paintHTML(fig.img, fig.arrow, fig.cap));
  if (fig.imgs) fig.imgs.forEach(([n, c]) => paints.push(paintHTML(n, null, c)));
  if (fig.cones) out.push(`<div class="figrow"><div class="paints">${paints.join("")}</div><div class="graph-wrap">${conesSVG({mark: fig.mark || []})}</div></div>`);
  else if (paints.length) out.push(`<div class="paints">${paints.join("")}</div>`);
  if (fig.svg && SVGS[fig.svg]) out.push(SVGS[fig.svg]());
  if (fig.quote) out.push(`<blockquote class="quote">${esc(fig.quote)}</blockquote>${fig.qsrc ? `<p class="qsrc">${esc(fig.qsrc)}</p>` : ""}`);
  return `<div class="fig">${out.join("")}</div>`;
}

// Kegeltjesgrafiek (naar figuur 22 van de module)
function conesSVG(opt){
  opt = opt || {};
  const W = 470, H = 306, x0 = 46, x1 = 455, y0 = 238, y1 = 38, l0 = 390, l1 = 720;
  const X = l => x0 + (l - l0) / (l1 - l0) * (x1 - x0), Y = p => y0 - p / 100 * (y0 - y1);
  const curve = k => { const pts = CONES.map(r => [r[0], r[k]]); let a = 0, b = pts.length - 1; while (a < b && pts[a+1][1] === 0) a++; while (b > a && pts[b-1][1] === 0) b--; return pts.slice(a, b + 1).map((p, i) => (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1)).join(" "); };
  const grid = [0,20,40,60,80,100].map(p => `<line x1="${x0}" x2="${x1}" y1="${Y(p)}" y2="${Y(p)}" style="stroke:var(--grid)" stroke-width="1"/><text x="${x0 - 8}" y="${Y(p) + 4}" text-anchor="end" font-size="11" style="fill:var(--muted)">${p}</text>`).join("");
  const xt = [400,450,500,550,600,650,700].map(l => `<line x1="${X(l)}" x2="${X(l)}" y1="${y0}" y2="${y0 + 5}" style="stroke:var(--muted)"/><text x="${X(l)}" y="${y0 + 32}" text-anchor="middle" font-size="11" style="fill:var(--muted)">${l}</text>`).join("");
  const peaks = [[438,"S",1],[535,"M",2],[577,"L",3]].map(([l, n]) => `<line x1="${X(l)}" x2="${X(l)}" y1="${y1 - 6}" y2="${y0}" style="stroke:var(--faint)" stroke-dasharray="3 4"/><text x="${X(l)}" y="${y1 - 10}" text-anchor="middle" font-size="12" font-weight="800" style="fill:var(--ink)">${n}</text>`).join("");
  const stops = [[390,"#5a0090"],[420,"#4b1cff"],[450,"#2a4cff"],[475,"#0090ff"],[495,"#00c4c4"],[515,"#00c840"],[550,"#8ad400"],[575,"#f2e600"],[595,"#ffb000"],[615,"#ff6a00"],[650,"#f01800"],[700,"#b00000"],[720,"#7a0000"]].map(([l, c]) => `<stop offset="${((l - l0) / (l1 - l0) * 100).toFixed(1)}%" stop-color="${c}"/>`).join("");
  const marks = (opt.mark || []).map(l => { const c = coneAt(l); const dots = [["S","var(--c-s)"],["M","var(--c-m)"],["L","var(--c-l)"]].filter(([k]) => c[k] > 0).map(([k, col]) => `<line x1="${X(l)}" x2="${x0}" y1="${Y(c[k])}" y2="${Y(c[k])}" style="stroke:${col}" stroke-width="1.2" stroke-dasharray="4 3" opacity=".8"/><circle cx="${X(l)}" cy="${Y(c[k])}" r="4.5" style="fill:${col};stroke:var(--paper)" stroke-width="1.5"/>`).join(""); return `<line x1="${X(l)}" x2="${X(l)}" y1="${y1}" y2="${y0}" style="stroke:var(--ink)" stroke-width="1.6" stroke-dasharray="5 3"/>${dots}<text x="${X(l) + 5}" y="${y0 - 6}" font-size="11" font-weight="800" style="fill:var(--ink)">${l} nm</text>`; }).join("");
  return `<svg class="svgfig cones" viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafiek: percentage lichtabsorptie van de blauwe (S), groene (M) en rode (L) kegeltjes bij golflengten van 390 tot 720 nanometer">
    <defs><linearGradient id="spec${opt.id || ""}" x1="0" x2="1" y1="0" y2="0">${stops}</linearGradient></defs>
    <rect x="0" y="0" width="${W}" height="${H}" rx="10" style="fill:var(--paper)"/>
    ${grid}${peaks}
    <path d="${curve(1)}" fill="none" style="stroke:var(--c-s)" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="${curve(2)}" fill="none" style="stroke:var(--c-m)" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="${curve(3)}" fill="none" style="stroke:var(--c-l)" stroke-width="2.6" stroke-linejoin="round"/>
    <rect x="${x0}" y="${y0 + 6}" width="${x1 - x0}" height="12" fill="url(#spec${opt.id || ""})" rx="2"/>
    <line x1="${x0}" x2="${x1}" y1="${y0}" y2="${y0}" style="stroke:var(--ink)" stroke-width="1.4"/>
    ${xt}${marks}
    <text x="${x1}" y="${H - 4}" text-anchor="end" font-size="11" style="fill:var(--muted)">golflengte (nm)</text>
    <text x="10" y="14" font-size="11" style="fill:var(--muted)">% lichtabsorptie</text>
  </svg>`;
}

const SVGS = {
// Zenuwbanen van oog naar hersenen, bovenaanzicht
chiasma(){
  const eyes = [[135,150],[265,150]], R = 28, srcL = [72,30], srcR = [328,30];
  const hit = (src, e) => { const lx = e[0], ly = e[1] - R + 3; let dx = lx - src[0], dy = ly - src[1]; const n = Math.hypot(dx, dy); dx /= n; dy /= n; const ox = lx - e[0], oy = ly - e[1]; const b = 2 * (ox * dx + oy * dy), c = ox * ox + oy * oy - R * R; const t = (-b + Math.sqrt(b * b - 4 * c)) / 2; return [lx + t * dx, ly + t * dy, lx, ly]; };
  const ray = (src, e, col) => { const h = hit(src, e); return `<path d="M${src[0]} ${src[1]} L${h[2].toFixed(1)} ${h[3].toFixed(1)} L${h[0].toFixed(1)} ${h[1].toFixed(1)}" fill="none" style="stroke:${col}" stroke-width="1.6" stroke-dasharray="4 3"/>`; };
  const eye = ([x, y]) => `<circle cx="${x}" cy="${y}" r="${R}" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.6"/>
    <path d="M${x - R} ${y} A${R} ${R} 0 0 0 ${x} ${y + R}" fill="none" style="stroke:var(--blue)" stroke-width="5"/>
    <path d="M${x} ${y + R} A${R} ${R} 0 0 0 ${x + R} ${y}" fill="none" style="stroke:var(--rose)" stroke-width="5"/>
    <ellipse cx="${x}" cy="${y - R + 4}" rx="10" ry="4" style="fill:var(--blue-soft);stroke:var(--ink)" stroke-width="1"/>`;
  const fib = (d, col) => `<path d="${d}" fill="none" style="stroke:${col}" stroke-width="4" stroke-linecap="round"/>`;
  return `<svg class="svgfig" viewBox="0 0 400 372" role="img" aria-label="Bovenaanzicht van de zenuwbanen: het linkerdeel van een schilderij komt via beide ogen in de rechterhersenhelft">
  <rect x="0" y="0" width="400" height="372" rx="10" style="fill:var(--paper)"/>
  <rect x="50" y="22" width="150" height="18" style="fill:var(--rose)"/><rect x="200" y="22" width="150" height="18" style="fill:var(--blue)"/>
  <text x="125" y="35" text-anchor="middle" font-size="11" font-weight="800" style="fill:var(--paper)">linkerdeel</text>
  <text x="275" y="35" text-anchor="middle" font-size="11" font-weight="800" style="fill:var(--paper)">rechterdeel</text>
  <text x="200" y="14" text-anchor="middle" font-size="11" style="fill:var(--muted)">het schilderij (je kijkt naar boven)</text>
  ${ray(srcL, eyes[0], "var(--rose)")}${ray(srcL, eyes[1], "var(--rose)")}${ray(srcR, eyes[0], "var(--blue)")}${ray(srcR, eyes[1], "var(--blue)")}
  ${eye(eyes[0])}${eye(eyes[1])}
  ${fib("M117 170 C108 215 112 262 130 305", "var(--blue)")}
  ${fib("M153 170 C170 215 190 228 200 238 C214 252 238 278 262 305", "var(--rose)")}
  ${fib("M247 170 C230 215 210 228 200 238 C186 252 162 278 138 305", "var(--blue)")}
  ${fib("M283 170 C292 215 288 262 270 305", "var(--rose)")}
  <ellipse cx="128" cy="330" rx="76" ry="26" style="fill:var(--blue-soft);stroke:var(--blue)" stroke-width="1.5"/>
  <ellipse cx="272" cy="330" rx="76" ry="26" style="fill:var(--rose-soft);stroke:var(--rose)" stroke-width="1.5"/>
  <text x="128" y="334" text-anchor="middle" font-size="11.5" font-weight="800" style="fill:var(--ink)">linkerhersenhelft</text>
  <text x="272" y="334" text-anchor="middle" font-size="11.5" font-weight="800" style="fill:var(--ink)">rechterhersenhelft</text>
  <circle cx="200" cy="238" r="5" style="fill:var(--ink)"/>
  <text x="212" y="226" font-size="11" font-weight="700" style="fill:var(--ink)">chiasma opticum</text>
  <text x="200" y="168" text-anchor="middle" font-size="10.5" style="fill:var(--muted)">neuskant</text>
  <text x="200" y="181" text-anchor="middle" font-size="10.5" style="fill:var(--muted)">(kruist)</text>
  <text x="60" y="156" text-anchor="middle" font-size="10.5" style="fill:var(--muted)">slaapkant</text>
  <text x="340" y="156" text-anchor="middle" font-size="10.5" style="fill:var(--muted)">slaapkant</text>
  <text x="96" y="114" text-anchor="middle" font-size="10.5" style="fill:var(--muted)">linkeroog</text>
  <text x="306" y="114" text-anchor="middle" font-size="10.5" style="fill:var(--muted)">rechteroog</text>
  </svg>
  <p class="small muted">Bovenaanzicht. De lens keert het beeld om: het linkerdeel (roze) valt op de rechterhelft van beide netvliezen. Van het linkeroog is dat de neuskant (die kruist), van het rechteroog de slaapkant (die kruist niet). Beide komen aan in de rechterhersenhelft.</p>`;
},
// Kleurencirkel van Charles Blanc
blanc(){
  const cx = 160, cy = 150, R = 108, r = R / Math.sqrt(3);
  const P = (a, rad) => [cx + rad * Math.cos(a * Math.PI / 180), cy + rad * Math.sin(a * Math.PI / 180)];
  const tips = [[-90,"geel","#f1c21b"],[-30,"groen","#2f8a55"],[30,"blauw","#2f5db3"],[90,"violet","#7a49a3"],[150,"rood","#cf3b31"],[210,"oranje","#ee8822"]];
  const tri = tips.map(([a, n, c]) => { const p = P(a, R), q = P(a - 30, r), s = P(a + 30, r); return `<path d="M${p[0].toFixed(1)} ${p[1].toFixed(1)} L${q[0].toFixed(1)} ${q[1].toFixed(1)} L${s[0].toFixed(1)} ${s[1].toFixed(1)}Z" fill="${c}"/>`; }).join("");
  const hex = [0,60,120,180,240,300].map(a => P(a, r).map(v => v.toFixed(1)).join(" ")).join(" L");
  const labs = tips.map(([a, n]) => { const p = P(a, R + 20); return `<text x="${p[0].toFixed(1)}" y="${(p[1] + 4).toFixed(1)}" text-anchor="middle" font-size="12.5" font-weight="800" style="fill:var(--ink)">${n}</text>`; }).join("");
  const lines = [[-90,90],[-30,150],[30,210]].map(([a, b]) => { const p = P(a, R - 12), q = P(b, R - 12); return `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}" style="stroke:var(--ink)" stroke-width="1.2" stroke-dasharray="4 4" opacity=".55"/>`; }).join("");
  return `<svg class="svgfig" viewBox="0 0 320 300" style="max-width:20rem" role="img" aria-label="Kleurencirkel van Charles Blanc: geel tegenover violet, rood tegenover groen, blauw tegenover oranje">
  <rect width="320" height="300" rx="10" style="fill:var(--paper)"/>${tri}<path d="M${hex}Z" style="fill:var(--sand)"/>${lines}${labs}</svg>
  <p class="small muted">Kleurencirkel van Charles Blanc (verf), zelf nagetekend. Primair: geel, rood, blauw. Tegenover elkaar (stippellijn) staan de complementaire kleuren.</p>`;
},
// Kleurencirkel van licht
lichtcirkel(){
  const cx = 160, cy = 150, R = 95;
  const segs = [[-90,"rood","#ff2a1f"],[-30,"geel","#ffe11a"],[30,"groen","#22c33d"],[90,"cyaan","#1fd0e0"],[150,"blauw","#2a4bff"],[210,"magenta","#e62ad8"]];
  const P = (a, rad) => [cx + rad * Math.cos(a * Math.PI / 180), cy + rad * Math.sin(a * Math.PI / 180)];
  const wedges = segs.map(([a, n, c]) => { const p = P(a - 30, R), q = P(a + 30, R); return `<path d="M${cx} ${cy} L${p[0].toFixed(1)} ${p[1].toFixed(1)} A${R} ${R} 0 0 1 ${q[0].toFixed(1)} ${q[1].toFixed(1)}Z" fill="${c}"/>`; }).join("");
  const labs = segs.map(([a, n]) => { const p = P(a, R + 20); return `<text x="${p[0].toFixed(1)}" y="${(p[1] + 4).toFixed(1)}" text-anchor="middle" font-size="12.5" font-weight="800" style="fill:var(--ink)">${n}</text>`; }).join("");
  const lines = [[-90,90],[-30,150],[30,210]].map(([a, b]) => { const p = P(a, R - 10), q = P(b, R - 10); return `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}" stroke="#ffffff" stroke-width="1.6" stroke-dasharray="4 4"/>`; }).join("");
  return `<svg class="svgfig" viewBox="0 0 320 300" style="max-width:20rem" role="img" aria-label="Kleurencirkel van licht: rood tegenover cyaan, geel tegenover blauw, groen tegenover magenta">
  <rect width="320" height="300" rx="10" style="fill:var(--paper)"/>${wedges}<circle cx="${cx}" cy="${cy}" r="26" fill="#ffffff"/>${lines}${labs}</svg>
  <p class="small muted">Kleurencirkel van licht (additief). Primair: rood, groen, blauw. Complementair: rood-cyaan, groen-magenta, blauw-geel.</p>`;
},
// Dichtheid van staafjes en kegeltjes (vereenvoudigd naar figuur 26)
dichtheid(){
  const x0 = 52, x1 = 470, y0 = 228, y1 = 22, d0 = -70, d1 = 90, v1 = 180;
  const X = d => x0 + (d - d0) / (d1 - d0) * (x1 - x0), Y = v => y0 - v / v1 * (y0 - y1);
  const st1 = [[-70,30],[-60,70],[-50,82],[-40,100],[-30,122],[-20,150],[-15,142],[-10,95],[-5,40],[0,0],[5,45],[10,112],[14,138]];
  const st2 = [[18.5,150],[20,155],[25,152],[30,142],[40,126],[50,110],[60,95],[70,76],[80,58],[90,48]];
  const ke1 = [[-70,8],[-40,6],[-20,8],[-10,14],[-5,40],[-2,105],[0,165],[2,105],[5,40],[10,14],[14,10]];
  const ke2 = [[18.5,9],[30,7],[50,6],[70,9],[90,16]];
  const path = pts => pts.map((p, i) => (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1)).join(" ");
  const yt = [0,40,80,120,160].map(v => `<line x1="${x0}" x2="${x1}" y1="${Y(v)}" y2="${Y(v)}" style="stroke:var(--grid)"/><text x="${x0 - 7}" y="${Y(v) + 4}" text-anchor="end" font-size="11" style="fill:var(--muted)">${v}</text>`).join("");
  const xt = [-60,-40,-20,0,20,40,60,80].map(d => `<line x1="${X(d)}" x2="${X(d)}" y1="${y0}" y2="${y0 + 5}" style="stroke:var(--muted)"/><text x="${X(d)}" y="${y0 + 18}" text-anchor="middle" font-size="11" style="fill:var(--muted)">${Math.abs(d)}</text>`).join("");
  return `<svg class="svgfig" viewBox="0 0 490 286" role="img" aria-label="Vereenvoudigde grafiek van de dichtheid van staafjes en kegeltjes over het netvlies">
  <rect width="490" height="286" rx="10" style="fill:var(--paper)"/>${yt}
  <rect x="${X(14.5)}" y="${y1}" width="${X(18.2) - X(14.5)}" height="${y0 - y1}" style="fill:var(--sand)"/>
  <text x="${X(16.3)}" y="${y1 - 6}" text-anchor="middle" font-size="11" font-weight="700" style="fill:var(--ink)">blinde vlek</text>
  <path d="${path(st1)}" fill="none" style="stroke:var(--ink)" stroke-width="2.4"/><path d="${path(st2)}" fill="none" style="stroke:var(--ink)" stroke-width="2.4"/>
  <path d="${path(ke1)}" fill="none" style="stroke:var(--c-l)" stroke-width="2.4"/><path d="${path(ke2)}" fill="none" style="stroke:var(--c-l)" stroke-width="2.4"/>
  <text x="${X(40)}" y="${Y(140)}" font-size="12" font-weight="800" style="fill:var(--ink)">staafjes</text>
  <text x="${X(-55)}" y="${Y(22)}" font-size="12" font-weight="800" style="fill:var(--c-l)">kegeltjes</text>
  <line x1="${x0}" x2="${x1}" y1="${y0}" y2="${y0}" style="stroke:var(--ink)" stroke-width="1.4"/>${xt}
  <text x="${X(0)}" y="${y0 + 33}" text-anchor="middle" font-size="11" font-weight="800" style="fill:var(--ink)">gele vlek</text>
  <text x="${x0}" y="${y0 + 33}" font-size="11" style="fill:var(--muted)">oorkant</text>
  <text x="${x1}" y="${y0 + 33}" text-anchor="end" font-size="11" style="fill:var(--muted)">neuskant</text>
  <text x="${x1}" y="${y0 + 50}" text-anchor="end" font-size="10.5" style="fill:var(--muted)">afstand tot de gele vlek (graden)</text>
  <text x="8" y="14" font-size="11" style="fill:var(--muted)">dichtheid (× 10³ per mm²)</text>
  </svg>
  <p class="small muted">Eigen schematische weergave, vereenvoudigd naar figuur 26 van de module (Østenberg, 1935). Getallen zijn afgerond.</p>`;
},
// Fe3+ met vier watermoleculen (modeltekening)
fewater(){
  const cx = 150, cy = 120;
  const w = (dx, dy) => { const ox = cx + dx * 62, oy = cy + dy * 62; const px = -dy, py = dx; const h1 = [ox + dx * 20 + px * 16, oy + dy * 20 + py * 16], h2 = [ox + dx * 20 - px * 16, oy + dy * 20 - py * 16];
    return `<line x1="${cx + dx * 22}" y1="${cy + dy * 22}" x2="${ox - dx * 15}" y2="${oy - dy * 15}" style="stroke:var(--muted)" stroke-width="2" stroke-dasharray="4 3"/>
    <line x1="${ox}" y1="${oy}" x2="${h1[0]}" y2="${h1[1]}" style="stroke:var(--ink)" stroke-width="2"/><line x1="${ox}" y1="${oy}" x2="${h2[0]}" y2="${h2[1]}" style="stroke:var(--ink)" stroke-width="2"/>
    <circle cx="${ox}" cy="${oy}" r="14" fill="#d6544a"/><text x="${ox}" y="${oy + 4.5}" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">O</text>
    <circle cx="${h1[0]}" cy="${h1[1]}" r="9" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.4"/><text x="${h1[0]}" y="${h1[1] + 4}" text-anchor="middle" font-size="10.5" font-weight="800" style="fill:var(--ink)">H</text>
    <circle cx="${h2[0]}" cy="${h2[1]}" r="9" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.4"/><text x="${h2[0]}" y="${h2[1] + 4}" text-anchor="middle" font-size="10.5" font-weight="800" style="fill:var(--ink)">H</text>`; };
  return `<svg class="svgfig" viewBox="0 0 300 240" style="max-width:18rem" role="img" aria-label="Modeltekening: Fe3+ in het midden met vier watermoleculen, O-atomen naar het ion gericht">
  <rect width="300" height="240" rx="10" style="fill:var(--paper)"/>
  ${w(0,-1)}${w(1,0)}${w(0,1)}${w(-1,0)}
  <circle cx="${cx}" cy="${cy}" r="21" style="fill:var(--ochre-soft);stroke:var(--ochre)" stroke-width="2"/>
  <text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="13" font-weight="800" style="fill:var(--ink)">Fe³⁺</text>
  </svg><p class="small muted">De O-atomen (δ⁻, met vrije elektronenparen) wijzen naar het positieve ion. De stippellijn is de binding met het elektronenpaar van O.</p>`;
},
// Lengtedoorsnede van het oog (schematisch)
oog(){
  const lab = (x, y, tx, ty, t, anchor) => `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" style="stroke:var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.2" style="fill:var(--ink)"/><text x="${tx + (anchor === "end" ? -5 : 5)}" y="${ty + 4.5}" text-anchor="${anchor || "start"}" font-size="13" style="fill:var(--ink)">${t}</text>`;
  return `<svg class="svgfig" viewBox="0 0 560 320" role="img" aria-label="Schematische lengtedoorsnede van het oog met hoornvlies, iris, pupil, ooglens, lensbandjes, glasachtig lichaam, netvlies, gele vlek, blinde vlek en oogzenuw">
  <rect width="560" height="320" rx="10" style="fill:var(--paper)"/>
  <path d="M398 190 L478 214 L478 244 L392 210 Z" style="fill:var(--sand);stroke:var(--ink)" stroke-width="1.6"/>
  <circle cx="300" cy="160" r="110" style="fill:var(--blue-mist);stroke:var(--ink)" stroke-width="3"/>
  <path d="M216 89 Q168 160 216 231" style="fill:var(--blue-mist);stroke:var(--ink)" stroke-width="2.4"/>
  <path d="M338 57 A110 110 0 0 1 338 263" fill="none" style="stroke:var(--rose)" stroke-width="8"/>
  <rect x="220" y="100" width="7" height="40" rx="2" style="fill:var(--ochre)"/><rect x="220" y="180" width="7" height="40" rx="2" style="fill:var(--ochre)"/>
  <path d="M242 126 L228 106 M242 194 L228 214" style="stroke:var(--muted)" stroke-width="1.4"/>
  <ellipse cx="243" cy="160" rx="13" ry="35" style="fill:var(--paper);stroke:var(--ink)" stroke-width="1.8"/>
  <circle cx="409" cy="160" r="6" style="fill:var(--ochre)"/>
  <circle cx="403" cy="197" r="6" style="fill:var(--ink)"/>
  <text x="315" y="165" text-anchor="middle" font-size="13" style="fill:var(--muted)">glasachtig lichaam</text>
  ${lab(196,118,120,52,"hoornvlies","end")}
  ${lab(223,112,120,92,"iris","end")}
  ${lab(212,160,120,160,"pupil (opening)","end")}
  ${lab(240,188,120,226,"ooglens","end")}
  ${lab(233,207,120,262,"lensbandjes","end")}
  ${lab(300,50,330,22,"harde oogrok","start")}
  ${lab(372,78,432,46,"netvlies","start")}
  ${lab(409,160,450,150,"gele vlek","start")}
  ${lab(403,197,450,186,"blinde vlek","start")}
  ${lab(470,236,486,276,"oogzenuw","start")}
  </svg><p class="small muted">Schematische lengtedoorsnede (zelf getekend). Het licht komt van links binnen via hoornvlies, pupil en lens en vormt een omgekeerd beeld op het netvlies.</p>`;
}
};

// ======================================================================
// INVULVELDEN EN AUTOMATISCH NAKIJKEN (open vragen en proeftoets)
// ======================================================================
const fieldsOf = p => p.fields || [{f:"text"}];
function fieldsHTML(p, v, idp, locked){
  v = v || {};
  return fieldsOf(p).map((fd, i) => {
    const dis = locked ? "disabled" : "";
    if (fd.f === "choice") return `<div class="choice" role="radiogroup" aria-label="${esc(fd.label || "Keuze")}"><span class="lbl">${esc(fd.label || "Keuze")}:</span>${fd.opts.map((o, j) => `<label><input type="radio" name="${idp}-c" value="${j}" data-fk="c" ${String(v.c) === String(j) ? "checked" : ""} ${dis}>${esc(o)}</label>`).join("")}</div>`;
    if (fd.f === "cones") return `<div class="conesin">
      <label for="${idp}-lam">Golflengte</label><span class="in"><input id="${idp}-lam" data-fk="lam" inputmode="decimal" value="${esc(v.lam || "")}" ${dis}> nm</span>
      <label class="ll" for="${idp}-L">Rood (L)</label><span class="in"><input id="${idp}-L" data-fk="L" inputmode="decimal" value="${esc(v.L || "")}" ${dis}> %</span>
      <label class="lm" for="${idp}-M">Groen (M)</label><span class="in"><input id="${idp}-M" data-fk="M" inputmode="decimal" value="${esc(v.M || "")}" ${dis}> %</span>
      <label class="ls" for="${idp}-S">Blauw (S)</label><span class="in"><input id="${idp}-S" data-fk="S" inputmode="decimal" value="${esc(v.S || "")}" ${dis}> %</span>
    </div>`;
    if (fd.f === "num") return numInHTML(fd, v, idp, locked);
    return `<textarea id="${idp}-t${i}" data-fk="t${i}" placeholder="${esc(fd.ph || "Typ hier je antwoord...")}" ${locked ? "readonly" : ""} aria-label="Jouw antwoord">${esc(v["t" + i] || "")}</textarea>`;
  }).join("");
}
function numInHTML(fd, v, idp, locked){
  const dis = locked ? "disabled" : "";
  return `<div class="numin"><span>${esc(fd.label || "Antwoord")} =</span><input id="${idp}-n" data-fk="n" inputmode="decimal" placeholder="getal" value="${esc(v.n || "")}" ${dis} aria-label="Getal">${fd.sci ? `<span class="x">× 10^</span><input id="${idp}-ne" class="exp" data-fk="ne" inputmode="numeric" placeholder="macht" value="${esc(v.ne || "")}" ${dis} aria-label="Macht van 10">` : ""}<span class="u">${esc(fd.unit || "")}</span></div>`;
}
function numValue(fd, v){ let x = num(v.n); if (isNaN(x)) return NaN; if (fd.sci) { const e = num(v.ne); if (!isNaN(e)) x = x * Math.pow(10, e); } return x; }
function numOk(fd, v){ const x = numValue(fd, v); if (isNaN(x)) return false; if (fd.range) return x >= fd.range[0] && x <= fd.range[1]; return Math.abs(x - fd.ans) <= Math.abs(fd.ans) * (fd.tol || 0.03); }
function autoEval(p, v){
  v = v || {}; const fl = fieldsOf(p);
  const ch = fl.find(f => f.f === "choice"), co = fl.find(f => f.f === "cones"), nu = fl.find(f => f.f === "num");
  const lam = num(v.lam), c = co && lam >= 380 && lam <= 760 ? coneAt(lam) : null;
  return p.c.map(cr => {
    switch (cr.auto) {
      case "choice": return ch ? String(v.c) === String(ch.ok) : false;
      case "lambda": { const b = BANDS[co && co.color]; return !!(b && lam >= b[0] && lam <= b[1]); }
      case "cones-types": { if (!c) return false; return ["S","M","L"].every(k => { const real = c[k]; if (real >= 1 && real <= 8) return true; const her = num(v[k]); const h = isNaN(her) ? 0 : her; return (real >= 5) === (h >= 3); }); }
      case "cones-pct": { if (!c) return false; return ["S","M","L"].every(k => { const her = num(v[k]); const h = isNaN(her) ? 0 : her; return Math.abs(h - c[k]) <= 8; }); }
      case "num": return nu ? numOk(nu, v) : false;
      default: return null;
    }
  });
}
function autoNote(p, v, cr){
  if (cr.auto === "cones-pct" || cr.auto === "cones-types") { const lam = num(v && v.lam); const c = lam >= 380 && lam <= 760 ? coneAt(lam) : null; return c ? `bij ${lam} nm geeft de grafiek rood ${c.L}%, groen ${c.M}%, blauw ${c.S}%.` : "geen geldige golflengte ingevuld."; }
  if (cr.auto === "lambda") { const co = fieldsOf(p).find(f => f.f === "cones"); const b = co && BANDS[co.color]; return b ? `goed gerekend van ${b[0]} tot ${b[1]} nm.` : ""; }
  return "";
}
function critListHTML(p, checks, v, key){
  return `<ul class="crit">${p.c.map((c, i) => `<li><label><input type="checkbox" data-crit="${key}:${i}" ${checks[i] ? "checked" : ""}><span>${esc(c.t)}${c.auto ? `<span class="auto">Automatisch nagekeken${autoNote(p, v, c) ? ": " + esc(autoNote(p, v, c)) : "."} Klopt het niet? Pas het vinkje aan.</span>` : ""}</span><span class="pt">+${c.p} pt</span></label></li>`).join("")}</ul>`;
}
const partMax = p => p.c.reduce((a, c) => a + c.p, 0);
const partGot = (p, ch) => p.c.reduce((a, c, i) => a + (ch && ch[i] ? c.p : 0), 0);
function bindFields(root, getV, onChange){
  $$("[data-fk]", root).forEach(el => {
    const h = () => { const box = el.closest("[data-part]"); if (!box) return; const v = getV(box.dataset.part); if (!v) return; v[el.dataset.fk] = el.type === "radio" ? el.value : el.value; save(); if (onChange) onChange(box.dataset.part, el); };
    el.addEventListener(el.type === "radio" ? "change" : "input", h);
  });
}

// ======================================================================
// HOOFDSCHERM
// ======================================================================
function courseCard(id){
  const C = COURSES[id], st = loadStore(id), now = Date.now();
  const n = C.FLASH.length, m = C.FLASH.filter(c => st.cards[c.id] && st.cards[c.id].box >= 3).length;
  const due = C.FLASH.filter(c => st.cards[c.id] && st.cards[c.id].due <= now).length;
  const ok = C.MC.filter(q => st.mc[q.id] && st.mc[q.id].last).length;
  const d = daysUntil(st.examDate);
  const last = st.exams[st.exams.length - 1];
  let when = "Nog geen toetsdatum ingevuld";
  if (d !== null) when = d > 1 ? `Nog ${d} dagen tot de toets` : d === 1 ? "Morgen toets!" : d === 0 ? "Vandaag toets. Succes!" : "De toetsdatum is geweest";
  return `<a class="course" data-accent="${esc(C.INFO.accent || "blauw")}" href="#${id}-start">
    <div class="course-top"><span class="mark txt" aria-hidden="true">${esc(C.INFO.short)}</span><span class="tag">${esc(C.INFO.code)}</span></div>
    <h2>${esc(C.INFO.name)}</h2>
    <div class="course-stats">
      <span class="st"><span class="bar"><i style="width:${n ? Math.round(100 * m / n) : 0}%"></i></span><span class="tnum">${m}/${n} kaarten onder de knie</span></span>
      <span class="st"><span class="bar good"><i style="width:${C.MC.length ? Math.round(100 * ok / C.MC.length) : 0}%"></i></span><span class="tnum">${ok}/${C.MC.length} oefenvragen goed</span></span>
    </div>
    <ul class="course-meta small">
      <li>${esc(when)}</li>
      <li>${due ? `${due} ${due === 1 ? "kaart" : "kaarten"} klaar om te herhalen` : "Geen herhalingen open"}</li>
      <li>${last ? `Laatste proeftoets: ${comma(last.score)}/${last.total} punten, cijfer ${gradeStr(last.grade)}` : "Nog geen proeftoets gedaan"}</li>
    </ul>
    <span class="btn btn-primary">Oefen ${esc(C.INFO.short)}</span>
  </a>`;
}
function viewHome(){
  return `<div class="wrap">
    <header class="hello hello-band">
      <p class="eyebrow">5 havo · studietrainer</p>
      <h1>Hoi ${NAME}</h1>
      <p class="lede">Kies het vak dat je wilt oefenen. Je voortgang wordt per vak apart bewaard, in de browser van dit apparaat.</p>
    </header>
    <div class="courses">${ORDER.map(courseCard).join("")}
      <div class="course add"><h2 style="font-size:1.05rem">Nog een vak?</h2><p class="small">Vraag Tim om een nieuw vak toe te voegen. Elk vak krijgt hier een eigen kaart en kleur.</p></div>
    </div>
  </div>`;
}

// ======================================================================
// START (per vak)
// ======================================================================
function viewStart(){
  const due = FLASH.filter(isDue).length;
  const neu = FLASH.filter(c => !cardState(c)).length;
  const d = daysUntil(S.examDate);
  let cd;
  if (d === null) cd = `<p class="eyebrow">Toetsdatum</p><p class="small muted">Vul de datum in, dan tellen we af.</p>`;
  else if (d > 1) cd = `<p class="eyebrow">Nog te gaan</p><p class="big tnum">${d} dagen</p>`;
  else if (d === 1) cd = `<p class="eyebrow">Morgen</p><p class="big">Toets!</p>`;
  else if (d === 0) cd = `<p class="eyebrow">Vandaag</p><p class="big">Succes!</p>`;
  else cd = `<p class="eyebrow">Toets</p><p class="small muted">Deze datum is al geweest.</p>`;
  const total = FLASH.length, mast = FLASH.filter(mastered).length, ms = mcStats(MC);
  const lastExam = S.exams[S.exams.length - 1];
  const sub = d === 0 ? "Vandaag is het zover. Lees de leerpunten nog even rustig door." : `Module ‘Van Gogh onder de loep’, hoofdstuk 4 en 5. Je hebt ${mast} van de ${total} kaarten onder de knie en ${ms.ok} van de ${ms.total} oefenvragen goed.`;
  const reviewN = due + Math.min(neu, 20);
  const note = INFO.startNote;
  return `<div class="wrap">
    <header class="hello">
      <p class="eyebrow">${esc(INFO.short)} · ${esc(INFO.code)}</p>
      <h1>${esc(INFO.name)}</h1>
      <p class="lede">${esc(sub)}</p>
    </header>
    <section class="today" aria-label="Vandaag">
      <div class="today-main">
        <p class="eyebrow" style="color:inherit;opacity:.85">Vandaag herhalen</p>
        <p class="big tnum">${reviewN}</p>
        <p>${due ? (due === 1 ? "1 kaart staat klaar om te herhalen" : `${due} kaarten staan klaar om te herhalen`) : "Geen herhalingen open"}${neu ? `, plus ${Math.min(neu, 20)} nieuwe.` : "."}</p>
        <a class="btn" href="${L("kaarten")}" data-go-review>${reviewN ? "Start met herhalen" : "Bekijk alle kaarten"}</a>
      </div>
      <div class="today-side">
        <div class="panel countdown stack" style="gap:.45rem">${cd}
          <label class="small muted" for="examDate-${CID}">Datum van de toets</label>
          <input type="date" id="examDate-${CID}" data-examdate value="${esc(S.examDate)}">
        </div>
        <div class="panel stack" style="gap:.35rem">
          <p class="eyebrow">Laatste proeftoets</p>
          ${lastExam ? `<p><b class="tnum">cijfer ${gradeStr(lastExam.grade)}</b> <span class="muted small tnum">· ${comma(lastExam.score)}/${lastExam.total} punten</span></p>` : `<p class="small muted">Nog niet gedaan.</p>`}
          <a class="btn-link small" href="${L("toets")}">${lastExam ? "Nog een keer" : "Doe een proeftoets"}</a>
        </div>
      </div>
    </section>
    <section class="stack">
      <h2>Oefenen</h2>
      <div class="modes">
        <a class="mode" href="${L("kaarten")}"><h3>${icon("kaarten")}Flashcards</h3><p>${FLASH.length} kaarten. Wat je fout hebt, komt vaker terug.</p></a>
        <a class="mode" href="${L("oefenen")}"><h3>${icon("oefenen")}Oefenvragen</h3><p>${MC.length} vragen in de stijl van de oefentoets, met uitleg bij elk antwoord.</p></a>
        <a class="mode" href="${L("toets")}"><h3>${icon("toets")}Proeftoets</h3><p>Vier opgaven zoals de oefentoets, met cijfer en score per onderwerp.</p></a>
        <a class="mode" href="${L("open")}"><h3>${icon("open")}Open vragen</h3><p>${OPEN.length} opgaven, nakijken met een correctiemodel.</p></a>
        <a class="mode" href="${L("sprint")}"><h3>${icon("sprint")}Sprint</h3><p>${SPRINT.length} snelle rondes: ${esc(INFO.sprintBlurb)}.</p></a>
        <a class="mode" href="${L("naslag")}"><h3>${icon("naslag")}Naslag</h3><p>Alle overzichten, schema's en de kegeltjes-aflezer.</p></a>
      </div>
    </section>
    ${note ? `<div class="callout" role="note"><b>${esc(note.t)}</b><p>${note.html} <a href="${L("leerpunten")}">Alle leerpunten</a></p></div>` : ""}
    <section class="stack">
      <div class="row between"><h2>Voortgang per onderwerp</h2><span class="small muted">kaarten onder de knie · vragen goed</span></div>
      <div class="panel topics" style="padding-block:.35rem">
        ${TK.map(t => {
          const cs = topicCards(t), m = cs.filter(mastered).length, qs = topicMc(t), st = mcStats(qs);
          const pc = cs.length ? Math.round(100 * m / cs.length) : 0, pq = qs.length ? Math.round(100 * st.ok / qs.length) : 0;
          return `<div class="tp"><span class="nm">${esc(TOPICS[t].n)}</span><span class="tt">${esc(TOPICS[t].t)}</span>
            <span class="st"><span class="bar"><i style="width:${pc}%"></i></span><span class="tnum">${m}/${cs.length}</span></span>
            <span class="st">${qs.length ? `<span class="bar good"><i style="width:${pq}%"></i></span><span class="tnum">${st.ok}/${qs.length}</span>` : `<span>alleen kaarten</span>`}</span></div>`;
        }).join("")}
      </div>
    </section>
  </div>`;
}
function bindStart(){
  const inp = $("[data-examdate]"); if (inp) inp.addEventListener("change", () => { S.examDate = inp.value; save(); render(); });
  const go = $("[data-go-review]"); if (go) go.addEventListener("click", () => { cardSess = null; cardFilter = {t:"all", mode: FLASH.some(isDue) || FLASH.some(c => !cardState(c)) ? "herhaal" : "alles"}; });
}

// ======================================================================
// FLASHCARDS (herhaalsysteem met vakjes)
// ======================================================================
let cardFilter = {t:"all", mode:"herhaal"}, cardSess = null;
function buildCardQueue(){
  const pool = topicCards(cardFilter.t); let q;
  if (cardFilter.mode === "herhaal") q = shuffle(pool.filter(isDue)).concat(pool.filter(c => !cardState(c)).slice(0, 20));
  else if (cardFilter.mode === "moeilijk") q = shuffle(pool.filter(c => cardState(c) && cardState(c).box <= 1));
  else q = shuffle(pool);
  cardSess = {queue:q, i:0, flipped:false, tally:{1:0,2:0,3:0}, requeued:{}, streak:0};
}
function viewCards(){
  if (!cardSess) buildCardQueue();
  const s = cardSess, c = s.queue[s.i];
  const modeBtn = (k, t) => `<button data-mode="${k}" aria-pressed="${cardFilter.mode === k}">${t}</button>`;
  const hard = FLASH.filter(c => cardState(c) && cardState(c).box <= 1).length;
  const head = `<header class="stack" style="gap:.5rem"><p class="eyebrow">${esc(INFO.short)} · Flashcards</p><h1>Kaarten</h1>
    <p class="muted">Denk eerst zelf na, draai dan om en geef eerlijk aan hoe goed je het wist. Wat je niet wist, komt in dezelfde ronde nog eens terug en morgen weer. Wat je wel wist, zie je steeds later pas terug.</p></header>
    <div class="toolbar"><div class="seg" role="group" aria-label="Soort ronde">${modeBtn("herhaal","Herhalen")}${modeBtn("alles","Alle kaarten")}${modeBtn("moeilijk",`Moeilijke (${hard})`)}</div>${topicChips(cardFilter.t, "ct")}</div>`;
  if (!s.queue.length) {
    const msg = cardFilter.mode === "moeilijk" ? "Er zijn (nog) geen kaarten die je lastig vond." : cardFilter.mode === "herhaal" ? "Niets meer te herhalen in deze selectie. Lekker bezig!" : "Geen kaarten in deze selectie.";
    return `<div class="wrap">${head}<div class="empty">${msg}<br><br><button class="btn btn-ghost" data-mode-switch="alles">Oefen alle kaarten</button></div></div>`;
  }
  if (!c) {
    const t = s.tally;
    return `<div class="wrap">${head}<div class="panel end"><p class="eyebrow">Ronde klaar</p><p class="big">${t[3] >= (t[1] + t[2] + t[3]) * .8 ? "Bijna alles wist je!" : "Goed gedaan, Anne."}</p>
      <p class="muted">${t[3]} wist je, ${t[2]} twijfel, ${t[1]} nog niet. Kaarten die je niet wist, komen morgen weer langs.</p>
      <div class="row" style="justify-content:center"><button class="btn btn-primary" data-again>Nog een ronde</button><a class="btn btn-ghost" href="${L("oefenen")}">Naar oefenvragen</a></div></div></div>`;
  }
  const st = cardState(c);
  const badge = !st ? "nieuw" : st.box >= 3 ? "zit erin" : st.box <= 1 ? "lastig" : "bijna";
  return `<div class="wrap">${head}
    <div class="stack">
      <div class="fc" id="fc" tabindex="0" role="button" aria-label="${s.flipped ? "Antwoord zichtbaar" : "Draai de kaart om"}">
        <div class="fc-meta"><span class="tag">${esc(tName(c.t))} · ${badge}</span><span class="small muted tnum">${s.i + 1} / ${s.queue.length}</span></div>
        <div class="fc-q">${fmt(c.q)}</div>
        ${s.flipped ? `<div class="fc-a">${fmt(c.a)}</div>` : `<div class="fc-hint">Tik op de kaart of druk op <kbd>spatie</kbd> om het antwoord te zien</div>`}
      </div>
      ${s.flipped ? `<div class="rate" role="group" aria-label="Hoe goed wist je het?">
        <button class="r1" data-rate="1">Wist ik niet<small><kbd>1</kbd></small></button>
        <button class="r2" data-rate="2">Twijfel<small><kbd>2</kbd></small></button>
        <button class="r3" data-rate="3">Wist ik<small><kbd>3</kbd></small></button></div>` : ""}
    </div></div>`;
}
function flipCard(){ if (!cardSess || !cardSess.queue[cardSess.i] || cardSess.flipped) return; cardSess.flipped = true; render(); }
function rateCard(r){
  const s = cardSess, c = s && s.queue[s.i]; if (!c || !s.flipped) return;
  const st = S.cards[c.id] || {box:0, due:0, n:0}, now = Date.now(), INT = [0,1,2,4,8,16];
  if (r === 1) { st.box = 1; st.due = now; if ((s.requeued[c.id] || 0) < 2) { s.requeued[c.id] = (s.requeued[c.id] || 0) + 1; s.queue.splice(Math.min(s.i + 4, s.queue.length), 0, c); } }
  else if (r === 2) { st.box = Math.max(1, st.box); st.due = now + DAY; }
  else { st.box = Math.min(5, st.box + 1); st.due = now + INT[st.box] * DAY; }
  st.n = (st.n || 0) + 1; S.cards[c.id] = st; save();
  s.tally[r]++; s.i++; s.flipped = false;
  if (r === 3) { s.streak++; if (STREAK[s.streak]) toast(`<span class="h">${heart}</span> ${STREAK[s.streak]}`); else if (Math.random() < .35) toast(pick(PRAISE)); } else s.streak = 0;
  render(); const fc = $("#fc"); if (fc) fc.focus({preventScroll:true});
}
function bindCards(){
  $$("[data-mode]").forEach(b => b.addEventListener("click", () => { cardFilter.mode = b.dataset.mode; buildCardQueue(); render(); }));
  $$("[data-ct]").forEach(b => b.addEventListener("click", () => { cardFilter.t = b.dataset.ct; buildCardQueue(); render(); }));
  const sw = $("[data-mode-switch]"); if (sw) sw.addEventListener("click", () => { cardFilter.mode = "alles"; buildCardQueue(); render(); });
  const ag = $("[data-again]"); if (ag) ag.addEventListener("click", () => { buildCardQueue(); render(); });
  const fc = $("#fc"); if (fc) fc.addEventListener("click", flipCard);
  $$("[data-rate]").forEach(b => b.addEventListener("click", () => rateCard(Number(b.dataset.rate))));
}
function keyCards(e){
  if (e.key === " " || e.key === "Enter") { if (cardSess && !cardSess.flipped) { e.preventDefault(); flipCard(); } }
  else if (["1","2","3"].includes(e.key)) { e.preventDefault(); rateCard(Number(e.key)); }
}

// ======================================================================
// OEFENVRAGEN (meerkeuze en rekenvragen)
// ======================================================================
let pracFilter = {t:"all", wrong:false}, prac = null;
function prepQuestion(q){ return {q, order: q.type === "num" ? [] : shuffle(q.o.map((_, i) => i))}; }
function buildPrac(){
  let pool = topicMc(pracFilter.t);
  if (pracFilter.wrong) pool = pool.filter(q => S.mc[q.id] && !S.mc[q.id].last);
  prac = {queue: shuffle(pool).map(prepQuestion), i:0, chosen:null, numv:{}, ok:0, bad:0, streak:0, msg:""};
}
function mcExplainHTML(item, chosen){
  const q = item.q, right = chosen === q.a;
  const why = item.order.map((oi, pos) => ({oi, pos})).filter(o => o.oi !== q.a);
  return `<div class="explain"><span class="verdict ${right ? "good" : "bad"}">${esc(prac.msg)}</span>
    <p><b>Waarom ${LETTERS[item.order.indexOf(q.a)]} goed is:</b> ${fmt(q.e)}</p>
    ${q.x ? `<p class="small" style="font-weight:800;margin-top:.2rem">Waarom de andere antwoorden niet kloppen</p>
    <ul class="whynot">${why.map(o => `<li class="${o.oi === chosen ? "mine" : ""}"><span class="l">${LETTERS[o.pos]}</span><span>${o.oi === chosen ? "<em>Jouw keuze.</em> " : ""}${fmt(q.x[o.oi] || "")}</span></li>`).join("")}</ul>` : ""}
  </div>`;
}
function questionHTML(item, chosen, reveal){
  const q = item.q;
  const opts = item.order.map((oi, pos) => {
    let cls = "";
    if (reveal) { if (oi === q.a) cls = "ok" + (chosen === q.a ? " pop" : ""); else if (oi === chosen) cls = "no"; }
    else if (oi === chosen) cls = "sel";
    return `<li><button class="opt ${cls}" data-opt="${oi}" ${reveal ? "disabled" : ""}><span class="l">${LETTERS[pos]}</span><span>${fmt(q.o[oi])}</span></button></li>`;
  }).join("");
  return `<div class="q"><div class="row">${topicTag(q.t)}${q.k ? `<span class="tag sand">${esc(q.k)}</span>` : ""}</div>
    ${figHTML(q.fig)}<p class="q-text">${fmt(q.q)}</p><ul class="opts">${opts}</ul></div>`;
}
function viewPractice(){
  if (!prac) buildPrac();
  const wrongN = MC.filter(q => S.mc[q.id] && !S.mc[q.id].last).length;
  const head = `<header class="stack" style="gap:.5rem"><p class="eyebrow">${esc(INFO.short)} · Oefenvragen</p><h1>Oefenvragen</h1>
    <p class="muted">Vragen over dezelfde stof en in dezelfde stijl als de oefentoets: structuurformules, schilderijen, de kegeltjesgrafiek en rekenen met licht. Na elk antwoord zie je waarom het goede antwoord goed is en waarom de andere niet kloppen.</p></header>
    <div class="toolbar"><div class="seg" role="group" aria-label="Selectie"><button data-pw="0" aria-pressed="${!pracFilter.wrong}">Alle vragen</button><button data-pw="1" aria-pressed="${pracFilter.wrong}">Mijn fouten (${wrongN})</button></div>
    ${topicChips(pracFilter.t, "pt", TK.filter(t => MC.some(q => q.t === t)))}</div>`;
  if (!prac.queue.length) return `<div class="wrap">${head}<div class="empty">${pracFilter.wrong ? "Geen openstaande fouten in deze selectie. Mooi zo!" : "Geen vragen in deze selectie."}</div></div>`;
  const item = prac.queue[prac.i];
  if (!item) {
    const tot = prac.ok + prac.bad;
    return `<div class="wrap">${head}<div class="panel end"><p class="eyebrow">Klaar</p><p class="big tnum">${prac.ok} van ${tot} goed</p>${tot && prac.ok / tot >= .8 ? `<p class="praise">Sterk, Anne. Dit gaat de goede kant op.</p>` : ""}
      <p class="muted">Vragen die je fout had, vind je terug onder ‘Mijn fouten’. Zodra je ze goed beantwoordt, verdwijnen ze daar.</p>
      <div class="row" style="justify-content:center"><button class="btn btn-primary" data-pagain>Opnieuw</button>${wrongN ? `<button class="btn btn-ghost" data-pfout>Oefen mijn fouten</button>` : ""}</div></div></div>`;
  }
  const score = `<div class="scoreline tnum"><span>Vraag <b>${prac.i + 1}</b> van ${prac.queue.length}</span><span>Goed <b>${prac.ok}</b></span><span>Fout <b>${prac.bad}</b></span>${prac.streak >= 3 ? `<span class="streak">${heart} ${prac.streak} op rij</span>` : ""}</div>`;
  const next = `<div class="row"><button class="btn btn-primary" id="pnext">Volgende vraag</button><span class="small muted">of druk op <kbd>Enter</kbd></span></div>`;
  if (item.q.type === "num") {
    const q = item.q, done = prac.chosen !== null, v = prac.numv;
    return `<div class="wrap">${head}${score}<div class="panel stack"><div class="q"><div class="row">${topicTag(q.t)}<span class="tag sand">Rekenvraag</span></div><p class="q-text">${fmt(q.q)}</p>
      <div data-part="num">${numInHTML(q, v, "pn", done)}</div>
      ${q.sci ? `<p class="small muted">Vul het getal in (bijv. 4,14) en de macht van 10 (bijv. -19).</p>` : ""}</div>
      ${done ? `<div class="explain"><span class="verdict ${prac.chosen ? "good" : "bad"}">${esc(prac.msg)}</span><p><b>Uitwerking</b></p><p class="uitwerking">${esc(q.e)}</p></div>${next}`
      : `<div class="row"><button class="btn btn-primary" id="pcheck">Controleer</button><button class="btn-link small" id="pskip">Ik weet het niet</button></div>`}
    </div></div>`;
  }
  const reveal = prac.chosen !== null;
  return `<div class="wrap">${head}${score}
    <div class="panel stack">${questionHTML(item, prac.chosen, reveal)}
      ${reveal ? mcExplainHTML(item, prac.chosen) + next : `<p class="small muted">Tip: kies met <kbd>A</kbd> t/m <kbd>${LETTERS[item.order.length - 1]}</kbd></p>`}
    </div></div>`;
}
function settlePrac(ok){
  const item = prac.queue[prac.i]; if (ok) prac.ok++; else prac.bad++; recordMc(item.q, ok);
  if (ok) { prac.streak++; prac.msg = STREAK[prac.streak] || pick(PRAISE); } else { prac.streak = 0; prac.msg = pick(NOPE); }
}
function choosePrac(oi){
  if (!prac || prac.chosen !== null) return; const item = prac.queue[prac.i]; if (!item || item.q.type === "num") return;
  prac.chosen = oi; settlePrac(oi === item.q.a); render();
}
function checkNum(skip){
  const item = prac.queue[prac.i]; if (!item || prac.chosen !== null) return;
  if (!skip && isNaN(num(prac.numv.n))) { toast("Vul eerst een getal in."); return; }
  const ok = !skip && numOk(item.q, prac.numv); prac.chosen = ok; settlePrac(ok);
  if (!ok) prac.msg = skip ? "Geen probleem. Bekijk de uitwerking." : `Niet goed. Het antwoord is ${sci(item.q.ans, item.q.unit)}.`;
  render();
}
function nextPrac(){ if (!prac || prac.chosen === null) return; prac.i++; prac.chosen = null; prac.numv = {}; render(); window.scrollTo({top:0}); }
function bindPractice(){
  $$("[data-pw]").forEach(b => b.addEventListener("click", () => { pracFilter.wrong = b.dataset.pw === "1"; buildPrac(); render(); }));
  $$("[data-pt]").forEach(b => b.addEventListener("click", () => { pracFilter.t = b.dataset.pt; buildPrac(); render(); }));
  $$("[data-opt]").forEach(b => b.addEventListener("click", () => choosePrac(Number(b.dataset.opt))));
  bindFields($("#view"), () => prac && prac.numv);
  const c = $("#pcheck"); if (c) c.addEventListener("click", () => checkNum(false));
  const sk = $("#pskip"); if (sk) sk.addEventListener("click", () => checkNum(true));
  const n = $("#pnext"); if (n) { n.addEventListener("click", nextPrac); n.focus({preventScroll:true}); }
  const a = $("[data-pagain]"); if (a) a.addEventListener("click", () => { buildPrac(); render(); });
  const f = $("[data-pfout]"); if (f) f.addEventListener("click", () => { pracFilter.wrong = true; buildPrac(); render(); });
}
function keyPractice(e){
  if (!prac) return; const item = prac.queue[prac.i];
  if (prac.chosen === null && item && item.q.type !== "num") { const i = LETTERS.indexOf(e.key.toUpperCase()); if (i >= 0 && i < item.order.length) { e.preventDefault(); choosePrac(item.order[i]); } }
  else if (e.key === "Enter" && prac.chosen !== null) { e.preventDefault(); nextPrac(); }
}

// ======================================================================
// PROEFTOETS
// ======================================================================
let examConfirm = false, timerId = null;
const slotVar = (si, id) => EXAM.slots[si].variants.find(v => v.id === id);
function examParts(cur){ const out = []; cur.ids.forEach((id, si) => { const sl = EXAM.slots[si], va = slotVar(si, id); if (!va) return; va.parts.forEach(p => out.push({si, sl, va, p, key: si + "-" + (p.l || "x"), t: p.t || va.t || sl.t})); }); return out; }
function newExam(){
  const ids = EXAM.slots.map((sl, si) => { const prev = (S.lastIds || [])[si]; const opts = sl.variants.filter(v => v.id !== prev); return pick(opts.length ? opts : sl.variants).id; });
  S.cur = {ids, v:{}, checks:{}, cur:0, start: Date.now(), phase:"answer"}; S.lastIds = ids; save();
}
function fmtTime(ms){ const s = Math.floor(ms / 1000); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }
function opgaveHTML(si, cur, mode){
  const sl = EXAM.slots[si], va = slotVar(si, cur.ids[si]);
  const parts = va.parts.map(p => {
    const key = si + "-" + (p.l || "x"), v = cur.v[key] || {}, ch = cur.checks[key] || [];
    const lab = p.l ? `${sl.n}${p.l}` : `${sl.n}`;
    let inner = `<div class="part-h"><h3>Vraag ${lab}</h3><span class="tag">${p.p} ${p.p === 1 ? "punt" : "punten"}</span></div><p>${fmt(p.q)}</p>
      <div class="stack" style="gap:.55rem" data-part="${key}">${fieldsHTML(p, v, "x" + key, mode !== "answer")}</div>`;
    if (mode === "grade") inner += `<div class="stack" style="gap:.6rem"><p class="model-h">Correctiemodel: vink aan wat in jouw antwoord staat</p>${critListHTML(p, ch, v, key)}
      <p class="small tnum"><b>${partGot(p, ch)}/${partMax(p)} punten</b></p><p class="model-h">Modelantwoord</p><div class="model">${esc(p.m)}</div>${p.mfig ? figHTML(p.mfig) : ""}</div>`;
    return `<section class="part">${inner}</section>`;
  }).join("");
  const pts = va.parts.reduce((a, p) => a + p.p, 0);
  return `<section class="opgave"><div class="opgave-h"><h2>Opgave ${sl.n}: ${esc(sl.title)}</h2><span class="small muted tnum">${pts} punten</span></div>
    ${va.intro ? `<p class="intro">${fmt(va.intro)}</p>` : ""}${figHTML(va.fig)}${parts}</section>`;
}
function viewExam(){
  const E = EXAM;
  const head = `<header class="stack" style="gap:.5rem"><p class="eyebrow">${esc(INFO.short)} · Proeftoets</p><h1>${esc(E.title)}</h1></header>`;
  const cur = S.cur;
  if (!cur) {
    const hist = S.exams.slice(-8).reverse();
    return `<div class="wrap">${head}
      <div class="panel stack"><p>${esc(E.desc)}</p><p class="small muted">${esc(E.note)}</p>
        <div class="row"><button class="btn btn-primary" id="examStart">Start proeftoets</button></div></div>
      ${hist.length ? `<section class="stack"><h2>Eerdere pogingen</h2><div class="panel" style="padding:.5rem 1rem"><table class="hist tnum"><thead><tr><th>Datum</th><th>Punten</th><th>Cijfer</th><th>Tijd</th></tr></thead><tbody>
        ${hist.map(h => `<tr><td>${new Date(h.date).toLocaleDateString("nl-NL",{day:"numeric",month:"short"})}</td><td>${comma(h.score)}/${h.total}</td><td>${gradeStr(h.grade)}</td><td>${fmtTime(h.ms)}</td></tr>`).join("")}
      </tbody></table></div></section>` : ""}
    </div>`;
  }
  if (cur.phase === "done") return examResult(head);
  if (cur.phase === "grade") {
    return `<div class="wrap">${head}
      <div class="callout blue"><b>Ingeleverd. Nu nakijken.</b><p>Vergelijk je antwoorden met het correctiemodel en vink per element aan wat in jouw antwoord staat. Wat automatisch kon, is al ingevuld. Wees streng, net als je docent. Daarna zie je je cijfer.</p></div>
      ${EXAM.slots.map((_, si) => opgaveHTML(si, cur, "grade")).join("")}
      <div class="total"><span>Totaal na nakijken</span><b class="tnum" id="gradeTotal">${comma(gradeScore(cur))}/${examMax(cur)}</b></div>
      <div class="row"><button class="btn btn-primary" id="eFinish">Bereken mijn cijfer</button></div>
    </div>`;
  }
  const si = cur.cur;
  const done = i => { const va = slotVar(i, cur.ids[i]); return va.parts.some(p => { const v = cur.v[i + "-" + (p.l || "x")]; return v && Object.values(v).some(x => String(x).trim() !== ""); }); };
  return `<div class="wrap">
    <div class="row between"><p class="eyebrow">Proeftoets · opgave ${si + 1} van ${EXAM.slots.length}</p><span class="timer tnum" id="timer">${fmtTime(Date.now() - cur.start)}</span></div>
    <div class="qgrid" aria-label="Opgaven">${EXAM.slots.map((sl, i) => `<button data-goto="${i}" class="${done(i) ? "done" : ""} ${i === si ? "cur" : ""}">Opgave ${sl.n}</button>`).join("")}</div>
    ${opgaveHTML(si, cur, "answer")}
    <div class="row between"><button class="btn btn-ghost" id="ePrev" ${si === 0 ? "disabled" : ""}>Vorige opgave</button>
      ${si < EXAM.slots.length - 1 ? `<button class="btn btn-primary" id="eNext">Volgende opgave</button>` : `<button class="btn btn-primary" id="eHand">Inleveren</button>`}</div>
    ${examConfirm ? `<div class="confirm"><p><b>Weet je zeker dat je wilt inleveren?</b> Daarna kun je je antwoorden niet meer aanpassen en ga je nakijken.</p>
      <div class="row"><button class="btn btn-primary" id="eYes">Ja, inleveren</button><button class="btn btn-ghost" id="eNo">Verder werken</button></div></div>`
      : `<div class="row between"><button class="btn-link small" id="eStop">Stoppen zonder inleveren</button><button class="btn-link small" id="eHand2">Inleveren</button></div>`}
  </div>`;
}
const examMax = cur => examParts(cur).reduce((a, x) => a + partMax(x.p), 0);
const gradeScore = cur => examParts(cur).reduce((a, x) => a + partGot(x.p, cur.checks[x.key]), 0);
function examResult(head){
  const cur = S.cur, r = cur.result;
  const by = {}; examParts(cur).forEach(x => { by[x.t] = by[x.t] || {got:0, max:0}; by[x.t].got += partGot(x.p, cur.checks[x.key]); by[x.t].max += partMax(x.p); });
  return `<div class="wrap">${head}
    <div class="panel stack"><p class="eyebrow">Uitslag</p>
      <div class="result-big"><span class="n tnum">${gradeStr(r.grade)}</span><span class="grade tnum">${comma(r.score)} van de ${r.total} punten</span></div>
      <p class="${r.grade >= 5.5 ? "praise" : ""}">${examPraise(r.grade)}</p><p class="muted small">Tijd: ${fmtTime(r.ms)}. Cijfer = 1 + 9 × (punten / ${r.total}).</p>
      <h3 style="margin-top:.4rem">Score per onderwerp</h3>
      <div class="topics">${Object.keys(by).map(t => { const b = by[t], p = Math.round(100 * b.got / b.max); return `<div class="tp" style="grid-template-columns:minmax(0,1fr) minmax(0,1.2fr) 5.5rem"><span class="tt" style="font-weight:700">${esc(TOPICS[t] ? TOPICS[t].t : t)}</span><span class="bar ${p >= 55 ? "good" : ""}"><i style="width:${p}%"></i></span><span class="small tnum">${comma(b.got)}/${b.max}</span></div>`; }).join("")}</div>
      <div class="row"><button class="btn btn-primary" id="eRestart">Nieuwe proeftoets</button><a class="btn btn-ghost" href="${L("oefenen")}">Naar oefenvragen</a></div>
    </div>
    <details class="panel"><summary style="cursor:pointer;font-weight:800">Bekijk je nagekeken toets</summary><div class="stack" style="margin-top:1rem">${EXAM.slots.map((_, si) => opgaveHTML(si, cur, "grade")).join("")}</div></details>
  </div>`;
}
function examPraise(g){
  if (g >= 8.5) return "Wauw, Anne! Dit zit er echt goed in.";
  if (g >= 7) return "Heel sterk. Kijk nog even waar de laatste punten liggen.";
  if (g >= 5.5) return "Voldoende, mooi zo! Hierboven zie je welke onderwerpen nog aandacht nodig hebben.";
  if (g >= 4) return "Je bent op weg. Oefen de onderwerpen met de kortste balken en probeer het daarna nog eens.";
  return "Dit is een begin. Start met de flashcards en de oefenvragen van de onderwerpen hierboven.";
}
function handIn(){
  const cur = S.cur; cur.ms = Date.now() - cur.start; cur.phase = "grade"; examConfirm = false;
  examParts(cur).forEach(x => { const a = autoEval(x.p, cur.v[x.key]); cur.checks[x.key] = a.map(z => z === true); });
  save(); stopTimer(); render(); window.scrollTo({top:0});
}
function finishExam(){
  const cur = S.cur, score = gradeScore(cur), total = examMax(cur);
  const grade = Math.round((1 + 9 * score / total) * 10) / 10;
  cur.result = {score, total, grade, ms: cur.ms}; cur.phase = "done";
  S.exams.push({date: Date.now(), score, total, grade, ms: cur.ms, ids: cur.ids}); save(); render(); window.scrollTo({top:0});
}
function startTimer(){ stopTimer(); timerId = setInterval(() => { const t = $("#timer"); if (t && S.cur && S.cur.phase === "answer") t.textContent = fmtTime(Date.now() - S.cur.start); else stopTimer(); }, 1000); }
function stopTimer(){ if (timerId) { clearInterval(timerId); timerId = null; } }
function bindExam(){
  const st = $("#examStart"); if (st) st.addEventListener("click", () => { newExam(); examConfirm = false; render(); window.scrollTo({top:0}); });
  const cur = S.cur; if (!cur) return;
  if (cur.phase === "answer") startTimer();
  bindFields($("#view"), k => (cur.v[k] = cur.v[k] || {}));
  $$("[data-goto]").forEach(b => b.addEventListener("click", () => { cur.cur = Number(b.dataset.goto); save(); render(); window.scrollTo({top:0}); }));
  const p = $("#ePrev"); if (p) p.addEventListener("click", () => { cur.cur--; save(); render(); window.scrollTo({top:0}); });
  const n = $("#eNext"); if (n) n.addEventListener("click", () => { cur.cur++; save(); render(); window.scrollTo({top:0}); });
  ["#eHand","#eHand2"].forEach(id => { const h = $(id); if (h) h.addEventListener("click", () => { examConfirm = true; render(); const c = $("#eYes"); if (c) c.scrollIntoView({block:"center"}); }); });
  const y = $("#eYes"); if (y) y.addEventListener("click", handIn);
  const no = $("#eNo"); if (no) no.addEventListener("click", () => { examConfirm = false; render(); });
  const stop = $("#eStop"); if (stop) stop.addEventListener("click", () => { S.cur = null; save(); stopTimer(); render(); });
  $$("[data-crit]").forEach(cb => cb.addEventListener("change", () => { const [k, i] = cb.dataset.crit.split(":"); (cur.checks[k] = cur.checks[k] || [])[Number(i)] = cb.checked; save(); const y2 = window.scrollY; render(); window.scrollTo({top:y2}); }));
  const fin = $("#eFinish"); if (fin) fin.addEventListener("click", finishExam);
  const r = $("#eRestart"); if (r) r.addEventListener("click", () => { S.cur = null; save(); render(); window.scrollTo({top:0}); });
}

// ======================================================================
// OPEN VRAGEN
// ======================================================================
let openSel = null, openResetAsk = false;
const openTotal = o => o.parts.reduce((a, p) => a + p.p, 0);
const MODEL = {eigen:["Eigen antwoordmodel","rose"], docent:["Antwoordmodel van je docent",""], "docent+":["Model van je docent, verbeterd",""]};
function openState(o){ return S.open[o.id] || (S.open[o.id] = {v:{}, checks:{}, rev:{}}); }
function openScore(o){ const st = S.open[o.id]; if (!st || !st.rev) return null; let s = 0, any = false; o.parts.forEach(p => { if (st.rev[p.l]) { any = true; s += partGot(p, st.checks[p.l]); } }); return any ? s : null; }
function viewOpen(){
  if (!openSel) {
    const tip = INFO.openTip;
    return `<div class="wrap"><header class="stack" style="gap:.5rem"><p class="eyebrow">${esc(INFO.short)} · Open vragen</p><h1>Open vragen</h1><p class="muted">${esc(INFO.openIntro)}</p></header>
      <div class="olist">${OPEN.map(o => { const sc = openScore(o), tot = openTotal(o), m = MODEL[o.model] || ["",""]; return `<button class="ocard" data-open="${o.id}">
        <span class="tags"><span class="tag ${o.src === "Nieuw" ? "sand" : ""}">${esc(o.src)}</span><span class="tag ${m[1]}">${esc(m[0])}</span></span><h3>${esc(o.title)}</h3>
        <span class="small muted tnum">${o.parts.length} ${o.parts.length === 1 ? "vraag" : "deelvragen"} · ${tot} punten${sc === null ? "" : ` · laatste score ${comma(sc)}/${tot}`}</span></button>`; }).join("")}</div>
      ${tip ? `<div class="callout"><b>${esc(tip.t)}</b><p>${esc(tip.d)}</p></div>` : ""}</div>`;
  }
  const o = OPEN.find(x => x.id === openSel), st = openState(o), sc = openScore(o), tot = openTotal(o), m = MODEL[o.model] || ["",""];
  return `<div class="wrap">
    <div><button class="btn-link small" id="oBack">Terug naar alle opgaven</button></div>
    <header class="stack" style="gap:.5rem"><div class="row"><span class="tag">${esc(o.src)}</span><span class="tag ${m[1]}">${esc(m[0])}</span><span class="tag sand">${tot} punten</span></div><h1>${esc(o.title)}</h1></header>
    ${o.note ? `<p class="small muted">${esc(o.note)}</p>` : ""}
    ${figHTML(o.fig)}${o.intro ? `<p class="intro">${fmt(o.intro)}</p>` : ""}
    ${o.parts.map(p => {
      const v = st.v[p.l] || {}, rev = st.rev[p.l], ch = st.checks[p.l] || [];
      return `<section class="part"><div class="part-h"><h3>Vraag ${esc(p.l)}</h3><span class="tag">${p.p} ${p.p === 1 ? "punt" : "punten"}</span></div><p>${fmt(p.q)}</p>
        <div class="stack" style="gap:.55rem" data-part="${esc(p.l)}">${fieldsHTML(p, v, "o" + o.id + p.l, false)}</div>
        ${rev ? `<div class="stack" style="gap:.6rem"><p class="model-h">Correctiemodel: vink aan wat in jouw antwoord staat</p>${critListHTML(p, ch, v, p.l)}
          <p class="small tnum"><b>${partGot(p, ch)}/${partMax(p)} punten</b>${partGot(p, ch) === partMax(p) ? ` <span class="praise">Alle punten binnen!</span>` : ""}</p>
          <p class="model-h">Modelantwoord</p><div class="model">${esc(p.m)}</div>${p.mfig ? figHTML(p.mfig) : ""}${p.note ? `<p class="small muted">${esc(p.note)}</p>` : ""}</div>`
        : `<div><button class="btn btn-ghost" data-reveal="${esc(p.l)}">Bekijk correctiemodel</button></div>`}
      </section>`;
    }).join("")}
    <div class="total"><span>${sc === tot ? "Volle score, Anne!" : "Totaal voor deze opgave"}</span><b class="tnum">${sc === null ? "0" : comma(sc)}/${tot}</b></div>
    <div class="row"><button class="btn btn-ghost" id="oReset">Wis mijn antwoorden</button>${openResetAsk ? `<span class="small">Zeker weten? <button class="btn-link" id="oResetYes">Ja, wissen</button> · <button class="btn-link" id="oResetNo">Nee</button></span>` : ""}</div>
  </div>`;
}
function bindOpen(){
  $$("[data-open]").forEach(b => b.addEventListener("click", () => { openSel = b.dataset.open; openResetAsk = false; render(); window.scrollTo({top:0}); }));
  const back = $("#oBack"); if (back) back.addEventListener("click", () => { openSel = null; render(); window.scrollTo({top:0}); });
  if (!openSel) return;
  const o = OPEN.find(x => x.id === openSel), st = openState(o);
  bindFields($("#view"), l => (st.v[l] = st.v[l] || {}));
  $$("[data-reveal]").forEach(b => b.addEventListener("click", () => { const l = b.dataset.reveal, p = o.parts.find(x => x.l === l); st.rev[l] = true; st.checks[l] = autoEval(p, st.v[l]).map(z => z === true); save(); const y = window.scrollY; render(); window.scrollTo({top:y}); }));
  $$("[data-crit]").forEach(cb => cb.addEventListener("change", () => { const [l, i] = cb.dataset.crit.split(":"); (st.checks[l] = st.checks[l] || [])[Number(i)] = cb.checked; save(); const y = window.scrollY; render(); window.scrollTo({top:y}); }));
  const r = $("#oReset"); if (r) r.addEventListener("click", () => { openResetAsk = true; const y = window.scrollY; render(); window.scrollTo({top:y}); });
  const ry = $("#oResetYes"); if (ry) ry.addEventListener("click", () => { S.open[o.id] = {v:{}, checks:{}, rev:{}}; openResetAsk = false; save(); render(); });
  const rn = $("#oResetNo"); if (rn) rn.addEventListener("click", () => { openResetAsk = false; render(); });
}

// ======================================================================
// SPRINT
// ======================================================================
let sp = null, spTimer = null;
function viewSprint(){
  if (!sp) return `<div class="wrap"><header class="stack" style="gap:.5rem"><p class="eyebrow">${esc(INFO.short)} · Sprint</p><h1>Snel herkennen</h1><p class="muted">${esc(INFO.sprintIntro)}</p></header>
    <div class="slist">${SPRINT.map(s => { const best = S.sprint[s.id]; return `<button class="ocard" data-sp="${s.id}"><span class="tags">${topicTag(s.w)}</span><h3>${esc(s.title)}</h3><span class="small muted tnum">${s.items.length} vragen${best ? ` · beste ${best.ok}/${s.items.length} in ${Math.round(best.ms / 1000)} s` : ""}</span></button>`; }).join("")}</div></div>`;
  const set = sp.set, it = sp.items[sp.i];
  if (!it) {
    const best = S.sprint[set.id];
    return `<div class="wrap"><div class="panel end"><p class="eyebrow">${esc(set.title)}</p><p class="big tnum">${sp.ok} van ${sp.items.length} goed</p>${sp.ok === sp.items.length ? `<p class="praise">Alles goed! Mooi gedaan, Anne.</p>` : ""}
      <p class="muted tnum">In ${Math.round(sp.ms / 1000)} seconden.${best && best.ok === sp.ok && best.ms === sp.ms ? " Nieuw record!" : ""}</p>
      ${sp.miss.length ? `<div class="stack" style="gap:.4rem;width:100%;text-align:left"><p class="small"><b>Nog even bekijken:</b></p><ul class="plain small">${sp.miss.map(m => `<li>${esc(m.t)} <b>→ ${esc(m.a)}</b></li>`).join("")}</ul></div>` : ""}
      <div class="row" style="justify-content:center"><button class="btn btn-primary" id="spAgain">Nog een keer</button><button class="btn btn-ghost" id="spBack">Andere ronde</button></div></div></div>`;
  }
  const choices = set.choices, pct = Math.round(100 * sp.i / sp.items.length);
  return `<div class="wrap">
    <div class="row between"><button class="btn-link small" id="spBack">Stoppen</button><span class="small muted tnum">${sp.streak >= 3 ? `<span class="streak">${heart} ${sp.streak} op rij</span> · ` : ""}${sp.i + 1} / ${sp.items.length} · ${sp.ok} goed</span></div>
    <span class="bar"><i style="width:${pct}%"></i></span>
    <div class="panel stack" style="gap:1.3rem"><p class="eyebrow">${esc(set.title)}</p><p class="sprint-stmt">${esc(it.t)}</p>
      <div class="choices">${choices.map((c, i) => { let cls = ""; if (sp.picked !== null) { if (c === it.a) cls = "ok"; else if (c === sp.picked) cls = "no"; } return `<button data-ch="${esc(c)}" class="${cls}" ${sp.picked !== null ? "disabled" : ""}>${i < 9 ? `<kbd>${i + 1}</kbd> ` : ""}${esc(c)}</button>`; }).join("")}</div>
    </div></div>`;
}
function pickSprint(c){
  if (!sp || sp.picked !== null) return; const it = sp.items[sp.i]; sp.picked = c;
  if (c === it.a) { sp.ok++; sp.streak++; if (STREAK[sp.streak]) toast(`<span class="h">${heart}</span> ${STREAK[sp.streak]}`); } else { sp.miss.push(it); sp.streak = 0; }
  render();
  clearTimeout(spTimer); spTimer = setTimeout(() => { if (!sp) return; sp.i++; sp.picked = null; if (sp.i >= sp.items.length) finishSprint(); if (current === "sprint") render(); }, c === it.a ? 650 : 1600);
}
function finishSprint(){ sp.ms = Date.now() - sp.start; const b = S.sprint[sp.set.id]; if (!b || sp.ok > b.ok || (sp.ok === b.ok && sp.ms < b.ms)) { S.sprint[sp.set.id] = {ok: sp.ok, ms: sp.ms}; save(); } }
function startSprint(id){ const set = SPRINT.find(s => s.id === id); sp = {set, items: shuffle(set.items), i:0, ok:0, picked:null, start: Date.now(), miss:[], streak:0}; render(); }
function bindSprint(){
  $$("[data-sp]").forEach(b => b.addEventListener("click", () => startSprint(b.dataset.sp)));
  $$("[data-ch]").forEach(b => b.addEventListener("click", () => pickSprint(b.dataset.ch)));
  const a = $("#spAgain"); if (a) a.addEventListener("click", () => startSprint(sp.set.id));
  $$("#spBack").forEach(bk => bk.addEventListener("click", () => { clearTimeout(spTimer); sp = null; render(); }));
}
function keySprint(e){ if (!sp || sp.picked !== null) return; const it = sp.items[sp.i]; if (!it) return; const n = Number(e.key); if (n >= 1 && n <= sp.set.choices.length) { e.preventDefault(); pickSprint(sp.set.choices[n - 1]); } }

// ======================================================================
// NASLAG
// ======================================================================
let nas = {t:"all", q:"", lam:580};
function viewNaslag(){
  return `<div class="wrap wide"><header class="stack" style="gap:.5rem"><p class="eyebrow">${esc(INFO.short)} · Naslag</p><h1>Overzichten</h1>
    <p class="muted">Alle schema's en overzichten van hoofdstuk 4 en 5 op één plek. Zoeken doorzoekt de overzichten en alle flashcards.</p></header>
    <input class="search" id="nasQ" type="search" placeholder="${esc(INFO.searchHint)}" value="${esc(nas.q)}" aria-label="Zoeken">
    <div id="nasBody">${naslagBody()}</div></div>`;
}
function hl(text, q){ const t = esc(text); if (!q) return t.replace(/\n/g,"<br>"); const re = new RegExp("(" + esc(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"); return t.replace(re, "<mark>$1</mark>").replace(/\n/g,"<br>"); }
function tableHTML(t, q){ return `<section class="stack" style="gap:.6rem"><div class="row">${topicTag(t.w)}<h2>${hl(t.t, q)}</h2></div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr>${t.h.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${t.r.map(r => `<tr>${r.map(c => `<td>${hl(c, q)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></section>`; }
function aflezerHTML(){ const c = coneAt(nas.lam); return `<div class="panel aflezer"><h3>Kegeltjes-aflezer</h3><p class="small muted">Schuif naar een golflengte en zie wat je in de grafiek (figuur 22) afleest.</p>
  <div id="aflGraph">${conesSVG({mark:[nas.lam], id:"a"})}</div>
  <label class="small" for="lamR"><b>Golflengte: <span id="lamV" class="tnum">${nas.lam}</span> nm</b></label><input type="range" id="lamR" min="400" max="700" step="5" value="${nas.lam}">
  <div class="readout tnum" id="aflOut"><span class="l">Rood (L): ${c.L}%</span><span class="m">Groen (M): ${c.M}%</span><span class="s">Blauw (S): ${c.S}%</span></div></div>`; }
function naslagBody(){
  const q = nas.q.trim();
  if (q) {
    const ql = q.toLowerCase();
    const tabs = TABLES.filter(t => (t.t + " " + t.h.join(" ") + " " + t.r.map(r => r.join(" ")).join(" ")).toLowerCase().includes(ql));
    const hits = FLASH.filter(c => (c.q + " " + c.a).toLowerCase().includes(ql));
    return `<p class="small muted">${hits.length + tabs.length} ${hits.length + tabs.length === 1 ? "resultaat" : "resultaten"}</p>
      ${tabs.map(t => tableHTML(t, q)).join("")}
      ${hits.length ? `<div class="panel defs" style="padding-block:.3rem">${hits.map(c => `<div class="def"><span style="align-self:flex-start">${topicTag(c.t)}</span><h3>${hl(c.q, q)}</h3><p>${hl(c.a, q)}</p></div>`).join("")}</div>` : (tabs.length ? "" : `<div class="empty">Niets gevonden. Probeer een ander woord.</div>`)}`;
  }
  const tables = TABLES.filter(t => nas.t === "all" || t.w === nas.t);
  const tools = [];
  if (nas.t === "all" || nas.t === "netvlies") tools.push(aflezerHTML());
  if (nas.t === "all" || nas.t === "oog") tools.push(`<div class="panel stack"><h3>Het oog in doorsnede</h3>${SVGS.oog()}</div>`, `<div class="panel stack"><h3>Zenuwbanen en chiasma opticum</h3>${SVGS.chiasma()}</div>`);
  if (nas.t === "all" || nas.t === "kleur") tools.push(`<div class="panel stack"><h3>Kleurencirkel van Charles Blanc</h3>${SVGS.blanc()}</div>`, `<div class="panel stack"><h3>Kleurencirkel van licht</h3>${SVGS.lichtcirkel()}</div>`);
  if (nas.t === "all" || nas.t === "complex") tools.push(`<div class="panel stack"><h3>Metaalion met watermoleculen</h3>${SVGS.fewater()}</div>`);
  return `<div class="stack" style="gap:1.6rem">${topicChips(nas.t, "nt", TK)}
    ${tools.length ? `<div class="tools">${tools.join("")}</div>` : ""}
    ${tables.map(t => tableHTML(t, "")).join("")}</div>`;
}
function bindNaslag(){
  const inp = $("#nasQ"); if (inp) inp.addEventListener("input", () => { nas.q = inp.value; $("#nasBody").innerHTML = naslagBody(); bindNasBody(); });
  bindNasBody();
}
function bindNasBody(){
  $$("[data-nt]").forEach(b => b.addEventListener("click", () => { nas.t = b.dataset.nt; $("#nasBody").innerHTML = naslagBody(); bindNasBody(); }));
  const r = $("#lamR"); if (r) r.addEventListener("input", () => { nas.lam = Number(r.value); const c = coneAt(nas.lam); $("#lamV").textContent = nas.lam; $("#aflGraph").innerHTML = conesSVG({mark:[nas.lam], id:"a"}); $("#aflOut").innerHTML = `<span class="l">Rood (L): ${c.L}%</span><span class="m">Groen (M): ${c.M}%</span><span class="s">Blauw (S): ${c.S}%</span>`; });
}

// ======================================================================
// LEERPUNTEN
// ======================================================================
function viewLessons(){
  const Ls = LESSONS, hasMc = t => MC.some(q => q.t === t);
  return `<div class="wrap"><header class="stack" style="gap:.5rem"><p class="eyebrow">${esc(INFO.short)} · Leerpunten</p><h1>Wat de oefentoets leert</h1><p class="muted">${esc(INFO.lessonsIntro)}</p></header>
    <section class="stack"><h2>Zo ziet de toets eruit</h2><ul class="plain">${Ls.format.map(f => `<li>${esc(f)}</li>`).join("")}</ul></section>
    <section class="stack fix"><h2>${esc(INFO.correctionsTitle)}</h2>${Ls.corrections.map(c => `<div class="callout"><b>${esc(c.t)}</b><p>${esc(c.d)}</p></div>`).join("")}</section>
    <section class="stack"><h2>Valkuilen</h2><div class="lessons">${Ls.weak.map(x => `<div class="lesson"><span style="align-self:flex-start">${topicTag(x.w)}</span><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p>${hasMc(x.w) ? `<button class="btn-link small" style="align-self:flex-start" data-train="${x.w}">Oefen ${esc(tName(x.w).toLowerCase())}</button>` : ""}</div>`).join("")}</div></section>
    <section class="stack"><h2>Strategie voor de vragen</h2><div class="lessons">${Ls.tips.map(x => `<div class="lesson"><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></div>`).join("")}</div></section>
    <section class="stack"><h2>Wordt getoetst, maar staat niet (of nauwelijks) in hoofdstuk 4 en 5</h2><ul class="plain">${Ls.missing.map(m => `<li>${esc(m)}</li>`).join("")}</ul>
      <div><a class="btn btn-ghost" href="${L("kaarten")}" data-extra>Oefen de kaarten over licht en energie</a></div></section>
  </div>`;
}
function bindLessons(){
  $$("[data-train]").forEach(b => b.addEventListener("click", () => { pracFilter = {t: b.dataset.train, wrong:false}; prac = null; location.hash = L("oefenen"); }));
  const x = $("[data-extra]"); if (x) x.addEventListener("click", () => { cardFilter = {t:"licht", mode:"alles"}; cardSess = null; });
}

// ======================================================================
// VAK WISSELEN EN ROUTER
// ======================================================================
const SESS = {};
function stash(){ if (CID) SESS[CID] = {cardFilter, cardSess, pracFilter, prac, examConfirm, openSel, openResetAsk, sp, nas}; }
function useCourse(id){
  if (CID === id) return;
  stash(); stopTimer(); clearTimeout(spTimer);
  CID = id; D = COURSES[id];
  ({INFO, TOPICS, TK, FLASH, MC, OPEN, SPRINT, TABLES, LESSONS, EXAM, CONES, IMG} = D); BANDS = D.COLORBANDS || {}; CAP = D.CAPTIONS || {};
  S = loadStore(id);
  const s = SESS[id] || {};
  cardFilter = s.cardFilter || {t:"all", mode:"herhaal"}; cardSess = s.cardSess || null;
  pracFilter = s.pracFilter || {t:"all", wrong:false}; prac = s.prac || null; examConfirm = !!s.examConfirm;
  openSel = s.openSel || null; openResetAsk = !!s.openResetAsk;
  sp = s.sp && s.sp.picked === null ? s.sp : null; nas = s.nas || {t:"all", q:"", lam:580};
}
function leaveCourse(){ if (!CID) return; stash(); stopTimer(); clearTimeout(spTimer); CID = null; }
const VIEWS = {
  home:[viewHome, () => {}],
  start:[viewStart, bindStart], kaarten:[viewCards, bindCards, keyCards], oefenen:[viewPractice, bindPractice, keyPractice],
  toets:[viewExam, bindExam], open:[viewOpen, bindOpen], sprint:[viewSprint, bindSprint, keySprint],
  naslag:[viewNaslag, bindNaslag], leerpunten:[viewLessons, bindLessons]
};
let current = null;
function render(){ const v = VIEWS[current]; $("#view").innerHTML = v[0](); v[1](); }
function parseHash(){
  const h = (location.hash || "").replace("#", "");
  if (!h || h === "home") return {c:null, v:"home"};
  const m = h.match(/^([a-z0-9]+)(?:-([a-z]+))?$/);
  if (m && COURSES[m[1]]) return {c:m[1], v: m[2] && VIEWS[m[2]] && m[2] !== "home" ? m[2] : "start"};
  return {c:null, v:"home"};
}
function route(){
  const {c, v} = parseHash();
  if (c !== CID || v !== current) { stopTimer(); window.scrollTo({top:0}); }
  if (c) useCourse(c); else leaveCourse();
  current = v; renderNav(v); render();
  const a = $('.nav a[aria-current="page"]'); if (a && a.scrollIntoView && window.innerWidth < 860) a.scrollIntoView({block:"nearest", inline:"center"});
}
document.addEventListener("keydown", e => {
  const t = e.target; if (t && (t.tagName === "TEXTAREA" || t.tagName === "INPUT" || t.isContentEditable)) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const v = VIEWS[current]; if (v && v[2]) v[2](e);
});
window.addEventListener("hashchange", route);
document.addEventListener("click", e => {
  const a = e.target.closest && e.target.closest(".nav a, .brand"); if (!a) return;
  if (a.getAttribute("href") === location.hash && CID) { if (current === "open") openSel = null; if (current === "sprint") { clearTimeout(spTimer); sp = null; } if (current === "naslag") nas.q = ""; render(); window.scrollTo({top:0}); }
});
function init(){
  const tb = $("#themeBtn"); if (tb) tb.addEventListener("click", cycleTheme);
  applyTheme(); route();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
