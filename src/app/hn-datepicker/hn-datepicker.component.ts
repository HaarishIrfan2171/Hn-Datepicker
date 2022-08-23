import { COMMA, ENTER, I } from '@angular/cdk/keycodes';
import { Component, Input, OnInit, Output, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { format } from 'date-fns';
import * as moment from 'moment';
import { distinctUntilChanged } from 'rxjs/operators';
import { DateValidator } from '../service/date-validator.service';


@Component({
  selector: 'app-hn-datepicker',
  templateUrl: './hn-datepicker.component.html',
  styleUrls: ['./hn-datepicker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HNDatepickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => HNDatepickerComponent),
      multi: true,
    },
  ],
})
export class HNDatepickerComponent implements OnInit {

  @Input() public name: string;
  @Input() public maximum: boolean = false;
  @Input() public minimum: boolean = false;
  @Input() public currentDate: boolean = false;
  @Input() public ifMultiRow: boolean = false;
  @Input() public ifSingle: boolean = false;
  @Input() public isRequired: boolean = false;
  @Input() public isValidation: boolean = false;
  @Input() public isfrom: boolean = false;
  @Input() public isto: boolean = false;
  @Input() public maximumValue: any[];
  @Input() public mininmumValue: any[];
  @Input() public formName: FormControl;
  @Input() public formNameOne: FormControl;
  @Input() public formNameTwo: FormControl;
  @Input() public formCtrName: any;
  @Input() public formCtrNameOne: any;
  @Input() public formCtrNameTwo: any;
  @Input() public multiformCtrName: any;
  @Input() public multiformCtrNameOne: any;
  @Input() public multiformCtrNameTwo: any;
  @Input() public formgroup: FormGroup;
  @Input() public formArray: FormArray;
  @Input() public Index: any;
  @Input() public toolTips: any;
  @Input() public toolTips1: any;
  @Input() public toolTips2: any;
  @Input() public toolTips3: any;
  @Input() public toolTips4: any;
  @Input() public lable: string;
  @Input() public class: any;
  @Input() public isMultiRowMultiDatePicker: boolean = false;
  @Input() public isSingleMultiDatePicker: boolean = false;

  @Output() pickedDate = new EventEmitter<any>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  newForm = new FormControl('');
  newFormOne = new FormControl('');
  newMutiltiPicker = new FormControl('');
  model: any = [];
  singleModel: any = [];
  public CLOSE_ON_SELECTED = false;
  @ViewChild('picker1', { static: true }) _picker: MatDatepicker<Date>;
  singleModels: any = [];
  models: any = [];
  constructor() { }

  ngOnInit(): void {
    if (this.ifSingle == true) {
      if (this.isRequired == true) {
        if (this.isSingleMultiDatePicker == true || this.isMultiRowMultiDatePicker == true) {
          this.formName.setValidators([Validators.required]);
          this.newMutiltiPicker.setValidators([Validators.required, DateValidator.dateVaidator]);
          this.newMutiltiPicker.updateValueAndValidity();
        }
        else if (this.ifSingle == true) {
          this.formName.setValidators([Validators.required, DateValidator.dateVaidator]);
          this.formNameOne.setValidators(Validators.required);
        }
        else{
          this.formName.setValidators(DateValidator.dateVaidator);
          this.newMutiltiPicker.setValidators(DateValidator.dateVaidator);
        }
      }

      // if (this.minimum == true) {
      //   if (this.isSingleMultiDatePicker == true || this.isMultiRowMultiDatePicker == true) {
      //     this.formName.setValidators([DateValidator.dateVaidator, DateValidator.dateMinVaidator]);
      //     this.newMutiltiPicker.setValidators([DateValidator.dateMinVaidator, DateValidator.dateVaidator]);
      //   }
      //   else {
      //     this.formName.setValidators([DateValidator.dateVaidator, DateValidator.dateMinVaidator]);
      //   }
      // }

      // if (this.maximum == true) {
      //   if (this.isSingleMultiDatePicker == true || this.isMultiRowMultiDatePicker == true) {
      //     this.formName.setValidators([DateValidator.dateVaidator, DateValidator.dateMaxVaidator]);
      //     this.newMutiltiPicker.setValidators([DateValidator.dateMaxVaidator, DateValidator.dateVaidator]);
      //   }
      //   else {
      //     this.formName.setValidators([DateValidator.dateVaidator, DateValidator.dateMaxVaidator]);
      //   }
      // }

      // this.formName.setValidators([(this.isRequired == true ? Validators.required : null), DateValidator.dateVaidator, (this.minimum == true? DateValidator.dateMinVaidator : null), (this.maximum == true ? DateValidator.dateMaxVaidator : null)]);
      // this.formNameOne.setValidators([(this.isRequired == true ? Validators.required : null)]);
      // this.formName.valueChanges.pipe(distinctUntilChanged()).subscribe((value)=> {
      // if (String(typeof (value)) != 'object') {
      //   date = value.split('-');
      //   this.setDateValue(value, date);
      // }
      // else {
      //   date = format(value, "DD-MM-YYYY").split('-');
      //   this.setDateValue(value, date);
      // }
      // });
    }
    else if (this.ifMultiRow == true) {
      if (this.isRequired == true) {
        if (this.isSingleMultiDatePicker == true || this.isMultiRowMultiDatePicker == true) {
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValidators([Validators.required]);
          this.newMutiltiPicker.setValidators([Validators.required, DateValidator.dateVaidator]);
        }
        else if (this.ifMultiRow == true) {
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValidators([Validators.required, DateValidator.dateVaidator]);
          this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).setValidators(Validators.required);
        }
        else{
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValidators(DateValidator.dateVaidator);
          this.newMutiltiPicker.setValidators(DateValidator.dateVaidator);
        }
      }

      if (this.minimum == true) {
        if (this.isSingleMultiDatePicker == true || this.isMultiRowMultiDatePicker == true) {
          // this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValidators(DateValidator.dateMinVaidator);
          this.newMutiltiPicker.setValidators([DateValidator.dateMinVaidator, DateValidator.dateVaidator]);
        }
        else {
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValidators(DateValidator.dateMinVaidator);
        }
      }

      if (this.maximum == true) {
        
        if (this.isSingleMultiDatePicker == true || this.isMultiRowMultiDatePicker == true) {
          this.newMutiltiPicker.setValidators([DateValidator.dateMaxVaidator, DateValidator.dateVaidator]);
        }
        else{
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValidators(DateValidator.dateMaxVaidator);
        }
      }
      // this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValidators([this.isRequired == true ? Validators.required : Validators.nullValidator, DateValidator.dateVaidator, this.minimum == true ? DateValidator.dateMinVaidator : Validators.nullValidator, this.maximum == true ? DateValidator.dateMaxVaidator : Validators.nullValidator]);
      // this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).setValidators([this.isRequired == true ? Validators.required : Validators.nullValidator,]);
      // this.formArray.controls[this.Index][`${this.formNameOne}`].valueChanges.pipe(distinctUntilChanged()).subscribe((value)=> {
      //   // if (String(typeof (value)) != 'object') {
      //   //   date = value.split('-');
      //   //   this.setDateValueMultiRow(value, date);
      //   // }
      //   // else {
      //   //   date = format(value, "DD-MM-YYYY").split('-');
      //   //   this.setDateValueMultiRow(value, date);
      //   // }
      // })
    }

    if (this.isMultiRowMultiDatePicker == true) {
      let selectedDate: any = [];
      let selecteddates: any = [];
      /****** Set value To Form Name One *************/
      selectedDate = this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).value ? this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).value : [];
      this.formArray.controls[Number(this.Index)].get(`${this.formCtrNameOne}`).setValue(selectedDate);
      this.formArray.controls[Number(this.Index)].get(`${this.formCtrNameOne}`).updateValueAndValidity({ emitEvent: false });
      this.model[Number(this.Index)] = selectedDate;
      /****** Set value To Form Name *************/
      selecteddates = this.formArray.controls[this.Index].get(`${this.formCtrName}`).value ? this.formArray.controls[this.Index].get(`${this.formCtrName}`).value : [];
      
      this.formArray.controls[Number(this.Index)].get(`${this.formCtrName}`).setValue(selecteddates);
      this.formArray.controls[Number(this.Index)].get(`${this.formCtrName}`).updateValueAndValidity({ emitEvent: false });
      this.models[Number(this.Index)] = selecteddates;
    }
    else if (this.isSingleMultiDatePicker == true) {
      let selectedDate: any = [];
      let selecteddates: any = [];
      /****** Set value To Form Name One *************/
      selectedDate = this.formNameOne.value ? this.formNameOne.value : [];
      this.singleModel = selectedDate;
      this.formNameOne.setValue(this.singleModel);
      this.formNameOne.updateValueAndValidity({ emitEvent: false });
      /****** Set value To Form Name *************/
      selecteddates = this.formName.value ? this.formName.value : [];
      this.singleModels = selecteddates;
      this.formName.setValue(this.singleModels);
      this.formName.updateValueAndValidity({ emitEvent: false });
    }
  }

  setDateValue(value, date) {
    if (value != '' && value != undefined && value != null) {
      if (date[0]?.length == 2 && date[1]?.length == 2 && date[2]?.length == 4 && format(new Date(date[2], date[1] - 1, date[0]), "DD-MM-YYYY")) {
        if (!this.formName.errors?.dateVaidator && !this.formName.errors?.pattern) {
          if (this.isSingleMultiDatePicker == true) {
            this.datePicked(format(new Date(date[2], date[1] - 1, date[0]), "DD-MM-YYYY"), format(new Date(date[2], date[1] - 1, date[0]), "YYYY-MM-DD"));
            this.pickedDate.next(this.singleModel);
            this.newMutiltiPicker.setValue('');
          }
          else {
            this.formName.setValue(format(new Date(date[2], date[1] - 1, date[0]), "DD-MM-YYYY"));
            this.formName.updateValueAndValidity({ emitEvent: false });
            this.formNameOne.setValue(new Date(date[2], date[1] - 1, date[0]));
            this.formNameOne.updateValueAndValidity({ emitEvent: false });
            this.pickedDate.next(new Date(date[2], date[1] - 1, date[0]));
          }
        }
        else if (value != '' && value != undefined && value != null) {
          if (this.isSingleMultiDatePicker == true) {
            if (String(typeof (value)) != 'object') {
              this.newMutiltiPicker.setValue(value);
              this.newMutiltiPicker.updateValueAndValidity({ emitEvent: false });
              this.formName.setValue(this.singleModel);
              this.formName.updateValueAndValidity({ emitEvent: false });
              this.pickedDate.next(this.singleModel);
            }
            else {
              this.newMutiltiPicker.setValue(format(new Date(value), "DD-MM-YYYY"));
              this.newMutiltiPicker.updateValueAndValidity({ emitEvent: false });
              this.formName.setValue(this.singleModel);
              this.formName.updateValueAndValidity({ emitEvent: false });
              this.pickedDate.next(this.singleModel);
            }
          }
          else {
            if (String(typeof (value)) != 'object') {
              this.formName.setValue(value);
              this.formName.updateValueAndValidity({ emitEvent: false });
              this.pickedDate.next(value);
            }
            else {
              this.formName.setValue(format(new Date(value), "DD-MM-YYYY"));
              this.formName.updateValueAndValidity({ emitEvent: false });
              this.pickedDate.next(value);
            }
          }
        }
      }
      else if (date[0]?.length == undefined || date[1]?.length == undefined || date[2]?.length == undefined || date[0]?.length != 2 || date[1]?.length != 2 || date[2]?.length != 4) {
        if (this.isSingleMultiDatePicker == true) {
          this.newMutiltiPicker.setValue(value);
          this.newMutiltiPicker.updateValueAndValidity({ emitEvent: false });
          this.formName.setValue(this.singleModel);
          this.formName.updateValueAndValidity({ emitEvent: false });
          this.pickedDate.next(this.singleModel);
        }
        else {
          this.formName.setValue(value);
          this.formName.updateValueAndValidity({ emitEvent: false });
          this.pickedDate.next(value);
        }
      }
    }
    else {
      if (this.isSingleMultiDatePicker == true || this.isMultiRowMultiDatePicker == true) {
        this.pickedDate.next(this.isMultiRowMultiDatePicker == true ? this.model[this.Index] : this.singleModel);
      }
      else {
        this.pickedDate.next(value);
      }
    }
  }

  setDateValueMultiRow(value, date) {
    if (value != '' && value != undefined && value != null) {
      if (date[0]?.length == 2 && date[1]?.length == 2 && date[2]?.length == 4 && format(new Date(date[2], date[1] - 1, date[0]), "DD-MM-YYYY")) {
        if (!this.formArray.controls[this.Index][`${this.formName}`]?.errors?.dateVaidator && !this.formArray.controls[this.Index][`${this.formName}`]?.errors?.pattern) {
          if (this.isMultiRowMultiDatePicker == true) {
            this.datePicked(format(new Date(date[2], date[1] - 1, date[0]), "DD-MM-YYYY"), format(new Date(date[2], date[1] - 1, date[0]), "YYYY-MM-DD"));
            this.pickedDate.next(this.model[this.Index]);
            this.newMutiltiPicker.setValue('');
          }
          else {
            this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue(format(new Date(date[2], date[1] - 1, date[0]), "DD-MM-YYYY"));
            this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).setValue(new Date(date[2], date[1] - 1, date[0]));
            this.formArray.controls[this.Index].get(`${this.formCtrName}`).updateValueAndValidity({ emitEvent: false });
            this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).updateValueAndValidity({ emitEvent: false });
            this.pickedDate.next(new Date(date[2], date[1] - 1, date[0]));
          }
        }
        else if (value != '' && value != undefined && value != null) {
          if (this.isMultiRowMultiDatePicker == true) {
            this.newMutiltiPicker.setValue(value);
            this.newMutiltiPicker.updateValueAndValidity({ emitEvent: false });
            this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue(this.model[this.Index]);
            this.formArray.controls[this.Index].get(`${this.formCtrName}`).updateValueAndValidity({ emitEvent: false });
            this.pickedDate.next(this.model[this.Index]);
          }
          else {
            if (String(typeof (value)) != 'object') {
              this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue(value);
              this.formArray.controls[this.Index].get(`${this.formCtrName}`).updateValueAndValidity({ emitEvent: false });
              this.pickedDate.next(value);
            }
            else {
              this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue(format(new Date(value), "DD-MM-YYYY"));
              this.formArray.controls[this.Index].get(`${this.formCtrName}`).updateValueAndValidity({ emitEvent: false });
              this.pickedDate.next(value);
            }
          }
        }
      }
      else if (date[0]?.length == undefined || date[1]?.length == undefined || date[2]?.length == undefined || date[0]?.length != 2 || date[1]?.length != 2 || date[2]?.length != 4) {
        if (this.isMultiRowMultiDatePicker == true) {
          this.newMutiltiPicker.setValue(value);
          this.newMutiltiPicker.updateValueAndValidity({ emitEvent: false });
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue(this.models[this.Index]);
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).updateValueAndValidity({ emitEvent: false });
          this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).setValue(this.model[this.Index]);
          this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).updateValueAndValidity({ emitEvent: false });
          this.pickedDate.next(this.model[this.Index]);
        }
        else {
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue(value);
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).updateValueAndValidity({ emitEvent: false });
          this.pickedDate.next(value);
        }
      }
    }
    else {
      if (this.isSingleMultiDatePicker == true || this.isMultiRowMultiDatePicker == true) {
        this.pickedDate.next(this.isMultiRowMultiDatePicker == true ? this.model[this.Index] : this.singleModel);
      }
      else {
        this.pickedDate.next(value);
      }
    }
  }

  setDatepicker(value) {
    let date: any;
    if (value != '' && value != null && value != undefined) {
      if (String(typeof (value)) != 'object') {
        date = value.split('-');
        if (this.ifSingle == true) {
          this.setDateValue(value, date);
        }
        else if (this.ifMultiRow == true) {
          this.setDateValueMultiRow(value, date);
        }
      }
      else {
        date = format(value, "DD-MM-YYYY").split('-');
        if (this.ifSingle == true) {
          this.setDateValue(value, date);
        }
        else if (this.ifMultiRow == true) {
          this.setDateValueMultiRow(value, date);
        }
      }
    }
    else {
      if (this.isMultiRowMultiDatePicker == true && this.model[this.Index]?.length == 0) {
        this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue('');
        this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).setValue('');
      }
      else if (this.isSingleMultiDatePicker == true && this.singleModel?.length == 0) {
        this.formName.setValue('');
        this.formNameOne.setValue('');
      }

      if (this.isMultiRowMultiDatePicker == true && this.model[this.Index]?.length != 0) {
        this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue(this.models[this.Index]);
        this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).setValue(this.model[this.Index]);
      }
      else if (this.isSingleMultiDatePicker == true && this.singleModel?.length != 0) {
        this.formName.setValue(this.singleModels);
        this.formNameOne.setValue(this.singleModel);
      }
      this.pickedDate.next(value);
    }
  }

  DateValueSet(value) {
    let date: any;
    console.log(value)
    if (value != '' && value != null && value != undefined) {
      date = format(value, "DD-MM-YYYY").split('-');
      if (this.ifSingle == true) {
        this.setDateValue(value, date);
      }
      else if (this.ifMultiRow == true) {
        this.setDateValueMultiRow(value, date);
      }
    }
    else {
      this.pickedDate.next(value);
    }
  }

  DateValue(value) {
    this.newForm.setValue(value.format("DD-MM-YYYY"))
  }

  public dateClass = (date: Date) => {
    if (this._findDate(date) !== -1 || this._findDate(date) !== undefined) {
      return ['selected'];
    }
    return [];
  }

  public datePicked(event, formatedDate): void {

    if (event) {
      const date = event;
      const formatedDates = formatedDate
      const index = this._findDate(date);
      console.log(index,"hiii")
      let selectedDate: any = [];
      let selecteddates: any = [];
      if (index === -1 || index === undefined) {
        if (this.isMultiRowMultiDatePicker == true) {
          if (!this.model[this.Index].some((res) => res == date) && !this.models[this.Index].some((res) => res == formatedDates)) {
            /****** Set value To Form Name One *************/
            selectedDate = this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).value ? this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).value : [];
            selectedDate.push(date);
            this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).setValue(selectedDate);
            this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).updateValueAndValidity({ emitEvent: false });
            this.model[this.Index] = selectedDate;
            /****** Set value To Form Name *************/
            selecteddates = this.formArray.controls[this.Index].get(`${this.formCtrName}`).value ? this.formArray.controls[this.Index].get(`${this.formCtrName}`).value : [];
            selecteddates.push(formatedDates);
            this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue(selecteddates);
            this.formArray.controls[this.Index].get(`${this.formCtrName}`).updateValueAndValidity({ emitEvent: false });
            this.models[this.Index] = selecteddates;
          }

        }
        else if (this.isSingleMultiDatePicker == true) {
          /****** Set value To Form Name One *************/
          selectedDate = this.formNameOne.value ? this.formNameOne.value : [];
          selectedDate.push(date);
          this.singleModel = selectedDate;
          this.formNameOne.setValue(this.singleModel);
          this.formNameOne.updateValueAndValidity({ emitEvent: false });
          /****** Set value To Form Name *************/
          selecteddates = this.formName.value ? this.formName.value : [];
          selecteddates.push(formatedDates);
          this.singleModels = selecteddates;
          this.formName.setValue(this.singleModels);
          this.formName.updateValueAndValidity({ emitEvent: false });
        }
      } else {
        if (this.isMultiRowMultiDatePicker == true) {
          /****** Remove value To Form Name One *************/
          this.model[this.Index].splice(index, 1);
          this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).setValue(this.model[this.Index]);
          this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).updateValueAndValidity({ emitEvent: false });
          /****** Remove value To Form Name *************/
          this.models[this.Index].splice(index, 1);
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue(this.models[this.Index]);
          this.formArray.controls[this.Index].get(`${this.formCtrName}`).updateValueAndValidity({ emitEvent: false });
        }
        else if (this.isSingleMultiDatePicker == true) {
          /****** Remove value To Form Name One *************/
          this.singleModel.splice(index, 1);
          this.formNameOne.setValue(this.singleModel);
          this.formNameOne.updateValueAndValidity({ emitEvent: false });
          /****** Remove value To Form Name *************/
          this.singleModels.splice(index, 1);
          this.formName.setValue(this.singleModels);
          this.formName.updateValueAndValidity({ emitEvent: false });
        }
      }
      // if (!this.CLOSE_ON_SELECTED) {
      //   const closeFn = this._picker.close;
      //   this._picker.close = () => { };
      //   this._picker['_popupComponentRef'].instance._calendar.monthView._createWeekCells()
      //   setTimeout(() => {
      //     this._picker.close = closeFn;
      //   });
      // }
    }
  }

  public remove(date: Date): void {
    const index = this._findDate(date);
    if (this.isMultiRowMultiDatePicker == true) {
      /****** Remove value To Form Name One *************/
      this.model[this.Index].splice(index, 1);
      this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).setValue(this.model[this.Index]);
      this.formArray.controls[this.Index].get(`${this.formCtrNameOne}`).updateValueAndValidity({ emitEvent: false });
      /****** Remove value To Form Name *************/
      this.models[this.Index].splice(index, 1);
      this.formArray.controls[this.Index].get(`${this.formCtrName}`).setValue(this.models[this.Index]);
      this.formArray.controls[this.Index].get(`${this.formCtrName}`).updateValueAndValidity({ emitEvent: false });
    }
    else if (this.isSingleMultiDatePicker == true) {
      /****** Remove value To Form Name One *************/
      this.singleModel.splice(index, 1);
      this.formNameOne.setValue(this.singleModel);
      this.formNameOne.updateValueAndValidity({ emitEvent: false });
      /****** Remove value To Form Name *************/
      this.singleModels.splice(index, 1);
      this.formName.setValue(this.singleModels);
      this.formName.updateValueAndValidity({ emitEvent: false });
    }
  }

  private _findDate(date: Date) {
    if (this.isMultiRowMultiDatePicker == true) {
      return this.model[this.Index]?.map((m) => +m).indexOf(+date);
    }
    else if (this.isSingleMultiDatePicker == true) {
      console.log(this.singleModel)
      return this.singleModel?.map((m) => +m).indexOf(+date);
    }
  }

  ngAfterViewInit() {

  }

  /***************** Validate Min Date *****************/
  ValidateMin(){
    if(this.ifSingle == true){
      if(this.formName.valid){
        if((this.formgroup.get(`${this.formCtrNameOne}`).value != '' && this.formgroup.get(`${this.formCtrNameOne}`).value != undefined && this.formgroup.get(`${this.formCtrNameOne}`).value != null) && 
        (this.formNameOne.value != '' && this.formNameOne.value != undefined && this.formNameOne.value != null)){
          if(this.isto ? moment(new Date(this.formNameOne.value)).isBefore(moment(new Date(this.formgroup.get(`${this.formCtrNameOne}`).value)))
           :  moment(new Date(this.formgroup.get(`${this.formCtrNameOne}`).value)).isBefore(moment(new Date(this.formNameOne.value)))){
            this.formgroup.get(`${this.formCtrName}`).setErrors({'min': true});
            this.formgroup.get(`${this.formCtrName}`).markAsTouched();
          }
          else{
            this.formName.setErrors(null);
            this.formgroup.get(`${this.formCtrName}`).setErrors(null);
          }
        }
      }
    }
    else{
      if(this.formName.valid){
        if((this.formArray.controls[this.Index].get(`${this.multiformCtrName}`).value != '' && this.formArray.controls[this.Index].get(`${this.multiformCtrName}`).value != undefined && this.formArray.controls[this.Index].get(`${this.multiformCtrName}`).value != null) && 
        (this.formNameOne.value != '' && this.formNameOne.value != undefined && this.formNameOne.value != null)){
          if(this.isto ? moment(new Date(this.formNameOne.value)).isBefore(moment(new Date(this.formArray.controls[this.Index].get(`${this.multiformCtrNameOne}`).value)))
           :  moment(new Date(this.formArray.controls[this.Index].get(`${this.multiformCtrNameOne}`).value)).isBefore(moment(new Date(this.formNameOne.value)))){
            this.formArray.controls[this.Index].get(`${this.multiformCtrNameOne}`).setErrors({'min': true});
          }
          else{
            this.formName.setErrors(null);
            this.formArray.controls[this.Index].get(`${this.multiformCtrNameOne}`).setErrors(null);
          }
        }
      }
    }
  }

  /***************** Validate Max Date *****************/
  ValidateMax(){
    if(this.ifSingle == true){
      if(this.formName.valid){
        if((this.formgroup.get(`${this.formCtrNameOne}`).value != '' && this.formgroup.get(`${this.formCtrNameOne}`).value != undefined && this.formgroup.get(`${this.formCtrNameOne}`).value != null) && 
        (this.formNameOne.value != '' && this.formNameOne.value != undefined && this.formNameOne.value != null)){
          if(this.isto ? moment(new Date(this.formgroup.get(`${this.formCtrNameOne}`).value)).isBefore(moment(new Date(this.formNameOne.value)))           
           : moment(new Date(this.formNameOne.value)).isBefore(moment(new Date(this.formgroup.get(`${this.formCtrNameOne}`).value))) ){
            this.formgroup.get(`${this.formCtrName}`).setErrors({'max': true});
            this.formgroup.get(`${this.formCtrName}`).markAsTouched();
          }
          else{
            this.formName.setErrors(null);
            this.formgroup.get(`${this.formCtrName}`).setErrors(null);
          }
        }
      }
    }
    else{
      if(this.formName.valid){
        if((this.formArray.controls[this.Index].get(`${this.multiformCtrName}`).value != '' && this.formArray.controls[this.Index].get(`${this.multiformCtrName}`).value != undefined && this.formArray.controls[this.Index].get(`${this.multiformCtrName}`).value != null) && 
        (this.formNameOne.value != '' && this.formNameOne.value != undefined && this.formNameOne.value != null)){
          if(this.isto ? moment(new Date(this.formNameOne.value)).isAfter(moment(new Date(this.formArray.controls[this.Index].get(`${this.multiformCtrNameOne}`).value)))
           :  moment(new Date(this.formArray.controls[this.Index].get(`${this.multiformCtrNameOne}`).value)).isAfter(moment(new Date(this.formNameOne.value)))){
            this.formArray.controls[this.Index].get(`${this.multiformCtrNameOne}`).setErrors({'max': true});
          }
          else{
            this.formName.setErrors(null);
            this.formArray.controls[this.Index].get(`${this.multiformCtrNameOne}`).setErrors(null);
          }
        }
      }
    }
  }

}
