(()=>{
const preference=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.hero-cartoon img,.about-avatar-scene img.about-avatar-3d').forEach((still,index)=>{
function setup(){const canvas=document.createElement('canvas');canvas.className=still.className+' living-avatar';canvas.setAttribute('role','img');canvas.setAttribute('aria-label','MJ avatar with natural blinking, gently shifting gaze, and continuously swaying hair');const w=still.naturalWidth,h=still.naturalHeight;canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');still.replaceWith(canvas);let visible=false,frame=0,last=0;const phase=index*1.3;
const eyes=[{x:.329,y:.303,w:.135,h:.062},{x:.548,y:.288,w:.126,h:.061}];
function eyePath(e){const x=e.x*w,y=e.y*h,ew=e.w*w,eh=e.h*h;ctx.beginPath();ctx.moveTo(x,y+eh*.48);ctx.bezierCurveTo(x+ew*.06,y-eh*.03,x+ew*.83,y-eh*.05,x+ew,y+eh*.4);ctx.bezierCurveTo(x+ew*1.03,y+eh*.95,x+ew*.14,y+eh*1.14,x,y+eh*.48);ctx.closePath()}
function render(now){if(!visible||document.hidden)return;if(now-last<40){frame=requestAnimationFrame(render);return}last=now;const t=preference.matches?0:now/1000+phase;ctx.clearRect(0,0,w,h);ctx.drawImage(still,0,0,w,h);
if(!preference.matches){
// Hair is animated by a seamless, softly masked SVG displacement layer.
const gaze=Math.sin(t*.65)*w*.003;const cycle=t%5.6;const blink=cycle<.19?Math.sin(cycle/.19*Math.PI):cycle>4.65&&cycle<4.79?Math.sin((cycle-4.65)/.14*Math.PI)*.65:0;
eyes.forEach(e=>{ctx.save();eyePath(e);ctx.clip();ctx.drawImage(still,gaze,Math.sin(t*.47)*h*.0008,w,h);if(blink>0){const x=e.x*w,y=e.y*h,ew=e.w*w,eh=e.h*h;const skin=ctx.createLinearGradient(0,y,0,y+eh);skin.addColorStop(0,'#b97b54');skin.addColorStop(1,'#edb17e');ctx.fillStyle=skin;ctx.fillRect(x-3,y-5,ew+6,(eh+8)*blink);if(blink>.8){ctx.beginPath();ctx.moveTo(x,y+eh*.55);ctx.quadraticCurveTo(x+ew*.5,y+eh*.83,x+ew,y+eh*.5);ctx.strokeStyle='#563829';ctx.lineWidth=w*.0025;ctx.stroke()}}ctx.restore()});
frame=requestAnimationFrame(render)}
}
function resume(){cancelAnimationFrame(frame);if(visible&&!document.hidden){last=0;frame=requestAnimationFrame(render)}}new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;resume()},{threshold:.05}).observe(canvas);document.addEventListener('visibilitychange',resume);preference.addEventListener('change',resume);ctx.drawImage(still,0,0,w,h)}
if(still.complete&&still.naturalWidth)setup();else still.addEventListener('load',setup,{once:true});
});})();
