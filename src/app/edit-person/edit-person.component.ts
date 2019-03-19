import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {Person} from "../personmodel/personmodel";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {ApiService} from "../apiservice/api.service";

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  person: Person;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let personId = window.sessionStorage.getItem("editPersonId");
    if(!personId) {
      alert("Invalid action.")
      this.router.navigate(['list-person']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
           username: ['', Validators.required],
           password: ['', Validators.required],
           name: ['', Validators.required],
           surname: ['', Validators.required],
           email: ['', Validators.required],
           amount: ['', Validators.required],
           termInMonth: ['', Validators.required],
           rateDaily: ['', Validators.required]
         });
    this.apiService.getPersonById(+personId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.apiService.updatePerson(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
            alert('Person updated successfully.');
            this.router.navigate(['list-person']);
        },
        error => {
          alert(error);
        });
  }

}
