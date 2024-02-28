document.addEventListener('DOMContentLoaded', function refresh () {
    async function callList() {
        try {
            const response = await fetch("https://codecyprus.org/th/api/list");
            const jsonObject = await response.json();

            let treasureHuntsArray = jsonObject.treasureHunts;
            let treasurehuntList = document.getElementById("treasurehuntList");

            for (let i = 0; i < treasureHuntsArray.length; i++) {
                let listItem = document.createElement('li');
                listItem.textContent = treasureHuntsArray[i].name;
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
