import Component from "./Component"; 

export default class Menu extends Component {

  constructor(html:HTMLElement) {
    super(html)
  }

  public activateHtml () : void {
    // Activar menu
    // leer parametros -> menu, clase if, clase else
    this.activateObject(this.html, "menu menu_activate", "menu menu_inactive" );
    return;
  }
}