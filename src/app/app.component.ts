import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from './service/date-validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HN Datepicker';
  MydateForm: FormGroup;
  todate: any
  constructor(
    private formBuilder: FormBuilder,
  ){

  }

  ngOnInit(){
    this.dateForm();
    this.todate = new Date();
  }

  /************************ Date Forms *******************/
  dateForm(){
    this.MydateForm = this.formBuilder.group({
      singledate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      singledateone: new FormControl(''),
      singleFromdate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      singleFromdateone: new FormControl(''),
      singleTodate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      singleTodateone: new FormControl(''),
      maxsingleFromdate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      maxsingleFromdateone: new FormControl(''),
      maxsingleTodate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      maxsingleTodateone: new FormControl(''),
      multidate: new FormControl('', Validators.required),
      multidateone: new FormControl(''),
      multidatetwo: new FormControl(''),
    });
  }
}
