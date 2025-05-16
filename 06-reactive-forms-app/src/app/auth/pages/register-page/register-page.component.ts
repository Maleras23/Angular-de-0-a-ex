import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})

export class RegisterPageComponent {

  private fb = inject(FormBuilder);

  formUtil = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern( this.formUtil.namePattern)]],
    email: ['', [Validators.required, Validators.pattern( this.formUtil.emailPattern)], [FormUtils.checkingServerResponse] ],
    userName: ['', [Validators.required, Validators.minLength(6), Validators.pattern( this.formUtil.notOnlySpacesPattern), FormUtils.noStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', Validators.required]
  }, {
    validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  // isFieldOneEqualFieldTwo(field1: string, field2: string){
  //   return ( FormGroup: AbstractControl ) => {
  //     const field1Value = FormGroup.get(field1)?.value;
  //     const field2Value = FormGroup.get(field2)?.value;

  //     return  field1Value === field2Value ? null : { passwordNotEqual: true}
  //   }
  // }

  onSubmit(){
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value)

  }

}
