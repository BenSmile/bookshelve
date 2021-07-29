import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  public signinForm: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private    authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.initForm();
  }

  private initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    const formValue = this.signinForm.value;
    const email = formValue.email;
    const password = formValue.password;

    this.authService.signinUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
