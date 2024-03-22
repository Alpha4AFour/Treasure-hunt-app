function handleQuestionForm(){
    event.preventDefault();
    let completed=document.getElementById("completedQuestion").checked;
    let type=document.getElementById("questionType").value;
    let skip=document.getElementById("canBeSkipped").checked;
    let location=document.getElementById("location").checked;
    question(completed,type,skip,location);
}
function handleAnswerForm(){
    event.preventDefault();
    let correct = document.getElementById("correct").checked;
    let completed = document.getElementById("completedAnswer").checked;
    let expired = document.getElementById("expired").checked;
    answer(correct,completed,expired);
}
function handleScoreForm(){
    event.preventDefault();
    let scoreValue = document.getElementById("scoreForm").value;
    let completed=document.getElementById("completedScore").checked;
    let finished = document.getElementById("finished").checked;
    let error = document.getElementById("error").checked;
    score(scoreValue,completed,finished,error);
}
function question(completed,type,skip,location){
    let URL = `https://codecyprus.org/th/test-api/question?question-type=${type}`;
    if(completed)
        URL+="&completed";
    if(skip)
        URL+="&can-be-skipped";
    if(location)
        URL+="&required-location";
    fetch(URL)
        .then(response=>response.json())
        .then(jsonObject=>{
            console.log(jsonObject);
            let questionField = document.getElementById("question");
            let question = document.createElement("p");
            question.innerHTML=jsonObject.questionText;
            questionField.appendChild(question);
            let questionType=jsonObject.questionType;
            let answerField = document.getElementById("answer");
            if(questionType === "NUMERIC" || questionType === "INTEGER"){
                let input=document.createElement("input");
                input.setAttribute("type","number");
                input.id="input";
                input.setAttribute("name","input");
                input.required = true;
                answerField.appendChild(input);
            }
            if(questionType === "TEXT"){
                let input=document.createElement("input");
                input.setAttribute("type","text");
                input.id="input";
                input.setAttribute("name","input");
                input.required=true;
                answerField.appendChild(input);
            }
            if(questionType === "BOOLEAN"){
                let trueButton = document.createElement("input");
                trueButton.setAttribute("type","button");
                trueButton.id="trueButton";
                trueButton.setAttribute("value","True");
                answerField.appendChild(trueButton);
                let falseButton = document.createElement("input");
                falseButton.setAttribute("type","button");
                falseButton.id="falseButton";
                falseButton.setAttribute("value","False");
                answerField.appendChild(falseButton);
            }
            if(questionType === "MCQ"){
                let aButton = document.createElement("input");
                aButton.setAttribute("type","button");
                aButton.id="aButton";
                aButton.setAttribute("value","A");
                answerField.appendChild(aButton);
                let bButton = document.createElement("input");
                bButton.setAttribute("type","button");
                bButton.id="bButton";
                bButton.setAttribute("value","B");
                answerField.appendChild(bButton);
                let cButton = document.createElement("input");
                cButton.setAttribute("type","button");
                cButton.id="cButton";
                cButton.setAttribute("value","C");
                answerField.appendChild(cButton);
                let dButton = document.createElement("input");
                dButton.setAttribute("type","button");
                dButton.id="dButton";
                dButton.setAttribute("value","D");
                answerField.appendChild(dButton);
            }
        });
}
function answer(correct,completed,expired){
    let URL = "https://codecyprus.org/th/test-api/answer?";
    if(correct)
        URL+="correct&";
    if(completed)
        URL+="completed&";
    if(expired)
        URL+="expired";
    fetch(URL)
        .then(response=>response.json())
        .then(jsonObject=>{
            console.log(jsonObject);
        });
}
function score(scoreValue,completed,finished,error){
    let URL=`https://codecyprus.org/th/test-api/score?score=${scoreValue}`;
    if(completed)
        URL+="&completed";
    if(finished)
        URL+="&finished";
    if(error)
        URL+="&error";
    fetch(URL)
        .then(response=>response.json())
        .then(jsonObject=>{
            console.log(jsonObject);
            let scoreElement = document.getElementById("score");
            scoreElement.innerHTML+=jsonObject.score;
        });
}