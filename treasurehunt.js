const questionTextElement = document.getElementById("questionText");
const answerFieldElement = document.getElementById("answerField");

async function question(){
    await fetch("https://codecyprus.org/th/api/question?session="+session)
        .then(response=>response.json())
        .then(jsonObject =>{
            console.log(jsonObject);
            questionTextElement.innerHTML = jsonObject.questionText;
        });
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