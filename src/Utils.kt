package traffic


import js.dom.html.*
import js.dom.html5.CanvasContext

//Colors constants
object Colors {
    val black: String = "#000000"
    val white = "#FFFFFF"
    val grey = "#C0C0C0"
    val red = "#EF4137"
    val yellow = "#FCE013"
    val green = "#0E9648"
}



fun getRandomArbitary(min: Int, max: Int): Double {
    return Math.random() * (max - min) + min;
}


fun loadImage(path: String): HTMLImageElement {
    val image = window.document.createElement("img") as HTMLImageElement
    image.src = path
    return image
}

fun CanvasContext.shadowed(shadowOffset: Vector, alpha: Double, render: CanvasContext.() -> Unit) {
    save()
    shadowColor = "rgba(100, 100, 100, $alpha)"
    shadowBlur = 5.0
    shadowOffsetX = shadowOffset.x
    shadowOffsetY = shadowOffset.y
    render()
    restore()
}

val PATH_TO_IMAGES = "http://kotlin-demo.jetbrains.com/static/images/canvas/"