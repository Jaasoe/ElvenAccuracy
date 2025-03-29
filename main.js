let frenzy = false;
let actionSurge = false;
let reloadOnBonusAction = false;
let advantage = false;
let currentGunStack = 0;
let reapersBloodHp = 0;
let sharpShooterList = [1,1,1];
let sharpShooterSavedList = [1,1,1,1,1,1,1,1]
let hexList = [0,0,0];
let hexSavedList = [0,0,0,0,0,0,0,0];
let proficiencyBonus = 4;
let toHitAdd = 12;
let totalGlobal=0;
let necroGlobal=0;
let piercGlobal=0;



//noter: lav hex toggle
//du mangler sharpshooter

let attackCount = 3;

//---------initial event listeners----------


//--------------make-togglers------------------------

const frenzyTog = document.getElementById("frenzyTog");
const actionSurgeTog = document.getElementById("actionSurgeTog");
const reloadTog = document.getElementById("reloadTog");
const advantageTog = document.getElementById("advantageTog");
const gunStackTog0 = document.getElementById("gunStackTog0")
const gunStackTog1 = document.getElementById("gunStackTog1")
const gunStackTog2 = document.getElementById("gunStackTog2")
const hpInput = document.getElementById("hp");


frenzyTog.addEventListener("click", e => {
  frenzyTog.classList.toggle("off");
  frenzyTog.classList.toggle("on");
  frenzy = !frenzy;

  if(attackCount===7){
    attackCount=8;
  }

  if(frenzy){
    if(actionSurge){
      attackCount +=2;
    }else{
      attackCount +=1;
    }
  }else{
    if(actionSurge){
      attackCount-=2;
    }else{
      attackCount-=1;
    }
  }

  if(attackCount>6){
    let reloader = document.getElementById("reload-con");
    reloader.classList.remove("hidden");

    if(!reloadOnBonusAction){
      if(attackCount===8){
        attackCount=7;
      }
    }

  }else{
    let reloader = document.getElementById("reload-con");
    reloader.classList.add("hidden");
  }

  console.log(attackCount);
  updateSharpHexCount();
  updateNumberOfAttacks();
})

actionSurgeTog.addEventListener("click", e => {
  actionSurgeTog.classList.toggle("off");
  actionSurgeTog.classList.toggle("on");
  actionSurge = !actionSurge;
  if(attackCount===7){
    attackCount=8;
  }

  if(actionSurge){
    attackCount = attackCount*2;
  }
  else{
    attackCount = attackCount/2;
  }

  if(attackCount>6){
    let reloader = document.getElementById("reload-con");
    reloader.classList.remove("hidden");

    if(!reloadOnBonusAction){
      attackCount-=1;
    }
  }else{
    let reloader = document.getElementById("reload-con");
    reloader.classList.add("hidden");
  }

  console.log(attackCount);

  updateSharpHexCount();
  updateNumberOfAttacks();
})

reloadTog.addEventListener("click", e => {
  reloadTog.classList.toggle("off");
  reloadTog.classList.toggle("on");
  reloadOnBonusAction = !reloadOnBonusAction;

  if(reloadOnBonusAction){
    attackCount +=1;
  }else{
    attackCount-=1;
  }

  console.log(attackCount);

  updateSharpHexCount();
  updateNumberOfAttacks();
})

advantageTog.addEventListener("click", e => {
  advantageTog.classList.toggle("off");
  advantageTog.classList.toggle("on");
  advantage = !advantage;
})

gunStackTog0.addEventListener("click", e => {
  if(currentGunStack===0){
    //nothing
  }
  if(currentGunStack===1){
    currentGunStack-=1;
    gunStackTog1.classList.toggle("off");
    gunStackTog1.classList.toggle("on");

    gunStackTog0.classList.toggle("on");
    gunStackTog0.classList.toggle("off");
  }
  if(currentGunStack===2){
    currentGunStack-=2;
    gunStackTog2.classList.toggle("off");
    gunStackTog2.classList.toggle("on");

    gunStackTog0.classList.toggle("on");
    gunStackTog0.classList.toggle("off");
  }
  console.log(currentGunStack);
})
gunStackTog1.addEventListener("click", e => {
  if(currentGunStack===0){
    currentGunStack+=1;
    gunStackTog0.classList.toggle("off");
    gunStackTog0.classList.toggle("on");

    gunStackTog1.classList.toggle("on");
    gunStackTog1.classList.toggle("off");
  }
  if(currentGunStack===1){
    //nothing
  }
  if(currentGunStack===2){
    currentGunStack-=1;
    gunStackTog2.classList.toggle("off");
    gunStackTog2.classList.toggle("on");

    gunStackTog1.classList.toggle("on");
    gunStackTog1.classList.toggle("off");
  }
  console.log(currentGunStack);
})
gunStackTog2.addEventListener("click", e => {
  if(currentGunStack===0){
    currentGunStack+=2;
    gunStackTog0.classList.toggle("off");
    gunStackTog0.classList.toggle("on");

    gunStackTog2.classList.toggle("on");
    gunStackTog2.classList.toggle("off");
  }
  if(currentGunStack===1){
    currentGunStack+=1;
    gunStackTog1.classList.toggle("off");
    gunStackTog1.classList.toggle("on");

    gunStackTog2.classList.toggle("on");
    gunStackTog2.classList.toggle("off");
  }
  if(currentGunStack===2){
    //nothing
  }
  console.log(currentGunStack);
})

//----------------------------------

const updateSharpHexCount = () =>{
  let sharpConn = document.getElementById("sharpCon");
  sharpConn.innerHTML = "";
  let hexConn = document.getElementById("hexCon");
  hexConn.innerHTML = "";
  for(let i = 0; i<attackCount;i++){
      let newToggler1 = document.createElement("div");
      let newToggler2 = document.createElement("div");
      newToggler1.classList.add("togglerBut");
      newToggler2.classList.add("togglerBut");
      if(sharpShooterSavedList[i]===1){
        newToggler1.classList.add("on");
        sharpShooterList[i]=1;
      }else{
        newToggler1.classList.add("off");
        sharpShooterList[i]=0;
      }
    if(hexSavedList[i]===1){
      newToggler2.classList.add("on");
      hexList[i]=1;
    }else{
      newToggler2.classList.add("off");
      hexList[i]=0;
    }
    const container1 = document.getElementById("sharpCon");
    container1.appendChild(newToggler1);
    const container2 = document.getElementById("hexCon");
    container2.appendChild(newToggler2);

    setSharpEventListener(newToggler1, i);
    setHexEventListener(newToggler2, i)
  }
  checkAndChangeSharpBut();
  checkAndChangeHexBut();

};

const updateNumberOfAttacks = () =>{
  let container = document.getElementById("noOfAttacks");
  container.innerText = `${attackCount}`;

}

//-----------several toggle listeners----------------------------

const setSharpEventListener = (toggler, index) =>{
  toggler.addEventListener("click", e => {
    if(sharpShooterList[index]===1){
      sharpShooterSavedList[index]=0;
      sharpShooterList[index]=0;
    }else{
      sharpShooterSavedList[index]=1;
      sharpShooterList[index]=1;
    }
    toggler.classList.toggle("on");
    toggler.classList.toggle("off");
    checkAndChangeSharpBut();
  })
}
const setHexEventListener = (toggler,index) =>{
  toggler.addEventListener("click", e => {
    if(hexList[index]===1){
      hexSavedList[index]=0;
      hexList[index]=0;
    }else{
      hexSavedList[index]=1;
      hexList[index]=1;
    }
    toggler.classList.toggle("on");
    toggler.classList.toggle("off");
    checkAndChangeHexBut();
  })
}

//----------all-sharp-button---------------

const checkAndChangeSharpBut = () =>{
  let OneAllZeroNotAll = 1;
  for(let i = 0; i<attackCount;i++){
    if(sharpShooterList[i]===0){
      OneAllZeroNotAll=0;
    }
  }
  console.log(OneAllZeroNotAll);

  let button = document.getElementById("sharpAllButton");

  if(OneAllZeroNotAll===1){
    //make sharp button active
    if(!button.classList.contains("onButn")){
      button.classList.toggle("onButn");
    }
  }else{
    //make sharp button not active
    if(button.classList.contains("onButn")){
      button.classList.remove("onButn");
    }
  }
}

const allSharpButton = document.getElementById("sharpAllButton");
allSharpButton.addEventListener("click", e => {
    let comp = 0;
    for(let i=0;i<attackCount;i++){
      if(sharpShooterList[i]===1){
        comp++;
      }
    }

    if(comp===attackCount){
      disableAllSharp();
    }else{
      enableAllSharp();
    }
  checkAndChangeSharpBut();
})

const enableAllSharp = () =>{
  const container = document.getElementById("sharpCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(sharpShooterList[i]===0){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      sharpShooterList[i]=1;
      sharpShooterSavedList[i]=1;
    }
  }
}
const disableAllSharp = () =>{
  const container = document.getElementById("sharpCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(sharpShooterList[i]===1){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      sharpShooterList[i]=0;
      sharpShooterSavedList[i]=0;
    }
  }
}

//-----------all-hex-button---------

const checkAndChangeHexBut = () =>{
  let OneAllZeroNotAll = 1;
  for(let i = 0; i<attackCount;i++){
    if(hexList[i]===0){
      OneAllZeroNotAll=0;
    }
  }
  console.log(OneAllZeroNotAll);

  let button = document.getElementById("hexAllButton");

  if(OneAllZeroNotAll===1){
    //make sharp button active
    if(!button.classList.contains("onButn")){
      button.classList.toggle("onButn");
    }
  }else{
    //make sharp button not active
    if(button.classList.contains("onButn")){
      button.classList.remove("onButn");
    }
  }
}

const allHexButton = document.getElementById("hexAllButton");
allHexButton.addEventListener("click", e => {
  let comp = 0;
  for(let i=0;i<attackCount;i++){
    if(hexList[i]===1){
      comp++;
    }
  }

  if(comp===attackCount){
    disableAllHex();
  }else{
    enableAllHex();
  }
  checkAndChangeHexBut();
})

const enableAllHex = () =>{
  const container = document.getElementById("hexCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(hexList[i]===0){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      hexList[i]=1;
      hexSavedList[i]=1;
    }
  }
}
const disableAllHex = () =>{
  const container = document.getElementById("hexCon");
  for(let i = 0;i<attackCount;i++){
    const toggler = container.children[i];
    if(hexList[i]===1){
      toggler.classList.toggle("on");
      toggler.classList.toggle("off");
      hexList[i]=0;
      hexSavedList[i]=0;
    }
  }
}


//--------------------------------------
let addedList = [];

let addbuttons = document.querySelectorAll(".add-die");
addbuttons.forEach((button) => {button.addEventListener("click", (e) => {
  const container = button.parentElement;
  const strID = container.id;
  const number = parseInt(strID, 10)

  addedList.push(number);

})})

function toHitCall(){
  let roll = Math.floor(Math.random()*20)+1;
  return roll+toHitAdd;
}

const calculateSingleAttack = (attackNumber, useSharpShooter, hexed) =>{
    //to hit
    let toHit = toHitCall();
    if(advantage){
      let secondToHit = toHitCall();
      let thirdToHit = toHitCall();
      toHit = Math.max(toHit, secondToHit, thirdToHit);
      console.log(`on attack ${attackNumber+1}, you rolled toHit=${toHit}(${toHit},${secondToHit},${thirdToHit})`);
    }else{
      console.log(`on attack ${attackNumber+1}, you rolled toHit=${toHit}`);
    }
    if(useSharpShooter){
      toHit = toHit-5;
      console.log(`sharpShooter made it ${toHit}`);
    }

    //damage die
    let damageDie = 6;
    if(currentGunStack===1){
      damageDie=8;
    }
    if(currentGunStack===2){
      damageDie=10;
    }
    console.log(`Your damage die is a d${damageDie}`);

    //do damage
    let pierc1 = Math.floor(Math.random()*damageDie)+1;
    let pierc2 = Math.floor(Math.random()*damageDie)+1;
    let piercBonus = proficiencyBonus;
    console.log(`your magical pierc was ${pierc1+pierc2+piercBonus} (${pierc1}+${pierc2}+${piercBonus})`);
    let necro = Math.floor(Math.random()*6)+1;
    console.log(`and necrotic was ${necro} (${necro})`);

    let finalPierc = pierc1+pierc2+piercBonus;
    let hexDmg = Math.floor(Math.random()*6)+1;
    if(hexed){
      necro = necro+hexDmg;
      console.log(`with hex (${hexDmg}), it became ${necro} necrotic`);
    }

    makeRollStats(attackNumber, toHit, necro, finalPierc, false, hexed);
}

const calculateReapersAttack = (attackNumber,useSharpShooter, hexed, amount) =>{
  //to hit
  let firstToHit = toHitCall()+amount;
  let secondToHit = toHitCall()+amount;
  let thirdToHit = toHitCall()+amount;
  let toHit = Math.max(firstToHit, secondToHit, thirdToHit); //added reaper amount
  console.log(`on attack ${attackNumber+1} (reaper), you got toHit=${toHit}(${firstToHit},${secondToHit},${thirdToHit})`);

  if(useSharpShooter){
    toHit = toHit-5;
    console.log(`sharpShooter made it ${toHit}`);
  }

  //damage die
  let damageDie = 6;
  if(currentGunStack===1){
    damageDie=8;
  }
  if(currentGunStack===2){
    damageDie=10;
  }
  console.log(`Your damage die is a d${damageDie}`);

  //do damage
  let pierc1 = Math.floor(Math.random()*damageDie)+1;
  let pierc2 = Math.floor(Math.random()*damageDie)+1;
  let piercBonus = proficiencyBonus;
  console.log(`your magical pierc was ${pierc1+pierc2+piercBonus} (${pierc1}+${pierc2}+${piercBonus})`);
  let necro1 = Math.floor(Math.random()*6)+1;
  let necro2 = Math.floor(Math.random()*8)+1;
  let necro3 = Math.floor(Math.random()*8)+1;
  let finalNecro = necro1+necro2+necro3;
  console.log(`and necrotic was ${finalNecro} (${necro1}+${necro2}+${necro3})`);

  let finalPierc = pierc1+pierc2+piercBonus;
  let hexDmg = Math.floor(Math.random()*6)+1;
  if(hexed){
    finalNecro = finalNecro+hexDmg;
    console.log(`with hex (${hexDmg}), it became ${finalNecro} necrotic`);
  }

  makeRollStats(attackNumber, toHit, finalNecro, finalPierc, true, hexed);
}

let bigRollButton = document.querySelector(".big-roll");
bigRollButton.addEventListener("click", (e) => {
  let resCon = document.getElementById("res-con");
  resCon.innerHTML = "";
  totalGlobal=0;
  necroGlobal=0;
  piercGlobal=0;


  //update reapers blood hp:
  reapersBloodHp = document.getElementById("hp").value;


  for(let i=0;i<attackCount;i++){
    let useSharpShooter = false;
    if(sharpShooterList[i]===1){
      useSharpShooter=true;
    }

    let hexed = false;
    if(hexList[i]===1){
      hexed = true;
    }

    if(reapersBloodHp>0 && i===0){
      let amount = Math.floor(reapersBloodHp/10);
      console.log(`-----------${i+1}-------------`);
      calculateReapersAttack(i, useSharpShooter,hexed,amount);
    }else{
      console.log(`-----------${i+1}-------------`);
      calculateSingleAttack(i, useSharpShooter,hexed);
    }
  }
  console.log(`reapers: ${reapersBloodHp}`);
})

const makeRollStats = (number, toHit, necro, pierc, reaper, hexed) => {
  let rollStatCon = document.createElement("div");
  rollStatCon.classList.add("rollStatContainer");
  const container = document.getElementById("res-con");
  container.appendChild(rollStatCon);

  let rollStatButton = document.createElement("button");
  rollStatButton.classList.add("rollStatButton");

  let rollStatInfo = document.createElement("div");
  rollStatInfo.classList.add("rollStatInfo");

  rollStatCon.appendChild(rollStatButton);
  rollStatCon.appendChild(rollStatInfo);

  rollStatButton.innerText=`${number+1}`;
  if(reaper && hexed){
    rollStatInfo.innerText = `${toHit} to hit. (reaper+hex) |  ${necro+pierc} damage (${necro} necrotic, ${pierc} magical piercing)`;
  } else{
    if(reaper){
      rollStatInfo.innerText = `${toHit} to hit. (reaper) |  ${necro+pierc} damage (${necro} necrotic, ${pierc} magical piercing)`;
    }
    if(hexed){
      rollStatInfo.innerText = `${toHit} to hit. (hex) |  ${necro+pierc} damage (${necro} necrotic, ${pierc} magical piercing)`;
    }
  }
  if(!reaper && !hexed){
    rollStatInfo.innerText = `${toHit} to hit.  |  ${necro+pierc} damage (${necro} necrotic, ${pierc} magical piercing)`;
  }

  //give button eventListener:
  rollStatButton.addEventListener("click", (e)=>{
    buttonStuff(rollStatButton, necro, pierc);
  });
}

//initialize first event listeners
updateSharpHexCount();


//----------adding to total-------------

const makeTotalText = (total, necro, mp) =>{
  const t = document.getElementById("final-result-t");
  const n = document.getElementById("final-result-n");
  const map = document.getElementById("final-result-mp");


  t.innerText = `${totalGlobal} `;
  n.innerText = `(${necroGlobal} necrotic, `;
  map.innerText = `${piercGlobal} magical piercing)`;
}


const buttonStuff = (button, necro, pierc) =>{
  button.classList.toggle("onButton");

  if(button.classList.contains("onButton")){
    totalGlobal += necro+pierc;
    necroGlobal +=necro;
    piercGlobal+=pierc;
    makeTotalText();
  }else{
    totalGlobal -= necro+pierc;
    necroGlobal -=necro;
    piercGlobal-=pierc;
    makeTotalText();
  }
}

