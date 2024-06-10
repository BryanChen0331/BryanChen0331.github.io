import {questions} from "./questions.js";

window.onload = function(){
    const $bg = document.querySelector("#bg");
    const $result = document.querySelector("#result");
    const $userName = document.querySelector("#username");
    const $mask = document.querySelector("#mask")
    const $cutscene = document.querySelector("#cutscene");
    const $cutsceneBg = document.querySelector("#cutscene-bg");
    const $text = document.querySelector("#text");
    const $inputContainer = document.querySelector("#input-container");
    const $inputBox = document.querySelector("#input-box");
    const $skipBtn = document.querySelector("#skip-btn");
    const $btn1 = document.querySelector("#btn1");
    const $btn2 = document.querySelector("#btn2");
    const $btn3 = document.querySelector("#btn3");
    const $btn4 = document.querySelector("#btn4");
    const $btn5 = document.querySelector("#btn5");
    const $questionContainer = document.querySelector("#question-container");
    const $question = document.querySelector("#question");
    const $opBtn2 = document.querySelector("#op-btn2");
    const $opBtn1 = document.querySelector("#op-btn1");
    const $opBtn3 = document.querySelector("#op-btn3");
    const $opBtn4 = document.querySelector("#op-btn4");

    let currentQuestion = 0;
    let userName;
    let handleVideoEndedWrapper;

    const attributes = {
        adventure: 0,
        social: 0,
        creativity: 0,
        strategy: 0,
        emotion: 0,
        intuition: 0
    };

    function generateCharacter(attributes){
        const attributeToCharacter = {
            adventure: "/src/result1.png",
            social: "/src/result2.png",
            creativity: "/src/result3.png",
            strategy: "/src/result4.png",
            emotion: "/src/result5.png",
            intuition: "/src/result6.png"
        };

        const max_value = Math.max(...Object.values(attributes));
        const highest_attributes = Object.keys(attributes).filter(attr => attributes[attr] === max_value);
        const selected_attribute = highest_attributes[Math.floor(Math.random() * highest_attributes.length)];
        const characterImg = attributeToCharacter[selected_attribute];
        
        return characterImg;
    }

    function toggleVisibility(element){
        element.classList.toggle("hidden");
    }
    
    function toNextPage(callback){
        function handleFirstAnimationEndWrapper() {
            $cutsceneBg.removeEventListener("animationend", handleFirstAnimationEndWrapper);
            $cutsceneBg.addEventListener('animationend', handleSecondAnimationEndWrapper);
            $cutsceneBg.classList.toggle("fadeInToBlack");
            $cutsceneBg.classList.toggle("fadeOutFromBlack");
    
            callback();
        }
    
        function handleSecondAnimationEndWrapper() {
            $cutsceneBg.removeEventListener("animationend", handleSecondAnimationEndWrapper);
            $cutsceneBg.classList.toggle("fadeOutFromBlack");
            toggleVisibility($cutscene);
        }
    
        $cutsceneBg.addEventListener("animationend", handleFirstAnimationEndWrapper);
        $cutsceneBg.classList.toggle("fadeInToBlack");
        toggleVisibility($cutscene);
    }
    
    function fn1(){
        toNextPage(() => {
            $bg.src = "/src/bg2.mp4";
            toggleVisibility($btn1);
            toggleVisibility($text);
            toggleVisibility($inputContainer);
            toggleVisibility($btn2);
            $inputBox.style.fontSize = `${document.body.offsetWidth/18}px`;
        });
    }

    function fn2(){
        userName = $inputBox.value;
        if (userName){
            toNextPage(() => {
                $bg.src = "/src/bg3.mp4";
                $bg.loop = false;
                toggleVisibility($text);
                toggleVisibility($inputContainer);
                toggleVisibility($skipBtn);
                toggleVisibility($btn2);
                $skipBtn.style.fontSize = `${document.body.offsetWidth/12}px`;

                handleVideoEndedWrapper = function() {
                    fn3();
                };

                $bg.addEventListener("ended", handleVideoEndedWrapper);
            });
        }
    }

    function fn3(){
        toNextPage(() => {
            $bg.removeEventListener("ended", handleVideoEndedWrapper);

            if (handleVideoEndedWrapper) {
                $bg.removeEventListener("ended", handleVideoEndedWrapper);
            }

            $bg.src = "/src/bg4.mp4";
            $bg.loop = true;
            toggleVisibility($mask);
            toggleVisibility($skipBtn);

            $question.innerText = questions[0].question;
            $opBtn1.innerText = questions[0].options[0].text;
            $opBtn2.innerText = questions[0].options[1].text;
            $opBtn3.innerText = questions[0].options[2].text;
            $questionContainer.classList.toggle("question-container-layout1");
            toggleVisibility($questionContainer);
            $question.style.fontSize = `${document.body.offsetWidth/20}px`;
            $opBtn1.style.fontSize = `${document.body.offsetWidth/27}px`;
            $opBtn2.style.fontSize = `${document.body.offsetWidth/27}px`;
            $opBtn3.style.fontSize = `${document.body.offsetWidth/27}px`;
            $opBtn4.style.fontSize = `${document.body.offsetWidth/27}px`;
        });
    }

    function nextQuestion(option){
        toNextPage(() => {
            $opBtn4.classList.add("hidden");

            const {effect} = questions[currentQuestion].options[option];
            attributes[effect]++;
            currentQuestion++;
            $bg.src = `/src/bg${currentQuestion+4}.mp4`;

            if (currentQuestion < 8){
                $question.innerText = questions[currentQuestion].question;
                $opBtn1.innerText = questions[currentQuestion].options[0].text;
                $opBtn2.innerText = questions[currentQuestion].options[1].text;
                $opBtn3.innerText = questions[currentQuestion].options[2].text;
            } else {
                toggleVisibility($mask);
                toggleVisibility($questionContainer);
                toggleVisibility($btn3);
            }

            if (currentQuestion === 4){
                $opBtn4.innerText = questions[currentQuestion].options[3].text;
                $opBtn4.classList.remove("hidden");
            }

            if (currentQuestion === 1){
                $mask.src = "/src/mask2.png";
                $questionContainer.classList.toggle("question-container-layout1");
                $questionContainer.classList.toggle("question-container-layout2");
            }
            if (currentQuestion === 3){
                $mask.src = "/src/mask1.png";
                $questionContainer.classList.toggle("question-container-layout1");
                $questionContainer.classList.toggle("question-container-layout2");
            }
        });
    }

    function fn4(){
        const characterImg = generateCharacter(attributes);
        $result.src = characterImg;
        $userName.innerText = userName;

        toNextPage(() => {
            toggleVisibility($bg);
            toggleVisibility($result);
            toggleVisibility($userName);
            toggleVisibility($btn3);
            toggleVisibility($btn4);
            toggleVisibility($btn5);
            $userName.style.fontSize = `${document.body.offsetWidth/20}px`;
        });
    }

    $skipBtn.addEventListener("click", () => {
        fn3();
    });
    $btn1.addEventListener("click", fn1);
    $btn2.addEventListener("click", fn2);
    $btn3.addEventListener("click", fn4);
    $btn4.addEventListener("click", () => window.location.reload());
    $opBtn1.addEventListener("click", () => nextQuestion(0));
    $opBtn2.addEventListener("click", () => nextQuestion(1));
    $opBtn3.addEventListener("click", () => nextQuestion(2));
    $opBtn4.addEventListener("click", () => nextQuestion(3));
    window.addEventListener("resize", () => {
        $userName.style.fontSize = `${document.body.offsetWidth/20}px`;
        $inputBox.style.fontSize = `${document.body.offsetWidth/18}px`;
        $question.style.fontSize = `${document.body.offsetWidth/20}px`;
        $skipBtn.style.fontSize = `${document.body.offsetWidth/12}px`;
        $opBtn1.style.fontSize = `${document.body.offsetWidth/27}px`;
        $opBtn2.style.fontSize = `${document.body.offsetWidth/27}px`;
        $opBtn3.style.fontSize = `${document.body.offsetWidth/27}px`;
        $opBtn4.style.fontSize = `${document.body.offsetWidth/27}px`;
    })
}
