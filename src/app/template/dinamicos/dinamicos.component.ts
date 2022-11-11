import { Component } from '@angular/core';

interface Persona {
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito {
  id: any;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {


  persona: Persona = {
    nombre: 'Miguel',
    favoritos: [
      { id: 'a1', nombre: 'Pikachu'},
      { id: 'a2', nombre: 'Charizard'}
    ]
  }

  nuevoJuego: string = '';

  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length,
      nombre: this.nuevoJuego
    };

    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';
  }

  eliminar(index: number) {
    this.persona.favoritos.splice(index, 1);
  }


  guardar() {
    console.log('Formulario posteado');
  }

}
