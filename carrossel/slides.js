const H=+(process.env.H||1350),PFX=process.env.PFX||'slide';
const slides = [
 {k:'cover', t:'A tua cabeça pode pesar <b>6 vezes mais</b>', s:'…só pela forma como olhas para o telemóvel 📱', n:'Desliza →'},
 {k:'text', h:'Sabias que…', t:'Uma cabeça adulta pesa entre <b>4,5 e 5,5 kg</b>.', s:'Com o pescoço direito, a coluna aguenta bem esse peso.'},
 {k:'chart', h:'Mas quando inclinas a cabeça…'},
 {k:'text', h:'O "pescoço de telemóvel"', t:'Passamos em média <b>2 a 4 horas por dia</b> de cabeça baixa.', s:'São centenas de horas por ano de esforço extra no pescoço.'},
 {k:'list', h:'Sinais de alerta', items:['Dor e rigidez no pescoço','Dores de cabeça frequentes','Dor nos ombros e costas','Formigueiro nos braços','Má postura (ombros "caídos")']},
 {k:'list', h:'Como proteger o pescoço', items:['Sobe o telemóvel à altura dos olhos','Mexe os olhos, não a cabeça','Faz pausas a cada 20–30 min','Alonga pescoço e ombros','Usa suporte para ler ou ver vídeos']},
 {k:'ex', h:'Exercício de 1 minuto', items:['Senta-te direito, ombros relaxados','Leva o queixo para trás ("queixo duplo")','Segura 5 segundos','Repete 10 vezes']},
 {k:'end', t:'Levanta a cabeça! 🙌', s:'Guarda este post e partilha com quem passa o dia no telemóvel.<br><br>Marque a sua consulta: <b>210 537 073</b>', n:'Em caso de dor persistente, consulta um médico.'},
];
const angles=[[0,5],[15,12],[30,18],[45,22],[60,27]];
const css=`*{margin:0;box-sizing:border-box}body{width:1080px;height:${H}px;font-family:'Poppins',sans-serif;background:#0f2a3d;color:#fff;overflow:hidden}
.slide{width:1080px;height:${H}px;padding:110px 90px;display:flex;flex-direction:column;justify-content:center;position:relative;background:radial-gradient(circle at 80% 0%,#1f6fb5 0%,transparent 55%),linear-gradient(160deg,#0a3a6e 0%,#062a52 100%)}
.slide.alt{background:radial-gradient(circle at 10% 100%,#2aa7c9 0%,transparent 50%),linear-gradient(200deg,#0d4c8c 0%,#08386b 100%)}
h1{font-size:104px;line-height:1.05;font-weight:800}h2{font-size:64px;line-height:1.1;font-weight:800;margin-bottom:50px;color:#f7941d}
b{color:#f7941d}p.t{font-size:62px;font-weight:700;line-height:1.2}p.s{font-size:40px;margin-top:40px;opacity:.85;line-height:1.35}
.n{position:absolute;bottom:150px;right:90px;font-size:36px;font-weight:600;opacity:.8}.pg{position:absolute;top:70px;right:90px;font-size:30px;opacity:.6;font-weight:600}
.tag{position:absolute;top:70px;left:90px;font-size:30px;font-weight:700;letter-spacing:3px;opacity:.6}
ul{list-style:none}li{font-size:46px;font-weight:600;padding:26px 0 26px 80px;position:relative;border-bottom:2px solid rgba(255,255,255,.15)}
li:before{content:'✓';position:absolute;left:0;color:#f7941d;font-weight:800}
ol li{counter-increment:c}ol{list-style:none;counter-reset:c}ol li:before{content:counter(c)}
.bar{display:flex;align-items:center;margin:22px 0}.bar .a{width:150px;font-size:44px;font-weight:700}.bar .r{height:90px;background:#f7941d;border-radius:14px;display:flex;align-items:center;justify-content:flex-end;padding-right:24px;font-size:42px;font-weight:800;color:#062a52}
.src{font-size:26px;opacity:.6;margin-top:40px}.big{font-size:180px}
.ft{position:absolute;left:90px;right:90px;bottom:50px;display:flex;justify-content:space-between;align-items:center;border-top:2px solid rgba(255,255,255,.2);padding-top:24px;font-size:28px;font-weight:600}
.logo{font-size:40px;font-weight:800;letter-spacing:-1px}.logo span{color:#f7941d}`;
const html=(sl,i)=>{let b='';const ft=`<div class="ft"><img src="${WORD}" style="height:46px"><div>📞 210 537 073 &nbsp;·&nbsp; Licença ERS n.º 19036</div></div>`;const pg=`<div class="tag">SAÚDE</div><div class="pg">${i+1}/${slides.length}</div>`;
 if(sl.k=='cover')b=`<img src="${LOGO}" style="width:330px;margin-bottom:70px"><h1>${sl.t}</h1><p class="s">${sl.s}</p><div class="n">${sl.n}</div>`;
 else if(sl.k=='text')b=`<h2>${sl.h}</h2><p class="t">${sl.t}</p><p class="s">${sl.s}</p>`;
 else if(sl.k=='chart')b=`<h2>${sl.h}</h2>`+angles.map(([a,k])=>`<div class="bar"><div class="a">${a}°</div><div class="r" style="width:${k*26}px">${k} kg</div></div>`).join('')+`<p class="s">A 60°, o pescoço suporta cerca de <b>27 kg</b> – o peso de uma criança de 8 anos.</p><p class="src">Fonte: Hansraj, K. (2014), Surgical Technology International</p>`;
 else if(sl.k=='list')b=`<h2>${sl.h}</h2><ul>${sl.items.map(x=>`<li>${x}</li>`).join('')}</ul>`;
 else if(sl.k=='ex')b=`<h2>${sl.h}</h2><ol>${sl.items.map(x=>`<li>${x}</li>`).join('')}</ol>`;
 else b=`<img src="${LOGO}" style="width:420px;margin-bottom:70px"><h1>${sl.t}</h1><p class="s">${sl.s}</p><p class="src" style="font-size:32px;margin-top:60px">${sl.n}</p>`;
 const alt=(i%2==1)?' alt':'';
 return `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet"><style>${css}</style></head><body><div class="slide${alt}">${pg}${b}${ft}</div></body></html>`;};
const fs=require('fs');const img=f=>'data:image/png;base64,'+fs.readFileSync(__dirname+'/logo/'+f).toString('base64');const LOGO=img('paincare-logo.png'),WORD=img('palavra.png');
const {chromium}=require('playwright');
(async()=>{const br=await chromium.launch();const p=await br.newPage({viewport:{width:1080,height:H}});
for(let i=0;i<slides.length;i++){await p.setContent(html(slides[i],i),{waitUntil:'networkidle'}).catch(()=>{});await p.waitForTimeout(300);await p.screenshot({path:`${PFX}-${i+1}.png`});}
await br.close();})();
