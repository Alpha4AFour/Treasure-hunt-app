document.getElementById('treasurehuntList').addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        const treasureName = event.target.innerText.split('\n')[0];
        alert("Starting treasure hunt: " + treasureName);
        //sessionStorage.setItem("treasureHuntID",event.target.id);
        //window.location.href="login.html";
    }
});
function treasureHuntList(treasureHuntNumber){
    fetch(`https://codecyprus.org/th/test-api/list?number-of-ths=${treasureHuntNumber}`)
        .then(response=>response.json())
        .then(jsonObject=>{
            console.log(jsonObject);
            let array = jsonObject.treasureHunts;
            let list = document.getElementById("treasurehuntList");
            for(const entry of array){
                let item = document.createElement("li");
                item.id=entry.uuid;
                let start = entry.startsOn;
                let end = entry.endsOn;
                const currentTimestamp = new Date().getTime();
                const timeToStart = start-currentTimestamp;
                const timeToEnd = end-currentTimestamp;
                if(timeToStart>0){
                    item.style.pointerEvents = "none";
                    item.className="inactive";
                    item.innerHTML = item.innerHTML = entry.name+"</br>Will begin in: "+handleTime(timeToStart);
                }
                else if(timeToStart<0&&timeToEnd>0){
                    item.innerHTML = entry.name+"</br>Will end in: "+handleTime(timeToEnd);
                }
                // Needs testing
                else{
                    item.style.pointerEvents = "none";
                    item.className="inactive";
                    item.innerHTML = entry.name+"</br>Has finished: "+handleTime(timeToEnd);
                }
                list.appendChild(item);
            }
        });
}
function handleForm(){
    event.preventDefault();
    let treasureHuntNumber = document.getElementById("number").value;
    console.log(`Number: ${treasureHuntNumber}`);
    treasureHuntList(treasureHuntNumber);
}
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
    let seconds =unixTime/sec;
    formattedString+=`${seconds} Seconds`;
    //console.log(formattedString);
    return formattedString;
}