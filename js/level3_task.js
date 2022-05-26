var figures_links = new Array(
    "../png/level3/circle-1.png",
    "../png/level3/heptagon-2.png",
    "../png/level3/square-3.png",
    "../png/level3/star-4.png",
    "../png/level3/triangle-5.png"
)
//индексы от 0 до количества ссылок
var indexes = [0,1,2,3,4];

var tasks = new Array(
    "Упорядочьте фигуры по цифрам, расположенным внутри них [по возрастанию]",
    "Упорядочьте фигуры по цифрам, расположенным внутри них [по убыванию]",
    "Упорядочьте фигуры по количеству углов [по возрастанию]",
    "Упорядочьте фигуры по количеству углов [по убыванию]"
)
var correct_answers = {
    "Упорядочьте фигуры по цифрам, расположенным внутри них [по возрастанию]": ['item1', 'item2', 'item3', 'item4', 'item5'],
    "Упорядочьте фигуры по цифрам, расположенным внутри них [по убыванию]": ['item5', 'item4', 'item3', 'item2', 'item1'],
    "Упорядочьте фигуры по количеству углов [по возрастанию]": ['item1', 'item5', 'item3', 'item4', 'item2'],
    "Упорядочьте фигуры по количеству углов [по убыванию]": ['item2', 'item4', 'item3', 'item5', 'item1']
};
container = document.getElementById("figures");
const ids = Array.from(container.childNodes);
var id_array = new Array();
for (i=0; i<ids.length; i++){
    if (ids[i].id != 'undefined'){
        id_array.push(ids[i]);
    }
}

function task_num(){
    return Math.floor(Math.random() * (tasks.length - 1));
}

//перетасовка фишера-йейтса
function shuffle() {
    i = indexes.length;
    j = 0;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        // рандомно переставляем текущий элемент с выбранным
        temp = indexes[i];
        indexes[i] = indexes[j];
        indexes[j] = temp;
    }
    return indexes;
}
function create_figures(count){
    let node = document.createElement("img");
    node.classList.add("item");
    node.id = `item${count+1}`;
    node.src = figures_links[count];
    node.draggable=true;
    return node;
}
function show_figures(ind){
    container = document.getElementById("figures");
    for (i=0; i<ind.length; i++){
        let item = create_figures(ind[i]);
        container.appendChild(item);
    }
}

function currtask(){
    const number = task_num();
    taskfield = document.getElementById("taskfield");
    taskfield.innerHTML = "Вариант "+ number + ": " + tasks[number];
    random_sequence = shuffle();
    show_figures(random_sequence);

    const figures = document.body.querySelectorAll(".item");
    const results = document.body.querySelectorAll(".res_cont");
    fig_cont = document.getElementById("figures");
    
    for (let r of results){
        r.ondragover = allowDrop;
        r.ondrop = drop;
    }
    fig_cont.ondragover = allowDrop;
    fig_cont.ondrop = drop;
    
    for (let item of figures){
        item.ondragstart = function(event) {
            event.dataTransfer.setData("id", event.target.id);
        };
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        let element = document.getElementById(event.dataTransfer.getData("id"));
        element.style.margin = 'auto';
        
        if ((event.target.classList[0] != "res_cont") && event.target.id != "figures") {
            element.style.margin = null;
            return;
        }
        if (event.target.id == "figures") {
            element.style.margin = null;
        }
        if (event.target.classList[0] == "res_cont") {
            if (event.target.childNodes.length != 0) {
                element.style.margin = null;
                return;
            }
        }
        event.target.append(element);
        document.onmousemove = null;
    }
    
}

function create_button(){
    let node = document.createElement("button");
    node.classList.add("buttonclass");
    node.classList.add("game_info");
    node.id = "continue";
    node.innerHTML = "продолжить";
    node.onclick = function(){
        location.href =  "../../results.html";
    }
    return node;
}

function check_result(){
    taskfield = document.getElementById("taskfield").innerHTML.substring(11,document.getElementById("taskfield").innerHTML.length);
    const answerbox = document.getElementById("result");
    childnodes = answerbox.childNodes;
    var answers = new Array();
    for (i = 1; i<=figures_links.length; i++){
        cont = document.getElementById(i);
        if (cont){
            if(cont.firstChild){
                answers.push(cont.firstChild);
            }
            else{
                answers.push(' ');
            }
        }
    }
    wrong_answers = new Array();
    var cnt = 0;
    for (i = 0;i<answers.length;i++){
        idx = correct_answers[taskfield].indexOf(answers[i].id);
        if (idx == i) {
            cnt++;
        }
        else {
            wrong_answers.push(answers[i])
        };
    }
    if (wrong_answers.length>0){
        if (cnt>0){
            modal('true_false_answer');
            localStorage.setItem('score3', 25)
        }
        else{
            modal('false_answer');
            localStorage.setItem('score3', 0)
        }
    }
    else{
        modal('true_answer');
        setTimeout(function() {
            localStorage.setItem('score3', 50);
            location.href = "../../results.html";
        }, (2 * 1000));
    }

    if (!document.getElementById("continue")){
        bottom = document.getElementsByClassName("bottom")[0];
        element = create_button();
        menu = document.getElementsByClassName("bottom_menu")[0];
        bottom.insertBefore(element, menu);
    }
    
}