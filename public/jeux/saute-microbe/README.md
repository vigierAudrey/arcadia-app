# Saute-Microbe

Mini-jeu de récompense : un élève court et saute par-dessus des microbes. Il se
débloque quand tout un bloc d'activités d'une séance est réussi du premier coup
(voir `src/features/jeu/saute-microbe.tsx`).

## Origine et droits

- **Moteur** (`jeu.js`) : jeu hors ligne de Chromium, extrait par @liuwayong
  (<https://github.com/wayou/t-rex-runner>), sous licence BSD-3 — voir `LICENSE`.
  Modifications ArcadiA : son supprimé, identifiants d'images renommés.
- **Feuille de style** (`jeu.css`) : règles nécessaires reprises du même dépôt,
  simplifiées.
- **Dessins** (`microbes-1x.png`, `microbes-2x.png`) : réalisés pour ArcadiA,
  générés par `scripts/saute-microbe-sprites.py`. Aucun dessin d'origine n'est
  réutilisé. Pour les modifier, éditer le script puis le relancer :

  ```bash
  python3 scripts/saute-microbe-sprites.py
  ```

  Les deux planches doivent garder exactement les mêmes coordonnées : le moteur
  y lit chaque image à une position fixe (`Runner.spriteDefinition`).

## Détails utiles

- Le jeu est affiché dans une fenêtre, à l'intérieur d'un cadre isolé : il n'est
  téléchargé qu'au moment où un élève ouvre sa partie.
- Aucun son, aucun appel réseau, aucune donnée enregistrée.
- Commandes : barre d'espace ou clic pour sauter, flèche du bas pour se baisser.
