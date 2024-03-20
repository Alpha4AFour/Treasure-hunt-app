const questionTextElement = document.getElementById("questionText");
const answerFieldElement = document.getElementById("answerField");
const skipTask = document.getElementById("skip");
const session = sessionStorage.getItem("session");


async function question(){
    await fetch("https://codecyprus.org/th/api/question?session="+session)
        .then(response=>response.json())
        .then(jsonObject =>{
            console.log(jsonObject);
            questionTextElement.innerHTML = jsonObject.questionText;
            answerFieldElement.value='';
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
                document.getElementById('buttonTrue').style.display ="block";
                document.getElementById('buttonFalse').style.display ="block";
            }
            if  (typeOfQuestion === "MCQ") {
                document.getElementById('buttonA').style.display = "block";
                document.getElementById('buttonB').style.display = "block";
                document.getElementById('buttonC').style.display = "block";
                document.getElementById('buttonD').style.display = "block";
            }
            if (typeOfQuestion === "TEXT") {
                document.getElementById('answerField').style.display = "block";
                document.getElementById('buttonSubmit').style.display = "block";
            }
            if (typeOfQuestion === "INTEGER") {
                document.getElementById('answerField').style.display = "block";
                document.getElementById('buttonSubmit').style.display = "block";
            }
        });
}

async function skipQuestion() {
    const skipCount = 1;
    const url = `https://codecyprus.org/th/api/skip?session=${session}&count=${skipCount}`;
    const response = await fetch(url);
    const jsonObject = await response.json();

    if (jsonObject.status === "OK") {
        alert("Question skipped!")
        question();
    }
    else {
        alert("Failed to skip question")
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
                    alert("TODO - Move to the leaderboard...");

                    //TODO - Move to the leaderboard.
                    return;
                }

                if (jsonObject.correct) {
                    alert(jsonObject.message);
                    location.reload();
                }
                else {
                    alert(jsonObject.message);
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
                    return;
                }

                if (jsonObject.correct) {
                    alert(jsonObject.message);
                    location.reload();
                }
                else {
                    alert(jsonObject.message);
                }
            }
            else {
                alert("Error: " + jsonObject.errorMessages);
                //TODO - Improve
            }
        });
}
question();

skipTask.addEventListener("click", function(event){
    event.preventDefault();
    skipQuestion();
});

