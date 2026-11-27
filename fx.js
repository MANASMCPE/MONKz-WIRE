/* particle background — can be switched off in Settings */
(function(){
  var c=document.getElementById('fx');if(!c)return;
  var x=c.getContext('2d'),W,H,P=[];
  window.mwFxOn=true;
  try{if(localStorage.getItem('mw_fx')==='0')window.mwFxOn=false}catch(e){}
  function rs(){var d=Math.min(window.devicePixelRatio||1,2);W=c.width=innerWidth*d;H=c.height=innerHeight*d;P=[];
    for(var i=0;i<Math.floor(innerWidth/15);i++)P.push({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.8+.4)*d,v:(Math.random()*.4+.1)*d,a:Math.random()*.5+.2})}
  addEventListener('resize',rs);rs();
  (function loop(){
    x.clearRect(0,0,W,H);
    if(window.mwFxOn){P.forEach(function(p){p.y-=p.v;if(p.y<0){p.y=H;p.x=Math.random()*W}
      x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fillStyle='rgba(255,70,70,'+p.a+')';x.fill()})}
    requestAnimationFrame(loop)
  })();
})();
