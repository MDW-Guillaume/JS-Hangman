# Kick-off

## Specs

- Système de score
- Leaderboard
- Trouver un mot
- Générer un mot
- Pendu 
- Afficher les lettres correctement tapées
- Difficulté changeable

## Class

- Game
    - 
    - Lancement de partie
    - Fin de partie
    - Demande du nom du joueur

- Leaderboard
    - 
    - Ajout des scores
    - Tri des scores
    - Affichage des scores  

- Providers
    - 
```js
class Provider {
    getWord(){}
    getLanguage(){}
    getWordMaxLength(length){}
}
```

- Input
    - 
    - Détecte l'ajout d'une lettre
    - Filtre en fonction des lettres déja entrée
