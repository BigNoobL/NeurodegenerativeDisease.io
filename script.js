const gameArea=document.getElementById("gameArea");

function showSection(id){
  document.querySelectorAll(".disease").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  gameArea.innerHTML=""; // Clear previous game
}

// Utility function for graphical feedback
function showFeedback(type){
  const fb=document.createElement("div");
  fb.className="feedback";
  fb.innerHTML=type==="win"?"✔️":"❌";
  gameArea.appendChild(fb);
  setTimeout(()=>fb.remove(),1000);
}

/* ----------------- ALZHEIMER'S ----------------- */
// Memory City
function startMemoryCity(){
  gameArea.innerHTML="<h3>Memory City</h3><p>Click landmarks in order!</p>";
  const landmarks=["house","tree","shop","bench","fountain","statue","bus","car","lamp"];
  let seq=[], user=[];
  gameArea.style.display="flex";
  gameArea.style.flexWrap="wrap";
  for(let i=0;i<9;i++){
    const tile=document.createElement("div");
    tile.className="tile";
    tile.style.backgroundImage=`url('assets/landmarks/${landmarks[i]}.png')`;
    tile.dataset.id=i;
    tile.onclick=()=>{ user.push(i); if(i!==seq[user.length-1]){ showFeedback("lose"); user=[]; } else{ if(user.length===seq.length){ showFeedback("win"); } } };
    gameArea.appendChild(tile);
  }
  for(let i=0;i<4;i++) seq.push(Math.floor(Math.random()*9));
  // show sequence animation
  seq.forEach((n,i)=>setTimeout(()=>{const t=document.querySelectorAll(".tile")[n]; t.style.transform="scale(1.2)"; setTimeout(()=>t.style.transform="scale(1)",400); },i*700));
}

// Story Adventure
function startStoryAdventure(){
  gameArea.innerHTML="<h3>Daily Life Adventure</h3>";
  const story="Anna went to the market to buy apples and bread.";
  const p=document.createElement("p"); p.innerText=story;
  gameArea.appendChild(p);
  setTimeout(()=>{
    p.innerText="Where did Anna go?";
    ["Market","Home","Park"].forEach(c=>{
      const b=document.createElement("button"); b.innerText=c;
      b.onclick=()=>{ if(c==="Market") showFeedback("win"); else showFeedback("lose"); };
      gameArea.appendChild(b);
    });
  },4000);
}

// Tool Time (drag-drop simplified)
function startToolTime(){
  gameArea.innerHTML="<h3>Tool Time</h3><p>Click the object and drag to the right location!</p>";
  const items={Toothbrush:"Bathroom",Hammer:"Toolbox",Key:"Door"};
  for(let obj in items){
    const b=document.createElement("img");
    b.src=`assets/tools/${obj}.png`;
    b.width=80; b.height=80;
    b.style.margin="10px";
    b.onclick=()=>showFeedback("win");
    gameArea.appendChild(b);
  }
}

/* ----------------- PARKINSON'S ----------------- */
// Arrow Dance
function startArrowDance(){ gameArea.innerHTML="<h3>Step in Rhythm</h3><p>Press matching arrow key!</p>"; const arrows=["⬅️","➡️","⬆️","⬇️"]; const arrowDiv=document.createElement("div"); arrowDiv.style.fontSize="60px"; gameArea.appendChild(arrowDiv); function next(){ arrowDiv.innerText=arrows[Math.floor(Math.random()*4)]; } document.onkeydown=e=>next(); next(); }

// Lab Precision
function startLabPrecision(){ gameArea.innerHTML="<h3>Lab Precision</h3><p>Keep the tube in the path!</p>"; const path=document.createElement("div"); path.style.height="40px"; path.style.background="#ddd"; path.style.position="relative"; const dot=document.createElement("div"); dot.style.width="20px"; dot.style.height="20px"; dot.style.background="black"; dot.style.position="absolute"; dot.style.left="0px"; path.appendChild(dot); gameArea.appendChild(path); let x=0; function move(){ x+=2; if(x>350)x=0; dot.style.left=x+"px"; requestAnimationFrame(move); } move(); }

// Music March
function startMusicMarch(){ gameArea.innerHTML="<h3>Music March</h3><p>Press SPACE on beat!</p>"; let beat=0; setInterval(()=>beat=Date.now(),1000); document.onkeydown=e=>{ if(e.code==="Space"){ let diff=Math.abs(Date.now()-beat); if(diff<300)showFeedback("win"); else showFeedback("lose"); } }; }

/* ----------------- HUNTINGTON'S ----------------- */
// Number Train
function startNumberTrain(){ gameArea.innerHTML="<h3>Number Train</h3>"; const nums=[1,2,3,4,5].sort(()=>Math.random()-0.5); let expected=1; nums.forEach(n=>{ const b=document.createElement("button"); b.innerText=n; b.onclick=()=>{ if(n==expected){ expected++; if(expected>5)showFeedback("win"); }else showFeedback("lose"); }; gameArea.appendChild(b); }); }

// Red Light Green Light
function startRedLightGreenLight(){ gameArea.innerHTML="<h3>Red Light Green Light</h3>"; const char=document.createElement("img"); char.src="assets/characters/runner.png"; char.width=100; gameArea.appendChild(char); setInterval(()=>{char.style.opacity=Math.random()>0.5?1:0.5;},1500); char.onclick=()=>{ if(char.style.opacity==1)showFeedback("win"); else showFeedback("lose"); }; }

// Shape Safari
function startShapeSafari(){ gameArea.innerHTML="<h3>Shape Safari</h3>"; const shapes=["circle","square","triangle","circle"]; const p=document.createElement("p"); p.innerText="Predict the next shape"; gameArea.appendChild(p); const input=document.createElement("input"); const btn=document.createElement("button"); btn.innerText="Submit"; btn.onclick=()=>{ if(input.value==="circle")showFeedback("win"); else showFeedback("lose"); }; gameArea.appendChild(input); gameArea.appendChild(btn); }
