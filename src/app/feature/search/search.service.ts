import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {ServiceHelper} from '../helpers/service.helper';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {
  }

  getSearchResults(searchInput: string): Observable<any> {
    return this.http.get(`https://api.github.com/search/repositories?q=${searchInput}`).pipe(
      catchError(ServiceHelper.handleError));
  }

  getRepoDetails(repoUrl: string): Observable<any> {
    if (repoUrl) {
      return this.http.get(repoUrl).pipe(
        catchError(ServiceHelper.handleError));
    } else {
      return throwError('Repo url don\'t exists');
    }
  }
}
