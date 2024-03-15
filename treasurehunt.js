const questionTextElement = document.getElementById("questionText");
const answerFieldElement = document.getElementById("answerField");
const skipTask = document.getElementById("skip");

async function question(){
    await fetch("https://codecyprus.org/th/api/question?session="+session)
        .then(response=>response.json())
        .then(jsonObject =>{
            console.log(jsonObject);
            questionTextElement.innerHTML = jsonObject.questionText;
            document.getElementById('idTextAnswer').style.display = "none";
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
                document.getElementById('idTextAnswer').style.display = "block";
                document.getElementById('buttonSubmit').style.display = "block";
            }
            if (typeOfQuestion === "INTEGER") {
                document.getElementById('idTextAnswer').style.display = "block";
                document.getElementById('buttonSubmit').style.display = "block";
            }
        });
}

async function skipQuestion() {
    const skipCount = 1;
    const url = `https://codecyprus.org/th/api/skip?session=${session}&count=${skipCount}`;
    const response = await fetch(url);
    const jsonObject = await response.json();

    if (jsonObject.status === "ok") {
        alert("Question skipped!")
        question();
    }
    else {
        alert("Failed to skip question")
    }
}

const param = new URLSearchParams(document.location.search);
const session = param.get("session");
console.log(session);

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

question();

skipTask.addEventListener("click", function(event){
    event.preventDefault();
    skipQuestion();
});

