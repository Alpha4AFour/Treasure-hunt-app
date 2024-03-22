function leaderboard(sorted,hasPrize,size){
    let URL = `https://codecyprus.org/th/test-api/leaderboard?size=${size}&`;
    if(sorted){
        URL+="sorted&";
    }
    if(hasPrize){
        URL+="hasPrize";
    }
    fetch(URL)
        .then(response=>response.json())
        .then(jsonObject=>{
            console.log(jsonObject);
            let leaderboard = jsonObject["leaderboard"];
            let table = document.getElementById("leaderboard");
            for(const entry of leaderboard){
                let row = document.createElement("tr");
                row.innerHTML = "<th>"+entry["player"]+"</th>"+
                    "<th>"+entry["score"]+"</th>"+"<th>"+handleTime(entry["completionTime"])+"</th>";
                table.appendChild(row);
            }
        })
}
function handleForm(){
    //let sorted,hasPrize,size;
    event.preventDefault();
    let sorted=document.getElementById("sorted").checked;
    let hasPrize=document.getElementById("hasPrize").checked;
    let size=document.getElementById("size").value;
    console.log(sorted);
    console.log(hasPrize);
    console.log(size);
    alert("");
    leaderboard(sorted,hasPrize,size);
}
function handleTime(unixTime){
    let options = {day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"};
    let dateAndTime = new Date(unixTime);
    let formattedDateAndTime = dateAndTime.toLocaleDateString("en-UK",options);
    return formattedDateAndTime;
}
