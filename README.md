# game-tron
_Step by step making of a WebGL [TRON](https://fr.wikipedia.org/wiki/Tron) like game._

----

Dans ce didacticiel, vous allez apprendre à créer de toute pièce un jeu en WebGL.
Le processus de création sera itératif. De cette façon nous aurons rapidement
une bonne idée du jeu que nous raffinerons à chaque itération.

## L'idée

Partons d'une idée simple : un jeu de voitures futuristes qui avancent en ligne
droite en traçant des murs dans leur sillage.
Dès qu'une voiture rencontre un mur du décor ou d'un sillage de voiture (le sien
compris), elle explose. Le but est de survivre le plus longtemps possible.

Les contraintes sont qu'une voiture ne peut pas ralentir en dessous d'une vitesse
donnée et que ses virages se font exclusivement à angles droits.

## Les actions possibles

Chaque voiture a trois actions possibles :
* Tourner à droite.
* Tourner à gauche.
* Accélérer.

# Les différentes itérations

## Sprint 1

On veut une vue 2D avec une seule voiture pilotée par le clavier. Visuellement, on n'a besoin que des murs du sillage qui seront représentées par des lignes d'un pixel d'épaisseur. Aucun test de collision.

* [Le résultat](https://tolokoban.github.io/game-tron/s1.html).
* [Les sources](https://github.com/tolokoban/game-tron/s1).
