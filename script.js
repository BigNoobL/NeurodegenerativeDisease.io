const gameArea = document.getElementById("gameArea");

// Section Navigation
function showSection(id){
    document.querySelectorAll(".disease").forEach(s=>s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
    gameArea.innerHTML=""; // clear game area when switching
}

/* ----------------- ALZHEIMER'S GAMES ----------------- */

// 1. Memory City
function startMemoryPath(){
    gameArea.innerHTML="<h3>Memory City</h3><p>Click the landmarks in order!</p>";
    let seq = [], user = [];
    for(let i=0;i<9;i++){
        let d=document.createElement("div");
        d.className="tile";
        d.dataset.id=i;
        d.onclick=()=>clickTile(i);
        gameArea.appendChild(d);
    }
    for(let i=0;i<4;i++) seq.push(Math.floor(Math.random()*9));
    seq.forEach((n,i)=>{
        setTimeout(()=>{
            document.querySelectorAll(".tile")[n].style.background="yellow";
            setTimeout(()=>{document.querySelectorAll(".tile")[n].style.background="white";},400);
        },i*700)
    });
    function clickTile(n){
        user.push(n);
        if(user[user.length-1]!=seq[user.length-1]){
            alert("Incorrect — try again");
            user=[];
        }
        if(user.length==seq.length) alert("Correct! Great memory!");
    }
}

// 2. Daily Life Adventure
function startStoryRecall(){
    gameArea.innerHTML="<h3>Daily Life Adventure</h3>";
    const story = "Anna went to the market to buy apples and bread.";
    const storyP = document.createElement("p"); storyP.innerText = story;
    gameArea.appendChild(storyP);
    setTimeout(()=>{
        storyP.innerText="Where did Anna go?";
        const choices = ["Market","Home","Park"];
        choices.forEach(c=>{
            const b = document.createElement("button");
            b.innerText=c;
            b.onclick=()=>{ if(c=="Market") alert("Correct!"); else alert("Try again."); };
            gameArea.appendChild(b);
        });
    },4000);
}

// 3. Tool Time
function startObjectMatch(){
    gameArea.innerHTML="<h3>Tool Time</h3><p>Drag the objects to correct locations.</p>";
    const items = {Toothbrush:"Bathroom",Key:"Door",Hammer:"Toolbox"};
    for(let obj in items){
        const b = document.createElement("button");
        b.innerText=obj+" → "+items[obj];
        b.onclick=()=>alert("Correct!"); // simplified interaction
        gameArea.appendChild(b);
    }
}

/* ----------------- PARKINSON'S GAMES ----------------- */

// 1. Step in Rhythm
function startReactionSteps(){
    gameArea.innerHTML="<h3>Step in Rhythm</h3><p>Press arrow keys matching the moving arrows!</p>";
    const arrowDiv=document.createElement("div"); arrowDiv.style.fontSize="60px";
    gameArea.appendChild(arrowDiv);
    const arrows=["⬅","➡","⬆","⬇"];
    function next(){ arrowDiv.innerText=arrows[Math.floor(Math.random()*4)]; }
    document.onkeydown=e=>next();
    next();
}

// 2. Lab Precision
function startSteadyHands(){
    gameArea.innerHTML="<h3>Lab Precision</h3><p>Keep the tube inside the path!</p>";
    const path=document.createElement("div");
    path.style.height="40px"; path.style.background="#ddd"; path.style.position="relative";
    const dot=document.createElement("div");
    dot.style.width="20px"; dot.style.height="20px"; dot.style.background="black"; dot.style.position="absolute"; dot.style.left="0px";
    path.appendChild(dot); gameArea.appendChild(path);
    let x=0;
    function move(){
        x+=2; if(x>350) x=0;
        dot.style.left=x+"px";
        requestAnimationFrame(move);
    }
    path.onmousemove=e=>{ if(e.offsetY>30) console.log("Stay steady!"); }
    move();
}

// 3. Music March
function startRhythm(){
    gameArea.innerHTML="<h3>Music March</h3><p>Press SPACE with the beat!</p>";
    let beat=0;
    setInterval(()=>{beat=Date.now();},1000);
    document.onkeydown=e=>{ if(e.code==="Space"){ let diff=Math.abs(Date.now()-beat); alert("Timing difference: "+diff+" ms"); } };
}

/* ----------------- HUNTINGTON'S GAMES ----------------- */

// 1. Number Train
function startSequence(){
    gameArea.innerHTML="<h3>Number Train</h3><p>Click the numbers in order!</p>";
    const nums=[1,2,3,4,5].sort(()=>Math.random()-0.5);
    let expected=1;
    nums.forEach(n=>{
        const b=document.createElement("button"); b.innerText=n;
        b.onclick=()=>{ if(n==expected){ expected++; if(expected>5) alert("Well done!"); }else alert("Wrong order"); };
        gameArea.appendChild(b);
    });
}

// 2. Red Light Green Light
function startImpulse(){
    gameArea.innerHTML="<h3>Red Light Green Light</h3>";
    const circle=document.createElement("div");
    circle.style.width="120px"; circle.style.height="120px"; circle.style.borderRadius="60px"; circle.style.margin="20px auto"; circle.style.background="green";
    gameArea.appendChild(circle);
    setInterval(()=>{
        if(Math.random()>0.5){ circle.style.background="green"; circle.onclick=()=>alert("Good!"); }
        else{ circle.style.background="red"; circle.onclick=()=>alert("Do NOT click red!"); }
    },1500);
}

// 3. Shape Safari
function startPattern(){
    gameArea.innerHTML="<h3>Shape Safari</h3><p>Predict the next shape!</p>";
    const shapes=["circle","square","circle","square"];
    const p=document.createElement("p"); p.innerText="Pattern: circle, square, circle, square"; gameArea.appendChild(p);
    const input=document.createElement("input"); const btn=document.createElement("button"); btn.innerText="Next shape?";
    btn.onclick=()=>{ if(input.value=="circle") alert("Correct!"); else alert("Look for repeating patterns"); };
    gameArea.appendChild(input); gameArea.appendChild(btn);
}
