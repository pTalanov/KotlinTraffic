package traffic

import java.util.ArrayList
import js.dom.html.window

class TrafficLight(override var pos: Vector, val direction: String, val startColor: String): Shape() {
    val red = TrafficLightItem(v(pos.x, pos.y), PATH_TO_IMAGES + "red_color.png")
    val yellow = TrafficLightItem(v(pos.x, pos.y), PATH_TO_IMAGES + "yellow_color.png")
    val green = TrafficLightItem(v(pos.x, pos.y), PATH_TO_IMAGES + "green_color.png")
    val flashingGreen = FlashingTrafficLightItem(v(pos.x, pos.y), PATH_TO_IMAGES + "green_color.png")
    var size = Vector(27.0, 34.0);
    var timer = Timer(Vector(pos.x + 6, pos.y + 12))
    var currentColor = startColor;
    var changeColorForward = (startColor == "red")

    override fun draw(state: CanvasState) {
        when (currentColor) {
            "red" -> red.draw(state)
            "yellow" -> yellow.draw(state)
            "green" -> green.draw(state)
            "green_flash" -> flashingGreen.draw(state)
            else -> {
            }
        }
        timer.draw(state)
    }

    fun setRed() {
        if (currentColor == "green") {
            changeColor(true)
        }
    }

    fun setGreen() {
        if (currentColor == "red") {
            changeColor(true)
        }
    }

    fun changeColor(forced: Boolean = false) {
        if (changeColorForward) changeColorForward(forced) else changeColorBackward(forced)
    }

    fun changeColorForward(forced: Boolean) {
        changeColorForward = false
        currentColor = "yellow"
        window.setTimeout({
            if (!forced) {
                timer.resetTimer()
            }
            currentColor = "green"
        }, 3000)
    }


    fun changeColorBackward(forced: Boolean) {
        changeColorForward = true
        currentColor = "green_flash"
        window.setTimeout({
            currentColor = "yellow"
            window.setTimeout({
                if (!forced) {
                    timer.resetTimer()
                }
                currentColor = "red"
            }, 1000)
        }, 2000)
    }

    fun canMove(): Boolean {
        return (currentColor != "red" && currentColor != "yellow")
    }
}
