import {
    getStyleguideColorsCode,
    getStyleguideTextStylesCode,
    getLayerCode
} from "./code-helpers";
import { OPTION_NAMES } from "./constants";
import { getResourceContainer, getResources } from "./utils";

function colors(context) {
    var useLinkedStyleguides = context.getOption(OPTION_NAMES.USE_LINKED_STYLEGUIDES);
    var { container, type } = getResourceContainer(context);
    var allColors = getResources(container, type, useLinkedStyleguides, "colors");
    var options = { colorFormat: context.getOption(OPTION_NAMES.COLOR_FORMAT) };
    var code = getStyleguideColorsCode(options, allColors);

    return {
        code: code,
        language: "javascript"
    };
}

function textStyles(context) {
    var options = {
        useLinkedStyleguides: context.getOption(OPTION_NAMES.USE_LINKED_STYLEGUIDES),
        colorFormat: context.getOption(OPTION_NAMES.COLOR_FORMAT),
        defaultValues: context.getOption(OPTION_NAMES.SHOW_DEFAULT_VALUES)
    };
    var containerAndType = getResourceContainer(context);
    var { container, type } = containerAndType;
    var allTextStyles = getResources(container, type, options.useLinkedStyleguides, "textStyles");
    var code = getStyleguideTextStylesCode(options, containerAndType, allTextStyles);

    return {
        code: code,
        language: "javascript"
    };
}

function layer(context, selectedLayer) {
    var containerAndType = getResourceContainer(context);
    var options = {
        useLinkedStyleguides: context.getOption(OPTION_NAMES.USE_LINKED_STYLEGUIDES),
        showDimensions: context.getOption(OPTION_NAMES.SHOW_DIMENSIONS),
        colorFormat: context.getOption(OPTION_NAMES.COLOR_FORMAT),
        defaultValues: context.getOption(OPTION_NAMES.SHOW_DEFAULT_VALUES)
    };
    var code = getLayerCode(containerAndType, selectedLayer, options);

    return {
        code: code,
        language: "javascript"
    };
}

function comment(context, text) {
    return `// ${text}`;
}

function exportColors(context) {
    var codeObject = colors(context);
    var code = codeObject.code;

    return {
        code: code,
        filename: "colors.js",
        language: "javascript"
    };
}

function exportTextStyles(context) {
    var codeObject = textStyles(context);
    var code = codeObject.code;

    return {
        code: code,
        filename: "fonts.js",
        language: "javascript"
    };
}

function styleguideColors(context, colorsInProject) {
    var options = { colorFormat: context.getOption(OPTION_NAMES.COLOR_FORMAT) };
    var code = getStyleguideColorsCode(options, colorsInProject);
    return {
        code,
        language: "javascript"
    };
}

function styleguideTextStyles(context, textStylesInProject) {
    var options = {
        colorFormat: context.getOption(OPTION_NAMES.COLOR_FORMAT),
        defaultValues: context.getOption(OPTION_NAMES.SHOW_DEFAULT_VALUES)
    };
    var containerAndType = getResourceContainer(context);
    var code = getStyleguideTextStylesCode(options, containerAndType, textStylesInProject);
    return {
        code,
        language: "javascript"
    };
}

function exportStyleguideColors(context, colorsInProject) {
    var codeObject = styleguideColors(context, colorsInProject);
    var code = codeObject.code;
    return {
        code,
        filename: "colors.js",
        language: "javascript"
    };
}

function exportStyleguideTextStyles(context, textStylesInProject) {
    var codeObject = styleguideTextStyles(context, textStylesInProject);
    var code = codeObject.code;
    return {
        code,
        filename: "fonts.js",
        language: "javascript"
    };
}

export default {
    layer,
    colors,
    textStyles,
    comment,
    exportColors,
    exportTextStyles,
    styleguideColors,
    styleguideTextStyles,
    exportStyleguideColors,
    exportStyleguideTextStyles
};
