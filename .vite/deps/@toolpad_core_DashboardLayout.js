import {
  AuthenticationContext,
  BrandingContext,
  NavigationContext,
  PaletteModeContext,
  RouterContext,
  SessionContext,
  WindowContext,
  require_browser
} from "./chunk-P7DC5HL4.js";
import "./chunk-SHAFMCKG.js";
import {
  AppBar_default,
  Avatar_default,
  Button_default,
  Collapse_default,
  Divider_default,
  Drawer_default,
  IconButton_default,
  ListItemButton_default,
  ListItemIcon_default,
  ListItemText_default,
  ListItem_default,
  ListSubheader_default,
  List_default,
  Popover_default,
  Stack_default,
  Toolbar_default,
  Tooltip_default
} from "./chunk-E7THHOHS.js";
import {
  createSvgIcon
} from "./chunk-IGHBHUQL.js";
import "./chunk-IM3RSAW5.js";
import {
  Box_default
} from "./chunk-3EOAJVUK.js";
import "./chunk-H4RSWNHD.js";
import {
  Typography_default
} from "./chunk-WRXVVAX2.js";
import "./chunk-V4XUB4KG.js";
import {
  require_jsx_runtime,
  require_prop_types,
  styled_default,
  useMediaQuery,
  useTheme
} from "./chunk-4E2T3SLP.js";
import {
  require_react
} from "./chunk-YF6YTEQP.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/DashboardLayout/DashboardLayout.js
var React8 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());

// node_modules/.pnpm/@mui+icons-material@6.1.2_@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_rea_fwuaiunoo72kqjcqjr4z3mcx5y/node_modules/@mui/icons-material/esm/ExpandLess.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpandLess_default = createSvgIcon((0, import_jsx_runtime.jsx)("path", {
  d: "m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
}), "ExpandLess");

// node_modules/.pnpm/@mui+icons-material@6.1.2_@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_rea_fwuaiunoo72kqjcqjr4z3mcx5y/node_modules/@mui/icons-material/esm/ExpandMore.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpandMore_default = createSvgIcon((0, import_jsx_runtime2.jsx)("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
}), "ExpandMore");

// node_modules/.pnpm/@mui+icons-material@6.1.2_@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_rea_fwuaiunoo72kqjcqjr4z3mcx5y/node_modules/@mui/icons-material/esm/Menu.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var Menu_default = createSvgIcon((0, import_jsx_runtime3.jsx)("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");

// node_modules/.pnpm/@mui+icons-material@6.1.2_@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_rea_fwuaiunoo72kqjcqjr4z3mcx5y/node_modules/@mui/icons-material/esm/MenuOpen.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var MenuOpen_default = createSvgIcon((0, import_jsx_runtime4.jsx)("path", {
  d: "M3 18h13v-2H3zm0-5h10v-2H3zm0-7v2h13V6zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5z"
}), "MenuOpen");

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/shared/Link.js
var React = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var Link = React.forwardRef(function Link2(props, ref) {
  const {
    children,
    href,
    onClick,
    history,
    ...rest
  } = props;
  const routerContext = React.useContext(RouterContext);
  const handleLinkClick = React.useMemo(() => {
    if (!routerContext) {
      return onClick;
    }
    return (event) => {
      event.preventDefault();
      const url = new URL(event.currentTarget.href);
      routerContext.navigate(url.pathname, {
        history
      });
      onClick == null ? void 0 : onClick(event);
    };
  }, [routerContext, onClick, history]);
  return (0, import_jsx_runtime5.jsx)("a", {
    ref,
    href,
    ...rest,
    onClick: handleLinkClick,
    children
  });
});

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/Account/Account.js
var React3 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/.pnpm/@mui+icons-material@6.1.2_@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_rea_fwuaiunoo72kqjcqjr4z3mcx5y/node_modules/@mui/icons-material/esm/Logout.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var Logout_default = createSvgIcon((0, import_jsx_runtime6.jsx)("path", {
  d: "m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
}), "Logout");

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/Account/SessionAvatar.js
var React2 = __toESM(require_react());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
function SessionAvatar(props) {
  var _a, _b, _c;
  const {
    session,
    ...rest
  } = props;
  return (0, import_jsx_runtime7.jsx)(Avatar_default, {
    src: ((_a = session.user) == null ? void 0 : _a.image) || "",
    alt: ((_b = session.user) == null ? void 0 : _b.name) || ((_c = session.user) == null ? void 0 : _c.email) || "",
    ...rest
  });
}

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/shared/locales/en.js
var TOOLPAD_CORE_DEFAULT_LOCALE_TEXT = {
  // Account
  signInLabel: "Sign In",
  signOutLabel: "Sign Out"
};
var en_default = TOOLPAD_CORE_DEFAULT_LOCALE_TEXT;

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/Account/Account.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var _Logout;
var AccountInfoContainer = styled_default("div")(({
  theme
}) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  gap: theme.spacing(2)
}));
var SignOutContainer = styled_default("div")(({
  theme
}) => ({
  display: "flex",
  flexDirection: "row",
  padding: theme.spacing(1),
  justifyContent: "flex-end"
}));
function Account(props) {
  const {
    slots,
    slotProps,
    localeText = en_default
  } = props;
  const [anchorEl, setAnchorEl] = React3.useState(null);
  const session = React3.useContext(SessionContext);
  const authentication = React3.useContext(AuthenticationContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!authentication) {
    return null;
  }
  if (!(session == null ? void 0 : session.user)) {
    return (slots == null ? void 0 : slots.signInButton) ? (0, import_jsx_runtime8.jsx)(slots.signInButton, {
      onClick: authentication.signIn
    }) : (0, import_jsx_runtime8.jsx)(Button_default, {
      disableElevation: true,
      variant: "contained",
      color: "inherit",
      size: "small",
      onClick: authentication.signIn,
      sx: {
        textTransform: "capitalize",
        filter: "opacity(0.9)",
        transition: "filter 0.2s ease-in",
        "&:hover": {
          filter: "opacity(1)"
        }
      },
      ...slotProps == null ? void 0 : slotProps.signInButton,
      children: localeText == null ? void 0 : localeText.signInLabel
    });
  }
  return (0, import_jsx_runtime8.jsxs)(React3.Fragment, {
    children: [(0, import_jsx_runtime8.jsx)("div", {
      style: {
        display: "flex",
        alignItems: "center",
        textAlign: "center"
      },
      children: (0, import_jsx_runtime8.jsx)(Tooltip_default, {
        title: session.user.name ?? "Account",
        children: (0, import_jsx_runtime8.jsx)(IconButton_default, {
          onClick: handleClick,
          "aria-describedby": "account-menu",
          "aria-label": "Current User",
          size: "small",
          "aria-controls": open ? "account-menu" : void 0,
          "aria-haspopup": "true",
          "aria-expanded": open ? "true" : void 0,
          ...slotProps == null ? void 0 : slotProps.iconButton,
          children: (0, import_jsx_runtime8.jsx)(SessionAvatar, {
            session,
            sx: {
              width: 32,
              height: 32
            }
          })
        })
      })
    }), (0, import_jsx_runtime8.jsxs)(Popover_default, {
      anchorEl,
      id: "account-menu",
      open,
      onClick: handleClose,
      onClose: handleClose,
      slotProps: {
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1,
            // Attach a caret to the dropdown menu
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }
      },
      transformOrigin: {
        horizontal: "right",
        vertical: "top"
      },
      anchorOrigin: {
        horizontal: "right",
        vertical: "bottom"
      },
      children: [(0, import_jsx_runtime8.jsxs)(AccountInfoContainer, {
        children: [(0, import_jsx_runtime8.jsx)(SessionAvatar, {
          session,
          sx: {
            height: 48,
            width: 48
          }
        }), (0, import_jsx_runtime8.jsxs)("div", {
          children: [(0, import_jsx_runtime8.jsx)(Typography_default, {
            fontWeight: "bolder",
            children: session.user.name
          }), (0, import_jsx_runtime8.jsx)(Typography_default, {
            variant: "caption",
            children: session.user.email
          })]
        })]
      }), (0, import_jsx_runtime8.jsx)(Divider_default, {
        sx: {
          mb: 1
        }
      }), (slots == null ? void 0 : slots.menuItems) ? (0, import_jsx_runtime8.jsx)(slots.menuItems, {}) : null, (slots == null ? void 0 : slots.signOutButton) ? (0, import_jsx_runtime8.jsx)(slots.signOutButton, {
        onClick: authentication == null ? void 0 : authentication.signOut
      }) : (0, import_jsx_runtime8.jsx)(SignOutContainer, {
        children: (0, import_jsx_runtime8.jsx)(Button_default, {
          disabled: !authentication,
          variant: "outlined",
          size: "small",
          disableElevation: true,
          onClick: authentication == null ? void 0 : authentication.signOut,
          sx: {
            textTransform: "capitalize",
            fontWeight: "normal",
            filter: "opacity(0.9)",
            transition: "filter 0.2s ease-in",
            "&:hover": {
              filter: "opacity(1)"
            }
          },
          startIcon: _Logout || (_Logout = (0, import_jsx_runtime8.jsx)(Logout_default, {})),
          ...slotProps == null ? void 0 : slotProps.signOutButton,
          children: localeText == null ? void 0 : localeText.signOutLabel
        })
      })]
    })]
  });
}
true ? Account.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The labels for the account component.
   * @default DEFAULT_LOCALE_TEXT
   */
  localeText: import_prop_types.default.shape({
    signInLabel: import_prop_types.default.string.isRequired,
    signOutLabel: import_prop_types.default.string.isRequired
  }),
  /**
   * The props used for each slot inside.
   */
  slotProps: import_prop_types.default.shape({
    iconButton: import_prop_types.default.object,
    signInButton: import_prop_types.default.object,
    signOutButton: import_prop_types.default.object
  }),
  /**
   * The components used for each slot inside.
   */
  slots: import_prop_types.default.shape({
    menuItems: import_prop_types.default.elementType,
    signInButton: import_prop_types.default.elementType,
    signOutButton: import_prop_types.default.elementType
  })
} : void 0;

// node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/shared/navigation.js
var import_invariant = __toESM(require_browser());
var getItemKind = (item) => item.kind ?? "page";
var isPageItem = (item) => getItemKind(item) === "page";
var getItemTitle = (item) => {
  return isPageItem(item) ? item.title ?? item.segment ?? "" : item.title;
};
function getPageItemFullPath(basePath, navigationItem) {
  return `${basePath}${basePath && !navigationItem.segment ? "" : "/"}${navigationItem.segment ?? ""}`;
}
function isPageItemSelected(navigationItem, basePath, pathname) {
  return navigationItem.pattern ? pathToRegexp(`${basePath}/${navigationItem.pattern}`).test(pathname) : getPageItemFullPath(basePath, navigationItem) === pathname;
}
function hasSelectedNavigationChildren(navigationItem, basePath, pathname) {
  if (isPageItem(navigationItem) && navigationItem.children) {
    const navigationItemFullPath = getPageItemFullPath(basePath, navigationItem);
    return navigationItem.children.some((nestedNavigationItem) => {
      if (!isPageItem(nestedNavigationItem)) {
        return false;
      }
      if (nestedNavigationItem.children) {
        return hasSelectedNavigationChildren(nestedNavigationItem, navigationItemFullPath, pathname);
      }
      return isPageItemSelected(nestedNavigationItem, navigationItemFullPath, pathname);
    });
  }
  return false;
}

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/shared/branding.js
var React4 = __toESM(require_react());
function useApplicationTitle() {
  const branding = React4.useContext(BrandingContext);
  return (branding == null ? void 0 : branding.title) ?? "Toolpad";
}

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/DashboardLayout/ToolbarActions.js
function ToolbarActions() {
  return null;
}

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/DashboardLayout/ThemeSwitcher.js
var React6 = __toESM(require_react());

// node_modules/.pnpm/@mui+icons-material@6.1.2_@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_rea_fwuaiunoo72kqjcqjr4z3mcx5y/node_modules/@mui/icons-material/esm/DarkMode.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var DarkMode_default = createSvgIcon((0, import_jsx_runtime9.jsx)("path", {
  d: "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1"
}), "DarkMode");

// node_modules/.pnpm/@mui+icons-material@6.1.2_@mui+material@6.1.1_@emotion+react@11.13.3_@types+react@18.3.10_rea_fwuaiunoo72kqjcqjr4z3mcx5y/node_modules/@mui/icons-material/esm/LightMode.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var LightMode_default = createSvgIcon((0, import_jsx_runtime10.jsx)("path", {
  d: "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z"
}), "LightMode");

// node_modules/.pnpm/@toolpad+utils@0.7.0_react@18.3.1/node_modules/@toolpad/utils/dist/hooks/useSsr.js
var React5 = __toESM(require_react());
function subscribe() {
  return () => {
  };
}
function getSnapshot() {
  return false;
}
function getServerSnapshot() {
  return true;
}
function useSsr() {
  return React5.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/DashboardLayout/ThemeSwitcher.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var _DarkModeIcon;
var _LightModeIcon;
function ThemeSwitcher() {
  const isSsr = useSsr();
  const theme = useTheme();
  const {
    paletteMode,
    setPaletteMode,
    isDualTheme
  } = React6.useContext(PaletteModeContext);
  const toggleMode = React6.useCallback(() => {
    setPaletteMode(paletteMode === "dark" ? "light" : "dark");
  }, [paletteMode, setPaletteMode]);
  return isDualTheme ? (0, import_jsx_runtime11.jsx)(Tooltip_default, {
    title: isSsr ? "Switch mode" : `${paletteMode === "dark" ? "Light" : "Dark"} mode`,
    enterDelay: 1e3,
    children: (0, import_jsx_runtime11.jsx)("div", {
      children: (0, import_jsx_runtime11.jsx)(IconButton_default, {
        "aria-label": isSsr ? "Switch theme mode" : `Switch to ${paletteMode === "dark" ? "light" : "dark"} mode`,
        onClick: toggleMode,
        sx: {
          color: (theme.vars ?? theme).palette.primary.dark
        },
        children: theme.getColorSchemeSelector ? (0, import_jsx_runtime11.jsxs)(React6.Fragment, {
          children: [(0, import_jsx_runtime11.jsx)(DarkMode_default, {
            sx: {
              display: "inline",
              [theme.getColorSchemeSelector("dark")]: {
                display: "none"
              }
            }
          }), (0, import_jsx_runtime11.jsx)(LightMode_default, {
            sx: {
              display: "none",
              [theme.getColorSchemeSelector("dark")]: {
                display: "inline"
              }
            }
          })]
        }) : (0, import_jsx_runtime11.jsx)(React6.Fragment, {
          children: isSsr || paletteMode !== "dark" ? _DarkModeIcon || (_DarkModeIcon = (0, import_jsx_runtime11.jsx)(DarkMode_default, {})) : _LightModeIcon || (_LightModeIcon = (0, import_jsx_runtime11.jsx)(LightMode_default, {}))
        })
      })
    })
  }) : null;
}

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/DashboardLayout/ToolpadLogo.js
var React7 = __toESM(require_react());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var _g;
var _path;
var _g2;
var _path2;
var _g3;
function ToolpadLogo({
  size = 40
}) {
  return (0, import_jsx_runtime12.jsxs)("svg", {
    width: size,
    height: size,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: [_g || (_g = (0, import_jsx_runtime12.jsxs)("g", {
      mask: "url(#a)",
      children: [(0, import_jsx_runtime12.jsx)("path", {
        d: "M22.74 27.73v-7.6l6.64-3.79v7.6l-6.64 3.79Z",
        fill: "#007FFF"
      }), (0, import_jsx_runtime12.jsx)("path", {
        d: "M16.1 23.93v-7.59l6.64 3.8v7.59l-6.65-3.8Z",
        fill: "#39F"
      }), (0, import_jsx_runtime12.jsx)("path", {
        d: "m16.1 16.34 6.64-3.8 6.64 3.8-6.64 3.8-6.65-3.8Z",
        fill: "#A5D8FF"
      })]
    })), (0, import_jsx_runtime12.jsx)("mask", {
      id: "b",
      style: {
        maskType: "alpha"
      },
      maskUnits: "userSpaceOnUse",
      x: "8",
      y: "17",
      width: "14",
      height: "15",
      children: _path || (_path = (0, import_jsx_runtime12.jsx)("path", {
        d: "M8.5 22.3c0-1.05.56-2 1.46-2.53l3.75-2.14c.89-.5 1.98-.5 2.87 0l3.75 2.14a2.9 2.9 0 0 1 1.46 2.52v4.23c0 1.04-.56 2-1.46 2.52l-3.75 2.14c-.89.5-1.98.5-2.87 0l-3.75-2.14a2.9 2.9 0 0 1-1.46-2.52v-4.23Z",
        fill: "#D7DCE1"
      }))
    }), _g2 || (_g2 = (0, import_jsx_runtime12.jsxs)("g", {
      mask: "url(#b)",
      children: [(0, import_jsx_runtime12.jsx)("path", {
        d: "M15.14 32v-7.6l6.65-3.8v7.6L15.14 32Z",
        fill: "#007FFF"
      }), (0, import_jsx_runtime12.jsx)("path", {
        d: "M8.5 28.2v-7.6l6.64 3.8V32L8.5 28.2Z",
        fill: "#39F"
      }), (0, import_jsx_runtime12.jsx)("path", {
        d: "m8.5 20.6 6.64-3.79 6.65 3.8-6.65 3.8-6.64-3.8Z",
        fill: "#A5D8FF"
      })]
    })), (0, import_jsx_runtime12.jsx)("mask", {
      id: "c",
      style: {
        maskType: "alpha"
      },
      maskUnits: "userSpaceOnUse",
      x: "8",
      y: "4",
      width: "22",
      height: "20",
      children: _path2 || (_path2 = (0, import_jsx_runtime12.jsx)("path", {
        d: "M24.17 4.82a2.9 2.9 0 0 0-2.87 0L9.97 11.22a2.9 2.9 0 0 0-1.47 2.53v4.22c0 1.04.56 2 1.46 2.52l3.75 2.14c.89.5 1.98.5 2.87 0l11.33-6.42a2.9 2.9 0 0 0 1.47-2.52V9.48c0-1.04-.56-2-1.46-2.52l-3.75-2.14Z",
        fill: "#D7DCE1"
      }))
    }), _g3 || (_g3 = (0, import_jsx_runtime12.jsxs)("g", {
      mask: "url(#c)",
      children: [(0, import_jsx_runtime12.jsx)("path", {
        d: "M15.14 23.46v-7.6L29.38 7.8v7.59l-14.24 8.07Z",
        fill: "#007FFF"
      }), (0, import_jsx_runtime12.jsx)("path", {
        d: "M8.5 19.66v-7.6l6.64 3.8v7.6l-6.64-3.8Z",
        fill: "#39F"
      }), (0, import_jsx_runtime12.jsx)("path", {
        d: "M8.5 12.07 22.74 4l6.64 3.8-14.24 8.06-6.64-3.8Z",
        fill: "#A5D8FF"
      })]
    }))]
  });
}

// node_modules/.pnpm/@toolpad+core@0.7.0_@emotion+react@11.13.3_@types+react@18.3.10_react@18.3.1__@emotion+styled_23lkewbjmnl43kl6zyb2c2k6rm/node_modules/@toolpad/core/DashboardLayout/DashboardLayout.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var _ExpandLessIcon;
var _ExpandMoreIcon;
var _MenuOpenIcon;
var _MenuIcon;
var _Toolbar;
var _ToolpadLogo;
var _ThemeSwitcher;
var _Toolbar2;
var AppBar = styled_default(AppBar_default)(({
  theme
}) => ({
  borderWidth: 0,
  borderBottomWidth: 1,
  borderStyle: "solid",
  borderColor: (theme.vars ?? theme).palette.divider,
  boxShadow: "none",
  // TODO: Temporary fix to issue reported in https://github.com/mui/material-ui/issues/43244
  left: 0,
  zIndex: theme.zIndex.drawer + 1
}));
var LogoContainer = styled_default("div")({
  position: "relative",
  height: 40,
  "& img": {
    maxHeight: 40
  }
});
var getDrawerSxTransitionMixin = (isExpanded, property) => ({
  transition: (theme) => theme.transitions.create(property, {
    easing: theme.transitions.easing.sharp,
    duration: isExpanded ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
  })
});
var getDrawerWidthTransitionMixin = (isExpanded) => ({
  ...getDrawerSxTransitionMixin(isExpanded, "width"),
  overflowX: "hidden"
});
var NavigationListItemButton = styled_default(ListItemButton_default)(({
  theme
}) => ({
  borderRadius: 8,
  "&.Mui-selected": {
    "& .MuiListItemIcon-root": {
      color: (theme.vars ?? theme).palette.primary.dark
    },
    "& .MuiTypography-root": {
      color: (theme.vars ?? theme).palette.primary.dark
    },
    "& .MuiSvgIcon-root": {
      color: (theme.vars ?? theme).palette.primary.dark
    },
    "& .MuiAvatar-root": {
      backgroundColor: (theme.vars ?? theme).palette.primary.dark
    },
    "& .MuiTouchRipple-child": {
      backgroundColor: (theme.vars ?? theme).palette.primary.dark
    }
  },
  "& .MuiSvgIcon-root": {
    color: (theme.vars ?? theme).palette.action.active
  },
  "& .MuiAvatar-root": {
    backgroundColor: (theme.vars ?? theme).palette.action.active
  }
}));
function DashboardSidebarSubNavigation({
  subNavigation,
  basePath = "",
  depth = 0,
  onLinkClick,
  isMini = false,
  isFullyExpanded = true,
  hasDrawerTransitions = false,
  selectedItemId
}) {
  const routerContext = React8.useContext(RouterContext);
  const pathname = (routerContext == null ? void 0 : routerContext.pathname) ?? "/";
  const initialExpandedSidebarItemIds = React8.useMemo(() => subNavigation.map((navigationItem, navigationItemIndex) => ({
    navigationItem,
    originalIndex: navigationItemIndex
  })).filter(({
    navigationItem
  }) => hasSelectedNavigationChildren(navigationItem, basePath, pathname)).map(({
    originalIndex
  }) => `${depth}-${originalIndex}`), [basePath, depth, pathname, subNavigation]);
  const [expandedSidebarItemIds, setExpandedSidebarItemIds] = React8.useState(initialExpandedSidebarItemIds);
  const handleOpenFolderClick = React8.useCallback((itemId) => () => {
    setExpandedSidebarItemIds((previousValue) => previousValue.includes(itemId) ? previousValue.filter((previousValueItemId) => previousValueItemId !== itemId) : [...previousValue, itemId]);
  }, []);
  return (0, import_jsx_runtime13.jsx)(List_default, {
    sx: {
      padding: 0,
      mb: depth === 0 ? 4 : 1,
      pl: 2 * depth
    },
    children: subNavigation.map((navigationItem, navigationItemIndex) => {
      if (navigationItem.kind === "header") {
        return (0, import_jsx_runtime13.jsx)(ListSubheader_default, {
          component: "div",
          sx: {
            fontSize: 12,
            fontWeight: "700",
            height: isMini ? 0 : 40,
            ...hasDrawerTransitions ? getDrawerSxTransitionMixin(isFullyExpanded, "height") : {},
            px: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          },
          children: getItemTitle(navigationItem)
        }, `subheader-${depth}-${navigationItemIndex}`);
      }
      if (navigationItem.kind === "divider") {
        const nextItem = subNavigation[navigationItemIndex + 1];
        return (0, import_jsx_runtime13.jsx)(Divider_default, {
          sx: {
            borderBottomWidth: 2,
            mx: 1,
            mt: 1,
            mb: (nextItem == null ? void 0 : nextItem.kind) === "header" && !isMini ? 0 : 1,
            ...hasDrawerTransitions ? getDrawerSxTransitionMixin(isFullyExpanded, "margin") : {}
          }
        }, `divider-${depth}-${navigationItemIndex}`);
      }
      const navigationItemFullPath = getPageItemFullPath(basePath, navigationItem);
      const navigationItemId = `${depth}-${navigationItemIndex}`;
      const navigationItemTitle = getItemTitle(navigationItem);
      const isNestedNavigationExpanded = expandedSidebarItemIds.includes(navigationItemId);
      const nestedNavigationCollapseIcon = isNestedNavigationExpanded ? _ExpandLessIcon || (_ExpandLessIcon = (0, import_jsx_runtime13.jsx)(ExpandLess_default, {})) : _ExpandMoreIcon || (_ExpandMoreIcon = (0, import_jsx_runtime13.jsx)(ExpandMore_default, {}));
      const listItemIconSize = 34;
      const isSelected = isPageItemSelected(navigationItem, basePath, pathname);
      if (isSelected && selectedItemId) {
        console.warn(`Duplicate selected path in navigation: ${navigationItemFullPath}`);
      }
      if (isSelected && !selectedItemId) {
        selectedItemId = navigationItemId;
      }
      const listItem = (0, import_jsx_runtime13.jsx)(ListItem_default, {
        sx: {
          py: 0,
          px: 1,
          overflowX: "hidden"
        },
        children: (0, import_jsx_runtime13.jsxs)(NavigationListItemButton, {
          selected: isSelected && (!navigationItem.children || isMini),
          sx: {
            px: 1.4,
            height: 48
          },
          ...navigationItem.children && !isMini ? {
            onClick: handleOpenFolderClick(navigationItemId)
          } : {
            LinkComponent: Link,
            href: navigationItemFullPath,
            onClick: onLinkClick
          },
          children: [navigationItem.icon || isMini ? (0, import_jsx_runtime13.jsxs)(ListItemIcon_default, {
            sx: {
              minWidth: listItemIconSize,
              mr: 1.2
            },
            children: [navigationItem.icon ?? null, !navigationItem.icon && isMini ? (0, import_jsx_runtime13.jsx)(Avatar_default, {
              sx: {
                width: listItemIconSize - 7,
                height: listItemIconSize - 7,
                fontSize: 12,
                ml: "-2px"
              },
              children: navigationItemTitle.split(" ").slice(0, 2).map((itemTitleWord) => itemTitleWord.charAt(0).toUpperCase())
            }) : null]
          }) : null, (0, import_jsx_runtime13.jsx)(ListItemText_default, {
            primary: navigationItemTitle,
            sx: {
              whiteSpace: "nowrap",
              zIndex: 1,
              "& .MuiTypography-root": {
                fontWeight: "500"
              }
            }
          }), navigationItem.action && !isMini && isFullyExpanded ? navigationItem.action : null, navigationItem.children && !isMini && isFullyExpanded ? nestedNavigationCollapseIcon : null]
        })
      });
      return (0, import_jsx_runtime13.jsxs)(React8.Fragment, {
        children: [isMini ? (0, import_jsx_runtime13.jsx)(Tooltip_default, {
          title: navigationItemTitle,
          placement: "right",
          children: listItem
        }) : listItem, navigationItem.children && !isMini ? (0, import_jsx_runtime13.jsx)(Collapse_default, {
          in: isNestedNavigationExpanded,
          timeout: "auto",
          unmountOnExit: true,
          children: (0, import_jsx_runtime13.jsx)(DashboardSidebarSubNavigation, {
            subNavigation: navigationItem.children,
            basePath: navigationItemFullPath,
            depth: depth + 1,
            onLinkClick,
            selectedItemId
          })
        }) : null]
      }, navigationItemId);
    })
  });
}
function DashboardLayout(props) {
  const {
    children,
    disableCollapsibleSidebar = false,
    slots,
    slotProps
  } = props;
  const theme = useTheme();
  const branding = React8.useContext(BrandingContext);
  const navigation = React8.useContext(NavigationContext);
  const appWindow = React8.useContext(WindowContext);
  const applicationTitle = useApplicationTitle();
  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] = React8.useState(true);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] = React8.useState(false);
  const isUnderMdViewport = useMediaQuery(theme.breakpoints.down("md"), appWindow && {
    matchMedia: appWindow.matchMedia
  });
  const isOverSmViewport = useMediaQuery(theme.breakpoints.up("sm"), appWindow && {
    matchMedia: appWindow.matchMedia
  });
  const isNavigationExpanded = isUnderMdViewport ? isMobileNavigationExpanded : isDesktopNavigationExpanded;
  const setIsNavigationExpanded = React8.useCallback((newExpanded) => {
    if (isUnderMdViewport) {
      setIsMobileNavigationExpanded(newExpanded);
    } else {
      setIsDesktopNavigationExpanded(newExpanded);
    }
  }, [isUnderMdViewport]);
  const [isNavigationFullyExpanded, setIsNavigationFullyExpanded] = React8.useState(isNavigationExpanded);
  React8.useEffect(() => {
    if (isNavigationExpanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsNavigationFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);
      return () => clearTimeout(drawerWidthTransitionTimeout);
    }
    setIsNavigationFullyExpanded(false);
  }, [isNavigationExpanded, theme]);
  const selectedItemIdRef = React8.useRef("");
  const handleSetNavigationExpanded = React8.useCallback((newExpanded) => () => {
    setIsNavigationExpanded(newExpanded);
  }, [setIsNavigationExpanded]);
  const toggleNavigationExpanded = React8.useCallback(() => {
    setIsNavigationExpanded(!isNavigationExpanded);
  }, [isNavigationExpanded, setIsNavigationExpanded]);
  const handleNavigationLinkClick = React8.useCallback(() => {
    selectedItemIdRef.current = "";
    setIsMobileNavigationExpanded(false);
  }, [setIsMobileNavigationExpanded]);
  React8.useMemo(() => {
    selectedItemIdRef.current = "";
  }, [navigation]);
  const isDesktopMini = !disableCollapsibleSidebar && !isDesktopNavigationExpanded;
  const isMobileMini = !disableCollapsibleSidebar && !isMobileNavigationExpanded;
  const getMenuIcon = React8.useCallback((isExpanded) => {
    const expandMenuActionText = "Expand";
    const collapseMenuActionText = "Collapse";
    return (0, import_jsx_runtime13.jsx)(Tooltip_default, {
      title: `${isExpanded ? collapseMenuActionText : expandMenuActionText} menu`,
      enterDelay: 1e3,
      children: (0, import_jsx_runtime13.jsx)("div", {
        children: (0, import_jsx_runtime13.jsx)(IconButton_default, {
          "aria-label": `${isExpanded ? collapseMenuActionText : expandMenuActionText} navigation menu`,
          onClick: toggleNavigationExpanded,
          children: isExpanded ? _MenuOpenIcon || (_MenuOpenIcon = (0, import_jsx_runtime13.jsx)(MenuOpen_default, {})) : _MenuIcon || (_MenuIcon = (0, import_jsx_runtime13.jsx)(Menu_default, {}))
        })
      })
    });
  }, [toggleNavigationExpanded]);
  const hasDrawerTransitions = isOverSmViewport && (disableCollapsibleSidebar || !isUnderMdViewport);
  const getDrawerContent = React8.useCallback((isMini, ariaLabel) => {
    var _a;
    return (0, import_jsx_runtime13.jsxs)(React8.Fragment, {
      children: [_Toolbar || (_Toolbar = (0, import_jsx_runtime13.jsx)(Toolbar_default, {})), (0, import_jsx_runtime13.jsx)(Box_default, {
        component: "nav",
        "aria-label": ariaLabel,
        sx: {
          overflow: "auto",
          pt: ((_a = navigation[0]) == null ? void 0 : _a.kind) === "header" && !isMini ? 0 : 2,
          ...hasDrawerTransitions ? getDrawerSxTransitionMixin(isNavigationFullyExpanded, "padding") : {}
        },
        children: (0, import_jsx_runtime13.jsx)(DashboardSidebarSubNavigation, {
          subNavigation: navigation,
          onLinkClick: handleNavigationLinkClick,
          isMini,
          isFullyExpanded: isNavigationFullyExpanded,
          hasDrawerTransitions,
          selectedItemId: selectedItemIdRef.current
        })
      })]
    });
  }, [handleNavigationLinkClick, hasDrawerTransitions, isNavigationFullyExpanded, navigation]);
  const getDrawerSharedSx = React8.useCallback((isMini) => {
    const drawerWidth = isMini ? 64 : 320;
    return {
      width: drawerWidth,
      flexShrink: 0,
      ...getDrawerWidthTransitionMixin(isNavigationExpanded),
      [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: "border-box",
        backgroundImage: "none",
        ...getDrawerWidthTransitionMixin(isNavigationExpanded)
      }
    };
  }, [isNavigationExpanded]);
  const ToolbarActionsSlot = (slots == null ? void 0 : slots.toolbarActions) ?? ToolbarActions;
  const ToolbarAccountSlot = (slots == null ? void 0 : slots.toolbarAccount) ?? Account;
  return (0, import_jsx_runtime13.jsxs)(Box_default, {
    sx: {
      display: "flex"
    },
    children: [(0, import_jsx_runtime13.jsx)(AppBar, {
      color: "inherit",
      position: "fixed",
      children: (0, import_jsx_runtime13.jsxs)(Toolbar_default, {
        sx: {
          backgroundColor: "inherit",
          minWidth: "100vw",
          mx: {
            xs: -0.75,
            sm: -1.5
          }
        },
        children: [(0, import_jsx_runtime13.jsx)(Box_default, {
          sx: {
            mr: {
              sm: disableCollapsibleSidebar ? 0 : 1
            },
            display: {
              md: "none"
            }
          },
          children: getMenuIcon(isMobileNavigationExpanded)
        }), (0, import_jsx_runtime13.jsx)(Box_default, {
          sx: {
            display: {
              xs: "none",
              md: disableCollapsibleSidebar ? "none" : "block"
            },
            mr: disableCollapsibleSidebar ? 0 : 1
          },
          children: getMenuIcon(isDesktopNavigationExpanded)
        }), (0, import_jsx_runtime13.jsx)(Box_default, {
          sx: {
            position: {
              xs: "absolute",
              md: "static"
            },
            left: {
              xs: "50%",
              md: "auto"
            },
            transform: {
              xs: "translateX(-50%)",
              md: "none"
            }
          },
          children: (0, import_jsx_runtime13.jsx)(Link, {
            href: "/",
            style: {
              color: "inherit",
              textDecoration: "none"
            },
            children: (0, import_jsx_runtime13.jsxs)(Stack_default, {
              direction: "row",
              alignItems: "center",
              children: [(0, import_jsx_runtime13.jsx)(LogoContainer, {
                children: (branding == null ? void 0 : branding.logo) ?? (_ToolpadLogo || (_ToolpadLogo = (0, import_jsx_runtime13.jsx)(ToolpadLogo, {
                  size: 40
                })))
              }), (0, import_jsx_runtime13.jsx)(Typography_default, {
                variant: "h6",
                sx: {
                  color: (theme.vars ?? theme).palette.primary.main,
                  fontWeight: "700",
                  ml: 0.5,
                  whiteSpace: "nowrap"
                },
                children: applicationTitle
              })]
            })
          })
        }), (0, import_jsx_runtime13.jsx)(Box_default, {
          sx: {
            flexGrow: 1
          }
        }), (0, import_jsx_runtime13.jsxs)(Stack_default, {
          direction: "row",
          spacing: 1,
          children: [(0, import_jsx_runtime13.jsx)(ToolbarActionsSlot, {
            ...slotProps == null ? void 0 : slotProps.toolbarActions
          }), _ThemeSwitcher || (_ThemeSwitcher = (0, import_jsx_runtime13.jsx)(ThemeSwitcher, {})), (0, import_jsx_runtime13.jsx)(ToolbarAccountSlot, {
            ...slotProps == null ? void 0 : slotProps.toolbarAccount
          })]
        })]
      })
    }), (0, import_jsx_runtime13.jsx)(Drawer_default, {
      container: appWindow == null ? void 0 : appWindow.document.body,
      variant: "temporary",
      open: isMobileNavigationExpanded,
      onClose: handleSetNavigationExpanded(false),
      ModalProps: {
        keepMounted: true
        // Better open performance on mobile.
      },
      sx: {
        display: {
          xs: "block",
          sm: disableCollapsibleSidebar ? "block" : "none",
          md: "none"
        },
        ...getDrawerSharedSx(false)
      },
      children: getDrawerContent(false, "Phone")
    }), (0, import_jsx_runtime13.jsx)(Drawer_default, {
      variant: "permanent",
      sx: {
        display: {
          xs: "none",
          sm: disableCollapsibleSidebar ? "none" : "block",
          md: "none"
        },
        ...getDrawerSharedSx(isMobileMini)
      },
      children: getDrawerContent(isMobileMini, "Tablet")
    }), (0, import_jsx_runtime13.jsx)(Drawer_default, {
      variant: "permanent",
      sx: {
        display: {
          xs: "none",
          md: "block"
        },
        ...getDrawerSharedSx(isDesktopMini)
      },
      children: getDrawerContent(isDesktopMini, "Desktop")
    }), (0, import_jsx_runtime13.jsxs)(Box_default, {
      component: "main",
      sx: {
        flexGrow: 1,
        // TODO: Temporary fix to issue reported in https://github.com/mui/material-ui/issues/43244
        minWidth: {
          xs: disableCollapsibleSidebar && isNavigationExpanded ? "100vw" : "auto",
          md: "auto"
        }
      },
      children: [_Toolbar2 || (_Toolbar2 = (0, import_jsx_runtime13.jsx)(Toolbar_default, {})), children]
    })]
  });
}
true ? DashboardLayout.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the dashboard.
   */
  children: import_prop_types2.default.node,
  /**
   * Whether the sidebar should not be collapsible to a mini variant in desktop and tablet viewports.
   * @default false
   */
  disableCollapsibleSidebar: import_prop_types2.default.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: import_prop_types2.default.shape({
    toolbarAccount: import_prop_types2.default.shape({
      localeText: import_prop_types2.default.shape({
        signInLabel: import_prop_types2.default.string.isRequired,
        signOutLabel: import_prop_types2.default.string.isRequired
      }),
      slotProps: import_prop_types2.default.shape({
        iconButton: import_prop_types2.default.object,
        signInButton: import_prop_types2.default.object,
        signOutButton: import_prop_types2.default.object
      }),
      slots: import_prop_types2.default.shape({
        menuItems: import_prop_types2.default.elementType,
        signInButton: import_prop_types2.default.elementType,
        signOutButton: import_prop_types2.default.elementType
      })
    }),
    toolbarActions: import_prop_types2.default.object
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: import_prop_types2.default.shape({
    toolbarAccount: import_prop_types2.default.elementType,
    toolbarActions: import_prop_types2.default.elementType
  })
} : void 0;
export {
  DashboardLayout,
  ToolbarActions
};
//# sourceMappingURL=@toolpad_core_DashboardLayout.js.map
