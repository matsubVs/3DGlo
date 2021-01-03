"use sctric";

import countTimer from './modules/countTimer';
import createDots from './modules/createDots';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePhoto from './modules/changePhoto';
import inputValidation from './modules/inputValidation';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//Timer
countTimer('10 march 2021');

// Create Dots
createDots();

// Menu
toggleMenu();

//Popup
togglePopup();

// tabs
tabs();

//slider
slider();

// change photo
changePhoto();

// validation
inputValidation();

//calculator
calc();

//send-ajax-form
sendForm();
