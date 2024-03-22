function start(error){
    let URL = "https://codecyprus.org/th/test-api/start?player=";
    if(error!=="noError")
        URL+=error;
    fetch(URL)
        .then(response=>response.json())
        .then(jsonObject=>{
            console.log(jsonObject);
        });
}
function handleForm(){
    event.preventDefault();
    let error = document.getElementById("error").value;
    console.log(`Error type: ${error}`);
    start(error);
}