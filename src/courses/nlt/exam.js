// NLT proeftoets: dezelfde opbouw als de oefentoets (set 1): 4 opgaven, 7 deelvragen.
// Per opgave staan er meerdere varianten; elke proeftoets kiest per opgave één variant.
// Puntentelling (eigen inschatting, de oefentoets geeft geen punten): 3 + 3 + 4 + 4 = 14 punten.
// fields: invulvelden. f:"text" (standaard), f:"choice" (keuze, ok = index), f:"cones" (golflengte + percentages), f:"num".
// c: correctiemodel; auto = wordt automatisch nagekeken ("choice", "lambda", "cones-types", "cones-pct", "num").
window.EXAM = {
title:"Proeftoets NLT",
desc:"Vier opgaven met zeven deelvragen, net als de oefentoets: structuurformules, olieverf, het oog en de kegeltjesgrafiek. Je typt je antwoorden. Na het inleveren kijk je zelf na met het correctiemodel; een deel wordt automatisch nagekeken. Daarna krijg je een cijfer en een score per onderwerp.",
note:"De oefentoets geeft geen puntentelling. Wij rekenen met 14 punten (3 + 3 + 4 + 4) en cijfer = 1 + 9 × (score / 14). Elke keer krijg je andere varianten van de opgaven. Neem je Binas erbij.",
slots:[
// ================= OPGAVE 1: kleur van moleculen (3 punten) =================
{n:1,title:"Kleur van moleculen",t:"molecuul",variants:[
{id:"1a",fig:{mols:[["hexatrieen","Hexa-1,3,5-trieen"],["retinol","Retinol"],["betacaroteen","β-caroteen"]]},
intro:"Hieronder staan de structuurformules van drie stoffen.",
parts:[{l:"",p:3,q:"Welke van de drie stoffen zal licht met de grootste golflengte absorberen? Leg uit.",
fields:[{f:"choice",label:"Mijn keuze",opts:["Hexa-1,3,5-trieen","Retinol","β-caroteen"],ok:2},{f:"text"}],
c:[{p:1,t:"Keuze: β-caroteen.",auto:"choice"},{p:1,t:"β-caroteen heeft het grootste geconjugeerde systeem: de meeste afwisselende enkele en dubbele bindingen, dus de meeste gedelokaliseerde elektronen."},{p:1,t:"Hoe groter het geconjugeerde systeem, hoe minder energie nodig is om een elektron aan te slaan, dus hoe groter de golflengte van het geabsorbeerde licht."}],
m:"β-caroteen. Het heeft het grootste geconjugeerde systeem (11 dubbele bindingen om en om met enkele bindingen, tegen 5 bij retinol en 3 bij hexatrieen). Er zijn dus meer gedelokaliseerde elektronen. Daardoor is er minder energie nodig om een elektron aan te slaan en wordt licht met een grotere golflengte geabsorbeerd."}]},
{id:"1b",fig:{mols:[["naftaleen","Naftaleen"],["antraceen","Antraceen"],["tetraceen","Tetraceen"]]},
intro:"Hieronder staan de structuurformules van drie stoffen die alleen uit benzeenringen bestaan.",
parts:[{l:"",p:3,q:"Welke van de drie stoffen zal licht met de grootste golflengte absorberen? Leg uit.",
fields:[{f:"choice",label:"Mijn keuze",opts:["Naftaleen","Antraceen","Tetraceen"],ok:2},{f:"text"}],
c:[{p:1,t:"Keuze: tetraceen.",auto:"choice"},{p:1,t:"Tetraceen heeft het grootste geconjugeerde systeem (vier ringen, de meeste afwisselende enkele en dubbele bindingen, de meeste gedelokaliseerde elektronen)."},{p:1,t:"Groter geconjugeerd systeem: minder energie nodig om een elektron aan te slaan, dus een grotere golflengte."}],
m:"Tetraceen. Het geconjugeerde systeem loopt over vier ringen en is het grootst. Er zijn de meeste gedelokaliseerde elektronen, dus er is de minste energie nodig om een elektron aan te slaan. De absorptie ligt dan bij de grootste golflengte."}]},
{id:"1c",fig:{mols:[["butadieen","Buta-1,3-dieen"],["hexatrieen","Hexa-1,3,5-trieen"],["retinol","Retinol"]]},
intro:"Hieronder staan de structuurformules van drie stoffen.",
parts:[{l:"",p:3,q:"Welke van de drie stoffen zal licht met de kleinste golflengte absorberen? Leg uit.",
fields:[{f:"choice",label:"Mijn keuze",opts:["Buta-1,3-dieen","Hexa-1,3,5-trieen","Retinol"],ok:0},{f:"text"}],
c:[{p:1,t:"Keuze: buta-1,3-dieen.",auto:"choice"},{p:1,t:"Butadieen heeft het kleinste geconjugeerde systeem (maar twee dubbele bindingen om en om), dus de minste gedelokaliseerde elektronen."},{p:1,t:"Kleiner geconjugeerd systeem: er is meer energie nodig om een elektron aan te slaan, dus een kleinere golflengte."}],
m:"Buta-1,3-dieen. Het heeft het kleinste geconjugeerde systeem: twee dubbele bindingen (hexatrieen drie, retinol vijf). Met de minste gedelokaliseerde elektronen is de meeste energie nodig om een elektron aan te slaan. Meer energie hoort bij een kleinere golflengte."}]},
{id:"1d",fig:{mols:[["hexaan","Hexaan"],["hexatrieen","Hexa-1,3,5-trieen"],["azobenzeen","Azobenzeen"]]},
intro:"Hieronder staan de structuurformules van drie stoffen. Eén ervan is oranjegeel, de andere twee zijn kleurloos.",
parts:[{l:"",p:3,q:"Welke stof is gekleurd? Leg uit.",
fields:[{f:"choice",label:"Mijn keuze",opts:["Hexaan","Hexa-1,3,5-trieen","Azobenzeen"],ok:2},{f:"text"}],
c:[{p:1,t:"Keuze: azobenzeen.",auto:"choice"},{p:1,t:"Azobenzeen heeft een groot geconjugeerd systeem: twee benzeenringen verbonden door de chromofore groep -N=N-. Hexaan heeft geen dubbele bindingen, hexatrieen maar een klein systeem."},{p:1,t:"Door het grote geconjugeerde systeem schuift de absorptie van UV naar zichtbaar (violet/blauw) licht; de andere twee absorberen alleen UV en zijn kleurloos."}],
m:"Azobenzeen. De twee benzeenringen en de -N=N-groep vormen samen een groot geconjugeerd systeem met veel gedelokaliseerde elektronen. Daardoor is er minder energie nodig om een elektron aan te slaan en wordt zichtbaar (violetblauw) licht geabsorbeerd: de stof is oranjegeel. Hexaan heeft geen dubbele bindingen en hexatrieen een te klein systeem; die absorberen alleen UV."}]},
{id:"1e",fig:{mols:[["karmijnzuur","Karmijnzuur, de kleurstof van cochenille"]]},
intro:"Cochenille is een rode kleurstof uit de cochenilleluis. Hieronder staat de structuurformule van karmijnzuur, de stof die de kleur geeft.",
parts:[
{l:"a",p:2,q:"Noem één chromofore groep en één auxochrome groep in karmijnzuur.",
c:[{p:1,t:"Chromofore groep: >C=O (of -COOH, of de C=C-bindingen van het ringsysteem)."},{p:1,t:"Auxochrome groep: -OH."}],
m:"Chromofoor: de >C=O-groepen (ook goed: de -COOH-groep of de C=C-bindingen in de ringen). Auxochroom: de -OH-groepen."},
{l:"b",p:1,q:"Cochenille is rood. Welke kleur licht wordt vooral geabsorbeerd? Leg uit.",
c:[{p:1,t:"Groen (blauwgroen) licht, want je ziet de complementaire kleur van het geabsorbeerde licht."}],
m:"Groen (blauwgroen) licht. De kleur die je ziet is de complementaire kleur van de geabsorbeerde kleur; complementair aan rood is groen."}]}
]},
// ================= OPGAVE 2: verf (3 punten) =================
{n:2,title:"Verf",t:"verf",variants:[
{id:"2a",intro:"Olieverf droogt door een fysisch en een chemisch proces.",
parts:[
{l:"a",p:1,q:"Welke bindingen in de vetzuurketens van lijnolie zijn nodig voor het chemisch drogen?",c:[{p:1,t:"Dubbele bindingen (C=C), dus onverzadigde vetzuren."}],m:"De dubbele bindingen (C=C) in de onverzadigde vetzuren."},
{l:"b",p:1,q:"Welk deel van het licht levert de energie voor het chemisch drogen?",c:[{p:1,t:"Het ultraviolette deel (UV)."}],m:"Het ultraviolette deel van het licht (UV)."},
{l:"c",p:1,q:"Bij het fysisch drogen ontstaat een harde film. Hoe heten de krachten die pigment en bindmiddel dan bij elkaar houden?",c:[{p:1,t:"Vanderwaalskrachten (vanderwaalsbinding)."}],m:"Vanderwaalskrachten."}]},
{id:"2b",intro:"Voordat olieverf bestond, schilderde men met ei-tempera.",
parts:[
{l:"a",p:1,q:"Noem het bindmiddel van ei-tempera.",c:[{p:1,t:"Eigeel."}],m:"Eigeel."},
{l:"b",p:1,q:"Ei-tempera is een emulsie. Noem de emulgator uit eigeel die de module noemt.",c:[{p:1,t:"Lecithine."}],m:"Lecithine."},
{l:"c",p:1,q:"Waarom wordt er soms azijn aan ei-tempera toegevoegd?",c:[{p:1,t:"Tegen bederf (ei is een biologisch product)."}],m:"Om bederf tegen te gaan."}]},
{id:"2c",intro:"Een schilder werkt met olieverf in meerdere lagen.",
parts:[
{l:"a",p:1,q:"Noem het oplosmiddel uit naaldbomen waarmee je olieverf verdunt.",c:[{p:1,t:"Terpentijn (niet: terpentine)."}],m:"Terpentijn."},
{l:"b",p:1,q:"Waarom moet je vette verf op magere verf schilderen en niet andersom?",c:[{p:1,t:"Vette verf droogt langzamer; een magere laag erop zou scheuren."}],m:"Vette verf (met lijnolie) droogt langzamer dan magere verf (met terpentijn). Schilder je mager op vet, dan scheurt de magere bovenlaag."},
{l:"c",p:1,q:"Van welke plant komt lijnolie?",c:[{p:1,t:"Van de vlasplant (lijnzaad)."}],m:"Van de vlasplant: lijnolie wordt uit lijnzaad geperst."}]},
{id:"2d",intro:"Van Gogh gebruikte het lakpigment geraniumlak.",
parts:[
{l:"a",p:1,q:"Waarom kun je een kleurstof zoals eosine niet direct als pigment gebruiken?",c:[{p:1,t:"Een kleurstof lost op; een pigment moet onoplosbaar zijn."}],m:"Een kleurstof lost op, terwijl een pigment uit onoplosbare korrels moet bestaan."},
{l:"b",p:1,q:"Waaraan hecht (adsorbeert) de kleurstof bij het maken van een lakpigment?",c:[{p:1,t:"Aan een onoplosbare witte vaste stof (gemaakt uit aluin en KOH)."}],m:"Aan een onoplosbare witte vaste stof, meestal gemaakt uit aluin (een aluminiumzout) en KOH-oplossing."},
{l:"c",p:1,q:"Noem één nadeel van geraniumlak.",c:[{p:1,t:"Niet stabiel / niet lichtecht: het vervaagt (verbleekt) door licht."}],m:"Het is niet stabiel: het vervaagt (verbleekt) onder invloed van licht."}]},
{id:"2e",intro:"Niet elk pigment is geschikt voor olieverf.",
parts:[
{l:"a",p:1,q:"Hoe heet het verschijnsel dat een pigment oplost in de olie en in andere verflagen trekt?",c:[{p:1,t:"Bloeden (van het schilderij)."}],m:"Bloeden."},
{l:"b",p:1,q:"Welke soort pigmenten heeft hier vooral last van: organische of anorganische?",c:[{p:1,t:"Organische pigmenten."}],m:"Organische pigmenten."},
{l:"c",p:1,q:"Loodwit wordt zwart in een ruimte met waterstofsulfide. Noem de stof die daarbij ontstaat.",c:[{p:1,t:"Loodsulfide (PbS)."}],m:"Loodsulfide (PbS), een zwarte stof."}]}
]},
// ================= OPGAVE 3: het oog (4 punten) =================
{n:3,title:"Het oog",t:"oog",variants:[
{id:"3a",fig:{img:"zelfportret"},intro:"Je kijkt naar het Zelfportret met verbonden oor van Van Gogh.",
parts:[
{l:"a",p:3,q:"In jouw hersenen wordt een beeld gevormd van dit schilderij. Waar in je hersenen wordt het rechterdeel van dit schilderij afgebeeld? Leg uit.",
c:[{p:1,t:"In de linkerhersenhelft."},{p:1,t:"De ooglens keert het beeld om: het rechterdeel van het schilderij valt op de linkerhelft van beide netvliezen."},{p:1,t:"Van het rechteroog is dat de neuskant: die vezels kruisen in het chiasma opticum naar links. Van het linkeroog is dat de slaapkant: die kruisen niet en blijven links."}],
m:"In de linkerhersenhelft. De lens keert het beeld om, dus het rechterdeel valt op de linkerhelft van beide netvliezen. In het rechteroog is dat de neuskant; die zenuwbanen kruisen in het chiasma opticum naar de linkerhersenhelft. In het linkeroog is dat de slaapkant; die zenuwbanen kruisen niet en gaan ook naar links."},
{l:"b",p:1,q:"Van welk deel van het netvlies kruisen de zenuwbanen in het chiasma opticum?",c:[{p:1,t:"Van de neuskant van het netvlies (niet van de slaapkant)."}],m:"Alleen van de neuskant van het netvlies."}]},
{id:"3b",fig:{img:"zonnebloemen"},intro:"Je bekijkt de Zonnebloemen en wilt de kleine handtekening ‘Vincent’ op de vaas scherp zien.",
parts:[
{l:"a",p:3,q:"Op welke plek van je netvlies moet het beeld van de handtekening vallen? Leg uit waarom je daar scherp ziet.",
c:[{p:1,t:"Op de gele vlek."},{p:1,t:"Daar zitten (alleen) kegeltjes."},{p:1,t:"Elk kegeltje heeft een één-op-één-aansluiting op een zenuwcel, dus je ziet veel details."}],
m:"Op de gele vlek. Daar zitten alleen kegeltjes. Elk kegeltje is op een eigen zenuwcel aangesloten (één op één), waardoor je veel details ziet."},
{l:"b",p:1,q:"Waarom zie je niets van wat op de blinde vlek valt?",c:[{p:1,t:"Daar gaat de oogzenuw door het netvlies; er zitten geen zintuigcellen (staafjes en kegeltjes)."}],m:"Op de blinde vlek lopen de zenuwvezels door het netvlies naar buiten. Daar zitten geen staafjes en kegeltjes."}]},
{id:"3c",fig:{img:"slaapkamer-nu"},intro:"In een museumzaal wordt het licht gedimd om De slaapkamer te beschermen.",
parts:[
{l:"a",p:3,q:"Bij heel weinig licht zie je de vormen van het schilderij nog wel, maar bijna geen kleuren. Leg uit.",
c:[{p:1,t:"Bij weinig licht werken alleen de staafjes."},{p:1,t:"Staafjes zien geen kleur, alleen grijstinten (contrast)."},{p:1,t:"Kegeltjes (kleur) werken alleen bij voldoende licht."}],
m:"Bij weinig licht werken alleen de staafjes. Staafjes zien alleen licht en donker (grijstinten), dus wel vormen. De kegeltjes, waarmee je kleur ziet, werken alleen bij voldoende licht."},
{l:"b",p:1,q:"Waarom zie je bij weinig licht beter met staafjes dan met kegeltjes?",c:[{p:1,t:"Meerdere staafjes zijn op één zenuwcel geschakeld: signaalversterking."}],m:"Meerdere staafjes zijn geschakeld op één zenuwcel. Hun signalen worden opgeteld (signaalversterking)."}]},
{id:"3d",fig:{img:"zonnebloemen"},intro:"Van Gogh schilderde de Zonnebloemen met dikke klodders verf. Die kun je als diepte zien.",
parts:[
{l:"a",p:3,q:"Leg uit hoe je met twee ogen diepte kunt zien. Gebruik het chiasma opticum in je uitleg.",
c:[{p:1,t:"Elk oog ziet het schilderij vanuit een iets ander perspectief."},{p:1,t:"Via het chiasma opticum krijgt elke hersenhelft halve beelden van beide ogen."},{p:1,t:"De hersenen gebruiken het verschil tussen de beelden om de diepte te schatten."}],
m:"Je ogen staan een stukje uit elkaar en zien het schilderij dus vanuit een iets ander perspectief. In het chiasma opticum kruisen de vezels van de neuskant, zodat elke hersenhelft halve beelden van beide ogen krijgt. De hersenen vergelijken die beelden en gebruiken het verschil om de diepte te schatten."},
{l:"b",p:1,q:"Welk onderdeel van het oog regelt hoeveel licht er binnenkomt?",c:[{p:1,t:"De iris (met kringspieren; de pupil is de opening)."}],m:"De iris."}]},
{id:"3e",t:"kleur",fig:{img:"zoeaaf",arrow:[27,16]},intro:"Je staart 20 seconden naar de rode muts van De zoeaaf (zie pijl) en kijkt daarna naar een wit vel papier.",
parts:[
{l:"a",p:3,q:"Welke kleur zie je op het witte papier? Leg uit.",
c:[{p:1,t:"Groen."},{p:1,t:"Rood en groen zitten in één opponent kanaal (rood-groen); door het staren raakt de rode component uitgeput."},{p:1,t:"Wit stimuleert alles; de groene component reageert nu sterker dan de rode, dus de balans slaat door naar groen."}],
m:"Groen. De signalen van de kegeltjes gaan via opponente kanalen; rood en groen zitten in hetzelfde kanaal. Door het staren raakt de rode component uitgeput. Wit stimuleert beide componenten, maar de rode reageert minder sterk. De balans slaat door naar groen: een groen nabeeld."},
{l:"b",p:1,q:"Hoe heet het verschijnsel dat een kleur er anders uitziet door de kleuren eromheen?",c:[{p:1,t:"Simultaancontrast."}],m:"Simultaancontrast."}]}
]},
// ================= OPGAVE 4: kegeltjes (4 punten) =================
{n:4,title:"Kegeltjes en kleur",t:"netvlies",variants:[
{id:"4a",fig:{img:"zonnebloemen",arrow:[10,8],cones:true},color:"geel",intro:"Hierbij zie je de Zonnebloemen van Van Gogh en de grafiek met de gevoeligheid van de kegeltjes.",
parts:[{l:"",p:4,q:"Je kijkt naar de plek die de pijl in het schilderij aangeeft. Welke soorten kegeltjes zijn actief? Geef ook aan voor welk percentage ze actief zijn. Leg uit waar je dit in het diagram hebt afgelezen.",
fields:[{f:"cones",color:"geel"},{f:"text",ph:"Leg uit hoe je het hebt afgelezen..."}],
c:[{p:1,t:"Golflengte past bij de kleur geel (ongeveer 560-595 nm).",auto:"lambda"},{p:1,t:"Juiste kegeltjes genoemd: rood en groen actief, blauw niet.",auto:"cones-types"},{p:1,t:"Percentages kloppen bij jouw golflengte (marge 8%).",auto:"cones-pct"},{p:1,t:"Uitleg: bij de gekozen golflengte een verticale lijn getrokken en afgelezen waar die de curves snijdt."}],
m:"De pijl wijst naar de gele achtergrond. Geel is ongeveer 580 nm. Bij 580 nm een verticale lijn trekken: rood (L) ongeveer 100%, groen (M) ongeveer 40%, blauw (S) 0%."}]},
{id:"4b",fig:{img:"cafeterras",arrow:[70,10],cones:true},color:"blauw",intro:"Hierbij zie je de Caféterras bij nacht van Van Gogh en de grafiek met de gevoeligheid van de kegeltjes.",
parts:[{l:"",p:4,q:"Je kijkt naar de plek die de pijl in het schilderij aangeeft. Welke soorten kegeltjes zijn actief? Geef ook aan voor welk percentage ze actief zijn. Leg uit waar je dit in het diagram hebt afgelezen.",
fields:[{f:"cones",color:"blauw"},{f:"text",ph:"Leg uit hoe je het hebt afgelezen..."}],
c:[{p:1,t:"Golflengte past bij de kleur blauw (ongeveer 440-495 nm).",auto:"lambda"},{p:1,t:"Juiste kegeltjes genoemd bij jouw golflengte (bij 460 nm: blauw en groen, rood niet).",auto:"cones-types"},{p:1,t:"Percentages kloppen bij jouw golflengte (marge 8%).",auto:"cones-pct"},{p:1,t:"Uitleg: bij de gekozen golflengte een verticale lijn getrokken en afgelezen waar die de curves snijdt."}],
m:"De pijl wijst naar de diepblauwe lucht, ongeveer 460 nm. Bij 460 nm een verticale lijn: blauw (S) ongeveer 89%, groen (M) ongeveer 20%, rood (L) 0%. (Kies je 470 nm, dan: blauw ongeveer 80%, groen ongeveer 37%.)"}]},
{id:"4c",fig:{img:"zelfportret",arrow:[85,12],cones:true},color:"oranje",intro:"Hierbij zie je het Zelfportret met verbonden oor van Van Gogh en de grafiek met de gevoeligheid van de kegeltjes.",
parts:[{l:"",p:4,q:"Je kijkt naar de plek die de pijl in het schilderij aangeeft. Welke soorten kegeltjes zijn actief? Geef ook aan voor welk percentage ze actief zijn. Leg uit waar je dit in het diagram hebt afgelezen.",
fields:[{f:"cones",color:"oranje"},{f:"text",ph:"Leg uit hoe je het hebt afgelezen..."}],
c:[{p:1,t:"Golflengte past bij de kleur oranje (ongeveer 590-630 nm).",auto:"lambda"},{p:1,t:"Juiste kegeltjes genoemd: rood en groen actief, blauw niet.",auto:"cones-types"},{p:1,t:"Percentages kloppen bij jouw golflengte (marge 8%).",auto:"cones-pct"},{p:1,t:"Uitleg: bij de gekozen golflengte een verticale lijn getrokken en afgelezen waar die de curves snijdt."}],
m:"De pijl wijst naar de oranje achtergrond, ongeveer 610 nm. Bij 610 nm een verticale lijn: rood (L) 75%, groen (M) 13%, blauw (S) 0%."}]},
{id:"4d",fig:{img:"nachtcafe",arrow:[35,25],cones:true},color:"rood",intro:"Hierbij zie je Het nachtcafé van Van Gogh en de grafiek met de gevoeligheid van de kegeltjes.",
parts:[{l:"",p:4,q:"Je kijkt naar de plek die de pijl in het schilderij aangeeft. Welke soorten kegeltjes zijn actief? Geef ook aan voor welk percentage ze actief zijn. Leg uit waar je dit in het diagram hebt afgelezen.",
fields:[{f:"cones",color:"rood"},{f:"text",ph:"Leg uit hoe je het hebt afgelezen..."}],
c:[{p:1,t:"Golflengte past bij de kleur rood (ongeveer 620-750 nm).",auto:"lambda"},{p:1,t:"Juiste kegeltjes genoemd bij jouw golflengte (vanaf ca. 640 nm alleen rood).",auto:"cones-types"},{p:1,t:"Percentages kloppen bij jouw golflengte (marge 8%).",auto:"cones-pct"},{p:1,t:"Uitleg: bij de gekozen golflengte een verticale lijn getrokken en afgelezen waar die de curves snijdt."}],
m:"De pijl wijst naar de rode muur, ongeveer 650 nm. Bij 650 nm een verticale lijn: rood (L) ongeveer 23%, groen (M) 0%, blauw (S) 0%. (Kies je 630 nm, dan rood ongeveer 40% en groen ongeveer 4%.)"}]},
{id:"4e",fig:{img:"zoeaaf",arrow:[8,30],cones:true},color:"groen",intro:"Hierbij zie je De zoeaaf van Van Gogh en de grafiek met de gevoeligheid van de kegeltjes.",
parts:[{l:"",p:4,q:"Je kijkt naar de plek die de pijl in het schilderij aangeeft. Welke soorten kegeltjes zijn actief? Geef ook aan voor welk percentage ze actief zijn. Leg uit waar je dit in het diagram hebt afgelezen.",
fields:[{f:"cones",color:"groen"},{f:"text",ph:"Leg uit hoe je het hebt afgelezen..."}],
c:[{p:1,t:"Golflengte past bij de kleur groen (ongeveer 495-565 nm).",auto:"lambda"},{p:1,t:"Juiste kegeltjes genoemd bij jouw golflengte (bij 520 nm alle drie).",auto:"cones-types"},{p:1,t:"Percentages kloppen bij jouw golflengte (marge 8%).",auto:"cones-pct"},{p:1,t:"Uitleg: bij de gekozen golflengte een verticale lijn getrokken en afgelezen waar die de curves snijdt."}],
m:"De pijl wijst naar de groene muur, ongeveer 520 nm. Bij 520 nm een verticale lijn: groen (M) ongeveer 97%, rood (L) ongeveer 56%, blauw (S) ongeveer 16%."}]}
]}
]};
