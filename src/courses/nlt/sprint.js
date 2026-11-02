// NLT sprintrondes: snel herkennen en koppelen.
window.SPRINT = [
{id:"oogdelen",title:"Welk deel van het oog?",w:"oog",choices:["Hoornvlies","Iris","Pupil","Ooglens","Glasachtig lichaam","Netvlies","Blinde vlek","Chiasma opticum"],items:[
{t:"Doorzichtig voorste deel van de harde oogrok; eerste lens.",a:"Hoornvlies"},
{t:"Gekleurde ring met kringspieren die de hoeveelheid licht regelt.",a:"Iris"},
{t:"Opening die nauw wordt bij fel licht.",a:"Pupil"},
{t:"Tweede lens, achter de iris; stelt scherp.",a:"Ooglens"},
{t:"Geleiachtige vloeistof die het oog rond houdt.",a:"Glasachtig lichaam"},
{t:"Lichtgevoelige ‘filmplaat’ met staafjes en kegeltjes.",a:"Netvlies"},
{t:"Plek zonder zintuigcellen, waar de oogzenuw het oog verlaat.",a:"Blinde vlek"},
{t:"Kruispunt waar vezels van de neuskant naar de andere hersenhelft gaan.",a:"Chiasma opticum"},
{t:"Het ‘diafragma’ van het oog.",a:"Iris"},
{t:"Hier komt het omgekeerde beeld terecht.",a:"Netvlies"},
{t:"Zonder dit deel zou het licht verkeerd gebroken worden omdat het oog niet rond blijft.",a:"Glasachtig lichaam"},
{t:"Zorgt dat elke hersenhelft een half beeld van beide ogen krijgt.",a:"Chiasma opticum"}]},
{id:"staafkegel",title:"Staafje of kegeltje?",w:"netvlies",choices:["Staafjes","Kegeltjes"],items:[
{t:"Werken bij weinig licht.",a:"Staafjes"},{t:"Zien kleur.",a:"Kegeltjes"},{t:"Ongeveer 120 miljoen per oog.",a:"Staafjes"},
{t:"Alleen deze zitten in de gele vlek.",a:"Kegeltjes"},{t:"Meerdere op één zenuwcel: signaalversterking.",a:"Staafjes"},
{t:"Eén-op-één-aansluiting: veel detail.",a:"Kegeltjes"},{t:"Zien alleen grijstinten.",a:"Staafjes"},{t:"Er zijn drie typen: S, M en L.",a:"Kegeltjes"},
{t:"Belangrijk voor het opmerken van beweging.",a:"Staafjes"},{t:"Werken alleen bij voldoende licht.",a:"Kegeltjes"},
{t:"Liggen vooral aan de rand van het netvlies.",a:"Staafjes"},{t:"Ongeveer 5 miljoen per oog.",a:"Kegeltjes"}]},
{id:"blanc",title:"Complementaire kleur (Charles Blanc)",w:"kleur",choices:["Rood","Oranje","Geel","Groen","Blauw","Violet"],items:[
{t:"Complementair aan rood",a:"Groen"},{t:"Complementair aan groen",a:"Rood"},{t:"Complementair aan blauw",a:"Oranje"},
{t:"Complementair aan oranje",a:"Blauw"},{t:"Complementair aan geel",a:"Violet"},{t:"Complementair aan violet",a:"Geel"},
{t:"Nabeeld na staren naar een rode muts",a:"Groen"},{t:"Nabeeld na staren naar een groene jas",a:"Rood"},
{t:"Verf: rood + blauw",a:"Violet"},
{t:"Verf: blauw + geel",a:"Groen"},{t:"Verf: geel + rood",a:"Oranje"}]},
{id:"mengen",title:"Licht of verf mengen",w:"kleur",choices:["Geel","Magenta","Cyaan","Wit","Groen","Violet","Oranje","(Bijna) zwart"],items:[
{t:"Rood + groen licht",a:"Geel"},{t:"Rood + blauw licht",a:"Magenta"},{t:"Groen + blauw licht",a:"Cyaan"},
{t:"Rood + groen + blauw licht",a:"Wit"},{t:"Blauwe + gele verf",a:"Groen"},{t:"Rode + blauwe verf",a:"Violet"},
{t:"Gele + rode verf",a:"Oranje"},{t:"Alle verfkleuren door elkaar",a:"(Bijna) zwart"},
{t:"Complementair aan blauw in de kleurencirkel van licht",a:"Geel"},{t:"Complementair aan groen in de kleurencirkel van licht",a:"Magenta"},
{t:"Complementair aan rood in de kleurencirkel van licht",a:"Cyaan"}]},
{id:"groepen",title:"Chromofoor of auxochroom?",w:"molecuul",choices:["Chromofoor","Auxochroom"],items:[
{t:"-OH",a:"Auxochroom"},{t:">C=O",a:"Chromofoor"},{t:"-NH₂",a:"Auxochroom"},{t:"-NO₂",a:"Chromofoor"},
{t:"-N=N-",a:"Chromofoor"},{t:"-Br",a:"Auxochroom"},{t:"-OCH₃",a:"Auxochroom"},{t:">C=C<",a:"Chromofoor"},
{t:"-COOH",a:"Chromofoor"},{t:"-Cl",a:"Auxochroom"},{t:"-NHR",a:"Auxochroom"},{t:">C=S",a:"Chromofoor"},
{t:"Heeft vrije elektronenparen (elektronenpaardonor)",a:"Auxochroom"},{t:"Heeft meervoudige bindingen (elektronenpaaracceptor)",a:"Chromofoor"}]},
{id:"liganden",title:"Sterker of zwakker dan water?",w:"complex",choices:["Sterker dan water","Zwakker dan water"],items:[
{t:"NH₃",a:"Sterker dan water"},{t:"CN⁻",a:"Sterker dan water"},{t:"Cl⁻",a:"Zwakker dan water"},{t:"I⁻",a:"Zwakker dan water"},
{t:"CO",a:"Sterker dan water"},{t:"Br⁻",a:"Zwakker dan water"},{t:"Ethaan-1,2-diamine",a:"Sterker dan water"},{t:"F⁻",a:"Zwakker dan water"},
{t:"NO₂⁻",a:"Sterker dan water"},{t:"SCN⁻",a:"Zwakker dan water"},{t:"OH⁻",a:"Zwakker dan water"},{t:"NO₃⁻",a:"Zwakker dan water"},{t:"S²⁻",a:"Zwakker dan water"}]},
{id:"stoffen",title:"Pigment, kleurstof of bindmiddel?",w:"verf",choices:["Pigment","Kleurstof","Bindmiddel"],items:[
{t:"Lijnolie",a:"Bindmiddel"},{t:"Indigo",a:"Kleurstof"},{t:"Kobaltblauw",a:"Pigment"},{t:"Eigeel",a:"Bindmiddel"},
{t:"Eosine (opgelost)",a:"Kleurstof"},{t:"Arabische gom",a:"Bindmiddel"},{t:"Pruisisch blauw",a:"Pigment"},{t:"Geraniumlak",a:"Pigment"},
{t:"Gele oker",a:"Pigment"},{t:"Alizarine (opgelost)",a:"Kleurstof"},{t:"Chroomgeel",a:"Pigment"},{t:"Synthetisch polymeer in acrylverf",a:"Bindmiddel"}]},
{id:"organisch",title:"Organisch of anorganisch pigment?",w:"verf",choices:["Organisch","Anorganisch"],items:[
{t:"Kraplak",a:"Organisch"},{t:"Cochenillelak",a:"Organisch"},{t:"Geraniumlak",a:"Organisch"},{t:"Gele oker",a:"Anorganisch"},
{t:"Omber",a:"Anorganisch"},{t:"Pruisisch blauw",a:"Anorganisch"},{t:"Kobaltblauw",a:"Anorganisch"},{t:"Chroomgeel",a:"Anorganisch"},
{t:"Viridiaangroen",a:"Anorganisch"},{t:"Bevat bijna altijd een overgangsmetaal",a:"Anorganisch"},{t:"Opgebouwd uit koolstofverbindingen",a:"Organisch"},
{t:"Intense warme kleuren, maar niet lichtecht",a:"Organisch"}]},
{id:"verkleuring",title:"Welke oorzaak van verkleuring?",w:"verkleuring",choices:["Licht (UV)","Vernis","Vervuiling","Gassen","Zwavel","Hitte","Bindmiddel","Grondlaag"],items:[
{t:"Het rode geraniumlak in De slaapkamer verbleekt.",a:"Licht (UV)"},
{t:"De hars in de beschermlaag oxideert en wordt geel.",a:"Vernis"},
{t:"Roet en stof vormen een donkere, zure film; schimmels groeien.",a:"Vervuiling"},
{t:"NH₃, SOₓ en NOₓ uit de ventilatie zorgen voor verzuring.",a:"Gassen"},
{t:"Een tekening met loodwit wordt grijs tot zwart.",a:"Zwavel"},
{t:"Na een brand is gele oker rood geworden.",a:"Hitte"},
{t:"Witte verf met lijnolie vergeelt; maanzaadolie helpt.",a:"Bindmiddel"},
{t:"Zonder deze laag zakt het bindmiddel in het doek en verpoedert de verf.",a:"Grondlaag"},
{t:"Chroomgeel in de Zonnebloemen wordt bruiner.",a:"Licht (UV)"},
{t:"Pruisisch blauw wordt bruin in een kalkhoudend bindmiddel.",a:"Bindmiddel"}]},
{id:"jaartallen",title:"Jaartallen en namen",w:"verkleuring",choices:["1704","1802","1804","1826","1867","1873","1888","1889"],items:[
{t:"Diesbach ontdekt Pruisisch blauw in Berlijn",a:"1704"},{t:"Thénard ontdekt kobaltblauw",a:"1802"},
{t:"George Field ontdekt hoe je lakpigmenten maakt",a:"1804"},{t:"Robiquet scheidt alizarine af uit meekrap",a:"1826"},
{t:"Kleurencirkel van Charles Blanc (Grammaire des arts du dessin)",a:"1867"},{t:"Eosine voor het eerst gemaakt",a:"1873"},
{t:"Van Gogh schildert De slaapkamer in Arles",a:"1888"},{t:"Zonnebloemen (versie in de module)",a:"1889"},
{t:"Caféterras bij nacht en Het nachtcafé",a:"1888"},{t:"Brief over De zoeaaf aan Theo",a:"1888"}]},
{id:"golflengte",title:"Golflengte en kleur",w:"licht",choices:["UV","Violet","Blauw","Groen","Geel","Oranje","Rood","Infrarood"],items:[
{t:"300 nm",a:"UV"},{t:"420 nm",a:"Violet"},{t:"470 nm",a:"Blauw"},{t:"520 nm",a:"Groen"},{t:"535 nm",a:"Groen"},
{t:"580 nm",a:"Geel"},{t:"610 nm",a:"Oranje"},{t:"680 nm",a:"Rood"},{t:"900 nm",a:"Infrarood"},{t:"Wordt door verse vernis geabsorbeerd, maar is onzichtbaar",a:"UV"},
{t:"Wordt geabsorbeerd door vergeelde vernis",a:"Blauw"},{t:"Wordt geabsorbeerd door een rode stof",a:"Groen"}]},
{id:"formules",title:"Formules en constanten",w:"licht",choices:["h · f","c / λ","h · c / λ","6,626 · 10⁻³⁴ J s","3,00 · 10⁸ m/s","1,6 · 10⁻¹⁹ J","10⁻⁹ m"],items:[
{t:"E (uitgedrukt in f) =",a:"h · f"},{t:"f =",a:"c / λ"},{t:"E (uitgedrukt in λ) =",a:"h · c / λ"},{t:"Constante van Planck h",a:"6,626 · 10⁻³⁴ J s"},
{t:"Lichtsnelheid c",a:"3,00 · 10⁸ m/s"},{t:"1 eV",a:"1,6 · 10⁻¹⁹ J"},{t:"1 nm",a:"10⁻⁹ m"},{t:"Frequentie uit golflengte",a:"c / λ"},
{t:"Energie van één foton uit de frequentie",a:"h · f"}]}
];
