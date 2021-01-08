import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EcolService} from '../../services/ecol.service';
import {environment} from '../../../environments/environment';

const ADLOGIN = environment.adlogin;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  valForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  data: any;
  menuArray = ['Home'];

  constructor(
    fb: FormBuilder,
    public ecolService: EcolService,
    public router: Router,
    private route: ActivatedRoute) {
    this.valForm = fb.group({
      // 'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    // console.log(value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.valForm.invalid) {
      return;
    }

    this.loading = true;
    /*for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
        console.log('Valid!');
        console.log(value);
    }*/
    // AD login login
    if (ADLOGIN) {
      const body = {
        username: (value.username).toLowerCase(),
        password: value.password
      };
      this.ecolService.auth(body).subscribe(response => {

        if (response.auth) {
          // get user
          this.getuser(value.username, value.password);
        } else {
          this.error = 'Wrong username and/or password';
          this.loading = false;
        }
      }, error => {
        console.log(error);
        this.error = 'Error during login';
        this.loading = false;
      });
    } else { // local ecollect
      this.getuser((value.username).toLowerCase(), value.password);
    }
  }

  ngOnInit() {
    // reset login status
    this.ecolService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  getuser(username, password) {
    this.ecolService.login(username).subscribe(user => {
      if (user.length > 0) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        // get user permissions
        this.ecolService.getpermissions(user[0].ROLE).subscribe(permission => {
          // console.log(permission);
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('currentUser', JSON.stringify(user[0]));
          localStorage.setItem('userpermission', JSON.stringify(permission));
          localStorage.setItem('profile', '1');

          sessionStorage.setItem('currentUser', JSON.stringify(user[0]));
          sessionStorage.setItem('userpermission', JSON.stringify(permission));
          sessionStorage.setItem('profile', '1');
          // this.router.navigate([this.returnUrl]);
          this.router.navigate([this.returnUrl]);
          // this.router.navigate(['/home'], { skipLocationChange: true }).then(() => {
          //   // do whatever you need after navigation succeeds
          // });
          // this.router.navigate(['/home']).then(() => {
          //   // do whatever you need after navigation succeeds
          // });
        });
        //
      } else {
        this.error = 'User not created on E-Collect';
        this.loading = false;
      }

      // return user;
    }, error => {
      console.log(error);
      if (error.statusText === 'Not Found') {
        this.error = 'User not created on E-Collect';
        this.loading = false;
      } else {
        this.error = 'Error during login';
        this.loading = false;
      }
    });
  }
}
