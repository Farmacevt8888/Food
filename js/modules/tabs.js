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

export default tabs;