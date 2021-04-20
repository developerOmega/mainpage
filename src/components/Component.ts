export default class Component {
  // Propiedad protegida para activar tags
  protected __activate:boolean = false;

  // Propiedad protegida de tag html
  protected __html:HTMLElement;
  
  constructor (html: HTMLElement) {
    this.__html = html;
  }

  // Metodo getter de prop html
  public get html() : HTMLElement {
    return this.__html;
  }

  // Metodo getter de prop activate
  public get activate () {
    return this.__activate;
  }

  // Metodo setter de prop activate
  public setActivate (data:boolean) {
    this.__activate = data;
  }

  // Metodo para activar html
  public activateHtml () : void {
    return;
  }

  // Methodo dinamico para activar objeto html
  // recibe parametros -> 
  //    obj:HtmlElement (Objeto html), 
  //    classIf:string (className en caso if), 
  //    classElse:string (ClassName en caso else )
  protected activateObject (obj:HTMLElement, classIf:string = "", classElse:string = "") {
    // En caso de que el menu este desactivado, activarlo; en caso de que este activado, desactivarlo 
    const isActive: boolean = this.__activate == false ? true : false;
    this.setActivate(isActive);

    // Si el menu esta activado, agregar classIf a clase de tag, en caso contrario agregra el classElse 
    if(this.activate == true) {
      obj.className = classIf;
    }
    else {
      obj.className = classElse
    }
  }
}