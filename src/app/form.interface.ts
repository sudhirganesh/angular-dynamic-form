
//Defining the rules datatypes as an interface
export interface Rule {
    name: string;
    operator: string;
    value: any;
  }
  
  //Defining the dynamic form field datatypes as an interface
 export interface FormField {
    type: string;
    label: string;
    name: string;
    group: string;
    validator?: string[];
    condition?: string;
    rules?: Rule[];
    options?: string[];
  }
  