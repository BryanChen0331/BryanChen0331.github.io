import { questions } from './questions.js';

let currentQuestion = -1;

const attributes = {
    adventure: 0,
    social: 0,
    creativity: 0,
    strategy: 0,
    emotion: 0,
    intuition: 0
};

function generateCharacter(attributes) {
    const attributeToCharacter = {
        adventure: "DJ章魚",
        social: "人騎海馬",
        creativity: "健力龍蝦",
        strategy: "河豚",
        emotion: "墨鏡海豚",
        intuition: "水母"
    };

    const max_value = Math.max(...Object.values(attributes));
    const highest_attributes = Object.keys(attributes).filter(attr => attributes[attr] === max_value);
    const selected_attribute = highest_attributes[Math.floor(Math.random() * highest_attributes.length)];
    const character = attributeToCharacter[selected_attribute];
    
    return character;
}

window.onload = function(){
    const $title = document.querySelector("#title");
    const $contentBox = document.querySelector("#content-box");
    const $content = document.querySelector("#content");
    const $character = document.querySelector("#character");
    const $startBtn = document.querySelector("#start-btn");
    const $btn1 = document.querySelector("#btn1");
    const $btn2 = document.querySelector("#btn2");
    const $btn3 = document.querySelector("#btn3");
    const $btn4 = document.querySelector("#btn4");
    const $restartBtn = document.querySelector("#restart-btn");

    function start(){
        $title.style.display = "none";
        $startBtn.style.display = "none";

        $contentBox.style.display = "block";
        $content.style.display = "block";
        $btn1.style.display = "block";
        $btn2.style.display = "block";
        $btn3.style.display = "block";

        update();
    }

    function update(option){
        $btn4.style.display = "none";

        if (currentQuestion < 8 && option !== undefined){
            const {effect} = questions[currentQuestion].options[option];
            attributes[effect]++;
        }

        currentQuestion++;
        
        if (currentQuestion < 8){
            const {question} = questions[currentQuestion];
            const options = questions[currentQuestion].options.map(option => option.text);
            
            $content.innerText = question;
            $btn1.innerText = options[0];
            $btn2.innerText = options[1];
            $btn3.innerText = options[2];
            
            if (currentQuestion === 4){
                $btn4.innerText = options[3];
                $btn4.style.display = "block";
            }
        } else {
            showResult();
        }
    }

    function showResult(){
        $content.style.display = "none";
        $btn1.style.display = "none";
        $btn2.style.display = "none";
        $btn3.style.display = "none";

        const character = generateCharacter(attributes)
        $character.style.display = "block";
        $character.innerText = character;

        $restartBtn.style.display = "block";
    }

    $startBtn.addEventListener("click", start);
    $btn1.addEventListener("click", () => {
        update(0)
    });
    $btn2.addEventListener("click", () => {
        update(1)
    });
    $btn3.addEventListener("click", () => {
        update(2)
    });
    $btn4.addEventListener("click", () => {
        update(3)
    });
    $restartBtn.addEventListener("click", () => {
        window.location.reload();
    });
}