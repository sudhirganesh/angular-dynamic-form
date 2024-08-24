import { STRING_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//Defining the Dynamic Form Structure based on the JSON data received as a service.
export class FormService {
  formStructure = [
    {
      "type": "text",
      "label": "Order No",
      "name": "orderno",
      "group": "General Information",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Order No is required"
        }
      ]
    },
    {
      "type": "date",
      "label": "Order Date",
      "name": "orderDate",
      "group": "General Information",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Order Date is required"
        },
      ]
    },
    {
      "type": "text",
      "label": "Order Info",
      "name": "orderInfo",
      "group": "General Information",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Order Info is required"
        },
      ],
      "condition": "and",
      "rules": [
        {
          "name": "orderDate",
          "operator": "!=",
          "value": "",
        }
      ]
    },
    {
      "type": "number",
      "label": "Price",
      "name": "orderPrice",
      "group": "Product Information",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Order Price is required"
        },
      ]
    },
    {
      "type": "boolean",
      "label": "Refurbished?",
      "name": "refurbished",
      "group": "Product Information",
      "options": [ "Yes", "No"],
      "validations":[]
    },
    {
      "type": "text",
      "label": "Address",
      "name": "address",
      "value": '',
      "group": "Product Information",
      "condition": "or",
      "rules": [
        {
          "name": "orderno",
          "operator": ">=",
          "value": "100",
        },
        {
          "name": "orderPrice",
          "operator": "<=",
          "value": "100",
        },
      ]
    },
  ];

  getFormStructure() {
    return this.formStructure;
  }
}
