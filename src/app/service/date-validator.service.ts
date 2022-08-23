import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, Validators } from "@angular/forms";
import { format } from "date-fns";
import * as moment from "moment";



export class DateValidator {
  static dateVaidator(AC: AbstractControl) {
    const datepattern = {
      datepattern: /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/
    };
    let date: any;
    let Dates: any = AC.value;
    let invalidDate: any;
    if (AC.value != '' && AC.value != null && AC.value != undefined) {
      if (String(typeof (AC.value)) != 'object') {
        let dateArray: any = AC.value.split('-');
        invalidDate = AC.value.split('-');
        if (dateArray[0]?.length != undefined && dateArray[1]?.length != undefined && dateArray[2]?.length != undefined && dateArray[0]?.length == 2 && dateArray[1]?.length == 2 && dateArray[2]?.length == 4) {
          date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
        }
        else {
          date = null;
          invalidDate = AC.value.split('-');
        }
      }
      else {
        date = AC.value;
        invalidDate = format(AC.value, "DD-MM-YYYY").split('-');
      }



      if (date != null && !moment(date, 'DD-MM-YYYY', true).isValid() && !new FormControl(format(date, 'DD-MM-YYYY'), Validators.pattern(datepattern.datepattern)).errors?.pattern) {
        return { 'dateVaidator': true };
      }
      else if (date != null && new FormControl(format(date, 'DD-MM-YYYY'), Validators.pattern(datepattern.datepattern)).errors?.pattern) {
        return { 'pattern': new FormControl(format(date, 'DD-MM-YYYY'), Validators.pattern(datepattern.datepattern)).errors?.pattern };
      }
      else if (invalidDate[0]?.length != 2 || invalidDate[1]?.length != 2 || invalidDate[2]?.length != 4) {
        return { 'pattern': new FormControl(Dates, Validators.pattern(datepattern.datepattern)).errors?.pattern };
      }
      else {
        return null;
      }
    }
    else {
      return null
    }

  }

  static dateMinVaidator(AC: AbstractControl) {   
    console.log(AC)
    const datepattern = {
      datepattern: /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/
    };
    let currentDate: any = new Date();
    let date: any;
    let Dates: any = AC.value;
    let invalidDate: any;
    if (AC.value != '' && AC.value != null && AC.value != undefined) {
      if (String(typeof (AC.value)) != 'object') {
        let dateArray: any = AC.value.split('-');
        invalidDate = AC.value.split('-');
        if (dateArray[0]?.length != undefined && dateArray[1]?.length != undefined && dateArray[2]?.length != undefined && dateArray[0]?.length == 2 && dateArray[1]?.length == 2 && dateArray[2]?.length == 4) {
          date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
        }
        else {
          date = null;
          invalidDate = AC.value.split('-');
        }
      }
      else {
        date = AC.value;
        invalidDate = format(AC.value, "DD-MM-YYYY").split('-');
      }
      if (date != null && moment(date, 'DD-MM-YYYY', true).isValid() && !new FormControl(format(date, 'DD-MM-YYYY'), Validators.pattern(datepattern.datepattern)).errors?.pattern && !moment(date).isSameOrAfter(moment(currentDate))) {
        return { 'min': true }
      }
      else {
        return null;
      }
    }
    else {
      return null
    }

  }

  static dateMaxVaidator(AC: AbstractControl) {
    const datepattern = {
      datepattern: /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/
    };
    let currentDate: any = new Date();
    let date: any;
    let Dates: any = AC.value;
    let invalidDate: any;
    if (AC.value != '' && AC.value != null && AC.value != undefined) {
      if (String(typeof (AC.value)) != 'object') {
        let dateArray: any = AC.value.split('-');
        invalidDate = AC.value.split('-');
        if (dateArray[0]?.length != undefined && dateArray[1]?.length != undefined && dateArray[2]?.length != undefined && dateArray[0]?.length == 2 && dateArray[1]?.length == 2 && dateArray[2]?.length == 4) {
          date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
        }
        else {
          date = null;
          invalidDate = AC.value.split('-');
        }
      }
      else {
        date = AC.value;
        invalidDate = format(AC.value, "DD-MM-YYYY").split('-');
      }
      if (date != null && moment(date, 'DD-MM-YYYY', true).isValid() && !new FormControl(format(date, 'DD-MM-YYYY'), Validators.pattern(datepattern.datepattern)).errors?.pattern && moment(date).isAfter(moment(currentDate))) {
        return { 'max': true }
      }
      else {
        return null;
      }
    }
    else {
      return null
    }

  }

}