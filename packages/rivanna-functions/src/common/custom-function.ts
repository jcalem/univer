import type { Ctor } from '@univerjs/core'
import {
  BaseValueObject,
  ErrorType,
  ErrorValueObject,
  IFunctionInfo,
  IFunctionNames,
} from '@univerjs/engine-formula'

import {
  ArrayValueObject,
  AsyncObject,
  BaseFunction,
  FunctionType,
  NullValueObject,
  NumberValueObject,
  StringValueObject,
} from '@univerjs/engine-formula'
import { checkVariantsErrorIsArrayOrBoolean, checkVariantsErrorIsNullorArrayOrBoolean } from './check-variant-error'

/**
 * function name
 */
export enum FUNCTION_NAMES_USER {
  RIVSEC = 'RIVSEC',
  CUSTOMSUM = 'CUSTOMSUM',
  CUSTOM_ASYNC_OBJECT = 'CUSTOM_ASYNC_OBJECT',
  CUSTOM_ASYNC_ARRAY = 'CUSTOM_ASYNC_ARRAY',
}

/**
 * i18n
 */
export const functionEnUS = {
  formula: {
    functionList: {
      RIVSEC: {
        description: 'Source data from the Rivanna SEC API',
        abstract: 'Source data from the Rivanna SEC API',
        links: [],
        functionParameter: {
          query: {
            name: 'query',
            detail:
              'The search query.',
          },
          companyTicker: {
            name: 'companyTicker',
            detail:
              'The company ticker.',
          },
          documentType: {
            name: 'documentType',
            detail:
              'Filter by document type: 10-K, 10-Q, 8-K, etc.',
          },
        },
      },
      CUSTOMSUM: {
        description: 'You can add individual values, cell references or ranges or a mix of all three.',
        abstract: 'Adds its arguments',
        links: [
          {
            title: 'Instruction',
            url: 'https://support.microsoft.com/en-us/office/sum-function-043e1c7d-7726-4e80-8f32-07b23e057f89',
          },
        ],
        functionParameter: {
          number1: {
            name: 'number1',
            detail:
              'The first number you want to add. The number can be like 4, a cell reference like B6, or a cell range like B2:B8.',
          },
          number2: {
            name: 'number2',
            detail:
              'This is the second number you want to add. You can specify up to 255 numbers in this way.',
          },
        },
      },
      CUSTOM_ASYNC_OBJECT: {
        description: 'Query info.',
        abstract: 'Query info',
        links: [
          {
            title: 'Instruction',
            url: 'https://univer.ai',
          },
        ],
        functionParameter: {
          value: {
            name: 'Info',
            detail: 'Query info',
          },
        },
      },
      CUSTOM_ASYNC_ARRAY: {
        description: 'Query table data.',
        abstract: 'Query table data',
        links: [
          {
            title: 'Instruction',
            url: 'https://univer.ai',
          },
        ],
        functionParameter: {
          value: {
            name: 'Table name',
            detail: 'Query table name',
          },
        },
      },
    },
  },
}

/**
 * description
 */
export const FUNCTION_LIST_USER: IFunctionInfo[] = [
  {
    functionName: FUNCTION_NAMES_USER.RIVSEC,
    aliasFunctionName: 'formula.functionList.RIVSEC.aliasFunctionName',
    functionType: FunctionType.Univer,
    description: 'formula.functionList.RIVSEC.description',
    abstract: 'formula.functionList.RIVSEC.abstract',
    functionParameter: [
      {
        name: 'formula.functionList.RIVSEC.functionParameter.query.name',
        detail:
          'formula.functionList.RIVSEC.functionParameter.query.detail',
        example: '"2022 Revenue"',
        require: 1,
        repeat: 0,
      },
      {
        name: 'formula.functionList.RIVSEC.functionParameter.companyTicker.name',
        detail:
          'formula.functionList.RIVSEC.functionParameter.companyTicker.detail',
        example: '"AAPL"',
        require: 0,
        repeat: 0,
      },
      {
        name: 'formula.functionList.RIVSEC.functionParameter.documentType.name',
        detail:
          'formula.functionList.RIVSEC.functionParameter.documentType.detail',
        example: '"10-K"',
        require: 0,
        repeat: 0,
      },
    ],
  },
  {
    functionName: FUNCTION_NAMES_USER.CUSTOMSUM,
    aliasFunctionName: 'formula.functionList.CUSTOMSUM.aliasFunctionName',
    functionType: FunctionType.Univer,
    description: 'formula.functionList.CUSTOMSUM.description',
    abstract: 'formula.functionList.CUSTOMSUM.abstract',
    functionParameter: [
      {
        name: 'formula.functionList.CUSTOMSUM.functionParameter.number1.name',
        detail:
          'formula.functionList.CUSTOMSUM.functionParameter.number1.detail',
        example: 'A1:A20',
        require: 1,
        repeat: 0,
      },
      {
        name: 'formula.functionList.CUSTOMSUM.functionParameter.number2.name',
        detail:
          'formula.functionList.CUSTOMSUM.functionParameter.number2.detail',
        example: 'B2:B10',
        require: 0,
        repeat: 1,
      },
    ],
  },
  {
    functionName: FUNCTION_NAMES_USER.CUSTOM_ASYNC_OBJECT,
    aliasFunctionName: 'formula.functionList.CUSTOM_ASYNC_OBJECT.aliasFunctionName',
    functionType: FunctionType.Univer,
    description: 'formula.functionList.CUSTOM_ASYNC_OBJECT.description',
    abstract: 'formula.functionList.CUSTOM_ASYNC_OBJECT.abstract',
    functionParameter: [
      {
        name: 'formula.functionList.CUSTOM_ASYNC_OBJECT.functionParameter.value.name',
        detail:
          'formula.functionList.CUSTOM_ASYNC_OBJECT.functionParameter.value.detail',
        example: '"info"',
        require: 1,
        repeat: 0,
      },
    ],
  },
  {
    functionName: FUNCTION_NAMES_USER.CUSTOM_ASYNC_ARRAY,
    aliasFunctionName: 'formula.functionList.CUSTOM_ASYNC_ARRAY.aliasFunctionName',
    functionType: FunctionType.Univer,
    description: 'formula.functionList.CUSTOM_ASYNC_ARRAY.description',
    abstract: 'formula.functionList.CUSTOM_ASYNC_ARRAY.abstract',
    functionParameter: [
      {
        name: 'formula.functionList.CUSTOM_ASYNC_ARRAY.functionParameter.value.name',
        detail:
          'formula.functionList.CUSTOM_ASYNC_ARRAY.functionParameter.value.detail',
        example: '"sheet1"',
        require: 1,
        repeat: 0,
      },
    ],
  },
]

/**
 * SEC function
 */
export class RivSEC extends BaseFunction {
  override minParams = 1;

  override maxParams = 3;
  override calculate(query: BaseValueObject, companyTicker?: BaseValueObject, documentType?: BaseValueObject) {
    companyTicker = companyTicker ?? NullValueObject.create();
    documentType = documentType ?? NullValueObject.create();

    const { isError, errorObject, variants } = checkVariantsErrorIsArrayOrBoolean(query, companyTicker, documentType);

    if (isError) {
      return errorObject as ErrorValueObject;
    }

    const [queryObject, companyTickerObject, documentTypeObject] = variants as BaseValueObject[];


    return new AsyncObject(invokeSecFunction(queryObject, companyTickerObject, documentTypeObject));
  }

  override isAsync(): boolean {
    return true
  }
}

async function invokeSecFunction(queryObject: BaseValueObject, companyTickerObject: BaseValueObject, documentTypeObject: BaseValueObject) {
  try {
    const response = { 'answer': 'test' };
    const returnObject = StringValueObject.create(response.answer);
    return returnObject;
  } catch (error) {
    return new ErrorValueObject(ErrorType.VALUE);
  }
}


/**
 * Function algorithm
 */
export class Customsum extends BaseFunction {
  override calculate(...variants: BaseValueObject[]) {
    let accumulatorAll: BaseValueObject = new NumberValueObject(0)
    for (let i = 0; i < variants.length; i++) {
      let variant = variants[i]

      if (variant.isError()) {
        return variant
      }

      if (accumulatorAll.isError()) {
        return accumulatorAll
      }

      if (variant.isArray()) {
        variant = (variant as ArrayValueObject).sum()
      }

      accumulatorAll = accumulatorAll.plus(variant as BaseValueObject)
    }

    return accumulatorAll
  }
}

/**
 * Get data asynchronously and assign it to array formula
 */
export class CustomAsyncArray extends BaseFunction {
  override calculate(value: BaseValueObject) {
    return new AsyncObject(asyncArrayFunction(value))
  }

  override isAsync(): boolean {
    return true
  }
}

async function asyncArrayFunction(value: BaseValueObject) {
  return new Promise((resolve: (value: ArrayValueObject) => void) => {
    setTimeout(() => {
      resolve(ArrayValueObject.createByArray([['Async Table: ', value.getValue()], ['1', '2'], ['3', '4']]))
    }, 3000)
  })
}

/**
 * Get data asynchronously and assign it to a single formula value
 */
export class CustomAsyncObject extends BaseFunction {
  override calculate(value: BaseValueObject) {
    return new AsyncObject(asyncObjectFunction(value));
  }

  override isAsync(): boolean {
    return true
  }
}

async function asyncObjectFunction(value: BaseValueObject) {
  return new Promise((resolve: (value: BaseValueObject) => void) => {
    setTimeout(() => {
      const stringValueObject = StringValueObject.create(`Async Info: ${value.getValue()}`);
      stringValueObject.withCustomData({
        custom: 'test'
      })
      resolve(stringValueObject);
    }, 3000)
  })
}

export const functionUser: Array<[Ctor<BaseFunction>, IFunctionNames]> = [
  [RivSEC, FUNCTION_NAMES_USER.RIVSEC],
  [Customsum, FUNCTION_NAMES_USER.CUSTOMSUM],
  [CustomAsyncObject, FUNCTION_NAMES_USER.CUSTOM_ASYNC_OBJECT],
  [CustomAsyncArray, FUNCTION_NAMES_USER.CUSTOM_ASYNC_ARRAY]
]