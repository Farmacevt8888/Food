'use strict';
// alert('НЕ забудь подключить JSON-сервер: npx json-server db.json');
window.addEventListener('DOMContentLoaded', () => {

   // TABS =============================================================================

   let tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

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
   const deadline = '2022-10-15';

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
      modal = document.querySelector('.modal');

   modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });

   // функция открытия модального окна
   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden'; // убираем скролл при открытии модального окна
      clearInterval(modalTimerId); // не открываем окно, если пользователь сам ешо открыл
   }

   // функция закрытия модального окна
   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
   }

   // закрытие модального окна при клике на подложку или крестик
   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
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
   const modalTimerId = setTimeout(openModal, 300000);

   // открытие модального окна при скролле до конца страницы
   function showModalByScroll() {
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

   // функция получения данных с сервера
   // const getResource = async (url) => {
   //    const res = await fetch(url);
   //    //устанавливаем вручную показ ошибки, если что-то пойдет не так
   //    if (!res.ok) {
   //       throw new Error(`Could not fetch ${url}, status: ${res.status}`);
   //    }

   //    return await res.json();
   // };

   // getResource('http://localhost:3000/menu')
   //    .then(data => {
   //       data.forEach(({img, altimg, title, descr, price}) => {
   //          new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
   //       })
   //    });

   axios.get('http://localhost:3000/menu')
      .then(data => {
         data.data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
         }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
         })
      })

   //создание элемента на странице динамически (формирует верстку на лету) - этот метод применяеться, если нам нужно что-то построить один раз
   // getResource('http://localhost:3000/menu')
   //    .then(data => createCard(data));

   // function createCard(data) {
   //    data.forEach(({
   //       img,
   //       altimg,
   //       title,
   //       descr,
   //       price
   //    }) => {
   //       const element = document.createElement('div');
   //       price = price * 40;
   //       element.classList.add('menu__item');
   //       element.innerHTML = `
   //             <img src=${img} alt=${altimg}>
   //             <h3 class="menu__item-subtitle">${title}</h3>
   //             <div class="menu__item-descr">${descr}</div>
   //             <div class="menu__item-divider"></div>
   //             <div class="menu__item-price">
   //                <div class="menu__item-cost">Цена:</div>
   //                <div class="menu__item-total"><span>${price}</span> грн/день</div>
   //             </div>
   //       `;

   //       document.querySelector('.menu .container').append(element);
   //    });
   // }



   //=========================================FORMS====================================================================

   const forms = document.querySelectorAll('form');
   const message = {
      loading: 'icons/modal/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };

   // подвязываем под формы функцию postData
   forms.forEach(item => {
      bindPostData(item);
   });

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

         postData('http://localhost:3000/requests', json)
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
            })
         //................................................................................................................

      });
      //---------------------------------------------------------------------------------------
   }

   // окно-сообщение
   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog'); // получаем блок "modal__dialog"

      prevModalDialog.classList.add('hide'); // скрываем предыдущий диалог
      openModal(); // открываем модальное окно

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
         closeModal();
      }, 4000);
   }

   //===============================SLIDER==============================================

   const slides = document.querySelectorAll('.offer__slide'),
      slider = document.querySelector('.offer__slider'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
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

   next.addEventListener('click', () => {
      if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += +width.slice(0, width.length - 2);
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

      dots.forEach(dot => dot.style.opacity = '0.5');
      dots[slideIndex - 1].style.opacity = 1;

   });

   prev.addEventListener('click', () => {
      if (offset == 0) {
         offset = +width.slice(0, width.length - 2) * (slides.length - 1)
      } else {
         offset -= +width.slice(0, width.length - 2);
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

      dots.forEach(dot => dot.style.opacity = '0.5');
      dots[slideIndex - 1].style.opacity = 1;

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
         offset = +width.slice(0, width.length - 2) * (slideTo - 1);

         slidesField.style.transform = `translateX(-${offset}px)`;

         if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
         } else {
            current.textContent = slideIndex;
         }

         dots.forEach(dot => dot.style.opacity = '0.5');
         dots[slideIndex - 1].style.opacity = 1;
      });
   });


});