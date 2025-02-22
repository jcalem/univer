export const RIVANNA_FUNCTIONS_PLUGIN_CONFIG_KEY = 'rivanna-functions.config';

export const configSymbol = Symbol(RIVANNA_FUNCTIONS_PLUGIN_CONFIG_KEY);

export interface IRivannaFunctionsConfig {
}

export const defaultPluginConfig: IRivannaFunctionsConfig = {};