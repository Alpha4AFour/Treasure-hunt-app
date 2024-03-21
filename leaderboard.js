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

    let html = " ";
    let leaderboardArray = leaderboard['leaderboard'];
    if (Array.isArray(leaderboardArray)) {
        for (const entry of leaderboardArray) {
            html += "<tr>" +
                "<td>" + entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + handleTime(entry['completionTime']) + "</td>" +
                "</tr>";
        }
    }
    let leaderboardElement = document.getElementById('data');
    leaderboardElement.innerHTML = html;
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