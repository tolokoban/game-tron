# Interfaces

Comme il est impossible d'anticiper toutes les idées géniales que l'on aura
dans les itérations successives, il est très difficile d'avoir une interface
parfaite qui ne sera jamais modifiée. Nous nous autosisons donc à __enrichir__
les interfaces, mais il faudra éviter de retirer des éléments existants.

## Action

```js
const Action = require("tron.action");
let myAction = Action.create({
  type: 'keyboard',  // Clavier
  player: 0          // Numéro du joueur
});
switch( myAction.state ) {
  case Action.RIGHT:
    // Tourner à droite.
    break;
  case Action.LEFT:
    // Tourner à gauche.
    break;
  case Action.ACCEL:
    // Accelération.
    break;
}
```

L'attribut `state` est en lecture seule.

## Car

```js
const Car = require("tron.car");
let myCar = Car.create({
  action: myAction,
  name: "Mario",
  dir: 0, // Direction : 0 (nord), 1 (est), 2 (sud) ou 3 (ouest).
  x: 12,
  y: 45,
  speed: 1, // Vitesse.
});
```

Voici la liste des attributs des objets générés par l'appel à `Car.create(...)`.
Deux accès sont possibles : __R__ (lecture seule) et __W__ (lecture et écriture).

| Nom | Accès | Description |
|-----|-------|-------------|
| action | R | Gestionnaire d'actions de cette voiture |
| name | R | Nom du joueur associé à cette voiture |
| dir | W | Direction : 0 (nord), 1 (est), 2 (sud) ou 3 (ouest) |
| x | W | Abscisse |
| y | W | Ordonnée |
| speed | W | Vitesse actuelle |
| alive | W | Booléen indiquant si le joueur est encore en course |
| walls | W | Tableaux des points aux extrémités des segments formant les murs du sillage. |

## Playground

```js
const Playground = require("tron.playground");
let myPlayground = Playground.create({
  level: 37,  // Niveau (pour choisir le terrain)
  cars: [marioCar, luigiCar]
})
```

Voici la liste des attributs des objets générés par l'appel à `Playground.create(...)`.

| Nom | Accès | Description |
|-----|-------|-------------|
| width | R | Nombre de colonnes |
| height | R | Nombre de lignes |

Fonctions disponibles sur ces mêmes objets :
* __move(time0, time1)__ : Gère le déplacement de chaque voiture entre les temps
`time0` et `time1` exprimés en millisecondes. Retourne le nombre de voitures encore
en course.

## Painter

```js
const Painter = require("tron.painter");
let myPainter = Painter.create({
  gl: gl   // WebGL context
})
myPainter.paint( time );
```

## Master

```js
const Master = require("tron.master");
Master.createAsync().then( myMaster => start );
```
