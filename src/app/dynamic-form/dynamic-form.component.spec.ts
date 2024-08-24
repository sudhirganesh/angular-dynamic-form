import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormService } from '../form-service.service';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [DynamicFormComponent],
      providers: [FormService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.dynamicForm).toBeTruthy();
  });

  it('should render text input', () => {
    const compiled = fixture.nativeElement;
    const orderNoInput = compiled.querySelector('input[type="text"]');
    expect(orderNoInput).toBeTruthy();
  });

  it('should validate required fields', () => {
    component.dynamicForm.controls['Order No'].setValue('');
    fixture.detectChanges();
    expect(component.dynamicForm.invalid).toBeTruthy();
  });

  it('should conditionally render fields', () => {
    // Set up mock condition and rules
    const mockField = {
      "type": "text",
      "name": "Address",
      "group": "General Information",
      "condition": "and",
      "rules": [
     { "name": "orderno", "operator": ">=", "value": "100" }
      ]
    };
    component.formStructure.push(mockField);
    component.dynamicForm.controls['Order No'].setValue('150');
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const addressInput = compiled.querySelector('input[name="Address"]');
    expect(addressInput).toBeTruthy();
  });
});
