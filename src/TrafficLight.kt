package traffic

import java.util.ArrayList
import js.dom.html.window

class TrafficLight(override var pos: Vector, val direction: String, val startColor: String): Shape() {
    val red = TrafficLightItem(v(pos.x, pos.y), PATH_TO_IMAGES + "red_color.png")
    val yellow = TrafficLightItem(v(pos.x, pos.y), PATH_TO_IMAGES + "yellow_color.png")
    val green = TrafficLightItem(v(pos.x, pos.y), PATH_TO_IMAGES + "green_color.png")
    val flashingGreen = TrafficLightItem(v(pos.x, pos.y), PATH_TO_IMAGES + "green_color_flash.png")
    var size = Vector(27.0, 34.0);
    var timer = Timer(Vector(pos.x + 6, pos.y + 12))
    var currentColor = startColor;
    var isForceColorChange = false
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
        if (currentColor != "red" && currentColor != "yellow" && currentColor != "green_flash") {
            isForceColorChange = true
            changeColor()
        }
    }

    fun setGreen() {
        if (currentColor != "green" && currentColor != "green_flash" && currentColor != "yellow") {
            isForceColorChange = true
            changeColor()
        }
    }

    fun changeColor() {
        if (changeColorForward) changeColorForward() else changeColorBackward()
    }

    fun changeColorForward() {
        changeColorForward = false
        currentColor = "yellow"
        window.setTimeout({
            if (!isForceColorChange) timer.resetTimer() else isForceColorChange = false
            currentColor = "green"
        }, 3000)
    }


    fun changeColorBackward() {
        changeColorForward = true
        currentColor = "green_flash"
        window.setTimeout({
            currentColor = "yellow"
            window.setTimeout({
                if (!isForceColorChange) timer.resetTimer() else isForceColorChange = false
                currentColor = "red"
            }, 1000)
        }, 2000)
    }

    fun canMove(): Boolean {
        return (currentColor != "red" && currentColor != "yellow")
    }
}
