import type { Dependency, } from '@univerjs/core';
import { Plugin, Inject, Injector, IConfigService, merge, touchDependencies } from '@univerjs/core'

import { CustomFunctionController } from './controllers/custom-function.controller';
import { defaultPluginConfig, IRivannaFunctionsConfig, RIVANNA_FUNCTIONS_PLUGIN_CONFIG_KEY } from './controllers/config.schema';
import { RIVANNA_FUNCTIONS_PLUGIN_NAME } from './common/plugin-name';
import { CustomDescriptionController } from './controllers/custom-description.controller';

export class RivannaFunctionsPlugin extends Plugin {
    // static override type = UniverInstanceType.UNIVER_SHEET;
    static override pluginName = RIVANNA_FUNCTIONS_PLUGIN_NAME;

    constructor(
        private readonly _config: Partial<IRivannaFunctionsConfig> = defaultPluginConfig,
        @Inject(Injector) protected readonly _injector: Injector,
        @IConfigService private readonly _configService: IConfigService
    ) {
        super();

        // Manage the plugin configuration.
        const { ...rest } = merge(
            {},
            defaultPluginConfig,
            this._config
        );
        this._configService.setConfig(RIVANNA_FUNCTIONS_PLUGIN_CONFIG_KEY, rest);
    }

    initialize(): void {
        const dependencies: Dependency[] = [[CustomFunctionController], [CustomDescriptionController]];

        dependencies.forEach((dependency) => {
            this._injector.add(dependency)
        });
    }

    override onStarting(): void {
        this.initialize();
    }

    override onReady(): void {
        touchDependencies(this._injector, [
            [CustomFunctionController],
            [CustomDescriptionController],
        ]);
    }
}