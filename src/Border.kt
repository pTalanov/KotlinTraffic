package traffic

class Border(): Shape() {
    override var pos = Vector(4.0, 4.0);

    override fun draw(state: CanvasState) {
        state.context.fillStyle = Colors.white
        state.context.fillRect(2, 4, 10, 292)
        state.context.fillRect(330, 4, 370, 292)
        state.context.fillRect(2, 2, 330, 10)
        state.context.fillRect(4, 265, 340, 380)
        state.context.strokeStyle = Colors.black
        state.context.lineWidth = 4.0
        state.context.strokeRect(0, 0, state.width, state.height)
    }

}