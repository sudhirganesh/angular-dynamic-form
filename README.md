Angular Dynamic Forms

In this example my aim is to build a dynamic and versatile tool for creating reactive forms in Angular.  The true beauty of this approach lies in its ability to be extended and customized to fit a wide array of complex scenarios.

Steps:
1. Defining the Form Structure with JSON

**Different Form Control Types and Their Properties in JSON**
type: This defines the type of the form control. It can be 'text', 'number', 'date', boolean, which corresponds to the types of HTML input elements.
label: The label property defines the text that will be used as the label for the form control.
name: This defines the unique name for the form control that is used to retrieve its value.
value: The initial value for the form control. It can be any valid value for the given type of form control.
validations: This is an array of validation rules for the form control. Each rule is an object with properties:

name: A unique name for the validation rule.
validator: The validator function to be applied, like 'required'.
message: The error message to display if the validation fails.

2. Create a a new Angular Component for the Dynamic Form using 'ng g c dymanic-form' command.
3. Import necessary Angular Modules and Dependencies for Reactive Forms.
4. Set Up the Basic Structure of the Form Component template.
5. Load the JSON Data into the Form Component by creating a service as form-service that returns the form structure.
6. Import the form structure in dynamic-form component.
7. Parse JSON data and generate relevant form controls dynamically.
8. Handle conditional visibility of form controls based on conditions and rules defined in the JSON form structure. Evaluate the conditions and rules in a separte DynamicFormEvaluator class.
9. Bind form controls to the template and displaying them conditionally.
10. Handle form submission and validate form controls.
11. Display validation errors.
12. Install bootstrap CSS for decent look and feel.

**Testing with Jest:**
1. 
 

14.  
