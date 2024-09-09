import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../form-service.service';
import { DynamicFormEvaluator } from './dynamic-form-evaluator';
import { FormField } from '../form.interface';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})

export class DynamicFormComponent implements OnInit {
  dynamicForm: FormGroup = this.formBuilder.group({});
  formData: { [key: string]: any } = {};
  formStructure!: any[];

  constructor(private formBuilder: FormBuilder, public formService: FormService) 
  { }

  ngOnInit() {
    const formStructure = this.formService.getFormStructure();

    let formGroup: Record<string, any> = {};
    formStructure.forEach(control => {
      let controlValidators: Validators[] = [];

      if (control.validations) {
        control.validations.forEach(validation => {
          if (validation.validator === 'required') controlValidators.push(Validators.required);
          });
      }

      formGroup[control.name] = [control.value || '', controlValidators];
    });

    this.dynamicForm = this.formBuilder.group(formGroup);

    //Updating value changes to the form data
    this.dynamicForm.valueChanges.subscribe(value => {
      this.formData = value;
    });
  }

//Method to validate conditional display of certain fields in the dynamic form
  shouldDisplayField(field: FormField): boolean {

      if (field.condition && field.rules) {
      const evaluator = new DynamicFormEvaluator(this.formData);
      return evaluator.evaluateCondition(field.condition, field.rules);
    }
    return true;
  }

  //Method for submit button action
  onSubmit() {
    if (!this.dynamicForm.valid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }
    console.log(JSON.stringify(this.dynamicForm.value));
  }

  //Get Method for relevant error messages upon data validation
  getErrorMessage(control: any) {
    const formControl = this.dynamicForm.get(control.name);

    if (!formControl) {
      return '';
    }

    for (let validation of control.validations) {
      if (formControl.hasError(validation.name)) {
        return validation.message;
      }
    }
    return '';
  }

}
