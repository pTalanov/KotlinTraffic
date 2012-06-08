package traffic

class FlashingTrafficLightItem(pos: Vector, imageSrc: String): TrafficLightItem(pos, imageSrc) {

    var isFlashingAtTheMoment = false
    var updatesSinceLastStateChange = 0

    override fun draw(state: CanvasState) {
        if (!isFlashingAtTheMoment) {
            drawImage(state, image)
        }
        updateFlashes()
    }

    fun updateFlashes() {
        if (updatesSinceLastStateChange > 6) {
            isFlashingAtTheMoment = !isFlashingAtTheMoment
            updatesSinceLastStateChange = 0
        } else {
            updatesSinceLastStateChange++
        }
    }
}