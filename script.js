const gameArea = document.getElementById("gameArea");

function showSection(id){
  document.querySelectorAll(".disease").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  gameArea.innerHTML = "";
}

// Utility function for win/loss overlay
function showEndScreen(type, message){
  const overlay = document.createElement("div");
  overlay.style.position="absolute";
  overlay.style.top=0;
  overlay.style.left=0;
  overlay.style.width="100%";
  overlay.style.height="100%";
  overlay.style.background="rgba(0,0,0,0.7)";
  overlay.style.display="flex";
  overlay.style.flexDirection="column";
  overlay.style.alignItems="center";
  overlay.style.justifyContent="center";
  overlay.style.color="white";
  overlay.style.fontSize="32px";
  overlay.style.zIndex="1000";
  overlay.innerHTML = `${type==="win" ? "🎉 You Won! 🎉" : "❌ You Lost ❌"}<br>${message}<br><button onclick="this.parentElement.remove()">Close</button>`;
  gameArea.appendChild(overlay);
}

/* ----------------- ALZHEIMER'S GAMES ----------------- */

// 1. Memory City
function startMemoryCity(){
  gameArea.innerHTML = "<h3>Memory City 🏙️</h3><p>Click the landmarks in the same order as shown!</p>";
  const emojis = ["🏠","🌳","🏪","🪑","⛲","🗽","🚌","🚗","💡"];
  const sequence = [];
  const user = [];
  for(let i=0;i<4;i++) sequence.push(Math.floor(Math.random()*9));

  // Show the sequence briefly
  const grid = document.createElement("div");
  grid.style.display="flex"; grid.style.flexWrap="wrap"; grid.style.width="280px";
  gameArea.appendChild(grid);

  emojis.forEach((emoji,i)=>{
    const tile = document.createElement("div");
    tile.className="tile";
    tile.innerText=emoji;
    tile.style.fontSize="40px";
    tile.style.display="flex";
    tile.style.alignItems="center";
    tile.style.justifyContent="center";
    tile.dataset.id=i;
    tile.onclick = () => {
      user.push(i);
      if(i !== sequence[user.length-1]){
        showEndScreen("lose","Try to click the landmarks in the correct order!");
        user.length=0;
      } else if(user.length === sequence.length){
        showEndScreen("win","Great memory!");
      }
    };
    grid.appendChild(tile);
  });

  // Sequence animation
  sequence.forEach((n,i)=>setTimeout(()=>{
    const t = grid.children[n];
    t.style.transform="scale(1.3)";
    setTimeout(()=>t.style.transform="scale(1)",400);
  }, i*700));
}

// 2. Story Adventure
function startStoryAdventure(){
  gameArea.innerHTML = "<h3>Daily Life Adventure 📝</h3><p>Read the story and answer the question!</p>";
  const story = "Anna went to the market to buy apples and bread.";
  const p = document.createElement("p");
  p.innerText = story;
  gameArea.appendChild(p);

  setTimeout(()=>{
    p.innerText = "Where did Anna go?";
    const options = ["🏪 Market","🏠 Home","🌳 Park"];
    options.forEach(opt=>{
      const b = document.createElement("button");
      b.innerText = opt;
      b.style.margin="5px";
      b.onclick = ()=>{
        opt.includes("Market") ? showEndScreen("win","Correct!") : showEndScreen("lose","Remember the story carefully!");
      };
      gameArea.appendChild(b);
    });
  },4000);
}

// 3. Tool Time
function startToolTime(){
  gameArea.innerHTML = "<h3>Tool Time 🔧</h3><p>Match the object to its place!</p>";
  const items = {"🪥 Toothbrush":"🛁 Bathroom", "🔨 Hammer":"🧰 Toolbox", "🗝️ Key":"🚪 Door"};
  Object.entries(items).forEach(([obj,place])=>{
    const b = document.createElement("button");
    b.innerText = `${obj} → ${place}`;
    b.style.margin="5px";
    b.onclick = ()=> showEndScreen("win","Well done!");
    gameArea.appendChild(b);
  });
}

/* ----------------- PARKINSON'S GAMES ----------------- */

// 1. Step in Rhythm
function startArrowDance(){
  gameArea.innerHTML="<h3>Step in Rhythm 🎵</h3><p>Press the matching arrow key when it appears!</p>";
  const arrows=["⬅️","➡️","⬆️","⬇️"];
  const arrowDiv = document.createElement("div");
  arrowDiv.style.fontSize="60px"; arrowDiv.style.textAlign="center"; arrowDiv.style.marginTop="20px";
  gameArea.appendChild(arrowDiv);

  let hits=0, total=5;
  function nextArrow(){
    arrowDiv.innerText = arrows[Math.floor(Math.random()*4)];
  }
  document.onkeydown = e=>{
    if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.code)){
      hits++;
      if(hits>=total) showEndScreen("win","Nice rhythm!");
      else nextArrow();
    }
  };
  nextArrow();
}

// 2. Lab Precision
function startLabPrecision(){
  gameArea.innerHTML="<h3>Lab Precision 🧪</h3><p>Move the tube carefully along the path (hover over it)!</p>";
  const path=document.createElement("div");
  path.style.height="50px"; path.style.background="#ddd"; path.style.marginTop="20px"; path.style.position="relative";
  const tube=document.createElement("div");
  tube.innerText="🧪"; tube.style.position="absolute"; tube.style.left="0px"; tube.style.fontSize="40px";
  path.appendChild(tube); gameArea.appendChild(path);

  let x=0; let success=true;
  function move(){ x+=2; if(x>230)x=0; tube.style.left=x+"px"; if(success) requestAnimationFrame(move); }
  move();

  path.onmouseover = e => { success=true; };
  path.onmouseleave = e => { success=false; showEndScreen("lose","Try to keep the tube inside the path!"); };
  path.onclick = ()=>{ if(success) showEndScreen("win","Good control!"); };
}

// 3. Music March
function startMusicMarch(){
  gameArea.innerHTML="<h3>Music March 🎶</h3><p>Press SPACE on the beat!</p>";
  let beat=0; let hits=0, total=3;
  const beatDiv=document.createElement("div");
  beatDiv.innerText="🎵";
  beatDiv.style.fontSize="60px"; beatDiv.style.textAlign="center"; beatDiv.style.marginTop="20px";
  gameArea.appendChild(beatDiv);

  setInterval(()=>{ beat = Date.now(); beatDiv.style.color="green"; setTimeout(()=>beatDiv.style.color="black",500); },1000);
  document.onkeydown = e=>{
    if(e.code==="Space"){
      let diff=Math.abs(Date.now()-beat);
      if(diff<400){ hits++; if(hits>=total) showEndScreen("win","Great timing!"); } 
      else showEndScreen("lose","Try again, keep the rhythm!");
    }
  };
}

/* ----------------- HUNTINGTON'S GAMES ----------------- */

// 1. Number Train
function startNumberTrain(){
  gameArea.innerHTML="<h3>Number Train 🚂</h3><p>Click the train cars in numerical order!</p>";
  const nums=[1,2,3,4,5].sort(()=>Math.random()-0.5);
  let expected=1;
  nums.forEach(num=>{
    const b=document.createElement("button");
    b.innerText=`${num} 🚃`; b.style.margin="5px";
    b.onclick = ()=>{
      if(num===expected){ expected++; if(expected>5) showEndScreen("win","All cars clicked correctly!"); }
      else showEndScreen("lose","Wrong order! Try again.");
    };
    gameArea.appendChild(b);
  });
}

// 2. Red Light Green Light
function startRedLightGreenLight(){
  gameArea.innerHTML="<h3>Red Light Green Light 🚦</h3><p>Click the runner when the light is green!</p>";
  const runner=document.createElement("div");
  runner.innerText="🏃"; runner.style.fontSize="60px"; runner.style.textAlign="center"; runner.style.marginTop="30px";
  gameArea.appendChild(runner);

  setInterval(()=>{
    runner.dataset.light = Math.random()>0.5?"green":"red";
    runner.style.color = runner.dataset.light;
  },1500);

  runner.onclick = ()=>{
    if(runner.dataset.light==="green") showEndScreen("win","You stopped at the right time!");
    else showEndScreen("lose","Oops! Wait for green next time!");
  };
}

// 3. Shape Safari
function startShapeSafari(){
  gameArea.innerHTML="<h3>Shape Safari 🔺🔵◼️</h3><p>Predict the next shape in the sequence!</p>";
  const pattern=["🔵","◼️","🔺","🔵"];
  const p=document.createElement("p"); p.innerText="Pattern: 🔵, ◼️, 🔺, 🔵"; gameArea.appendChild(p);
  const input=document.createElement("input"); input.placeholder="Enter next shape emoji";
  const btn=document.createElement("button"); btn.innerText="Submit"; btn.style.marginLeft="5px";
  btn.onclick = ()=>{ input.value==="🔵"?showEndScreen("win","Correct! Great observation!") : showEndScreen("lose","Try again, look at the pattern."); };
  gameArea.appendChild(input); gameArea.appendChild(btn);
}
