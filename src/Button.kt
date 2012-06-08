package traffic

import js.dom.html.window

class Button(val src: String, override var pos: Vector, var imageSize: Vector): Shape() {
    var isMouseOver = false
    var isMouseDown = false

    override fun draw(state: CanvasState) {
        if (isMouseOver) {
            state.context.shadowed(v(- 3.0, 3.0), 1.2) {
                state.context.drawImage(loadImage(src), 0, 0,
                        imageSize.x, imageSize.y,
                        pos.x, pos.y,
                        imageSize.x, imageSize.y)
            }
        } else if (isMouseDown) {
            state.context.shadowed(v(- 3.0, 3.0), 0.8) {
                state.context.drawImage(loadImage(src), 0, 0,
                        imageSize.x, imageSize.y,
                        pos.x, pos.y,
                        imageSize.x, imageSize.y)
            }
        } else {
            state.context.drawImage(loadImage(src), 0, 0,
                    imageSize.x, imageSize.y,
                    pos.x, pos.y,
                    imageSize.x, imageSize.y)
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


    fun contains(mousePos: Vector): Boolean = mousePos.isInRect(pos, imageSize)
}
