import Component from "./Component"; 

export default class Menu extends Component {

  protected htmlMain:HTMLElement;

  constructor(html:HTMLElement, htmlMain: HTMLElement) {
    super(html)
    this.htmlMain = htmlMain;
  }

  public activateHtml () : void {
    // Activar menu
    // leer parametros -> menu, clase if, clase else
    this.activateObject(this.html, "menu menu_activate", "menu menu_inactive" );  
    this.htmlMain.className = this.htmlMain.className == 'main main_right' ? 'main main_left' : 'main main_right';
    return;
  }
}