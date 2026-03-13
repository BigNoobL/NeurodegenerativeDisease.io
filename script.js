const gameArea=document.getElementById("gameArea")

function showSection(id){

document.querySelectorAll(".disease").forEach(s=>{
s.classList.add("hidden")
})

document.getElementById(id).classList.remove("hidden")

}

/* --------------------
ALZHEIMER'S GAMES
--------------------*/

function startMemoryPath(){

gameArea.innerHTML="<h3>Memory Path</h3>"

let seq=[]
let user=[]

for(let i=0;i<9;i++){

let d=document.createElement("div")
d.className="tile"
d.dataset.id=i

d.onclick=()=>clickTile(i)

gameArea.appendChild(d)

}

for(let i=0;i<4;i++)
seq.push(Math.floor(Math.random()*9))

seq.forEach((n,i)=>{

setTimeout(()=>{

document.querySelectorAll(".tile")[n].style.background="yellow"

setTimeout(()=>{
document.querySelectorAll(".tile")[n].style.background="white"
},400)

},i*700)

})

function clickTile(n){

user.push(n)

if(user[user.length-1]!=seq[user.length-1]){

alert("Incorrect — try again")
user=[]

}

if(user.length==seq.length){

alert("Correct!")

}

}

}

function startStoryRecall(){

gameArea.innerHTML="<h3>Story Recall</h3>"

let story="Anna went to the market to buy apples and bread."

let p=document.createElement("p")
p.innerText=story

gameArea.appendChild(p)

setTimeout(()=>{

p.innerText="Where did Anna go?"

let input=document.createElement("input")

let btn=document.createElement("button")
btn.innerText="Submit"

btn.onclick=()=>{

if(input.value.toLowerCase().includes("market"))
alert("Correct!")
else
alert("Try again")

}

gameArea.appendChild(input)
gameArea.appendChild(btn)

},5000)

}

function startObjectMatch(){

gameArea.innerHTML="<h3>Object Match</h3>"

let objects={
Toothbrush:"teeth",
Key:"door",
Hammer:"build"
}

for(let o in objects){

let b=document.createElement("button")
b.innerText=o

b.onclick=()=>{

let ans=prompt("What is it used for?")

if(ans.toLowerCase().includes(objects[o]))
alert("Correct")
else
alert("Try again")

}

gameArea.appendChild(b)

}

}

/* --------------------
PARKINSON'S GAMES
--------------------*/

function startReactionSteps(){

gameArea.innerHTML="<h3>Reaction Steps</h3>"

let arrow=document.createElement("div")
arrow.style.fontSize="60px"

gameArea.appendChild(arrow)

let arrows=["⬅","➡","⬆","⬇"]

function next(){

arrow.innerText=arrows[Math.floor(Math.random()*4)]

}

document.onkeydown=next

next()

}

function startSteadyHands(){

gameArea.innerHTML="<h3>Steady Hands</h3>"

let box=document.createElement("div")
box.style.height="40px"
box.style.background="#ddd"

let dot=document.createElement("div")
dot.style.width="20px"
dot.style.height="20px"
dot.style.background="black"
dot.style.position="relative"

box.appendChild(dot)
gameArea.appendChild(box)

let x=0

function move(){

x+=2
dot.style.left=x+"px"

if(x>500)x=0

requestAnimationFrame(move)

}

box.onmousemove=e=>{

if(e.offsetY>30)
alert("Stay steady!")

}

move()

}

function startRhythm(){

gameArea.innerHTML="<h3>Rhythm Walk</h3><p>Press SPACE with the beat</p>"

let beat=0

setInterval(()=>{

beat=Date.now()

},1000)

document.onkeydown=e=>{

if(e.code==="Space"){

let diff=Math.abs(Date.now()-beat)

alert("Timing difference: "+diff+"ms")

}

}

}

/* --------------------
HUNTINGTON'S GAMES
--------------------*/

function startSequence(){

gameArea.innerHTML="<h3>Sequence Focus</h3>"

let nums=[1,2,3,4,5].sort(()=>Math.random()-0.5)

let expected=1

nums.forEach(n=>{

let b=document.createElement("button")
b.innerText=n

b.onclick=()=>{

if(n==expected){

expected++

if(expected>5)
alert("Great job!")

}else{

alert("Wrong order")

}

}

gameArea.appendChild(b)

})

}

function startImpulse(){

gameArea.innerHTML="<h3>Impulse Control</h3>"

let circle=document.createElement("div")

circle.style.width="120px"
circle.style.height="120px"
circle.style.borderRadius="60px"

gameArea.appendChild(circle)

setInterval(()=>{

if(Math.random()>0.5){

circle.style.background="green"
circle.onclick=()=>alert("Correct")

}else{

circle.style.background="red"
circle.onclick=()=>alert("Do not click red!")

}

},1500)

}

function startPattern(){

gameArea.innerHTML="<h3>Pattern Tracking</h3>"

let seq=["circle","square","circle","square"]

let p=document.createElement("p")
p.innerText="Pattern: circle, square, circle, square"

gameArea.appendChild(p)

let input=document.createElement("input")

let btn=document.createElement("button")
btn.innerText="Next shape?"

btn.onclick=()=>{

if(input.value=="circle")
alert("Correct pattern")
else
alert("Look for repeating patterns")

}

gameArea.appendChild(input)
gameArea.appendChild(btn)

}
