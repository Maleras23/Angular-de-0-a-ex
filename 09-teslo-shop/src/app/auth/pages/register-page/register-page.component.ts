import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {

  fb = inject(FormBuilder);
  hasError = signal(false);
  registerSuccess = signal(false)
  isPosting = signal(false);

   router = inject(Router)

    authService = inject(AuthService);



  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern('([a-zA-Z]+) ([a-zA-Z]+)')]],
    email: [ '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSudmit(){
    if( this.registerForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    }

     const { fullName = '', email = '', password = ''} = this.registerForm.value;

     this.authService.register(fullName!, email!, password!).subscribe((isAuthenticated) => {
      if(isAuthenticated){
        this.registerSuccess.set(true)
        setTimeout(() =>{
          this.registerSuccess.set(false)
          this.router.navigateByUrl('/auth/login')
          return;
        },3000)
      }
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
     })
  }
 }
