package traffic

import js.dom.html.window

class Button(val src: String, override var pos: Vector, val size: Vector, val isHorizontal: Boolean): Shape() {
    var isMouseOver = false
    var isMouseDown = false
    val image = loadImage(src)

    override fun draw(state: CanvasState) {
        if (isMouseOver) {
            state.context.shadowed(v(- 3.0, 3.0), 1.2) {
                drawImage(state)
            }
        } else if (isMouseDown) {
            state.context.shadowed(v(- 3.0, 3.0), 0.8) {
                drawImage(state)
            }
        } else {
            drawImage(state)
        }
    }

    fun mouseClick() {
        isMouseDown = true
        window.setTimeout({
            isMouseDown = false
        }, 1000)
    }

    fun mouseOver() {
        isMouseOver = true
        window.setTimeout({
            isMouseOver = false
        }, 1000)
    }

    fun drawImage(state: CanvasState) {
        state.context.drawImage(loadImage(src), 0, 0,
                size.x, size.y,
                pos.x, pos.y,
                size.x, size.y)
    }


    fun contains(mousePos: Vector): Boolean = mousePos.isInRect(pos, size)
}
