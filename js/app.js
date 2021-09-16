addIdeaBtn = document.getElementById("addIdeaBtn");
displayIdea();
addIdeaBtn.addEventListener('click', function () {
    console.log("add idea button");
    let textarea = document.getElementById("addTextArea");
    let textTitle = document.getElementById("addTextTitle");
    ideas = localStorage.ideas;
    if (ideas == undefined) {
        ideaArray = [];
    }
    else {
        ideaArray = JSON.parse(ideas);
    }
    let obj = [textTitle.value,textarea.value];
    ideaArray.push(obj);
    localStorage.setItem("ideas", JSON.stringify(ideaArray));
    textarea.value = "";
    textTitle.value = "";
    displayIdea();
});

function displayIdea() {
    ideas = localStorage.ideas;
    displayIdeaElement = document.getElementById("displayIdea");
    /*
    
    */
    let html = '';
    if (ideas == undefined || ideas==null || ideas =="[]") {
        html = `Nothing to display! use "Add Idea" section to add your ideas`
    }
    else {
        ideaArray = JSON.parse(ideas);
        ideaArray.forEach(function(element, idx) {
            html += `<div class="card card1" >
                        <img title="Edit" id="x${idx}"src="img/editing.png" class="icon" onclick = "editFunction(this.id)">
                        <div class="card-body">
                            <h5 id="${idx}h5" class="card-title">${element[0]}</h5>
                            <p id="${idx}p"class="card-text">${element[1]}</p>
                            <button href="#" id="${idx}" onClick="deleteFun(this.id)" class="btn btn-primary mybtn">Delete Idea</button>
                        </div>
                    </div>`
            console.log("Idea Node");
        });
        
    }
    displayIdeaElement.innerHTML = html;
}

function deleteFun(index){
    index = Number(index);
    console.log("Delete",typeof index);
    ideaArray = JSON.parse(ideas);
    ideaArray.splice(index,1);
    localStorage.setItem("ideas",JSON.stringify(ideaArray));
    displayIdea()
}

search = document.getElementById("searchInput");

search.addEventListener("input",function(){
    value = search.value;
    cards = document.getElementsByClassName("card1");
    Array.from(cards).forEach(function(element){
        if(element.children[1].children[0].innerText.toLowerCase().includes(value.toLowerCase()) || element.children[1].children[1].innerText.toLowerCase().includes(value.toLowerCase())){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    });
});

function editFunction(index){
    let i = 0
    
    imgElement = document.getElementById(index);
    imgElement.style.cursor = "not-allowed";
    index=index.replace('x','')
    h5 = document.getElementById(index+"h5");
    p = document.getElementById(index+"p");
    index=Number(index)
    h5Html = h5.innerText;
    pHtml = p.innerText;
    h5.innerHTML = `<textarea class="form-control mytextarea" id="addTextArea" rows="1" placeholder="Your idea">${h5Html}</textarea>`
    p.innerHTML = `<textarea class="form-control mytextarea" id="addTextArea" rows="3" placeholder="Your idea">${pHtml}</textarea>`
    h5.children[0].addEventListener('blur',function(){
        i++;
        h5.innerText=h5.children[0].value;
        update(index,0,h5.innerText);
    });
    p.children[0].addEventListener('blur',function(){
        i++;
        p.innerText=p.children[0].value;
        update(index,1,p.innerText);
    });
    

    console.log(ideaArray)
}
function update(index,sec,str) {
    ideas = localStorage.ideas;
    if (ideas == undefined) {
        ideaArray = [];
    }
    else {
        ideaArray = JSON.parse(ideas);
    }
    ideaArray[index][sec]=str;
    localStorage.setItem("ideas", JSON.stringify(ideaArray));
}

deleteAll = document.getElementById("deleteAllBtn");

deleteAll.addEventListener("click",function() {
    localStorage.removeItem('ideas');
    displayIdea();
})
