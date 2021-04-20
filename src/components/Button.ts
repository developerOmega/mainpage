import Component from './Component';

export default class Button extends Component {
  constructor(html:HTMLElement) {
    super(html)
  }

  public activateHtml () : void {
    // Activar objeto
    // leer parametros -> boton, clase if, clase else
    this.activateObject(this.html, "button_menu button_activate", "button_menu" );
    return;
  }
}