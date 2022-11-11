import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal', Validators.required],
      ['Strand', Validators.required]
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArray() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private fb: FormBuilder ) { }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) {
      return;
    }
   
    // this.favoritosArray.push( new FormControl(this.nuevoFavorito.value, Validators.required) );
    this.favoritosArray.push( this.fb.control(this.nuevoFavorito.value, Validators.required) );
    this.nuevoFavorito.reset();
  }

  borrar(index: number) {
    this.favoritosArray.removeAt(index);
  }

}
