import { Rule } from "../form.interface";

export class DynamicFormEvaluator {
    private formData: { [key: string]: any };
  
    constructor(formData: { [key: string]: any }) {
      this.formData = formData;
    }
  
    // Method to evaluate a single rule
    private evaluateRule(rule: Rule): boolean {
      const fieldName = this.formData[rule.name]
      switch (rule.operator) {
        case '>=':
          return fieldName >= rule.value;
        case '<=':
          return fieldName <= rule.value;
        case '!=':
          return fieldName !== rule.value;     
        default:
          throw new Error(`Unsupported operator: ${rule.operator}`);
      }
    }
  
    // Method to evaluate all rules based on the condition (and/or)
    public evaluateCondition(condition: string, rules: Rule[]): boolean {
      if (!rules || rules.length === 0) {
        return true;
      }
  
      if (condition === 'and') {
        return rules.every(rule => this.evaluateRule(rule));
      } 
      else if (condition === 'or') {
        return rules.some(rule => this.evaluateRule(rule));
      } 
      else {
        throw new Error(`Unsupported condition: ${condition}`);
      }
    }
  }
  