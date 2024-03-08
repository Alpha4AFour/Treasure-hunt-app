async function question(){
    await fetch("https://codecyprus.org/th/api/question?session="+session)
        .then(response=>response.json())
        .then(jsonObject =>{
            console.log(jsonObject);
        });
}
const param = new URLSearchParams(document.location.search);
const session = param.get("session");
console.log(session);
question();