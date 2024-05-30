let alienState = "idle"
let gameOver = false
let alienSprite = document.querySelector("#alien")
alienSprite.src = "content/alienidle.gif"

const eatButton = document.querySelector("#eatButton")
const sleepButton = document.querySelector("#sleepButton")
const funButton = document.querySelector("#funButton")

let hunger = 50
let sleep = 50
let fun = 50

let hungerIncrease = 5
let sleepIncrease = 1
let funIncrease = 3

let hungerDecrease = 1
let sleepDecrease = 1
let funDecrease = 1


let hungerCounter = document.querySelector("#hungerCount")
let sleepCounter = document.querySelector("#sleepCount")
let funCounter = document.querySelector("#funCount")

let timerHungry = setInterval(drainHunger, 1000)
let timerTire = setInterval(drainSleep, 1000)
let timerBore = setInterval(drainFun, 1000)

let timerGain = setInterval(gainStat, 500)
let timerLiving = setInterval(livingStatus, 500)

let timerTalk = setInterval(textInitiate, 5000)
let timerClear = setInterval(textClear, 4900)

let timerEat
let timerSleep
let timerPlay

let hungerBar = document.querySelector("#hungerBar")
let sleepBar = document.querySelector("#sleepBar")
let funBar = document.querySelector("#funBar")

const eatSound = new Audio("content/eat.ogg") //from Minecraft, used the Minecraft Wiki to download them
const burpSound = new Audio("content/burp.ogg") //from Minecraft, used the Minecraft Wiki to download them
const talkSound = new Audio("content/talk.wav")
const sleepMusic = new Audio("content/talk.wav")

// let music = document.querySelector("#music")
// music.src = "content/music/idlemusic.mp3"

let textBox = document.querySelector("#textBox")
let textRandom
let text = ""
let textSpeed = 50
let textP = 0
let i = 0

let eatDialogue = ["Nom nom nom...", "Tasty..."]
let sleepDialogue = ["Z z z", "Zzz-zeep zoop..."]
let funDialogue = ["This reminds me of shooting Zleebians with my Gleep Launcher.", "Beep boop beep boop", "So retro...."]

eatButton.addEventListener("click", feed)
sleepButton.addEventListener("click", snooze)
funButton.addEventListener("click", play)

const openpopup = document.getElementById("openpopup")
const closepopup = document.getElementById("closepopup")
const deadpopup = document.getElementById("deadpopup")
const boredpopup = document.getElementById("boredpopup")
const insomniapopup = document.getElementById("insomniapopup")
const retrypopup = document.getElementsByClassName("retrypopup")

// openpopup.addEventListener("click", () => {
//     deadpopup.classList.add("open")
// })

// closepopup.addEventListener("click", () => {
//     deadpopup.classList.remove("open")
// })


// Bron gebruikt voor het maken van pop-ups: https://www.youtube.com/watch?v=r_PL0K2fGkY&ab_channel=FlorinPop

function textInitiate(){
    i = 0
    if (alienState == "eating"){
        textRandom = Math.random() * eatDialogue.length
        text = eatDialogue[Math.floor(textRandom)]
        console.log(Math.floor(textRandom))
    }
    else if (alienState == "sleeping"){
        textRandom = Math.random() * sleepDialogue.length
        text = sleepDialogue[Math.floor(textRandom)]
        console.log(Math.floor(textRandom))
    }
    else if (alienState == "playing"){
        textRandom = Math.random() * funDialogue.length
        text = funDialogue[Math.floor(textRandom)]
        console.log(Math.floor(textRandom))
    }
    textWrite(text)
}

function textClear(){
    textBox.textContent = ""
}

function textWrite(){
    if(i < text.length){
        textBox.innerHTML += text.charAt(i)
        talkSound.play()
        i = i + 1
        setTimeout(textWrite, textSpeed)
    }
}
// Bron die ik probeer te gebruiken hiervoor= https://www.w3schools.com/howto/howto_js_typewriter.asp 

// function textWrite(text){
//     let i
//     for (i = 0; i < text.length; i++){
//         // if (textP < text.length){
//             textBox.innerHTML += text.charAt(i);
//             setTimeout(textWrite, textSpeed)
//         }
//     // }
// }

// let i
// for (i = 0; i < 1; i++){
//     if (textP < text.length){
//         textBox.innerHTML += text.charAt(i);
//         setTimeout(textWrite, textSpeed)
//     }
// }

// for (i = 0; i < textBox.length; i++){
//     if (textP < text.length){
//         textBox[i].innerHTML += text.charAt(textP);
//         textP = textP + 1
//         setTimeout(textWrite, textSpeed)
//     }
// }
//Gemaakt met behulp van https://stackoverflow.com/questions/58945668/how-to-create-a-typewriter-effect-with-javascript-using-queryselectorall)


function feed(){
    if (alienState !== "eating" && gameOver == false){
        alienState = "eating"
        console.log(alienState)
    }
    else{
        if (gameOver == false){ 
            alienState = "idle"
            console.log(alienState)
        }
    }
}

function snooze(){
    if (alienState !== "sleeping" && gameOver == false){
        alienState = "sleeping"
        console.log(alienState)
    }
    else{
        if (gameOver == false){ 
            alienState = "idle"
            console.log(alienState)
        }
    }
}

function play(){
    if (alienState !== "playing" && gameOver == false){
        alienState = "playing"
        console.log(alienState)
    }
    else{
        if (gameOver == false){ 
            alienState = "idle"
            console.log(alienState)
        }
    }
}

function drainHunger(){
    if (hunger !=0){
        hunger = hunger - hungerDecrease
    }
    hungerCounter.textContent = hunger
    hungerBar.style.width = hunger + '%'
}

function drainSleep(){
    if (sleep != 0){
        sleep = sleep - sleepDecrease
    }
    sleepCounter.textContent = sleep
    sleepBar.style.width = sleep + '%'
}

function drainFun(){
    if (fun != 0){
        fun = fun - funDecrease
    }
    funCounter.textContent = fun
    funBar.style.width = fun + '%'
}

function gainStat(){
    if (alienState == "idle"){ 
        hungerDecrease = 1
        sleepDecrease = 1
        funDecrease = 1
        alienSprite.src = "content/alienidle.gif"
    }
    if (alienState == "eating"){
        if (hunger != 100){
            hunger = Math.min(Math.max(hunger + hungerIncrease, 0), 100)
            eatSound.play()
        }
        alienSprite.src = "content/alieneat.gif"
        // music.src = "content/music/eatmusic.mp3"
        hungerCounter.textContent = hunger
        hungerBar.style.width = hunger + '%'
        hungerDecrease = 0
        sleepDecrease = 1
        funDecrease = 1
        if (hunger == 100){
            burpSound.play()
            alienState = "idle"
        }
    }
    else if (alienState == "sleeping"){
        if (sleep != 100){
            sleep = Math.min(Math.max(sleep + sleepIncrease, 0), 100)
            music.play()
        }
        alienSprite.src = "content/aliensleep.gif"
        // music.src = "content/music/sleepmusic.mp3"
        sleepCounter.textContent = sleep
        sleepBar.style.width = sleep + '%'
        hungerDecrease = 1
        sleepDecrease = 0
        funDecrease = 1
        if (sleep == 100){
            alienState = "idle"
        }
    }
    else if (alienState == "playing"){
        if (fun != 100){
            fun = Math.min(Math.max(fun + funIncrease, 0), 100)
        }
        alienSprite.src = "content/alienplay.gif"
        // music.src = "content/music/playmusic.mp3"
        funCounter.textContent = fun
        funBar.style.width = fun + '%'
        hungerDecrease = 1
        sleepDecrease = 1
        funDecrease = 0
        if (fun == 100){
            alienState = "idle"
        }
    }
}

function livingStatus(){
    if(hunger == 0 ){
        alienState = "dead"
        gameOver = true
        alienSprite.src = "content/aliendeath.png"
        deadpopup.classList.add("open")
        clearTimer()
    }
    else if (sleep == 0){
        alienState = "insomnia"
        gameOver = true
        insomniapopup.classList.add("open")
        clearTimer()
    }
    else if (fun == 0){
        alienState = "bored"
        gameOver = true
        boredpopup.classList.add("open")
        clearTimer()
    }
}

function clearTimer(){
    clearInterval(timerHungry)
    clearInterval(timerBore)
    clearInterval(timerTire)
    clearInterval(gainStat)
    clearInterval(timerLiving)
    clearInterval(timerTalk)
}

// function reload(){
//     location.reload()
// }

// retrypopup.addEventListener("click", reload)

let music = new Audio("content/music/sleepmusic.mp3")

music.addEventListener("ended", function(){
    this.currentTime = 0;
    this.play();
})
