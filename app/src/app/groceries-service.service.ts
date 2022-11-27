import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {
  items: any = [];

  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  baseURL = 'http://localhost:8080';

  constructor(public http: HttpClient) {
    console.log('Hello InputDialogServiceService');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData),
     // catchError(this.handleError)
      );
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = '${error.status} - ${error.statusText || \'\'} ${err}';
    } else {

      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    //return Observable.throw(errMsg);
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  removeItem(id) {
    console.log('#### Remove Item - id = ', id);
    this.http.delete(this.baseURL + '/api/groceries/' + id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });

  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  addItem(item) {
    this.http.delete(this.baseURL + '/api/groceries/' + item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  editItem(item, index) {
    console.log('Editing Item = ', item);
    // eslint-disable-next-line no-underscore-dangle
    this.http.delete(this.baseURL + '/api/groceries/' + item._id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }
}
