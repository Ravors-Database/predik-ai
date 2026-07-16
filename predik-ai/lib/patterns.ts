import{AnalysisResult}from"./analyzer";

export interface PatternResult{
id:number;
name:string;
weightK:number;
weightB:number;
reason:string;
}

export function detectPatterns(a:AnalysisResult):PatternResult[]{

const p:PatternResult[]=[];

if(a.last5K>=4){
p.push({
id:1,
name:"HOT_K",
weightK:8,
weightB:0,
reason:"K sangat dominan pada 5 game terakhir"
});
}

if(a.last5B>=4){
p.push({
id:2,
name:"HOT_B",
weightK:0,
weightB:8,
reason:"B sangat dominan pada 5 game terakhir"
});
}

if(a.last10K>=7){
p.push({
id:3,
name:"K_MOMENTUM",
weightK:10,
weightB:0,
reason:"Momentum K kuat"
});
}

if(a.last10B>=7){
p.push({
id:4,
name:"B_MOMENTUM",
weightK:0,
weightB:10,
reason:"Momentum B kuat"
});
}

if(a.streakK>=5){
p.push({
id:5,
name:"K_STREAK",
weightK:-3,
weightB:4,
reason:"Streak K terlalu panjang"
});
}

if(a.streakB>=5){
p.push({
id:6,
name:"B_STREAK",
weightK:4,
weightB:-3,
reason:"Streak B terlalu panjang"
});
}

if(a.winRateK>=65){
p.push({
id:7,
name:"K_WINRATE",
weightK:6,
weightB:0,
reason:"Winrate K tinggi"
});
}

if(a.winRateB>=65){
p.push({
id:8,
name:"B_WINRATE",
weightK:0,
weightB:6,
reason:"Winrate B tinggi"
});
}

if(a.score20K>a.score20B+3){
p.push({
id:9,
name:"K_STRONG",
weightK:3,
weightB:0,
reason:"K sering menang 2-0"
});
}

if(a.score20B>a.score20K+3){
p.push({
id:10,
name:"B_STRONG",
weightK:0,
weightB:3,
reason:"B sering menang 2-0"
});
}

return p;

}