import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Medicine } from '../_models/medicine';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // Gets paginated list of users from DB
  getMedicines(page?, itemsPerPage?, searchParams?): Observable<PaginatedResult<Medicine[]>> {
    const paginatedResult: PaginatedResult<Medicine[]> = new PaginatedResult<Medicine[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (searchParams != null) {
      // searchParam logic
    }

    return this.http.get<Medicine[]>(this.baseUrl + 'medicine', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          console.log(paginatedResult);
          return paginatedResult;
        })
      );
  }
}
