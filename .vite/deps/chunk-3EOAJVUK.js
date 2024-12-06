import {
  ClassNameGenerator_default,
  createBox,
  createTheme,
  generateUtilityClasses,
  identifier_default,
  require_prop_types
} from "./chunk-4E2T3SLP.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/.pnpm/@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_xr6jugch6tfph6yfv7gqdunuha/node_modules/@mui/material/Box/Box.js
var import_prop_types = __toESM(require_prop_types());

// node_modules/.pnpm/@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_xr6jugch6tfph6yfv7gqdunuha/node_modules/@mui/material/Box/boxClasses.js
var boxClasses = generateUtilityClasses("MuiBox", ["root"]);
var boxClasses_default = boxClasses;

// node_modules/.pnpm/@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_xr6jugch6tfph6yfv7gqdunuha/node_modules/@mui/material/Box/Box.js
var defaultTheme = createTheme();
var Box = createBox({
  themeId: identifier_default,
  defaultTheme,
  defaultClassName: boxClasses_default.root,
  generateClassName: ClassNameGenerator_default.generate
});
true ? Box.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Box_default = Box;

export {
  boxClasses_default,
  Box_default
};
//# sourceMappingURL=chunk-3EOAJVUK.js.map