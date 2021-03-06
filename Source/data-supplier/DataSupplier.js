function getPluginIdentifier() {
  if (!__command.pluginBundle()) {
    throw new Error(
      'It seems that the command is not running in a plugin. Bundle your command in a plugin to use the DataSupplier API.'
    )
  }
  return __command.pluginBundle().identifier()
}

/**
 * Register a function to supply data on request.
 *
 * @param {string} dataType The data type. Currently "public.text" or "public.image" are the only allowed values.
 * @param {string} dataName The data name, will be used as the menu item title for the data.
 * @param {string} dynamicDataKey The key to use to select the dynamic data to supply in onSupplyData.
 */
export function registerDataSupplier(dataType, dataName, dynamicDataKey) {
  const dataManager = AppController.sharedInstance.dataSupplierManager()
  const identifier = getPluginIdentifier()
  const commandIdentifier = __command.identifier()
  dataManager.registerPluginDataSupplier_withName_dataType_pluginIdentifier_commandIdentifier_(
    dynamicDataKey,
    dataName,
    dataType,
    identifier,
    commandIdentifier
  )
}

/**
 * Deregister any static data or dynamic data providers for a particular plugin. Typically called from the Shutdown method of the plugin.
 */
export function deregisterDataSuppliers() {
  const dataManager = AppController.sharedInstance.dataSupplierManager()
  const identifier = getPluginIdentifier()
  dataManager.deregisterDataSuppliersForPluginWithIdentifier_(identifier)
}

/**
 * When the plugin providing the dynamic data has finished generating the data, it will call this function with the data key and the data.
 */
export function supplyData(key, data) {
  const dataManager = AppController.sharedInstance.dataSupplierManager()
  dataManager.supplyData_forKey_(data, key)
}
