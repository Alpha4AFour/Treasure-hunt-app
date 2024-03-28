async function login(){
    //location.reload();
    event.preventDefault();
    let name = document.getElementById("name").value;
    console.log("name: "+name);
    const treasureHuntID = sessionStorage.getItem('treasureHuntID');
    console.log("id: "+treasureHuntID);
    console.log(`Session Storage: ${treasureHuntID}`);
    try{
        await fetch(`https://codecyprus.org/th/api/start?player=${name}&app=Alpha4AFour&treasure-hunt-id=${treasureHuntID}`)
            .then(response => response.json())
            .then(jsonObject=>{
                console.log(jsonObject);
                if (jsonObject.status === "OK") {
                    sessionStorage.setItem("session", jsonObject.session);
                    sessionStorage.setItem("numOfQuestions",jsonObject.numOfQuestions);
                    window.location.href = "treasurehunt.html";
                }
                else {
                    alert(jsonObject.status.errorMessages);
                }
            })
    }
    catch(error) {
        alert("Error");
    }
}

