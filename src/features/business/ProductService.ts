import { IntentsClient } from '@google-cloud/dialogflow-cx';
import AgentConfig from '../../config/Agent';
import { Product } from '../../interfaces/product';

const dotenv = require('dotenv');
dotenv.config();

class ProductService {

  constructor() {
  }

  getDynamicUniqueValues(products: Record<string, any>[]) {
  const result: Record<string, any> = {};

  const addToResult = (obj: Record<string, any>, target: Record<string, any>) => {
    for (const key of Object.keys(obj)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        // If it's an array, ensure the target is a Set
        if (!target[key]) target[key] = new Set();
        for (const item of value) {
          target[key].add(item);
        }
      } else if (value && typeof value === "object") {
        // Nested object, recurse
        if (!target[key]) target[key] = {};
        addToResult(value, target[key]);
      } else {
        // Primitive value
        if (!target[key]) target[key] = new Set();
        target[key].add(value);
      }
    }
  };

  for (const product of products) {
    addToResult(product, result);
  }

  const convertSetsToArrays = (obj: Record<string, any>): Record<string, any> => {
    const output: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      if (obj[key] instanceof Set) {
        output[key] = Array.from(obj[key]);
      } else if (obj[key] && typeof obj[key] === "object") {
        output[key] = convertSetsToArrays(obj[key]);
      } else {
        output[key] = obj[key];
      }
    }
    return output;
  };

  return convertSetsToArrays(result);
}

export default new ProductService();