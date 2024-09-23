Diplomarbeit "HOME & HOUSE"
===========================

Zum Abschluss des Lehrgangs der Web Professionals - webdev21 Klasse, bestand die Aufgabe darin, eine Webapplikation für ein
fiktives Immobilien Unternehmen zu erstellen. Dabei sollte das vorgegebene Design exakt umgesetzt werden.

**lauffähige Version:**   

[https://stefanturner.ch/projekte/immoapp/](https://stefanturner.ch/projekte/immoapp/)

![Screenshots der Arbeit](https://github.com/stetu281/home-and-house/blob/main/src/img/screenshots/screenshots.jpg)

## Zeitplan / Meilensteine

Zeitplan und Meilensteine befinden sich in einem [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1aXd9x2LZ1gtiupn79r3B0CeO7NintzrdqZLWvxrllXc/edit?usp=sharing)

## Anmerkungen

- Die Schriftgrössen weichen zum Teil vom Figmadesign ab. Im Design varieren die Schriftgrössen einiger Paragraphen und Titel von Seite zu Seite, was für mich störend wirkte. Daher habe ich diese vereinheitlicht.

- Mobile Navigation habe ich als slide-in umgesetzt, nicht wie im Design als fade-in, da es meiner Meinung nach besser passt und einheitlich mit dem slide-in Formular ist. 

- Auf grossen Bildschirmen habe ich die Hero Section ein wenig umgestaltet, da ich der Meinung bin, dass die Headline nicht erst durch scrollen zu sehen sein sollte.

- Getestet habe ich die Seite mit den aktuellen Versionen von Chrome, Firefox, Edge und Opera. Im Safari konnte ich nur bedingt mit einer (sehr langsamen) MacOS Virual Machine testen. Selber besitze ich keine Apple Geräte und zur Zeit des Testens war ich im Ausland, wo ich niemanden mit einem Mac kannte.     

- Die Seiten habe ich im W3c Validator geprüft. Auf der Detailseite erhalte ich eine Warnung wegen einem leeren h1 tag, welchen ich mit Javascript befülle.

- Erhaltene Nachrichten vom Formular können unter [https://stefanturner.ch/projekte/anfragen/anfragen.html](https://stefanturner.ch/projekte/anfragen/anfragen.html) abgerufen werden. Es ist eine einfache Tabelle der Nachrichten, welche nicht gestylt ist. 

## Technologiewahl

### **HTML**

Zur Strukturierung der Seiten und des Inhalts

### **SCSS/BEM**

Beim Styling habe ich mich für eine Mischung aus SCSS und BEM entschieden. BEM macht die Benennung der Klassen etwas einfacher, und mit SCSS kann ich den Code in verschiedene Dateien aufteilen, Variablen oder auch Nesting benutzen. 

### **Javascript**

Bevor ich mich mit Librarys oder Frameworks beschäftige, möchte ich Vanilla Javascript richtig verstehen und die Anwendung noch üben. Daher habe ich mich für pures Javascript entschieden. 

### **Git**

Für die Versionisierung setze ich Git ein.

### **Webpack 5**

Da wir im Unterricht Webpack lernten, setze ich es auch hier ein, um alles zu bündeln und minifizieren.

### **Nodejs**

Mit Nodejs kann ich mein Backend in JavaScript erstellen und dabei NPM Pakete verwenden.

### **Graphql**

Mit Graphql kann ich wählen, welche Daten ich von der Datenbank will, ohne dabei den ganzen Datensatz zu übertragen.

### **MySQL**

Um Daten in der Datenbank zu speichern und diese abzurufen.. 

## Technische Dokumentation

![Grafik wo alles läuft](https://github.com/WebProfessionals/dipl21_stefan/blob/main/src/img/screenshots/grafik.jpg?raw=true)

### Struktur HTML/SCSS/JS

Um den Code in den Dateien kurz und übersichtlich zu halten, habe ich mich dazu entschieden das ganze möglichst modular aufzubauen. Im HTML werden verschiedene Teile des Codes als Partials eingefügt und mit einem entsprechenden SCSS Partial gestylt.

Im obersten `app.js` file läuft ein switch statement, welches basierend auf einem `data-attribute` das entsprechende Javascript Modul der Seite aus dem pages Verzeichnis aufruft. Diese Module holen sich wiederum Module für die verschiedenen Komponenten aus dem Components Ordner. Im Tools Verzeichnis befinden sich die verschieden Funktionen zum Filtern und Sortieren, Rendern, Querys usw.

### Graphql

Beim Seitenaufruf werden alle Immobilien von der Datenbank geholt und in einer Sessionstorage gespeichert. Informationen wie z.B der Detailbeschrieb oder die Koordinaten werden bei Bedarf geholt. Sortiert sind die Immobilien nach dem Datenbankeintrag `created_at`. Für die aktuellsten Immobilien auf der Detailseite erstellte ich ein Query, um eine limitierte Anzahl Immobilien abzurufen.    

### Immobiliensuche / Filterung / Sortierung

Bei einer Suche erstelle ich ein neues Array mit den gefilterten und sortierten Immobilien. Dieses Array wird in einer Sessionstorage gespeichert. Um die Suchresultate bei der Rückkehr zur Startseite nicht zu verlieren, kontrolliere ich ob ein gefiltertes Array vorhanden ist.    
Vor dem rendern der Immobilien wird folgendes geprüft:
- Muss es als Liste angezeigt werden (Sessionstorage Eintrag)
- Wie breit ist der Screen (wie muss das Array aufgeteilt werden)
- Hat die Url eine Immobilien id (Rückkehr von Detailseite)
- Auf welcher Pagination Seite ist diese id
- Hat die Url einen `load=all` Parameter (Link von Aktuellste Objekte)

### Bilder

Die Bilder sind in einem unabhängigen Ordner auf meinem Hosting gespeichert. Eingefügt werden sie über [imagekit.io](imagekit.io), bei dem ich im `srcset` die benötigten Grössen angeben kann. Im `src` verwende ich die direkte Url zum Bild, falls die gratis bandwidth mal ausläuft.

### Slider

Gemäss der Anzahl URLs im Estate Objekt, werden die Thumbs erstellt, sowie ein Container mit Bildern für die Hauptansicht. Im Container werden die Bilder nebeneinander platziert und mittels `transform:translateX()` in Position geschoben. Wieviel und wohin verschoben werden muss, wird mit einer `data-id` auf dem Container berechnet.

### Formular

Da der Button zum Senden der Formulardaten `type="button"` und nicht `type="submit"` ist, funktioniert die HTML5 Validierung der Input Felder nicht. Meine Validierung kontrolliert: 
 - Sind alle benötigten Felder ausgefüllt
 - Ist die Postleitzahl eine 4-stellige Zahl
 - Stimmt die Email adresse mit dem Regex(code von Stackoverflow) überein

### Google maps

Bereitete mir einige Mühe, da ich ständig den Konsohlenfehler *"initmap is not a function"* erhielt. Das Problem löste ich, als ich herausfand, dass die Funktion `initmap` im obersten File aufgerufen werden muss, ich sie aber von einem Modul aufgerufen habe. Nachdem die Funktion in `app.js` importiert und von da `window.initmap` ausgeführt wird, funktioniert es problemlos.

### Backend

Den Code fürs Backend habe ich mit Hilfe der Slides aus dem Unterricht und einem Tutorial ([https://khalilstemmler.com/articles/tutorials/deploying-a-serverless-graphql-api-on-netlify/](https://khalilstemmler.com/articles/tutorials/deploying-a-serverless-graphql-api-on-netlify/)) erstellt. Es läuft mit einem Apollo Server ([apollo-server-lambda](https://www.npmjs.com/package/apollo-server-lambda)) auf Netlify.


## Zusammenfassung / Ausblick

Die Arbeit zu erstellen war herausfordernd, hat mir aber enorm viel Spass gemacht. Natürlich gab es auch Tage, an denen die Motivation gering war. Vor allem wenn der Code nicht das machte was ich wollte und die Konsole gefühlte tausend Errors ausspuckte. Mit der Hilfe von Google oder auch mal einem `git-reset` waren diese Probleme jedoch überwindbar.

Eine der grössten Herausforderungen war die Benennung und Aufteilung des SCSS und Javascript. Mehrmals habe ich die Klassen, Funktionen, Module und Ordnerstrukturen umgebaut, da es mir nicht gefiel. Daraus habe ich gelernt, ein Projekt nicht zu überstürzt zu starten und besser zu planen.

Viel Zeit verbrachte ich auch mit der ganzen Logik der Sortierung / Filterung / Pagination und das damit verbundene Anzeigen als Liste oder Raster für Mobile und Desktop.

Bei den Bildern testete ich verschiedene Lösungsansätze, wie das Npm Paket responsive-img oder auch die Bilder selber in verschiedenen Grössen zu erstellen. Schlussendlich habe ich mich für einen CDN entschieden, mit dem ich optimierte und verkleinerte Bilder abrufen kann.        

Das Backend entstand unabhängig von meiner Diplomarbeit, als ich ein wenig Abstand zu dieser brauchte. So hatte ich ein laufendes Backend mit einer Verbindung zu meiner Datenbank, welches ich in diese Arbeit einbauen konnte. Das Erstellen war mit recht viel Recherche und einem "Trial and Error" Ansatz verbunden. Mit GraphQl Schemas, Mutations oder auch Komplexe Typen habe ich noch Mühe. Nodejs, GraphQl und MySQL sind Themenm die ich mir sicher noch ein bisschen genauer anschauen will.

Im Nachhinein betrachtet würde mehr Zeit in die Planung investieren, da Umstrukturierung und Umbenennung sehr zeitaufwändig waren.

## Literaturverzeichnis / Quellenangaben

### Allgemeine Informationen und Problemlösung

- [stackoverflow.com](https://stackoverflow.com)
- [css-tricks.com](https://css-tricks.com)
- [mediaevent.de](https://mediaevent.de)

### Formulare

- [Checkbox style](https://moderncss.dev/pure-css-custom-checkbox-style/)
- [Toggle Switch Button](https://www.htmllion.com/css3-toggle-switch-button.html)

### Sonstiges

- Inspiration für die Animation des [Hamburger Button](https://codepen.io/mdt2/pen/VMMmNX)
- Inspiration für den [Hero Image Crossfade](https://codepen.io/johnbacon/pen/wgYOXW)
- [Intersection Observer](https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/)
- Bilder stammen von [unsplash.com](https://unsplash.com)
- Code um das [Backend](https://khalilstemmler.com/articles/tutorials/deploying-a-serverless-graphql-api-on-netlify/) auf Netlify laufen zu lassen
