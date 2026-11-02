// NLT: algemene info, onderwerpen, naslagtabellen, leerpunten en grafiekdata.
window.INFO = {
id:"nlt", name:"Natuur, leven en technologie", short:"NLT", accent:"blauw",
code:"Van Gogh onder de loep · H4 en H5",
toets:"de oefentoets",
startNote:{t:"Let op: rekenen met licht", html:"In de oefenvragen moet je de energie van licht uitrekenen met E = h·f en f = c/λ. Dat staat niet in hoofdstuk 4 of 5, maar in bijlage 2 van de module. Oefen het onder ‘Licht en energie’."},
openIntro:"Vragen zoals op de oefentoets: je schrijft zelf je antwoord en kijkt het daarna na met een correctiemodel in examenstijl. Per element zie je hoeveel punten het oplevert. Bij de vragen uit de oefentoets (set 1) ontbrak een antwoordmodel; dat hebben we zelf opgesteld. Bij set 2 gebruiken we het model van je docent, met een paar verbeteringen.",
openTip:{t:"Zo scoor je punten bij ‘leg uit’", d:"Schrijf in stappen: wat zie je (gegeven), welke regel hoort erbij (theorie), en wat volgt daaruit (conclusie). Gebruik vaktermen zoals geconjugeerd systeem, gedelokaliseerde elektronen, chiasma opticum en ligand. Alleen het eindantwoord levert meestal maar 1 punt op."},
lessonsIntro:"Wat de oefentoets en de oefenvragen laten zien over de echte toets, plus de plekken waar de module of het antwoordmodel niet klopt.",
correctionsTitle:"Klopt niet (helemaal) in de module of het antwoordmodel",
sprintBlurb:"begrippen, kleuren, liganden en formules",
sprintIntro:"Snelle rondes om begrippen, kleurenparen, liganden en formules meteen te herkennen. Kies zo snel als je kunt; met de cijfertoetsen gaat het nog sneller.",
searchHint:"Zoek een begrip, bijv. ‘chiasma’, ‘ligand’ of ‘geraniumlak’"
};

window.TOPICS = {
oog:{s:"Oog",n:"4.2",t:"Het oog en de zenuwbanen"},
netvlies:{s:"Netvlies",n:"4.3",t:"Netvlies en kleur waarnemen"},
kleur:{s:"Kleuren",n:"4.4 en 4.5",t:"Complementaire kleuren"},
verf:{s:"Verf",n:"5.2",t:"Verf, bindmiddel en drogen"},
molecuul:{s:"Moleculen",n:"5.2 + B1.2",t:"Kleur van moleculen"},
complex:{s:"Complexen",n:"5.2 + B1.1",t:"Complexen en liganden"},
verkleuring:{s:"Verkleuring",n:"5.3 en 5.4",t:"Verkleuring en restauratie"},
licht:{s:"Licht",n:"Bijlage 2",t:"Licht en energie (rekenen)"}
};

// Bijschriften bij de afbeeldingen (schilderijen uit de module en de oefentoets).
window.CAPTIONS = {
zoeaaf:"Vincent van Gogh, De zoeaaf (1888)",
cafeterras:"Vincent van Gogh, Caféterras bij nacht (1888)",
nachtcafe:"Vincent van Gogh, Het nachtcafé (1888)",
zelfportret:"Vincent van Gogh, Zelfportret met verbonden oor (1889)",
zonnebloemen:"Vincent van Gogh, Zonnebloemen (1889)",
stoel:"Vincent van Gogh, De stoel van Vincent (1888), uit de oefentoets",
"slaapkamer-nu":"De slaapkamer (1888), zoals het er nu uitziet",
"slaapkamer-reconstructie":"Digitale reconstructie van de oorspronkelijke kleuren"
};

// Kegeltjesgrafiek (figuur 22 van de module en de grafiek uit de oefentoets).
// Afgelezen uit die grafiek met de as-streepjes 400, 500, 600 en 700 nm (twee keer onafhankelijk uitgelezen en gemiddeld);
// bij 610 nm gelijkgezet aan de waarden in de module (rood 75%, groen 13%).
// [golflengte in nm, S (blauw), M (groen), L (rood)] in procent.
window.CONES = [
[380,2,0,0],[385,7,0,0],[390,18,0,0],[395,28,0,0],[400,40,0,0],[405,50,0,0],[410,61,0,0],[415,71,0,0],[420,82,0,0],
[425,90,0,0],[430,96,0,0],[435,99,0,0],[440,100,0,0],[445,99,0,0],[450,97,2,0],[455,94,10,0],[460,89,20,0],[465,85,28,0],
[470,80,37,0],[475,75,44,0],[480,69,51,2],[485,63,57,9],[490,57,64,16],[495,50,70,24],[500,42,77,31],[505,35,83,38],[510,29,88,44],
[515,22,93,50],[520,16,97,56],[525,11,99,62],[530,7,100,67],[535,3,100,72],[540,1,100,78],[545,0,98,83],[550,0,94,88],[555,0,86,92],
[560,0,72,96],[565,0,62,99],[570,0,53,100],[575,0,47,100],[580,0,41,100],[585,0,35,99],[590,0,30,97],[595,0,26,93],[600,0,21,87],
[605,0,17,81],[610,0,13,75],[615,0,10,64],[620,0,8,55],[625,0,6,47],[630,0,4,40],[635,0,2,35],[640,0,0,31],[645,0,0,26],
[650,0,0,23],[655,0,0,20],[660,0,0,17],[670,0,0,12],[680,0,0,9],[690,0,0,6],[700,0,0,4],[720,0,0,2],[750,0,0,0]
];

// Golflengtegebieden die we goedrekenen bij ‘kies een golflengte die bij deze kleur past’ (ruim genomen).
window.COLORBANDS = {
violet:[400,450], blauw:[440,495], groen:[495,565], geel:[560,595], oranje:[590,630], rood:[620,750], lichtblauw:[460,530]
};

window.TABLES = [
{t:"Onderdelen van het oog",w:"oog",h:["Onderdeel","Wat is het?","Functie"],r:[
["Harde oogrok","Stevige witte buitenlaag van de oogbol","Beschermt het oog en geeft stevigheid"],
["Hoornvlies","Doorzichtig voorste deel van de harde oogrok","Eerste lens: breekt het licht"],
["Iris","Gekleurde ring met kringspieren (diafragma)","Regelt hoeveel licht er binnenkomt"],
["Pupil","Opening in de iris","Fel licht: pupil wordt nauw (reflex)"],
["Ooglens","Tweede lens, achter de iris","Maakt samen met het hoornvlies een scherp beeld op het netvlies (accommoderen)"],
["Lensbandjes","Bandjes rond de lens","Houden de lens op zijn plek; via de bandjes verandert de lens van vorm"],
["Glasachtig lichaam","Geleiachtige vloeistof met een dun vlies, tussen lens en netvlies","Houdt het oog rond (anders vervormt het beeld) en laat licht door"],
["Netvlies","Lichtgevoelige laag aan de binnenkant (de ‘filmplaat’)","Bevat staafjes en kegeltjes; hier komt het beeld"],
["Gele vlek","Midden van het netvlies, recht achter de pupil","Alleen kegeltjes: scherp en in kleur zien"],
["Blinde vlek","Plek waar de oogzenuw het netvlies verlaat, aan de neuskant","Geen zintuigcellen: hier zie je niets"],
["Oogzenuw","Bundel zenuwvezels","Brengt de signalen naar de hersenen"],
["Chiasma opticum","Kruispunt van de oogzenuwen","Vezels van de neuskant kruisen; elke hersenhelft krijgt een half beeld van beide ogen"]]},
{t:"Oog als fotocamera",w:"oog",h:["Fotocamera","Oog"],r:[
["Lenzenstelsel","Hoornvlies en ooglens"],
["Diafragma","Iris (met de pupil als opening)"],
["Lichtgevoelige filmplaat","Netvlies"]]},
{t:"Zenuwbanen en hersenhelften",w:"oog",h:["Wat je ziet","Valt op","Linkeroog","Rechteroog","Komt aan in"],r:[
["Linkerdeel van het beeld (linker gezichtsveld)","Rechterhelft van beide netvliezen (lens keert om)","Neuskant: kruist","Slaapkant: kruist niet","Rechterhersenhelft"],
["Rechterdeel van het beeld (rechter gezichtsveld)","Linkerhelft van beide netvliezen","Slaapkant: kruist niet","Neuskant: kruist","Linkerhersenhelft"]]},
{t:"Staafjes en kegeltjes",w:"netvlies",h:["","Staafjes","Kegeltjes"],r:[
["Aantal per oog","ca. 120 miljoen","ca. 5 miljoen"],
["Waar","Vooral aan de rand van het netvlies","Vooral in het midden; in de gele vlek alleen kegeltjes"],
["Licht","Werken bij weinig licht, doen niets bij fel licht","Werken alleen bij voldoende licht"],
["Wat zie je","Alleen grijstinten (contrast), beweging","Kleur en details"],
["Schakeling","Meerdere staafjes op één zenuwcel: signaalversterking, minder detail","Eén kegeltje op één zenuwcel: veel detail"]]},
{t:"Drie soorten kegeltjes (figuur 22)",w:"netvlies",h:["Type","Kleur","Meest gevoelig bij"],r:[
["S (short)","Blauw","ca. 430 nm"],
["M (middle)","Groen","ca. 535 nm"],
["L (long)","Rood","ca. 575 nm"],
["Alle drie evenveel","Je ziet wit","-"]]},
{t:"Netvlies: twee lagen",w:"netvlies",h:["Laag","Inhoud en functie"],r:[
["Pigmentlaag","Pigmentcellen met zwarte pigmentkorrels; beschermen de zintuigcellen tegen te veel licht"],
["Zintuigzenuwlaag","Meer dan honderd miljoen zintuig- en zenuwcellen: staafjes en kegeltjes (fotoreceptoren)"]]},
{t:"Drie eigenschappen van kleur",w:"kleur",h:["Eigenschap","Betekenis"],r:[
["Tint","De kleurnaam: kleuren van de regenboog (violet, blauw, groen, geel, oranje, rood)"],
["Verzadiging","Puurheid van de kleur: hoe minder wit erin, hoe verzadigder"],
["Helderheid","Licht of donker: lichtgroen is helderder dan donkergroen"],
["(plus) Contrast","Verschil tussen licht en donker: groot tussen zwart en wit"]]},
{t:"Complementaire kleuren",w:"kleur",h:["Kleur","Kleurencirkel Charles Blanc (verf)","Kleurencirkel licht"],r:[
["Rood","Groen","Cyaan (blauwgroen)"],
["Blauw","Oranje","Geel"],
["Groen","Rood","Magenta"],
["Geel","Violet (paars)","Blauw"],
["Oranje","Blauw","-"],
["Violet","Geel","-"]]},
{t:"Kleuren mengen",w:"kleur",h:["","Additief (licht)","Subtractief (verf)"],r:[
["Waar","Beeldschermen, theaterlampen","Schilderkunst"],
["Betekenis","Optellen: je begint bij zwart en telt licht op","Onttrekken: elke verf absorbeert een deel van het licht"],
["Primaire kleuren","Rood, groen, blauw","Rood, geel, blauw (Charles Blanc)"],
["Mengkleur","Lichter dan de lichtste bronkleur","Donkerder dan de donkerste bronkleur"],
["Alles samen","Wit","(Bijna) zwart"]]},
{t:"Mengkleuren",w:"kleur",h:["Menging","Resultaat"],r:[
["Rood + groen licht","Geel"],["Rood + blauw licht","Magenta"],["Groen + blauw licht","Cyaan"],["Rood + groen + blauw licht","Wit"],
["Rode + blauwe verf","Violet (paars)"],["Blauwe + gele verf","Groen"],["Gele + rode verf","Oranje"]]},
{t:"Waarnemen van kleur: effecten",w:"kleur",h:["Effect","Uitleg"],r:[
["Simultaancontrast","Dezelfde kleur ziet er anders uit door de kleuren eromheen; het sterkst bij complementaire kleuren"],
["Nabeeld","Na staren naar een kleur zie je op wit de tegenkleur (rood ↔ groen)"],
["Opponente kanalen","Rood-groen, geel-blauw en zwart-wit; per kanaal zie je het een of het ander"],
["Pointillisme","Stipjes kleur naast elkaar; mengen in je oog, geeft een ‘vibrato’-effect"]]},
{t:"Verf: waaruit bestaat het?",w:"verf",h:["Bestanddeel","Wat het is","Functie"],r:[
["Pigment","Poeder van kleine, onoplosbare, sterk gekleurde korrels","Geeft de kleur"],
["Bindmiddel","Vloeistof, bijv. lijnolie","Plakt korrels aan elkaar en aan de drager, beschermt de korrels, werkt als smeermiddel"],
["Oplosmiddel","Verdunningsmiddel, bijv. terpentijn","Maakt dikke verf beter verwerkbaar; verdampt bij het drogen"]]},
{t:"Kleurstof of pigment",w:"verf",h:["","Kleurstof","Pigment"],r:[
["Oplosbaar?","Lost op (in water)","Lost niet op: onoplosbare korrels"],
["Herkomst","Meestal organisch","Organisch of anorganisch"],
["Hoe kleurt het?","Hecht aan het materiaal (kleding, inkt)","Heeft een bindmiddel nodig om verf te worden"],
["Lichtecht?","Slecht tot matig, wel intense kleur","Synthetische pigmenten bijna altijd lichtecht"],
["Voorbeeld","Indigo, eosine, alizarine, karmijn","Oker, Pruisisch blauw, kobaltblauw, chroomgeel"]]},
{t:"Eigenschappen van pigmenten",w:"verf",h:["Eigenschap","Uitleg"],r:[
["Lichtechtheid","Vervaagt of verkleurt het pigment door licht? UV kan bindingen verbreken"],
["Oplosbaarheid in het bindmiddel","Pigment moet ‘olieproof’ zijn; anders ‘bloedt’ het schilderij (vooral organische pigmenten)"],
["Dekkend vermogen","Hoe doorzichtig de verf is"],
["Grootte van de korrels","Bepaalt de verstrooiing van licht; liefst zo klein mogelijk voor een goede verdeling"],
["Chemische reactiviteit","Reageert het met andere stoffen? Bijv. lood + H₂S geeft zwart PbS"]]},
{t:"Organisch, anorganisch, synthetisch",w:"verf",h:["Soort","Herkomst en opbouw","Kenmerken"],r:[
["Organisch","Planten en dieren (nu ook synthetisch); koolstofverbindingen","Intense warme kleuren; niet lichtecht, veel moeite voor weinig pigment, kleur wisselt"],
["Anorganisch","Mineralen en verweerd gesteente (aardpigmenten: oker, omber); vaak metaaloxiden","Bevatten bijna altijd overgangsmetalen (d-blok)"],
["Synthetisch","Gemaakt in het laboratorium (organisch of anorganisch)","Nieuwe eigenschappen mogelijk; bijna altijd lichtecht"]]},
{t:"Rode lakpigmenten",w:"verf",h:["Lakpigment","Kleurstof","Herkomst","Bijzonder"],r:[
["Kraplak","Alizarine","Plantaardig: wortel van de meekrap","Alizarine in 1826 afgescheiden door Robiquet"],
["Cochenillelak","Karmijn (cochenille)","Dierlijk: cochenilleluis (eitjes)","Kleur is stabiel, vervaagt niet"],
["Geraniumlak","Eosine","Synthetisch (eosine sinds 1873)","Fel rozerood, niet stabiel; Van Gogh gebruikte het veel"]]},
{t:"Bindmiddel per verfsoort",w:"verf",h:["Verf","Bindmiddel"],r:[
["Tempera","Eigeel"],["Olieverf","Lijnolie"],["Aquarel","Arabische gom"],["Acryl","Synthetisch polymeer"]]},
{t:"Droogproces van olieverf",w:"verf",h:["","Fysisch drogen","Chemisch drogen"],r:[
["Wat gebeurt er","Oplosmiddel verdampt","Dubbele bindingen (C=C) in onverzadigde vetzuren reageren met zuurstof"],
["Gevolg","Pigment en bindmiddel komen dichter bij elkaar; vanderwaalskrachten maken een harde film","Zuurstof vormt bruggen tussen de ketens: polymerisatie (vernetting); pigmentkorrels zitten vast in het netwerk"],
["Nodig","Verdamping","Zuurstof uit de lucht en energie uit UV-licht"]]},
{t:"Vet over mager",w:"verf",h:["Verf","Verdund met","Droogt"],r:[
["Magere verf","Terpentijn","Sneller (verdamping)"],
["Vette verf","Lijnolie","Langzamer"],
["Regel","Vette verf altijd op magere verf","Andersom scheurt de magere bovenlaag"]]},
{t:"Emulsie en ei-tempera",w:"verf",h:["Begrip","Uitleg"],r:[
["Emulsie","Mengsel van twee vloeistoffen die niet in elkaar oplossen (water en olie); valt zonder emulgator uit elkaar"],
["Emulgator","Stof met een polaire (hydrofiele) kop en een apolaire (hydrofobe) staart; zit op de grens van water en vet"],
["Lecithine","Emulgator in eigeel"],
["Drogen tempera","Water verdampt, eiwitten denatureren en lossen daarna niet meer op"],
["Azijn","Tegen bederf"]]},
{t:"Chromofoor en auxochroom",w:"molecuul",h:["","Chromofore groep","Auxochrome groep"],r:[
["Rol","Kleurdragend: absorbeert het licht","Versterkt de kleur (intensere absorptie)"],
["Bevat","Meervoudige bindingen","Vrije elektronenparen"],
["Gedrag","Elektronenpaaracceptor","Elektronenpaardonor"],
["Voorbeelden",">C=O, -COOH, -NO₂, >C=C<, -N=N-, >C=S, >C=NH","-OH, -NH₂, -NHR, -OCH₃, halogenen (-Cl, -Br, -I)"]]},
{t:"Kleur die je ziet en kleur die geabsorbeerd wordt",w:"molecuul",h:["Geabsorbeerd","Je ziet (ongeveer)"],r:[
["Violet/blauw (ca. 400-490 nm)","Geel tot oranje"],
["Blauwgroen","Rood"],
["Groen (ca. 500-560 nm)","Rood tot paars (magenta)"],
["Geel","Blauw tot violet"],
["Oranje (ca. 600 nm)","Blauw"],
["Rood","Blauwgroen (cyaan); volgens Blanc: groen"],
["Alles","Zwart (bijv. grafiet)"],
["Niets in het zichtbare gebied","Kleurloos of wit (bijv. diamant)"]]},
{t:"Geconjugeerd systeem en golflengte",w:"molecuul",h:["Geconjugeerd systeem","Absorptie","Kleur"],r:[
["Geen of één dubbele binding","Ver in het UV","Kleurloos"],
["Klein (2 tot 3 dubbele bindingen om en om)","UV","Kleurloos"],
["Groter","Schuift naar violet/blauw","Geel"],
["Nog groter","Schuift verder naar groen en rood","Oranje, rood, paars, blauw"],
["Regel","Hoe groter het systeem, hoe meer gedelokaliseerde elektronen, hoe minder energie nodig: grotere golflengte",""]]},
{t:"Verdringingsreeks (spectrochemische reeks)",w:"complex",h:["Positie","Liganden","Splitsingsenergie Δ"],r:[
["Zwak (links)","I⁻ < Br⁻ < S²⁻ < SCN⁻ < Cl⁻ < NO₃⁻ < F⁻ < OH⁻","Klein: absorptie bij grote golflengte"],
["Midden","H₂O","-"],
["Sterk (rechts)","NH₃ < ethaan-1,2-diamine < NO₂⁻ < CN⁻ < CO","Groot: absorptie bij kleine golflengte"],
["Regel","Het sterkste ligand verdringt de zwakkere en omringt het metaalion",""]]},
{t:"Complexvorming of redox",w:"complex",h:["Complexe verbinding","Redoxreactie"],r:[
["Donor geeft een elektronenpaar voor een binding","Donor geeft losse elektronen af aan de acceptor"],
["Lading van het element blijft hetzelfde","Lading van het element verandert"],
["Ligand = elektronenpaardonor, metaalion = elektronenpaaracceptor","Reductor geeft elektronen af, oxidator neemt elektronen op"]]},
{t:"Kleur van anorganische pigmenten",w:"complex",h:["Oorzaak","Uitleg","Voorbeeld"],r:[
["Overdracht van lading (redox)","Hetzelfde element met twee ladingen; licht laat een elektron overspringen","Pruisisch blauw: Fe²⁺ en Fe³⁺"],
["Complex van een overgangsmetaal","Liganden splitsen de energieniveaus; licht met energie Δ wordt geabsorbeerd","Kobaltblauw CoAl₂O₄"]]},
{t:"Pigmenten uit de module",w:"verkleuring",h:["Pigment","Formule of stof","Weetjes"],r:[
["Pruisisch blauw (Berlijns blauw)","Fe₄[Fe(CN)₆]₃ (Fe²⁺ en Fe³⁺)","1704, Diesbach; één van de eerste synthetische pigmenten; koel, naar groen; bruin door hitte of kalk"],
["Kobaltblauw","CoAl₂O₄","1802, Thénard; stabiel, goede dekkracht; warm, naar rood"],
["Chroomgeel","PbCrO₄ (Cr⁶⁺)","Zonnebloemen; wordt door UV bruiner"],
["Viridiaangroen","Cr₂O₃·2H₂O (Cr³⁺)","Ontstaat als dun groen laagje op chroomgeel"],
["Geraniumlak","Eosine op een witte drager","Fel rozerood, vervaagt; vloer en muren van De slaapkamer"],
["Loodwit","Loodverbinding","Kleurt zwart met zwavel (H₂S); verkleurt bij hitte; versnelt drogen"],
["Oker en omber","Metaaloxiden (aardpigmenten)","Al in de prehistorie; gele oker wordt rood/bruin bij hitte"]]},
{t:"Oorzaken van verkleuring",w:"verkleuring",h:["Oorzaak","Wat gebeurt er"],r:[
["Licht en zuurstof","UV breekt bindingen; moleculen veranderen en absorberen ander licht: verbleken of verkleuren"],
["Vergelen van vernis","Hars oxideert; meer dubbele bindingen; absorptie schuift van UV naar blauw: geel"],
["Vervuiling","Stof, roet, vet en water vormen een donkere film; roet is zuur; schimmels"],
["Gassen","NH₃, SOₓ en NOₓ geven verzuring: de verf valt uiteen"],
["Zwavelhoudende stoffen","Loodpigmenten worden grijs tot zwart (vooral in waterverf)"],
["Hitte","Loodwit, Pruisisch blauw en oker verkleuren; gele oker verliest zijn waterliganden"],
["Bindmiddel","Olie reageert met zuurstof en vergeelt (vooral witte verf); Pruisisch blauw wordt bruin in kalk"],
["Grondlaag","Zonder grondlaag zakt bindmiddel in het doek: verf verpoedert; witte grond kan ontkleuren versnellen"]]},
{t:"De slaapkamer: brief en schilderij nu",w:"verkleuring",h:["Onderdeel","Volgens de brief van Van Gogh","Wat er misging"],r:[
["Muren","Bleek violet","Nu blauw: het rode geraniumlak in het violet is verbleekt"],
["Vloer","Rode plavuizen","Rood (geraniumlak) verbleekt"],
["Bed en stoelen","Geel als verse boter","-"],
["Laken en kussens","Heel helder citroengroen","-"],
["Deken","Scharlakenrood","-"],
["Raam","Groen","-"],
["Toilettafel","Oranje","-"],
["Waskom","Blauw","-"],
["Deuren","Lila","Nu blauwer: rood verdwenen"]]},
{t:"Rekenen met licht",w:"licht",h:["Formule of gegeven","Betekenis"],r:[
["E = h · f","Energie van één foton (J)"],
["f = c / λ","Frequentie (Hz) uit golflengte (m)"],
["E = h · c / λ","Beide formules in één"],
["h = 6,626 · 10⁻³⁴ J s","Constante van Planck"],
["c = 3,00 · 10⁸ m/s","Lichtsnelheid (module: 2,997 · 10⁸ m/s)"],
["1 nm = 10⁻⁹ m","Dus 480 nm = 4,80 · 10⁻⁷ m"],
["1 eV = 1,6 · 10⁻¹⁹ J","Elektronvolt"],
["Kortere golflengte","Hogere frequentie en meer energie"]]},
{t:"Golflengte en kleur (ongeveer)",w:"licht",h:["Kleur","Golflengte"],r:[
["UV (onzichtbaar)","Kleiner dan 400 nm"],["Violet","ca. 400-450 nm"],["Blauw","ca. 450-490 nm"],["Groen","ca. 490-560 nm"],
["Geel","ca. 560-590 nm"],["Oranje","ca. 590-630 nm"],["Rood","ca. 630-750 nm"],["Infrarood (onzichtbaar)","Groter dan 750 nm"]]},
{t:"Elektromagnetisch spectrum",w:"licht",h:["Van kort naar lang","Energie"],r:[
["Gammastraling","Meeste energie"],["Röntgenstraling",""],["Ultraviolet (UV)",""],["Zichtbaar licht (400-750 nm)",""],["Infrarood",""],["Microgolven",""],["Radiogolven","Minste energie"]]}
];

window.LESSONS = {
format:[
"De oefentoets (set 1) bestaat uit 4 opgaven met in totaal 7 deelvragen (1, 2a, 2b, 2c, 3a, 3b en 4). Er is geen meerkeuze: alles is open.",
"Vraagsoorten: kiezen uit structuurformules en uitleggen, korte ‘noem’- en ‘benoem’-vragen (2 tot 4 woorden), uitleggen met het oog en de hersenen, en een grafiek aflezen bij een schilderij en dat in een tabelletje invullen.",
"In de losse oefenvragen (set 2) komen daar bij: een complex tekenen, Binas tabel 65B gebruiken, de energie van licht uitrekenen (E = h·f) en uitleggen hoe liganden elkaar verdringen.",
"Onderwerpen die terugkomen: kleur van moleculen (geconjugeerd systeem), droogproces van olieverf, zenuwbanen en chiasma opticum, kegeltjes en de grafiek uit figuur 22, complexen en liganden.",
"Neem je Binas mee en oefen het opzoeken van tabel 65B (kleur van ionen) en het spectrum (golflengte bij een kleur).",
"De oefentoets heeft geen puntentelling. In deze tool tellen we: opgave 1: 3 punten, opgave 2: 3 punten, opgave 3: 4 punten, opgave 4: 4 punten (14 totaal). Dat is onze inschatting."
],
corrections:[
{t:"Module p. 27: primaire kleuren van licht",d:"De module zegt dat bij de kleurencirkel van licht (figuur 32) magenta, geel en cyaan de primaire kleuren zijn. Dat klopt niet: bij licht (additief) zijn rood, groen en blauw de primaire kleuren. Magenta, geel en cyaan krijg je door twee kleuren licht te mengen. Een stukje verder zegt de module het zelf ook goed: ‘de primaire kleuren rood, blauw en groen’."},
{t:"Module p. 28: figuur 33 ‘verf’",d:"Het plaatje ‘verf’ in figuur 33 gebruikt cyaan, magenta en geel (zoals bij drukwerk). In de tekst en bij Charles Blanc zijn de primaire verfkleuren rood, geel en blauw. Het plaatje is niet fout (cyaan, magenta en geel zijn de echte primaire kleuren voor drukwerk), maar sluit niet aan bij Blanc. Vraagt de toets naar verf mengen bij Van Gogh, gebruik dan Blanc: rood + blauw = violet, blauw + geel = groen, geel + rood = oranje."},
{t:"Module p. 41: ‘blauw en geel teruggekaatst, samen groen’",d:"Bij verf klopt dat (blauwe + gele verf = groen), maar bij licht niet: blauw en geel licht samen geven (bijna) wit. Als een stof rood licht absorbeert, blijft vooral groen en blauw licht over; dat zie je als blauwgroen (cyaan). Volgens de kleurencirkel van Blanc is groen de tegenkleur van rood. ‘Groen’ of ‘blauwgroen’ is op de toets dus allebei te verdedigen."},
{t:"Module p. 41: ‘geadsorbeerd’ moet ‘geabsorbeerd’ zijn",d:"Er staat ‘Als rood geadsorbeerd wordt’. Bedoeld is geabsorbeerd (licht opnemen). Adsorberen is iets anders: een stof hecht aan een oppervlak. Dat woord hoort juist bij het maken van een lakpigment: de kleurstof adsorbeert aan de witte vaste stof."},
{t:"Module p. 96: ‘de uitgezonden kleur is de kleur die wij zien’",d:"Bij pigmenten zie je niet het licht dat wordt uitgezonden, maar het licht dat niet wordt geabsorbeerd (teruggekaatst). Dat is de complementaire kleur van de geabsorbeerde kleur. Uitzenden van licht speelt bij XRF en vlamkleuren. De volgende alinea in de module legt het wel goed uit."},
{t:"Module p. 32: het ‘filter in de oogzenuw’",d:"In het informatieblok van het museum staat dat de oogzenuw een ‘filter in complementaire kleur’ bouwt. Dat is een beeldspraak. Gebruik in de toets de uitleg uit paragraaf 4.4: opponente kanalen (rood-groen, geel-blauw, zwart-wit) en uitputting van één kant van het kanaal."},
{t:"Antwoordmodel set 2, vraag 1c: rekenfout in de macht",d:"Er staat (6,25 · 10⁻¹⁴) × (6,626 · 10⁻³⁴). De frequentie is 6,25 · 10¹⁴ Hz (positieve macht). De uitkomst 4,14 · 10⁻¹⁹ J klopt wel."},
{t:"Antwoordmodel set 2, vraag 2c: ‘endotherme reactie’",d:"De reactie van olie met zuurstof is juist exotherm (er komt warmte vrij; daarom kunnen doeken met lijnolie zelfs spontaan gaan branden). UV-licht levert de energie om de reactie op gang te brengen. Schrijf dus: ‘UV-licht levert de energie die nodig is om de reactie te laten verlopen’, zoals in de module, en noem het niet endotherm."},
{t:"Antwoordmodel set 2, vraag 2b: triglyceriden en bindmiddel",d:"Er staat dat de vetmoleculen ‘met het bindmiddel’ reageren. De triglyceriden zíjn het bindmiddel (lijnolie). Het gaat om de dubbele bindingen (C=C) in de onverzadigde vetzuurketens; die reageren met zuurstof."},
{t:"Antwoordmodel set 2, vraag 1e: kleur van [Fe(CN)₆]³⁻",d:"Het model geeft ‘rood’. Dat konden we niet controleren, want Binas zit niet in het lesmateriaal. Let op: in het echt is een oplossing van dit ion geel; alleen het vaste zout (‘rood bloedloogzout’) is rood. Kijk in jouw Binas tabel 65B wat er staat en vraag het zo nodig aan je docent. Gebruik in de toets de kleur uit Binas."},
{t:"Oefentoets set 1, vraag 1: eosine of indigo?",d:"Met de regel uit de module (groter geconjugeerd systeem = grotere golflengte) kies je eosine: dat heeft het grootste systeem. In het echt absorbeert indigo (blauw, het absorbeert oranje licht van ongeveer 600 nm) bij een grotere golflengte dan eosine (rood, het absorbeert groen licht van ongeveer 520 nm). De regel is een vuistregel. Op de toets verwacht je docent waarschijnlijk de redenering met het geconjugeerde systeem; vraag het voor de zekerheid na."}
],
weak:[
{w:"molecuul",t:"Geabsorbeerd is niet hetzelfde als wat je ziet",d:"Een stof die blauw licht absorbeert, ziet er geel uit. Je ziet de complementaire kleur. Lees bij elke vraag goed of het gaat om de kleur van de stof of om het licht dat wordt geabsorbeerd."},
{w:"molecuul",t:"Groter systeem = grotere golflengte",d:"Meer afwisselende enkele en dubbele bindingen = meer gedelokaliseerde elektronen = minder energie nodig = absorptie bij een grotere golflengte. Veel leerlingen draaien dit om."},
{w:"oog",t:"Niet alle zenuwbanen kruisen",d:"Alleen de vezels van de neuskant van het netvlies kruisen in het chiasma opticum. Daardoor komt de linkerhelft van wat je ziet in de rechterhersenhelft terecht, uit beide ogen."},
{w:"oog",t:"Het beeld op je netvlies staat op zijn kop",d:"De lens keert het beeld om. Het linkerdeel van een schilderij valt op de rechterhelft van je netvlies. Neem die stap op in je uitleg."},
{w:"netvlies",t:"Grafiek aflezen: noem ook 0%",d:"Vul alle drie de kegeltjes in, ook als het percentage 0 is. Leg uit: ‘bij de golflengte van deze kleur (bijv. 580 nm) een verticale lijn getrokken en afgelezen waar die de curves snijdt’."},
{w:"netvlies",t:"Eerst de kleur, dan de golflengte",d:"Kijk goed welke kleur er op de plek van de pijl staat (lichtblauw, turkoois, oranje?). Kies een golflengte die bij die kleur past en lees daar af. Je docent rekent goed af als je aflezing klopt bij jouw golflengte."},
{w:"verf",t:"Fysisch en chemisch drogen niet verwarren",d:"Fysisch: oplosmiddel verdampt. Chemisch: dubbele bindingen reageren met zuurstof onder invloed van UV-licht, polymerisatie (vernetting). Het gas is zuurstof, niet koolstofdioxide."},
{w:"complex",t:"Sterkste ligand wint",d:"Een ligand dat verder rechts in de verdringingsreeks staat, bindt sterker en verdringt de andere. Sterker ligand = grotere Δ = absorptie bij kleinere golflengte."},
{w:"licht",t:"Golflengte in meter",d:"Reken nm om naar m (× 10⁻⁹) voor je f = c/λ invult. Gebruik bij een gekleurde oplossing de golflengte van het licht dat geabsorbeerd wordt, als de vraag daarom vraagt."},
{w:"verkleuring",t:"Twee pigmenten in één kleur",d:"Violet bij De slaapkamer = blauw pigment + rood geraniumlak. Als het rood verbleekt, blijft blauw over. Noem in je uitleg beide pigmenten en de oorzaak (UV-licht)."}
],
tips:[
{t:"Leg uit in drie stappen",d:"Gegeven (wat zie je in de bron), regel (welke theorie hoort erbij), conclusie. Bij ‘leg uit’ levert alleen het antwoord meestal maar 1 punt op."},
{t:"Gebruik vaktermen",d:"Schrijf ‘gedelokaliseerde elektronen’ in plaats van ‘elektronen die bewegen’, ‘chiasma opticum’ in plaats van ‘kruispunt’, ‘polymerisatie’ in plaats van ‘het wordt hard’."},
{t:"Bij ‘noem’ en ‘benoem’ kort antwoorden",d:"Twee tot vier woorden is genoeg: ‘verdampen van het oplosmiddel’, ‘polymerisatie (vernetting)’, ‘zuurstof’."},
{t:"Rekenvragen: laat je stappen zien",d:"Schrijf eerst de formule, dan de ingevulde formule met eenheden, dan de uitkomst met de juiste macht en eenheid. Voor elke stap kun je een punt krijgen."},
{t:"Teken netjes",d:"Bij een metaalion met watermoleculen wijst het O-atoom (met zijn vrije elektronenparen) naar het positieve ion. De H-atomen wijzen naar buiten."}
],
missing:[
"E = h·f en f = c/λ (bijlage 2, paragraaf B2.3): komt terug in set 2 bij het berekenen van de energie van licht.",
"Complexen, liganden en de verdringingsreeks (bijlage 1, B1.1): hoofdstuk 5 noemt liganden maar kort; set 2 vraagt om tekenen, verdringen en kleurverandering.",
"Binas tabel 65B (kleur van ionen in oplossing) en het spectrum (golflengte bij een kleur): staan niet in de module, maar heb je nodig bij set 2.",
"Een complex tekenen met de juiste oriëntatie van watermoleculen (vrij elektronenpaar van O naar het ion).",
"Geconjugeerd systeem en gedelokaliseerde elektronen (bijlage 1, B1.2): de uitleg staat vooral in de bijlage.",
"Redox en halfreacties (bijlage 1, B1.3): nodig bij chroomgeel (Cr⁶⁺ + 3 e⁻ → Cr³⁺)."
]
};
