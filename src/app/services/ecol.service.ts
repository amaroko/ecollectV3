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

  getptps(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/ptps?filter[where][accnumber]=' + accnumber + '&filter[order]=actiondate DESC');
  }

  searchwoffstory(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/writeoffstory?filter[where][accnumber]=' + accnumber);
  }

  s_check_account_plans(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_accounts?filter[where][accnumber]=' + accnumber);
  }

  single_s_plans(planid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plans/' + planid);
  }

  getpermissions(role_id: string) {
    return this.httpClient.get<any>(environment.api + '/api/permissionsettings?filter[where][role_id]=' + role_id);
  }

  getcardAccount(cardacct) {
    // tslint:disable-next-line:max-line-length/qall
    return this.httpClient.get<any>(environment.api + '/api/tcards?filter[where][cardacct]=' + cardacct);
  }

  getWatchcardAccount(cardacct) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_watch_stage?filter[where][cardacct]=' + cardacct);
  }

  totalnotes(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/notehis/total?custnumber=' + custnumber);
  }

  getfileshistory(custnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/uploads?filter[where][custnumber]=' + custnumber + '&filter[order]=stagedate desc');
  }

  allteles(custnumber) {
    return this.httpClient.get<any>(environment.nodeapi + '/teles/all?custnumber=' + custnumber);
  }

  totalguarantors(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/guarantordetails/total?custnumber=' + custnumber);
  }

  totalcontacts(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/teles/total?custnumber=' + custnumber);
  }

  totalcollaterals(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/deptcollateral/total?custnumber=' + custnumber);
  }

  getAccount(accnumber) {
    // tslint:disable-next-line:max-line-length
    // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tqall?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
  }

  getmcoopcashAccount(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/mcoopcash_stage?filter[include]=mcoopcash_static&filter[where][loanaccnumber]=' + accnumber);
  }

  getwatch(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/watch_stage/' + accnumber);
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

