const gameArea = document.getElementById("gameArea");

// Reset game area when switching games
function showSection(id){
  document.querySelectorAll(".disease").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  gameArea.innerHTML = "";
  document.onkeydown = null; // Reset keyboard listeners
}

// Win/Loss Overlay
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
  overlay.innerHTML = `${type==="win"?"🎉 You Won! 🎉":"❌ You Lost ❌"}<br>${message}<br><button onclick="this.parentElement.remove()">Close</button>`;
  gameArea.appendChild(overlay);
}

/* ----------------- ALZHEIMER'S ----------------- */
// 1. Memory City
function startMemoryCity(){
  gameArea.innerHTML="<h3>Memory City 🏙️</h3><p>Click the landmarks in the same order as shown!</p>";
  const emojis = ["🏠","🌳","🏪","🪑","⛲","🗽","🚌","🚗","💡"];
  const sequence = [];
  const user = [];
  for(let i=0;i<4;i++) sequence.push(Math.floor(Math.random()*9));

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
    tile.style.margin="5px";
    tile.style.width="80px";
    tile.style.height="80px";
    tile.style.border="1px solid #aaa";
    tile.style.borderRadius="10px";
    tile.style.cursor="pointer";

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

  sequence.forEach((n,i)=>setTimeout(()=>{
    const t = grid.children[n];
    t.style.transform="scale(1.3)";
    setTimeout(()=>t.style.transform="scale(1)",400);
  }, i*700));
}

// 2. Story Adventure
function startStoryAdventure(){
  gameArea.innerHTML="<h3>Daily Life Adventure 📝</h3><p>Read the story and answer the question!</p>";
  const p = document.createElement("p");
  p.innerText="Anna went to the market to buy apples and bread.";
  gameArea.appendChild(p);

  setTimeout(()=>{
    p.innerText="Where did Anna go?";
    const options = ["🏪 Market","🏠 Home","🌳 Park"];
    options.forEach(opt=>{
      const b = document.createElement("button");
      b.innerText=opt;
      b.style.margin="5px";
      b.style.fontSize="20px";
      b.onclick = ()=>{
        showEndScreen(opt.includes("Market")?"win":"lose",opt.includes("Market")?"Correct!":"Remember the story carefully!");
      };
      gameArea.appendChild(b);
    });
  },4000);
}

// 3. Tool Time (Fixed Matching Game)
function startToolTime(){
  gameArea.innerHTML="<h3>Tool Time 🔧</h3><p>Click an object, then click its correct place!</p>";
  
  const objects = ["🪥 Toothbrush", "🔨 Hammer", "🗝️ Key"];
  const places = ["🛁 Bathroom", "🧰 Toolbox", "🚪 Door"];
  const correctMatches = {
    "🪥 Toothbrush": "🛁 Bathroom",
    "🔨 Hammer": "🧰 Toolbox",
    "🗝️ Key": "🚪 Door"
  };

  let selectedObject = null;

  const objDiv = document.createElement("div");
  objDiv.style.display="flex";
  objDiv.style.justifyContent="space-around";
  objDiv.style.marginBottom="20px";

  const placeDiv = document.createElement("div");
  placeDiv.style.display="flex";
  placeDiv.style.justifyContent="space-around";

  objects.forEach(obj=>{
    const b = document.createElement("button");
    b.innerText=obj; 
    b.style.fontSize="30px";
    b.onclick=()=>{
      selectedObject=obj; 
      objDiv.querySelectorAll("button").forEach(btn=>btn.style.border=""); // reset highlights
      b.style.border="2px solid blue"; // highlight selected
    };
    objDiv.appendChild(b);
  });

  places.forEach(place=>{
    const b = document.createElement("button");
    b.innerText=place;
    b.style.fontSize="30px";
    b.onclick=()=>{
      if(!selectedObject) return showEndScreen("lose","Select an object first!");
      if(correctMatches[selectedObject]===place){
        showEndScreen("win",`${selectedObject} correctly matched to ${place}!`);
      } else {
        showEndScreen("lose",`${selectedObject} does not go to ${place}!`);
      }
      selectedObject=null;
      objDiv.querySelectorAll("button").forEach(btn=>btn.style.border=""); 
    };
    placeDiv.appendChild(b);
  });

  gameArea.appendChild(objDiv);
  gameArea.appendChild(placeDiv);
}

/* ----------------- PARKINSON'S ----------------- */
// 1. Step in Rhythm
function startArrowDance(){
  gameArea.innerHTML="<h3>Step in Rhythm 🎵</h3><p>Press the matching arrow key!</p>";
  const arrows = ["⬅️","➡️","⬆️","⬇️"];
  const codes = ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"];
  const arrowDiv = document.createElement("div");
  arrowDiv.style.fontSize="60px"; arrowDiv.style.textAlign="center"; arrowDiv.style.marginTop="20px";
  gameArea.appendChild(arrowDiv);

  let hits=0, total=5;
  function nextArrow(){
    const idx = Math.floor(Math.random()*4);
    arrowDiv.innerText = arrows[idx];
    document.onkeydown = e=>{
      if(e.code===codes[idx]){
        hits++;
        if(hits>=total) showEndScreen("win","Nice rhythm!");
        else nextArrow();
      } else {
        showEndScreen("lose","Incorrect key! Try again!");
      }
    };
  }
  nextArrow();
}

// 2. Lab Precision
function startLabPrecision(){
  gameArea.innerHTML="<h3>Lab Precision 🧪</h3><p>Keep the tube in the gray path! Hover over the path to win.</p>";
  const path = document.createElement("div");
  path.style.height="50px"; path.style.background="#ddd"; path.style.marginTop="20px"; path.style.position="relative";
  path.style.borderRadius="10px";
  const tube = document.createElement("div");
  tube.innerText="🧪"; tube.style.position="absolute"; tube.style.left="0px"; tube.style.fontSize="40px";
  path.appendChild(tube);
  gameArea.appendChild(path);

  let x=0, running = true;
  function move(){
    if(!running) return;
    x+=2; if(x>230) x=0;
    tube.style.left=x+"px";
    requestAnimationFrame(move);
  }
  move();

  path.onmouseover = ()=>running=true;
  path.onmouseleave = ()=>{ running=false; showEndScreen("lose","Keep the tube inside the path!"); };
  path.onclick = ()=>{ if(running) showEndScreen("win","Good control!"); };
}

// 3. Music March
function startMusicMarch(){
  gameArea.innerHTML="<h3>Music March 🎶</h3><p>Press SPACE on beat!</p>";
  const beatDiv = document.createElement("div");
  beatDiv.innerText="🎵"; beatDiv.style.fontSize="60px"; beatDiv.style.textAlign="center"; beatDiv.style.marginTop="20px";
  gameArea.appendChild(beatDiv);

  let beat=0, hits=0, total=3;
  function animateBeat(){
    beatDiv.style.color="green";
    setTimeout(()=>beatDiv.style.color="black",400);
    beat=Date.now();
  }
  setInterval(animateBeat,1000);

  document.onkeydown = e=>{
    if(e.code==="Space"){
      const diff = Math.abs(Date.now()-beat);
      if(diff<400){ hits++; if(hits>=total) showEndScreen("win","Great timing!"); } 
      else showEndScreen("lose","Missed the beat! Try again!");
    }
  };
}

/* ----------------- HUNTINGTON'S ----------------- */
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

  let light="red";
  const lightDiv = document.createElement("div");
  lightDiv.style.fontSize="50px"; lightDiv.style.textAlign="center"; lightDiv.style.marginTop="10px";
  gameArea.appendChild(lightDiv);

  function toggleLight(){
    light = (Math.random()>0.5)?"green":"red";
    lightDiv.innerText = light==="green"?"🟢 Green":"🔴 Red";
  }
  toggleLight();
  setInterval(toggleLight,1500);

  runner.onclick = ()=>{
    if(light==="green") showEndScreen("win","You ran safely!");
    else showEndScreen("lose","Wait for green light!");
  };
}

// 3. Shape Safari
function startShapeSafari(){
  gameArea.innerHTML="<h3>Shape Safari 🔺🔵◼️</h3><p>Click the next shape in the sequence!</p>";
  const pattern=["🔵","◼️","🔺","🔵"];
  const sequenceDiv=document.createElement("p"); sequenceDiv.innerText="Pattern: 🔵, ◼️, 🔺, 🔵"; gameArea.appendChild(sequenceDiv);

  const choicesDiv=document.createElement("div"); choicesDiv.style.marginTop="10px"; gameArea.appendChild(choicesDiv);
  ["🔵","◼️","🔺"].forEach(shape=>{
    const btn=document.createElement("button");
    btn.innerText=shape; btn.style.fontSize="30px"; btn.style.margin="5px";
    btn.onclick = ()=>{ shape==="🔵"?showEndScreen("win","Correct! Great observation!") : showEndScreen("lose","Wrong! Try again."); };
    choicesDiv.appendChild(btn);
  });
}
