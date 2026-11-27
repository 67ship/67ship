// index.js - 67ship.com - Full Pirate Ship style app - WARP only
const http = require('http');
const PORT = process.env.PORT || 3000;
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>67ship.com - Cheap shipping, without the hassle.</title>
<style>
*{box-sizing:border-box} body{margin:0;font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#fff;color:#0f172a}
a{color:inherit}
header{border-bottom:1px solid #e2e8f0;background:#fff;position:sticky;top:0;z-index:30}
.top{max-width:1100px;margin:auto;display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:72px}
.logo{display:flex;align-items:center;gap:6px;text-decoration:none;cursor:pointer}
.logo-mark{width:48px;height:40px;background:#f97316;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:13px;font-weight:900;font-size:22px;box-shadow:0 2px 0 #0f172a}
.logo-word{font-weight:900;font-size:29px;color:#2563eb;letter-spacing:-2px}.logo-word small{font-size:13px;color:#64748b}
.nav{display:flex;gap:20px;font-weight:600;color:#475569;font-size:15px}
.btn{background:#2563eb;color:#fff;padding:10px 18px;border-radius:999px;font-weight:700;text-decoration:none;border:0;cursor:pointer}
.btn2{border:2px solid #0f172a;color:#0f172a;padding:9px 16px;border-radius:999px;font-weight:700;text-decoration:none;background:#fff;cursor:pointer}
main{max-width:1100px;margin:auto;padding:0 16px}
.hero{text-align:center;max-width:800px;margin:48px auto 0}
.hero h1{font-size:clamp(44px,7vw,76px);line-height:.94;letter-spacing:-3px;margin:16px 0}
.hero h1 .blue{color:#2563eb}.hero h1 .orange{color:#f97316}
.pill{display:inline-flex;gap:8px;border:2px solid #0f172a;background:#fff7ed;padding:6px 14px;border-radius:999px;font-weight:700;font-size:13px}
.hero-btns{display:flex;gap:12px;justify-content:center;margin-top:28px;flex-wrap:wrap}
.trust{display:flex;gap:24px;justify-content:center;margin-top:28px;color:#64748b;font-weight:600;font-size:14px;flex-wrap:wrap}
.section{padding:48px 0;border-top:1px solid #f1f5f9}
.section h2{font-size:34px;letter-spacing:-1.5px;margin:0 0 8px;text-align:center}
.sub{text-align:center;color:#475569;font-size:17px;max-width:600px;margin:0 auto 28px;line-height:1.6}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.card{border:2px solid #e2e8f0;border-radius:20px;padding:24px;background:#fff}
.card b{font-size:19px}
.card p{color:#475569;line-height:1.6;margin:8px 0 0}
.dark{background:#0f172a;color:#fff;border-radius:24px;padding:36px 24px;text-align:center}
.box{max-width:560px;margin:40px auto;border:2px solid #0f172a;border-radius:24px;padding:28px}
label{display:block;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#334155;margin:16px 0 8px}
input,select{width:100%;height:48px;border:2px solid #0f172a;border-radius:12px;padding:0 14px;font-size:16px;font-weight:600;background:#fff}
.row{display:flex;gap:10px}
.big-btn{width:100%;height:56px;border:0;border-radius:16px;background:#2563eb;color:#fff;font-size:18px;font-weight:800;cursor:pointer;margin-top:20px}
.small{color:#64748b;font-size:14px;text-align:center;margin-top:14px}
.rate{border:2px solid #e2e8f0;border-radius:16px;padding:16px;margin-top:12px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.rate.pop{border-color:#2563eb;background:#eff6ff}
.ship-row{border:2px solid #e2e8f0;border-radius:16px;padding:16px;margin-top:12px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
footer{border-top:1px solid #e2e8f0;padding:32px 0;color:#64748b;text-align:center;font-size:14px}
.hidden{display:none}
@media(max-width:640px){.grid3{grid-template-columns:1fr}.nav{display:none}}
</style>
</head>
<body>
<header><div class="top"><a class="logo" onclick="go('home')"><span class="logo-mark">67</span><span class="logo-word">ship<small>.com</small></span></a><nav class="nav" id="topNav"><a href="#" onclick="go('home');return false" style="text-decoration:none">Home</a><a href="#" onclick="go('how');return false" style="text-decoration:none">How it works</a><a href="#" onclick="go('services');return false" style="text-decoration:none">Services</a><a href="#" onclick="go('faq');return false" style="text-decoration:none">FAQ</a></nav><span id="topBtns"><button class="btn2" onclick="go('login')">Log In</button> <button class="btn" onclick="go('signup')">Sign Up Free</button></span></div></header>
<main>
<div id="page-home">
<div class="hero"><span class="pill">WARP RATES - SIMPLE SHIPPING</span><h1>Cheap shipping,<br><span class="blue">without</span> <span class="orange">the hassle.</span></h1><p style="font-size:19px;color:#475569;line-height:1.6;max-width:640px;margin:0 auto">The lowest / best deal price for your package. Create a free account, buy your label in minutes, drop it off, done.</p><div class="hero-btns"><button class="btn" style="font-size:18px;padding:14px 28px" onclick="go('signup')">Create Free Account →</button><button class="btn2" style="font-size:18px;padding:14px 28px" onclick="go('ship')">Ship a Package</button></div><div class="trust"><span>✓ No hidden fees</span><span>✓ WARP only</span><span>✓ Live price update</span></div></div>
<div class="section" id="how"><h2>How it works</h2><p class="sub">Three steps, done in minutes.</p><div class="grid3"><div class="card"><b>1. Create free account</b><p>Name, email, password. No card to start.</p></div><div class="card"><b>2. Enter your package</b><p>From, to, weight, box size. Watch the price change live.</p></div><div class="card"><b>3. Buy & print label</b><p>Pick Ground, Priority, or Express. Print, stick, drop off.</p></div></div></div>
<div class="section" id="services"><h2>Services</h2><p class="sub">Simple, transparent WARP rates.</p><div class="grid3"><div class="card"><b>WARP Ground</b><p>2-5 business days. Lowest price.</p></div><div class="card" style="border-color:#2563eb;background:#eff6ff"><b>WARP Priority</b><p>1-3 business days. Best balance.</p></div><div class="card"><b>WARP Express</b><p>1-2 business days. Fastest.</p></div></div></div>
<div class="section"><div class="dark"><h2 style="margin:0">Ready to ship?</h2><p style="color:#cbd5e1;font-size:18px;line-height:1.6;max-width:500px;margin:12px auto 24px">Create your free account and get your first label in minutes.</p><button class="btn" style="font-size:18px;padding:14px 32px" onclick="go('signup')">Create Free Account →</button></div></div>
<div class="section" id="faq"><h2>FAQ</h2><p class="sub">Quick answers.</p><div style="max-width:700px;margin:0 auto"><div class="card" style="margin-bottom:12px"><b>Do I need a card to sign up?</b><p>No. Free account to start.</p></div><div class="card" style="margin-bottom:12px"><b>Do I need a printer?</b><p>Yes, to print your WARP label.</p></div><div class="card"><b>Is there a membership?</b><p>Ship as a guest, or join for lower pricing.</p></div></div></div>
</div>

<div id="page-signup" class="hidden"><div class="box"><h2 style="margin:0;font-size:32px">Create free account</h2><p style="color:#475569">Join 67ship in under a minute.</p><label>Full Name</label><input id="suName" placeholder="Wesley Claggett"><label>Email</label><input id="suEmail" placeholder="you@email.com"><label>Password</label><input id="suPass" type="password" placeholder="Create password"><button class="big-btn" onclick="signup()">Create Free Account →</button><p class="small">Already have an account? <a href="#" onclick="go('login');return false"><b>Log in</b></a></p><p id="suMsg" class="small"></p></div></div>

<div id="page-login" class="hidden"><div class="box"><h2 style="margin:0;font-size:32px">Log in</h2><p style="color:#475569">Welcome back to 67ship.</p><label>Email</label><input id="liEmail" placeholder="you@email.com"><label>Password</label><input id="liPass" type="password" placeholder="Password"><button class="big-btn" onclick="login()">Log In →</button><p class="small">No account? <a href="#" onclick="go('signup');return false"><b>Create free account</b></a></p><p id="liMsg" class="small"></p></div></div>

<div id="page-dash" class="hidden"><div style="max-width:800px;margin:40px auto"><h2 style="font-size:32px;margin:0">Hi, <span id="dashName">there</span> 👋</h2><p style="color:#475569">This is your dashboard.</p><div class="grid3"><div class="card"><b>Ship a package</b><p>Start a new label.</p><button class="btn" style="margin-top:12px" onclick="go('ship')">New Shipment →</button></div><div class="card"><b>Your shipments</b><p id="shipCount">0 shipments yet</p><button class="btn2" style="margin-top:12px" onclick="go('shipments')">View All</button></div><div class="card"><b>Account</b><p id="dashEmail">—</p><button class="btn2" style="margin-top:12px" onclick="logout()">Log Out</button></div></div></div></div>

<div id="page-ship" class="hidden"><div class="box" style="max-width:720px"><h2 style="margin:0;font-size:32px">Ship a package</h2><p style="color:#475569">Watch the price change live.</p><div class="row"><div style="flex:1"><label>Ship From ZIP</label><input id="fromZip" value="90210"></div><div style="flex:1"><label>Ship To ZIP</label><input id="toZip" value="10001"></div></div><div class="row"><div style="flex:1"><label>To Name</label><input id="toName" placeholder="Who is it going to?"></div><div style="flex:1"><label>To Address</label><input id="toAddr" placeholder="Street address"></div></div><label>Weight</label><div class="row"><input id="lbs" type="number" value="2" placeholder="lbs"><input id="oz" type="number" value="8" placeholder="oz"></div><label>Box Size (in)</label><div class="row"><input id="len" type="number" value="10"><input id="wid" type="number" value="8"><input id="hei" type="number" value="6"></div><div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:16px;margin-top:20px">Billable: <b id="billable">2.50 lb</b> • Dim: <span id="dim">1.48 lb</span> • Starting at <b id="starting" style="font-size:22px">$5.65</b></div><div id="rateList"></div><button class="big-btn" onclick="showRates()">Get Rates →</button></div></div>

<div id="page-shipments" class="hidden"><div style="max-width:800px;margin:40px auto"><h2 style="font-size:32px;margin:0">Your shipments</h2><p style="color:#475569">All your labels in one place.</p><div id="shipList"></div><button class="btn2" style="margin-top:20px" onclick="go('dash')">← Back to Dashboard</button></div></div>
</main>
<footer><b style="color:#0f172a">67ship.com</b> — Cheap shipping, without the hassle.<br>WARP only. Simple, transparent rates.</footer>
<script>
let user = JSON.parse(localStorage.getItem('u67')||'null');
let ships = JSON.parse(localStorage.getItem('s67')||'[]');
function go(p){['home','signup','login','dash','ship','shipments'].forEach(x=>document.getElementById('page-'+x).classList.toggle('hidden',x!==p)); if(p==='dash')renderDash(); if(p==='shipments')renderShips(); if(p==='ship')render(); window.scrollTo(0,0); updateTop();}
function updateTop(){let b=document.getElementById('topBtns'); if(user){b.innerHTML='<b>'+user.name+'</b> <button class="btn2" onclick="go(\\'dash\\')">Dashboard</button> <button class="btn" onclick="logout()">Log Out</button>';} else {b.innerHTML='<button class="btn2" onclick="go(\\'login\\')">Log In</button> <button class="btn" onclick="go(\\'signup\\')">Sign Up Free</button>';}}
function signup(){let n=document.getElementById('suName').value.trim(),e=document.getElementById('suEmail').value.trim(),p=document.getElementById('suPass').value; if(!n||!e||!p){document.getElementById('suMsg').textContent='Please fill in all 3 fields.';return;} user={name:n,email:e,pass:p}; localStorage.setItem('u67',JSON.stringify(user)); go('dash');}
function login(){let e=document.getElementById('liEmail').value.trim(),p=document.getElementById('liPass').value; if(user && user.email===e && user.pass===p){go('dash');} else if(!user){document.getElementById('liMsg').textContent='No account found with that email. Create a free account first.';} else {document.getElementById('liMsg').textContent='Wrong email or password.';}}
function logout(){user=null; localStorage.removeItem('u67'); go('home');}
function renderDash(){if(!user){go('login');return;} document.getElementById('dashName').textContent=user.name.split(' ')[0]; document.getElementById('dashEmail').textContent=user.email; document.getElementById('shipCount').textContent=ships.length+' shipment'+(ships.length===1?'':'s');}
function num(id){return parseFloat(document.getElementById(id).value)||0}
function calc(){let a=num('lbs')+num('oz')/16, d=num('len')*num('wid')*num('hei')/139, b=Math.max(a,d,0.1), dist=Math.abs(num('fromZip')-num('toZip'))/1000, f=1+Math.min(dist*0.012,1.25), base=3.85*f+b*0.72; return {a,d,b,base}}
function render(){if(!document.getElementById('billable'))return; let s=calc(); document.getElementById('billable').textContent=s.b.toFixed(2)+' lb'; document.getElementById('dim').textContent=s.d.toFixed(2)+' lb'; document.getElementById('starting').textContent='$'+s.base.toFixed(2);}
['fromZip','toZip','lbs','oz','len','wid','hei'].forEach(id=>{let el=document.getElementById(id); if(el) el.addEventListener('input',render);});
function showRates(){let s=calc(); let rates=[{n:'WARP Ground',eta:'2-5 business days',p:s.base,tag:'Lowest price'},{n:'WARP Priority',eta:'1-3 business days',p:s.base*1.58+2.1,tag:'Best balance',pop:1},{n:'WARP Express',eta:'1-2 business days',p:s.base*2.35+4.2,tag:'Fastest'}]; document.getElementById('rateList').innerHTML=rates.map((r,i)=>'<div class="rate '+(r.pop?'pop':'')+'"><div><b>'+r.n+'</b><div style="color:#475569;font-size:14px">'+r.eta+' • '+r.tag+'</div></div><div style="text-align:right"><div style="font-size:24px;font-weight:900">$'+r.p.toFixed(2)+'</div><button class="btn" onclick="buyLabel('+i+','+r.p.toFixed(2)+',\\''+r.n+'\\')">Buy Label</button></div></div>').join('');}
function buyLabel(i,price,name){let to=document.getElementById('toName').value||'Package'; ships.unshift({to:to,service:name,price:price,date:new Date().toLocaleDateString()}); localStorage.setItem('s67',JSON.stringify(ships)); alert('Label purchased! '+name+' - $'+price.toFixed(2)+' for '+to+'. (Demo - connect WARP to print real label)'); go('shipments');}
function renderShips(){let el=document.getElementById('shipList'); if(!ships.length){el.innerHTML='<div class="card">No shipments yet. <b>Ship your first package →</b></div>'; return;} el.innerHTML=ships.map(s=>'<div class="ship-row"><div><b>'+s.to+'</b><div style="color:#475569">'+s.service+' • '+s.date+'</div></div><b>$'+Number(s.price).toFixed(2)+'</b></div>').join('');}
updateTop(); render();
</script>
</body>
</html>`;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});
server.listen(PORT, () => {
  console.log('67ship running on port ' + PORT);
});
