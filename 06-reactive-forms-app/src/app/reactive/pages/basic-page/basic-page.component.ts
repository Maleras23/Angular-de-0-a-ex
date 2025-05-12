import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  //  se crea una propiedad que va a tener como luce y las validaciones de ese formulario
  private formBuilder = inject(FormBuilder);

  formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)],/** Validadores sincronos*/ [] /** Validadores Asincronos sin uno solo nesecita una, y si son mas de uno se colocan en un arreglo []*/],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]] ,
  })
  // Esta es la forma tradicional
  // myForm = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  //? esta funcion hace que los errores del formulario se vean debajo de la caja de input solo cuando se tocan y se comete el error
  //? fue movida a un archivo particular para porder ser reutilizada en otra parte del codigo
  // isValidField( fielName: string ): boolean | null {
  //   return (
  //     this.myForm.controls[fielName].errors &&
  //     this.myForm.controls[fielName].touched
  //   );
  // }

  //? esta funcion hace que se muestre el mensaje del error cuando este se comete
  //? fue movida a un archivo particular para porder ser reutilizada en otra parte del codigo
  // getFieldError( fieldName: string): string | null {
  //   if ( !this.myForm.controls[fieldName] ) return null;

  //    esto contiene el objeto de los errores
  //   const errors = this.myForm.controls[fieldName].errors ?? {};

  //   esta es una forma de barrer todas las lleves del objeto un objeto
  //   for( const key of Object.keys(errors) ){
  //     switch( key ){
  //       case 'required':
  //         return 'Este campo es requerido';
  //       minlength es laq llave del objeto de ese error y requiredLength es una de las llaves que estan dentro del objeto minlength
  //       case 'minlength':
  //         return `Minimo de ${errors['minlength'].requiredLength} caracteres.`

  //       case 'min':
  //         return `Minimo de ${errors['min'].min}`
  //     }
  //   }
  //   return null
  // }

  // Esta funcion hace que cuando hagamos click en guardar se verifique si el formulario es valido y si no lo es aparescan los errores hace como resetear el formulario si este valido
  onSave(){
    if ( this.myForm.invalid){
      // si el formulario no es valido se marcan todos los campos como tocados lo que hace que se activen los errores
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    // vuelve el formulario a su estado original
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
