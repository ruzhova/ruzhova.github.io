var tasks = new Array(
    "Выберите все фигуры с тремя углами",
    "Выберите все фигуры, у которых меньше четырех углов",
    "Выберите все фигуры с четырьмя углами",
    "Выберите все фигуры, у которых больше трех углов",
    "Выберите все фигуры с пятью углами"
)
var correct_answers = {
    "Выберите все фигуры с тремя углами":['triangle'],
    "Выберите все фигуры, у которых меньше четырех углов":['triangle', 'circle'],
    "Выберите все фигуры с четырьмя углами":['square'],
    "Выберите все фигуры, у которых больше трех углов":['square', 'star', 'gex', 'heptagon'],
    "Выберите все фигуры с пятью углами":['star']
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
function choice(id){

    resultfield = document.getElementById("result");
    childnodes = resultfield.childNodes;
   
    item = document.getElementById(id);
    if (childnodes.length > 1){
        if (Array.from(childnodes).find(node => node.isEqualNode(item))){
            figurefield = document.getElementById("figures");
            item.classList.add(id);
            figurefield.appendChild(item);
        }
        else{
            item.classList.remove(id);
            resultfield.appendChild(item);
        }
    }
    else{
        item.classList.remove(id);
        resultfield.appendChild(item);
    }
}

function currtask(){
    const number = task_num();
    taskfield = document.getElementById("taskfield");
    taskfield.innerHTML = "Вариант "+ number + ": " + tasks[number];
}

function create_button(){
    let node = document.createElement("button");
    node.classList.add("buttonclass");
    node.classList.add("game_info");
    node.id = "continue";
    node.innerHTML = "продолжить";
    node.onclick = function(){
        location.href = "../levels/level3.html";
    }
    return node;
}

function check_result(){
    taskfield = document.getElementById("taskfield").innerHTML.substring(11,document.getElementById("taskfield").innerHTML.length);
    const answerbox = document.getElementById("result");
    childnodes = answerbox.childNodes;
    var answers = new Array();
    for (i = 0; i<id_array.length; i++){
        if (Array.from(childnodes).find(node => node.isEqualNode(id_array[i]))){
            answers.push(id_array[i].id);
        }
    }
    wrong_answers = new Array();
    if (answers.length < 1){
        modal('false_answer');
        localStorage.setItem('score2', 0)
    }
    else{
        cnt = 0;
        //max = parseInt(correct_answers[taskfield].length)>parseInt(answers.length) ? parseInt(correct_answers[taskfield].length) : parseInt(answers.length);
        for (var i=0;i<answers.length;i++){
            idx = correct_answers[taskfield].indexOf(answers[i]);
            if (idx < 0) {
                wrong_answers.push(answers[i])
            }
            else{
                cnt ++;
            };
        }
        if (wrong_answers.length>0 || cnt != correct_answers[taskfield].length){
            if (cnt>0){
                modal('true_false_answer');
                localStorage.setItem('score2', 25)
            }
            else{
                modal('false_answer');
                localStorage.setItem('score2', 0)
            }
        }
        else{
            modal('true_answer');
            setTimeout(function() {
                localStorage.setItem('score2', 50);
                location.href = "../levels/level3.html";
            }, (2 * 1000));
        }
    }
    if (!document.getElementById("continue")){
        bottom = document.getElementsByClassName("bottom")[0];
        element = create_button();
        menu = document.getElementsByClassName("bottom_menu")[0];
        bottom.insertBefore(element, menu);
    }
    
}