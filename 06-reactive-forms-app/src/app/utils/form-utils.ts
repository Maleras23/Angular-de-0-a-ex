import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";



export class FormUtils {

  // Expresiones Regulares

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
}
