import {questions} from "./questions.js";

document.addEventListener("DOMContentLoaded", function(){
    const $mainContainer = document.querySelector("#main-container");
    const $bg = document.querySelector("#bg");
    const $bgm = document.querySelector("#bgm");
    const $result = document.querySelector("#result");
    const ctx = $result.getContext("2d");
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
    const $questionOpContainer = document.querySelector("#question-op-container");
    const $questionFrame = document.querySelector("#question-frame");
    const $questionText = document.querySelector("#question-text");
    const $opBtn1 = document.querySelector("#op-btn1");
    const $opBtn2 = document.querySelector("#op-btn2");
    const $opBtn3 = document.querySelector("#op-btn3");
    const $opBtn4 = document.querySelector("#op-btn4");
    const $opFrame1 = document.querySelector("#op-frame1");
    const $opFrame2 = document.querySelector("#op-frame2");
    const $opFrame3 = document.querySelector("#op-frame3");
    const $opFrame4 = document.querySelector("#op-frame4");
    const $opText1 = document.querySelector("#op-text1");
    const $opText2 = document.querySelector("#op-text2");
    const $opText3 = document.querySelector("#op-text3");
    const $opText4 = document.querySelector("#op-text4");

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
        $bgm.play();
        toNextPage(() => {
            $bg.src = "/src/bg2.mp4";
            toggleVisibility($btn1);
            toggleVisibility($text);
            toggleVisibility($inputContainer);
            toggleVisibility($btn2);
            $inputBox.style.fontSize = `${$mainContainer.offsetWidth/18}px`;
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
                $skipBtn.style.fontSize = `${$mainContainer.offsetWidth/12}px`;

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

            $questionText.innerText = questions[0].question;
            $opText1.innerText = questions[0].options[0].text;
            $opText2.innerText = questions[0].options[1].text;
            $opText3.innerText = questions[0].options[2].text;
            $questionOpContainer.classList.toggle("question-container-layout1");
            toggleVisibility($questionOpContainer);
            $questionFrame.style.height = `${$mainContainer.offsetWidth/3}px`;
            $questionText.style.fontSize = `${$mainContainer.offsetWidth/24}px`;
            $opFrame1.style.height = `${$mainContainer.offsetWidth*2.5/27}px`;
            $opFrame2.style.height = `${$mainContainer.offsetWidth*2.5/27}px`;
            $opFrame3.style.height = `${$mainContainer.offsetWidth*2.5/27}px`;
            $opFrame4.style.height = `${$mainContainer.offsetWidth*2.5/27}px`;
            $opText1.style.fontSize = `${$mainContainer.offsetWidth/27}px`;
            $opText2.style.fontSize = `${$mainContainer.offsetWidth/27}px`;
            $opText3.style.fontSize = `${$mainContainer.offsetWidth/27}px`;
            $opText4.style.fontSize = `${$mainContainer.offsetWidth/27}px`;
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
                $questionText.innerText = questions[currentQuestion].question;
                $opText1.innerText = questions[currentQuestion].options[0].text;
                $opText2.innerText = questions[currentQuestion].options[1].text;
                $opText3.innerText = questions[currentQuestion].options[2].text;
            } else {
                toggleVisibility($mask);
                toggleVisibility($questionOpContainer);
                toggleVisibility($btn3);
            }

            if (currentQuestion === 4){
                $opText4.innerText = questions[currentQuestion].options[3].text;
                $opBtn4.classList.remove("hidden");
            }

            if (currentQuestion === 1){
                $mask.src = "/src/mask2.png";
                $questionOpContainer.classList.toggle("question-container-layout1");
                $questionOpContainer.classList.toggle("question-container-layout2");
            }
            if (currentQuestion === 3){
                $mask.src = "/src/mask1.png";
                $questionOpContainer.classList.toggle("question-container-layout1");
                $questionOpContainer.classList.toggle("question-container-layout2");
            }
        });
    }

    function fn4(){
        const characterImg = generateCharacter(attributes);

        const img = new Image();
        img.onload = () => {
            $result.width = 1080;
            $result.height = 1920;
            ctx.drawImage(img, 0, 0);
            ctx.font = "54px Cubic";
            ctx.fillStyle = "rgb(92, 53, 3)";
            ctx.textAlign = "center";
    
            ctx.fillText(userName, 540, 90);
        };
    
        img.src = characterImg;

        toNextPage(() => {
            toggleVisibility($bg);
            toggleVisibility($result);
            toggleVisibility($btn3);
            toggleVisibility($btn4);
            toggleVisibility($btn5);
        });
    }

    function setBgAsBottomLayer(){
        $bg.classList.add("bg");
        $bg.removeEventListener("play", setBgAsBottomLayer);
    }

    function shareImage() {
        const dataURL = $result.toDataURL('image/png');

        function dataURLtoBlob(dataurl) {
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        }
        
        const blob = dataURLtoBlob(dataURL);

        const file = new File([blob], "result.png", { type: 'image/png' });

        if (navigator.share) {
            navigator.share({
                title: "result",
                files: [file],
            }).then(() => {
                console.log('Share was successful.');
            }).catch((error) => {
                console.log('Sharing failed', error);
            });
        } else {
            console.log('Web Share API is not supported in your browser.');
        }
    }

    $bg.addEventListener("play", setBgAsBottomLayer);
    $skipBtn.addEventListener("click", () => {
        fn3();
    });
    $btn1.addEventListener("click", fn1);
    $btn2.addEventListener("click", fn2);
    $btn3.addEventListener("click", fn4);
    $btn4.addEventListener("click", () => window.location.reload());
    $btn5.addEventListener("click", shareImage);
    $opBtn1.addEventListener("click", () => nextQuestion(0));
    $opBtn2.addEventListener("click", () => nextQuestion(1));
    $opBtn3.addEventListener("click", () => nextQuestion(2));
    $opBtn4.addEventListener("click", () => nextQuestion(3));
    window.addEventListener("resize", () => {
        $bg.style.height = `${$bg.offsetWidth * 16 / 9}px`;
        $inputBox.style.fontSize = `${$mainContainer.offsetWidth/18}px`;
        $questionFrame.style.height = `${$mainContainer.offsetWidth/3}px`;
        $questionText.style.fontSize = `${$mainContainer.offsetWidth/24}px`;
        $skipBtn.style.fontSize = `${$mainContainer.offsetWidth/12}px`;
        $opFrame1.style.height = `${$mainContainer.offsetWidth*2.5/27}px`;
        $opFrame2.style.height = `${$mainContainer.offsetWidth*2.5/27}px`;
        $opFrame3.style.height = `${$mainContainer.offsetWidth*2.5/27}px`;
        $opFrame4.style.height = `${$mainContainer.offsetWidth*2.5/27}px`;
        $opText1.style.fontSize = `${$mainContainer.offsetWidth/27}px`;
        $opText2.style.fontSize = `${$mainContainer.offsetWidth/27}px`;
        $opText3.style.fontSize = `${$mainContainer.offsetWidth/27}px`;
        $opText4.style.fontSize = `${$mainContainer.offsetWidth/27}px`;
    });

    $bg.style.height = `${$bg.offsetWidth * 16 / 9}px`;
    $bg.style.visibility = "visible";
});
