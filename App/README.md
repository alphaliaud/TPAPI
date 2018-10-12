# TP 302

## Préparation

Installez json-server et lancez le pour obtenir votre propre API.
Cela vous permettra de faire des modifications.

## Exercice

Reprendre le code donné, et rajouté de la manière la plus propre possible :

Depuis n'importe quel model :

* find avec filtre
* findById
* create
* updateById
* deleteById
* instance.save pour prendre en compte les modifications de l'instance

Exemples :

```
const albums = await Album.find({ userId: 2 }) // récupère tous les albums du User 2
const firstAlbum = albums[0]
firstAlbum.title = 'toto'
await firstAlbum.save()

//--
const album = await Album.create({ title: 'sdjkfhas' })
const album = await Album.updateById(1, { title: 'abc' })
await Album.deleteById(0)
```