import type { ArrayValueObject } from '../../../engine/value-object/array-value-object';
import { ErrorType } from '../../../basics/error-type';
import { calculateDDB } from '../../../basics/financial';
import { expandArrayValueObject } from '../../../engine/utils/array-object';
import { checkVariantsErrorIsStringToNumber } from '../../../engine/utils/check-variant-error';
import { getCurrencyFormat } from '../../../engine/utils/numfmt-kit';
import { type BaseValueObject, ErrorValueObject } from '../../../engine/value-object/base-value-object';
import { BooleanValueObject, NumberValueObject, StringValueObject } from '../../../engine/value-object/primitive-object';
import { BaseFunction } from '../../base-function';
import { AsyncObject } from '../../..';

export class TestFunc extends BaseFunction {
    override calculate(value: BaseValueObject) {
      return new AsyncObject(asyncObjectFunction(value))
    }
  
    override isAsync(): boolean {
      return true
    }
  }
  
  async function asyncObjectFunction(value: BaseValueObject) {
    return new Promise((resolve: (value: BaseValueObject) => void) => {
      setTimeout(() => {
        const abc = StringValueObject.create(`Async Info: ${value.getValue()}`);
        abc.withCustomData({'test': 'a'})
        resolve(abc);
      }, 3000)
    })
  }