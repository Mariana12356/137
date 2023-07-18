var video
var objects = []
var statusAtual = false

function preload() {
    video = createVideo("gato.mp4")
    video.hide()
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "status : detectando gatos fofos <33"
}

function setup() {
    canvas = createCanvas(630, 440)
    canvas.center()
}

function modelLoaded(){
    console.log("modelo carregado")
    statusAtual = true
    video.loop()
    video.speed(1)
    video.volume()
}

function gotResult(error, results){
 if(error){
    console.error(error)
 }
 else{
    console.log(results)
    objects = results
 }

}

function draw() {
    image(video, 0, 0, 630, 440)
    if(statusAtual){
        objectDetector.detect(video, gotResult)
        document.getElementById("status").innerHTML = "status : gatinhos detectados <33"
        for(var e = 0; e < objects.length; e++){
            nome = objects[e].label
            confianca = floor(objects[e].confidence * 100)
            x = floor(objects[e].x) + 50
            y = floor(objects[e].y) + 50
            largura = floor(objects[e].width) + 100
            altura = floor(objects[e].height) + 100
            text(nome + " " + confianca + "%", x, y)
            stroke("#ffc0cb")
            rect(x, y, largura, altura)
            noFill()
        }
    }
}