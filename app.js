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
                let start = handleTime(treasureHuntsArray[i].startsOn);
                let end = handleTime(treasureHuntsArray[i].endsOn);
                listItem.innerHTML = treasureHuntsArray[i].name+"</br>"+"Starts in: "+start+"</br>"+"Ends in: "+end;
                treasurehuntList.appendChild(listItem);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    callList();

    document.getElementById('refresh').addEventListener('click', function refresh () {
        location.reload();
    });
});

function handleTime(unixTime){
    let options = {day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"};
    let dateAndTime = new Date(unixTime);
    let formattedDateAndTime = dateAndTime.toLocaleDateString("en-UK",options);
    return formattedDateAndTime;
}