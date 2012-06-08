package traffic

class Timer(override var pos: Vector): Shape() {
    var timeLeftForChangeColor: Char = 'c'
    var timeStartLastChangeColor = Date().getTime();
    var timerLength = 13

    override fun draw(state: CanvasState) {
        timeLeftForChangeColor = ("" + (timerLength - (Date().getTime() - timeStartLastChangeColor) / 1000)).get(0)
        state.context.font = "bold 9px Arial, serif"
        state.context.fillStyle = Colors.black
        state.context.fillText("$timeLeftForChangeColor", pos.x, pos.y)
    }

    fun resetTimer() {
        timeStartLastChangeColor = Date().getTime()
        timerLength = 10
    }
}