import { type Ctor } from '@univerjs/core';
import { Disposable, LifecycleStages } from '@univerjs/core';
import type { BaseFunction, IFunctionNames } from '@univerjs/engine-formula';
import { IFunctionService } from '@univerjs/engine-formula';
 
import { functionUser } from '../common/custom-function';
 
export class CustomFunctionController extends Disposable {
  constructor(@IFunctionService private readonly _functionService: IFunctionService) {
    super();
 
    this._initialize();
  }
 
  private _initialize(): void {
    console.log('CustomFunctionController initialize');
    this._registerCustomFunctions();
  }
 
  private _registerCustomFunctions() {
    const functions: BaseFunction[] = [...functionUser].map((registerObject) => {
      const Func = registerObject[0] as Ctor<BaseFunction>;
      const name = registerObject[1] as IFunctionNames;
 
      return new Func(name);
    });

 
    this._functionService.registerExecutors(...functions);
  }
}