window.onload = function (){
    const monsterContainer = document.querySelector('#monster-container');
    let page = 1;

    const backBtn = document.querySelector ("#back");

    backBtn.addEventListener("click", function(){
        page-=1;
        fetchMonster(page);
    });

    const forwardBtn = document.querySelector ('#forward');

    forwardBtn.addEventListener("click", function(){
        page+=1;
        fetchMonster(page);
    })

    const fetchMonster = function (page){
        if (page > 1){
            backBtn.disabled = false;
        } else {
            backBtn.disabled = true;
        }
        monsterContainer.innerHTML="";
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i<50; i++){
                const monsterDiv = document.createElement("div");
                monsterContainer.appendChild(monsterDiv);

                const nameHeader = document.createElement("h2");
                nameHeader.innerText = data[i].name;
                monsterDiv.appendChild(nameHeader);

                const age = document.createElement("p");
                age.innerText = `Age: ${data[i].age}`;
                age.style.fontWeight = "900";
                monsterDiv.appendChild(age);

                const desc = document.createElement("p");
                desc.innerText = `Bio: ${data[i].description}`;
                monsterDiv.appendChild(desc);
            }
        })
        .catch(console.error);
    };

    fetchMonster(page);

    const createMonster = document.querySelector("#create-monster");
    const form = document.createElement("form");
    createMonster.appendChild(form);

    const nameInput = document.createElement("input");
    nameInput.placeholder = "name ...";
    form.appendChild(nameInput);

    const ageInput = document.createElement("input");
    ageInput.placeholder = "age...";
    form.appendChild(ageInput);

    const descInput = document.createElement("input");
    descInput.placeholder = "description ...";
    form.appendChild(descInput);

    const createBtn = document.createElement("input");
    createBtn.type = "submit";
    createBtn.value = "Create";
    form.appendChild(createBtn);

    form.addEventListener("submit", function (e){
        e.preventDefault();

        fetch('http://localhost:3000/monsters', {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify({
                name: nameInput.value,
                age: ageInput.value,
                description: descInput.value
            })
        })

        e.reset;
    });
}