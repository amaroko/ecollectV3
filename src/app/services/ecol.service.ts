import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EcolService {

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  ifLogged() {
    if (!localStorage.getItem('currentUser')) {
      /*swal({
        title: 'You\'re Not Logged In',
        imageUrl: 'assets/img/user/notlogg.png',
        text: 'Kindly, log in to continue!',

        confirmButtonColor: '#7ac142',
        confirmButtonText: 'Okay'
      });*/
      this.router.navigate(['/login']);
      return false;
    }
  }

  ifclosed() {
    if (!sessionStorage.getItem('currentUser')) {
      /*swal({
        title: 'You\'re Not Logged In',
        imageUrl: 'assets/img/user/notlogg.png',
        text: 'Kindly, log in to continue!',

        confirmButtonColor: '#7ac142',
        confirmButtonText: 'Okay'
      });*/
      this.router.navigate(['/login']);
      return false;
    }
  }


  getpermissions(role_id: string) {
    return this.httpClient.get<any>(environment.api + '/api/permissionsettings?filter[where][role_id]=' + role_id);
  }

  login(username: string) {
    return this.httpClient.get<any>(environment.api + '/api/tblusers/search?username=' + username);
  }

  logout() {
    //  remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accountInfo');
    localStorage.removeItem('userpermission');
    localStorage.removeItem('profile');

    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('accountInfo');
    sessionStorage.removeItem('userpermission');
    sessionStorage.removeItem('profile');
  }

  auth(body: object) {
    return this.httpClient.post<any>(environment.auth, body);
  }
}

