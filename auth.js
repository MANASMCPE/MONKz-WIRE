/* MONKz WIRE — license helpers (keys are stored as hashes only, see keys.js) */
/* durations: LT = lifetime, or <number>H / <number>D  (e.g. 12H, 1D, 7D, 45D) */
function parseDur(c){
  c=String(c||'').toUpperCase();
  if(c==='LT')return 0;
  var m=/^(\d{1,4})([HD])$/.exec(c);
  if(!m||+m[1]<1)return null;
  return +m[1]*(m[2]==='H'?36e5:864e5);
}
function planLabel(c){
  c=String(c||'').toUpperCase();
  if(c==='LT')return 'Lifetime';
  var m=/^(\d+)([HD])$/.exec(c);if(!m)return c;
  var n=+m[1],u=m[2]==='H'?'Hour':'Day';return n+' '+u+(n>1?'s':'');
}
var sha256=function sha256(ascii){
  function rr(v,a){return(v>>>a)|(v<<(32-a))}
  var mp=Math.pow,mw=mp(2,32),L='length',i,j,result='',words=[],bl=ascii[L]*8;
  var hash=sha256.h=sha256.h||[],k=sha256.k=sha256.k||[],pc=k[L],comp={};
  for(var cand=2;pc<64;cand++){if(!comp[cand]){for(i=0;i<313;i+=cand)comp[i]=cand;hash[pc]=(mp(cand,.5)*mw)|0;k[pc++]=(mp(cand,1/3)*mw)|0}}
  ascii+='\x80';while(ascii[L]%64-56)ascii+='\x00';
  for(i=0;i<ascii[L];i++){j=ascii.charCodeAt(i);if(j>>8)return;words[i>>2]|=j<<((3-i)%4)*8}
  words[words[L]]=((bl/mw)|0);words[words[L]]=bl;
  for(j=0;j<words[L];){
    var w=words.slice(j,j+=16),old=hash;hash=hash.slice(0,8);
    for(i=0;i<64;i++){
      var w15=w[i-15],w2=w[i-2],a=hash[0],e=hash[4];
      var t1=hash[7]+(rr(e,6)^rr(e,11)^rr(e,25))+((e&hash[5])^((~e)&hash[6]))+k[i]+(w[i]=(i<16)?w[i]:(w[i-16]+(rr(w15,7)^rr(w15,18)^(w15>>>3))+w[i-7]+(rr(w2,17)^rr(w2,19)^(w2>>>10)))|0);
      var t2=(rr(a,2)^rr(a,13)^rr(a,22))+((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
      hash=[(t1+t2)|0].concat(hash);hash[4]=(hash[4]+t1)|0;
    }
    for(i=0;i<8;i++)hash[i]=(hash[i]+old[i])|0;
  }
  for(i=0;i<8;i++)for(j=3;j+1;j--){var b=(hash[i]>>(j*8))&255;result+=((b<16)?0:'')+b.toString(16)}
  return result;
};

var mwMem={};
function lget(k){try{return localStorage.getItem(k)}catch(e){return mwMem[k]||null}}
function lset(k,v){try{localStorage.setItem(k,v)}catch(e){mwMem[k]=v}}
function ldel(k){try{localStorage.removeItem(k)}catch(e){delete mwMem[k]}}

function normKey(k){return String(k||'').toUpperCase().replace(/[^A-Z0-9]/g,'')}
function hashKey(k){return sha256('MONKZWIRE|'+normKey(k))}
var KEYDB=null;
function loadKeys(){
  if(KEYDB)return Promise.resolve(KEYDB);
  return fetch('/keys.json',{cache:'no-store'}).then(function(r){return r.json()}).then(function(d){KEYDB=d||{};return KEYDB}).catch(function(){KEYDB={};return KEYDB});
}
/* resolves to plan code (e.g. 1D, 7D, 12H, LT) or null */
function checkKey(k){
  if(normKey(k).length!==11)return Promise.resolve(null);
  var h=hashKey(k);
  return loadKeys().then(function(db){var c=db[h];return(c&&(c==='LT'||parseDur(c)))?c:null});
}
function getLic(){try{return JSON.parse(lget('mw_lic')||'null')}catch(e){return null}}
function clearLic(){ldel('mw_lic')}
function licExpired(l){return !!(l&&l.end&&Date.now()>=l.end)}
function licValid(l){return !!(l&&l.h&&!licExpired(l))}
function activateKey(k,plan){
  var h=hashKey(k),old=getLic();
  if(old&&old.h===h)return old;               /* same key: keep original start */
  var n=normKey(k),start=Date.now();
  var lic={h:h,plan:plan,start:start,end:parseDur(plan)?start+parseDur(plan):0,tail:n.slice(8)};
  lset('mw_lic',JSON.stringify(lic));return lic;
}
