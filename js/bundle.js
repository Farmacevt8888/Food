/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
   // =====================================CALCULATOR===============================================

   const result = document.querySelector('.calculating__result span');

   let sex, height, weight, age, ratio;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }

   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
   }

   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.classList.remove(activeClass);
         if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
         }
         if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
         }
      });
   }

   initLocalSettings('#gender div', 'calculating__choose-item_active');
   initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = '____'; // Можете придумать что угодно
         return;
      }
      if (sex === 'female') {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }

   calcTotal();

   function getStaticInformation(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
               ratio = +e.target.getAttribute('data-ratio');
               localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', e.target.getAttribute('id'));
            }

            elements.forEach(elem => {
               elem.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcTotal();
         });
      });
   }

   getStaticInformation('#gender div', 'calculating__choose-item_active');
   getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

   function getDynamicInformation(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {

         // если пользователь ввел не число
         if (input.value.match(/\D/g)) {
            input.style.color = 'red';
            input.style.border = '1px solid red';
         } else {
            input.style.color = 'black';
            input.style.border = 'none';
         }

         switch (input.getAttribute('id')) {
            case "height":
               height = +input.value;
               break;
            case "weight":
               weight = +input.value;
               break;
            case "age":
               age = +input.value;
               break;
         }

         calcTotal();
      });
   }

   getDynamicInformation('#height');
   getDynamicInformation('#weight');
   getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
   // используем классы для карточек

   class MenuCard {
      constructor(src, alt, title, descr, price, paretnSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(paretnSelector);
         this.transfer = 40;
         this.changeToUAH();
      }

      changeToUAH() {
         this.price = this.price * this.transfer;
      }

      render() {
         const element = document.createElement('div');

         // устанавливаем класс по умолчанию
         if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }

         element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
      `;
         this.parent.append(element);
      }
   }

   (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
      .then(data => {
         data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
         }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
         });
      });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
   //=========================================FORMS====================================================================

   const forms = document.querySelectorAll(formSelector);
   const message = {
      loading: 'icons/modal/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };

   // подвязываем под формы функцию postData
   forms.forEach(item => {
      bindPostData(item);
   });

   

   //функция отвечающая за привязку постинга
   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault(); //сбрасываем значениея браузера поумолчанию

         //создание нового блока с сообщением после отправки данных
         let statusMessage = document.createElement('img'); // создаем блок с сообщением
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
       `; //выводим спинер загрузки
         form.insertAdjacentElement('afterend', statusMessage); // добавляем спинер под форму в верстку


         //отправка данных с помощью fetch ------------------------------------------------


         //отпарвка formData..............................................................................
         // const formData = new FormData(form);

         // fetch('server.php', {
         //       method: "POST",
         //       body: formData
         //    })
         //    .then(data => data.text())
         //    .then(data => {
         //       console.log(data);
         //       showThanksModal(message.success); // выводим сообщение 'Спасибо! Скоро мы с вами свяжемся'
         //       statusMessage.remove(); // убираем сообщение о загрузке

         //    })
         //    .catch(() => {
         //       showThanksModal(message.failure); // выводим сообщении об ошибке
         //    })
         //    .finally(() => {
         //       form.reset(); // очищаем форму после отправки
         //    })
         //.....................................................................................



         //отправка JSON файла............................................................
         const formData = new FormData(form);

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(message.success); // выводим сообщение 'Спасибо! Скоро мы с вами свяжемся'
               statusMessage.remove(); // убираем сообщение о загрузке

            })
            .catch(() => {
               showThanksModal(message.failure); // выводим сообщении об ошибке
            })
            .finally(() => {
               form.reset(); // очищаем форму после отправки
            });
         //................................................................................................................

      });
      //---------------------------------------------------------------------------------------
   }

   // окно-сообщение
   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog'); // получаем блок "modal__dialog"

      prevModalDialog.classList.add('hide'); // скрываем предыдущий диалог
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); // открываем модальное окно

      const thaksModal = document.createElement('div'); // создаем новый блок-обвертку
      thaksModal.classList.add('modal__dialog'); // присваеваем ему класс
      thaksModal.innerHTML = `
       <div class="modal__content">
          <div class="modal__close" data-close>×</div>
          <div class="modal__title">${message}</div>
       </div>
    `;

      document.querySelector('.modal').append(thaksModal); // добавляем наш новый блок в modal
      // убираем новый блок через заданное время и возвращаем блок отправки формы
      setTimeout(() => {
         thaksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
      }, 4000);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
 // функция открытия модального окна
 function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // убираем скролл при открытии модального окна

    console.log(modalTimerId);

    if (modalTimerId) {
       clearInterval(modalTimerId); // не открываем окно, если пользователь сам ешо открыл
    }

 }

 // функция закрытия модального окна
 function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
 }

 function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector),
       modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
       btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });



    // закрытие модального окна при клике на подложку или крестик
    modal.addEventListener('click', (e) => {
       if (e.target === modal || e.target.getAttribute('data-close') == '') {
          closeModal(modalSelector);
       }
    });

    // закрытие модального окна по лавише ESC
    document.addEventListener('keydown', (e) => {
       if (e.code === "Escape" && modal.classList.contains('show')) {
          closeModal(modalSelector);
       }
    });

    // открытие модального окна при скролле до конца страницы
    function showModalByScroll() {
       if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
          openModal(modalSelector, modalTimerId);
          window.removeEventListener('scroll', showModalByScroll);
       }
    }

    window.addEventListener('scroll', showModalByScroll);
 }

 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);
 
 

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
   container,
   slide,
   nextArrow,
   prevArrow,
   totalCounter,
   currentCounter,
   wrapper,
   field
}) {
   //===============================SLIDER==============================================

   const slides = document.querySelectorAll(slide),
      slider = document.querySelector(container),
      prev = document.querySelector(prevArrow),
      next = document.querySelector(nextArrow),
      total = document.querySelector(totalCounter),
      current = document.querySelector(currentCounter),
      slidesWrapper = document.querySelector(wrapper),
      slidesField = document.querySelector(field),
      width = window.getComputedStyle(slidesWrapper).width;

   let slideIndex = 1;
   let offset = 0;

   //----------slider-couruselle-------------
   slidesField.style.width = 100 * slides.length + '%';
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all';

   slidesWrapper.style.overflow = 'hidden';

   if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
   } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
   }

   slides.forEach(slide => {
      slide.style.width = width;
   });

   //--------------------slider-dots----------------------------------
   slider.style.position = 'relative';

   const indicstors = document.createElement('ol'),
      dots = [];

   indicstors.classList.add('carousel-indicators');
   indicstors.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`;
   slider.append(indicstors);

   for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
   box-sizing: content-box;
   flex: 0 1 auto;
   width: 30px;
   height: 6px;
   margin-right: 3px;
   margin-left: 3px;
   cursor: pointer;
   background-color: #fff;
   background-clip: padding-box;
   border-top: 10px solid transparent;
   border-bottom: 10px solid transparent;
   opacity: .5;
   transition: opacity .6s ease;
`;

      if (i == 0) {
         dot.style.opacity = 1;
      }
      indicstors.append(dot);
      dots.push(dot);
   }

   //--------------------------------------------------------

   function switchingDots(e) {
      e.forEach(dot => dot.style.opacity = '0.5');
      e[slideIndex - 1].style.opacity = 1;
   }

   function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
   }

   next.addEventListener('click', () => {
      if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += +width.replace(/\D/g, '');
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
         slideIndex = 1;
      } else {
         slideIndex++;
      }

      if (slides.length < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }

      switchingDots(dots);

   });

   prev.addEventListener('click', () => {
      if (offset == 0) {
         offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
         offset -= deleteNotDigits(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
         slideIndex = slides.length;
      } else {
         slideIndex--;
      }

      if (slides.length < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }

      switchingDots(dots);

   });

   // showSlides(slideIndex);

   // if (slides.length < 10) {
   //    total.textContent = `0${slides.length}`;
   // } else {
   //    total.textContent = slides.length;
   // }

   // function showSlides(n) {
   //    if (n > slides.length) {
   //       slideIndex = 1;
   //    }

   //    if (n < 1) {
   //       slideIndex = slides.length;
   //    }

   //    slides.forEach(item => item.style.display = 'none');

   //    slides[slideIndex - 1].style.display = 'block';

   //    if (slides.length < 10) {
   //       current.textContent = `0${slideIndex}`;
   //    } else {
   //       current.textContent = slideIndex;
   //    }
   // }

   // function plusSlides(n) {
   //    showSlides(slideIndex += n);
   // }

   // prev.addEventListener('click', ()=>{
   //    plusSlides(-1);
   // });
   // next.addEventListener('click', ()=>{
   //    plusSlides(1);
   // });

   // создаем активность для точек слайдера
   dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');

         slideIndex = slideTo;
         offset = deleteNotDigits(width) * (slideTo - 1);

         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
         } else {
            current.textContent = slideIndex;
         }

         switchingDots(dots);
      });
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
   // TABS =============================================================================

   let tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentSelector),
      tabsParent = document.querySelector(tabsParentSelector);

   // функция скрывающая ненужные табы
   function hideTabsContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');

      });

      tabs.forEach(item => {
         item.classList.remove(activeClass);
      });
   }


   // функция показывающая нужные табы
   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);
   }

   hideTabsContent();
   showTabContent();

   // делегирование событий с обработчиком клика
   tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabsContent();
               showTabContent(i);
            }
         });
      }
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
   // TIMER =============================================================================

   // получаем разницу между датами
   function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date());

      if (t <= 0) {
         days = 0; // подставляем "0", если время прошло
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
      }



      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   // функция добавления "0", перед числом, которое из одной цифры
   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   // функция добавления таймера на страницу
   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);

      updateClock(); // запускаем функцию вручную, чтоб не подставлялась шаблонная дата (убираем мигание)
      // функция обновления таймера каждую секунду
      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
//создаем функцию postData отвечающую за постинг данных
const postData = async (url, data) => {
   const res = await fetch(url, {
      method: "POST",
      headers: {
         'Content-type': 'application/json'
      },
      body: data
   });

   return await res.json();
};

// функция получения данных с сервера
   async function getResource(url) {
      let res = await fetch(url);
      //устанавливаем вручную показ ошибки, если что-то пойдет не так
      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
   }

   

   // axios.get('http://localhost:3000/menu')
   //    .then(data => {
   //       data.data.forEach(({
   //          img,
   //          altimg,
   //          title,
   //          descr,
   //          price
   //       }) => {
   //          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
   //       });
   //    });

   




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");










window.addEventListener('DOMContentLoaded', () => {
   // появление модального окна через определенный промежуток времени
   const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 300000);

   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-10-01');
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
      container: '.offer__slider',
      slide: '.offer__slide',
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current',
      wrapper: '.offer__slider-wrapper',
      field: '.offer__slider-inner'
   });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map