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
</style>
