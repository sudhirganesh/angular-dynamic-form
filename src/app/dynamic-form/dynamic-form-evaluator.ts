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
      
      let result = condition === 'and';
      
      let ruleResult = false;
      for (const rule of rules) { 
        ruleResult = this.evaluateRule(rule);
      

        if (condition === 'and') {
          result = result && ruleResult;
          if (!result) break;
        } else if (condition === 'or') {
          result = result || ruleResult;
          if (result) break;
        }
        else {
          throw new Error(`Unsupported condition: ${condition}`);
        }
      } 
      return result;
    }
  }
  