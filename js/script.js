'use strict';

window.addEventListener('DOMContentLoaded', () => {
   const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

   // TABS =============================================================================

   // функция скрывающая ненужные табы
   function hideTabsContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');

      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }


   // функция показывающая нужные табы
   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabsContent();
   showTabContent();

   // делегирование событий с обработчиком клика
   tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabsContent();
               showTabContent(i);
            }
         });
      }
   });

   //========================================================================================   

   // TIMER =============================================================================
   const deadline = '2022-08-15';

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

   setClock('.timer', deadline);

   // MODAL =============================================================================

   const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

   // функция открытия модального окна
   function openModal() {
      // modal.classList.add('show');
      // modal.classList.remove('hide');
      modal.classList.toggle('show');
      document.body.style.overflow = 'hidden'; // убираем скролл при открытии модального окна
      clearInterval(modalTimerId); // не открываем окно, если пользователь сам ешо открыл
   }

   modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });



   // функция закрытия модального окна
   function closeModal() {
      // modal.classList.add('hide');
      // modal.classList.remove('show');
      modal.classList.toggle('show');
      document.body.style.overflow = '';
   }

   modalCloseBtn.addEventListener('click', closeModal);

   // закрытие модального окна при клике на подложку
   modal.addEventListener('click', (e) => {
      if (e.target === modal) {
         closeModal();
      }
   });

   // закрытие модального окна по лавише ESC
   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
         closeModal();
      }
   });

   // появление модального окна через определенный промежуток времени
   const modalTimerId = setTimeout(openModal, 15000);

   // открытие модального окна при скролле до конца страницы
   function showModalByScroll(params) {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);

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
         this.transfer = 27;
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

   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container',
      'menu__item',
      'big'

   ).render();

   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню "Премиум"',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      14,
      '.menu .container',
      'menu__item',
      'big'

   ).render();

   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      21,
      '.menu .container',
      'menu__item',
      'big'

   ).render();



});

