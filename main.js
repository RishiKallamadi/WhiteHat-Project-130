var HarryPotter, PeterPan
leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0

var scoreLeftWrist, scoreRightWrist
var HarryPotterStatus, PeterPanStatus

function preload() {
    HarryPotter = loadSound("music.mp3")
    PeterPan = loadSound("peter_pan.mp3")
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide()
    video.size(500, 400)

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log("PoseNet Initialized!")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log("Left Wrist Score = " + scoreLeftWrist)
        console.log("Right Wrist Score = " + scoreRightWrist)

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("Left Wrist Coordinates - " + leftWristX + ", " + leftWristY)

        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("Right Wrist Coordinates - " + rightWristX + ", " + rightWristY)
    }
}

function draw() {
    image(video, 0, 0, 500, 400)

    HarryPotterStatus = HarryPotter.isPlaying()
    PeterPanStatus = PeterPan.isPlaying()
    
    fill("#0000FF")
    stroke("#0000FF")
    
    if (scoreLeftWrist > 0.2) {
        PeterPan.stop()

        if (HarryPotterStatus == false) {
            HarryPotter.setVolume(1)
            HarryPotter.play()
            document.getElementById("SongName").innerHTML = "Harry Potter Theme Song"
        }

        if (leftWristY < 400) {
            circle(leftWristX, leftWristY, 20)
        }
    }
    
    if (scoreRightWrist > 0.2) {
        HarryPotter.stop()

        if (PeterPanStatus == false) {
            PeterPan.setVolume(1)
            PeterPan.play()
            document.getElementById("SongName").innerHTML = "Peter Pan Theme Song"
        }

        if (rightWristY < 400) {
            circle(rightWristX, rightWristY, 20)
        }
    }
}

