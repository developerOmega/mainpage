import SliderComponent from './SliderComponent';
import DataFile from '../interfaces/DataFile';

export default class Slider extends SliderComponent {
  protected url: HTMLElement;
  protected image: HTMLElement;
  protected description: HTMLElement;
  
  constructor(html:HTMLElement, data:DataFile[]) {
    super(html, data);

    this.url = document.createElement('div');
    this.image = document.createElement('img');
    this.description = document.createElement('div');
  }

  // Activar Slider
  // Recibe parametros: time: number (tiempo de intervalo de espera)
  public active(time:number) {
    
    // Activar transicion
    this.activeTransition(time, (inSection: HTMLElement, afterSection: HTMLElement) => {
      
      this.url = <HTMLElement> inSection.children[1].children[1]; 
      this.image = <HTMLElement> inSection.children[0];
      this.description = <HTMLElement> inSection.children[1].children[0];  

      // Difuminar url
      this.activateClass(this.url, this.__node.back.data.url == "" ? "btn b-red difum" : "btn b-red difum blur");

      // Esperar dos segundos para remplazar informacion e imagen
      setTimeout(() => this.changeData(inSection, afterSection) , 2000);
      
      // Terminar animacion para desactivar clase in y after
      setTimeout(() => this.activateClass(inSection, "cont") , 3000);

    });
  }

  // Remplazar infromacion de datos de slider
  // Recibe parametros: inSection: HTMLelemment (Tag de slider principal),afterSection: HTMLelement (Tag secundario se slider) 
  protected changeData(inSection: HTMLElement, afterSection: HTMLElement) {
    // Remplazar imagen principal por la nueva imagen
    this.image.setAttribute('src', this.__node.data.img);
   
    // Cambiar descripcion de imagen de slider
    this.description.innerHTML = this.__node.data.description;
           
    // Cambiar url de slider
    this.url.setAttribute('href', this.__node.data.url);
   
    // Enfocar link si existe url
    if(this.__node.data.url != "") { this.activateClass(this.url, "btn b-red focus"); }
   
    this.__html.removeChild(afterSection);
  }
}