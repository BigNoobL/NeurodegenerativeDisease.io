const gameArea = document.getElementById("gameArea");

function showSection(id){
  document.querySelectorAll(".disease").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  gameArea.innerHTML = ""; // clear game area
}

// Utility function for graphical feedback
function showFeedback(type){
  const fb = document.createElement("div");
  fb.className = "feedback";
  fb.innerHTML = type === "win" ? "✔️" : "❌";
  gameArea.appendChild(fb);
  setTimeout(() => fb.remove(), 1000);
}

/* ----------------- ALZHEIMER'S GAMES ----------------- */

// Memory City - emojis instead of images
function startMemoryCity(){
  gameArea.innerHTML = "<h3>Memory City</h3><p>Click the landmarks in order!</p>";
  const emojis = ["🏠","🌳","🏪","🪑","⛲","🗽","🚌","🚗","💡"];
  const seq = [];
  const user = [];
  for(let i=0;i<4;i++) seq.push(Math.floor(Math.random()*9));

  // Create tiles
  emojis.forEach((emoji, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerText = emoji;
    tile.style.fontSize = "40px";
    tile.style.display = "flex";
    tile.style.alignItems = "center";
    tile.style.justifyContent = "center";
    tile.dataset.id = i;
    tile.onclick = () => {
      user.push(i);
      if(user[user.length-1] !== seq[user.length-1]){
        showFeedback("lose");
        user.length = 0;
      } else if(user.length === seq.length){
        showFeedback("win");
      }
    };
    gameArea.appendChild(tile);
  });

  // Show sequence animation
  seq.forEach((n,i) => setTimeout(()=>{
    const t = document.querySelectorAll(".tile")[n];
    t.style.transform = "scale(1.3)";
    setTimeout(()=> t.style.transform="scale(1)", 400);
  }, i*700));
}

// Story Adventure
function startStoryAdventure(){
  gameArea.innerHTML = "<h3>Daily Life Adventure</h3>";
  const p = document.createElement("p");
  p.innerText = "Anna went to the market to buy apples and bread.";
  gameArea.appendChild(p);

  setTimeout(()=>{
    p.innerText = "Where did Anna go?";
    ["🏪 Market","🏠 Home","🌳 Park"].forEach(c=>{
      const b = document.createElement("button");
      b.innerText = c;
      b.onclick = () => { c.includes("Market") ? showFeedback("win") : showFeedback("lose"); };
      gameArea.appendChild(b);
    });
  },4000);
}

// Tool Time - drag/drop simulated with clicks
function startToolTime(){
  gameArea.innerHTML = "<h3>Tool Time</h3><p>Click the object to match its place!</p>";
  const items = {"🪥 Toothbrush":"🛁 Bathroom", "🔨 Hammer":"🧰 Toolbox", "🗝️ Key":"🚪 Door"};
  Object.entries(items).forEach(([obj, place])=>{
    const b = document.createElement("button");
    b.innerText = `${obj} → ${place}`;
    b.onclick = () => showFeedback("win");
    gameArea.appendChild(b);
  });
}

/* ----------------- PARKINSON'S ----------------- */

// Step in Rhythm - arrows
function startArrowDance(){
  gameArea.innerHTML="<h3>Step in Rhythm</h3><p>Press the matching arrow key!</p>";
  const arrows=["⬅️","➡️","⬆️","⬇️"];
  const arrowDiv = document.createElement("div");
  arrowDiv.style.fontSize="60px";
  arrowDiv.style.textAlign="center";
  gameArea.appendChild(arrowDiv);
  function nextArrow(){ arrowDiv.innerText = arrows[Math.floor(Math.random()*4)]; }
  document.onkeydown = e => { nextArrow(); showFeedback("win"); };
  nextArrow();
}

// Lab Precision
function startLabPrecision(){
  gameArea.innerHTML="<h3>Lab Precision</h3><p>Keep the test tube inside the path!</p>";
  const path = document.createElement("div");
  path.style.height="40px"; path.style.background="#ddd"; path.style.position="relative";
  const tube = document.createElement("div");
  tube.innerText = "🧪";
  tube.style.position="absolute"; tube.style.left="0px"; tube.style.fontSize="40px";
  path.appendChild(tube); gameArea.appendChild(path);

  let x=0;
  function move(){ x+=2; if(x>350)x=0; tube.style.left=x+"px"; requestAnimationFrame(move); }
  move();

  path.onmousemove = e => { if(e.offsetY>40) showFeedback("lose"); else showFeedback("win"); };
}

// Music March
function startMusicMarch(){
  gameArea.innerHTML="<h3>Music March</h3><p>Press SPACE on beat!</p>";
  let beat=0;
  setInterval(()=>{ beat=Date.now(); }, 1000);
  document.onkeydown = e => {
    if(e.code==="Space"){ let diff=Math.abs(Date.now()-beat); diff<300 ? showFeedback("win") : showFeedback("lose"); }
  };
}

/* ----------------- HUNTINGTON'S ----------------- */

// Number Train
function startNumberTrain(){
  gameArea.innerHTML="<h3>Number Train</h3>";
  const emojis=["🚂","🚃","🚃","🚃","🚃"];
  let expected=1;
  emojis.forEach((emoji,i)=>{
    const b=document.createElement("button");
    b.innerText=`${expected} ${emoji}`;
    b.onclick=()=>{
      if(i+1 === expected){ expected++; if(expected>5) showFeedback("win"); }
      else showFeedback("lose");
    };
    gameArea.appendChild(b);
  });
}

// Red Light Green Light
function startRedLightGreenLight(){
  gameArea.innerHTML="<h3>Red Light Green Light</h3>";
  const char = document.createElement("div");
  char.innerText = "🏃";
  char.style.fontSize = "60px"; char.style.textAlign = "center"; char.style.marginTop="30px";
  gameArea.appendChild(char);

  setInterval(()=>{ char.style.color = Math.random()>0.5 ? "green" : "red"; },1500);
  char.onclick = ()=>{ char.style.color==="green" ? showFeedback("win") : showFeedback("lose"); };
}

// Shape Safari
function startShapeSafari(){
  gameArea.innerHTML="<h3>Shape Safari</h3><p>Predict the next shape!</p>";
  const shapes = ["🔵","◼️","🔺","🔵"];
  const p = document.createElement("p"); p.innerText = "Pattern: 🔵, ◼️, 🔺, 🔵"; gameArea.appendChild(p);
  const input = document.createElement("input"); const btn = document.createElement("button"); btn.innerText="Next shape?";
  btn.onclick = ()=>{ input.value==="🔵" ? showFeedback("win") : showFeedback("lose"); };
  gameArea.appendChild(input); gameArea.appendChild(btn);
}
