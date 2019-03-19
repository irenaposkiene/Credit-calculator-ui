import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Person} from "../personmodel/personmodel";
import {Observable} from "rxjs/index";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/persons/';

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('client:secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post('http://localhost:8080/' + 'oauth/token', loginPayload, {headers});
  }

  getPersons() {
    return this.http.get(this.baseUrl + 'person?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  getPersonById(pid: number) {
    return this.http.get(this.baseUrl + 'person/' + pid + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  createPerson(person: Person){
    return this.http.post(this.baseUrl + 'person?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, person);
  }

  updatePerson(person: Person) {
    return this.http.put(this.baseUrl + 'person/' + person.pid + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, person);
  }

  deletePerson(pid: number){
    return this.http.delete(this.baseUrl + 'person/' + pid + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
}
