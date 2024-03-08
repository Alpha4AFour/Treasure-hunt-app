async function login(){
    //location.reload();
    event.preventDefault();
    let name = document.getElementById("name").value;
    console.log("name: "+name);
    console.log("id: "+treasureHuntID);
    try{
        await fetch("https://codecyprus.org/th/api/start?player="+name+"&app=Alpha4AFour&treasure-hunt-id="+treasureHuntID)
            .then(response => response.json())
            .then(jsonObject=>{
                console.log(jsonObject);
                window.location.href="treasurehunt.html?session="+jsonObject.session;
            })
    }
    catch(error) {
        alert("Error");
    }
}
const param = new URLSearchParams(document.location.search);
const treasureHuntID = param.get("id");
console.log(treasureHuntID);
