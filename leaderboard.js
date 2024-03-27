//const apiLeaderboard = "https://codecyprus.org/th/api/leaderboard";
const refreshButton = document.getElementById("refresh");
function getLeaderBoard(apiLeaderBoard) {
    fetch(apiLeaderBoard, {method: "GET"})
        .then(response => response.json())
        .then(json => handleLeaderboard(json));
}

//let session = "ag9nfmNv...oMa0gQoM&sorted&limit=10";
const session = sessionStorage.getItem("session");
const treasureHuntID = sessionStorage.getItem("treasureHuntID");
//let url = apiLeaderboard + "?session=" + session;
if(session===""){
    getLeaderBoard(`https://codecyprus.org/th/api/leaderboard?treasure-hunt-id=${treasureHuntID}&sorted&limit=10`);
}
else{
    getLeaderBoard(`https://codecyprus.org/th/api/leaderboard?session=${session}&sorted&limit=10`);
}


function handleLeaderboard(leaderboard) {
    console.log('Received leaderboard data:', leaderboard);

    //let html = " ";
    let leaderboardElement = document.getElementById('data');
    let leaderboardArray = leaderboard['leaderboard'];
    if (Array.isArray(leaderboardArray)) {
        for (const entry of leaderboardArray) {
            let row = document.createElement("tr");
            let player=document.createElement("td");
            player.innerHTML="<span> <b> Name: </b> </span>";
            let name = document.createElement("span");
            name.innerText+=handleName(entry["player"]);
            player.appendChild(name);
            //name.innerText+=handleName(entry['player']);
            row.appendChild(player);
            let score=document.createElement("td");
            score.innerHTML="<span> <b> Score: </b> </span>" + entry['score'];
            row.appendChild(score);
            let completion = document.createElement("td");
            completion.innerHTML="<span> <b> Date & Time of completion: </b> </span>" + handleTime(entry['completionTime']);
            row.appendChild(completion);
            leaderboardElement.appendChild(row);
            // html += "<tr>" +
            //     "<td>" + "<span> <b> Name: </b> </span>" + entry['player'] + "</td>" +
            //     "<td>" + "<span> <b> Score: </b> </span>" + entry['score'] + "</td>" +
            //     "<td>" + "<span> <b> Date & Time of completion: </b> </span>" + handleTime(entry['completionTime']) + "</td>" +
            //     "</tr>";
        }
    }
    //leaderboardElement.innerHTML = html;
}
refreshButton.addEventListener("click",function(event){
    location.reload();
});

function handleTime(unixTime){
    let options = {day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"};
    let dateAndTime = new Date(unixTime);
    let formattedDateAndTime = dateAndTime.toLocaleDateString("en-UK",options);
    return formattedDateAndTime;
}
function handleName(name){
    if(name.length<=20) {
        console.log(name);
        return name;
    }
    else{
        console.log(name.slice(0,20));
        return name.slice(0,20);
    }
}