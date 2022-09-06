function modal() {
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
}

module.exports = modal;