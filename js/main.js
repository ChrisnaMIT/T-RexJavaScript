document.addEventListener('DOMContentLoaded', function () {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    let gravity = 0.9

    function control(e) {// function qui permet de sauter si j'appuie sur espace
        if (e.code=== "Space"){
            console.log('jump')
            jump()
        }
    }

    let position = 0
    function jump (){
        let count = 0
        let timerId = setInterval(function () {
            // permet au dino de sauter en haut
            position += 30
            position = position * gravity
            dino.style.bottom = position + 'px'

            //permet au dino de redescendre


        }, 20)
    }




    document.addEventListener('keydown', control)


})