(()=>{"use strict";var e={61:(e,t,l)=>{l.r(t)}},t={};function l(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,l),i.exports}l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{l(61);let e=document.querySelector(".progress.timeline");null==e||e.addEventListener("input",(function(){let t=null==e?void 0:e.value,l=`linear-gradient(\n    to right,\n    #710707 0%,\n    #710707 ${t}%,\n    #b3b3b3 ${t}%,\n    #b3b3b3 100%\n    )`;e&&(e.style.background=l)}));let t=document.querySelector(".progress.volume");null==t||t.addEventListener("input",(function(){let e=null==t?void 0:t.value,l=`linear-gradient(\n      to right,\n      #710707 0%,\n      #710707 ${e}%,\n      #b3b3b3 ${e}%,\n      #b3b3b3 100%\n      )`;t&&(t.style.background=l)}));const n=document.querySelector(".buy-btn"),o=document.querySelector(".close-btn"),i=document.querySelector(".modal-buy"),r=e=>{[i,n,o].includes(e.target)&&(null==i||i.classList.toggle("active"),e.stopPropagation())};null==n||n.addEventListener("click",r),null==i||i.addEventListener("click",r),null==o||o.addEventListener("click",r);const c=document.querySelector(".book-button");null==c||c.addEventListener("click",(function(e){const t=e.clientX,l=e.clientY,n=this.getBoundingClientRect().y,o=t-this.getBoundingClientRect().x,i=l-n,r=document.createElement("span");r.classList.add("circle"),r.style.top=i+"px",r.style.left=o+"px",this&&this.appendChild(r),setTimeout((()=>r.remove()),500)}));const u=document.querySelector(".burger"),s=document.querySelector(".mobile-nav"),d=document.querySelector(".welcome-text-wrapper"),a=document.querySelectorAll(".mobile-nav .nav-menu .nav-item"),g=[u,...a],v=e=>{let t=null==u?void 0:u.classList;null==t||t.toggle("active");let l=null==s?void 0:s.classList;null==l||l.toggle("active");let n=null==d?void 0:d.classList;null==n||n.toggle("hidden"),e.stopPropagation()};g.forEach((e=>{null==e||e.addEventListener("click",v)})),document.addEventListener("click",(e=>{(null==u?void 0:u.classList.contains("active"))&&v(e)}));let b={"(1024) Блок header +4":4,"(1024) Секция Welcome +4":4,"(1024) Секция Visiting +4":4,"(1024) Секция Explore +4":4,"(1024) Секция Video +4":4,"(1024) Секция Gallery +4":4,"(1024) Секция Tickets +4":4,"(1024) Форма покупки билетов +4":4,"(1024) Секция Contacts +4":4,"(1024) Блок footer +4":4,"(768) Блок header +4":4,"(768) Секция Welcome +4":4,"(768) Секция Visiting +4":4,"(768) Секция Explore +4":4,"(768) Секция Video +4":4,"(768) Секция Gallery +4":4,"(768) Секция Tickets +4":4,"(768) Форма покупки билетов +4":4,"(768) Секция Contacts +4":4,"(768) Блок footer +4":4,"(420) Блок header +4":4,"(420) Секция Welcome +4":4,"(420) Секция Visiting +4":4,"(420) Секция Explore +4":4,"(420) Секция Video +4":4,"(420) Секция Gallery +4":4,"(420) Секция Tickets +4":4,"(420) Форма покупки билетов +4":4,"(420) Секция Contacts +4":4,"(420) Блок footer +4":4,"Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +6":6,"При изменении ширины экрана плавно изменяются размеры: слайдера в секции Welcome +2":2,"При изменении ширины экрана плавно изменяются размеры: слайдера сравнения изображений в секции Explore +2":2,"При изменении ширины экрана плавно изменяются размеры: кастомного видеоплеера в секции Video +2":2,"При изменении ширины экрана плавно изменяются размеры: слайдера в секции Video +2":2,"При изменении ширины экрана плавно изменяются размеры: YouTube-видео в плейлисте в секции Video, маленькие видео выровнены по краям большого +2":2,"При изменении ширины экрана плавно изменяются размеры: галереи изображений и изображений в ней +2":2,"При изменении ширины экрана плавно изменяются размеры: карты +2":2,"На ширине экрана 1024рх и меньше реализовано адаптивное меню +12":12,"при нажатии на бургер-иконку меню появляется, плавно выдвигаясь слева, бургер-иконка изменяется на крестик. При нажатии на крестик меню исчезает, плавно возвращаясь назад, иконка крестика превращается в бургер-иконку +2":2,"ссылки в меню работают, обеспечивая плавную прокрутку по якорям +2":2,"при клике по ссылке в адаптивном меню, или при клике по любому месту сайта, кроме самого адаптивного меню, меню закрывается +2":2,"вёрстка меню соответствует макету на всех проверяемых разрешениях +6":3,"Оптимизация скорости загрузки страницы +8":0},m=0;for(let e of Object.entries(b))console.log(e[1]+"\t"+e[0]),m+=e[1];console.table("Total result: "+m)})()})();