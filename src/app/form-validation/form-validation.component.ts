import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {
  signinForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]/)]),
      "email": new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/[0-9]/)]),
      "select": new FormControl('fastes', Validators.required)
    })
  }
  onSubmit() {
    console.log(this.signinForm)
  }

}
