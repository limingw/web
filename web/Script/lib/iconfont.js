(function(window){var svgSprite='<svg><symbol id="icon-yonghu" viewBox="0 0 1028 1024"><path d="M815.814506 299.350645c0 165.306834-134.011812 299.350645-299.350645 299.350645s-299.350645-134.011812-299.350645-299.350645c0-165.306834 134.011812-299.350645 299.350645-299.350645s299.350645 134.011812 299.350645 299.350645z"  ></path><path d="M763.52814 612.780851c-69.75782 55.070279-156.219118 85.661323-247.064279 85.661323-91.901128 0-179.1944-31.295022-249.27221-87.421268-184.698228 67.805881-267.19165 304.758476-267.19165 412.979094l1027.711884 0c0-107.260648-83.133402-342.549295-264.183744-411.18715z"  ></path></symbol><symbol id="icon-mima" viewBox="0 0 1024 1024"><path d="M768.9216 422.72768 372.06016 422.72768C378.88 365.21984 329.37984 131.42016 512.2048 125.72672c173.83424-6.59456 146.78016 213.34016 146.78016 213.34016l85.13536 0.57344c0 0 24.73984-294.4-231.91552-295.8336C232.09984 58.01984 297.82016 377.18016 289.28 422.72768c1.98656 0 4.56704 0 7.29088 0-55.88992 0-101.21216 45.34272-101.21216 101.21216l0 337.38752c0 55.88992 45.34272 101.21216 101.21216 101.21216l472.35072 0c55.88992 0 101.21216-45.34272 101.21216-101.21216L870.13376 523.93984C870.13376 468.0704 824.79104 422.72768 768.9216 422.72768zM566.4768 717.02528l0 76.84096c0 18.57536-15.1552 33.73056-33.73056 33.73056-18.57536 0-33.73056-15.1552-33.73056-33.73056l0-76.84096c-20.09088-11.69408-33.73056-33.21856-33.73056-58.12224 0-37.2736 30.208-67.4816 67.4816-67.4816 37.2736 0 67.4816 30.208 67.4816 67.4816C600.22784 683.80672 586.58816 705.3312 566.4768 717.02528z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)