package traffic

import java.util.ArrayList
import js.dom.html5.CanvasContext
import js.dom.html5.HTMLCanvasElement

import js.dom.html.HTMLImageElement
import js.dom.html.window
import js.dom.html.HTMLElement

fun main(args: Array<String>) {

    val canvas = window.document.getElementsByTagName("canvas").item(0)!! as HTMLCanvasElement
    CanvasState(canvas).startDrawing()
}
