package traffic

import js.dom.html5.CanvasContext

abstract class Shape() {
    abstract fun draw(state: CanvasState)
    abstract var pos: Vector
}
