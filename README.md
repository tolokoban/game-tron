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

On veut une vue 2D avec une seule voiture pilotée par le clavier. Visuellement, on n'a besoin que des murs du sillage qui seront représentées par des lignes d'un pixel d'épaisseur. Le joueur peut utiliser le clavier pour aller à droite, aller à gauche  ou accélérer.

* [Le résultat](https://tolokoban.github.io/game-tron/s1.html).
* [Les sources](https://github.com/tolokoban/game-tron/tree/master/src/mod/s1).

## Sprint 2

On ajoute le test de collision avec sa propre trainée. Si on percute son propre mur, tout disparait et le jeu s'arrête.

* [Le résultat](https://tolokoban.github.io/game-tron/s2.html).
* [Les sources](https://github.com/tolokoban/game-tron/tree/master/src/mod/s2).

## Sprint 3

Création d'une intelligence artificielle pour ajouter un ennemi.
Les ennemis sont capables d'éviter les murs et peuvent tourner ou accélérer de façon aléatoire.

* [Le résultat](https://tolokoban.github.io/game-tron/s3.html).
* [Les sources](https://github.com/tolokoban/game-tron/tree/master/src/mod/s3).

## Sprint 4

Préparation d'une classe qui gère les murs pour les collisions et le futur affichage en 3D.
Rien ne change au niveau du jeu, mais c'est justement ce qu'on cherche : pouvoir modifier un composant central sans que ça se voit.

La classe en question est [Polyline](https://github.com/tolokoban/game-tron/tree/master/src/mod/s4/polyline.js)
et pour être sûr que'elle fait bien ce qu'on veut, on y a ajouté un [test automatique](https://github.com/tolokoban/game-tron/tree/master/spec/s4.polyline.spec.js).

* [Le résultat](https://tolokoban.github.io/game-tron/s4.html).
* [Les sources](https://github.com/tolokoban/game-tron/tree/master/src/mod/s4).

## Sprint 5

Première représentation 3D où on ne voit que les murs des véhicules et l'enceinte.
Aucune optimisation n'a été faite pour le moment.

* [Le résultat](https://tolokoban.github.io/game-tron/s4.html).
* [Les sources](https://github.com/tolokoban/game-tron/tree/master/src/mod/s4).

