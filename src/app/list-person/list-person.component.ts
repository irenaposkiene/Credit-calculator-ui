import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {Person} from "../personmodel/personmodel";
import {ApiService} from "../apiservice/api.service";

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit {

  persons: any;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if(!window.sessionStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    this.apiService.getPersons()
      .subscribe( data => {
        console.log(data)
          this.persons = data;
      });
  }

  deletePerson(person: Person): void {
    this.apiService.deletePerson(person.pid)
      .subscribe( data => {
        debugger
        this.persons = this.persons.filter(u => u !== person);
      })
  };

  editPerson(person: Person): void {
    window.sessionStorage.removeItem("editPersonId");
    window.sessionStorage.setItem("editPersonId", person.pid.toString());
    this.router.navigate(['edit-person']);
  };

  addPerson(): void {
    this.router.navigate(['add-person']);
  };
}
