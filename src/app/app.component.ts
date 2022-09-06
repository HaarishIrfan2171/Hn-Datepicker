import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from './service/date-validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HN Datepicker';
  MydateForm: FormGroup;
  todate: any;
  maxdate: any;
  constructor(
    private formBuilder: FormBuilder,
  ){

  }

  ngOnInit(){
    this.dateForm();
    this.todate = new Date();
    this.maxdate = new Date(Number(new Date().getFullYear())+1,11,31);
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
      dateFormArray: new FormArray([
        this.dateformArray([])
      ]),
      multiDatepickerArray: new FormArray([
        this.multidateFormArray([])
      ])
    });
  }

  dateformArray(date){
    return this.formBuilder.group({
      singledate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      singledateone: new FormControl(''),
      singleFromdate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      singleFromdateone: new FormControl('', Validators.required),
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

  multidateFormArray(date){
    return this.formBuilder.group({
      multiFromdate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      multiFromdateone: new FormControl(''),
      multiFromdatetwo: new FormControl(''),
      multiTodate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      multiTodateone: new FormControl(''),
      multiTodatetwo: new FormControl(''),
      maxmultiFromdate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      maxmultiFromdateone: new FormControl(''),
      maxmultiFromdatetwo: new FormControl(''),
      maxmultiTodate: new FormControl('', [Validators.required,DateValidator.dateVaidator]),
      maxmultiTodateone: new FormControl(''),
      maxmultiTodatetwo: new FormControl(''),
    });
  }

  addMore(){
    const controls = <FormArray>this.MydateForm.get('dateFormArray');
    if(controls.valid){
      controls.push(this.dateformArray([]))
    }
    else{
      controls.markAllAsTouched();
    }
  }
}
