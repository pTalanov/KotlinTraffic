package traffic

class Map(override var pos: Vector): Shape() {
    val relSize: Double = 0.8
    val imageSize = v(420.0, 323.0)
    var size: Vector = imageSize * relSize

    override fun draw(state: CanvasState) {
        size = imageSize * relSize
        state.context.drawImage(loadImage(PATH_TO_IMAGES + "crossroads.jpg"), 0, 0,
                imageSize.x, imageSize.y,
                pos.x, pos.y,
                size.x, size.y)
    }
}