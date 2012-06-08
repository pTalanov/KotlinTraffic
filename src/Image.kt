package traffic


class Image(val src: String, override var pos: Vector, var imageSize: Vector): Shape() {
    override fun draw(state: CanvasState) {
        state.context.drawImage(loadImage(src), 0, 0,
                imageSize.x, imageSize.y,
                pos.x, pos.y,
                imageSize.x, imageSize.y)
    }

    fun contains(mousePos: Vector): Boolean = mousePos.isInRect(pos, imageSize)
}