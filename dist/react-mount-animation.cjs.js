'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const AnimatedInternal = React__default["default"].forwardRef((_a, ref) => {
  var _b = _a, { as, children } = _b, rest = __objRest(_b, ["as", "children"]);
  const Element = as || "div";
  const [shouldRender, setRender] = React.useState(rest.show);
  const [mountId, setMountId] = React.useState("");
  const [unmountId, setUnmountId] = React.useState("");
  const [styleSheet, setStyleSheet] = React.useState(null);
  const cleanedProps = Object.assign({}, rest);
  delete cleanedProps["show"];
  delete cleanedProps["time"];
  delete cleanedProps["unmountTime"];
  delete cleanedProps["delay"];
  delete cleanedProps["unmountDelay"];
  delete cleanedProps["mountAnim"];
  delete cleanedProps["unmountAnim"];
  delete cleanedProps["mountAnimId"];
  delete cleanedProps["unmountAnimId"];
  delete cleanedProps["onAnimationEnd"];
  delete cleanedProps["onMountEnd"];
  delete cleanedProps["onUnmountEnd"];
  delete cleanedProps["mountTimingFunction"];
  delete cleanedProps["unmountTimingFunction"];
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      let newStyleSheet = document.styleSheets[0];
      if (!newStyleSheet) {
        newStyleSheet = document.createElement("style");
        document.head.appendChild(newStyleSheet);
      }
      setStyleSheet(document.styleSheets[0]);
    }
  }, []);
  React.useEffect(() => {
    if (!styleSheet)
      return;
    if (!!rest.mountAnimId && typeof rest.mountAnimId === "string") {
      setMountId(rest.mountAnimId);
    } else {
      let newMountId = `mount-${makeId(8)}`;
      const keyframes = `@-webkit-keyframes ${newMountId} {
          ${rest.mountAnim}
      }
      `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules ? styleSheet.cssRules.length : 0);
      setMountId(newMountId);
    }
    if (!!rest.unmountAnimId && typeof rest.unmountAnimId === "string") {
      setUnmountId(rest.unmountAnimId);
    } else {
      let newUnmountId = `mount-${makeId(8)}`;
      const keyframes = `@-webkit-keyframes ${newUnmountId} {
        ${rest.unmountAnim ? rest.unmountAnim : rest.mountAnim}
      }
      `;
      styleSheet.insertRule(keyframes, styleSheet.cssRules ? styleSheet.cssRules.length : 0);
      setUnmountId(newUnmountId);
    }
  }, [styleSheet, rest.mountAnim, rest.unmountAnim, rest.mountAnimId, rest.unmountAnimId]);
  React.useEffect(() => {
    if (rest.show) {
      if (rest.delay && typeof rest.delay === "number") {
        setTimeout(() => {
          setRender(true);
        }, rest.delay * 1e3);
      } else {
        setRender(true);
      }
    }
  }, [rest.show, rest.delay]);
  const onAnimationEnd = () => {
    if (!rest.show)
      setRender(false);
    if (rest.onMountEnd && rest.show) {
      rest.onMountEnd();
    }
    if (rest.onUnmountEnd && !rest.show) {
      rest.onUnmountEnd();
    }
    if (rest.onAnimationEnd) {
      rest.onAnimationEnd();
    }
  };
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, shouldRender && /* @__PURE__ */ React__default["default"].createElement(Element, __spreadProps(__spreadValues({
    ref
  }, cleanedProps), {
    style: __spreadValues({
      animationName: `${rest.show ? mountId : unmountId}`,
      animationDuration: `${rest.unmountTime !== void 0 && !rest.show ? rest.unmountTime : rest.time ? rest.time : 1}s`,
      animationDirection: rest.show || !!rest.unmountAnim || !!rest.unmountAnimId ? "normal" : "reverse",
      animationDelay: `${rest.unmountDelay !== void 0 && !rest.show ? rest.unmountDelay : 0}s`,
      animationTimingFunction: rest.unmountTimingFunction !== void 0 && !rest.show ? rest.unmountTimingFunction : rest.mountTimingFunction
    }, rest.style),
    onAnimationEnd
  }), children));
});
const makeId = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const AnimatedInternalFactory = (props) => /* @__PURE__ */ React__default["default"].createElement(AnimatedInternal, __spreadValues({}, props));
const TransientAnimatedInternalFactory = (props) => {
  const cleaned = {};
  for (const key in props) {
    const t = key.startsWith("$") ? key.substring(1) : key;
    cleaned[t] = props[key];
  }
  return /* @__PURE__ */ React__default["default"].createElement(AnimatedInternal, __spreadValues({}, cleaned));
};
const Animated = {
  a: AnimatedInternalFactory,
  abbr: AnimatedInternalFactory,
  address: AnimatedInternalFactory,
  area: AnimatedInternalFactory,
  article: AnimatedInternalFactory,
  aside: AnimatedInternalFactory,
  audio: AnimatedInternalFactory,
  b: AnimatedInternalFactory,
  base: AnimatedInternalFactory,
  bdi: AnimatedInternalFactory,
  bdo: AnimatedInternalFactory,
  big: AnimatedInternalFactory,
  blockquote: AnimatedInternalFactory,
  body: AnimatedInternalFactory,
  br: AnimatedInternalFactory,
  button: AnimatedInternalFactory,
  canvas: AnimatedInternalFactory,
  caption: AnimatedInternalFactory,
  cite: AnimatedInternalFactory,
  code: AnimatedInternalFactory,
  col: AnimatedInternalFactory,
  colgroup: AnimatedInternalFactory,
  data: AnimatedInternalFactory,
  datalist: AnimatedInternalFactory,
  dd: AnimatedInternalFactory,
  del: AnimatedInternalFactory,
  details: AnimatedInternalFactory,
  dfn: AnimatedInternalFactory,
  dialog: AnimatedInternalFactory,
  div: AnimatedInternalFactory,
  dl: AnimatedInternalFactory,
  dt: AnimatedInternalFactory,
  em: AnimatedInternalFactory,
  embed: AnimatedInternalFactory,
  fieldset: AnimatedInternalFactory,
  figcaption: AnimatedInternalFactory,
  figure: AnimatedInternalFactory,
  footer: AnimatedInternalFactory,
  form: AnimatedInternalFactory,
  h1: AnimatedInternalFactory,
  h2: AnimatedInternalFactory,
  h3: AnimatedInternalFactory,
  h4: AnimatedInternalFactory,
  h5: AnimatedInternalFactory,
  h6: AnimatedInternalFactory,
  head: AnimatedInternalFactory,
  header: AnimatedInternalFactory,
  hgroup: AnimatedInternalFactory,
  hr: AnimatedInternalFactory,
  html: AnimatedInternalFactory,
  i: AnimatedInternalFactory,
  iframe: AnimatedInternalFactory,
  img: AnimatedInternalFactory,
  input: AnimatedInternalFactory,
  ins: AnimatedInternalFactory,
  kbd: AnimatedInternalFactory,
  keygen: AnimatedInternalFactory,
  label: AnimatedInternalFactory,
  legend: AnimatedInternalFactory,
  li: AnimatedInternalFactory,
  link: AnimatedInternalFactory,
  main: AnimatedInternalFactory,
  map: AnimatedInternalFactory,
  mark: AnimatedInternalFactory,
  menu: AnimatedInternalFactory,
  menuitem: AnimatedInternalFactory,
  meta: AnimatedInternalFactory,
  meter: AnimatedInternalFactory,
  nav: AnimatedInternalFactory,
  noindex: AnimatedInternalFactory,
  noscript: AnimatedInternalFactory,
  object: AnimatedInternalFactory,
  ol: AnimatedInternalFactory,
  optgroup: AnimatedInternalFactory,
  option: AnimatedInternalFactory,
  output: AnimatedInternalFactory,
  p: AnimatedInternalFactory,
  param: AnimatedInternalFactory,
  picture: AnimatedInternalFactory,
  pre: AnimatedInternalFactory,
  progress: AnimatedInternalFactory,
  q: AnimatedInternalFactory,
  rp: AnimatedInternalFactory,
  rt: AnimatedInternalFactory,
  ruby: AnimatedInternalFactory,
  s: AnimatedInternalFactory,
  samp: AnimatedInternalFactory,
  slot: AnimatedInternalFactory,
  script: AnimatedInternalFactory,
  section: AnimatedInternalFactory,
  select: AnimatedInternalFactory,
  small: AnimatedInternalFactory,
  source: AnimatedInternalFactory,
  span: AnimatedInternalFactory,
  strong: AnimatedInternalFactory,
  style: AnimatedInternalFactory,
  sub: AnimatedInternalFactory,
  summary: AnimatedInternalFactory,
  sup: AnimatedInternalFactory,
  table: AnimatedInternalFactory,
  template: AnimatedInternalFactory,
  tbody: AnimatedInternalFactory,
  td: AnimatedInternalFactory,
  textarea: AnimatedInternalFactory,
  tfoot: AnimatedInternalFactory,
  th: AnimatedInternalFactory,
  thead: AnimatedInternalFactory,
  time: AnimatedInternalFactory,
  title: AnimatedInternalFactory,
  tr: AnimatedInternalFactory,
  track: AnimatedInternalFactory,
  u: AnimatedInternalFactory,
  ul: AnimatedInternalFactory,
  var: AnimatedInternalFactory,
  video: AnimatedInternalFactory,
  wbr: AnimatedInternalFactory,
  webview: AnimatedInternalFactory,
  svg: AnimatedInternalFactory,
  circle: AnimatedInternalFactory,
  ellipse: AnimatedInternalFactory,
  image: AnimatedInternalFactory,
  mask: AnimatedInternalFactory,
  path: AnimatedInternalFactory,
  rect: AnimatedInternalFactory
};
const $Animated = {
  a: TransientAnimatedInternalFactory,
  abbr: TransientAnimatedInternalFactory,
  address: TransientAnimatedInternalFactory,
  area: TransientAnimatedInternalFactory,
  article: TransientAnimatedInternalFactory,
  aside: TransientAnimatedInternalFactory,
  audio: TransientAnimatedInternalFactory,
  b: TransientAnimatedInternalFactory,
  base: TransientAnimatedInternalFactory,
  bdi: TransientAnimatedInternalFactory,
  bdo: TransientAnimatedInternalFactory,
  big: TransientAnimatedInternalFactory,
  blockquote: TransientAnimatedInternalFactory,
  body: TransientAnimatedInternalFactory,
  br: TransientAnimatedInternalFactory,
  button: TransientAnimatedInternalFactory,
  canvas: TransientAnimatedInternalFactory,
  caption: TransientAnimatedInternalFactory,
  cite: TransientAnimatedInternalFactory,
  code: TransientAnimatedInternalFactory,
  col: TransientAnimatedInternalFactory,
  colgroup: TransientAnimatedInternalFactory,
  data: TransientAnimatedInternalFactory,
  datalist: TransientAnimatedInternalFactory,
  dd: TransientAnimatedInternalFactory,
  del: TransientAnimatedInternalFactory,
  details: TransientAnimatedInternalFactory,
  dfn: TransientAnimatedInternalFactory,
  dialog: TransientAnimatedInternalFactory,
  div: TransientAnimatedInternalFactory,
  dl: TransientAnimatedInternalFactory,
  dt: TransientAnimatedInternalFactory,
  em: TransientAnimatedInternalFactory,
  embed: TransientAnimatedInternalFactory,
  fieldset: TransientAnimatedInternalFactory,
  figcaption: TransientAnimatedInternalFactory,
  figure: TransientAnimatedInternalFactory,
  footer: TransientAnimatedInternalFactory,
  form: TransientAnimatedInternalFactory,
  h1: TransientAnimatedInternalFactory,
  h2: TransientAnimatedInternalFactory,
  h3: TransientAnimatedInternalFactory,
  h4: TransientAnimatedInternalFactory,
  h5: TransientAnimatedInternalFactory,
  h6: TransientAnimatedInternalFactory,
  head: TransientAnimatedInternalFactory,
  header: TransientAnimatedInternalFactory,
  hgroup: TransientAnimatedInternalFactory,
  hr: TransientAnimatedInternalFactory,
  html: TransientAnimatedInternalFactory,
  i: TransientAnimatedInternalFactory,
  iframe: TransientAnimatedInternalFactory,
  img: TransientAnimatedInternalFactory,
  input: TransientAnimatedInternalFactory,
  ins: TransientAnimatedInternalFactory,
  kbd: TransientAnimatedInternalFactory,
  keygen: TransientAnimatedInternalFactory,
  label: TransientAnimatedInternalFactory,
  legend: TransientAnimatedInternalFactory,
  li: TransientAnimatedInternalFactory,
  link: TransientAnimatedInternalFactory,
  main: TransientAnimatedInternalFactory,
  map: TransientAnimatedInternalFactory,
  mark: TransientAnimatedInternalFactory,
  menu: TransientAnimatedInternalFactory,
  menuitem: TransientAnimatedInternalFactory,
  meta: TransientAnimatedInternalFactory,
  meter: TransientAnimatedInternalFactory,
  nav: TransientAnimatedInternalFactory,
  noindex: TransientAnimatedInternalFactory,
  noscript: TransientAnimatedInternalFactory,
  object: TransientAnimatedInternalFactory,
  ol: TransientAnimatedInternalFactory,
  optgroup: TransientAnimatedInternalFactory,
  option: TransientAnimatedInternalFactory,
  output: TransientAnimatedInternalFactory,
  p: TransientAnimatedInternalFactory,
  param: TransientAnimatedInternalFactory,
  picture: TransientAnimatedInternalFactory,
  pre: TransientAnimatedInternalFactory,
  progress: TransientAnimatedInternalFactory,
  q: TransientAnimatedInternalFactory,
  rp: TransientAnimatedInternalFactory,
  rt: TransientAnimatedInternalFactory,
  ruby: TransientAnimatedInternalFactory,
  s: TransientAnimatedInternalFactory,
  samp: TransientAnimatedInternalFactory,
  slot: TransientAnimatedInternalFactory,
  script: TransientAnimatedInternalFactory,
  section: TransientAnimatedInternalFactory,
  select: TransientAnimatedInternalFactory,
  small: TransientAnimatedInternalFactory,
  source: TransientAnimatedInternalFactory,
  span: TransientAnimatedInternalFactory,
  strong: TransientAnimatedInternalFactory,
  style: TransientAnimatedInternalFactory,
  sub: TransientAnimatedInternalFactory,
  summary: TransientAnimatedInternalFactory,
  sup: TransientAnimatedInternalFactory,
  table: TransientAnimatedInternalFactory,
  template: TransientAnimatedInternalFactory,
  tbody: TransientAnimatedInternalFactory,
  td: TransientAnimatedInternalFactory,
  textarea: TransientAnimatedInternalFactory,
  tfoot: TransientAnimatedInternalFactory,
  th: TransientAnimatedInternalFactory,
  thead: TransientAnimatedInternalFactory,
  time: TransientAnimatedInternalFactory,
  title: TransientAnimatedInternalFactory,
  tr: TransientAnimatedInternalFactory,
  track: TransientAnimatedInternalFactory,
  u: TransientAnimatedInternalFactory,
  ul: TransientAnimatedInternalFactory,
  var: TransientAnimatedInternalFactory,
  video: TransientAnimatedInternalFactory,
  wbr: TransientAnimatedInternalFactory,
  webview: TransientAnimatedInternalFactory,
  svg: TransientAnimatedInternalFactory,
  circle: TransientAnimatedInternalFactory,
  ellipse: TransientAnimatedInternalFactory,
  image: TransientAnimatedInternalFactory,
  mask: TransientAnimatedInternalFactory,
  path: TransientAnimatedInternalFactory,
  rect: TransientAnimatedInternalFactory
};

exports.$Animated = $Animated;
exports["default"] = Animated;
//# sourceMappingURL=react-mount-animation.cjs.js.map
