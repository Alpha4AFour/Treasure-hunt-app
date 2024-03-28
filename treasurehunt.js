const questionTextElement = document.getElementById("questionText");
const answerFieldElement = document.getElementById("answerField");
const skipTask = document.getElementById("skip");
const session = sessionStorage.getItem("session");
const numOfQuestions = sessionStorage.getItem("numOfQuestions");
const timeStamp = new Date().getTime();
//const skip_button = document.getElementById("skip");

let timeDifference = 30000;
if(sessionStorage.getItem("lastUpdate")!==null){
    timeDifference=timeStamp-sessionStorage.getItem("lastUpdate");
}
// QR CODE SETUP
var opts = {
    continuous: true,
    video: document.getElementById('video'),
    mirror: true,
    captureImage: false,
    backgroundScan: true,
    refractoryPeriod: 5000,
    scanPeriod: 1
}
var scanner = new Instascan.Scanner(opts);
var cameraNum = 0;
var count = 0;
// QR CODE END
async function question(){
    await fetch("https://codecyprus.org/th/api/question?session="+session)
        .then(response=>response.json())
        .then(jsonObject =>{
            console.log(jsonObject);
            questionTextElement.innerHTML = jsonObject.questionText;
            answerFieldElement.value='';
            sessionStorage.setItem("questionIndex",jsonObject.currentQuestionIndex);
            document.getElementById('answerField').style.display = "none";
            document.getElementById('buttonSubmit').style.display = "none";
            document.getElementById('buttonA').style.display = "none";
            document.getElementById('buttonB').style.display = "none";
            document.getElementById('buttonC').style.display = "none";
            document.getElementById('buttonD').style.display = "none";
            document.getElementById('buttonTrue').style.display = "none";
            document.getElementById('buttonFalse').style.display = "none";
            let typeOfQuestion = jsonObject.questionType;

            if (typeOfQuestion === "BOOLEAN") {
                document.getElementById('buttonTrue').style.display ="flex";
                document.getElementById('buttonFalse').style.display ="flex";
            }
            if  (typeOfQuestion === "MCQ") {
                document.getElementById('buttonA').style.display = "flex";
                document.getElementById('buttonB').style.display = "flex";
                document.getElementById('buttonC').style.display = "flex";
                document.getElementById('buttonD').style.display = "flex";
            }
            if (typeOfQuestion === "INTEGER" || typeOfQuestion === "TEXT") {
                document.getElementById('answerField').style.display = "flex";
                document.getElementById('buttonSubmit').style.display = "flex";
            }
            if(jsonObject.requiresLocation || timeDifference>=30000){
                geoLocation();
                sessionStorage.setItem("lastUpdate",timeStamp);
            }
            if(!jsonObject.canBeSkipped){
                skipTask.style.display = "none";
            }
        });
}

async function skipQuestion() {
    const skipCount = 1;
    const url = `https://codecyprus.org/th/api/skip?session=${session}&count=${skipCount}`;
    const response = await fetch(url);
    const jsonObject = await response.json();

    if (jsonObject.status === "OK") {
        alert("Question skipped!");
        if(sessionStorage.getItem("questionIndex")<numOfQuestions-1){
            location.reload();
            question();
        }
        else{
            window.location.href="leaderboard.html";
        }
    }
    else {
        alert("Failed to skip question");
    }
}

function answer() {
    const answerText = answerFieldElement.value;
    //Send the answer to the server:
    fetch(`https://codecyprus.org/th/api/answer?session=${session}&answer=${answerText}`)
        .then(value => value.json())
        .then(jsonObject => {
            if (jsonObject.status === "OK") {

                if (jsonObject.completed) {
                    window.location.href="leaderboard.html";
                    return;
                }

                if (jsonObject.correct) {
                    alert(jsonObject.message);
                    location.reload();
                }
                else {
                    alert(jsonObject.message);
                    location.reload();
                }
            }
            else {
                alert("Error: " + jsonObject.errorMessages);
                //TODO - Improve
            }
        });

}
function setAnswer(answer){
    fetch(`https://codecyprus.org/th/api/answer?session=${session}&answer=${answer}`)
        .then(value => value.json())
        .then(jsonObject => {
            if (jsonObject.status === "OK") {

                if (jsonObject.completed) {
                    alert("TODO - Move to the leaderboard...");

                    //TODO - Move to the leaderboard.
                    window.location.href="leaderboard.html";
                    return;
                }

                if (jsonObject.correct) {
                    alert(jsonObject.message);
                    location.reload();
                }
                else {
                    alert(jsonObject.message);
                    location.reload();
                }
            }
            else {
                alert("Error: " + jsonObject.errorMessages);
                //TODO - Improve
            }
        });
}

skipTask.addEventListener("click", function(event){
    event.preventDefault();
    skipQuestion();
});
function score(){
    fetch(`https://codecyprus.org/th/api/score?session=${session}`)
        .then(value=>value.json())
        .then(jsonObject=>{
            console.log("Test");
            console.log(jsonObject);
            let score=document.getElementById("score");
            score.innerHTML += jsonObject.score;
        })
}

function geoLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("Geolocation not supported!");
    }
}

function showPosition(position){
    console.log("Longitude: "+position.coords.longitude+" Latitude: "+position.coords.latitude);
    fetch(`https://codecyprus.org/th/api/location?session=${session}&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
        .then(response=>response.json())
        .then(jsonObject=>{
            if(jsonObject.status==="OK"){
                console.log(jsonObject.message);
            }
            else{
                console.log(jsonObject.errorMessages);
            }
        })
}
document.getElementById("qrCode").addEventListener("click",function(event){
    event.preventDefault();
    document.getElementById("qrCodeWindow").showModal();
    camera(0);
});
document.getElementById("close").addEventListener("click",function(event){
    event.preventDefault();
    document.getElementById("qrCodeWindow").close();
    scanner.stop();
});
function camera(num){
    Instascan.Camera.getCameras()
        .then(cameras=>{
            alert("Cool");
            count = cameras.length;
            if(cameras.length>0){
                alert("Start");
                scanner.start(cameras[0]);
                alert("Success");
            }
            else
                alert("No cameras found.");

        })
        .catch(function (e){
            console.log(e);
        });
    scanner.addListener("scan",function(content){
        console.log(content);
        document.getElementById("content").innerText=content;
        scanner.stop();
    });
}
function changeCamera(){
    scanner.stop();
    if(cameraNum<count)
        cameraNum++;
    else
        cameraNum=0;
    camera(cameraNum);
}
score();
question();

