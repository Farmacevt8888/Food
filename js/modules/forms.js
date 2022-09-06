function forms() {
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
            });
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
}

module.exports = forms;