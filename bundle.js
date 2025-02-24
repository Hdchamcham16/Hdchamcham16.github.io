/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./hd-react/src/HdReactV3.ts":
/*!***********************************!*\
  !*** ./hd-react/src/HdReactV3.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   createElement: () => (/* binding */ createElement),
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
    /* harmony export */   render: () => (/* binding */ render),
    /* harmony export */   useEffect: () => (/* binding */ useEffect),
    /* harmony export */   useRef: () => (/* binding */ useRef),
    /* harmony export */   useState: () => (/* binding */ useState)
    /* harmony export */ });
    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var wipRoot = null;
    var currentRoot = null;
    var nextUnitOfWork = null;
    var deletions = [];
    var wipFiber = null;
    var hookIndex = 0;
    function createElement(type, props) {
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }
      return {
        type: type,
        props: _objectSpread(_objectSpread({}, props), {}, {
          children: children.flat().map(function (child) {
            if (_typeof(child) === "object") {
              return child;
            }
            if (typeof child === "boolean" || child === null || child === undefined) {
              return null;
            }
            return createTextElement(child);
          })
        })
      };
    }
    function createTextElement(text) {
      return {
        type: "TEXT_ELEMENT",
        props: {
          nodeValue: text,
          children: []
        }
      };
    }
    function createDom(fiber) {
      var dom = fiber.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);
      updateDom(dom, {}, fiber.props);
      return dom;
    }
    function render(element, container) {
      wipRoot = {
        dom: container,
        props: {
          children: [element]
        },
        parent: undefined,
        child: undefined,
        sibling: undefined,
        alternate: currentRoot
      };
      deletions = [];
      nextUnitOfWork = wipRoot;
    }
    function workLoop(deadline) {
      var shouldYield = false;
      while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
      }
      if (!nextUnitOfWork && wipRoot) {
        commitRoot();
      }
      requestIdleCallback(workLoop);
    }
    requestIdleCallback(workLoop);
    function performUnitOfWork(fiber) {
      var isFunctionComponent = typeof fiber.type === 'function';
      if (isFunctionComponent) {
        updateFunctionComponent(fiber);
      } else {
        updateHostComponent(fiber);
      }
      if (fiber.child) {
        return fiber.child;
      }
      var nextFiber = fiber;
      while (nextFiber) {
        if (nextFiber.sibling) {
          return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
      }
      return null;
    }
    function updateFunctionComponent(fiber) {
      wipFiber = fiber;
      hookIndex = 0;
      wipFiber.hooks = [];
      var children = [fiber.type(fiber.props)];
      reconcileChildren(fiber, children);
    }
    function useState(initial) {
      var _wipFiber;
      var oldHook = (_wipFiber = wipFiber) === null || _wipFiber === void 0 || (_wipFiber = _wipFiber.alternate) === null || _wipFiber === void 0 || (_wipFiber = _wipFiber.hooks) === null || _wipFiber === void 0 ? void 0 : _wipFiber[hookIndex];
      var hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
      };
      var actions = oldHook ? oldHook.queue : [];
      actions.forEach(function (action) {
        hook.state = typeof action === 'function' ? action(hook.state) : action;
      });
      var setState = function setState(action) {
        hook.queue.push(action);
        if (currentRoot && currentRoot.dom) {
          wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot
          };
          nextUnitOfWork = wipRoot;
          deletions = [];
        }
      };
      wipFiber.hooks.push(hook);
      hookIndex++;
      return [hook.state, setState];
    }
    function useEffect(callback, deps) {
      var _wipFiber2;
      var oldHook = (_wipFiber2 = wipFiber) === null || _wipFiber2 === void 0 || (_wipFiber2 = _wipFiber2.alternate) === null || _wipFiber2 === void 0 || (_wipFiber2 = _wipFiber2.hooks) === null || _wipFiber2 === void 0 ? void 0 : _wipFiber2[hookIndex];
      var hook = {
        deps: deps,
        callback: callback,
        cleanup: oldHook ? oldHook.cleanup : undefined
      };
      wipFiber.hooks.push(hook);
      hookIndex++;
    }
    function processEffects() {
      var _currentRoot;
      var fiber = (_currentRoot = currentRoot) === null || _currentRoot === void 0 ? void 0 : _currentRoot.child;
      while (fiber) {
        if (typeof fiber.type === 'function') {
          var hooks = fiber.hooks || [];
          var _loop = function _loop() {
            var _fiber$alternate;
            var hook = hooks[i];
            var oldHook = (_fiber$alternate = fiber.alternate) === null || _fiber$alternate === void 0 || (_fiber$alternate = _fiber$alternate.hooks) === null || _fiber$alternate === void 0 ? void 0 : _fiber$alternate[i];
            if (typeof hook.callback === 'function') {
              // Identify useEffect hook
              var oldDeps = oldHook === null || oldHook === void 0 ? void 0 : oldHook.deps;
              var newDeps = hook.deps;
              var hasChangedDeps = !oldDeps || !newDeps || oldDeps.length !== newDeps.length || newDeps.some(function (dep, idx) {
                return dep !== oldDeps[idx];
              });
              if (hasChangedDeps) {
                // Run previous cleanup
                if (oldHook !== null && oldHook !== void 0 && oldHook.cleanup) {
                  oldHook.cleanup();
                }
                // Run current effect
                var cleanup = hook.callback();
                // Save cleanup for next time
                hook.cleanup = typeof cleanup === 'function' ? cleanup : undefined;
              }
            }
          };
          for (var i = 0; i < hooks.length; i++) {
            _loop();
          }
        }
    
        // Depth-first traversal
        if (fiber.child) {
          fiber = fiber.child;
          continue;
        }
        var nextFiber = fiber;
        while (nextFiber) {
          if (nextFiber.sibling) {
            fiber = nextFiber.sibling;
            break;
          }
          nextFiber = nextFiber.parent;
        }
        if (!nextFiber) {
          fiber = undefined;
        }
      }
    }
    function useRef(initial) {
      return useState({
        current: initial
      })[0];
    }
    function updateHostComponent(fiber) {
      if (!fiber.dom) {
        fiber.dom = createDom(fiber);
      }
      reconcileChildren(fiber, fiber.props.children);
    }
    function reconcileChildren(wipFiber, elements) {
      var _wipFiber$alternate;
      var index = 0;
      var oldFiber = (_wipFiber$alternate = wipFiber.alternate) === null || _wipFiber$alternate === void 0 ? void 0 : _wipFiber$alternate.child;
      var prevSibling = null;
      while (index < elements.length || oldFiber) {
        var element = elements[index];
        var newFiber = null;
        var sameType = oldFiber && element && element.type === oldFiber.type;
        if (sameType) {
          newFiber = {
            type: oldFiber.type,
            props: element.props,
            dom: oldFiber.dom,
            parent: wipFiber,
            alternate: oldFiber,
            effectTag: "UPDATE"
          };
        }
        if (element && !sameType) {
          newFiber = {
            type: element.type,
            props: element.props,
            dom: null,
            parent: wipFiber,
            alternate: null,
            effectTag: "PLACEMENT"
          };
        }
        if (oldFiber && !sameType) {
          oldFiber.effectTag = "DELETION";
          deletions.push(oldFiber);
        }
        if (oldFiber) {
          oldFiber = oldFiber.sibling;
        }
        if (index === 0) {
          wipFiber.child = newFiber || undefined;
        } else if (element) {
          prevSibling.sibling = newFiber || undefined;
        }
        prevSibling = newFiber;
        index++;
      }
    }
    function commitRoot() {
      var _wipRoot;
      deletions.forEach(commitWork);
      commitWork((_wipRoot = wipRoot) === null || _wipRoot === void 0 ? void 0 : _wipRoot.child);
      currentRoot = wipRoot;
      wipRoot = null;
    
      // Process effects after the DOM is committed
      processEffects();
    }
    function commitWork(fiber) {
      if (!fiber) return;
      var domParentFiber = fiber.parent;
      while (!((_domParentFiber = domParentFiber) !== null && _domParentFiber !== void 0 && _domParentFiber.dom)) {
        var _domParentFiber, _domParentFiber2;
        domParentFiber = (_domParentFiber2 = domParentFiber) === null || _domParentFiber2 === void 0 ? void 0 : _domParentFiber2.parent;
      }
      var domParent = domParentFiber.dom;
      if (fiber.effectTag === "PLACEMENT" && fiber.dom) {
        domParent.appendChild(fiber.dom);
      } else if (fiber.effectTag === "UPDATE" && fiber.dom) {
        var _fiber$alternate2;
        updateDom(fiber.dom, ((_fiber$alternate2 = fiber.alternate) === null || _fiber$alternate2 === void 0 ? void 0 : _fiber$alternate2.props) || {}, fiber.props);
      } else if (fiber.effectTag === "DELETION") {
        commitDeletion(fiber, domParent);
        return;
      }
      commitWork(fiber.child);
      commitWork(fiber.sibling);
    }
    function commitDeletion(fiber, domParent) {
      if (fiber.dom) {
        if (domParent.contains(fiber.dom)) {
          domParent.removeChild(fiber.dom);
        } else {
          console.warn("Attempted to remove a node that is not a child of the parent.");
        }
      } else {
        commitDeletion(fiber.child, domParent);
      }
    }
    function updateDom(dom, prevProps, nextProps) {
      // Handle style updates
      var isStyle = function isStyle(key) {
        return key === "style";
      };
      var isProperty = function isProperty(key) {
        return key !== "children" && !isEvent(key) && !isStyle(key);
      };
    
      // Remove old styles
      var prevStyle = prevProps.style || {};
      var nextStyle = nextProps.style || {};
      Object.keys(prevStyle).forEach(function (styleName) {
        if (!(styleName in nextStyle)) {
          dom.style[styleName] = "";
        }
      });
    
      // Set new styles
      Object.keys(nextStyle).forEach(function (styleName) {
        dom.style[styleName] = nextStyle[styleName];
      });
    
      // Remove old properties
      Object.keys(prevProps).filter(isProperty).filter(function (key) {
        return !(key in nextProps);
      }).forEach(function (name) {
        dom[name] = "";
      });
    
      // Set new properties
      Object.keys(nextProps).filter(isProperty).filter(function (key) {
        return prevProps[key] !== nextProps[key];
      }).forEach(function (name) {
        dom[name] = nextProps[name];
      });
    
      // Remove old event listeners
      Object.keys(prevProps).filter(isEvent).filter(function (key) {
        return !(key in nextProps) || prevProps[key] !== nextProps[key];
      }).forEach(function (name) {
        var eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
      });
    
      // Add new event listeners
      Object.keys(nextProps).filter(isEvent).filter(function (key) {
        return prevProps[key] !== nextProps[key];
      }).forEach(function (name) {
        var eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name]);
      });
    }
    var isEvent = function isEvent(key) {
      return key.startsWith("on");
    };
    var HdReact = {
      createElement: createElement,
      render: render,
      useState: useState,
      useEffect: useEffect,
      useRef: useRef
    };
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HdReact);
    
    
    /***/ }),
    
    /***/ "./hd-react/src/index.ts":
    /*!*******************************!*\
      !*** ./hd-react/src/index.ts ***!
      \*******************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   createElement: () => (/* reexport safe */ _HdReactV3__WEBPACK_IMPORTED_MODULE_0__.createElement),
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
    /* harmony export */   render: () => (/* reexport safe */ _HdReactV3__WEBPACK_IMPORTED_MODULE_0__.render),
    /* harmony export */   useEffect: () => (/* reexport safe */ _HdReactV3__WEBPACK_IMPORTED_MODULE_0__.useEffect),
    /* harmony export */   useRef: () => (/* reexport safe */ _HdReactV3__WEBPACK_IMPORTED_MODULE_0__.useRef),
    /* harmony export */   useState: () => (/* reexport safe */ _HdReactV3__WEBPACK_IMPORTED_MODULE_0__.useState)
    /* harmony export */ });
    /* harmony import */ var _HdReactV3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HdReactV3 */ "./hd-react/src/HdReactV3.ts");
    
    
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_HdReactV3__WEBPACK_IMPORTED_MODULE_0__["default"]);
    
    /***/ }),
    
    /***/ "./src/Docs/Sections/Demo.Component.tsx":
    /*!**********************************************!*\
      !*** ./src/Docs/Sections/Demo.Component.tsx ***!
      \**********************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
    /* harmony export */ });
    /* harmony import */ var hd_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hd-react */ "./hd-react/src/index.ts");
    /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/Docs/Sections/types.ts");
    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
    function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
    function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
    function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
    function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
    /** @jsx HdReact.createElement */
    
    
    var sampleCode = "/** @jsx HdReact.createElement */\nimport HdReact from \"hd-react\";\n\nconst InteractiveDemo = () => {\n    const [count, setCount] = HdReact.useState(0);\n    const [color, setColor] = HdReact.useState(\"#ffffff\");\n    const countRef = HdReact.useRef(count);\n\n    HdReact.useEffect(() => {\n        countRef.current = count;\n        document.title = `Counter: ${count}`;\n    }, [count]);\n\n    return (\n        <div>\n            <h3 style={{ color }}>\n                Counter: {count}\n            </h3>\n            <button onClick={() => setCount(count + 1)}>\n                \u25B2\n            </button>\n            <button onClick={() => setCount(count - 1)}>\n                \u25BC\n            </button>\n            <button onClick={() => {\n                setColor(color === \"#ffffff\" ? \"#0099ff\" : \"#ffffff\");\n            }}>\n                Toggle Effect\n            </button>\n        </div>\n    );\n}";
    var Demo = function Demo() {
      var _HdReact$useState = hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useState(false),
        _HdReact$useState2 = _slicedToArray(_HdReact$useState, 2),
        showCode = _HdReact$useState2[0],
        setShowCode = _HdReact$useState2[1];
      return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          padding: "15px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h2", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
          textAlign: "center",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
        }
      }, "Interactive Demo"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          backgroundColor: "#2a2a2a",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "15px",
          boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.1)"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(InteractiveDemo, null), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
        onClick: function onClick() {
          return setShowCode(!showCode);
        },
        style: {
          padding: "8px 20px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#673AB7",
          color: "#fff",
          cursor: "pointer",
          marginTop: "15px",
          fontWeight: "500"
        }
      }, showCode ? "Hide Code" : "Show Code"), showCode && hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          display: "flex",
          gap: "30px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          flex: 1
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("pre", {
        style: {
          backgroundColor: "#000",
          padding: "10px",
          borderRadius: "5px",
          color: "#fff",
          overflow: "auto"
        }
      }, sampleCode)))));
    };
    var InteractiveDemo = function InteractiveDemo() {
      var _HdReact$useState3 = hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useState(0),
        _HdReact$useState4 = _slicedToArray(_HdReact$useState3, 2),
        count = _HdReact$useState4[0],
        setCount = _HdReact$useState4[1];
      var _HdReact$useState5 = hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useState("#ffffff"),
        _HdReact$useState6 = _slicedToArray(_HdReact$useState5, 2),
        color = _HdReact$useState6[0],
        setColor = _HdReact$useState6[1];
      var countRef = hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useRef(count);
      hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useEffect(function () {
        countRef.current = count;
        document.title = "Counter: ".concat(count);
      }, [count]);
      var buttonBaseStyle = {
        padding: "8px 20px",
        border: "none",
        borderRadius: "6px",
        color: "#fff",
        cursor: "pointer",
        transition: "all 0.3s",
        margin: "4px",
        fontWeight: "500",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        fontSize: "14px",
        letterSpacing: "0.5px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
      };
      return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          textAlign: "center",
          background: "#2a2a2a",
          padding: "20px",
          borderRadius: "8px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", {
        style: {
          color: color,
          fontSize: "1.5em",
          transition: "all 0.3s"
        }
      }, "Counter: ", count), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          marginBottom: "15px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
        onClick: function onClick() {
          return setCount(count + 1);
        },
        style: _objectSpread(_objectSpread({}, buttonBaseStyle), {}, {
          backgroundColor: "#000000"
        })
      }, "\u25B2"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
        onClick: function onClick() {
          return setCount(count - 1);
        },
        style: _objectSpread(_objectSpread({}, buttonBaseStyle), {}, {
          backgroundColor: "#000000"
        })
      }, "\u25BC")), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
        onClick: function onClick() {
          setColor(color === "#ffffff" ? "#0099ff" : "#ffffff");
        },
        style: _objectSpread(_objectSpread({}, buttonBaseStyle), {}, {
          backgroundColor: "#000000"
        })
      }, "Toggle Effect"));
    };
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Demo);
    
    /***/ }),
    
    /***/ "./src/Docs/Sections/Issues.Component.tsx":
    /*!************************************************!*\
      !*** ./src/Docs/Sections/Issues.Component.tsx ***!
      \************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
    /* harmony export */ });
    /* harmony import */ var hd_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hd-react */ "./hd-react/src/index.ts");
    /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/Docs/Sections/types.ts");
    /** @jsx HdReact.createElement */
    
    
    var Issues = function Issues() {
      return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          padding: "20px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h1", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
          fontSize: "2em"
        }
      }, "Known Issues"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          background: "linear-gradient(45deg, #1a1a1a, #2a2a2a)",
          padding: "20px",
          borderRadius: "10px",
          margin: "20px 0"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h2", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.secondary
        }
      }, "Bug 1: useEffect Cleanup"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", {
        style: {
          fontSize: "1.1em",
          color: "#e0e0e0"
        }
      }, "The useEffect cleanup function does not properly fire when the component unmounts."), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          marginTop: "15px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.secondary
        }
      }, "Example:"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("pre", {
        style: {
          background: "#2d2d2d",
          padding: "15px",
          borderRadius: "5px",
          overflow: "auto"
        }
      }, "useEffect(() => {\n    console.log(\"Effect running\");\n    return () => {\n        console.log(\"Cleanup should run on unmount\");\n    };\n}, []);")), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          marginTop: "15px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.secondary
        }
      }, "Current Status:"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("ul", {
        style: {
          color: "#e0e0e0"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", null, "\u2717 Cleanup function not executing on unmount"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", null, "\u2713 Effect runs on initial mount"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", null, "\u2717 Memory leaks possible")))));
    };
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Issues);
    
    /***/ }),
    
    /***/ "./src/Docs/Sections/Welcome.Component.tsx":
    /*!*************************************************!*\
      !*** ./src/Docs/Sections/Welcome.Component.tsx ***!
      \*************************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
    /* harmony export */ });
    /* harmony import */ var hd_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hd-react */ "./hd-react/src/index.ts");
    /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/Docs/Sections/types.ts");
    /** @jsx HdReact.createElement */
    
    
    var Welcome = function Welcome() {
      return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          padding: "20px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h1", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
          fontSize: "2.5em"
        }
      }, "Welcome to HdReact!"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", {
        style: {
          fontSize: "1.2em"
        }
      }, "Learn how to build your own React-like library from scratch using modern JavaScript and functional programming concepts."), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          background: "linear-gradient(45deg, #1a1a1a, #2a2a2a)",
          padding: "20px",
          borderRadius: "10px",
          margin: "20px 0"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.secondary
        }
      }, "Quick Features"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("ul", null, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", null, "\u26A1 Fiber-based reconciliation"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", null, "\uD83C\uDFA3 useState, useEffect, useRef hooks"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", null, "\uD83C\uDFA8 Inline CSS styling"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", null, "\uD83D\uDD25 Interactive JSX syntax"))));
    };
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Welcome);
    
    /***/ }),
    
    /***/ "./src/Docs/Sections/index.tsx":
    /*!*************************************!*\
      !*** ./src/Docs/Sections/index.tsx ***!
      \*************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
    /* harmony export */   sections: () => (/* binding */ sections)
    /* harmony export */ });
    /* harmony import */ var hd_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hd-react */ "./hd-react/src/index.ts");
    /* harmony import */ var _Demo_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Demo.Component */ "./src/Docs/Sections/Demo.Component.tsx");
    /* harmony import */ var _Welcome_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Welcome.Component */ "./src/Docs/Sections/Welcome.Component.tsx");
    /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./src/Docs/Sections/types.ts");
    /* harmony import */ var _Issues_Component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Issues.Component */ "./src/Docs/Sections/Issues.Component.tsx");
    function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
    function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
    function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
    function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
    function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
    /** @jsx HdReact.createElement */
    
    
    
    
    
    var sections = [{
      id: "welcome",
      title: "🚀 Welcome to HdReact",
      component: function component() {
        return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_Welcome_Component__WEBPACK_IMPORTED_MODULE_2__["default"], null);
      }
    }, {
      id: "demo",
      title: "🎉 Demo",
      component: function component() {
        return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_Demo_Component__WEBPACK_IMPORTED_MODULE_1__["default"], null);
      }
    }, {
      id: "issues",
      title: "🐛 Known Issues",
      component: function component() {
        return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_Issues_Component__WEBPACK_IMPORTED_MODULE_4__["default"], null);
      }
    }];
    var Sections = function Sections() {
      var _HdReact$useState = hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useState(0),
        _HdReact$useState2 = _slicedToArray(_HdReact$useState, 2),
        activeSectionIndex = _HdReact$useState2[0],
        setActiveSectionIndex = _HdReact$useState2[1];
      hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useEffect(function () {
        document.title = "HdReact Docs - ".concat(sections[activeSectionIndex].title);
      }, [activeSectionIndex]);
      return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          display: "flex",
          height: "97.8vh",
          backgroundColor: _types__WEBPACK_IMPORTED_MODULE_3__.THEME.bg,
          color: _types__WEBPACK_IMPORTED_MODULE_3__.THEME.text,
          fontFamily: "'Segoe UI', sans-serif",
          borderRadius: "8px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          width: "300px",
          backgroundColor: "#2a2a2a",
          padding: "20px",
          borderRight: "2px solid ".concat(_types__WEBPACK_IMPORTED_MODULE_3__.THEME.primary)
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h2", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_3__.THEME.primary
        }
      }, "\uD83D\uDCDA HdReact Docs"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", {
        href: "https://github.com/Hdchamcham16/HdReact",
        target: "_blank",
        style: {
          textDecoration: "none"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          fontSize: "12px",
          color: _types__WEBPACK_IMPORTED_MODULE_3__.THEME.text,
          marginBottom: "20px",
          opacity: 0.7,
          cursor: "pointer",
          transition: "all 0.3s ease",
          ":hover": {
            opacity: 1,
            transform: "scale(1.05)"
          }
        }
      }, "Built with HdReact - 2025 | GitHub")), sections.map(function (section, index) {
        return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
          key: section.id,
          onClick: function onClick() {
            return setActiveSectionIndex(index);
          },
          style: {
            width: "100%",
            padding: "15px",
            margin: "10px 0",
            backgroundColor: activeSectionIndex === index ? "".concat(_types__WEBPACK_IMPORTED_MODULE_3__.THEME.primary, "40") : "transparent",
            border: "2px solid ".concat(_types__WEBPACK_IMPORTED_MODULE_3__.THEME.primary),
            borderRadius: "8px",
            color: _types__WEBPACK_IMPORTED_MODULE_3__.THEME.text,
            cursor: "pointer",
            transition: "all 0.3s",
            textAlign: "left"
          }
        }, section.title);
      })), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          flex: 1,
          overflowY: "auto",
          padding: "20px"
        }
      }, sections[activeSectionIndex].component()));
    };
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sections);
    
    /***/ }),
    
    /***/ "./src/Docs/Sections/types.ts":
    /*!************************************!*\
      !*** ./src/Docs/Sections/types.ts ***!
      \************************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   THEME: () => (/* binding */ THEME)
    /* harmony export */ });
    var THEME = {
      bg: "#1a1a1a",
      text: "#ffffff",
      primary: "#00ff88",
      secondary: "#ff00ff"
    };
    
    /***/ }),
    
    /***/ "./src/Docs/index.tsx":
    /*!****************************!*\
      !*** ./src/Docs/index.tsx ***!
      \****************************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
    /* harmony export */ });
    /* harmony import */ var _Sections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sections */ "./src/Docs/Sections/index.tsx");
    
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Sections__WEBPACK_IMPORTED_MODULE_0__["default"]);
    
    /***/ }),
    
    /***/ "./src/index.tsx":
    /*!***********************!*\
      !*** ./src/index.tsx ***!
      \***********************/
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */ __webpack_require__.d(__webpack_exports__, {
    /* harmony export */   "default": () => (/* binding */ App)
    /* harmony export */ });
    /* harmony import */ var hd_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hd-react */ "./hd-react/src/index.ts");
    /* harmony import */ var _Docs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Docs */ "./src/Docs/index.tsx");
    /** @jsx HdReact.createElement */
    
    
    function App() {
      return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_Docs__WEBPACK_IMPORTED_MODULE_1__["default"], null);
    }
    ;
    
    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
    /******/ 			return cachedModule.exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
    /******/ 			// no module.id needed
    /******/ 			// no module.loaded needed
    /******/ 			exports: {}
    /******/ 		};
    /******/ 	
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/ 	
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/ 	
    /************************************************************************/
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	(() => {
    /******/ 		// define getter functions for harmony exports
    /******/ 		__webpack_require__.d = (exports, definition) => {
    /******/ 			for(var key in definition) {
    /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    /******/ 				}
    /******/ 			}
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	(() => {
    /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/make namespace object */
    /******/ 	(() => {
    /******/ 		// define __esModule on exports
    /******/ 		__webpack_require__.r = (exports) => {
    /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    /******/ 			}
    /******/ 			Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
    (() => {
    /*!*******************!*\
      !*** ./index.tsx ***!
      \*******************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var hd_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hd-react */ "./hd-react/src/index.ts");
    /* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src */ "./src/index.tsx");
    /** @jsx HdReact.createElement */
    
    
    var render = function render() {
      var container = document.getElementById("root") || document.body;
      container.innerHTML = "";
      hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].render(hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_src__WEBPACK_IMPORTED_MODULE_1__["default"], null), container);
    };
    render();
    })();
    
    /******/ })()
    ;
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVMsR0FBR0wsUUFBUSxDQUFDZ0ssY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJaEssUUFBUSxDQUFDaUssSUFBSTtFQUNsRTVKLFNBQVMsQ0FBQzZKLFNBQVMsR0FBRyxFQUFFO0VBQ3hCckUsdURBQWMsQ0FBQ0EsOERBQUEsQ0FBQ2tFLDRDQUFHLE1BQUUsQ0FBQyxFQUFFMUosU0FBUyxDQUFDO0FBQ3RDLENBQUM7QUFFREYsTUFBTSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2hkcmVhY3QvLi9oZC1yZWFjdC9zcmMvSGRSZWFjdFYzLnRzIiwid2VicGFjazovL2hkcmVhY3QvLi9oZC1yZWFjdC9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vaGRyZWFjdC8uL3NyYy9Eb2NzL1NlY3Rpb25zL0RlbW8uQ29tcG9uZW50LnRzeCIsIndlYnBhY2s6Ly9oZHJlYWN0Ly4vc3JjL0RvY3MvU2VjdGlvbnMvSXNzdWVzLkNvbXBvbmVudC50c3giLCJ3ZWJwYWNrOi8vaGRyZWFjdC8uL3NyYy9Eb2NzL1NlY3Rpb25zL1dlbGNvbWUuQ29tcG9uZW50LnRzeCIsIndlYnBhY2s6Ly9oZHJlYWN0Ly4vc3JjL0RvY3MvU2VjdGlvbnMvaW5kZXgudHN4Iiwid2VicGFjazovL2hkcmVhY3QvLi9zcmMvRG9jcy9TZWN0aW9ucy90eXBlcy50cyIsIndlYnBhY2s6Ly9oZHJlYWN0Ly4vc3JjL0RvY3MvaW5kZXgudHN4Iiwid2VicGFjazovL2hkcmVhY3QvLi9zcmMvaW5kZXgudHN4Iiwid2VicGFjazovL2hkcmVhY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGRyZWFjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGRyZWFjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hkcmVhY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oZHJlYWN0Ly4vaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImludGVyZmFjZSBGaWJlciB7XHJcbiAgICBkb206IEhUTUxFbGVtZW50IHwgVGV4dCB8IG51bGw7XHJcbiAgICB0eXBlPzogc3RyaW5nIHwgRnVuY3Rpb247XHJcbiAgICBwcm9wczoge1xyXG4gICAgICAgIGNoaWxkcmVuOiBhbnlbXTtcclxuICAgICAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbiAgICB9O1xyXG4gICAgcGFyZW50PzogRmliZXI7XHJcbiAgICBjaGlsZD86IEZpYmVyO1xyXG4gICAgc2libGluZz86IEZpYmVyO1xyXG4gICAgYWx0ZXJuYXRlPzogRmliZXIgfCBudWxsO1xyXG4gICAgZWZmZWN0VGFnPzogXCJQTEFDRU1FTlRcIiB8IFwiVVBEQVRFXCIgfCBcIkRFTEVUSU9OXCI7XHJcbiAgICBob29rcz86IGFueVtdO1xyXG59XHJcblxyXG5sZXQgd2lwUm9vdDogRmliZXIgfCBudWxsID0gbnVsbDtcclxubGV0IGN1cnJlbnRSb290OiBGaWJlciB8IG51bGwgPSBudWxsO1xyXG5sZXQgbmV4dFVuaXRPZldvcms6IEZpYmVyIHwgbnVsbCA9IG51bGw7XHJcbmxldCBkZWxldGlvbnM6IEZpYmVyW10gPSBbXTtcclxubGV0IHdpcEZpYmVyOiBGaWJlciB8IG51bGwgPSBudWxsO1xyXG5sZXQgaG9va0luZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlOiBhbnksIHByb3BzOiBhbnksIC4uLmNoaWxkcmVuOiBhbnlbXSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIC4uLnByb3BzLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW4uZmxhdCgpLm1hcChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gXCJib29sZWFuXCIgfHwgY2hpbGQgPT09IG51bGwgfHwgY2hpbGQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVRleHRFbGVtZW50KGNoaWxkKTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50KHRleHQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBcIlRFWFRfRUxFTUVOVFwiLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIG5vZGVWYWx1ZTogdGV4dCxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEb20oZmliZXI6IEZpYmVyKSB7XHJcbiAgICBjb25zdCBkb20gPVxyXG4gICAgICAgIGZpYmVyLnR5cGUgPT09IFwiVEVYVF9FTEVNRU5UXCJcclxuICAgICAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKVxyXG4gICAgICAgICAgICA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZmliZXIudHlwZSBhcyBzdHJpbmcpO1xyXG5cclxuICAgIHVwZGF0ZURvbShkb20sIHt9LCBmaWJlci5wcm9wcyk7XHJcbiAgICByZXR1cm4gZG9tO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXIoZWxlbWVudDogYW55LCBjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XHJcbiAgICB3aXBSb290ID0ge1xyXG4gICAgICAgIGRvbTogY29udGFpbmVyLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbZWxlbWVudF0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJlbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgICBjaGlsZDogdW5kZWZpbmVkLFxyXG4gICAgICAgIHNpYmxpbmc6IHVuZGVmaW5lZCxcclxuICAgICAgICBhbHRlcm5hdGU6IGN1cnJlbnRSb290LFxyXG4gICAgfTtcclxuICAgIGRlbGV0aW9ucyA9IFtdO1xyXG4gICAgbmV4dFVuaXRPZldvcmsgPSB3aXBSb290O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3b3JrTG9vcChkZWFkbGluZTogSWRsZURlYWRsaW5lKSB7XHJcbiAgICBsZXQgc2hvdWxkWWllbGQgPSBmYWxzZTtcclxuICAgIHdoaWxlIChuZXh0VW5pdE9mV29yayAmJiAhc2hvdWxkWWllbGQpIHtcclxuICAgICAgICBuZXh0VW5pdE9mV29yayA9IHBlcmZvcm1Vbml0T2ZXb3JrKG5leHRVbml0T2ZXb3JrKTtcclxuICAgICAgICBzaG91bGRZaWVsZCA9IGRlYWRsaW5lLnRpbWVSZW1haW5pbmcoKSA8IDE7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFuZXh0VW5pdE9mV29yayAmJiB3aXBSb290KSB7XHJcbiAgICAgICAgY29tbWl0Um9vdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RJZGxlQ2FsbGJhY2sod29ya0xvb3ApO1xyXG59XHJcblxyXG5yZXF1ZXN0SWRsZUNhbGxiYWNrKHdvcmtMb29wKTtcclxuXHJcbmZ1bmN0aW9uIHBlcmZvcm1Vbml0T2ZXb3JrKGZpYmVyOiBGaWJlcik6IEZpYmVyIHwgbnVsbCB7XHJcbiAgICBjb25zdCBpc0Z1bmN0aW9uQ29tcG9uZW50ID0gdHlwZW9mIGZpYmVyLnR5cGUgPT09ICdmdW5jdGlvbic7XHJcblxyXG4gICAgaWYgKGlzRnVuY3Rpb25Db21wb25lbnQpIHtcclxuICAgICAgICB1cGRhdGVGdW5jdGlvbkNvbXBvbmVudChmaWJlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHVwZGF0ZUhvc3RDb21wb25lbnQoZmliZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChmaWJlci5jaGlsZCkge1xyXG4gICAgICAgIHJldHVybiBmaWJlci5jaGlsZDtcclxuICAgIH1cclxuICAgIGxldCBuZXh0RmliZXI6IEZpYmVyIHwgdW5kZWZpbmVkID0gZmliZXI7XHJcbiAgICB3aGlsZSAobmV4dEZpYmVyKSB7XHJcbiAgICAgICAgaWYgKG5leHRGaWJlci5zaWJsaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXh0RmliZXIuc2libGluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV4dEZpYmVyID0gbmV4dEZpYmVyLnBhcmVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVGdW5jdGlvbkNvbXBvbmVudChmaWJlcjogRmliZXIpIHtcclxuICAgIHdpcEZpYmVyID0gZmliZXI7XHJcbiAgICBob29rSW5kZXggPSAwO1xyXG4gICAgd2lwRmliZXIuaG9va3MgPSBbXTtcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gWyhmaWJlci50eXBlIGFzIEZ1bmN0aW9uKShmaWJlci5wcm9wcyldO1xyXG4gICAgcmVjb25jaWxlQ2hpbGRyZW4oZmliZXIsIGNoaWxkcmVuKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlU3RhdGU8VD4oaW5pdGlhbDogVCk6IFtULCAoYWN0aW9uOiBUIHwgKChwcmV2OiBUKSA9PiBUKSkgPT4gdm9pZF0ge1xyXG4gICAgY29uc3Qgb2xkSG9vayA9IHdpcEZpYmVyPy5hbHRlcm5hdGU/Lmhvb2tzPy5baG9va0luZGV4XTtcclxuXHJcbiAgICBjb25zdCBob29rID0ge1xyXG4gICAgICAgIHN0YXRlOiBvbGRIb29rID8gb2xkSG9vay5zdGF0ZSA6IGluaXRpYWwsXHJcbiAgICAgICAgcXVldWU6IFtdIGFzIChUIHwgKChwcmV2OiBUKSA9PiBUKSlbXSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgYWN0aW9ucyA9IG9sZEhvb2sgPyBvbGRIb29rLnF1ZXVlIDogW107XHJcbiAgICBhY3Rpb25zLmZvckVhY2goKGFjdGlvbjogVCB8ICgocHJldjogVCkgPT4gVCkpID0+IHtcclxuICAgICAgICBob29rLnN0YXRlID0gdHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IChhY3Rpb24gYXMgKChwcmV2OiBUKSA9PiBUKSkoaG9vay5zdGF0ZSkgOiBhY3Rpb247XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHNldFN0YXRlID0gKGFjdGlvbjogVCB8ICgocHJldjogVCkgPT4gVCkpID0+IHtcclxuICAgICAgICBob29rLnF1ZXVlLnB1c2goYWN0aW9uKTtcclxuICAgICAgICBpZiAoY3VycmVudFJvb3QgJiYgY3VycmVudFJvb3QuZG9tKSB7XHJcbiAgICAgICAgICAgIHdpcFJvb3QgPSB7XHJcbiAgICAgICAgICAgICAgICBkb206IGN1cnJlbnRSb290LmRvbSxcclxuICAgICAgICAgICAgICAgIHByb3BzOiBjdXJyZW50Um9vdC5wcm9wcyxcclxuICAgICAgICAgICAgICAgIGFsdGVybmF0ZTogY3VycmVudFJvb3QsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG5leHRVbml0T2ZXb3JrID0gd2lwUm9vdDtcclxuICAgICAgICAgICAgZGVsZXRpb25zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3aXBGaWJlciEuaG9va3MhLnB1c2goaG9vayk7XHJcbiAgICBob29rSW5kZXgrKztcclxuICAgIHJldHVybiBbaG9vay5zdGF0ZSwgc2V0U3RhdGVdO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VFZmZlY3QoY2FsbGJhY2s6ICgpID0+IHZvaWQgfCAoKCkgPT4gdm9pZCksIGRlcHM/OiBhbnlbXSkge1xyXG4gICAgY29uc3Qgb2xkSG9vayA9IHdpcEZpYmVyPy5hbHRlcm5hdGU/Lmhvb2tzPy5baG9va0luZGV4XTtcclxuXHJcbiAgICBjb25zdCBob29rID0ge1xyXG4gICAgICAgIGRlcHMsXHJcbiAgICAgICAgY2FsbGJhY2ssXHJcbiAgICAgICAgY2xlYW51cDogb2xkSG9vayA/IG9sZEhvb2suY2xlYW51cCA6IHVuZGVmaW5lZCxcclxuICAgIH07XHJcblxyXG4gICAgd2lwRmliZXIhLmhvb2tzIS5wdXNoKGhvb2spO1xyXG4gICAgaG9va0luZGV4Kys7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2Nlc3NFZmZlY3RzKCkge1xyXG4gICAgbGV0IGZpYmVyID0gY3VycmVudFJvb3Q/LmNoaWxkO1xyXG4gICAgd2hpbGUgKGZpYmVyKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmaWJlci50eXBlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvb2tzID0gZmliZXIuaG9va3MgfHwgW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG9va3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhvb2sgPSBob29rc1tpXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZEhvb2sgPSBmaWJlci5hbHRlcm5hdGU/Lmhvb2tzPy5baV07XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGhvb2suY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHsgLy8gSWRlbnRpZnkgdXNlRWZmZWN0IGhvb2tcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGREZXBzID0gb2xkSG9vaz8uZGVwcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdEZXBzID0gaG9vay5kZXBzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc0NoYW5nZWREZXBzID0gIW9sZERlcHMgfHwgIW5ld0RlcHMgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2xkRGVwcy5sZW5ndGggIT09IG5ld0RlcHMubGVuZ3RoIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RlcHMuc29tZSgoZGVwOiBhbnksIGlkeDogbnVtYmVyKSA9PiBkZXAgIT09IG9sZERlcHNbaWR4XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNDaGFuZ2VkRGVwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSdW4gcHJldmlvdXMgY2xlYW51cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkSG9vaz8uY2xlYW51cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkSG9vay5jbGVhbnVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUnVuIGN1cnJlbnQgZWZmZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFudXAgPSBob29rLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNhdmUgY2xlYW51cCBmb3IgbmV4dCB0aW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvb2suY2xlYW51cCA9IHR5cGVvZiBjbGVhbnVwID09PSAnZnVuY3Rpb24nID8gY2xlYW51cCA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERlcHRoLWZpcnN0IHRyYXZlcnNhbFxyXG4gICAgICAgIGlmIChmaWJlci5jaGlsZCkge1xyXG4gICAgICAgICAgICBmaWJlciA9IGZpYmVyLmNoaWxkO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5leHRGaWJlcjogRmliZXIgfCB1bmRlZmluZWQgPSBmaWJlcjtcclxuICAgICAgICB3aGlsZSAobmV4dEZpYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXh0RmliZXIuc2libGluZykge1xyXG4gICAgICAgICAgICAgICAgZmliZXIgPSBuZXh0RmliZXIuc2libGluZztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHRGaWJlciA9IG5leHRGaWJlci5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbmV4dEZpYmVyKSB7XHJcbiAgICAgICAgICAgIGZpYmVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXNlUmVmPFQ+KGluaXRpYWw/OiBUKSB7XHJcbiAgICByZXR1cm4gdXNlU3RhdGUoeyBjdXJyZW50OiBpbml0aWFsIH0pWzBdO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVIb3N0Q29tcG9uZW50KGZpYmVyOiBGaWJlcikge1xyXG4gICAgaWYgKCFmaWJlci5kb20pIHtcclxuICAgICAgICBmaWJlci5kb20gPSBjcmVhdGVEb20oZmliZXIpO1xyXG4gICAgfVxyXG4gICAgcmVjb25jaWxlQ2hpbGRyZW4oZmliZXIsIGZpYmVyLnByb3BzLmNoaWxkcmVuKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVjb25jaWxlQ2hpbGRyZW4od2lwRmliZXI6IEZpYmVyLCBlbGVtZW50czogYW55W10pIHtcclxuICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICBsZXQgb2xkRmliZXIgPSB3aXBGaWJlci5hbHRlcm5hdGU/LmNoaWxkO1xyXG4gICAgbGV0IHByZXZTaWJsaW5nOiBGaWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHdoaWxlIChpbmRleCA8IGVsZW1lbnRzLmxlbmd0aCB8fCBvbGRGaWJlcikge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpbmRleF07XHJcbiAgICAgICAgbGV0IG5ld0ZpYmVyOiBGaWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCBzYW1lVHlwZSA9IG9sZEZpYmVyICYmIGVsZW1lbnQgJiYgZWxlbWVudC50eXBlID09PSBvbGRGaWJlci50eXBlO1xyXG5cclxuICAgICAgICBpZiAoc2FtZVR5cGUpIHtcclxuICAgICAgICAgICAgbmV3RmliZXIgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBvbGRGaWJlciEudHlwZSxcclxuICAgICAgICAgICAgICAgIHByb3BzOiBlbGVtZW50LnByb3BzLFxyXG4gICAgICAgICAgICAgICAgZG9tOiBvbGRGaWJlciEuZG9tLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50OiB3aXBGaWJlcixcclxuICAgICAgICAgICAgICAgIGFsdGVybmF0ZTogb2xkRmliZXIsXHJcbiAgICAgICAgICAgICAgICBlZmZlY3RUYWc6IFwiVVBEQVRFXCIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbGVtZW50ICYmICFzYW1lVHlwZSkge1xyXG4gICAgICAgICAgICBuZXdGaWJlciA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGVsZW1lbnQudHlwZSxcclxuICAgICAgICAgICAgICAgIHByb3BzOiBlbGVtZW50LnByb3BzLFxyXG4gICAgICAgICAgICAgICAgZG9tOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50OiB3aXBGaWJlcixcclxuICAgICAgICAgICAgICAgIGFsdGVybmF0ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGVmZmVjdFRhZzogXCJQTEFDRU1FTlRcIixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9sZEZpYmVyICYmICFzYW1lVHlwZSkge1xyXG4gICAgICAgICAgICBvbGRGaWJlci5lZmZlY3RUYWcgPSBcIkRFTEVUSU9OXCI7XHJcbiAgICAgICAgICAgIGRlbGV0aW9ucy5wdXNoKG9sZEZpYmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvbGRGaWJlcikge1xyXG4gICAgICAgICAgICBvbGRGaWJlciA9IG9sZEZpYmVyLnNpYmxpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgd2lwRmliZXIuY2hpbGQgPSBuZXdGaWJlciB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHByZXZTaWJsaW5nIS5zaWJsaW5nID0gbmV3RmliZXIgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJldlNpYmxpbmcgPSBuZXdGaWJlcjtcclxuICAgICAgICBpbmRleCsrO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb21taXRSb290KCkge1xyXG4gICAgZGVsZXRpb25zLmZvckVhY2goY29tbWl0V29yayk7XHJcbiAgICBjb21taXRXb3JrKHdpcFJvb3Q/LmNoaWxkKTtcclxuICAgIGN1cnJlbnRSb290ID0gd2lwUm9vdDtcclxuICAgIHdpcFJvb3QgPSBudWxsO1xyXG5cclxuICAgIC8vIFByb2Nlc3MgZWZmZWN0cyBhZnRlciB0aGUgRE9NIGlzIGNvbW1pdHRlZFxyXG4gICAgcHJvY2Vzc0VmZmVjdHMoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tbWl0V29yayhmaWJlcj86IEZpYmVyKSB7XHJcbiAgICBpZiAoIWZpYmVyKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGRvbVBhcmVudEZpYmVyID0gZmliZXIucGFyZW50O1xyXG4gICAgd2hpbGUgKCFkb21QYXJlbnRGaWJlcj8uZG9tKSB7XHJcbiAgICAgICAgZG9tUGFyZW50RmliZXIgPSBkb21QYXJlbnRGaWJlcj8ucGFyZW50O1xyXG4gICAgfVxyXG4gICAgY29uc3QgZG9tUGFyZW50ID0gZG9tUGFyZW50RmliZXIuZG9tIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGlmIChmaWJlci5lZmZlY3RUYWcgPT09IFwiUExBQ0VNRU5UXCIgJiYgZmliZXIuZG9tKSB7XHJcbiAgICAgICAgZG9tUGFyZW50LmFwcGVuZENoaWxkKGZpYmVyLmRvbSk7XHJcbiAgICB9IGVsc2UgaWYgKGZpYmVyLmVmZmVjdFRhZyA9PT0gXCJVUERBVEVcIiAmJiBmaWJlci5kb20pIHtcclxuICAgICAgICB1cGRhdGVEb20oXHJcbiAgICAgICAgICAgIGZpYmVyLmRvbSxcclxuICAgICAgICAgICAgZmliZXIuYWx0ZXJuYXRlPy5wcm9wcyB8fCB7fSxcclxuICAgICAgICAgICAgZmliZXIucHJvcHNcclxuICAgICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChmaWJlci5lZmZlY3RUYWcgPT09IFwiREVMRVRJT05cIikge1xyXG4gICAgICAgIGNvbW1pdERlbGV0aW9uKGZpYmVyLCBkb21QYXJlbnQpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb21taXRXb3JrKGZpYmVyLmNoaWxkKTtcclxuICAgIGNvbW1pdFdvcmsoZmliZXIuc2libGluZyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbW1pdERlbGV0aW9uKGZpYmVyOiBGaWJlciwgZG9tUGFyZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgaWYgKGZpYmVyLmRvbSkge1xyXG4gICAgICAgIGlmIChkb21QYXJlbnQuY29udGFpbnMoZmliZXIuZG9tKSkge1xyXG4gICAgICAgICAgICBkb21QYXJlbnQucmVtb3ZlQ2hpbGQoZmliZXIuZG9tKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJBdHRlbXB0ZWQgdG8gcmVtb3ZlIGEgbm9kZSB0aGF0IGlzIG5vdCBhIGNoaWxkIG9mIHRoZSBwYXJlbnQuXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29tbWl0RGVsZXRpb24oZmliZXIuY2hpbGQhLCBkb21QYXJlbnQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVEb20oZG9tOiBIVE1MRWxlbWVudCB8IFRleHQsIHByZXZQcm9wczogYW55LCBuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgLy8gSGFuZGxlIHN0eWxlIHVwZGF0ZXNcclxuICAgIGNvbnN0IGlzU3R5bGUgPSAoa2V5OiBzdHJpbmcpID0+IGtleSA9PT0gXCJzdHlsZVwiO1xyXG4gICAgY29uc3QgaXNQcm9wZXJ0eSA9IChrZXk6IHN0cmluZykgPT4ga2V5ICE9PSBcImNoaWxkcmVuXCIgJiYgIWlzRXZlbnQoa2V5KSAmJiAhaXNTdHlsZShrZXkpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBvbGQgc3R5bGVzXHJcbiAgICBjb25zdCBwcmV2U3R5bGUgPSBwcmV2UHJvcHMuc3R5bGUgfHwge307XHJcbiAgICBjb25zdCBuZXh0U3R5bGUgPSBuZXh0UHJvcHMuc3R5bGUgfHwge307XHJcbiAgICBPYmplY3Qua2V5cyhwcmV2U3R5bGUpLmZvckVhY2goKHN0eWxlTmFtZSkgPT4ge1xyXG4gICAgICAgIGlmICghKHN0eWxlTmFtZSBpbiBuZXh0U3R5bGUpKSB7XHJcbiAgICAgICAgICAgIChkb20gYXMgSFRNTEVsZW1lbnQpLnN0eWxlW3N0eWxlTmFtZSBhcyBhbnldID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTZXQgbmV3IHN0eWxlc1xyXG4gICAgT2JqZWN0LmtleXMobmV4dFN0eWxlKS5mb3JFYWNoKChzdHlsZU5hbWUpID0+IHtcclxuICAgICAgICAoZG9tIGFzIEhUTUxFbGVtZW50KS5zdHlsZVtzdHlsZU5hbWUgYXMgYW55XSA9IG5leHRTdHlsZVtzdHlsZU5hbWVdO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIG9sZCBwcm9wZXJ0aWVzXHJcbiAgICBPYmplY3Qua2V5cyhwcmV2UHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcihpc1Byb3BlcnR5KVxyXG4gICAgICAgIC5maWx0ZXIoKGtleSkgPT4gIShrZXkgaW4gbmV4dFByb3BzKSlcclxuICAgICAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAoZG9tIGFzIGFueSlbbmFtZV0gPSBcIlwiO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIFNldCBuZXcgcHJvcGVydGllc1xyXG4gICAgT2JqZWN0LmtleXMobmV4dFByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoaXNQcm9wZXJ0eSlcclxuICAgICAgICAuZmlsdGVyKChrZXkpID0+IHByZXZQcm9wc1trZXldICE9PSBuZXh0UHJvcHNba2V5XSlcclxuICAgICAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAoZG9tIGFzIGFueSlbbmFtZV0gPSBuZXh0UHJvcHNbbmFtZV07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gUmVtb3ZlIG9sZCBldmVudCBsaXN0ZW5lcnNcclxuICAgIE9iamVjdC5rZXlzKHByZXZQcm9wcylcclxuICAgICAgICAuZmlsdGVyKGlzRXZlbnQpXHJcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiAhKGtleSBpbiBuZXh0UHJvcHMpIHx8IHByZXZQcm9wc1trZXldICE9PSBuZXh0UHJvcHNba2V5XSlcclxuICAgICAgICAuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBldmVudFR5cGUgPSBuYW1lLnRvTG93ZXJDYXNlKCkuc3Vic3RyaW5nKDIpO1xyXG4gICAgICAgICAgICBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHByZXZQcm9wc1tuYW1lXSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIG5ldyBldmVudCBsaXN0ZW5lcnNcclxuICAgIE9iamVjdC5rZXlzKG5leHRQcm9wcylcclxuICAgICAgICAuZmlsdGVyKGlzRXZlbnQpXHJcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBwcmV2UHJvcHNba2V5XSAhPT0gbmV4dFByb3BzW2tleV0pXHJcbiAgICAgICAgLmZvckVhY2goKG5hbWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRUeXBlID0gbmFtZS50b0xvd2VyQ2FzZSgpLnN1YnN0cmluZygyKTtcclxuICAgICAgICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBuZXh0UHJvcHNbbmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCBpc0V2ZW50ID0gKGtleTogc3RyaW5nKSA9PiBrZXkuc3RhcnRzV2l0aChcIm9uXCIpO1xyXG5cclxuY29uc3QgSGRSZWFjdCA9IHtcclxuICAgIGNyZWF0ZUVsZW1lbnQsXHJcbiAgICByZW5kZXIsXHJcbiAgICB1c2VTdGF0ZSxcclxuICAgIHVzZUVmZmVjdCxcclxuICAgIHVzZVJlZixcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhkUmVhY3Q7XHJcblxyXG5leHBvcnQge1xyXG4gICAgY3JlYXRlRWxlbWVudCxcclxuICAgIHJlbmRlciwgdXNlRWZmZWN0LFxyXG4gICAgdXNlUmVmLCB1c2VTdGF0ZVxyXG59O1xyXG4iLCJpbXBvcnQgSGRSZWFjdCBmcm9tIFwiLi9IZFJlYWN0VjNcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL0hkUmVhY3RWM1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGRSZWFjdDtcclxuIiwiLyoqIEBqc3ggSGRSZWFjdC5jcmVhdGVFbGVtZW50ICovXHJcbmltcG9ydCBIZFJlYWN0IGZyb20gXCJoZC1yZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgVEhFTUUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuY29uc3Qgc2FtcGxlQ29kZSA9IGAvKiogQGpzeCBIZFJlYWN0LmNyZWF0ZUVsZW1lbnQgKi9cclxuaW1wb3J0IEhkUmVhY3QgZnJvbSBcImhkLXJlYWN0XCI7XHJcblxyXG5jb25zdCBJbnRlcmFjdGl2ZURlbW8gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBbY291bnQsIHNldENvdW50XSA9IEhkUmVhY3QudXNlU3RhdGUoMCk7XHJcbiAgICBjb25zdCBbY29sb3IsIHNldENvbG9yXSA9IEhkUmVhY3QudXNlU3RhdGUoXCIjZmZmZmZmXCIpO1xyXG4gICAgY29uc3QgY291bnRSZWYgPSBIZFJlYWN0LnVzZVJlZihjb3VudCk7XHJcblxyXG4gICAgSGRSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvdW50UmVmLmN1cnJlbnQgPSBjb3VudDtcclxuICAgICAgICBkb2N1bWVudC50aXRsZSA9IFxcYENvdW50ZXI6IFxcJHtjb3VudH1cXGA7XHJcbiAgICB9LCBbY291bnRdKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMyBzdHlsZT17eyBjb2xvciB9fT5cclxuICAgICAgICAgICAgICAgIENvdW50ZXI6IHtjb3VudH1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRDb3VudChjb3VudCArIDEpfT5cclxuICAgICAgICAgICAgICAgIOKWslxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRDb3VudChjb3VudCAtIDEpfT5cclxuICAgICAgICAgICAgICAgIOKWvFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRDb2xvcihjb2xvciA9PT0gXCIjZmZmZmZmXCIgPyBcIiMwMDk5ZmZcIiA6IFwiI2ZmZmZmZlwiKTtcclxuICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICBUb2dnbGUgRWZmZWN0XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufWA7XHJcblxyXG5jb25zdCBEZW1vID0gKCkgPT4ge1xyXG4gICAgY29uc3QgW3Nob3dDb2RlLCBzZXRTaG93Q29kZV0gPSBIZFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogXCIxNXB4XCIgfX0+XHJcbiAgICAgICAgICAgIDxoMiBzdHlsZT17eyBjb2xvcjogVEhFTUUucHJpbWFyeSwgdGV4dEFsaWduOiBcImNlbnRlclwiLCB0ZXh0U2hhZG93OiBcIjFweCAxcHggMnB4IHJnYmEoMCwwLDAsMC4yKVwiIH19PkludGVyYWN0aXZlIERlbW88L2gyPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzJhMmEyYVwiLFxyXG4gICAgICAgICAgICAgICAgcGFkZGluZzogXCIyMHB4XCIsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBcIjE1cHhcIixcclxuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogXCIwIDVweCAxMHB4IHJnYmEoMCwwLDAsMC4xKVwiLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMSlcIlxyXG4gICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgIDxJbnRlcmFjdGl2ZURlbW8gLz5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Q29kZSghc2hvd0NvZGUpfVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDIwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjZweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzY3M0FCN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogXCIxNXB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IFwiNTAwXCJcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHtzaG93Q29kZSA/IFwiSGlkZSBDb2RlXCIgOiBcIlNob3cgQ29kZVwifVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICB7c2hvd0NvZGUgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGdhcDogXCIzMHB4XCIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwcmUgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTBweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI1cHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6IFwiYXV0b1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2FtcGxlQ29kZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcHJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmNvbnN0IEludGVyYWN0aXZlRGVtbyA9ICgpID0+IHtcclxuICAgIGNvbnN0IFtjb3VudCwgc2V0Q291bnRdID0gSGRSZWFjdC51c2VTdGF0ZSgwKTtcclxuICAgIGNvbnN0IFtjb2xvciwgc2V0Q29sb3JdID0gSGRSZWFjdC51c2VTdGF0ZShcIiNmZmZmZmZcIik7XHJcbiAgICBjb25zdCBjb3VudFJlZiA9IEhkUmVhY3QudXNlUmVmKGNvdW50KTtcclxuXHJcbiAgICBIZFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY291bnRSZWYuY3VycmVudCA9IGNvdW50O1xyXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gYENvdW50ZXI6ICR7Y291bnR9YDtcclxuICAgIH0sIFtjb3VudF0pO1xyXG5cclxuICAgIGNvbnN0IGJ1dHRvbkJhc2VTdHlsZSA9IHtcclxuICAgICAgICBwYWRkaW5nOiBcIjhweCAyMHB4XCIsXHJcbiAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcclxuICAgICAgICBib3JkZXJSYWRpdXM6IFwiNnB4XCIsXHJcbiAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxyXG4gICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXHJcbiAgICAgICAgdHJhbnNpdGlvbjogXCJhbGwgMC4zc1wiLFxyXG4gICAgICAgIG1hcmdpbjogXCI0cHhcIixcclxuICAgICAgICBmb250V2VpZ2h0OiBcIjUwMFwiLFxyXG4gICAgICAgIGZvbnRGYW1pbHk6IFwiJ1NlZ29lIFVJJywgc3lzdGVtLXVpLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgZm9udFNpemU6IFwiMTRweFwiLFxyXG4gICAgICAgIGxldHRlclNwYWNpbmc6IFwiMC41cHhcIixcclxuICAgICAgICBib3hTaGFkb3c6IFwiMCAycHggNHB4IHJnYmEoMCwwLDAsMC4yKVwiXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiIzJhMmEyYVwiLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiBcIjIwcHhcIixcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiXHJcbiAgICAgICAgfX0+XHJcbiAgICAgICAgICAgIDxoMyBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgY29sb3IsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxLjVlbVwiLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJhbGwgMC4zc1wiXHJcbiAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgQ291bnRlcjoge2NvdW50fVxyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogXCIxNXB4XCIgfX0+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q291bnQoY291bnQgKyAxKX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5idXR0b25CYXNlU3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjMDAwMDAwXCJcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIOKWslxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q291bnQoY291bnQgLSAxKX1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5idXR0b25CYXNlU3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjMDAwMDAwXCJcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIOKWvFxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29sb3IoY29sb3IgPT09IFwiI2ZmZmZmZlwiID8gXCIjMDA5OWZmXCIgOiBcIiNmZmZmZmZcIik7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAuLi5idXR0b25CYXNlU3R5bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMwMDAwMDBcIlxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgVG9nZ2xlIEVmZmVjdFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZW1vOyIsIi8qKiBAanN4IEhkUmVhY3QuY3JlYXRlRWxlbWVudCAqL1xyXG5pbXBvcnQgSGRSZWFjdCBmcm9tIFwiaGQtcmVhY3RcIjtcclxuaW1wb3J0IHsgVEhFTUUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuY29uc3QgSXNzdWVzID0gKCkgPT4gKFxyXG4gICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiBcIjIwcHhcIiB9fT5cclxuICAgICAgICA8aDEgc3R5bGU9e3sgY29sb3I6IFRIRU1FLnByaW1hcnksIGZvbnRTaXplOiBcIjJlbVwiIH19Pktub3duIElzc3VlczwvaDE+XHJcblxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogXCJsaW5lYXItZ3JhZGllbnQoNDVkZWcsICMxYTFhMWEsICMyYTJhMmEpXCIsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiMjBweFwiLFxyXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxyXG4gICAgICAgICAgICBtYXJnaW46IFwiMjBweCAwXCJcclxuICAgICAgICB9fT5cclxuICAgICAgICAgICAgPGgyIHN0eWxlPXt7IGNvbG9yOiBUSEVNRS5zZWNvbmRhcnkgfX0+QnVnIDE6IHVzZUVmZmVjdCBDbGVhbnVwPC9oMj5cclxuXHJcbiAgICAgICAgICAgIDxwIHN0eWxlPXt7IGZvbnRTaXplOiBcIjEuMWVtXCIsIGNvbG9yOiBcIiNlMGUwZTBcIiB9fT5cclxuICAgICAgICAgICAgICAgIFRoZSB1c2VFZmZlY3QgY2xlYW51cCBmdW5jdGlvbiBkb2VzIG5vdCBwcm9wZXJseSBmaXJlIHdoZW4gdGhlIGNvbXBvbmVudCB1bm1vdW50cy5cclxuICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMTVweFwiIH19PlxyXG4gICAgICAgICAgICAgICAgPGgzIHN0eWxlPXt7IGNvbG9yOiBUSEVNRS5zZWNvbmRhcnkgfX0+RXhhbXBsZTo8L2gzPlxyXG4gICAgICAgICAgICAgICAgPHByZSBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwiIzJkMmQyZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTVweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI1cHhcIixcclxuICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogXCJhdXRvXCJcclxuICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiRWZmZWN0IHJ1bm5pbmdcIik7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2xlYW51cCBzaG91bGQgcnVuIG9uIHVubW91bnRcIik7XHJcbiAgICB9O1xyXG59LCBbXSk7YH1cclxuICAgICAgICAgICAgICAgIDwvcHJlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjE1cHhcIiB9fT5cclxuICAgICAgICAgICAgICAgIDxoMyBzdHlsZT17eyBjb2xvcjogVEhFTUUuc2Vjb25kYXJ5IH19PkN1cnJlbnQgU3RhdHVzOjwvaDM+XHJcblxyXG4gICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7IGNvbG9yOiBcIiNlMGUwZTBcIiB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+4pyXIENsZWFudXAgZnVuY3Rpb24gbm90IGV4ZWN1dGluZyBvbiB1bm1vdW50PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGk+4pyTIEVmZmVjdCBydW5zIG9uIGluaXRpYWwgbW91bnQ8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaT7inJcgTWVtb3J5IGxlYWtzIHBvc3NpYmxlPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSXNzdWVzOyIsIi8qKiBAanN4IEhkUmVhY3QuY3JlYXRlRWxlbWVudCAqL1xyXG5pbXBvcnQgSGRSZWFjdCBmcm9tIFwiaGQtcmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IFRIRU1FIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuXHJcbmNvbnN0IFdlbGNvbWUgPSAoKSA9PiAoXHJcbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6IFwiMjBweFwiIH19PlxyXG4gICAgICAgIDxoMSBzdHlsZT17eyBjb2xvcjogVEhFTUUucHJpbWFyeSwgZm9udFNpemU6IFwiMi41ZW1cIiB9fT5XZWxjb21lIHRvIEhkUmVhY3QhPC9oMT5cclxuICAgICAgICA8cCBzdHlsZT17eyBmb250U2l6ZTogXCIxLjJlbVwiIH19PlxyXG4gICAgICAgICAgICBMZWFybiBob3cgdG8gYnVpbGQgeW91ciBvd24gUmVhY3QtbGlrZSBsaWJyYXJ5IGZyb20gc2NyYXRjaCB1c2luZyBtb2Rlcm4gSmF2YVNjcmlwdCBhbmQgZnVuY3Rpb25hbCBwcm9ncmFtbWluZyBjb25jZXB0cy5cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBiYWNrZ3JvdW5kOiBcImxpbmVhci1ncmFkaWVudCg0NWRlZywgIzFhMWExYSwgIzJhMmEyYSlcIiwgcGFkZGluZzogXCIyMHB4XCIsIGJvcmRlclJhZGl1czogXCIxMHB4XCIsIG1hcmdpbjogXCIyMHB4IDBcIiB9fT5cclxuICAgICAgICAgICAgPGgzIHN0eWxlPXt7IGNvbG9yOiBUSEVNRS5zZWNvbmRhcnkgfX0+UXVpY2sgRmVhdHVyZXM8L2gzPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGk+4pqhIEZpYmVyLWJhc2VkIHJlY29uY2lsaWF0aW9uPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT7wn46jIHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiBob29rczwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+8J+OqCBJbmxpbmUgQ1NTIHN0eWxpbmc8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPvCflKUgSW50ZXJhY3RpdmUgSlNYIHN5bnRheDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlbGNvbWU7IiwiLyoqIEBqc3ggSGRSZWFjdC5jcmVhdGVFbGVtZW50ICovXHJcbmltcG9ydCBIZFJlYWN0IGZyb20gXCJoZC1yZWFjdFwiO1xyXG5cclxuaW1wb3J0IERlbW8gZnJvbSBcIi4vRGVtby5Db21wb25lbnRcIjtcclxuaW1wb3J0IFdlbGNvbWUgZnJvbSBcIi4vV2VsY29tZS5Db21wb25lbnRcIjtcclxuaW1wb3J0IHsgVEhFTUUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5pbXBvcnQgSXNzdWVzIGZyb20gXCIuL0lzc3Vlcy5Db21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWN0aW9ucyA9IFtcclxuICAgIHsgaWQ6IFwid2VsY29tZVwiLCB0aXRsZTogXCLwn5qAIFdlbGNvbWUgdG8gSGRSZWFjdFwiLCBjb21wb25lbnQ6ICgpID0+IDxXZWxjb21lIC8+IH0sXHJcbiAgICB7IGlkOiBcImRlbW9cIiwgdGl0bGU6IFwi8J+OiSBEZW1vXCIsIGNvbXBvbmVudDogKCkgPT4gPERlbW8gLz4gfSxcclxuICAgIHsgaWQ6IFwiaXNzdWVzXCIsIHRpdGxlOiBcIvCfkJsgS25vd24gSXNzdWVzXCIsIGNvbXBvbmVudDogKCkgPT4gPElzc3VlcyAvPiB9LFxyXG5dO1xyXG5cclxuY29uc3QgU2VjdGlvbnMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBbYWN0aXZlU2VjdGlvbkluZGV4LCBzZXRBY3RpdmVTZWN0aW9uSW5kZXhdID0gSGRSZWFjdC51c2VTdGF0ZTxudW1iZXI+KDApO1xyXG5cclxuICAgIEhkUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC50aXRsZSA9IGBIZFJlYWN0IERvY3MgLSAke3NlY3Rpb25zW2FjdGl2ZVNlY3Rpb25JbmRleF0udGl0bGV9YDtcclxuICAgIH0sIFthY3RpdmVTZWN0aW9uSW5kZXhdKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGhlaWdodDogXCI5Ny44dmhcIiwgYmFja2dyb3VuZENvbG9yOiBUSEVNRS5iZywgY29sb3I6IFRIRU1FLnRleHQsIGZvbnRGYW1pbHk6IFwiJ1NlZ29lIFVJJywgc2Fucy1zZXJpZlwiLCBib3JkZXJSYWRpdXM6IFwiOHB4XCIgfX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IFwiMzAwcHhcIiwgYmFja2dyb3VuZENvbG9yOiBcIiMyYTJhMmFcIiwgcGFkZGluZzogXCIyMHB4XCIsIGJvcmRlclJpZ2h0OiBgMnB4IHNvbGlkICR7VEhFTUUucHJpbWFyeX1gIH19PlxyXG4gICAgICAgICAgICAgICAgPGgyIHN0eWxlPXt7IGNvbG9yOiBUSEVNRS5wcmltYXJ5IH19PvCfk5ogSGRSZWFjdCBEb2NzPC9oMj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vSGRjaGFtY2hhbTE2L0hkUmVhY3RcIiB0YXJnZXQ9XCJfYmxhbmtcIiBzdHlsZT17eyB0ZXh0RGVjb3JhdGlvbjogXCJub25lXCIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogXCIxMnB4XCIsIGNvbG9yOiBUSEVNRS50ZXh0LCBtYXJnaW5Cb3R0b206IFwiMjBweFwiLCBvcGFjaXR5OiAwLjcsIGN1cnNvcjogXCJwb2ludGVyXCIsIHRyYW5zaXRpb246IFwiYWxsIDAuM3MgZWFzZVwiLCBcIjpob3ZlclwiOiB7IG9wYWNpdHk6IDEsIHRyYW5zZm9ybTogXCJzY2FsZSgxLjA1KVwiIH0gfX0+QnVpbHQgd2l0aCBIZFJlYWN0IC0gMjAyNSB8IEdpdEh1YjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAge3NlY3Rpb25zLm1hcCgoc2VjdGlvbiwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17c2VjdGlvbi5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlU2VjdGlvbkluZGV4KGluZGV4KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTVweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBcIjEwcHggMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBhY3RpdmVTZWN0aW9uSW5kZXggPT09IGluZGV4ID8gYCR7VEhFTUUucHJpbWFyeX00MGAgOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAycHggc29saWQgJHtUSEVNRS5wcmltYXJ5fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogVEhFTUUudGV4dCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBcImFsbCAwLjNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246IFwibGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3NlY3Rpb24udGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgb3ZlcmZsb3dZOiBcImF1dG9cIiwgcGFkZGluZzogXCIyMHB4XCIgfX0+XHJcbiAgICAgICAgICAgICAgICB7c2VjdGlvbnNbYWN0aXZlU2VjdGlvbkluZGV4XS5jb21wb25lbnQoKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvbnM7IiwiZXhwb3J0IGNvbnN0IFRIRU1FID0ge1xyXG4gICAgYmc6IFwiIzFhMWExYVwiLFxyXG4gICAgdGV4dDogXCIjZmZmZmZmXCIsXHJcbiAgICBwcmltYXJ5OiBcIiMwMGZmODhcIixcclxuICAgIHNlY29uZGFyeTogXCIjZmYwMGZmXCIsXHJcbn0iLCJpbXBvcnQgRG9jcyBmcm9tIFwiLi9TZWN0aW9uc1wiO1xyXG5cclxuZXhwb3J0ICBkZWZhdWx0IERvY3M7IiwiLyoqIEBqc3ggSGRSZWFjdC5jcmVhdGVFbGVtZW50ICovXHJcbmltcG9ydCBIZFJlYWN0IGZyb20gXCJoZC1yZWFjdFwiO1xyXG5cclxuaW1wb3J0IERvY3MgZnJvbSBcIi4vRG9jc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8RG9jcyAvPlxyXG4gICk7XHJcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKiogQGpzeCBIZFJlYWN0LmNyZWF0ZUVsZW1lbnQgKi9cclxuaW1wb3J0IEhkUmVhY3QgZnJvbSBcImhkLXJlYWN0XCI7XHJcblxyXG5pbXBvcnQgQXBwIGZyb20gXCIuL3NyY1wiO1xyXG5cclxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpIHx8IGRvY3VtZW50LmJvZHk7XHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIEhkUmVhY3QucmVuZGVyKDxBcHAgLz4sIGNvbnRhaW5lcik7XHJcbn07XHJcblxyXG5yZW5kZXIoKTsiXSwibmFtZXMiOlsid2lwUm9vdCIsImN1cnJlbnRSb290IiwibmV4dFVuaXRPZldvcmsiLCJkZWxldGlvbnMiLCJ3aXBGaWJlciIsImhvb2tJbmRleCIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwicHJvcHMiLCJfbGVuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiY2hpbGRyZW4iLCJBcnJheSIsIl9rZXkiLCJfb2JqZWN0U3ByZWFkIiwiZmxhdCIsIm1hcCIsImNoaWxkIiwiX3R5cGVvZiIsInVuZGVmaW5lZCIsImNyZWF0ZVRleHRFbGVtZW50IiwidGV4dCIsIm5vZGVWYWx1ZSIsImNyZWF0ZURvbSIsImZpYmVyIiwiZG9tIiwiZG9jdW1lbnQiLCJjcmVhdGVUZXh0Tm9kZSIsInVwZGF0ZURvbSIsInJlbmRlciIsImVsZW1lbnQiLCJjb250YWluZXIiLCJwYXJlbnQiLCJzaWJsaW5nIiwiYWx0ZXJuYXRlIiwid29ya0xvb3AiLCJkZWFkbGluZSIsInNob3VsZFlpZWxkIiwicGVyZm9ybVVuaXRPZldvcmsiLCJ0aW1lUmVtYWluaW5nIiwiY29tbWl0Um9vdCIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJpc0Z1bmN0aW9uQ29tcG9uZW50IiwidXBkYXRlRnVuY3Rpb25Db21wb25lbnQiLCJ1cGRhdGVIb3N0Q29tcG9uZW50IiwibmV4dEZpYmVyIiwiaG9va3MiLCJyZWNvbmNpbGVDaGlsZHJlbiIsInVzZVN0YXRlIiwiaW5pdGlhbCIsIl93aXBGaWJlciIsIm9sZEhvb2siLCJob29rIiwic3RhdGUiLCJxdWV1ZSIsImFjdGlvbnMiLCJmb3JFYWNoIiwiYWN0aW9uIiwic2V0U3RhdGUiLCJwdXNoIiwidXNlRWZmZWN0IiwiY2FsbGJhY2siLCJkZXBzIiwiX3dpcEZpYmVyMiIsImNsZWFudXAiLCJwcm9jZXNzRWZmZWN0cyIsIl9jdXJyZW50Um9vdCIsIl9sb29wIiwiX2ZpYmVyJGFsdGVybmF0ZSIsImkiLCJvbGREZXBzIiwibmV3RGVwcyIsImhhc0NoYW5nZWREZXBzIiwic29tZSIsImRlcCIsImlkeCIsInVzZVJlZiIsImN1cnJlbnQiLCJlbGVtZW50cyIsIl93aXBGaWJlciRhbHRlcm5hdGUiLCJpbmRleCIsIm9sZEZpYmVyIiwicHJldlNpYmxpbmciLCJuZXdGaWJlciIsInNhbWVUeXBlIiwiZWZmZWN0VGFnIiwiX3dpcFJvb3QiLCJjb21taXRXb3JrIiwiZG9tUGFyZW50RmliZXIiLCJfZG9tUGFyZW50RmliZXIiLCJfZG9tUGFyZW50RmliZXIyIiwiZG9tUGFyZW50IiwiYXBwZW5kQ2hpbGQiLCJfZmliZXIkYWx0ZXJuYXRlMiIsImNvbW1pdERlbGV0aW9uIiwiY29udGFpbnMiLCJyZW1vdmVDaGlsZCIsImNvbnNvbGUiLCJ3YXJuIiwicHJldlByb3BzIiwibmV4dFByb3BzIiwiaXNTdHlsZSIsImtleSIsImlzUHJvcGVydHkiLCJpc0V2ZW50IiwicHJldlN0eWxlIiwic3R5bGUiLCJuZXh0U3R5bGUiLCJPYmplY3QiLCJrZXlzIiwic3R5bGVOYW1lIiwiZmlsdGVyIiwibmFtZSIsImV2ZW50VHlwZSIsInRvTG93ZXJDYXNlIiwic3Vic3RyaW5nIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydHNXaXRoIiwiSGRSZWFjdCIsIlRIRU1FIiwic2FtcGxlQ29kZSIsIkRlbW8iLCJfSGRSZWFjdCR1c2VTdGF0ZSIsIl9IZFJlYWN0JHVzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2hvd0NvZGUiLCJzZXRTaG93Q29kZSIsInBhZGRpbmciLCJjb2xvciIsInByaW1hcnkiLCJ0ZXh0QWxpZ24iLCJ0ZXh0U2hhZG93IiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyUmFkaXVzIiwibWFyZ2luVG9wIiwiYm94U2hhZG93IiwiYm9yZGVyIiwiSW50ZXJhY3RpdmVEZW1vIiwib25DbGljayIsImN1cnNvciIsImZvbnRXZWlnaHQiLCJkaXNwbGF5IiwiZ2FwIiwiZmxleCIsIm92ZXJmbG93IiwiX0hkUmVhY3QkdXNlU3RhdGUzIiwiX0hkUmVhY3QkdXNlU3RhdGU0IiwiY291bnQiLCJzZXRDb3VudCIsIl9IZFJlYWN0JHVzZVN0YXRlNSIsIl9IZFJlYWN0JHVzZVN0YXRlNiIsInNldENvbG9yIiwiY291bnRSZWYiLCJ0aXRsZSIsImNvbmNhdCIsImJ1dHRvbkJhc2VTdHlsZSIsInRyYW5zaXRpb24iLCJtYXJnaW4iLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJsZXR0ZXJTcGFjaW5nIiwiYmFja2dyb3VuZCIsIm1hcmdpbkJvdHRvbSIsIklzc3VlcyIsInNlY29uZGFyeSIsIldlbGNvbWUiLCJzZWN0aW9ucyIsImlkIiwiY29tcG9uZW50IiwiU2VjdGlvbnMiLCJhY3RpdmVTZWN0aW9uSW5kZXgiLCJzZXRBY3RpdmVTZWN0aW9uSW5kZXgiLCJoZWlnaHQiLCJiZyIsIndpZHRoIiwiYm9yZGVyUmlnaHQiLCJocmVmIiwidGFyZ2V0IiwidGV4dERlY29yYXRpb24iLCJvcGFjaXR5IiwidHJhbnNmb3JtIiwic2VjdGlvbiIsIm92ZXJmbG93WSIsIkRvY3MiLCJBcHAiLCJnZXRFbGVtZW50QnlJZCIsImJvZHkiLCJpbm5lckhUTUwiXSwic291cmNlUm9vdCI6IiJ9