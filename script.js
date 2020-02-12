class Game {
    constructor() {
        let canvas = document.getElementById('pixel-war')
        let screen = canvas.getContext('2d')
        let gameSize = { x: canvas.width, y: canvas.height }
        this.bodies = []
        this.bodies = this.bodies.concat(new Player(this, gameSize))
        let tick = () => {
            this.update()
            this.draw(screen, gameSize) 
            requestAnimationFrame(tick)
        }
        tick()
    }
    update() {
        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].update()
        }
    }

    draw(screen, gameSize) {
        screen.clearRect(0, 0, gameSize.x, gameSize.y)
        for (let i = 0; i < this.bodies.length; i++) {
            drawRect(screen, this.bodies[i])
        }
    }

    addBody (body) {
        this.bodies.push(body)
    }
}

class Player {
    constructor (game, gameSize) {
        this.game = game 
        this.size = { x: 15, y: 15 }
        this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.y * 2 }

        this.keyboarder = Keyboarder
    }

    update() {
        if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
            this.center.x -= 2
        } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
            this.center.x += 2
        }

        if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
            let bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.y - 10 },
                { x: 0, y: -7 })
            this.game.addBody(bullet)
        }
        if (this.center.x < 0 || this.center.x > 300) {
            
        }
    }
}

class Bullet {
    constructor (center, velocity) {
        this.center = center
        this.size = { x: 5, y: 5 }
        this.velocity = velocity
    }
    update() {
        this.center.x += this.velocity.x
        this.center.y += this.velocity.y
    }
}

function drawRect (screen, body) {
    screen.fillRect(body.center.x - body.size.x / 2, body.center.y - body.size.y / 2,
        body.size.x, body.size.y)
}

window.addEventListener('load', function () {
    new Game()
})