document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    let gravity = 0.9
    let isJumping = false
    let isGamerOver = false
    const alert = document.getElementById('alert')

    function control(e) {// function qui permet de sauter si j'appuie sur espace
        if (e.code=== "Space"){// la function est appelée lorsqu'on appuie sur le clavier (espace)
            if (!isJumping){
                jump()
                console.log('jump')
            }
        }
    }
document.addEventListener('keydown', control)

    let position = 0 // on garde la position du dino à la position 0

    function jump (){ // function qui permet au dino de sauter (on augemnte la position vers le haut du dino) et ensuite il redescend( on change la position du dino vers le bas)
        isJumping = true
        let count = 0
        let timerId = setInterval(function () {
            // permet au dino de sauter en haut
            position += 30 // on augmente la position de 30 lorsque le dino saute (quand on appuie sur espace)
            count ++
            position = position * gravity
            dino.style.bottom = position + 'px'

            //permet au dino de redescendre
            if (count === 15){
                clearInterval(timerId) // quand le dino atteint sa position du haut il est tout de suite appeler vers le bas
                let downTimerId = setInterval(function () {
                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position -=5
                    count --
                    position = position * gravity
                    dino.style.bottom = position + 'px'
                }, 20)
            }


        }, 20)
    }

    function generationObstacles(){// function qui genere un obstacle
        if (!isGamerOver){ // si on est pas en game over function continue
            let randomTime = Math.random() * 4000 // creation d'un temps aleatoire pour creer un obstacle
            let obstaclePosition = 1000
            const obstacle=  document.createElement('div') //creation d'un element HTML (div) pour l'obstacle
            obstacle.classList.add('obstacle') // creation d'un css pour obstacle
            grid.appendChild(obstacle) // ajout de obstacle à un conteneur grid
            obstacle.style.left = obstaclePosition + 'px' //

            let timerId = setInterval(function () {
                if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60 ){ // permet de verifier si le dino est proche ou non de l'obstacle
                    clearInterval(timerId)
                    alert.innerHTML  = 'Game Over' // si le dino touche l'obstacle un msg s'affiche
                    isGamerOver = true

                    while (grid.firstChild) {
                        grid.removeChild(grid.lastChild) //permet de supprimer tous les enfants de la grid pour enelver les obstacles à la fin du jeux
                    }

                }

                obstaclePosition -=10 // on deplace l'obstacle vers la gauche
                obstacle.style.left = obstaclePosition + 'px' //On change la position de l'obstacle dans le style css
            }, 20)
             setTimeout(generationObstacles, randomTime) //des qu'un obstacle est crée un autre obsctacle est crée dans un delai aleatoire, cela permet de creer des obstzcle a l'infini
        }

    }


generationObstacles()


    document.addEventListener('keydown', control)


})