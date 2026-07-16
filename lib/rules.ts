import{AnalysisResult}from"./analyzer";

export interface RuleResult{
scoreK:number;
scoreB:number;
reason:string[];
}

export function applyRules(a:AnalysisResult):RuleResult{

let scoreK=0;
let scoreB=0;

const reason:string[]=[];

if(a.winK>a.winB){
scoreK+=(a.winK-a.winB)*2;
reason.push(`Win K unggul ${a.winK}-${a.winB}`);
}

if(a.winB>a.winK){
scoreB+=(a.winB-a.winK)*2;
reason.push(`Win B unggul ${a.winB}-${a.winK}`);
}

if(a.streakK>=2){
scoreK+=a.streakK*2;
reason.push(`Streak K ${a.streakK}x`);
}

if(a.streakB>=2){
scoreB+=a.streakB*2;
reason.push(`Streak B ${a.streakB}x`);
}

if(a.streakK>=6){
scoreK-=4;
scoreB+=3;
reason.push("Streak K terlalu panjang");
}

if(a.streakB>=6){
scoreB-=4;
scoreK+=3;
reason.push("Streak B terlalu panjang");
}

if(a.last10K>a.last10B){
scoreK+=8;
reason.push("10 game terakhir dominan K");
}

if(a.last10B>a.last10K){
scoreB+=8;
reason.push("10 game terakhir dominan B");
}

if(a.score20K>a.score20B){
scoreK+=4;
reason.push("K sering menang 2-0");
}

if(a.score20B>a.score20K){
scoreB+=4;
reason.push("B sering menang 2-0");
}

if(a.score21K>a.score21B){
scoreK+=2;
}

if(a.score21B>a.score21K){
scoreB+=2;
}

if(a.netSaldo>100000){
scoreK++;
scoreB++;
reason.push("Saldo tinggi");
}

const total=a.winK+a.winB;

if(total>0){

const wk=(a.winK/total)*100;
const wb=(a.winB/total)*100;

if(wk>=65){
scoreK+=6;
reason.push("Momentum K kuat");
}

if(wb>=65){
scoreB+=6;
reason.push("Momentum B kuat");
}

}

return{
scoreK,
scoreB,
reason
};

}
