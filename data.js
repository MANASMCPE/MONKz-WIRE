/* ===== SHARED SETTINGS — edit here, used by the home page and the store ===== */
var CURRENCY="₹";
var ADMIN_EMAIL="scriptermonk@gmail.com";
var DEMO_VIDEO="";   /* paste a YouTube link (https://youtu.be/…) to show a demo video on the home page */
var ANNOUNCEMENT="";   /* shows a dismissible banner inside the panel, e.g. "Update v1.3 is live!" */
var TURNSTILE_SITEKEY="";   /* Cloudflare Turnstile site key (free). When set, the unlock page shows the Cloudflare human check. */
var CF_ANALYTICS_TOKEN="";  /* Cloudflare Web Analytics token (free). When set, visits are counted. */
var UPI_ID="";       /* e.g. yourname@upi — shown in the store payment box when filled */
var UPI_NAME="MONKz WIRE";
var PLANS=[
  {code:"1D", name:"1 DAY",   ic:"⚡", price:99,   per:"valid for 24 hours", perks:["Full panel access","All hacks unlocked","Key delivered on Discord"]},
  {code:"3D", name:"3 DAYS",  ic:"🔥", price:199,  per:"valid for 3 days",   save:"SAVE 33%", perks:["Full panel access","All hacks unlocked","Key delivered on Discord"]},
  {code:"7D", name:"7 DAYS",  ic:"💎", price:349,  per:"valid for 7 days",   badge:"POPULAR", save:"SAVE 50%", perks:["Full panel access","All hacks unlocked","Priority support"]},
  {code:"30D",name:"30 DAYS", ic:"👑", price:799,  per:"valid for 30 days",  save:"SAVE 73%", perks:["Full panel access","All hacks unlocked","Priority support","Free updates"]},
  {code:"LT", name:"LIFETIME",ic:"♾️", price:1499, per:"one-time payment",   badge:"BEST VALUE", perks:["Full panel access","All hacks unlocked","VIP support","Lifetime updates"]}
];
var CATS=[
 {ic:"🎯",t:"AIM",f:["Auto Headshot","Aim Lock","Silent Aim","Aim FOV","Smooth Aim","Aim Distance","Visible Check","Knocked Check","Target Prediction","Aim On Fire","Bone Selector"]},
 {ic:"👁️",t:"VISUALS",f:["ESP Box","ESP Line","ESP Skeleton","ESP Health","ESP Name","ESP Distance","Loot ESP","Vehicle ESP","Radar","Custom Crosshair","Chams"]},
 {ic:"🔫",t:"WEAPONS",f:["No Recoil","No Spread","Fast Reload","Rapid Fire","Auto Fire","Quick Switch","Scope Zoom"]},
 {ic:"🏃",t:"PLAYER",f:["Speed Boost","High Jump","Fast Heal","Auto Revive","Auto Pickup","No Fall Damage","Sprint Boost"]},
 {ic:"🧰",t:"MISC",f:["Wide View","Night Vision","Clear Weather","Quick Loot","Streamer Mode","Notifications"]},
 {ic:"⚙️",t:"SETTINGS",f:["FPS Boost","Safe Mode","Night Theme","Panel Opacity","Sound Effects","Compact Mode"]}
];
function planCards(){
  return PLANS.map(function(p,i){return '<div class="plan'+(p.badge?' hot':'')+'" style="animation-delay:'+(i*.07)+'s">'+(p.badge?'<div class="badge">'+p.badge+'</div>':'')+
  '<div class="pi">'+p.ic+'</div><h3>'+p.name+'</h3><div class="price"><em>'+CURRENCY+'</em>'+p.price+'</div><div class="per">'+p.per+'</div>'+
  (p.save?'<div><span class="save">'+p.save+'</span></div>':'')+
  '<ul>'+p.perks.map(function(k){return'<li>'+k+'</li>'}).join('')+'</ul><button class="btn block" data-i="'+i+'">🛒 BUY NOW</button></div>'}).join('');
}
function catCards(){
  return CATS.map(function(c){return '<div class="cat"><h4><i>'+c.ic+'</i>'+c.t+'<em>'+c.f.length+'</em></h4><div>'+c.f.map(function(x){return'<span>'+x+'</span>'}).join('')+'</div></div>'}).join('');
}
function totalFeatures(){return CATS.reduce(function(a,c){return a+c.f.length},0)}
function buyPlan(i,toastFn){
  var p=PLANS[i],msg='I want to buy MONKz WIRE '+p.name+' key ('+CURRENCY+p.price+')';
  try{navigator.clipboard.writeText(msg)}catch(e){}
  toastFn('Order text copied — opening Discord…');
  setTimeout(function(){location.href='/discord'},900);
}
function ytEmbed(u){var m=/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/.exec(u||'');return m?'https://www.youtube.com/embed/'+m[1]:''}

/* Cloudflare Web Analytics (only loads when a token is set) */
if(CF_ANALYTICS_TOKEN){var _s=document.createElement('script');_s.defer=true;_s.src='https://static.cloudflareinsights.com/beacon.min.js';_s.setAttribute('data-cf-beacon',JSON.stringify({token:CF_ANALYTICS_TOKEN}));document.head.appendChild(_s)}
