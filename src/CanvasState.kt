package traffic

import js.dom.html5.CanvasContext
import js.jquery.*
import js.dom.html5.CanvasGradient
import js.dom.html5.HTMLCanvasElement
import java.util.ArrayList
import java.util.List
import js.dom.html.window
import js.dom.html.HTMLElement
import js.dom.html.HTMLImageElement

class CanvasState(val canvas: HTMLCanvasElement) {
    val context = canvas.getContext("2d")!!
    val shapes = ArrayList<Shape>()

    val width = canvas.width
    val height = canvas.height

    val trafficLightUp = TrafficLight(v(180.0, 181.0), "up", "red")
    val trafficLightDown = TrafficLight(v(100.0, 77.0), "down", "red")
    val trafficLightLeft = TrafficLight(v(228.0, 109.0), "left", "green")
    val trafficLightRight = TrafficLight(v(55.0, 145.0), "right", "green")

    val size: Vector
        get() = v(width, height)

    fun addShape(shape: Shape) {
        shapes.add(shape)
    }

    {
        //the order we add shapes in actually is the order we draw them i
        addShape(Map(v(10.0, 10.0)))
        addShape(trafficLightLeft)
        addShape(trafficLightUp)
        addShape(trafficLightDown)
        addShape(trafficLightRight)
        addShape(Car(v(178.0, 205.0), "up", "red"))
        addShape(Car(v(95.0, 4.0), "down", "white"))
        addShape(Car(v(278.0, 108.0), "left", "blue"))
        addShape(Car(v(0.0, 142.0), "right", "black"))
        addShape(Border())
        addShape(Image(PATH_TO_IMAGES + "controls.png", v(380.0, 10.0), v(190.0, 56.0)))
        addShape(Button(src = PATH_TO_IMAGES + "lr.png", pos = v(420.0, 70.0), size = v(120.0, 50.0), isHorizontal = true))
        addShape(Button(src = PATH_TO_IMAGES + "ud.png", pos = v(455.0, 120.0), size = v(50.0, 120.0), isHorizontal = false))
    }

    fun startDrawing() {
        jq(canvas).click {
            val mousePos = mousePos(it)
            for (shape in shapes) {
                if (shape is Button && mousePos in shape) {
                    val name = shape.src
                    shape.mouseClick()
                    when (name) {
                        PATH_TO_IMAGES + "lr.png" -> {

                            trafficLightUp.setRed()
                            trafficLightDown.setRed()
                            trafficLightLeft.setGreen()
                            trafficLightRight.setGreen()
                        }
                        PATH_TO_IMAGES + "ud.png" -> {

                            trafficLightLeft.setRed()
                            trafficLightRight.setRed()
                            trafficLightUp.setGreen()
                            trafficLightDown.setGreen()

                        }
                        else -> continue
                    }

                }
            }
        }

        jq(canvas).mousemove {
            val mousePos = mousePos(it)
            for (shape in shapes) {
                if (shape is Button && mousePos in shape) {
                    shape.mouseOver()
                }
            }
        }

        window.setInterval({
            draw()
        }, 1000 / 30)

        window.setInterval({
            trafficLightUp.changeColor()
            trafficLightLeft.changeColor()
            trafficLightRight.changeColor()
            trafficLightDown.changeColor()
        }, 10000)
    }


    fun mousePos(e: MouseEvent): Vector {
        var offset = Vector()
        var element: HTMLElement? = canvas
        while (element != null) {
            val el: HTMLElement = element.sure()
            offset += Vector(el.offsetLeft, el.offsetTop)
            element = el.offsetParent
        }
        return Vector(e.pageX, e.pageY) - offset
    }

    fun draw() {
        clear()
        for (shape in shapes) {
            shape.draw(this)
        }
    }

    fun clear() {
        context.fillStyle = Colors.white
        context.fillRect(0, 0, width, height)
    }
}