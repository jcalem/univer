import { Disposable, LifecycleStages, Inject, LocaleService } from '@univerjs/core';
 
import { FUNCTION_LIST_USER, functionEnUS } from '../common/custom-function';
import { IDescriptionService } from '@univerjs/sheets-formula';
 
export class CustomDescriptionController extends Disposable {
  constructor(
    @IDescriptionService private readonly _descriptionService: IDescriptionService,
    @Inject(LocaleService) private readonly _localeService: LocaleService
  ) {
    super();
 
    this._initialize();
  }
 
  private _initialize(): void {
    console.log('CustomDescriptionController initialize');
    this._registerLocales();
    this._registerCustomDescriptions();
  }
 
  private _registerLocales() {
    this._localeService.load({
      enUS: functionEnUS,
    });
  }
 
  private _registerCustomDescriptions() {
    this._descriptionService.registerDescriptions(FUNCTION_LIST_USER);
  }
}