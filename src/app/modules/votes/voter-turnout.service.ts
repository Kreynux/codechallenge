import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VoterTurnoutService {
    private scbUrl = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/ME/ME0104/ME0104D/ME0104T4";
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
    };
    private apiQuery = {
      "query": [{
          "code": "ContentsCode",
          "selection": {
          "filter": "item",
          "values": ["ME0104B8"]}
      },{
          "code": "Region",
          "selection": {
          "filter": "All",
          "values": ["*"]}}],
      "response": {
        "format": "json"
      }
    };
    
    constructor(private http: HttpClient) { }
    
    getVoters(){
      return this.http.get(this.scbUrl, this.httpOptions)
        .pipe(
            map(data=>data['variables'][0]),
            catchError(this.handleError('GET', []))
        );
    }
    
    getVoterTurnout(){
      return this.http.post(this.scbUrl, this.apiQuery, this.httpOptions)
        .pipe(
            map(data=>data['data']),
            catchError(this.handleError('POST', []))
        );
    }
    
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: HttpErrorResponse): Observable<T> => {
        if (error.error instanceof Error) {
          console.error(`An error occurred: ${error.error.message}`);
        } else {
          console.error(`${operation} failed: Backend returned ${error.error.message} ${error.error}`);
        }
        return of(result as T);
      };
    }
}
