// index.js - 67ship.com - Full app + API via ENV, NO keys in code
const http = require('http');
const PORT = process.env.PORT || 3000;
// Keys come from Render Environment Variables, NOT from this file.
// In Render: Settings > Environment > Add: CARRIER_API_URL and CARRIER_API_KEY
// Locally: create a file named .env (never commit it) with those same 2 lines.
const CARRIER_API_URL = process.env.CARRIER_API_URL || '';
const CARRIER_API_KEY = process.env.CARRIER_API_KEY || '';
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
.box{max-width:640px;margin:40px auto;border:2px solid #0f172a;border-radius:24px;padding:28px}
label{display:block;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#334155;margin:16px 0 8px}
input,select,textarea{width:100%;height:48px;border:2px solid #0f172a;border-radius:12px;padding:0 14px;font-size:16px;font-weight:600;background:#fff}
textarea{height:120px;padding:12px 14px;font-family:monospace;font-size:13px}
.row{display:flex;gap:10px}
.big-btn{width:100%;height:56px;border:0;border-radius:16px;background:#2563eb;color:#fff;font-size:18px;font-weight:800;cursor:pointer;margin-top:20px}
.small{color:#64748b;font-size:14px;text-align:center;margin-top:14px}
.rate{border:2px solid #e2e8f0;border-radius:16px;padding:16px;margin-top:12px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.rate.pop{border-color:#2563eb;background:#eff6ff}
.ship-row{border:2px solid #e2e8f0;border-radius:16px;padding:16px;margin-top:12px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
pre{background:#0f172a;color:#a7f3d0;border-radius:12px;padding:16px;overflow:auto;font-size:12px;white-space:pre-wrap}
.badge{display:inline-block;background:#dcfce7;color:#166534;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:800}
.badge-off{background:#fee2e2;color:#991b1b}
footer{border-top:1px solid #e2e8f0;padding:32px 0;color:#64748b;text-align:center;font-size:14px}
.hidden{display:none}
@media(max-width:640px){.grid3{grid-template-columns:1fr}.nav{display:none}}
</style>
</head>
<body>
<header><div class="top"><a class="logo" onclick="go('home')"><span class="logo-mark">67</span><span class="logo-word">ship<small>.com</small></span></a><nav class="nav"><a href="#" onclick="go('home');return false" style="text-decoration:none">Home</a><a href="#" onclick="go('ship');return false" style="text-decoration:none">Ship</a><a href="#" onclick="go('api');return false" style="text-decoration:none">API Test</a></nav><span id="topBtns"><button class="btn2" onclick="go('login')">Log In</button> <button class="btn" onclick="go('signup')">Sign Up Free</button></span></div></header>
<main>
<div id="page-home">
<div class="hero"><span class="pill">SIMPLE SHIPPING - BEST DEAL PRICE</span><h1>Cheap shipping,<br><span class="blue">without</span> <span class="orange">the hassle.</span></h1><p style="font-size:19px;color:#475569;line-height:1.6;max-width:640px;margin:0 auto">The lowest / best deal price for your package. Create a free account, buy your label in minutes, drop it off, done.</p><div class="hero-btns"><button class="btn" style="font-size:18px;padding:14px 28px" onclick="go('signup')">Create Free Account →</button><button class="btn2" style="font-size:18px;padding:14px 28px" onclick="go('ship')">Ship a Package</button></div><div class="trust"><span>✓ No hidden fees</span><span>✓ 【entity-UPS¦canonical_name=UPS】 • 【entity-FedEx¦canonical_name=FedEx】 • 【entity-USPS¦canonical_name=USPS】</span><span>✓ Live API rates</span></div></div>
<div class="section"><h2>How it works</h2><p class="sub">Three steps, done in minutes.</p><div class="grid3"><div class="card"><b>1. Create free account</b><p>Name, email, password. No card to start.</p></div><div class="card"><b>2. Enter your package</b><p>From, to, weight, box size. Rates come from the live API.</p></div><div class="card"><b>3. Buy & print label</b><p>Pick 【entity-UPS¦canonical_name=UPS】, 【entity-FedEx¦canonical_name=FedEx】, or 【entity-USPS¦canonical_name=USPS】. Print, stick, drop off.</p></div></div></div>
<div class="section"><div class="dark"><h2 style="margin:0">Ready to ship?</h2><p style="color:#cbd5e1;font-size:18px;line-height:1.6;max-width:500px;margin:12px auto 24px">Create your free account and get your first label in minutes.</p><button class="btn" style="font-size:18px;padding:14px 32px" onclick="go('signup')">Create Free Account →</button></div></div>
</div>
<div id="page-signup" class="hidden"><div class="box"><h2 style="margin:0;font-size:32px">Create free account</h2><p style="color:#475569">Join 67ship in under a minute.</p><label>Full Name</label><input id="suName" placeholder="Your name"><label>Email</label><input id="suEmail" placeholder="you@email.com"><label>Password</label><input id="suPass" type="password" placeholder="Create password"><button class="big-btn" onclick="signup()">Create Free Account →</button><p class="small">Already have an account? <a href="#" onclick="go('login');return false"><b>Log in</b></a></p><p id="suMsg" class="small"></p></div></div>
<div id="page-login" class="hidden"><div class="box"><h2 style="margin:0;font-size:32px">Log in</h2><p style="color:#475569">Welcome back to 67ship.</p><label>Email</label><input id="liEmail" placeholder="you@email.com"><label>Password</label><input id="liPass" type="password" placeholder="Password"><button class="big-btn" onclick="login()">Log In →</button><p class="small">No account? <a href="#" onclick="go('signup');return false"><b>Create free account</b></a></p><p id="liMsg" class="small"></p></div></div>
<div id="page-dash" class="hidden"><div style="max-width:800px;margin:40px auto"><h2 style="font-size:32px;margin:0">Hi, <span id="dashName">there</span> 👋</h2><p style="color:#475569">This is your dashboard.</p><div class="grid3"><div class="card"><b>Ship a package</b><p>Start a new label.</p><button class="btn" style="margin-top:12px" onclick="go('ship')">New Shipment →</button></div><div class="card"><b>Your shipments</b><p id="shipCount">0 shipments yet</p><button class="btn2" style="margin-top:12px" onclick="go('shipments')">View All</button></div><div class="card"><b>API Test</b><p id="apiStatus">Checking server API…</p><button class="btn2" style="margin-top:12px" onclick="go('api')">Test API →</button></div></div></div></div>
<div id="page-ship" class="hidden"><div class="box" style="max-width:720px"><h2 style="margin:0;font-size:32px">Ship a package</h2><p style="color:#475569">Rates come from the live API via the server. <span id="rateSource" class="badge badge-off">Checking…</span></p><div class="row"><div style="flex:1"><label>Ship From ZIP</label><input id="fromZip" value="90210"></div><div style="flex:1"><label>Ship To ZIP</label><input id="toZip" value="10001"></div></div><div class="row"><div style="flex:1"><label>To Name</label><input id="toName" placeholder="Who is it going to?"></div><div style="flex:1"><label>To Address</label><input id="toAddr" placeholder="Street address"></div></div><label>Weight</label><div class="row"><input id="lbs" type="number" value="2" placeholder="lbs"><input id="oz" type="number" value="8" placeholder="oz"></div><label>Box Size (in)</label><div class="row"><input id="len" type="number" value="10"><input id="wid" type="number" value="8"><input id="hei" type="number" value="6"></div><div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:16px;margin-top:20px">Billable: <b id="billable">2.50 lb</b> • Dim: <span id="dim">1.48 lb</span> • Starting at <b id="starting" style="font-size:22px">$5.65</b></div><div id="rateList"></div><button class="big-btn" onclick="showRates()">Get Live Rates →</button></div></div>
<div id="page-shipments" class="hidden"><div style="max-width:800px;margin:40px auto"><h2 style="font-size:32px;margin:0">Your shipments</h2><p style="color:#475569">All your labels in one place.</p><div id="shipList"></div><button class="btn2" style="margin-top:20px" onclick="go('dash')">← Back to Dashboard</button></div></div>
<div id="page-api" class="hidden"><div class="box" style="max-width:720px"><h2 style="margin:0;font-size:32px">API Test</h2><p style="color:#475569">This page does NOT ask for your key. The key lives on the server in Render Environment Variables. This page just asks the server "is the API connected?" and shows the server's answer. No key ever appears in the browser or in index.js.</p><button class="big-btn" onclick="testApi()">Test API On Server →</button><p id="apiMsg" class="small"></p><h3>Response:</h3><pre id="apiOut">Click Test API. Server will use CARRIER_API_URL + CARRIER_API_KEY from its Environment Variables.</pre><p class="small">To set the key: Render > Your Service > Environment > Add CARRIER_API_URL and CARRIER_API_KEY > Save > Redeploy. Your key file you create locally should be named .env and NEVER committed to GitHub.</p></div></div>
</main>
<footer><b style="color:#0f172a">67ship.com</b> — Cheap shipping, without the hassle.<br>Simple, transparent 67ship rates. <a href="#" onclick="go('api');return false">API Test</a></footer>
<script>
let user = JSON.parse(localStorage.getItem('u67')||'null');
let ships = JSON.parse(localStorage.getItem('s67')||'[]');
function go(p){['home','signup','login','dash','ship','shipments','api'].forEach(x=>{let el=document.getElementById('page-'+x); if(el) el.classList.toggle('hidden',x!==p);}); if(p==='dash')renderDash(); if(p==='shipments')renderShips(); if(p==='ship')checkApi(); if(p==='api')checkApi(); window.scrollTo(0,0); updateTop();}
function updateTop(){let b=document.getElementById('topBtns'); if(user){b.innerHTML='<b>'+user.name+'</b> <button class="btn2" onclick="go(\\'dash\\')">Dashboard</button> <button class="btn" onclick="logout()">Log Out</button>';} else {b.innerHTML='<button class="btn2" onclick="go(\\'login\\')">Log In</button> <button class="btn" onclick="go(\\'signup\\')">Sign Up Free</button>';}}
function signup(){let n=document.getElementById('suName').value.trim(),e=document.getElementById('suEmail').value.trim(),p=document.getElementById('suPass').value; if(!n||!e||!p){document.getElementById('suMsg').textContent='Please fill in all 3 fields.';return;} user={name:n,email:e,pass:p}; localStorage.setItem('u67',JSON.stringify(user)); go('dash');}
function login(){let e=document.getElementById('liEmail').value.trim(),p=document.getElementById('liPass').value; if(user && user.email===e && user.pass===p){go('dash');} else if(!user){document.getElementById('liMsg').textContent='No account found. Create a free account first.';} else {document.getElementById('liMsg').textContent='Wrong email or password.';}}
function logout(){user=null; localStorage.removeItem('u67'); go('home');}
function renderDash(){if(!user){go('login');return;} document.getElementById('dashName').textContent=user.name.split(' ')[0]; document.getElementById('shipCount').textContent=ships.length+' shipment'+(ships.length===1?'':'s'); checkApi();}
async function checkApi(){try{let r=await fetch('/api/status'); let j=await r.json(); let src=document.getElementById('rateSource'); let st=document.getElementById('apiStatus'); if(j.configured){if(src){src.textContent='LIVE API CONNECTED (server)'; src.className='badge';} if(st) st.textContent='API connected on server';} else {if(src){src.textContent='DEMO RATES - Set CARRIER_API_KEY in Render Environment'; src.className='badge badge-off';} if(st) st.textContent='No API key on server yet';}}catch(e){}}
function num(id){return parseFloat(document.getElementById(id).value)||0}
function calc(){let a=num('lbs')+num('oz')/16, d=num('len')*num('wid')*num('hei')/139, b=Math.max(a,d,0.1), dist=Math.abs(num('fromZip')-num('toZip'))/1000, f=1+Math.min(dist*0.012,1.25), base=3.85*f+b*0.72; return {a,d,b,base}}
function render(){if(!document.getElementById('billable'))return; let s=calc(); document.getElementById('billable').textContent=s.b.toFixed(2)+' lb'; document.getElementById('dim').textContent=s.d.toFixed(2)+' lb'; document.getElementById('starting').textContent='$'+s.base.toFixed(2);}
['fromZip','toZip','lbs','oz','len','wid','hei'].forEach(id=>{let el=document.getElementById(id); if(el) el.addEventListener('input',render);});
async function showRates(){let s=calc(); let list=document.getElementById('rateList'); list.innerHTML='<p class="small">Asking server for live rates…</p>'; try{let res=await fetch('/api/rates',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({from_zip:document.getElementById('fromZip').value,to_zip:document.getElementById('toZip').value,weight_lbs:s.b,length:num('len'),width:num('wid'),height:num('hei')})}); let data=await res.json(); if(data.demo){showDemoRates(s); return;} let rates=data.rates||[]; if(!rates.length){list.innerHTML='<pre>'+JSON.stringify(data,null,2).slice(0,3000)+'</pre>'; return;} list.innerHTML=rates.map((r)=>{let carrier=r.carrier||'Carrier'; let service=r.service||''; let price=Number(r.price||0); let eta=r.eta||''; return '<div class="rate"><div><b>'+carrier+' - '+service+'</b><div style="color:#475569;font-size:14px">'+eta+'</div></div><div style="text-align:right"><div style="font-size:24px;font-weight:900">$'+price.toFixed(2)+'</div><button class="btn" onclick="buyLabel(0,'+price.toFixed(2)+',\\''+carrier+' '+service+'\\')">Buy Label</button></div></div>';}).join('');}catch(e){showDemoRates(s);}}
function showDemoRates(s){let rates=[{n:'UPS Ground',eta:'2-5 business days',p:s.base,tag:'Lowest price'},{n:'FedEx Priority',eta:'1-3 business days',p:s.base*1.58+2.1,tag:'Best balance',pop:1},{n:'USPS Express',eta:'1-2 business days',p:s.base*2.35+4.2,tag:'Fastest'}]; document.getElementById('rateList').innerHTML=rates.map((r,i)=>'<div class="rate '+(r.pop?'pop':'')+'"><div><b>'+r.n+'</b><div style="color:#475569;font-size:14px">'+r.eta+' • '+r.tag+' • DEMO</div></div><div style="text-align:right"><div style="font-size:24px;font-weight:900">$'+r.p.toFixed(2)+'</div><button class="btn" onclick="buyLabel('+i+','+r.p.toFixed(2)+',\\''+r.n+'\\')">Buy Label</button></div></div>').join('');}
function buyLabel(i,price,name){let to=document.getElementById('toName').value||'Package'; ships.unshift({to:to,service:name,price:price,date:new Date().toLocaleDateString()}); localStorage.setItem('s67',JSON.stringify(ships)); alert('Label (demo) - '+name+' - $'+price.toFixed(2)+' for '+to); go('shipments');}
function renderShips(){let el=document.getElementById('shipList'); if(!ships.length){el.innerHTML='<div class="card">No shipments yet.</div>'; return;} el.innerHTML=ships.map(s=>'<div class="ship-row"><div><b>'+s.to+'</b><div style="color:#475569">'+s.service+' • '+s.date+'</div></div><b>$'+Number(s.price).toFixed(2)+'</b></div>').join('');}
async function testApi(){let out=document.getElementById('apiOut'); out.textContent='Asking server…'; try{let r=await fetch('/api/status'); let j=await r.json(); out.textContent=JSON.stringify(j,null,2);}catch(e){out.textContent='ERROR: '+e.message;}}
updateTop(); render(); checkApi();
</script>
</body>
</html>`;
const server = http.createServer(async (req, res) => {
  if (req.url === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ configured: !!(CARRIER_API_URL && CARRIER_API_KEY), has_url: !!CARRIER_API_URL, has_key: !!CARRIER_API_KEY, note: 'Key is on server only, never sent to browser' }));
    return;
  }
  if (req.url === '/api/rates' && req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      if (!CARRIER_API_URL || !CARRIER_API_KEY) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ demo: true, reason: 'No CARRIER_API_KEY on server' }));
        return;
      }
      try {
        // FIXED per official WARP docs you pasted: header is "apikey" - no underscore
        // We send all 3 forms so it works even if Swagger says api_key
        const incoming = JSON.parse(body || '{}');
        const warpBody = JSON.stringify({
          pickupDate: new Date().toISOString().slice(0,10),
          pickupInfo: { zipcode: String(incoming.from_zip || '') },
          deliveryInfo: { zipcode: String(incoming.to_zip || '') },
          listItems: [{
            height: Number(incoming.height || 6),
            length: Number(incoming.length || 10),
            width: Number(incoming.width || 8),
            sizeUnit: 'IN',
            totalWeight: Number(incoming.weight_lbs || 2),
            weightUnit: 'lbs',
            quantity: 1
          }]
        });
        const r = await fetch(CARRIER_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'apikey': CARRIER_API_KEY, 'api_key': CARRIER_API_KEY, 'x-api-key': CARRIER_API_KEY }, body: warpBody });
        const txt = await r.text();
        let parsed = {};
        try { parsed = JSON.parse(txt); } catch(e) {}
        let options = parsed.options || parsed.quotes || [];
        let rates = options.map(o => ({
          carrier: o.carrierName || o.carrierCode || 'Carrier',
          service: o.serviceLevel || o.shipmentType || 'Standard',
          price: Number(o.rate || o.price?.amount || 0),
          eta: o.transitTime ? o.transitTime + ' days' : ''
        }));
        if (!rates.length && parsed.price) {
          rates = [{ carrier: 'WARP', service: parsed.shipmentType || 'Freight Quote', price: Number(parsed.price.amount || parsed.price || 0), eta: '' }];
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (rates.length) {
          res.end(JSON.stringify({ rates: rates, raw: parsed }));
        } else {
          res.end(JSON.stringify(parsed));
        }
      } catch (e) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ demo: true, error: e.message }));
      }
    });
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});
server.listen(PORT, () => {
  console.log('67ship running on port ' + PORT);
});