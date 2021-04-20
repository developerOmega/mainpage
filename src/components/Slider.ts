import DataFile from '../interfaces/DataFile';
import Node from '../interfaces/Node';

export default class Slider {
  protected __html:HTMLElement;
  protected __data:DataFile[];
  
  protected __node:Node|any = null;
  private first:Node|any = null;

  constructor(html:HTMLElement, data:DataFile[]) {
    this.__html = html;
    this.__data = data;

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

  public activeTransition(time:number) {
    this.__node = this.__node.next;

    // Crear contenedor de imagen principal e informacion de slider
    const inSection:HTMLElement = this.createSection(this.__node.data.img, (html:HTMLElement) => {
      const infoDiv = document.createElement("div");
      infoDiv.className = 'info';
      infoDiv.innerHTML = `<p> ${this.__node.data.description} </p>`;
      html.appendChild(infoDiv);
    });
    this.__html.appendChild(inSection);

    setInterval(() => {
      this.__node = this.__node.next;

      // Crear nueva imagen de slider
      const afterSection:HTMLElement = this.createSection(this.__node.data.img);
      this.__html.appendChild(afterSection);

      // Agregra clases in y after
      this.activateClass(inSection, "cont in");
      this.activateClass(afterSection, "cont after");

      // Esperar dos segundos para remplazar imagen principal
      setTimeout(() => {
        // Remplazar imagen principal por la nueva imagen
        const image = inSection.children[0]; 
        image.setAttribute('src', this.__node.data.img);

        // Cambiar descripcion de imagen de slider
        const description = inSection.children[1].children[0]; 
        description.innerHTML = this.__node.data.description;
        
        this.__html.removeChild(afterSection);
      }, 2000);
      
      // Terminar animacion para desactivar clase in y after
      setTimeout(() => {
        this.activateClass(inSection, "cont");
      }, 3000);

    }, time);
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