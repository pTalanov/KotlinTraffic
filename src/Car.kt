package traffic

class Car(override var pos: Vector, val direction: String, val color: String): Shape() {
    val imageSize = v(25.0, 59.0)
    var speed = getRandomArbitary(2, 10);

    override fun draw(state: CanvasState) {
        if (direction == "up" || direction == "down") {
            state.context.drawImage(loadImage(PATH_TO_IMAGES + color + "_car.png"), 0, 0,
                    imageSize.x, imageSize.y,
                    pos.x, pos.y,
                    imageSize.x, imageSize.y.toInt())
            if ((!isNearStopLine()) || (state.trafficLightUp.canMove() && isNearStopLine()) ) {
                move()
            } else {
                speed = getRandomArbitary(2, 10)
            }
        } else {
            state.context.drawImage(loadImage(PATH_TO_IMAGES + color + "_car.png"), 0, 0,
                    imageSize.y.toInt(), imageSize.x.toInt(),
                    pos.x.toInt(), pos.y.toInt(),
                    imageSize.y.toInt(), imageSize.x.toInt())
            if ((!isNearStopLine()) || (state.trafficLightLeft.canMove() && isNearStopLine()) ) {
                move()
            } else {
                speed = getRandomArbitary(2, 10)
            }

        }

    }

    fun isNearStopLine(): Boolean {
        when (direction) {
            "up" ->  return (pos.y > 198 && pos.y < 208)
            "down" -> return (pos.y > 10 && pos.y < 20)
            "right" -> return (pos.x > - 8 && pos.x < 2)
            "left" -> return (pos.x > 243 && pos.x < 253)
            else -> return false
        }

    }

    fun move() {
        var x = pos.x
        var y = pos.y

        when (direction) {
            "up" -> if (pos.y < - 50) y = 250.0 else y = pos.y - speed
            "down" -> if (pos.y > 300) y = 0.0 else y = pos.y + speed
            "right" -> if (pos.x > 300) x = - 10.0 else x = pos.x + speed
            "left" -> if (pos.x < - 50) x = 340.0 else x = pos.x - speed
            else -> {
            }
        }

        pos = v(x, y)
    }
}