const { addBrandTokens } = await importModule('@workbench/load-utils/dist/tokens');

(() => {
    const brand = window.top.aemNamespace?.pageEnvironmentVariables?.brand?.subBrand;
    const channel = window.top.aemNamespace?.pageEnvironmentVariables?.salesChannel;

    if (channel === 'wholesale' && (brand === 'maybach' || brand === 'amg')) {
        addBrandTokens([brand]);
    }
})();
