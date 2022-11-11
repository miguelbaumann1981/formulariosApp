import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, 
  {
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  }
  )

  get emailErrorMsg(): string {
    const errores = this.miFormulario.get('email')?.errors;
    if (errores?.['required']) {
      return 'El correo es obligatorio';
    } else if (errores?.['required']) {
      return 'El formato del correo no es válido';
    } else if (errores?.['emailTomado']) {
      return 'El correo ya existe';
    }
    return '';
  }

  constructor( private fb: FormBuilder, private validatorService: ValidatorService, private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fer Herrera',
      email: 'test1@test.com',
      username: 'Baumann',
      password: '123456',
      password2: '123456'
    });
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
