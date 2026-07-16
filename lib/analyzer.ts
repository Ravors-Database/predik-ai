import{ParsedLW}from"./parser";

export interface AnalysisResult{
totalGames:number;
winK:number;
winB:number;
score20K:number;
score21K:number;
score20B:number;
score21B:number;
streakK:number;
streakB:number;
last5K:number;
last5B:number;
last10K:number;
last10B:number;
last20K:number;
last20B:number;
winRateK:number;
winRateB:number;
switches:number;
totalAmount:number;
averageAmount:number;
netSaldo:number;
}

export function analyze(data:ParsedLW):AnalysisResult{

let winK=0;
let winB=0;

let score20K=0;
let score21K=0;

let score20B=0;
let score21B=0;

let totalAmount=0;

for(const game of data.games){

totalAmount+=game.amount;

if(game.side==="K"){

winK++;

if(game.score==="2-0")score20K++;
else score21K++;

}else{

winB++;

if(game.score==="2-0")score20B++;
else score21B++;

}

}

let streakK=0;
let streakB=0;

for(let i=data.games.length-1;i>=0;i--){

const g=data.games[i];

if(g.side==="K"){

if(streakB>0)break;

streakK++;

}else{

if(streakK>0)break;

streakB++;

}

}

const last5=data.games.slice(-5);
const last10=data.games.slice(-10);
const last20=data.games.slice(-20);

let last5K=0;
let last5B=0;

let last10K=0;
let last10B=0;

let last20K=0;
let last20B=0;

for(const g of last5){

if(g.side==="K")last5K++;
else last5B++;

}

for(const g of last10){

if(g.side==="K")last10K++;
else last10B++;

}

for(const g of last20){

if(g.side==="K")last20K++;
else last20B++;

}

let switches=0;

for(let i=1;i<data.games.length;i++){

if(data.games[i].side!==data.games[i-1].side)
switches++;

}

const totalGames=data.games.length;

const winRateK=totalGames?Number(((winK/totalGames)*100).toFixed(1)):0;

const winRateB=totalGames?Number(((winB/totalGames)*100).toFixed(1)):0;

return{

totalGames,

winK,
winB,

score20K,
score21K,

score20B,
score21B,

streakK,
streakB,

last5K,
last5B,

last10K,
last10B,

last20K,
last20B,

winRateK,
winRateB,

switches,

totalAmount,

averageAmount:totalGames?Math.round(totalAmount/totalGames):0,

netSaldo:data.saldo-data.debt

};

}
