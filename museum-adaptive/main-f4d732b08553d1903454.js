(()=>{"use strict";var e={61:(e,t,l)=>{l.r(t)}},t={};function l(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,l),r.exports}l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{l(61),function(){let e=document.querySelectorAll(".art-gallery img"),t=Array.from(e);!function(e){for(var t=e.length-1;t>0;t--){var l=Math.floor(Math.random()*(t+1)),n=e[t];e[t]=e[l],e[l]=n}}(t),t.forEach(((e,t)=>{e.src=`assets/img/galery${t+1}.jpg`}))}();let e=document.querySelector(".progress.timeline");null==e||e.addEventListener("input",(function(){let t=null==e?void 0:e.value,l=`linear-gradient(\n    to right,\n    #710707 0%,\n    #710707 ${t}%,\n    #b3b3b3 ${t}%,\n    #b3b3b3 100%\n    )`;e&&(e.style.background=l)}));let t=document.querySelector(".progress.volume");null==t||t.addEventListener("input",(function(){let e=null==t?void 0:t.value,l=`linear-gradient(\n      to right,\n      #710707 0%,\n      #710707 ${e}%,\n      #b3b3b3 ${e}%,\n      #b3b3b3 100%\n      )`;t&&(t.style.background=l)}));const n=document.querySelector(".buy-btn"),o=document.querySelector(".close-btn"),r=document.querySelector(".modal-buy"),i=e=>{[r,n,o].includes(e.target)&&(null==r||r.classList.toggle("active"),e.stopPropagation())};null==n||n.addEventListener("click",i),null==r||r.addEventListener("click",i),null==o||o.addEventListener("click",i);const c=document.querySelector(".book-button");null==c||c.addEventListener("click",(function(e){const t=e.clientX,l=e.clientY,n=this.getBoundingClientRect().y,o=t-this.getBoundingClientRect().x,r=l-n,i=document.createElement("span");i.classList.add("circle"),i.style.top=r+"px",i.style.left=o+"px",this&&this.appendChild(i),setTimeout((()=>i.remove()),500)}));const u=document.querySelector(".burger"),s=document.querySelector(".mobile-nav"),a=document.querySelector(".welcome-text-wrapper"),d=document.querySelectorAll(".mobile-nav .nav-menu .nav-item"),g=[u,...d],m=e=>{let t=null==u?void 0:u.classList;null==t||t.toggle("active");let l=null==s?void 0:s.classList;null==l||l.toggle("active");let n=null==a?void 0:a.classList;null==n||n.toggle("hidden"),e.stopPropagation()};g.forEach((e=>{null==e||e.addEventListener("click",m)})),document.addEventListener("click",(e=>{(null==u?void 0:u.classList.contains("active"))&&m(e)}));let v={"(1024) Блок header +4":4,"(1024) Секция Welcome +4":4,"(1024) Секция Visiting +4":0,"(1024) Секция Explore +4":0,"(1024) Секция Video +4":0,"(1024) Секция Gallery +4":0,"(1024) Секция Tickets +4":0,"(1024) Форма покупки билетов +4":4,"(1024) Секция Contacts +4":0,"(1024) Блок footer +4":0,"(768) Блок header +4":4,"(768) Секция Welcome +4":4,"(768) Секция Visiting +4":0,"(768) Секция Explore +4":0,"(768) Секция Video +4":0,"(768) Секция Gallery +4":0,"(768) Секция Tickets +4":0,"(768) Форма покупки билетов +4":4,"(768) Секция Contacts +4":0,"(768) Блок footer +4":0,"(420) Блок header +4":4,"(420) Секция Welcome +4":4,"(420) Секция Visiting +4":0,"(420) Секция Explore +4":0,"(420) Секция Video +4":0,"(420) Секция Gallery +4":0,"(420) Секция Tickets +4":0,"(420) Форма покупки билетов +4":4,"(420) Секция Contacts +4":0,"(420) Блок footer +4":0,"Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +6":6,"При изменении ширины экрана плавно изменяются размеры: слайдера в секции Welcome +2":2,"При изменении ширины экрана плавно изменяются размеры: слайдера сравнения изображений в секции Explore +2":0,"При изменении ширины экрана плавно изменяются размеры: кастомного видеоплеера в секции Video +2":0,"При изменении ширины экрана плавно изменяются размеры: слайдера в секции Video +2":0,"При изменении ширины экрана плавно изменяются размеры: YouTube-видео в плейлисте в секции Video, маленькие видео выровнены по краям большого +2":0,"При изменении ширины экрана плавно изменяются размеры: галереи изображений и изображений в ней +2":0,"При изменении ширины экрана плавно изменяются размеры: карты +2":0,"На ширине экрана 1024рх и меньше реализовано адаптивное меню +12":12,"при нажатии на бургер-иконку меню появляется, плавно выдвигаясь слева, бургер-иконка изменяется на крестик. При нажатии на крестик меню исчезает, плавно возвращаясь назад, иконка крестика превращается в бургер-иконку +2":0,"ссылки в меню работают, обеспечивая плавную прокрутку по якорям +2":2,"при клике по ссылке в адаптивном меню, или при клике по любому месту сайта, кроме самого адаптивного меню, меню закрывается +2":2,"вёрстка меню соответствует макету на всех проверяемых разрешениях +6":0,"Оптимизация скорости загрузки страницы +8":0},b=0;for(let e of Object.entries(v))console.log(e[1]+"\t"+e[0]),b+=e[1];console.table("Total result: "+b)})()})();