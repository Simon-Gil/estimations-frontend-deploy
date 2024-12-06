import {
  DefaultPropsProvider_default,
  GlobalStyles_default,
  capitalize,
  defaultTheme_default,
  extendSxProp,
  identifier_default,
  require_jsx_runtime,
  require_prop_types,
  useDefaultProps
} from "./chunk-4E2T3SLP.js";
import {
  require_react
} from "./chunk-YF6YTEQP.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/.pnpm/@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_xr6jugch6tfph6yfv7gqdunuha/node_modules/@mui/material/utils/capitalize.js
var capitalize_default = capitalize;

// node_modules/.pnpm/@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_xr6jugch6tfph6yfv7gqdunuha/node_modules/@mui/material/GlobalStyles/GlobalStyles.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function GlobalStyles(props) {
  return (0, import_jsx_runtime.jsx)(GlobalStyles_default, {
    ...props,
    defaultTheme: defaultTheme_default,
    themeId: identifier_default
  });
}
true ? GlobalStyles.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: import_prop_types.default.oneOfType([import_prop_types.default.array, import_prop_types.default.func, import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string, import_prop_types.default.bool])
} : void 0;
var GlobalStyles_default2 = GlobalStyles;

// node_modules/.pnpm/@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_xr6jugch6tfph6yfv7gqdunuha/node_modules/@mui/material/utils/memoTheme.js
var arg = {
  theme: void 0
};
function memoTheme(styleFn) {
  let lastValue;
  let lastTheme;
  return (props) => {
    let value = lastValue;
    if (value === void 0 || props.theme !== lastTheme) {
      arg.theme = props.theme;
      value = styleFn(arg);
      lastValue = value;
      lastTheme = props.theme;
    }
    return value;
  };
}

// node_modules/.pnpm/@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_xr6jugch6tfph6yfv7gqdunuha/node_modules/@mui/material/zero-styled/index.js
var React2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
function globalCss(styles) {
  return function GlobalStylesWrapper(props) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      (0, import_jsx_runtime2.jsx)(GlobalStyles_default2, {
        styles: typeof styles === "function" ? (theme) => styles({
          theme,
          ...props
        }) : styles
      })
    );
  };
}
function internal_createExtendSxProp() {
  return extendSxProp;
}

// node_modules/.pnpm/@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_xr6jugch6tfph6yfv7gqdunuha/node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js
var React3 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
function DefaultPropsProvider(props) {
  return (0, import_jsx_runtime3.jsx)(DefaultPropsProvider_default, {
    ...props
  });
}
true ? DefaultPropsProvider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types2.default.node,
  /**
   * @ignore
   */
  value: import_prop_types2.default.object.isRequired
} : void 0;
function useDefaultProps2(params) {
  return useDefaultProps(params);
}

export {
  capitalize_default,
  GlobalStyles_default2 as GlobalStyles_default,
  globalCss,
  internal_createExtendSxProp,
  memoTheme,
  useDefaultProps2 as useDefaultProps
};
//# sourceMappingURL=chunk-V4XUB4KG.js.map
