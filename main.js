song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,600,500);
if( scoreLeftWrist >0.2){
    fill("#FF0000");
    stroke("#FF0000");
    circle(leftWristX, leftWristY,20);
    InNumberLeftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberLeftWristY);
    volume = remove_decimals/1000;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);}
}
function preload(){
    song = loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);


}
function modelLoaded(){
    console.log("PoseNet is initialized! ");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
 console.log("scoreleftwrist = "+ scoreLeftWrist);
    
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

    }
}