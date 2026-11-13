(()=>{
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.hero-cartoon,.about-avatar-scene').forEach((host,index)=>{
const id='mj-hair-'+index,ns='http://www.w3.org/2000/svg';
const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 1080 1440');svg.setAttribute('preserveAspectRatio','xMidYMax meet');svg.setAttribute('aria-hidden','true');svg.classList.add('hair-wind-overlay');
// Continuous displacement, feathered across tufts and fringe; no image tiles.
svg.innerHTML=`<defs>
<radialGradient id="${id}-fade"><stop offset="0" stop-color="white"/><stop offset=".5" stop-color="white"/><stop offset="1" stop-color="black"/></radialGradient>
<mask id="${id}-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1440"><rect width="1080" height="1440" fill="black"/>
<ellipse cx="240" cy="200" rx="115" ry="125" fill="url(#${id}-fade)"/>
<ellipse cx="400" cy="100" rx="150" ry="95" fill="url(#${id}-fade)"/>
<ellipse cx="695" cy="100" rx="155" ry="100" fill="url(#${id}-fade)"/>
<ellipse cx="845" cy="225" rx="100" ry="130" fill="url(#${id}-fade)"/>
<ellipse cx="405" cy="325" rx="120" ry="80" transform="rotate(-25 405 325)" fill="url(#${id}-fade)"/>
<ellipse cx="585" cy="300" rx="120" ry="70" transform="rotate(-35 585 300)" fill="url(#${id}-fade)"/>
</mask>
<filter id="${id}-wind" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".006 .012" numOctaves="2" seed="8" result="wind"><animate attributeName="baseFrequency" values=".006 .012;.008 .014;.006 .012" dur="7s" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" in2="wind" scale="7" xChannelSelector="R" yChannelSelector="G"><animate attributeName="scale" values="3;10;5;8;3" dur="5.5s" repeatCount="indefinite"/></feDisplacementMap></filter>
</defs><g mask="url(#${id}-mask)"><image href="assets/mj-about-cartoon-3d.png" width="1080" height="1440" preserveAspectRatio="none" filter="url(#${id}-wind)"/></g>`;
host.append(svg);
let visible=true;
function sync(){svg.style.display=reduced.matches?'none':'';if(!visible||document.hidden||reduced.matches)svg.pauseAnimations();else svg.unpauseAnimations()}
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.01}).observe(host);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync();
});
})();
