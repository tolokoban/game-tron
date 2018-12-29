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

## Les modules de code

Séparons notre code en modules. C'est à ce prix seulement que nous pourrons suivre
un processus itératif.

* __Action__ : Fournit des objets associés à des voitures. Ces objets indiquent
si la voiture veut tourner, accélérer ou ne rien faire. Pour cela, ils pourront
se baser sur les entrées clavier, souris, gamepad ou écran tactile. Mais il pourront
aussi utiliser une intelligence artificielle s'il s'agit de personnages non joueurs (PNJ).
* __Car__ : Fournit des objets représentant chacun une voiture avec ses caractéristiques propres, comme la couleur, la position et vitesse actuelles,
tout élément nécessaire au dessin des murs de son sillage...
* __Playground__ : Définit un terrain de jeu avec tous les obstacles qui s'y trouvent.
Ce sont principalement des murs d'enceinte et de sillages. Mais on pourrait aussi
imaginer y ajouter des bonus qui donneraient des facultés de tir, par exemple.
Quand une voiture se déplace, elle doit avertir le `Playground` qui vérifie les
collisions et calcule les sillages.
* __Painter__ : Affiche chaque frame du jeu. Il y a de nombreuses façons de faire :
on peut voir l'ensemble du plateau de dessus, ou découper l'écran en autant de joueurs
que des caméras suivent.
* __Master__ : Orchestre tous les autres modules.
Il est responsable de créer tous les objets nécessaires au bon déroulement de la partie.

Le contenu des ces modules importe peu pour le moment. Il va de toute façon évoluer
à chaque itération. Mais il est très important de réfléchir correctement aux interfaces.

L'interface est ce que le module expose. Et si un module n'a de compte à rendre
à personne concernant son code interne, en revanche, il ne peut pas se permettre
de changer son interface parce que les autres modules s'appuient dessus.

Ces interfaces doivent être
* __simples__ (le moins d'entrées/sorties possible),
* __génériques__ (pouvoir s'adapter facilement à des évolutions futures),
* __optimales__ (permettre d'avoir un code qui s'exécute rapidement).

Les deux derniers points sont évidemment en opposition et il faut trouver la juste
balance entre les deux. En effet, si vous avez une idée précise de comment vous
allez implémenter l'affichage 3D de votre jeu en WebGL, vous serez tentés d'adapter
votre interface aux interfaces de WebGL. Mais en faisant cela, vous perdez en
généricité et s'il vous faut plus tard changer de technologie vous devrez réécrire
des pans entier de code et tout retester.

Passons aux [interfaces](md/interfaces.md).
