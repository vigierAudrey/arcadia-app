# Mettre des exercices en ligne

Ce document répond à une seule question : **comment un exercice écrit ici arrive-t-il
sur `https://arcadia.blobsurf.com` ?**

## Le déroulé, en trois temps

1. **On écrit les exercices ici**, avec l'IA, à partir des cours de `cours-source/`
   (référentiel officiel d'abord — voir [`pedagogie-agents.md`](pedagogie-agents.md)).
   Chaque séquence devient un fichier dans `prisma/content/`, plus une ligne dans
   `prisma/content/index.ts`.
2. **On enregistre le travail** (commit + push sur GitHub).
3. **Vous cliquez sur le bouton Deploy** dans GitHub : `Actions -> Deploy -> Run workflow`.
   Le formulaire demande quoi faire des exercices :

   | Choix | Ce qui se passe |
   |---|---|
   | `simulation` (par défaut) | **Rien n'est écrit.** Le journal affiche la liste de ce qui *serait* ajouté et de ce qui est déjà là. |
   | `appliquer` | La simulation s'affiche, puis les exercices manquants sont réellement ajoutés. |
   | `ignorer` | Les exercices ne sont pas touchés du tout (déploiement de code seul). |

En pratique : un premier clic en `simulation` pour regarder, un second en `appliquer`
pour de vrai. Une fois en confiance, `appliquer` directement.

## Ce qui part en ligne aujourd'hui

| Classe / enseignement | Séquence | Contenu | Traçabilité |
|---|---|---|---|
| 2 AERO / PSE | `C1. Les enjeux de la santé et sécurité au travail` | 3 séances, 19 activités | [`mapping-pedagogique-2-aero.md`](mapping-pedagogique-2-aero.md) |
| 2 CIEL / PSE | `C1. Les enjeux de la santé et sécurité au travail` | 3 séances, 19 activités | [`mapping-pedagogique-2-ciel.md`](mapping-pedagogique-2-ciel.md) |
| 1 AERO / PSE | `C3. Les acteurs de prévention` | 3 séances, 21 activités | [`mapping-pedagogique-1-aero.md`](mapping-pedagogique-1-aero.md) |
| 1 TCI / PSE | `C3. Les acteurs de prévention` | 3 séances, 18 activités | [`mapping-pedagogique-1-tci.md`](mapping-pedagogique-1-tci.md) |
| T AERO / PSE | `C7. Le suivi de la santé au travail` | 3 séances, 17 activités | [`mapping-pedagogique-t-aero.md`](mapping-pedagogique-t-aero.md) |
| T TCI / PSE | `C7. Le suivi de la santé au travail` | 4 séances, 26 activités | [`mapping-pedagogique-t-tci.md`](mapping-pedagogique-t-tci.md) |
| T AAGA / PSE | `C1. Les différents contrats de travail` | 3 séances, 18 activités | [`mapping-pedagogique-t-aaga.md`](mapping-pedagogique-t-aaga.md) |
| T AAGA / Bloc 2 | `CT3. Cadre d’intervention, autonomie et ressources` | 7 séances, 39 activités | [`mapping-pedagogique-t-aaga-bloc2.md`](mapping-pedagogique-t-aaga-bloc2.md) |

## Corriger un texte déjà en ligne

L'import n'ayant pas le droit de modifier une ligne existante, corriger un texte déjà
publié demande une **autorisation nominative** : une entrée dans
[`prisma/content/corrections.ts`](../prisma/content/corrections.ts), avec le champ visé, la
valeur attendue avant modification (`from`) et la nouvelle (`to`).

La correction n'est appliquée que si le texte en ligne vaut **exactement** `from`. S'il
vaut déjà la nouvelle valeur, il est signalé comme déjà corrigé. S'il vaut autre chose —
parce que vous l'avez retouché depuis `/admin` — il est **laissé tel quel** et signalé `!`
dans le rapport : une retouche faite à la main n'est jamais écrasée.

Le rapport distingue donc quatre cas : `+` créé, `~` corrigé, `=` déjà en l'état,
`!` refusé.

## Ce qui ne peut pas arriver

L'ajout se fait par `pnpm pse:import` ([`scripts/import-contenus.ts`](../scripts/import-contenus.ts)),
qui applique une règle unique : **créer ce qui manque, ne jamais toucher au reste.**

- Il ne modifie aucune séquence, séance ou activité déjà en ligne : un titre déjà présent
  est laissé tel quel et signalé `=` dans le journal.
- Il ne supprime rien, n'archive rien, ne désarchive rien.
- Il ne réorganise pas l'ordre existant : les nouveautés se placent à la suite.
- Il ne regarde que les séquences listées dans `prisma/content/index.ts` : aucune autre
  classe n'est concernée.
- Tout se joue dans une transaction : en cas d'erreur, **rien** n'est écrit.
- Il est rejouable : le relancer une deuxième fois ne crée rien.

Si un contenu doit être *corrigé* après coup, cela se fait depuis `/admin` — le script,
lui, n'écrasera jamais votre correction lors d'un déploiement suivant.

## Renommer une classe déjà en ligne

Une classe est créée depuis `/admin` ; l'import ne la crée jamais et ne la renomme que sur
déclaration explicite dans `classroomRenames`
([`prisma/content/corrections.ts`](../prisma/content/corrections.ts)), avec l'ancien nom, le
nouveau et la raison.

Le garde-fou est le même que pour les textes : le renommage n'a lieu que si la classe porte
**exactement** l'ancien nom. Si elle porte déjà le nouveau, c'est signalé « déjà renommée ».
Si les deux noms existent en base, rien n'est touché et c'est signalé `!` : fusionner deux
classes se fait depuis `/admin`.

Renommer une classe ne change **pas** le code d'accès distribué aux élèves et ne détache
aucun contenu : le nom et le code sont deux informations distinctes.

## Et `pnpm db:seed`, alors ?

`db:seed` est le **fichier de démarrage de démonstration**. Il rejoue *tout* le catalogue
d'un coup, republie et remet les positions. Utile sur l'ordinateur de développement et en
CI, **interdit sur le site en ligne** : il écraserait vos modifications faites depuis
`/admin`. Le déploiement contient un garde-fou qui fait échouer le workflow si la commande
apparaît dans le script distant.

Les deux fichiers partagent pourtant le **même** contenu : `prisma/content/` est la source
unique, utilisée à la fois par le seed de développement et par l'import en ligne. Un
exercice n'est donc jamais écrit deux fois.

## Ajouter une nouvelle séquence, côté fichiers

1. Un fichier `prisma/content/<matiere>-<classe>-<module>.ts` qui exporte la séquence
   (modèle : [`pse-1aero-c3.ts`](../prisma/content/pse-1aero-c3.ts)).
2. Une entrée dans [`prisma/content/index.ts`](../prisma/content/index.ts) indiquant où la
   poser : programme, niveau, classe, enseignement. **Ces quatre noms doivent être écrits
   exactement comme dans `/admin`.** Le programme, le niveau et la classe doivent déjà
   exister ; l'enseignement est créé s'il manque.
3. Une fiche de traçabilité dans `docs/mapping-pedagogique-<classe>.md` (règle §7 de
   [`pedagogie-agents.md`](pedagogie-agents.md)).

## Vérifier avant de cliquer

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm pse:import          # simulation, sur la base de développement
```

La CI rejoue de toute façon le tout sur une base jetable à chaque push.

## Si le script s'arrête

Il s'arrête avec un message en français et **sans rien écrire**. Les deux cas courants :

- « Classe « X » introuvable » : le nom dans `prisma/content/index.ts` ne correspond pas à
  celui affiché dans `/admin`. Corriger le nom, ou créer la classe depuis `/admin`.
- « … est archivé » : l'élément existe mais a été archivé. Le désarchiver depuis `/admin`
  puis relancer — le script ne désarchive jamais rien de lui-même.
