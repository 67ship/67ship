import 'dotenv/config';
import express from 'express';
import EasyPostClient from '@easypost/api';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve images/ folder so <img src="/images/logo.jpg"> works
app.use('/images', express.static('images'));
app.use(express.static('public'));
const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>67ship.com - Resize. Watch It Drop. Live.</title>
<style>
  *{box-sizing:border-box} body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#f3f4f6;color:#111;margin:0;padding:20px}
  .container{max-width:1250px;margin:0 auto}
  .header{background:#fff;padding:14px 20px;border-radius:16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;box-shadow:0 2px 10px rgba(0,0,0,.08);border:1px solid #e5e7eb;min-height:115px}
  .slogan{text-align:right} .slogan h2{margin:0;font-size:22px;font-weight:900;letter-spacing:-0.5px;color:#111} .slogan h2 span{color:#0066ff} .slogan p{margin:4px 0 0 0;font-size:13px;color:#6b7280;font-weight:500}
  .badge{display:inline-block;background:#111;color:#fff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;margin-top:6px;letter-spacing:0.5px}
  .card{background:#fff;border:1px solid #e5e7eb;padding:18px;border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,0.05)}
  .card.highlight{border:2px solid #0066ff;box-shadow:0 6px 18px rgba(0,102,255,0.18)}
  .card h3{margin:0 0 12px 0;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;color:#111;font-weight:800}
  .row{display:grid;grid-template-columns:1fr 1fr;gap:10px} 
  input,select{width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;font-weight:500} input:focus,select:focus{outline:none;border-color:#0066ff;box-shadow:0 0 0 3px rgba(0,102,255,0.1)} label{font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;display:block;margin-bottom:4px}
  .field{margin-bottom:10px}
  .top-address{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
  .main-row{display:grid;grid-template-columns:1fr 420px;gap:16px;align-items:start}
  .dim-row{display:flex;gap:10px;align-items:end;flex-wrap:wrap}
  .dim-box{width:78px} .dim-box input{text-align:center;font-weight:800;font-size:16px;padding:12px 6px}
  .dim-box.wt{width:90px} .dim-box.wt input{font-weight:600}
  button.primary{background:#0066ff;color:#fff;border:none;padding:14px 24px;border-radius:10px;font-weight:800;font-size:16px;cursor:pointer;width:100%} button.primary:hover{background:#0052cc} button.primary:disabled{background:#d1d5db;cursor:not-allowed}
  .rates-panel{background:#fff;border:2px solid #111;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.12)}
  .rates-header{padding:14px 18px;background:#111;color:#fff;display:flex;justify-content:space-between;align-items:center}
  .rates-header h3{margin:0;font-size:15px} .live{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700} .dot{width:8px;height:8px;background:#10b981;border-radius:50%;animation:pulse 1.5s infinite} @keyframes pulse{0%{opacity:1}50%{opacity:0.3}100%{opacity:1}}
  .rate-item{padding:13px 18px;border-bottom:1px solid #f3f4f6;display:flex;justify-content:space-between;align-items:center;cursor:pointer;transition:all .15s} .rate-item:hover{background:#f9fafb} .rate-item.selected{background:#eff6ff;border-left:4px solid #0066ff}
  .retail{font-size:13px;color:#9ca3af;text-decoration:line-through;margin-right:6px} .our-rate{font-size:19px;font-weight:900;color:#059669} .savings{background:#d1fae5;color:#065f46;font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px;margin-top:3px;display:inline-block} .cheapest{background:#10b981;color:#fff;font-size:10px;font-weight:800;padding:3px 7px;border-radius:4px;margin-left:6px;animation:pop 0.3s}
  @keyframes pop{0%{transform:scale(0.8)}100%{transform:scale(1)}}
  .buy-bar{padding:14px 18px;background:#f9fafb;border-top:1px solid #e5e7eb} 
  .label-box{background:#ecfdf5;border:2px solid #10b981;border-radius:12px;padding:20px;text-align:center;margin-top:16px}
  .loading{padding:28px;text-align:center;color:#6b7280;font-style:italic} .tip{background:#eff6ff;border:1px dashed #0066ff;padding:10px 14px;border-radius:8px;font-size:12px;color:#1e40af;font-weight:600;margin-top:12px}
  @media(max-width:1000px){.top-address{grid-template-columns:1fr} .main-row{grid-template-columns:1fr} .header{flex-direction:column;gap:10px;text-align:center} .slogan{text-align:center}}
</style></head><body>
<div class="container">
  <div class="header"><div><img src="/images/logo.jpg" alt="67ship.com" style="height:154px; max-width:100%; object-fit:contain; display:block;"></div><div class="slogan"><h2>Resize. <span>Watch It Drop.</span> Live.</h2><p>The only site where changing your box changes your price instantly</p><div class="badge">PRICES UPDATE INSTANTLY • RIGHT HERE</div></div></div>
  
    <div class="top-address">
    <div class="card"><h3>📤 Ship From - Full Address</h3>
      <div class="row"><div class="field"><label>Full Name</label><input id="from_name" value="" placeholder="Full Name"></div><div class="field"><label>Company</label><input id="from_company" value="" placeholder="Company (optional)"></div></div>
      <div class="field"><label>Street</label><input id="from_street" value="" placeholder="Street"></div>
      <div class="row"><div class="field"><label>City</label><input id="from_city" value="" placeholder="City"></div><div class="field"><label>State</label><input id="from_state" value="" placeholder="State"></div></div>
      <div class="row"><div class="field"><label>ZIP</label><input id="from_zip" value="" placeholder="ZIP"></div><div class="field"><label>Country</label><select id="from_country"><option value="US" selected>US</option></select></div></div>
      <div class="field"><label>Phone</label><input id="from_phone" value="" placeholder="Phone"></div>
    </div>
    <div class="card"><h3>📥 Ship To - Full Address</h3>
      <div class="row"><div class="field"><label>Full Name</label><input id="to_name" value="" placeholder="Full Name"></div><div class="field"><label>Company</label><input id="to_company" value=""></div></div>
      <div class="field"><label>Street</label><input id="to_street" value="" placeholder="Street"></div>
      <div class="row"><div class="field"><label>City</label><input id="to_city" value="" placeholder="City"></div><div class="field"><label>State</label><input id="to_state" value="" placeholder="State"></div></div>
      <div class="row"><div class="field"><label>ZIP</label><input id="to_zip" value="" placeholder="ZIP"></div><div class="field"><label>Country</label><select id="to_country"><option value="US" selected>US</option></select></div></div>
      <div class="field"><label>Phone</label><input id="to_phone" value="" placeholder="Phone"></div>
    </div>
  </div>

  <div class="main-row">
    <div>
      <div class="card highlight"><h3>📦 Package Dimensions — Takes Full Row — Prices Start RIGHT HERE →</h3>
        <div class="dim-row">
          <div class="dim-box"><label>L (in)</label><input id="pkg_length" value="10" type="number" step="1" min="1" onfocus="this.select()" onclick="this.select()"></div>
          <div class="dim-box"><label>W (in)</label><input id="pkg_width" value="8" type="number" step="1" min="1" onfocus="this.select()" onclick="this.select()"></div>
          <div class="dim-box"><label>H (in)</label><input id="pkg_height" value="6" type="number" step="1" min="1" onfocus="this.select()" onclick="this.select()"></div>
          <div class="dim-box wt"><label>lbs</label><input id="pkg_lbs" value="1" type="number" min="0" step="1" onfocus="this.select()" onclick="this.select()"></div>
          <div class="dim-box wt"><label>oz</label><input id="pkg_oz" value="8" type="number" min="0" step="1" onfocus="this.select()" onclick="this.select()"></div>
          <div style="margin-left:8px;font-size:13px;font-weight:800;color:#0066ff">→ PRICE DROPS LIVE →</div>
        </div>
        <div id="cheapestBox" onclick="document.getElementById('ratesPanel').scrollIntoView({behavior:'smooth'})" style="margin-top:14px;background:#ecfdf5;border:2px solid #10b981;border-radius:10px;padding:12px 14px;cursor:pointer;text-align:center">
          <div style="font-size:11px;font-weight:800;color:#065f46;letter-spacing:0.5px">CHEAPEST FOR THIS SIZE</div>
          <div id="cheapestPrice" style="font-size:28px;font-weight:900;color:#059669;line-height:1.1">—</div>
          <div id="cheapestCarrier" style="font-size:13px;font-weight:700;color:#111">Enter box size</div>
          <div style="font-size:12px;font-weight:800;color:#0066ff;margin-top:4px">See all rates ↓</div>
      </div>
        <div class="tip">💡 This is the game changer: Type 10 → 9 in L and watch CHEAPEST price on the right drop instantly. No scroll needed. Price is RIGHT HERE at dimension window. 67ship.com on every label footer.</div>
      </div>
      <div id="labelResult"></div>
    </div>
    <div class="rates-panel" id="ratesPanel"><div class="rates-header"><h3>💰 Live Prices — Right Here</h3><div class="live"><div class="dot"></div><span id="ratesCount">Live</span></div></div>
      <div style="display:flex;gap:8px;padding:10px 14px;background:#f9fafb;border-bottom:1px solid #e5e7eb;align-items:center">
        <label style="display:flex;align-items:center;gap:4px;font-size:12px;font-weight:800;cursor:pointer"><input type="checkbox" id="filter_usps" checked style="width:14px"> USPS</label>
        <label style="display:flex;align-items:center;gap:4px;font-size:12px;font-weight:800;cursor:pointer"><input type="checkbox" id="filter_ups" checked style="width:14px"> UPS</label>
        <label style="display:flex;align-items:center;gap:4px;font-size:12px;font-weight:800;cursor:pointer"><input type="checkbox" id="filter_fedex" checked style="width:14px"> FedEx</label>
        <span style="margin-left:auto;font-size:11px;color:#6b7280" id="filterInfo">All carriers</span>
      </div>
      <div id="results"><div class="loading">Enter box size<br><br>Cheapest price appears<br>RIGHT HERE as you type</div></div><div class="buy-bar"><button id="buyBtn" class="primary" disabled>Select a rate</button><div style="font-size:11px;color:#6b7280;text-align:center;margin-top:6px">Retail <s>$28.50</s> → <b style="color:#059669">$12.42</b> • 67ship.com footer on every label</div></div></div>
  </div>
</div>
<script>
let currentShipmentId=null;let selectedRateId=null;let debounceTimer=null;let lastPayloadStr='';
function getPayload(){
  const lbs=parseFloat(document.getElementById('pkg_lbs').value)||0;
  const oz=parseFloat(document.getElementById('pkg_oz').value)||0;
  const total=(lbs*16)+oz;
  return {
    from:{
      name: from_name.value || 'Shipper',
      company: from_company.value || '',
      street1: from_street.value || '123 Main',
      city: from_city.value || 'Los Angeles',
      state: from_state.value || 'CA',
      zip: from_zip.value || '90012',
      country: from_country.value || 'US',
      phone: from_phone.value || '3235550100'
    },
    to:{
      name: to_name.value || 'Recipient',
      company: to_company.value || '',
      street1: to_street.value || '456 Market',
      city: to_city.value || 'New York',
      state: to_state.value || 'NY',
      zip: to_zip.value || '10001',
      country: to_country.value || 'US',
      phone: to_phone.value || '2125550100'
    },
    parcel:{length:pkg_length.value||'10',width:pkg_width.value||'8',height:pkg_height.value||'6',weight:total||16}
  };
}
function canFetch(){const p=getPayload();return p.from.zip.length>=5 && p.to.zip.length>=5 && parseFloat(p.parcel.length)>0 && parseFloat(p.parcel.width)>0 && parseFloat(p.parcel.height)>0;}
let allRatesCache=[];
function getCarrierFilters(){return {usps: document.getElementById('filter_usps')?.checked, ups: document.getElementById('filter_ups')?.checked, fedex: document.getElementById('filter_fedex')?.checked};}
function cleanCarrier(c){ c=(c||''); if(c.toLowerCase().includes('ups')) return 'UPS'; if(c.toLowerCase().includes('fedex')) return 'FedEx'; if(c.toLowerCase().includes('usps')) return 'USPS'; return c; }
function cleanService(s){ s=(s||'').replace(/GreaterThan1lb/gi,'').replace(/_/g,' ').replace(/([a-z])([A-Z])/g,'$1 $2').replace(/Groundsaver/gi,'Ground Saver').replace(/Ground Advantage/gi,'Ground Advantage').trim(); return s; }
function filterAndRenderRates(){
  const resultsDiv=document.getElementById('results');
  const countEl=document.getElementById('ratesCount');
  const infoEl=document.getElementById('filterInfo');
  const f=getCarrierFilters();
  const filtered=allRatesCache.filter(r=>{
    const c=(r.carrier||'').toLowerCase();
    if(c.includes('usps') && !f.usps) return false;
    if(c.includes('ups') && !f.ups) return false;
    if(c.includes('fedex') && !f.fedex) return false;
    if(c.includes('federal') && !f.fedex) return false;
    return true;
  }).sort((a,b)=>parseFloat(a.rate)-parseFloat(b.rate));
  if(filtered.length===0){resultsDiv.innerHTML='<div class=loading>No carriers selected<br>Check USPS/UPS/FedEx above</div>'; countEl.textContent='0 rates'; infoEl.textContent='None'; return;}
  countEl.textContent=filtered.length+' rates • $'+parseFloat(filtered[0].rate).toFixed(2)+' cheapest';
  document.getElementById('cheapestPrice').textContent='$'+parseFloat(filtered[0].rate).toFixed(2);
  document.getElementById('cheapestCarrier').textContent=cleanCarrier(filtered[0].carrier)+' - '+cleanService(filtered[0].service);
  const active = [f.usps?'USPS':null,f.ups?'UPS':null,f.fedex?'FedEx':null].filter(Boolean).join(' + ');
  infoEl.textContent=active||'None';
  let html='';filtered.forEach((r,idx)=>{const retail=parseFloat(r.retail_rate||r.retailRate||(parseFloat(r.rate)*1.45).toFixed(2));const our=parseFloat(r.rate);const savings=Math.round(((retail-our)/retail)*100);const isCheapest=idx===0;html+='<div class=rate-item '+(isCheapest?'style=border-left:4px solid #10b981;background:#ecfdf5':'')+' data-rateid='+r.id+' data-rate='+r.rate+' data-carrier='+cleanCarrier(r.carrier)+'><div style=flex:1><div style=font-weight:800;font-size:14px>'+cleanCarrier(r.carrier)+' - '+cleanService(r.service)+' '+(isCheapest?'<span class=cheapest>CHEAPEST →</span>':'')+'</div></div><div style=text-align:right><div><span class=retail>$'+retail.toFixed(2)+'</span><span class=our-rate>$'+our.toFixed(2)+'</span></div><div class=savings>Save '+savings+'%</div></div></div>';});resultsDiv.innerHTML=html;
  document.querySelectorAll('.rate-item').forEach(el=>{el.addEventListener('click',()=>{document.querySelectorAll('.rate-item').forEach(x=>{x.classList.remove('selected');});el.classList.add('selected');selectedRateId=el.getAttribute('data-rateid');const rate=el.getAttribute('data-rate');const carrier=el.getAttribute('data-carrier');const buyBtn=document.getElementById('buyBtn');buyBtn.disabled=false;buyBtn.textContent='Buy Label - $'+rate+' ('+carrier+')';});});
  const first=document.querySelector('.rate-item');if(first)first.click();
}
async function fetchRates(){if(!canFetch())return;const payload=getPayload();const str=JSON.stringify(payload);if(str===lastPayloadStr)return;lastPayloadStr=str;const resultsDiv=document.getElementById('results');const countEl=document.getElementById('ratesCount');countEl.textContent='Updating '+payload.parcel.length+'x'+payload.parcel.width+'x'+payload.parcel.height+'...';resultsDiv.innerHTML='<div class=loading>↻ '+payload.parcel.length+' x '+payload.parcel.width+' x '+payload.parcel.height+'<br>Finding cheapest...</div>';try{const res=await fetch('/api/get-rates',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await res.json();if(!res.ok){resultsDiv.innerHTML='<div class=loading style=color:red>'+data.error+'</div>';return;}currentShipmentId=data.shipmentId;allRatesCache=data.rates;filterAndRenderRates();}catch(e){resultsDiv.innerHTML='<div class=loading style=color:red>Failed: '+e.message+'</div>';}}
function scheduleFetch(){clearTimeout(debounceTimer);debounceTimer=setTimeout(fetchRates,550);}
['from_name','from_company','from_street','from_city','from_state','from_zip','from_country','from_phone','to_name','to_company','to_street','to_city','to_state','to_zip','to_country','to_phone','pkg_length','pkg_width','pkg_height','pkg_lbs','pkg_oz'].forEach(id=>{const el=document.getElementById(id);if(el){el.addEventListener('input',scheduleFetch);el.addEventListener('change',scheduleFetch);}});
['filter_usps','filter_ups','filter_fedex'].forEach(id=>{const el=document.getElementById(id);if(el){el.addEventListener('change',()=>{lastPayloadStr='';filterAndRenderRates();if(allRatesCache.length===0) scheduleFetch();});}});
setTimeout(fetchRates,800);
document.getElementById('buyBtn').addEventListener('click',async()=>{if(!selectedRateId||!currentShipmentId)return;const buyBtn=document.getElementById('buyBtn');const orig=buyBtn.textContent;buyBtn.textContent='Buying...';buyBtn.disabled=true;const labelDiv=document.getElementById('labelResult');labelDiv.innerHTML='<div class=card style=text-align:center>Buying...</div>';labelDiv.scrollIntoView({behavior:'smooth'});try{const res=await fetch('/api/buy-label',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({shipmentId:currentShipmentId,rateId:selectedRateId})});const data=await res.json();if(!res.ok){alert('Buy Error: '+data.error);buyBtn.textContent=orig;buyBtn.disabled=false;return;}labelDiv.innerHTML='<div class=label-box id=labelBox><h2 style=margin:0 0 8px 0>✅ LABEL CREATED</h2><p>Tracking: '+data.tracking_code+'</p><p><strong>'+data.carrier+' - '+data.service+'</strong></p><p style=font-size:13px;color:#6b7280>Retail <s>$'+data.retailRate+'</s> You paid $'+data.rate+' Saved '+data.savings+'% • 67ship.com footer on every label</p><a href='+data.labelUrl+' target=_blank style=display:inline-block;margin-top:12px;padding:14px 28px;background:#111;color:#fff;border-radius:10px;text-decoration:none;font-weight:800>OPEN & PRINT LABEL</a></div>';document.getElementById('labelBox').scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>window.open(data.labelUrl,'_blank'),500);}catch(e){alert('Failed: '+e.message);}finally{buyBtn.textContent=orig;buyBtn.disabled=false;}});
</script></body></html>
  `);
});

app.post('/api/get-rates', async (req,res)=>{
  try{
    const s=await client.Shipment.create({
      from_address:req.body.from,
      to_address:req.body.to,
      parcel:req.body.parcel,
      options: {
        print_custom_1: "67ship.com - Resize. Watch It Drop. Live.",
        reference1: "67ship.com",
        reference2: "Resize Watch It Drop Live"
      }
    });
    const rates=(s.rates||[]).map(r=>{
      const retail=r.retail_rate?parseFloat(r.retail_rate):r.retailRate?parseFloat(r.retailRate):parseFloat(r.rate)*1.45;
      const savings=retail>0?Math.round(((retail-parseFloat(r.rate))/retail)*100):0;
      return {...r,retail_rate:retail.toFixed(2),savings};
    });
    res.json({shipmentId:s.id,rates});
  }catch(e){console.error(e);res.status(500).json({error:e.message})}
});

app.post('/api/buy-label', async (req,res)=>{
  const {shipmentId,rateId}=req.body;
  try{
    let b;
    try{ b=await client.Shipment.buy(shipmentId,rateId); }catch{ b=await client.Shipment.buy(shipmentId,{rate:{id:rateId}}); }
    const retail=b.selected_rate?.retail_rate||(parseFloat(b.selected_rate?.rate)*1.45).toFixed(2);
    const our=b.selected_rate?.rate;
    const savings=retail?Math.round(((parseFloat(retail)-parseFloat(our))/parseFloat(retail))*100):0;
    res.json({tracking_code:b.tracking_code,carrier:b.selected_rate?.carrier,service:b.selected_rate?.service,labelUrl:b.postage_label?.label_url,rate:our,retailRate:retail,savings});
  }catch(e){console.error(e);res.status(500).json({error:e.message})}
});

app.listen(PORT,()=>console.log('67ship ULTIMATE WHOLE-INCH - L/W/H step 1 + 67ship footer at http://localhost:' + PORT));