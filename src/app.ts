import "./styles/app.scss";
import Menu from "./components/Menu";
import Button from "./components/Button";
import Slider from "./components/Slider";
import data from './data';

// Tags de menu y boton
const container:any = document.querySelector('#menu');
const button:any = document.querySelector('#button_menu');
const mainTag:any = document.querySelector('#main');

// Instancias de menu y boton
const menu: Menu = new Menu(container, mainTag);
const buttonIns:Button = new Button(button)

// Evento de boton para invocar el menu
button.addEventListener("click", () => {
  menu.activateHtml();
  buttonIns.activateHtml();
} );


// Tag de slider
const sliderTag:any = document.querySelector('#slider');
 
// Definir instancia de slider
const slider:Slider = new Slider(sliderTag, data);
slider.activeTransition(10000);
