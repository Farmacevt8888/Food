'use strict';
// alert('НЕ забудь подключить JSON-сервер: npx json-server db.json');
window.addEventListener('DOMContentLoaded', () => {
   const tabs = require('./modules/tabs'),
      modal = require('./modules/modal'),
      timer = require('./modules/timer'),
      cards = require('./modules/cards'),
      calc = require('./modules/calc'),
      forms = require('./modules/forms'),
      slider = require('./modules/slider');

      tabs();
      modal();
      timer();
      cards();
      calc();
      forms();
      slider();

});