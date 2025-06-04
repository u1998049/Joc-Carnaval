# Joc-Carnaval

## i. Introducció

Aquest projecte forma part d'una pràctica universitària de disseny i desenvolupament de videojocs utilitzant el framework Phaser.io. L'objectiu és crear un minijoc inspirat en el carnaval escolar, centrat en una desfilada. El projecte també serveix com a exercici per integrar diferents aspectes de programació y disseny.

## ii. Descripció del disseny del joc

El joc presenta una pantalla inicial, un mapa del carnaval i un primer minijoc anomenat "Desfilada". En aquest minijoc, els nens avancen automàticament des de l'esquerra de la pantalla i el jugador ha de col·locar-los correctament a la fila del seu color abans que surtin per la dreta.

Les tres files (vermella, verda i blava) estan representades amb colors i fons marcats per facilitar la identificació visual. El jugador pot arrossegar els nens per corregir la seva posició. En funció del nombre de nens ben col·locats, s'obté una puntuació que es mostra a la pantalla de resultats amb un sistema d'estrelles (0 a 3).

## iii. Descripció de les parts més rellevants de la implementació

Phaser.io: S'ha utilitzat aquest framework per a la creació de totes les escenes i gestió del joc.

Organització en escenes: El joc està dividit en escenes (MainMenuScene, MapScene, ParadeGameScene, ResultsScene, AudioManagerScene), cadascuna amb una funció específica.

### ParadeGameScene:

Generació aleatòria de nens amb colors.

Arrossegament per col·locar-los en la fila correcta.

Increment de la dificultat amb el temps (augment de la velocitat).

Sistema de puntuació i animació de punts.

Transició a la pantalla de resultats després que tots els nens hagin sortit.

### ResultsScene:

Càlcul i mostra d'estrelles segons el rendiment.

Animació d'estrelles i so associat.

Opció de tornar al mapa o repetir el minijoc.

### AudioManagerScene:

Gestió de música de fons persistent entre escenes.

Canvi de música segons l'escena.

### Persistència de progrés:

Ús de localStorage per guardar el nombre màxim d'estrelles aconseguides en el minijoc.

El mapa reflecteix si el minijoc ja s'ha jugat i mostra el progrés aconseguit.

## iv. Conclusions i problemes trobats

Alguns dels reptes més significatius han estat:

Fer que la música sigui persistent i adaptable segons l'escena.

Gestionar la dificultat progressiva sense afectar la jugabilitat.

Evitar el solapament entre personatges arrossegats.

## v. Manual d’usuari

### Pantalla d'inici: 

Fes clic a "Iniciar" per accedir al mapa.

### Mapa: 

Mostra el minijoc disponible i el nombre d'estrelles aconseguides. Fes clic sobre el minijoc per començar-lo.

### Minijoc - Desfilada:

Els nens apareixen des de l'esquerra i avancen automàticament.

Arrossega'ls a la fila que correspon al seu color (vermella, verda o blava).

Quan surtin per la dreta, rebràs un punt si estaven a la fila correcta.

### Resultats:

Es mostren de 0 a 3 estrelles segons el rendiment.

Pots tornar al mapa o repetir el minijoc.

### Pausa:

Prem ESC durant el minijoc per accedir al menú de pausa.
