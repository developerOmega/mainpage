import DataFile from '../interfaces/DataFile';
import Node from '../interfaces/Node';

export default class SliderComponent {
  protected __html:HTMLElement;
  protected __data:DataFile[];
  
  protected __node:Node|any = null;
  private first:Node|any = null;
  
  constructor(html:HTMLElement, data:DataFile[]) {
    this.__data = data;
    this.__html = html;

    this.__data.forEach( dataFile => {
      this.addNode(dataFile);
    });

  }

  // Agregar nodos en cola
  protected addNode(data:DataFile) : void {
    const newNode:Node = {data, next: this.__node, back: this.__node};

    newNode.data = data;

    if(this.__node == null && this.first == null) {
      this.__node = this.first = newNode;
    }
    else {
      this.first.back = this.__node.next = newNode;
    }

    newNode.back = this.__node;
    newNode.next = this.first;
    this.__node = newNode;
  }


  public get html() : HTMLElement {
    return this.__html;
  }

  public get data() : DataFile[] {
    return this.__data;
  }

  public setData(file:DataFile) : void {
    this.__data.push(file);
    this.addNode(file);
  }

  // Activar animacion de transicion
  // Recibe parametros: time: number (tiempo de intervalo de espera), callback: function
  // Callback recibe parametros: inSection: HTMLelemment (Tag de slider principal),afterSection: HTMLelement (Tag secundario se slider) 
  protected activeTransition(time:number, callback: any) {
    this.__node = this.__node.next;

    // Crear contenedor de imagen principal e informacion de slider
    const inSection:HTMLElement = this.createSection(this.__node.data.img, (html:HTMLElement) => this.createInfoTag(html) );
    this.__html.appendChild(inSection);

    setInterval(() => {
      this.__node = this.__node.next;

      // Crear nueva imagen de slider
      const afterSection:HTMLElement = this.createSection(this.__node.data.img);
      this.__html.appendChild(afterSection);

      // Agregra clases in y after
      this.activateClass(inSection, "cont in");
      this.activateClass(afterSection, "cont after");

      callback(inSection, afterSection);

    }, time);
  }

  // Crear contenedor de imagen principal e informacion de slider
  // Recibe parametro: html: HTMLElement (Tag principal de slider)
  private createInfoTag(html: HTMLElement) {
  
    const infoDiv = document.createElement("div");
    infoDiv.className = 'info';
    infoDiv.innerHTML = `
      <p> ${this.__node.data.description} </p>
      <a class='${ this.__node.data.url == "" ? "btn b-red difum" : "btn b-red"}' href='${this.__node.data.url}'> Ver mas </a>
    `;
    html.appendChild(infoDiv);
  }
  

  // Crear secciones html para genetar imagenes
  // Recibe parametros -> img:string (path de la imagen), callback:function (en caso de agregar una nueva tag html)
  // Retorna elemento html
  protected createSection(img:string, callback?:any) : HTMLElement {
    
    // Crear elementos
    const section = document.createElement('div');
    const imgTag = document.createElement('img');
    
    // Crear atributos en los elementos
    imgTag.setAttribute('src', img)
    imgTag.className = "img";
    
    // Agregar imagen a tag padre
    section.appendChild(imgTag);

    // Si hay callback, ejecutarlo
    if(callback){
      callback(section);
    }

    return section;
  }

  protected activateClass(tag:HTMLElement, className:string) {
    tag.className = className;
  }
}