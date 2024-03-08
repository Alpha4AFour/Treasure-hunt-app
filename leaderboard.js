const apiLeaderboard = "https://codecyprus.org/th/api/leaderboard";
function getLeaderBoard(apiLeaderBoard) {
    fetch(apiLeaderBoard, {method: "GET"})
        .then(response => response.json())
        .then(json => handleLeaderboard(json));
}

let session = "ag9nfmNv...oMa0gQoM&sorted&limit=10";
let url = apiLeaderboard + "?session=" + session;
getLeaderBoard(url);

function handleLeaderboard(leaderboard) {
    console.log('Received leaderboard data:', leaderboard);

    let html = " ";
    let leaderboardArray = leaderboard['leaderboard'];
    if (Array.isArray(leaderboardArray)) {
        for (const entry of leaderboardArray) {
            html += "<tr>" +
                "<td>" + entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + entry['completionTime'] + "</td>" +
                "</tr>";
        }
    }
    let leaderboardElement = document.getElementById('data');
    leaderboardElement.innerHTML = html;
}