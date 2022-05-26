
var girls_clothes = new Array(
    '../png/level1/girl/blue_top.png',
    '../png/level1/girl/red_top.png',
    '../png/level1/girl/blue_skirt.png',
    '../png/level1/girl/red_skirt.png'
);
var boys_clothes = new Array(
    '../png/level1/boy/boys_tshirt.png',
    '../png/level1/boy/boys_shirt.png',
    '../png/level1/boy/boys_jeans.png',
    '../png/level1/boy/boys_suit.png'
);
var tasks = new Array(
    "Наденьте на девочку красный топ и красную юбку",
    "Наденьте на девочку синий топ и синюю юбку",
    "Наденьте на мальчика костюм",
    "Наденьте на мальчика джинсы и футболку",
    "Наденьте на мальчика джинсы и синюю рубашку"
)
var correct_answers = {
    "Наденьте на девочку красный топ и красную юбку":['item2','item4'],
    "Наденьте на девочку синий топ и синюю юбку":['item1', 'item3'],
    "Наденьте на мальчика костюм":['item4'],
    "Наденьте на мальчика джинсы и футболку":['item1', 'item3'],
    "Наденьте на мальчика джинсы и синюю рубашку":['item2', 'item3']

};
function task_num(){
    return Math.floor(Math.random() * (tasks.length - 1));
}

function create_clothes(count){
    let node = document.createElement("img");
    node.classList.add("item");
    node.id = `item${count}`;
    return node;
}

function show_clothes(gender){
    container = document.getElementById("clothes");
    if (gender == true){
        for (i=0; i<girls_clothes.length; i++){
            let item = create_clothes(i+1);
            item.src = girls_clothes[i];
            item.draggable = true;
            container.appendChild(item);
        }
    }
    else{
        for (i=0; i<boys_clothes.length; i++){
            let item = create_clothes(i+1);
            item.src = boys_clothes[i];
            item.draggable = true;
            container.appendChild(item);
        }
    }
}

function show_doll(gender){
    container2 = document.getElementById("gender");
    let doll = document.createElement("img");
    doll.id ='doll';
    if (gender == true){
        doll = document.querySelector(".girldoll");
    }
    else{
        doll = document.querySelector(".boydoll");
    }
     doll.classList.add('show');
}

function currtask(){
    const number = task_num();
    taskfield = document.getElementById("taskfield");
    taskfield.innerHTML = "Вариант "+ number + ": " + tasks[number]; 
    var genderbool = true;
    if (tasks[number].substring(12, 13) == "д"){
        show_clothes(genderbool);
        show_doll(genderbool);
    }
    else{
        genderbool = false;
        show_clothes(genderbool);
        show_doll(genderbool);
    }
    const clothes = document.body.querySelectorAll(".item");

    for (let item of clothes){
        item.onmousedown = function(event) { // (1) отследить нажатие

            item.style.position = 'absolute';
            item.style.zIndex = 1000;
            clothes_container = document.getElementById('clothes');
            level1_container = document.getElementById('level1_container');
            level1_container.appendChild(item);
            result_container = document.getElementById('gender');
            
            moveAt(event.pageX, event.pageY);
          
            function moveAt(pageX, pageY) {
                item.style.left = pageX - item.offsetWidth / 2 + 'px';
                item.style.top = pageY - item.offsetHeight / 2 + 'px';
            }
          
            function onMouseMove(event) {
              moveAt(event.pageX, event.pageY);
            }
          
            document.addEventListener('mousemove', onMouseMove);

            item.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                rc = getCoords(result_container);
                i = getCoords(item);
                if (i.top >= (rc.top-result_container.offsetHeight) && i.left <= (rc.left + result_container.offsetWidth)) {
                    item.style.top = null;
                    item.style.left = null;
                    
                    if (genderbool){
                        str_girl = `girl-${item.id}`;
                        item.classList.add(str_girl);
                    }
                    else{
                        str_boy =`boy-${item.id}`;
                        item.classList.add(str_boy);
                    }

                    result_container.appendChild(item);
                }
                else{
                    if (genderbool){
                        item.classList.remove(`girl-${item.id}`);
                    }
                    else{
                        item.classList.remove(`boy-${item.id}`);
                    }

                    item.style.position = null;
                    item.style.top = null;
                    item.style.left = null;

                    clothes_container.appendChild(item);
                }
                item.onmouseup = null;
            };
          
        };
        item.ondragstart = function() {
            return false;
        };

        function getCoords(elem) {  
            var box = elem.getBoundingClientRect();
            return {
              top: box.top + scrollY,
              left: box.left + scrollX
            };
        }
    }
}
function create_button(){
    let node = document.createElement("button");
    node.classList.add("buttonclass");
    node.classList.add("game_info");
    node.id = "continue";
    node.innerHTML = "продолжить";
    node.onclick = function(){
        location.href = "../levels/level2.html";
    }
    return node;
}

function check_result(){
    taskfield = document.getElementById("taskfield").innerHTML.substring(11,document.getElementById("taskfield").innerHTML.length);
    const answerbox = document.getElementById("gender");
    var answers = new Array();
    genderclass = 'boy';
    doll = document.getElementsByClassName('show');
    if (doll[0].classList[0] == "girldoll"){
        genderclass = 'girl';
    }
    else{
        genderclass = 'boy';
    }
    for (i = 1; i<5; i++){
        if (document.getElementById(`item${i}`).classList.contains('frame')){
            document.getElementById(`item${i}`).classList.remove('frame');
        }
        if ((document.getElementsByClassName(`${genderclass}-item${i}`)).length == 1){
            answers.push((document.getElementsByClassName(`${genderclass}-item${i}`))[0].id);
        }
    }
    wrong_answers = new Array();
    if (answers.length < 1){
       modal('false_answer');
    }
    else{
        cnt = 0;
        for (var i=0;i<answers.length;i++){
            idx = correct_answers[taskfield].indexOf(answers[i]);
            if (idx < 0) {
                wrong_answers.push(answers[i])
            }
            else{
                cnt ++;
            };
        }
        if (wrong_answers.length>0){
            if (cnt>0){
                modal('true_false_answer');
                localStorage.setItem('score1', 25)
            }
            else{
                modal('false_answer');
                localStorage.setItem('score1', 0)
            }
            for (i=0; i<wrong_answers.length; i++){
                element = document.getElementById(wrong_answers[i]);
                element.classList.add('frame');
            }
        }
        else{
            modal('true_answer');
            setTimeout(function() {
                localStorage.setItem('score1', 50);
                location.href = "../levels/level2.html";
            }, (2 * 1000));
        }
    }
    if (!document.getElementById("continue")){
        bottom = document.getElementsByClassName("bottom")[0];
        element = create_button();
        menu = document.getElementsByClassName("bottom_menu")[0];
        bottom.insertBefore(element, menu);
    }
    // location.href = "../levels/level2.html";
    
}