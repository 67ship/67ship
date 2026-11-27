// index.js - 67ship.com - Render + 【entity-GitHub¦canonical_name=GitHub】 version - WARP only, no EasyPost
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
header{border-bottom:1px solid #e2e8f0;background:rgba(255,255,255,.95);position:sticky;top:0;z-index:30}
.top{max-width:1100px;margin:auto;display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:72px}
.logo{display:flex;align-items:center;gap:6px;text-decoration:none}
.logo-mark{width:48px;height:40px;background:#f97316;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:13px;font-weight:900;font-size:22px;box-shadow:0 2px 0 #0f172a}
.logo-word{font-weight:900;font-size:29px;color:#2563eb;letter-spacing:-2px}.logo-word small{font-size:13px;color:#64748b}
.btn{background:#2563eb;color:#fff;padding:10px 18px;border-radius:999px;font-weight:700;text-decoration:none}
main{max-width:1100px;margin:auto;padding:40px 16px}
.hero{text-align:center;max-width:700px;margin:auto}
.hero h1{font-size:clamp(40px,7vw,72px);line-height:.94;letter-spacing:-3px;margin:16px 0}
.hero h1 .blue{color:#2563eb}.hero h1 .orange{color:#f97316}
.pill{display:inline-flex;gap:8px;border:2px solid #0f172a;background:#fff7ed;padding:6px 14px;border-radius:999px;font-weight:700;font-size:13px}
.card{max-width:920px;margin:36px auto 0;border:2px solid #0f172a;border-radius:24px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,.12)}
.card-head{background:#0f172a;color:#fff;display:flex;justify-content:space-between;align-items:center;padding:16px 24px}
.card-body{padding:24px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
label{display:block;text-align:left;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#334155;margin-bottom:8px}
input{width:100%;height:48px;border:2px solid #0f172a;border-radius:12px;padding:0 14px;font-size:16px;font-weight:600}
.row{display:flex;gap:8px;align-items:center}
.price-box{margin-top:20px;display:flex;justify-content:space-between;align-items:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:16px}
.big-btn{margin-top:20px;width:100%;height:56px;border:0;border-radius:16px;background:#2563eb;color:#fff;font-size:18px;font-weight:800;cursor:pointer;box-shadow:0 6px 0 #1d4ed8}
.big-btn:active{transform:translateY(2px);box-shadow:none}
.rates{display:none;margin-top:24px;border-top:2px dashed #e2e8f0;padding-top:20px}
.rate-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.rate{border:2px solid #e2e8f0;border-radius:16px;padding:16px}
.rate.pop{border-color:#2563eb;background:#eff6ff}
.rate button{width:100%;height:40px;border-radius:12px;font-weight:700;cursor:pointer}
.note{text-align:center;color:#64748b;font-size:14px;margin-top:16px}
@media(max-width:640px){.grid,.rate-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<header><div class="top"><a class="logo" href="#top"><span class="logo-mark">67</span><span class="logo-word">ship<small>.com</small></span></a><a class="btn" href="#rates">Sign Up</a></div></header>
<main id="top"><div class="hero"><span class="pill">WARP RATES - SIMPLE SHIPPING</span><h1>Cheap shipping,<br><span class="blue">without</span> <span class="orange">the hassle.</span></h1><p style="font-size:18px;color:#475569;line-height:1.6">Find the <b style="color:#0f172a">Lowest / Best Deal Price</b> for your package. Compare live WARP rates, buy your label, and drop it off - done.</p></div>
<div class="card" id="rates"><div class="card-head"><b>Get an instant rate</b><span>● LIVE PRICE</span></div><div class="card-body">
<div class="grid"><div><label>Ship From</label><input id="fromZip" value="90210" inputmode="numeric" placeholder="ZIP code"></div><div><label>Ship To</label><input id="toZip" value="10001" inputmode="numeric" placeholder="ZIP code"></div>
<div><label>Weight</label><div class="row"><input id="lbs" type="number" value="2" placeholder="lbs"><input id="oz" type="number" value="8" placeholder="oz"></div></div>
<div><label>Box Size</label><div class="row"><input id="len" type="number" value="10"><span>x</span><input id="wid" type="number" value="8"><span>x</span><input id="hei" type="number" value="6"><span>in</span></div></div></div>
<div class="price-box"><div><div style="color:#475569;font-size:14px">Billable weight - <b id="billable" style="color:#0f172a">2.50 lb</b> - Dim weight <span id="dim">1.48 lb</span></div><div style="margin-top:4px">Starting at <b id="starting" style="font-size:22px">$5.65</b> <span style="color:#059669;font-weight:700">- updates as you type</span></div></div><button onclick="resetForm()" style="border:1px solid #cbd5e1;background:#fff;border-radius:999px;padding:8px 12px;font-weight:700;cursor:pointer">Reset</button></div>
<button class="big-btn" onclick="showRates()">Get Rates →</button><p style="text-align:center;color:#475569;font-size:13px;font-weight:600">Watch the price change live - Live price update when you change box size</p>
<div class="rates" id="ratesBox"><h3 style="margin:0">Your WARP rates</h3><div class="rate-grid" id="rateGrid"></div><p class="note">Estimated WARP pricing for this draft. Final rate is confirmed at label purchase.</p></div>
</div></div><p class="note">Pricing note: <b style="color:#0f172a">WARP only.</b> Simple, transparent rates - no hidden fees.</p></main>
<script>
function num(id){return parseFloat(document.getElementById(id).value)||0}
function calc(){let actual=num('lbs')+num('oz')/16; let dim=num('len')*num('wid')*num('hei')/139; let bill=Math.max(actual,dim,0.1); let dist=Math.abs(num('fromZip')-num('toZip'))/1000; let f=1+Math.min(dist*0.012,1.25); let base=3.85*f+bill*0.72; return {actual,dim,bill,base}}
function render(){let s=calc(); document.getElementById('billable').textContent=s.bill.toFixed(2)+' lb'; document.getElementById('dim').textContent=s.dim.toFixed(2)+' lb'; document.getElementById('starting').textContent='$'+s.base.toFixed(2); return s}
['fromZip','toZip','lbs','oz','len','wid','hei'].forEach(id=>document.getElementById(id).addEventListener('input',render));
function showRates(){let s=render(); let rates=[{n:'WARP Ground',eta:'2-5 business days',p:s.base,tag:'Lowest price'},{n:'WARP Priority',eta:'1-3 business days',p:s.base*1.58+2.1,tag:'Best balance',pop:true},{n:'WARP Express',eta:'1-2 business days',p:s.base*2.35+4.2,tag:'Fastest'}]; document.getElementById('ratesBox').style.display='block'; document.getElementById('rateGrid').innerHTML=rates.map(r=>'<div class="rate '+(r.pop?'pop':'')+'"><b>'+r.n+'</b><div style="color:#475569;font-size:14px">'+r.eta+'</div><div style="font-size:28px;font-weight:900;margin-top:12px">$'+r.p.toFixed(2)+'</div><div style="color:#047857;font-weight:700;font-size:12px">'+r.tag+'</div><button style="margin-top:14px;background:'+(r.pop?'#2563eb;color:#fff;border:0':'#fff;border:2px solid #0f172a')+'">Choose '+r.n.replace('WARP ','')+'</button></div>').join(''); document.getElementById('ratesBox').scrollIntoView({behavior:'smooth'})}
function resetForm(){document.getElementById('fromZip').value='90210';document.getElementById('toZip').value='10001';document.getElementById('lbs').value='2';document.getElementById('oz').value='8';document.getElementById('len').value='10';document.getElementById('wid').value='8';document.getElementById('hei').value='6';document.getElementById('ratesBox').style.display='none';render()}
render();
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
