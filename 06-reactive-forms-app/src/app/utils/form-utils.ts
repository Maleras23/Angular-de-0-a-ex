import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep(){
  return new Promise(( resolve ) =>{
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}

export class FormUtils {
  // Expresiones Regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError (errors : ValidationErrors){
    for( const key of Object.keys(errors) ){
      switch( key ){
        case 'required':
          return 'Este campo es requerido';
        // minlength es laq llave del objeto de ese error y requiredLength es una de las llaves que estan dentro del objeto minlength
        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres.`
        case 'min':
          return `Minimo de ${errors['min'].min}`
        case 'email':
          return 'Correo Electronico no es valido'
        case 'emailTaken':
          return 'El c  orreo Electronico ya esta siendo usado por otro usuario'
        case 'userNametaken':
          return 'Nombre de usurario ya usado'
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El valor ingresado no luce como un correo electronico'
          } else if (errors['pattern'].requiredPattern !== FormUtils.namePattern) {
            return 'Debe de ser en formato de nombre y apellido'
          }
          return 'Error de patron contra expresion regular'
        default:
          return `Error de validacion no controlado ${key}`
      }
    }
    return null;
  }

  static isValidField( form: FormGroup, fielName: string ): boolean | null {
    return (
      !! form.controls[fielName].errors &&
      form.controls[fielName].touched
    )
  }

   static getFieldError( form:FormGroup, fieldName: string): string | null {
    if ( !form.controls[fieldName] ) return null;

    // esto contiene el objeto de los errores
    const errors = form.controls[fieldName].errors ?? {};

    // esta es una forma de barrer todas las lleves del objeto un objeto
    return FormUtils.getTextError( errors );
  }

  static isValidFieldInArray (formArray: FormArray, index: number){
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
   }

   static getFieldErrorInArray (formArray: FormArray, index: number){
      if ( formArray.controls.length === 0 ) return null;

    // esto contiene el objeto de los errores
    const errors = formArray.controls[index].errors ?? {};

    // esta es una forma de barrer todas las lleves del objeto un objeto
    return FormUtils.getTextError( errors );
   }

   static isFieldOneEqualFieldTwo(field1: string, field2: string){
    return ( FormGroup: AbstractControl ) => {
      const field1Value = FormGroup.get(field1)?.value;
      const field2Value = FormGroup.get(field2)?.value;

      return  field1Value === field2Value ? null : { passwordNotEqual: true}
    }
  }

  static async checkingServerResponse(controls: AbstractControl):Promise <ValidationErrors | null> {
    console.log('Validando contra servidor')
    await sleep(); // vamos a esperar 2 segundos y medio
    const formValue = controls.value;
    if ( formValue === 'hola@mundo.com'){
      return {
        emailTaken: true,
      }
    }
    return null;
  }

  static noStrider (control: AbstractControl):ValidationErrors | null{
    const formValue = control.value;
    if ( formValue === 'strider'){
      return {
        userNametaken: true,
      }
    }
    return null;
  }
}
