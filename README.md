# Anne leert

Studietrainer voor Anne (5 havo) met een hoofdscherm waarop ze het vak kiest. Eerste vak:

- **NLT**: module *Van Gogh onder de loep*, hoofdstuk 4 (Oog voor Van Gogh) en 5 (Kleur en verkleuring), plus de delen van bijlage 1 en 2 die in de oefenvragen terugkomen.

Per vak: flashcards met herhaalsysteem, oefenvragen in de stijl van de oefentoets (met uitleg bij elk antwoord en een modus ‘mijn fouten’), een proeftoets met cijfer en score per onderwerp, open vragen met correctiemodel, sprintrondes, naslag met zoekfunctie en leerpunten.

- Live via GitHub Pages: `index.html` in de root van `main`.
- Voortgang wordt per vak bewaard in de browser (localStorage) van het apparaat waarop Anne oefent.

## Aanpassen

De inhoud staat per vak in `src/courses/<vak>/`:

| Bestand | Inhoud |
|---|---|
| `meta.js` | naam, kleur, onderwerpen, naslagtabellen, leerpunten (en bij NLT de kegeltjesgrafiek) |
| `flashcards.js` | flashcards |
| `mc.js` | oefenvragen (meerkeuze en rekenvragen) |
| `open.js` | open vragen met correctiemodel |
| `exam.js` | opbouw en varianten van de proeftoets |
| `sprint.js` | sprintrondes |
| `img/` | afbeeldingen (worden bij het bouwen in de pagina gezet) |

Na een wijziging:

```
python3 build.py
```

Dat maakt een nieuwe `index.html`. Een nieuw vak toevoegen: kopieer de map van een bestaand vak naar `src/courses/<vak>/`, pas de inhoud aan, kies in `meta.js` een accentkleur (`blauw`, `roze`, `salie`, `oker` of `lila`) en zet de naam van het vak in de lijst `COURSES` in `build.py`.
