document.addEventListener('DOMContentLoaded', function refresh () {
    async function callList() {
        try {
            const response = await fetch("https://codecyprus.org/th/api/list");
            const jsonObject = await response.json();
            let treasureHuntsArray = jsonObject.treasureHunts;
            console.log(jsonObject);
            let treasurehuntList = document.getElementById("treasurehuntList");
            for (let i = 0; i < treasureHuntsArray.length; i++) {
                let listItem = document.createElement('li');
                let start = treasureHuntsArray[i].startsOn;
                let end = treasureHuntsArray[i].endsOn;
                const currentTimestamp = new Date().getTime();
                const timeToStart = start-currentTimestamp;
                const timeToEnd = end-currentTimestamp;
                // if(currentTimestamp<treasureHuntsArray[i].startsOn || currentTimestamp>treasureHuntsArray[i].endsOn){
                //     listItem.style.pointerEvents = "none";
                //     listItem.className = "inactive";
                // }
                if(timeToStart>0){
                    listItem.style.pointerEvents = "none";
                    listItem.className="inactive";
                    listItem.innerHTML = treasureHuntsArray[i].name+"</br>Will begin in: "+handleTime(timeToStart);
                }
                else if(timeToStart<0&&timeToEnd>0){
                    listItem.innerHTML = treasureHuntsArray[i].name+"</br>Will end in: "+handleTime(timeToEnd);
                }
                // Needs testing
                else{
                    listItem.style.pointerEvents = "none";
                    listItem.className="inactive";
                    listItem.innerHTML = treasureHuntsArray[i].name+"</br>Has finished: "+handleTime(timeToEnd);
                }
                //listItem.innerHTML = treasureHuntsArray[i].name+"</br>"+"Starts in: "+start+"</br>"+"Ends in: "+end;
                listItem.innerHTML+="<p id='start' style='display: none'>"+start+"</p></br><p id='end' style='display: none'>"+end+"</p>";
                listItem.id=treasureHuntsArray[i].uuid;
                treasurehuntList.appendChild(listItem);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    callList();
    setInterval(update,1000);
    document.getElementById('refresh').addEventListener('click', function refresh () {
        location.reload();
    });
    document.getElementById('treasurehuntList').addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            const treasureName = event.target.innerText.split('\n')[0];
            // alert("Starting treasure hunt: " + treasureName);
            sessionStorage.setItem("treasureHuntID",event.target.id);
            window.location.href="login.html";
        }
    });
});
// Not useful for page. Remove for final submission
// function handleTime(unixTime){
//     let options = {day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"};
//     let dateAndTime = new Date(unixTime);
//     let formattedDateAndTime = dateAndTime.toLocaleDateString("en-UK",options);
//     return formattedDateAndTime;
// }

// Better Formatting
function handleTime(unixTime){
    let sec = 1000, min = 60, hr = 60,day=24,yr=365.25;
    let formattedString ="";
    let years = Math.floor(unixTime/(yr*day*hr*min*sec));
    unixTime-=years*(yr*day*hr*min*sec);
    if(years>0){
        formattedString+=`${years} Years, `;
    }
    let days = Math.floor(unixTime/(day*hr*min*sec));
    unixTime-= days*(day*hr*min*sec);
    if(days>0){
        formattedString+=`${days} Days, `;
    }
    let hours = Math.floor(unixTime/(hr*min*sec));
    unixTime-=hours*(hr*min*sec);
    if(hours>0){
        formattedString+=`${hours} Hours, `;
    }
    let minutes=Math.floor(unixTime/(min*sec));
    unixTime-=minutes*(min*sec);
    if(minutes>0){
        formattedString+=`${minutes} Minutes, `;
    }
    let seconds =Math.floor(unixTime/sec);
    formattedString+=`${seconds} Seconds`;
    let formattedDateAndTime = `Days: ${days} Hours: ${hours} Minutes: ${minutes} Seconds: ${seconds}`;
    //console.log(formattedString);
    return formattedString;
}
function update(){
    let array = document.getElementsByTagName("li");
    for(let treasureHunt of array){
        //let start=Number(treasureHunt.document.getElementById("start").innerText);
        //let end=Number(treasureHunt.document.getElementById("end").innerText);
        let timeStamp = treasureHunt.getElementsByTagName("p");
        let start= Number(timeStamp[0].innerText);
        let end = Number(timeStamp[1].innerText);
        const currentTimestamp = new Date().getTime();
        const timeToStart = start-currentTimestamp;
        const timeToEnd = end-currentTimestamp;
        if(timeToStart>0){
            treasureHunt.style.pointerEvents = "none";
            treasureHunt.className="inactive";
            treasureHunt.innerHTML = treasureHunt.innerHTML.split("<",1)+"</br>Will begin in: "+handleTime(timeToStart);
        }
        else if(timeToStart<0&&timeToEnd>0){
            treasureHunt.style.pointerEvents="auto";
            treasureHunt.classList.remove("inactive");
            treasureHunt.innerHTML = treasureHunt.innerHTML.split("<",1)+"</br>Will end in: "+handleTime(timeToEnd);
        }
        // Needs testing
        else{
            treasureHunt.style.pointerEvents = "auto";
            treasureHunt.className="inactive";
            treasureHunt.innerHTML = treasureHunt.innerHTML.split("\n",1)+"</br>Has finished: "+handleTime(timeToEnd);
        }
        treasureHunt.innerHTML+="<p id='start' style='display: none'>"+start+"</p></br><p id='end' style='display: none'>"+end+"</p>";
    }
}
