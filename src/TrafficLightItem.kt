package traffic

import js.dom.html.HTMLImageElement

//One element from Traffic light
open class TrafficLightItem(override var pos: Vector, val imageSrc: String): Shape() {
    val relSize: Double = 0.5
    val imageSize = v(33.0, 33.0)
    val size: Vector = imageSize * relSize
    val image = loadImage(imageSrc)

    override fun draw(state: CanvasState) {
        drawImage(state, image)
    }

    fun drawImage(state: CanvasState, image: HTMLImageElement) {
        state.context.drawImage(image, 0, 0,
                imageSize.x, imageSize.y,
                pos.x, pos.y,
                size.x, size.y)
    }
}
