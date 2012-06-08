package traffic


//One element from Traffic light
class TrafficLightItem(override var pos: Vector, val imageSrc: String): Shape() {
    val relSize: Double = 0.5
    val imageSize = v(33.0, 33.0)
    var size: Vector = imageSize * relSize

    var isFlashing = (imageSrc == PATH_TO_IMAGES + "green_color_flash.png")
    var isFlashNow = false
    var countOfFlash = 0
    val greenColorImage = loadImage(PATH_TO_IMAGES + "green_color.png")

    override fun draw(state: CanvasState) {
        size = imageSize * relSize
        if (isFlashing) {
            if (isFlashNow) {
                if (countOfFlash > 6) {
                    isFlashNow = false
                    countOfFlash = 0
                } else {
                    countOfFlash++
                }
            } else {
                state.context.drawImage(greenColorImage, 0, 0,
                        imageSize.x, imageSize.y,
                        pos.x, pos.y,
                        size.x, size.y)
                if (countOfFlash > 6) {
                    isFlashNow = true
                    countOfFlash = 0
                } else {
                    countOfFlash++
                }
            }
        } else {
            state.context.drawImage(loadImage(imageSrc), 0, 0,
                    imageSize.x, imageSize.y,
                    pos.x, pos.y,
                    size.x, size.y)
        }
    }
}
