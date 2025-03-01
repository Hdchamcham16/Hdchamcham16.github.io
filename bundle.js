/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./hd-react-redux/src/index.ts":
/*!*************************************!*\
  !*** ./hd-react-redux/src/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  /* harmony export */   renderWithRedux: () => (/* binding */ renderWithRedux),
  /* harmony export */   useDispatch: () => (/* binding */ useDispatch),
  /* harmony export */   useSelector: () => (/* binding */ useSelector)
  /* harmony export */ });
  /* harmony import */ var hd_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hd-react */ "./hd-react/src/index.ts");
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  
  var currentStore = null;
  function renderWithRedux(element, container, store) {
    console.log('renderWithRedux called with:', {
      element: element,
      container: container,
      store: store
    });
    currentStore = store || null;
    hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].render(element, container);
  }
  function useDispatch() {
    console.log('useDispatch called');
    if (!currentStore) {
      throw new Error('Redux store not found. Pass the store to HdReactRedux.renderWithRedux()');
    }
    return currentStore.dispatch;
  }
  function useSelector(selector, equalityFn) {
    console.log('useSelector called with selector:', selector);
    if (!currentStore) {
      throw new Error('Redux store not found. Pass the store to HdReactRedux.renderWithRedux()');
    }
    var store = currentStore;
    var _useState = (0,hd_react__WEBPACK_IMPORTED_MODULE_0__.useState)(function () {
        return selector(store.getState());
      }),
      _useState2 = _slicedToArray(_useState, 2),
      selectedState = _useState2[0],
      setSelectedState = _useState2[1];
    console.log('Initial selected state:', selectedState, 'from selector:', selector(store.getState()));
    (0,hd_react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
      console.log('Setting up store subscription');
      var checkForUpdates = function checkForUpdates() {
        var newSelectedState = selector(store.getState());
        console.log('Checking for updates:', {
          current: selectedState,
          "new": newSelectedState
        });
        if (!equalityFn || !equalityFn(selectedState, newSelectedState)) {
          console.log('State update detected, setting new state');
          setSelectedState(newSelectedState);
        }
      };
      var unsubscribe = store.subscribe(checkForUpdates);
      return function () {
        console.log('Cleaning up store subscription');
        unsubscribe();
      };
    }, [store, equalityFn, setSelectedState]);
    return selectedState;
  }
  var HdReactRedux = {
    renderWithRedux: renderWithRedux,
    useDispatch: useDispatch,
    useSelector: useSelector
  };
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HdReactRedux);
  
  /***/ }),
  
  /***/ "./hd-react/src/HdReact.ts":
  /*!*********************************!*\
    !*** ./hd-react/src/HdReact.ts ***!
    \*********************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   createElement: () => (/* reexport safe */ _createElement__WEBPACK_IMPORTED_MODULE_0__["default"]),
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  /* harmony export */   render: () => (/* binding */ render),
  /* harmony export */   useCallback: () => (/* binding */ useCallback),
  /* harmony export */   useEffect: () => (/* binding */ useEffect),
  /* harmony export */   useMemo: () => (/* binding */ useMemo),
  /* harmony export */   useRef: () => (/* binding */ useRef),
  /* harmony export */   useState: () => (/* binding */ useState)
  /* harmony export */ });
  /* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ "./hd-react/src/createElement.ts");
  /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./hd-react/src/utils.ts");
  
  
  var wipRoot = null;
  var currentRoot = null;
  var nextUnitOfWork = null;
  var deletions = [];
  var wipFiber = null;
  var hookIndex = 0;
  function createDom(fiber) {
    var dom = fiber.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.updateDom)(dom, {}, fiber.props);
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
      state: oldHook ? oldHook.state : typeof initial === 'function' ? initial() : initial,
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
    if (!wipFiber) {
      throw new Error('Hooks can only be called inside a function component');
    }
    if (!wipFiber.hooks) {
      wipFiber.hooks = [];
    }
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
  function useCallback(callback, deps) {
    var _wipFiber3;
    var oldHook = (_wipFiber3 = wipFiber) === null || _wipFiber3 === void 0 || (_wipFiber3 = _wipFiber3.alternate) === null || _wipFiber3 === void 0 || (_wipFiber3 = _wipFiber3.hooks) === null || _wipFiber3 === void 0 ? void 0 : _wipFiber3[hookIndex];
  
    // Determine if dependencies have changed
    var hasChanged = !oldHook || !deps || !oldHook.deps || deps.length !== oldHook.deps.length || deps.some(function (dep, i) {
      return dep !== oldHook.deps[i];
    });
  
    // If deps haven't changed, reuse the old callback; otherwise, store the new one
    var hook = {
      deps: deps,
      callback: hasChanged ? callback : oldHook === null || oldHook === void 0 ? void 0 : oldHook.callback
    };
    if (!wipFiber || !wipFiber.hooks) {
      throw new Error('Hooks can only be called inside a function component');
    }
    wipFiber.hooks.push(hook);
    hookIndex++;
    return hook.callback;
  }
  function useMemo(factory, deps) {
    var _wipFiber4;
    var oldHook = (_wipFiber4 = wipFiber) === null || _wipFiber4 === void 0 || (_wipFiber4 = _wipFiber4.alternate) === null || _wipFiber4 === void 0 || (_wipFiber4 = _wipFiber4.hooks) === null || _wipFiber4 === void 0 ? void 0 : _wipFiber4[hookIndex];
  
    // Determine if dependencies have changed
    var hasChanged = !oldHook || !deps || !oldHook.deps || deps.length !== oldHook.deps.length || deps.some(function (dep, i) {
      return dep !== oldHook.deps[i];
    });
  
    // If deps haven't changed, reuse the old value; otherwise, compute new one
    var hook = {
      deps: deps,
      value: hasChanged ? factory() : oldHook === null || oldHook === void 0 ? void 0 : oldHook.value
    };
    if (!wipFiber || !wipFiber.hooks) {
      throw new Error('Hooks can only be called inside a function component');
    }
    wipFiber.hooks.push(hook);
    hookIndex++;
    return hook.value;
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
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.updateDom)(fiber.dom, ((_fiber$alternate2 = fiber.alternate) === null || _fiber$alternate2 === void 0 ? void 0 : _fiber$alternate2.props) || {}, fiber.props);
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
  
    // Call cleanup function if it exists
    if (fiber.hooks) {
      fiber.hooks.forEach(function (hook) {
        console.log('hook', hook);
        if (hook.cleanup) {
          hook.cleanup();
        }
      });
    }
  }
  var HdReact = {
    createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__["default"],
    render: render,
    useState: useState,
    useEffect: useEffect,
    useRef: useRef,
    useCallback: useCallback,
    useMemo: useMemo
  };
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HdReact);
  
  
  /***/ }),
  
  /***/ "./hd-react/src/createElement.ts":
  /*!***************************************!*\
    !*** ./hd-react/src/createElement.ts ***!
    \***************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createElement);
  
  /***/ }),
  
  /***/ "./hd-react/src/index.ts":
  /*!*******************************!*\
    !*** ./hd-react/src/index.ts ***!
    \*******************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   createElement: () => (/* reexport safe */ _HdReact__WEBPACK_IMPORTED_MODULE_0__.createElement),
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  /* harmony export */   render: () => (/* reexport safe */ _HdReact__WEBPACK_IMPORTED_MODULE_0__.render),
  /* harmony export */   useCallback: () => (/* reexport safe */ _HdReact__WEBPACK_IMPORTED_MODULE_0__.useCallback),
  /* harmony export */   useEffect: () => (/* reexport safe */ _HdReact__WEBPACK_IMPORTED_MODULE_0__.useEffect),
  /* harmony export */   useMemo: () => (/* reexport safe */ _HdReact__WEBPACK_IMPORTED_MODULE_0__.useMemo),
  /* harmony export */   useRef: () => (/* reexport safe */ _HdReact__WEBPACK_IMPORTED_MODULE_0__.useRef),
  /* harmony export */   useState: () => (/* reexport safe */ _HdReact__WEBPACK_IMPORTED_MODULE_0__.useState)
  /* harmony export */ });
  /* harmony import */ var _HdReact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HdReact */ "./hd-react/src/HdReact.ts");
  
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_HdReact__WEBPACK_IMPORTED_MODULE_0__["default"]);
  
  /***/ }),
  
  /***/ "./hd-react/src/utils.ts":
  /*!*******************************!*\
    !*** ./hd-react/src/utils.ts ***!
    \*******************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   updateDom: () => (/* binding */ updateDom)
  /* harmony export */ });
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
  
  /***/ }),
  
  /***/ "./hd-redux/src/index.ts":
  /*!*******************************!*\
    !*** ./hd-redux/src/index.ts ***!
    \*******************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   createStore: () => (/* binding */ createStore)
  /* harmony export */ });
  var createStore = function createStore(reducer) {
    var state = reducer(undefined);
    var listeners = [];
    var store = {
      getState: function getState() {
        return state;
      },
      dispatch: function dispatch(action) {
        if (typeof action === 'function') {
          return action(store.dispatch, store.getState);
        }
        state = reducer(state, action);
        listeners.forEach(function (listener) {
          return listener();
        });
      },
      subscribe: function subscribe(listener) {
        listeners.push(listener);
        return function () {
          listeners = listeners.filter(function (l) {
            return l !== listener;
          });
        };
      }
    };
    return store;
  };
  
  /***/ }),
  
  /***/ "./src/Docs/Sections/Demo/Demo.Constant.ts":
  /*!*************************************************!*\
    !*** ./src/Docs/Sections/Demo/Demo.Constant.ts ***!
    \*************************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   hooksSampleCode: () => (/* binding */ hooksSampleCode),
  /* harmony export */   reduxSampleCode: () => (/* binding */ reduxSampleCode)
  /* harmony export */ });
  var hooksSampleCode = "/** @jsx HdReact.createElement */\nimport HdReact from \"hd-react\";\n\nconst HooksDemo = () => {\n  const [count, setCount] = HdReact.useState(0);\n  const [color, setColor] = HdReact.useState(\"#ffffff\");\n\n  HdReact.useEffect(() => {\n    document.title = `Counter: ${count}`;\n  }, [count]);\n\n  return (\n    <div>\n      <h3>Counter: {count}</h3>\n      <button onClick={() => setCount(c => c + 1)}>\n        Increment\n      </button>\n      <button onClick={() => setCount(c => c - 1)}>\n        Decrement\n      </button>\n    </div>\n  );\n};";
  var reduxSampleCode = "/** @jsx HdReact.createElement */\nimport HdReact from \"hd-react\";\n\nimport { useDispatch, useSelector } from \"@Store\";\n\nconst ReduxDemo = () => {\n  const count = useSelector(state => state.count);\n  const dispatch = useDispatch();\n\n  return (\n    <div>\n      <h3>Redux Counter: {count}</h3>\n      <button onClick={() => dispatch({ type: 'INCREMENT' })}>\n        Increment\n      </button>\n      <button onClick={() => dispatch({ type: 'DECREMENT' })}>\n        Decrement\n      </button>\n    </div>\n  );\n};";
  
  /***/ }),
  
  /***/ "./src/Docs/Sections/Demo/index.tsx":
  /*!******************************************!*\
    !*** ./src/Docs/Sections/Demo/index.tsx ***!
    \******************************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var hd_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hd-react */ "./hd-react/src/index.ts");
  /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Store */ "./src/Store/index.ts");
  /* harmony import */ var _Demo_Constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Demo.Constant */ "./src/Docs/Sections/Demo/Demo.Constant.ts");
  function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  /** @jsx HdReact.createElement */
  
  
  
  var Demo = function Demo() {
    return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: {
        display: 'flex',
        gap: '20px',
        flexDirection: 'column'
      }
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: {
        display: 'flex',
        gap: '20px'
      }
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: _objectSpread({
        flex: 1
      }, styles.section)
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h2", {
      style: styles.sectionHeader
    }, "\uD83C\uDFA3 Hooks"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(HooksDemo, null)), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: {
        width: 1,
        border: "2px solid #2196F3"
      }
    }), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: _objectSpread({
        flex: 1
      }, styles.section)
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h2", {
      style: styles.sectionHeader
    }, "\uD83D\uDCE6 Redux"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(ReduxDemo, null))), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(CodeShowcase, null));
  };
  var CodeShowcase = function CodeShowcase() {
    var _HdReact$useState = hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useState(null),
      _HdReact$useState2 = _slicedToArray(_HdReact$useState, 2),
      visibleCode = _HdReact$useState2[0],
      setVisibleCode = _HdReact$useState2[1];
    var toggleCode = function toggleCode(type) {
      return setVisibleCode(function (v) {
        return v === type ? null : type;
      });
    };
    return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: styles.showcase
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: "20px"
      }
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
      style: _objectSpread(_objectSpread({}, styles.tab), visibleCode === 'hooks' ? styles.activeTab : {}),
      onClick: function onClick() {
        return toggleCode('hooks');
      }
    }, "\uD83C\uDFA3 Hooks Code"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
      style: _objectSpread(_objectSpread({}, styles.tab), visibleCode === 'redux' ? styles.activeTab : {}),
      onClick: function onClick() {
        return toggleCode('redux');
      }
    }, "\uD83D\uDCE6 Redux Code")), visibleCode && hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: styles.codeContainer
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("pre", {
      style: styles.codeText
    }, visibleCode === 'hooks' ? _Demo_Constant__WEBPACK_IMPORTED_MODULE_2__.hooksSampleCode : _Demo_Constant__WEBPACK_IMPORTED_MODULE_2__.reduxSampleCode), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: styles.codeLabel
    }, visibleCode === 'hooks' ? '🎣 Hooks Example' : '📦 Redux Example')));
  };
  var HooksDemo = function HooksDemo() {
    var _HdReact$useState3 = hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useState(0),
      _HdReact$useState4 = _slicedToArray(_HdReact$useState3, 2),
      count = _HdReact$useState4[0],
      setCount = _HdReact$useState4[1];
    var _HdReact$useState5 = hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useState("#ffffff"),
      _HdReact$useState6 = _slicedToArray(_HdReact$useState5, 2),
      color = _HdReact$useState6[0],
      setColor = _HdReact$useState6[1];
    hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useEffect(function () {
      document.title = "Counter: ".concat(count);
    }, [count]);
    var toggleColor = function toggleColor() {
      return setColor(function (c) {
        return c === "#ffffff" ? "#0099ff" : "#ffffff";
      });
    };
    return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: styles.container
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", {
      style: _objectSpread(_objectSpread({}, styles.counter), {}, {
        color: color
      })
    }, "Counter: ", count), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: styles.buttonGroup
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
      style: styles.button,
      onClick: function onClick() {
        return setCount(function (c) {
          return c + 1;
        });
      }
    }, "\u2B06\uFE0F"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
      style: styles.button,
      onClick: function onClick() {
        return setCount(function (c) {
          return c - 1;
        });
      }
    }, "\u2B07\uFE0F"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
      style: _objectSpread(_objectSpread({}, styles.button), {}, {
        backgroundColor: color === "#ffffff" ? "#0099ff" : "#ffffff",
        color: color === "#ffffff" ? "#fff" : "#333"
      }),
      onClick: toggleColor
    }, "\uD83C\uDFA8")));
  };
  var ReduxDemo = function ReduxDemo() {
    var count = (0,_Store__WEBPACK_IMPORTED_MODULE_1__.useSelector)(function (state) {
      return state.count;
    });
    var dispatch = (0,_Store__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
    return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: styles.container
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", {
      style: styles.counter
    }, "Counter: ", count), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: styles.buttonGroup
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
      style: styles.button,
      onClick: function onClick() {
        return dispatch({
          type: "INCREMENT"
        });
      }
    }, "\u2B06\uFE0F"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", {
      style: styles.button,
      onClick: function onClick() {
        return dispatch({
          type: "DECREMENT"
        });
      }
    }, "\u2B07\uFE0F")));
  };
  var styles = {
    container: {
      textAlign: "center",
      padding: "25px",
      borderRadius: "12px",
      margin: "20px 0"
    },
    counter: {
      margin: "20px 0",
      fontSize: "1.8em",
      fontWeight: "600",
      textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      flexWrap: "wrap"
    },
    button: {
      color: "#fff",
      cursor: "pointer",
      padding: "2px 4px",
      border: "none",
      borderRadius: "8px",
      fontWeight: "600",
      transition: "all 0.3s ease",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
    },
    section: {
      borderRadius: "12px",
      padding: "30px"
    },
    sectionHeader: {
      marginBottom: "20px",
      fontSize: "1.8em",
      fontWeight: "600",
      color: "#2196F3"
    },
    showcase: {
      borderRadius: "16px",
      position: "relative",
      overflow: "hidden"
    },
    tab: {
      display: "inline-block",
      padding: "12px 24px",
      margin: "0 10px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      color: "#2196F3"
    },
    activeTab: {
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.2)"
    },
    codeContainer: {
      position: "relative",
      background: "#161616",
      borderRadius: "12px",
      padding: "20px",
      animation: "fadeIn 0.3s ease"
    },
    codeText: {
      margin: 0,
      color: "#fff",
      fontSize: "14px",
      lineHeight: "1.6",
      overflowX: "auto",
      fontFamily: "monospace"
    },
    codeLabel: {
      position: "absolute",
      top: "10px",
      right: "10px",
      padding: "4px 8px",
      borderRadius: "4px",
      background: "rgba(255,255,255,0.1)",
      color: "#fff",
      fontSize: "12px"
    }
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
  function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
  function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
  function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
  function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
  /** @jsx HdReact.createElement */
  
  
  var Issues = function Issues() {
    var _HdReact$useState = hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].useState(null),
      _HdReact$useState2 = _slicedToArray(_HdReact$useState, 2),
      expandedIssue = _HdReact$useState2[0],
      setExpandedIssue = _HdReact$useState2[1];
    var issues = [{
      id: 1,
      title: "Bug 1: useEffect Cleanup",
      description: "The useEffect cleanup function does not properly fire when the component unmounts.",
      code: "useEffect(() => {\n    console.log(\"Effect running\");\n    return () => {\n        console.log(\"Cleanup should run on unmount\");\n    };\n}, []);",
      status: [{
        text: "Cleanup function not executing on unmount",
        success: false
      }, {
        text: "Effect runs on initial mount",
        success: true
      }, {
        text: "Memory leaks possible",
        success: false
      }]
    }, {
      id: 2,
      title: "Bug 2: Unnecessary Re-renders",
      description: "Including setState in useEffect dependency array causes unnecessary re-renders.",
      code: "useEffect(() => {\n    console.log('Component re-rendered');\n}, [setState]); // Logs on every state update",
      status: [{
        text: "Unnecessary effect executions",
        success: false
      }, {
        text: "Performance impact",
        success: false
      }, {
        text: "Potential side effects",
        success: false
      }]
    }];
    return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: {
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
      }
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h1", {
      style: {
        color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
        fontSize: "3em",
        fontWeight: "800",
        letterSpacing: "-1px",
        marginBottom: "20px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
      }
    }, "Known Issues"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }
    }, issues.map(function (issue) {
      return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        key: issue.id,
        style: {
          background: "rgba(30, 30, 30, 0.6)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
          transition: "all 0.3s ease"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        onClick: function onClick() {
          return setExpandedIssue(function (prev) {
            return prev === issue.id ? null : issue.id;
          });
        },
        style: {
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          background: expandedIssue === issue.id ? "rgba(255, 159, 67, 0.1)" : "transparent",
          borderBottom: expandedIssue === issue.id ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h2", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
          margin: 0,
          fontSize: "2em"
        }
      }, issue.title), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
          fontSize: "1.5em",
          transform: "rotate(".concat(expandedIssue === issue.id ? '180deg' : '0deg', ")"),
          transition: "transform 0.3s ease"
        }
      }, "\u25BC")), expandedIssue === issue.id && hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          padding: "30px",
          background: "rgba(40, 40, 40, 0.6)"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", {
        style: {
          fontSize: "1.3em",
          lineHeight: "1.6",
          color: "#888",
          fontWeight: "300"
        }
      }, issue.description), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          marginTop: "30px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
          fontSize: "1.8em",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }
      }, "Example:"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("pre", {
        style: {
          background: "rgba(50, 50, 50, 0.5)",
          padding: "15px",
          borderRadius: "10px",
          overflow: "auto",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }
      }, issue.code)), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        style: {
          marginTop: "30px"
        }
      }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", {
        style: {
          color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
          fontSize: "1.8em",
          marginBottom: "20px"
        }
      }, "Current Status:"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("ul", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          fontSize: "1.1em"
        }
      }, issue.status.map(function (item, index) {
        return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", {
          key: index,
          style: {
            background: "rgba(50, 50, 50, 0.5)",
            padding: "15px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            opacity: 0,
            animation: "fadeIn 0.5s forwards",
            animationDelay: "".concat(index * 0.1, "s"),
            color: "#aaa"
          }
        }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
          style: {
            color: item.success ? "#00b894" : "#ff6b6b",
            fontSize: "1.2em"
          }
        }, item.success ? "✅" : "❌"), item.text);
      })))));
    })), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("style", null, "\n                    @keyframes fadeIn {\n                        from { opacity: 0; transform: translateY(10px); }\n                        to { opacity: 1; transform: translateY(0); }\n                    }\n                "));
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
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
      }
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h1", {
      style: {
        color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
        fontSize: "3em",
        fontWeight: "800",
        letterSpacing: "-1px",
        marginBottom: "20px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
      }
    }, "Welcome to HdReact!"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", {
      style: {
        fontSize: "1.3em",
        lineHeight: "1.6",
        color: "#888",
        fontWeight: "300"
      }
    }, "Learn how to build your own React-like library from scratch using modern JavaScript and functional programming concepts."), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: {
        background: "rgba(30, 30, 30, 0.6)",
        padding: "30px",
        borderRadius: "20px",
        margin: "30px 0",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)"
      }
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", {
      style: {
        color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
        fontSize: "2em",
        marginBottom: "20px",
        borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
        paddingBottom: "10px",
        fontWeight: "600"
      }
    }, "Key Features"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("ul", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        fontSize: "1.2em",
        color: "#fff"
      }
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(50, 50, 50, 0.5)",
        padding: "15px",
        borderRadius: "10px"
      }
    }, "\u26A1 Fiber-based reconciliation"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(50, 50, 50, 0.5)",
        padding: "15px",
        borderRadius: "10px"
      }
    }, "\uD83C\uDFA3 Complete hooks system"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(50, 50, 50, 0.5)",
        padding: "15px",
        borderRadius: "10px"
      }
    }, "\uD83C\uDFA8 Inline CSS styling"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(50, 50, 50, 0.5)",
        padding: "15px",
        borderRadius: "10px"
      }
    }, "\uD83D\uDD25 Interactive JSX syntax"))), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: {
        background: "rgba(40, 40, 40, 0.6)",
        padding: "30px",
        borderRadius: "20px",
        margin: "30px 0",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
        overflow: "hidden"
      }
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "150px",
        height: "150px"
      }
    }), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", {
      style: {
        color: _types__WEBPACK_IMPORTED_MODULE_1__.THEME.primary,
        fontSize: "1.8em",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }
    }, "\uD83D\uDCE6 Redux Integration"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", {
      style: {
        color: "#aaa",
        marginBottom: "20px",
        lineHeight: "1.6",
        fontSize: "1.1em"
      }
    }, "Now with full Redux support! Build scalable state management with our custom implementation of:"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("ul", {
      style: {
        color: "#aaa",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        fontSize: "1.1em"
      }
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(50, 50, 50, 0.5)",
        padding: "15px",
        borderRadius: "10px"
      }
    }, "\uD83D\uDCE6 Custom Redux store implementation"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(50, 50, 50, 0.5)",
        padding: "15px",
        borderRadius: "10px"
      }
    }, "\uD83D\uDD0C React-Redux bindings"), hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(50, 50, 50, 0.5)",
        padding: "15px",
        borderRadius: "10px"
      }
    }, "\uD83D\uDE80 Optimized state updates"))));
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
  /* harmony import */ var _Demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Demo */ "./src/Docs/Sections/Demo/index.tsx");
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
    component: hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_Welcome_Component__WEBPACK_IMPORTED_MODULE_2__["default"], null)
  }, {
    id: "demo",
    title: "🎉 Demo",
    component: hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_Demo__WEBPACK_IMPORTED_MODULE_1__["default"], null)
  }, {
    id: "issues",
    title: "🐛 Known Issues",
    component: hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_Issues_Component__WEBPACK_IMPORTED_MODULE_4__["default"], null)
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
        borderRadius: "8px",
        overflow: 'hidden'
      }
    }, hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
      style: {
        width: "300px",
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
    }, sections[activeSectionIndex].component));
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
    bg: "#111",
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
  
  /***/ "./src/Store/index.ts":
  /*!****************************!*\
    !*** ./src/Store/index.ts ***!
    \****************************/
  /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  /* harmony export */   useDispatch: () => (/* reexport safe */ hd_react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch),
  /* harmony export */   useSelector: () => (/* binding */ useSelector)
  /* harmony export */ });
  /* harmony import */ var hd_react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hd-react-redux */ "./hd-react-redux/src/index.ts");
  /* harmony import */ var hd_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hd-redux */ "./hd-redux/src/index.ts");
  
  
  var initialState = {
    count: 10
  };
  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    if (!action) return state;
    switch (action.type) {
      case 'INCREMENT':
        return {
          count: state.count + 1
        };
      case 'DECREMENT':
        return {
          count: state.count - 1
        };
      default:
        return state;
    }
  };
  var incrementAsync = function incrementAsync() {
    return function (dispatch, getState) {
      setTimeout(function () {
        dispatch({
          type: 'INCREMENT'
        });
        console.log(getState());
      }, 1000);
    };
  };
  var store = (0,hd_redux__WEBPACK_IMPORTED_MODULE_1__.createStore)(reducer);
  function useSelector(selector) {
    return hd_react_redux__WEBPACK_IMPORTED_MODULE_0__["default"].useSelector(selector);
  }
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);
  
  
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
  
  // export default function App() {
  //   const [count, setCount] = HdReact.useState(0);
  
  //   HdReact.useEffect(() => {
  //     console.log('Effect ran!');
  //   }, []);
  
  //   return (
  //     <div>
  //       <p>Count: {count}</p>
  //       <Message />
  //       <button onClick={() => setCount(count + 1)}>Increment</button>
  //     </div>
  //   );
  // };
  
  var Message = function Message() {
    return hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("p", null, "Power by hd-react");
  };
  
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
  /* harmony import */ var hd_react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hd-react-redux */ "./hd-react-redux/src/index.ts");
  /* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Store */ "./src/Store/index.ts");
  /* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src */ "./src/index.tsx");
  /** @jsx HdReact.createElement */
  
  
  
  
  var render = function render() {
    var container = document.getElementById("root") || document.body;
    container.innerHTML = "";
    (0,hd_react_redux__WEBPACK_IMPORTED_MODULE_1__.renderWithRedux)(hd_react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_src__WEBPACK_IMPORTED_MODULE_3__["default"], null), container, _Store__WEBPACK_IMPORTED_MODULE_2__["default"]);
  };
  render();
  })();
  
  /******/ })()
  ;
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDK0I7QUFDa0I7QUFFWDtBQUNkO0FBRXhCLElBQU1VLE1BQU0sR0FBRyxTQUFUQSxNQUFNQSxDQUFBLEVBQVM7RUFDakIsSUFBTUosU0FBUyxHQUFHbUMsUUFBUSxDQUFDZ08sY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJaE8sUUFBUSxDQUFDaU8sSUFBSTtFQUNsRXBRLFNBQVMsQ0FBQ3FRLFNBQVMsR0FBRyxFQUFFO0VBQ3hCdlEsK0RBQWUsQ0FBUUosOERBQUEsQ0FBQ3VRLDRDQUFHLE1BQUUsQ0FBQyxFQUFFalEsU0FBUyxFQUFFQyw4Q0FBSyxDQUFDO0FBQ3JELENBQUM7QUFFREcsTUFBTSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2hkcmVhY3QvLi9oZC1yZWFjdC1yZWR1eC9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vaGRyZWFjdC8uL2hkLXJlYWN0L3NyYy9IZFJlYWN0LnRzIiwid2VicGFjazovL2hkcmVhY3QvLi9oZC1yZWFjdC9zcmMvY3JlYXRlRWxlbWVudC50cyIsIndlYnBhY2s6Ly9oZHJlYWN0Ly4vaGQtcmVhY3Qvc3JjL2luZGV4LnRzIiwid2VicGFjazovL2hkcmVhY3QvLi9oZC1yZWFjdC9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vaGRyZWFjdC8uL2hkLXJlZHV4L3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9oZHJlYWN0Ly4vc3JjL0RvY3MvU2VjdGlvbnMvRGVtby9EZW1vLkNvbnN0YW50LnRzIiwid2VicGFjazovL2hkcmVhY3QvLi9zcmMvRG9jcy9TZWN0aW9ucy9EZW1vL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9oZHJlYWN0Ly4vc3JjL0RvY3MvU2VjdGlvbnMvSXNzdWVzLkNvbXBvbmVudC50c3giLCJ3ZWJwYWNrOi8vaGRyZWFjdC8uL3NyYy9Eb2NzL1NlY3Rpb25zL1dlbGNvbWUuQ29tcG9uZW50LnRzeCIsIndlYnBhY2s6Ly9oZHJlYWN0Ly4vc3JjL0RvY3MvU2VjdGlvbnMvaW5kZXgudHN4Iiwid2VicGFjazovL2hkcmVhY3QvLi9zcmMvRG9jcy9TZWN0aW9ucy90eXBlcy50cyIsIndlYnBhY2s6Ly9oZHJlYWN0Ly4vc3JjL0RvY3MvaW5kZXgudHN4Iiwid2VicGFjazovL2hkcmVhY3QvLi9zcmMvU3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vaGRyZWFjdC8uL3NyYy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vaGRyZWFjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oZHJlYWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9oZHJlYWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vaGRyZWFjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2hkcmVhY3QvLi9pbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhkUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAnaGQtcmVhY3QnO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ2hkLXJlZHV4JztcclxuXHJcbmxldCBjdXJyZW50U3RvcmU6IFN0b3JlPGFueT4gfCBudWxsID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlcldpdGhSZWR1eDxUPihlbGVtZW50OiBhbnksIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHN0b3JlPzogU3RvcmU8VD4pIHtcclxuICAgIGNvbnNvbGUubG9nKCdyZW5kZXJXaXRoUmVkdXggY2FsbGVkIHdpdGg6JywgeyBlbGVtZW50LCBjb250YWluZXIsIHN0b3JlIH0pO1xyXG4gICAgY3VycmVudFN0b3JlID0gc3RvcmUgfHwgbnVsbDtcclxuICAgIEhkUmVhY3QucmVuZGVyKGVsZW1lbnQsIGNvbnRhaW5lcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZURpc3BhdGNoKCkge1xyXG4gICAgY29uc29sZS5sb2coJ3VzZURpc3BhdGNoIGNhbGxlZCcpO1xyXG4gICAgaWYgKCFjdXJyZW50U3RvcmUpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHV4IHN0b3JlIG5vdCBmb3VuZC4gUGFzcyB0aGUgc3RvcmUgdG8gSGRSZWFjdFJlZHV4LnJlbmRlcldpdGhSZWR1eCgpJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudFN0b3JlLmRpc3BhdGNoO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VTZWxlY3RvcjxULCBTZWxlY3RlZD4oc2VsZWN0b3I6IChzdGF0ZTogVCkgPT4gU2VsZWN0ZWQsIGVxdWFsaXR5Rm4/OiAoYTogU2VsZWN0ZWQsIGI6IFNlbGVjdGVkKSA9PiBib29sZWFuKTogU2VsZWN0ZWQge1xyXG4gICAgY29uc29sZS5sb2coJ3VzZVNlbGVjdG9yIGNhbGxlZCB3aXRoIHNlbGVjdG9yOicsIHNlbGVjdG9yKTtcclxuICAgIGlmICghY3VycmVudFN0b3JlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1eCBzdG9yZSBub3QgZm91bmQuIFBhc3MgdGhlIHN0b3JlIHRvIEhkUmVhY3RSZWR1eC5yZW5kZXJXaXRoUmVkdXgoKScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0b3JlID0gY3VycmVudFN0b3JlO1xyXG4gICAgY29uc3QgW3NlbGVjdGVkU3RhdGUsIHNldFNlbGVjdGVkU3RhdGVdID0gdXNlU3RhdGU8U2VsZWN0ZWQ+KCgpID0+IHNlbGVjdG9yKHN0b3JlLmdldFN0YXRlKCkpKTtcclxuICAgIGNvbnNvbGUubG9nKCdJbml0aWFsIHNlbGVjdGVkIHN0YXRlOicsIHNlbGVjdGVkU3RhdGUsICdmcm9tIHNlbGVjdG9yOicsIHNlbGVjdG9yKHN0b3JlLmdldFN0YXRlKCkpKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTZXR0aW5nIHVwIHN0b3JlIHN1YnNjcmlwdGlvbicpO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrRm9yVXBkYXRlcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV3U2VsZWN0ZWRTdGF0ZSA9IHNlbGVjdG9yKHN0b3JlLmdldFN0YXRlKCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2hlY2tpbmcgZm9yIHVwZGF0ZXM6JywgeyBjdXJyZW50OiBzZWxlY3RlZFN0YXRlLCBuZXc6IG5ld1NlbGVjdGVkU3RhdGUgfSk7XHJcbiAgICAgICAgICAgIGlmICghZXF1YWxpdHlGbiB8fCAhZXF1YWxpdHlGbihzZWxlY3RlZFN0YXRlLCBuZXdTZWxlY3RlZFN0YXRlKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N0YXRlIHVwZGF0ZSBkZXRlY3RlZCwgc2V0dGluZyBuZXcgc3RhdGUnKTtcclxuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkU3RhdGUobmV3U2VsZWN0ZWRTdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9IHN0b3JlLnN1YnNjcmliZShjaGVja0ZvclVwZGF0ZXMpO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDbGVhbmluZyB1cCBzdG9yZSBzdWJzY3JpcHRpb24nKTtcclxuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSwgW3N0b3JlLCBlcXVhbGl0eUZuLCBzZXRTZWxlY3RlZFN0YXRlXSk7XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGVkU3RhdGU7XHJcbn1cclxuXHJcbmNvbnN0IEhkUmVhY3RSZWR1eCA9IHtcclxuICAgIHJlbmRlcldpdGhSZWR1eCxcclxuICAgIHVzZURpc3BhdGNoLFxyXG4gICAgdXNlU2VsZWN0b3JcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICByZW5kZXJXaXRoUmVkdXgsXHJcbiAgICB1c2VEaXNwYXRjaCxcclxuICAgIHVzZVNlbGVjdG9yXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZFJlYWN0UmVkdXg7IiwiaW1wb3J0IGNyZWF0ZUVsZW1lbnQgZnJvbSAnLi9jcmVhdGVFbGVtZW50JztcclxuaW1wb3J0IHsgRmliZXIgfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHsgdXBkYXRlRG9tIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5sZXQgd2lwUm9vdDogRmliZXIgfCBudWxsID0gbnVsbDtcclxubGV0IGN1cnJlbnRSb290OiBGaWJlciB8IG51bGwgPSBudWxsO1xyXG5sZXQgbmV4dFVuaXRPZldvcms6IEZpYmVyIHwgbnVsbCA9IG51bGw7XHJcbmxldCBkZWxldGlvbnM6IEZpYmVyW10gPSBbXTtcclxubGV0IHdpcEZpYmVyOiBGaWJlciB8IG51bGwgPSBudWxsO1xyXG5sZXQgaG9va0luZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlRG9tKGZpYmVyOiBGaWJlcikge1xyXG4gICAgY29uc3QgZG9tID1cclxuICAgICAgICBmaWJlci50eXBlID09PSBcIlRFWFRfRUxFTUVOVFwiXHJcbiAgICAgICAgICAgID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIilcclxuICAgICAgICAgICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGZpYmVyLnR5cGUgYXMgc3RyaW5nKTtcclxuXHJcbiAgICB1cGRhdGVEb20oZG9tLCB7fSwgZmliZXIucHJvcHMpO1xyXG4gICAgcmV0dXJuIGRvbTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKGVsZW1lbnQ6IGFueSwgY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xyXG4gICAgd2lwUm9vdCA9IHtcclxuICAgICAgICBkb206IGNvbnRhaW5lcixcclxuICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICBjaGlsZHJlbjogW2VsZW1lbnRdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyZW50OiB1bmRlZmluZWQsXHJcbiAgICAgICAgY2hpbGQ6IHVuZGVmaW5lZCxcclxuICAgICAgICBzaWJsaW5nOiB1bmRlZmluZWQsXHJcbiAgICAgICAgYWx0ZXJuYXRlOiBjdXJyZW50Um9vdCxcclxuICAgIH07XHJcbiAgICBkZWxldGlvbnMgPSBbXTtcclxuICAgIG5leHRVbml0T2ZXb3JrID0gd2lwUm9vdDtcclxufVxyXG5cclxuZnVuY3Rpb24gd29ya0xvb3AoZGVhZGxpbmU6IElkbGVEZWFkbGluZSkge1xyXG4gICAgbGV0IHNob3VsZFlpZWxkID0gZmFsc2U7XHJcbiAgICB3aGlsZSAobmV4dFVuaXRPZldvcmsgJiYgIXNob3VsZFlpZWxkKSB7XHJcbiAgICAgICAgbmV4dFVuaXRPZldvcmsgPSBwZXJmb3JtVW5pdE9mV29yayhuZXh0VW5pdE9mV29yayk7XHJcbiAgICAgICAgc2hvdWxkWWllbGQgPSBkZWFkbGluZS50aW1lUmVtYWluaW5nKCkgPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbmV4dFVuaXRPZldvcmsgJiYgd2lwUm9vdCkge1xyXG4gICAgICAgIGNvbW1pdFJvb3QoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0SWRsZUNhbGxiYWNrKHdvcmtMb29wKTtcclxufVxyXG5cclxucmVxdWVzdElkbGVDYWxsYmFjayh3b3JrTG9vcCk7XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtVW5pdE9mV29yayhmaWJlcjogRmliZXIpOiBGaWJlciB8IG51bGwge1xyXG4gICAgY29uc3QgaXNGdW5jdGlvbkNvbXBvbmVudCA9IHR5cGVvZiBmaWJlci50eXBlID09PSAnZnVuY3Rpb24nO1xyXG5cclxuICAgIGlmIChpc0Z1bmN0aW9uQ29tcG9uZW50KSB7XHJcbiAgICAgICAgdXBkYXRlRnVuY3Rpb25Db21wb25lbnQoZmliZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB1cGRhdGVIb3N0Q29tcG9uZW50KGZpYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmliZXIuY2hpbGQpIHtcclxuICAgICAgICByZXR1cm4gZmliZXIuY2hpbGQ7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV4dEZpYmVyOiBGaWJlciB8IHVuZGVmaW5lZCA9IGZpYmVyO1xyXG4gICAgd2hpbGUgKG5leHRGaWJlcikge1xyXG4gICAgICAgIGlmIChuZXh0RmliZXIuc2libGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV4dEZpYmVyLnNpYmxpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5leHRGaWJlciA9IG5leHRGaWJlci5wYXJlbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlRnVuY3Rpb25Db21wb25lbnQoZmliZXI6IEZpYmVyKSB7XHJcbiAgICB3aXBGaWJlciA9IGZpYmVyO1xyXG4gICAgaG9va0luZGV4ID0gMDtcclxuICAgIHdpcEZpYmVyLmhvb2tzID0gW107XHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IFsoZmliZXIudHlwZSBhcyBGdW5jdGlvbikoZmliZXIucHJvcHMpXTtcclxuICAgIHJlY29uY2lsZUNoaWxkcmVuKGZpYmVyLCBjaGlsZHJlbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZVN0YXRlPFQ+KGluaXRpYWw6IFQgfCAoKCkgPT4gVCkpOiBbVCwgKGFjdGlvbjogVCB8ICgocHJldjogVCkgPT4gVCkpID0+IHZvaWRdIHtcclxuICAgIGNvbnN0IG9sZEhvb2sgPSB3aXBGaWJlcj8uYWx0ZXJuYXRlPy5ob29rcz8uW2hvb2tJbmRleF07XHJcblxyXG4gICAgY29uc3QgaG9vayA9IHtcclxuICAgICAgICBzdGF0ZTogb2xkSG9vayA/IG9sZEhvb2suc3RhdGUgOiAodHlwZW9mIGluaXRpYWwgPT09ICdmdW5jdGlvbicgPyAoaW5pdGlhbCBhcyAoKCkgPT4gVCkpKCkgOiBpbml0aWFsKSxcclxuICAgICAgICBxdWV1ZTogW10gYXMgKFQgfCAoKHByZXY6IFQpID0+IFQpKVtdLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBhY3Rpb25zID0gb2xkSG9vayA/IG9sZEhvb2sucXVldWUgOiBbXTtcclxuICAgIGFjdGlvbnMuZm9yRWFjaCgoYWN0aW9uOiBUIHwgKChwcmV2OiBUKSA9PiBUKSkgPT4ge1xyXG4gICAgICAgIGhvb2suc3RhdGUgPSB0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nID8gKGFjdGlvbiBhcyAoKHByZXY6IFQpID0+IFQpKShob29rLnN0YXRlKSA6IGFjdGlvbjtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNldFN0YXRlID0gKGFjdGlvbjogVCB8ICgocHJldjogVCkgPT4gVCkpID0+IHtcclxuICAgICAgICBob29rLnF1ZXVlLnB1c2goYWN0aW9uKTtcclxuICAgICAgICBpZiAoY3VycmVudFJvb3QgJiYgY3VycmVudFJvb3QuZG9tKSB7XHJcbiAgICAgICAgICAgIHdpcFJvb3QgPSB7XHJcbiAgICAgICAgICAgICAgICBkb206IGN1cnJlbnRSb290LmRvbSxcclxuICAgICAgICAgICAgICAgIHByb3BzOiBjdXJyZW50Um9vdC5wcm9wcyxcclxuICAgICAgICAgICAgICAgIGFsdGVybmF0ZTogY3VycmVudFJvb3QsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG5leHRVbml0T2ZXb3JrID0gd2lwUm9vdDtcclxuICAgICAgICAgICAgZGVsZXRpb25zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIXdpcEZpYmVyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIb29rcyBjYW4gb25seSBiZSBjYWxsZWQgaW5zaWRlIGEgZnVuY3Rpb24gY29tcG9uZW50Jyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXdpcEZpYmVyLmhvb2tzKSB7XHJcbiAgICAgICAgd2lwRmliZXIuaG9va3MgPSBbXTtcclxuICAgIH1cclxuICAgIHdpcEZpYmVyLmhvb2tzLnB1c2goaG9vayk7XHJcbiAgICBob29rSW5kZXgrKztcclxuXHJcbiAgICByZXR1cm4gW2hvb2suc3RhdGUsIHNldFN0YXRlXTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlRWZmZWN0KGNhbGxiYWNrOiAoKSA9PiB2b2lkIHwgKCgpID0+IHZvaWQpLCBkZXBzPzogYW55W10pIHtcclxuICAgIGNvbnN0IG9sZEhvb2sgPSB3aXBGaWJlcj8uYWx0ZXJuYXRlPy5ob29rcz8uW2hvb2tJbmRleF07XHJcblxyXG4gICAgY29uc3QgaG9vayA9IHtcclxuICAgICAgICBkZXBzLFxyXG4gICAgICAgIGNhbGxiYWNrLFxyXG4gICAgICAgIGNsZWFudXA6IG9sZEhvb2sgPyBvbGRIb29rLmNsZWFudXAgOiB1bmRlZmluZWQsXHJcbiAgICB9O1xyXG5cclxuICAgIHdpcEZpYmVyIS5ob29rcyEucHVzaChob29rKTtcclxuICAgIGhvb2tJbmRleCsrO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9jZXNzRWZmZWN0cygpIHtcclxuICAgIGxldCBmaWJlciA9IGN1cnJlbnRSb290Py5jaGlsZDtcclxuICAgIHdoaWxlIChmaWJlcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZmliZXIudHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBjb25zdCBob29rcyA9IGZpYmVyLmhvb2tzIHx8IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBob29rID0gaG9va3NbaV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRIb29rID0gZmliZXIuYWx0ZXJuYXRlPy5ob29rcz8uW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBob29rLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7IC8vIElkZW50aWZ5IHVzZUVmZmVjdCBob29rXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkRGVwcyA9IG9sZEhvb2s/LmRlcHM7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3RGVwcyA9IGhvb2suZGVwcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNDaGFuZ2VkRGVwcyA9ICFvbGREZXBzIHx8ICFuZXdEZXBzIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZERlcHMubGVuZ3RoICE9PSBuZXdEZXBzLmxlbmd0aCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdEZXBzLnNvbWUoKGRlcDogYW55LCBpZHg6IG51bWJlcikgPT4gZGVwICE9PSBvbGREZXBzW2lkeF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFzQ2hhbmdlZERlcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUnVuIHByZXZpb3VzIGNsZWFudXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZEhvb2s/LmNsZWFudXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZEhvb2suY2xlYW51cCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJ1biBjdXJyZW50IGVmZmVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGVhbnVwID0gaG9vay5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTYXZlIGNsZWFudXAgZm9yIG5leHQgdGltZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBob29rLmNsZWFudXAgPSB0eXBlb2YgY2xlYW51cCA9PT0gJ2Z1bmN0aW9uJyA/IGNsZWFudXAgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXB0aC1maXJzdCB0cmF2ZXJzYWxcclxuICAgICAgICBpZiAoZmliZXIuY2hpbGQpIHtcclxuICAgICAgICAgICAgZmliZXIgPSBmaWJlci5jaGlsZDtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBuZXh0RmliZXI6IEZpYmVyIHwgdW5kZWZpbmVkID0gZmliZXI7XHJcbiAgICAgICAgd2hpbGUgKG5leHRGaWJlcikge1xyXG4gICAgICAgICAgICBpZiAobmV4dEZpYmVyLnNpYmxpbmcpIHtcclxuICAgICAgICAgICAgICAgIGZpYmVyID0gbmV4dEZpYmVyLnNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXh0RmliZXIgPSBuZXh0RmliZXIucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW5leHRGaWJlcikge1xyXG4gICAgICAgICAgICBmaWJlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZVJlZjxUPihpbml0aWFsPzogVCkge1xyXG4gICAgcmV0dXJuIHVzZVN0YXRlKHsgY3VycmVudDogaW5pdGlhbCB9KVswXTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXNlQ2FsbGJhY2soY2FsbGJhY2s6ICgpID0+IHZvaWQsIGRlcHM6IGFueVtdKTogKCgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IG9sZEhvb2sgPSB3aXBGaWJlcj8uYWx0ZXJuYXRlPy5ob29rcz8uW2hvb2tJbmRleF07XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIGlmIGRlcGVuZGVuY2llcyBoYXZlIGNoYW5nZWRcclxuICAgIGNvbnN0IGhhc0NoYW5nZWQgPVxyXG4gICAgICAgICFvbGRIb29rIHx8XHJcbiAgICAgICAgIWRlcHMgfHxcclxuICAgICAgICAhb2xkSG9vay5kZXBzIHx8XHJcbiAgICAgICAgZGVwcy5sZW5ndGggIT09IG9sZEhvb2suZGVwcy5sZW5ndGggfHxcclxuICAgICAgICBkZXBzLnNvbWUoKGRlcDogYW55LCBpOiBudW1iZXIpID0+IGRlcCAhPT0gb2xkSG9vay5kZXBzW2ldKTtcclxuXHJcbiAgICAvLyBJZiBkZXBzIGhhdmVuJ3QgY2hhbmdlZCwgcmV1c2UgdGhlIG9sZCBjYWxsYmFjazsgb3RoZXJ3aXNlLCBzdG9yZSB0aGUgbmV3IG9uZVxyXG4gICAgY29uc3QgaG9vayA9IHtcclxuICAgICAgICBkZXBzLFxyXG4gICAgICAgIGNhbGxiYWNrOiBoYXNDaGFuZ2VkID8gY2FsbGJhY2sgOiBvbGRIb29rPy5jYWxsYmFjayxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKCF3aXBGaWJlciB8fCAhd2lwRmliZXIuaG9va3MpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hvb2tzIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgYSBmdW5jdGlvbiBjb21wb25lbnQnKTtcclxuICAgIH1cclxuXHJcbiAgICB3aXBGaWJlci5ob29rcy5wdXNoKGhvb2spO1xyXG4gICAgaG9va0luZGV4Kys7XHJcblxyXG4gICAgcmV0dXJuIGhvb2suY2FsbGJhY2s7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVzZU1lbW88VD4oZmFjdG9yeTogKCkgPT4gVCwgZGVwczogYW55W10pOiBUIHtcclxuICAgIGNvbnN0IG9sZEhvb2sgPSB3aXBGaWJlcj8uYWx0ZXJuYXRlPy5ob29rcz8uW2hvb2tJbmRleF07XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIGlmIGRlcGVuZGVuY2llcyBoYXZlIGNoYW5nZWRcclxuICAgIGNvbnN0IGhhc0NoYW5nZWQgPVxyXG4gICAgICAgICFvbGRIb29rIHx8XHJcbiAgICAgICAgIWRlcHMgfHxcclxuICAgICAgICAhb2xkSG9vay5kZXBzIHx8XHJcbiAgICAgICAgZGVwcy5sZW5ndGggIT09IG9sZEhvb2suZGVwcy5sZW5ndGggfHxcclxuICAgICAgICBkZXBzLnNvbWUoKGRlcDogYW55LCBpOiBudW1iZXIpID0+IGRlcCAhPT0gb2xkSG9vay5kZXBzW2ldKTtcclxuXHJcbiAgICAvLyBJZiBkZXBzIGhhdmVuJ3QgY2hhbmdlZCwgcmV1c2UgdGhlIG9sZCB2YWx1ZTsgb3RoZXJ3aXNlLCBjb21wdXRlIG5ldyBvbmVcclxuICAgIGNvbnN0IGhvb2sgPSB7XHJcbiAgICAgICAgZGVwcyxcclxuICAgICAgICB2YWx1ZTogaGFzQ2hhbmdlZCA/IGZhY3RvcnkoKSA6IG9sZEhvb2s/LnZhbHVlLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIXdpcEZpYmVyIHx8ICF3aXBGaWJlci5ob29rcykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSG9va3MgY2FuIG9ubHkgYmUgY2FsbGVkIGluc2lkZSBhIGZ1bmN0aW9uIGNvbXBvbmVudCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHdpcEZpYmVyLmhvb2tzLnB1c2goaG9vayk7XHJcbiAgICBob29rSW5kZXgrKztcclxuXHJcbiAgICByZXR1cm4gaG9vay52YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlSG9zdENvbXBvbmVudChmaWJlcjogRmliZXIpIHtcclxuICAgIGlmICghZmliZXIuZG9tKSB7XHJcbiAgICAgICAgZmliZXIuZG9tID0gY3JlYXRlRG9tKGZpYmVyKTtcclxuICAgIH1cclxuICAgIHJlY29uY2lsZUNoaWxkcmVuKGZpYmVyLCBmaWJlci5wcm9wcy5jaGlsZHJlbik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlY29uY2lsZUNoaWxkcmVuKHdpcEZpYmVyOiBGaWJlciwgZWxlbWVudHM6IGFueVtdKSB7XHJcbiAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgbGV0IG9sZEZpYmVyID0gd2lwRmliZXIuYWx0ZXJuYXRlPy5jaGlsZDtcclxuICAgIGxldCBwcmV2U2libGluZzogRmliZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICB3aGlsZSAoaW5kZXggPCBlbGVtZW50cy5sZW5ndGggfHwgb2xkRmliZXIpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaW5kZXhdO1xyXG4gICAgICAgIGxldCBuZXdGaWJlcjogRmliZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3Qgc2FtZVR5cGUgPSBvbGRGaWJlciAmJiBlbGVtZW50ICYmIGVsZW1lbnQudHlwZSA9PT0gb2xkRmliZXIudHlwZTtcclxuXHJcbiAgICAgICAgaWYgKHNhbWVUeXBlKSB7XHJcbiAgICAgICAgICAgIG5ld0ZpYmVyID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogb2xkRmliZXIhLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBwcm9wczogZWxlbWVudC5wcm9wcyxcclxuICAgICAgICAgICAgICAgIGRvbTogb2xkRmliZXIhLmRvbSxcclxuICAgICAgICAgICAgICAgIHBhcmVudDogd2lwRmliZXIsXHJcbiAgICAgICAgICAgICAgICBhbHRlcm5hdGU6IG9sZEZpYmVyLFxyXG4gICAgICAgICAgICAgICAgZWZmZWN0VGFnOiBcIlVQREFURVwiLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZWxlbWVudCAmJiAhc2FtZVR5cGUpIHtcclxuICAgICAgICAgICAgbmV3RmliZXIgPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBlbGVtZW50LnR5cGUsXHJcbiAgICAgICAgICAgICAgICBwcm9wczogZWxlbWVudC5wcm9wcyxcclxuICAgICAgICAgICAgICAgIGRvbTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHBhcmVudDogd2lwRmliZXIsXHJcbiAgICAgICAgICAgICAgICBhbHRlcm5hdGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBlZmZlY3RUYWc6IFwiUExBQ0VNRU5UXCIsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvbGRGaWJlciAmJiAhc2FtZVR5cGUpIHtcclxuICAgICAgICAgICAgb2xkRmliZXIuZWZmZWN0VGFnID0gXCJERUxFVElPTlwiO1xyXG4gICAgICAgICAgICBkZWxldGlvbnMucHVzaChvbGRGaWJlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob2xkRmliZXIpIHtcclxuICAgICAgICAgICAgb2xkRmliZXIgPSBvbGRGaWJlci5zaWJsaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHdpcEZpYmVyLmNoaWxkID0gbmV3RmliZXIgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBwcmV2U2libGluZyEuc2libGluZyA9IG5ld0ZpYmVyIHx8IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByZXZTaWJsaW5nID0gbmV3RmliZXI7XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29tbWl0Um9vdCgpIHtcclxuICAgIGRlbGV0aW9ucy5mb3JFYWNoKGNvbW1pdFdvcmspO1xyXG4gICAgY29tbWl0V29yayh3aXBSb290Py5jaGlsZCk7XHJcbiAgICBjdXJyZW50Um9vdCA9IHdpcFJvb3Q7XHJcbiAgICB3aXBSb290ID0gbnVsbDtcclxuXHJcbiAgICAvLyBQcm9jZXNzIGVmZmVjdHMgYWZ0ZXIgdGhlIERPTSBpcyBjb21taXR0ZWRcclxuICAgIHByb2Nlc3NFZmZlY3RzKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbW1pdFdvcmsoZmliZXI/OiBGaWJlcikge1xyXG4gICAgaWYgKCFmaWJlcikgcmV0dXJuO1xyXG5cclxuICAgIGxldCBkb21QYXJlbnRGaWJlciA9IGZpYmVyLnBhcmVudDtcclxuICAgIHdoaWxlICghZG9tUGFyZW50RmliZXI/LmRvbSkge1xyXG4gICAgICAgIGRvbVBhcmVudEZpYmVyID0gZG9tUGFyZW50RmliZXI/LnBhcmVudDtcclxuICAgIH1cclxuICAgIGNvbnN0IGRvbVBhcmVudCA9IGRvbVBhcmVudEZpYmVyLmRvbSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAoZmliZXIuZWZmZWN0VGFnID09PSBcIlBMQUNFTUVOVFwiICYmIGZpYmVyLmRvbSkge1xyXG4gICAgICAgIGRvbVBhcmVudC5hcHBlbmRDaGlsZChmaWJlci5kb20pO1xyXG4gICAgfSBlbHNlIGlmIChmaWJlci5lZmZlY3RUYWcgPT09IFwiVVBEQVRFXCIgJiYgZmliZXIuZG9tKSB7XHJcbiAgICAgICAgdXBkYXRlRG9tKFxyXG4gICAgICAgICAgICBmaWJlci5kb20sXHJcbiAgICAgICAgICAgIGZpYmVyLmFsdGVybmF0ZT8ucHJvcHMgfHwge30sXHJcbiAgICAgICAgICAgIGZpYmVyLnByb3BzXHJcbiAgICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAoZmliZXIuZWZmZWN0VGFnID09PSBcIkRFTEVUSU9OXCIpIHtcclxuICAgICAgICBjb21taXREZWxldGlvbihmaWJlciwgZG9tUGFyZW50KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29tbWl0V29yayhmaWJlci5jaGlsZCk7XHJcbiAgICBjb21taXRXb3JrKGZpYmVyLnNpYmxpbmcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21taXREZWxldGlvbihmaWJlcjogRmliZXIsIGRvbVBhcmVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgIGlmIChmaWJlci5kb20pIHtcclxuICAgICAgICBpZiAoZG9tUGFyZW50LmNvbnRhaW5zKGZpYmVyLmRvbSkpIHtcclxuICAgICAgICAgICAgZG9tUGFyZW50LnJlbW92ZUNoaWxkKGZpYmVyLmRvbSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiQXR0ZW1wdGVkIHRvIHJlbW92ZSBhIG5vZGUgdGhhdCBpcyBub3QgYSBjaGlsZCBvZiB0aGUgcGFyZW50LlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbW1pdERlbGV0aW9uKGZpYmVyLmNoaWxkISwgZG9tUGFyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxsIGNsZWFudXAgZnVuY3Rpb24gaWYgaXQgZXhpc3RzXHJcbiAgICBpZiAoZmliZXIuaG9va3MpIHtcclxuICAgICAgICBmaWJlci5ob29rcy5mb3JFYWNoKChob29rKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdob29rJywgaG9vayk7XHJcbiAgICAgICAgICAgIGlmIChob29rLmNsZWFudXApIHtcclxuICAgICAgICAgICAgICAgIGhvb2suY2xlYW51cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IEhkUmVhY3QgPSB7XHJcbiAgICBjcmVhdGVFbGVtZW50LFxyXG4gICAgcmVuZGVyLFxyXG4gICAgdXNlU3RhdGUsXHJcbiAgICB1c2VFZmZlY3QsXHJcbiAgICB1c2VSZWYsXHJcbiAgICB1c2VDYWxsYmFjayxcclxuICAgIHVzZU1lbW8sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZFJlYWN0O1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGNyZWF0ZUVsZW1lbnQsXHJcbiAgICByZW5kZXIsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGVcclxufTtcclxuXHJcbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCIuL3R5cGVzXCI7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGU6IHN0cmluZyB8IEZ1bmN0aW9uLCBwcm9wczogYW55LCAuLi5jaGlsZHJlbjogUmVhY3RFbGVtZW50W10pOiBSZWFjdEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIC4uLnByb3BzLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW4uZmxhdCgpLm1hcChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNoaWxkID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gXCJib29sZWFuXCIgfHwgY2hpbGQgPT09IG51bGwgfHwgY2hpbGQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVRleHRFbGVtZW50KGNoaWxkKTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50KHRleHQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBcIlRFWFRfRUxFTUVOVFwiLFxyXG4gICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgIG5vZGVWYWx1ZTogdGV4dCxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbGVtZW50OyIsImltcG9ydCBIZFJlYWN0IGZyb20gJy4vSGRSZWFjdCc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL0hkUmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGRSZWFjdDsiLCJleHBvcnQgZnVuY3Rpb24gdXBkYXRlRG9tKGRvbTogSFRNTEVsZW1lbnQgfCBUZXh0LCBwcmV2UHJvcHM6IGFueSwgbmV4dFByb3BzOiBhbnkpIHtcclxuICAgIC8vIEhhbmRsZSBzdHlsZSB1cGRhdGVzXHJcbiAgICBjb25zdCBpc1N0eWxlID0gKGtleTogc3RyaW5nKSA9PiBrZXkgPT09IFwic3R5bGVcIjtcclxuICAgIGNvbnN0IGlzUHJvcGVydHkgPSAoa2V5OiBzdHJpbmcpID0+IGtleSAhPT0gXCJjaGlsZHJlblwiICYmICFpc0V2ZW50KGtleSkgJiYgIWlzU3R5bGUoa2V5KTtcclxuXHJcbiAgICAvLyBSZW1vdmUgb2xkIHN0eWxlc1xyXG4gICAgY29uc3QgcHJldlN0eWxlID0gcHJldlByb3BzLnN0eWxlIHx8IHt9O1xyXG4gICAgY29uc3QgbmV4dFN0eWxlID0gbmV4dFByb3BzLnN0eWxlIHx8IHt9O1xyXG4gICAgT2JqZWN0LmtleXMocHJldlN0eWxlKS5mb3JFYWNoKChzdHlsZU5hbWUpID0+IHtcclxuICAgICAgICBpZiAoIShzdHlsZU5hbWUgaW4gbmV4dFN0eWxlKSkge1xyXG4gICAgICAgICAgICAoZG9tIGFzIEhUTUxFbGVtZW50KS5zdHlsZVtzdHlsZU5hbWUgYXMgYW55XSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2V0IG5ldyBzdHlsZXNcclxuICAgIE9iamVjdC5rZXlzKG5leHRTdHlsZSkuZm9yRWFjaCgoc3R5bGVOYW1lKSA9PiB7XHJcbiAgICAgICAgKGRvbSBhcyBIVE1MRWxlbWVudCkuc3R5bGVbc3R5bGVOYW1lIGFzIGFueV0gPSBuZXh0U3R5bGVbc3R5bGVOYW1lXTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFJlbW92ZSBvbGQgcHJvcGVydGllc1xyXG4gICAgT2JqZWN0LmtleXMocHJldlByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoaXNQcm9wZXJ0eSlcclxuICAgICAgICAuZmlsdGVyKChrZXkpID0+ICEoa2V5IGluIG5leHRQcm9wcykpXHJcbiAgICAgICAgLmZvckVhY2goKG5hbWUpID0+IHtcclxuICAgICAgICAgICAgKGRvbSBhcyBhbnkpW25hbWVdID0gXCJcIjtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBTZXQgbmV3IHByb3BlcnRpZXNcclxuICAgIE9iamVjdC5rZXlzKG5leHRQcm9wcylcclxuICAgICAgICAuZmlsdGVyKGlzUHJvcGVydHkpXHJcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBwcmV2UHJvcHNba2V5XSAhPT0gbmV4dFByb3BzW2tleV0pXHJcbiAgICAgICAgLmZvckVhY2goKG5hbWUpID0+IHtcclxuICAgICAgICAgICAgKGRvbSBhcyBhbnkpW25hbWVdID0gbmV4dFByb3BzW25hbWVdO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIFJlbW92ZSBvbGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICBPYmplY3Qua2V5cyhwcmV2UHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcihpc0V2ZW50KVxyXG4gICAgICAgIC5maWx0ZXIoKGtleSkgPT4gIShrZXkgaW4gbmV4dFByb3BzKSB8fCBwcmV2UHJvcHNba2V5XSAhPT0gbmV4dFByb3BzW2tleV0pXHJcbiAgICAgICAgLmZvckVhY2goKG5hbWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXZlbnRUeXBlID0gbmFtZS50b0xvd2VyQ2FzZSgpLnN1YnN0cmluZygyKTtcclxuICAgICAgICAgICAgZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBwcmV2UHJvcHNbbmFtZV0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIEFkZCBuZXcgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICBPYmplY3Qua2V5cyhuZXh0UHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcihpc0V2ZW50KVxyXG4gICAgICAgIC5maWx0ZXIoKGtleSkgPT4gcHJldlByb3BzW2tleV0gIT09IG5leHRQcm9wc1trZXldKVxyXG4gICAgICAgIC5mb3JFYWNoKChuYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IG5hbWUudG9Mb3dlckNhc2UoKS5zdWJzdHJpbmcoMik7XHJcbiAgICAgICAgICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgbmV4dFByb3BzW25hbWVdKTtcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuY29uc3QgaXNFdmVudCA9IChrZXk6IHN0cmluZykgPT4ga2V5LnN0YXJ0c1dpdGgoXCJvblwiKTsiLCJleHBvcnQgaW50ZXJmYWNlIEFjdGlvbiB7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBwYXlsb2FkPzogYW55O1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBUaHVuazxUPiA9IChkaXNwYXRjaDogKGFjdGlvbjogQWN0aW9uIHwgVGh1bms8VD4pID0+IHZvaWQsIGdldFN0YXRlOiAoKSA9PiBUKSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdG9yZTxUPiB7XHJcbiAgICBnZXRTdGF0ZTogKCkgPT4gVDtcclxuICAgIGRpc3BhdGNoOiAoYWN0aW9uOiBBY3Rpb24gfCBUaHVuazxUPikgPT4gdm9pZDtcclxuICAgIHN1YnNjcmliZTogKGxpc3RlbmVyOiAoKSA9PiB2b2lkKSA9PiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlU3RvcmUgPSA8VD4ocmVkdWNlcjogKHN0YXRlOiBUIHwgdW5kZWZpbmVkLCBhY3Rpb24/OiBBY3Rpb24pID0+IFQpOiBTdG9yZTxUPiA9PiB7XHJcbiAgICBsZXQgc3RhdGUgPSByZWR1Y2VyKHVuZGVmaW5lZCk7XHJcbiAgICBsZXQgbGlzdGVuZXJzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0IHN0b3JlOiBTdG9yZTxUPiA9IHtcclxuICAgICAgICBnZXRTdGF0ZTogKCkgPT4gc3RhdGUsXHJcbiAgICAgICAgZGlzcGF0Y2g6IChhY3Rpb246IEFjdGlvbiB8IFRodW5rPFQ+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWN0aW9uKHN0b3JlLmRpc3BhdGNoLCBzdG9yZS5nZXRTdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xyXG4gICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChsaXN0ZW5lciA9PiBsaXN0ZW5lcigpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1YnNjcmliZTogKGxpc3RlbmVyOiAoKSA9PiB2b2lkKSA9PiB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gc3RvcmU7XHJcbn0iLCJleHBvcnQgY29uc3QgaG9va3NTYW1wbGVDb2RlID0gYC8qKiBAanN4IEhkUmVhY3QuY3JlYXRlRWxlbWVudCAqL1xyXG5pbXBvcnQgSGRSZWFjdCBmcm9tIFwiaGQtcmVhY3RcIjtcclxuXHJcbmNvbnN0IEhvb2tzRGVtbyA9ICgpID0+IHtcclxuICBjb25zdCBbY291bnQsIHNldENvdW50XSA9IEhkUmVhY3QudXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2NvbG9yLCBzZXRDb2xvcl0gPSBIZFJlYWN0LnVzZVN0YXRlKFwiI2ZmZmZmZlwiKTtcclxuXHJcbiAgSGRSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBcXGBDb3VudGVyOiBcXCR7Y291bnR9XFxgO1xyXG4gIH0sIFtjb3VudF0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPGgzPkNvdW50ZXI6IHtjb3VudH08L2gzPlxyXG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldENvdW50KGMgPT4gYyArIDEpfT5cclxuICAgICAgICBJbmNyZW1lbnRcclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0Q291bnQoYyA9PiBjIC0gMSl9PlxyXG4gICAgICAgIERlY3JlbWVudFxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07YDtcclxuXHJcbmV4cG9ydCBjb25zdCByZWR1eFNhbXBsZUNvZGUgPSBgLyoqIEBqc3ggSGRSZWFjdC5jcmVhdGVFbGVtZW50ICovXHJcbmltcG9ydCBIZFJlYWN0IGZyb20gXCJoZC1yZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSBcIkBTdG9yZVwiO1xyXG5cclxuY29uc3QgUmVkdXhEZW1vID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNvdW50ID0gdXNlU2VsZWN0b3Ioc3RhdGUgPT4gc3RhdGUuY291bnQpO1xyXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxoMz5SZWR1eCBDb3VudGVyOiB7Y291bnR9PC9oMz5cclxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaCh7IHR5cGU6ICdJTkNSRU1FTlQnIH0pfT5cclxuICAgICAgICBJbmNyZW1lbnRcclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gZGlzcGF0Y2goeyB0eXBlOiAnREVDUkVNRU5UJyB9KX0+XHJcbiAgICAgICAgRGVjcmVtZW50XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtgOyIsIi8qKiBAanN4IEhkUmVhY3QuY3JlYXRlRWxlbWVudCAqL1xyXG5pbXBvcnQgSGRSZWFjdCBmcm9tIFwiaGQtcmVhY3RcIjtcclxuXHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gXCJAU3RvcmVcIjtcclxuXHJcbmltcG9ydCB7IGhvb2tzU2FtcGxlQ29kZSwgcmVkdXhTYW1wbGVDb2RlIH0gZnJvbSBcIi4vRGVtby5Db25zdGFudFwiO1xyXG5pbXBvcnQgeyBjb2RlVHlwZSB9IGZyb20gXCIuL0RlbW8uVHlwZVwiO1xyXG5cclxuY29uc3QgRGVtbyA9ICgpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzIwcHgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogJzIwcHgnIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCAuLi5zdHlsZXMuc2VjdGlvbiB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8aDIgc3R5bGU9e3N0eWxlcy5zZWN0aW9uSGVhZGVyfT7wn46jIEhvb2tzPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8SG9va3NEZW1vIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgd2lkdGg6IDEsIGJvcmRlcjogXCIycHggc29saWQgIzIxOTZGM1wiIH19IC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIC4uLnN0eWxlcy5zZWN0aW9uIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMiBzdHlsZT17c3R5bGVzLnNlY3Rpb25IZWFkZXJ9PvCfk6YgUmVkdXg8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxSZWR1eERlbW8gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPENvZGVTaG93Y2FzZSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmNvbnN0IENvZGVTaG93Y2FzZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IFt2aXNpYmxlQ29kZSwgc2V0VmlzaWJsZUNvZGVdID0gSGRSZWFjdC51c2VTdGF0ZTxjb2RlVHlwZSB8IG51bGw+KG51bGwpO1xyXG5cclxuICAgIGNvbnN0IHRvZ2dsZUNvZGUgPSAodHlwZTogY29kZVR5cGUpID0+IHNldFZpc2libGVDb2RlKHYgPT4gdiA9PT0gdHlwZSA/IG51bGwgOiB0eXBlKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5zaG93Y2FzZX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiLCBtYXJnaW5Cb3R0b206IFwiMjBweFwiIH19PlxyXG4gICAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyAuLi5zdHlsZXMudGFiLCAuLi4odmlzaWJsZUNvZGUgPT09ICdob29rcycgPyBzdHlsZXMuYWN0aXZlVGFiIDoge30pIH19XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlQ29kZSgnaG9va3MnKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICDwn46jIEhvb2tzIENvZGVcclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uc3R5bGVzLnRhYiwgLi4uKHZpc2libGVDb2RlID09PSAncmVkdXgnID8gc3R5bGVzLmFjdGl2ZVRhYiA6IHt9KSB9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRvZ2dsZUNvZGUoJ3JlZHV4Jyl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAg8J+TpiBSZWR1eCBDb2RlXHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB7dmlzaWJsZUNvZGUgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmNvZGVDb250YWluZXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwcmUgc3R5bGU9e3N0eWxlcy5jb2RlVGV4dH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt2aXNpYmxlQ29kZSA9PT0gJ2hvb2tzJyA/IGhvb2tzU2FtcGxlQ29kZSA6IHJlZHV4U2FtcGxlQ29kZX1cclxuICAgICAgICAgICAgICAgICAgICA8L3ByZT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuY29kZUxhYmVsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Zpc2libGVDb2RlID09PSAnaG9va3MnID8gJ/CfjqMgSG9va3MgRXhhbXBsZScgOiAn8J+TpiBSZWR1eCBFeGFtcGxlJ31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmNvbnN0IEhvb2tzRGVtbyA9ICgpID0+IHtcclxuICAgIGNvbnN0IFtjb3VudCwgc2V0Q291bnRdID0gSGRSZWFjdC51c2VTdGF0ZSgwKTtcclxuICAgIGNvbnN0IFtjb2xvciwgc2V0Q29sb3JdID0gSGRSZWFjdC51c2VTdGF0ZShcIiNmZmZmZmZcIik7XHJcblxyXG4gICAgSGRSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gYENvdW50ZXI6ICR7Y291bnR9YDtcclxuICAgIH0sIFtjb3VudF0pO1xyXG5cclxuICAgIGNvbnN0IHRvZ2dsZUNvbG9yID0gKCkgPT4gc2V0Q29sb3IoYyA9PiAoYyA9PT0gXCIjZmZmZmZmXCIgPyBcIiMwMDk5ZmZcIiA6IFwiI2ZmZmZmZlwiKSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuY29udGFpbmVyfT5cclxuICAgICAgICAgICAgPGgzIHN0eWxlPXt7IC4uLnN0eWxlcy5jb3VudGVyLCBjb2xvciB9fT5cclxuICAgICAgICAgICAgICAgIENvdW50ZXI6IHtjb3VudH1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLmJ1dHRvbkdyb3VwfT5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IG9uQ2xpY2s9eygpID0+IHNldENvdW50KGMgPT4gYyArIDEpfT7irIbvuI88L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259IG9uQ2xpY2s9eygpID0+IHNldENvdW50KGMgPT4gYyAtIDEpfT7irIfvuI88L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMuYnV0dG9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yID09PSBcIiNmZmZmZmZcIiA/IFwiIzAwOTlmZlwiIDogXCIjZmZmZmZmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvciA9PT0gXCIjZmZmZmZmXCIgPyBcIiNmZmZcIiA6IFwiIzMzM1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVDb2xvcn1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICDwn46oXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuY29uc3QgUmVkdXhEZW1vID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY291bnQgPSB1c2VTZWxlY3RvcihzdGF0ZSA9PiBzdGF0ZS5jb3VudCk7XHJcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMuY29udGFpbmVyfT5cclxuICAgICAgICAgICAgPGgzIHN0eWxlPXtzdHlsZXMuY291bnRlcn0+Q291bnRlcjoge2NvdW50fTwvaDM+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5idXR0b25Hcm91cH0+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXtzdHlsZXMuYnV0dG9ufSBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaCh7IHR5cGU6IFwiSU5DUkVNRU5UXCIgfSl9PuKshu+4jzwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17c3R5bGVzLmJ1dHRvbn0gb25DbGljaz17KCkgPT4gZGlzcGF0Y2goeyB0eXBlOiBcIkRFQ1JFTUVOVFwiIH0pfT7irIfvuI88L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgY29udGFpbmVyOiB7XHJcbiAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxyXG4gICAgICAgIHBhZGRpbmc6IFwiMjVweFwiLFxyXG4gICAgICAgIGJvcmRlclJhZGl1czogXCIxMnB4XCIsXHJcbiAgICAgICAgbWFyZ2luOiBcIjIwcHggMFwiLFxyXG4gICAgfSxcclxuICAgIGNvdW50ZXI6IHtcclxuICAgICAgICBtYXJnaW46IFwiMjBweCAwXCIsXHJcbiAgICAgICAgZm9udFNpemU6IFwiMS44ZW1cIixcclxuICAgICAgICBmb250V2VpZ2h0OiBcIjYwMFwiLFxyXG4gICAgICAgIHRleHRTaGFkb3c6IFwiMXB4IDFweCAycHggcmdiYSgwLDAsMCwwLjIpXCJcclxuICAgIH0sXHJcbiAgICBidXR0b25Hcm91cDoge1xyXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxyXG4gICAgICAgIGdhcDogXCIxNXB4XCIsXHJcbiAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiXHJcbiAgICB9LFxyXG4gICAgYnV0dG9uOiB7XHJcbiAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxyXG4gICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXHJcbiAgICAgICAgcGFkZGluZzogXCIycHggNHB4XCIsXHJcbiAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcclxuICAgICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXHJcbiAgICAgICAgZm9udFdlaWdodDogXCI2MDBcIixcclxuICAgICAgICB0cmFuc2l0aW9uOiBcImFsbCAwLjNzIGVhc2VcIixcclxuICAgICAgICB0ZXh0VHJhbnNmb3JtOiBcInVwcGVyY2FzZVwiLFxyXG4gICAgICAgIGxldHRlclNwYWNpbmc6IFwiMC41cHhcIixcclxuICAgICAgICBib3hTaGFkb3c6IFwiMCAycHggNnB4IHJnYmEoMCwwLDAsMC4xNSlcIlxyXG4gICAgfSxcclxuICAgIHNlY3Rpb246IHtcclxuICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTJweFwiLFxyXG4gICAgICAgIHBhZGRpbmc6IFwiMzBweFwiXHJcbiAgICB9LFxyXG4gICAgc2VjdGlvbkhlYWRlcjoge1xyXG4gICAgICAgIG1hcmdpbkJvdHRvbTogXCIyMHB4XCIsXHJcbiAgICAgICAgZm9udFNpemU6IFwiMS44ZW1cIixcclxuICAgICAgICBmb250V2VpZ2h0OiBcIjYwMFwiLFxyXG4gICAgICAgIGNvbG9yOiBcIiMyMTk2RjNcIlxyXG4gICAgfSxcclxuICAgIHNob3djYXNlOiB7XHJcbiAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjE2cHhcIixcclxuICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxyXG4gICAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiXHJcbiAgICB9LFxyXG4gICAgdGFiOiB7XHJcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcclxuICAgICAgICBwYWRkaW5nOiBcIjEycHggMjRweFwiLFxyXG4gICAgICAgIG1hcmdpbjogXCIwIDEwcHhcIixcclxuICAgICAgICBib3JkZXJSYWRpdXM6IFwiOHB4XCIsXHJcbiAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcclxuICAgICAgICB0cmFuc2l0aW9uOiBcImFsbCAwLjNzIGVhc2VcIixcclxuICAgICAgICBjb2xvcjogXCIjMjE5NkYzXCJcclxuICAgIH0sXHJcbiAgICBhY3RpdmVUYWI6IHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiBcInJnYmEoMjU1LDI1NSwyNTUsMC4xKVwiLFxyXG4gICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpXCJcclxuICAgIH0sXHJcbiAgICBjb2RlQ29udGFpbmVyOiB7XHJcbiAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcclxuICAgICAgICBiYWNrZ3JvdW5kOiBcIiMxNjE2MTZcIixcclxuICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTJweFwiLFxyXG4gICAgICAgIHBhZGRpbmc6IFwiMjBweFwiLFxyXG4gICAgICAgIGFuaW1hdGlvbjogXCJmYWRlSW4gMC4zcyBlYXNlXCJcclxuICAgIH0sXHJcbiAgICBjb2RlVGV4dDoge1xyXG4gICAgICAgIG1hcmdpbjogMCxcclxuICAgICAgICBjb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgICAgZm9udFNpemU6IFwiMTRweFwiLFxyXG4gICAgICAgIGxpbmVIZWlnaHQ6IFwiMS42XCIsXHJcbiAgICAgICAgb3ZlcmZsb3dYOiBcImF1dG9cIixcclxuICAgICAgICBmb250RmFtaWx5OiBcIm1vbm9zcGFjZVwiXHJcbiAgICB9LFxyXG4gICAgY29kZUxhYmVsOiB7XHJcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcclxuICAgICAgICB0b3A6IFwiMTBweFwiLFxyXG4gICAgICAgIHJpZ2h0OiBcIjEwcHhcIixcclxuICAgICAgICBwYWRkaW5nOiBcIjRweCA4cHhcIixcclxuICAgICAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXHJcbiAgICAgICAgYmFja2dyb3VuZDogXCJyZ2JhKDI1NSwyNTUsMjU1LDAuMSlcIixcclxuICAgICAgICBjb2xvcjogXCIjZmZmXCIsXHJcbiAgICAgICAgZm9udFNpemU6IFwiMTJweFwiXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZW1vOyIsIi8qKiBAanN4IEhkUmVhY3QuY3JlYXRlRWxlbWVudCAqL1xyXG5pbXBvcnQgSGRSZWFjdCBmcm9tIFwiaGQtcmVhY3RcIjtcclxuaW1wb3J0IHsgVEhFTUUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuY29uc3QgSXNzdWVzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgW2V4cGFuZGVkSXNzdWUsIHNldEV4cGFuZGVkSXNzdWVdID0gSGRSZWFjdC51c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgICBjb25zdCBpc3N1ZXMgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgdGl0bGU6IFwiQnVnIDE6IHVzZUVmZmVjdCBDbGVhbnVwXCIsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSB1c2VFZmZlY3QgY2xlYW51cCBmdW5jdGlvbiBkb2VzIG5vdCBwcm9wZXJseSBmaXJlIHdoZW4gdGhlIGNvbXBvbmVudCB1bm1vdW50cy5cIixcclxuICAgICAgICAgICAgY29kZTogYHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkVmZmVjdCBydW5uaW5nXCIpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNsZWFudXAgc2hvdWxkIHJ1biBvbiB1bm1vdW50XCIpO1xyXG4gICAgfTtcclxufSwgW10pO2AsXHJcbiAgICAgICAgICAgIHN0YXR1czogW1xyXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiBcIkNsZWFudXAgZnVuY3Rpb24gbm90IGV4ZWN1dGluZyBvbiB1bm1vdW50XCIsIHN1Y2Nlc3M6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6IFwiRWZmZWN0IHJ1bnMgb24gaW5pdGlhbCBtb3VudFwiLCBzdWNjZXNzOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6IFwiTWVtb3J5IGxlYWtzIHBvc3NpYmxlXCIsIHN1Y2Nlc3M6IGZhbHNlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMixcclxuICAgICAgICAgICAgdGl0bGU6IFwiQnVnIDI6IFVubmVjZXNzYXJ5IFJlLXJlbmRlcnNcIixcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW5jbHVkaW5nIHNldFN0YXRlIGluIHVzZUVmZmVjdCBkZXBlbmRlbmN5IGFycmF5IGNhdXNlcyB1bm5lY2Vzc2FyeSByZS1yZW5kZXJzLlwiLFxyXG4gICAgICAgICAgICBjb2RlOiBgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdDb21wb25lbnQgcmUtcmVuZGVyZWQnKTtcclxufSwgW3NldFN0YXRlXSk7IC8vIExvZ3Mgb24gZXZlcnkgc3RhdGUgdXBkYXRlYCxcclxuICAgICAgICAgICAgc3RhdHVzOiBbXHJcbiAgICAgICAgICAgICAgICB7IHRleHQ6IFwiVW5uZWNlc3NhcnkgZWZmZWN0IGV4ZWN1dGlvbnNcIiwgc3VjY2VzczogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHsgdGV4dDogXCJQZXJmb3JtYW5jZSBpbXBhY3RcIiwgc3VjY2VzczogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgIHsgdGV4dDogXCJQb3RlbnRpYWwgc2lkZSBlZmZlY3RzXCIsIHN1Y2Nlc3M6IGZhbHNlIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6IFwiMjBweFwiLCBib3JkZXJSYWRpdXM6IFwiMTVweFwiLCBib3hTaGFkb3c6IFwiMCA4cHggMzJweCByZ2JhKDAsIDAsIDAsIDAuMylcIiB9fT5cclxuICAgICAgICAgICAgPGgxIHN0eWxlPXt7IGNvbG9yOiBUSEVNRS5wcmltYXJ5LCBmb250U2l6ZTogXCIzZW1cIiwgZm9udFdlaWdodDogXCI4MDBcIiwgbGV0dGVyU3BhY2luZzogXCItMXB4XCIsIG1hcmdpbkJvdHRvbTogXCIyMHB4XCIsIHRleHRTaGFkb3c6IFwiMnB4IDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjMpXCIgfX0+S25vd24gSXNzdWVzPC9oMT5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsIGdhcDogXCIxNXB4XCIgfX0+XHJcbiAgICAgICAgICAgICAgICB7aXNzdWVzLm1hcCgoaXNzdWUpID0+IChcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXNzdWUuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcInJnYmEoMzAsIDMwLCAzMCwgMC42KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjIwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZHJvcEZpbHRlcjogXCJibHVyKDEwcHgpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IFwiYWxsIDAuM3MgZWFzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRFeHBhbmRlZElzc3VlKHByZXYgPT4gcHJldiA9PT0gaXNzdWUuaWQgPyBudWxsIDogaXNzdWUuaWQpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjIwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGV4cGFuZGVkSXNzdWUgPT09IGlzc3VlLmlkID8gXCJyZ2JhKDI1NSwgMTU5LCA2NywgMC4xKVwiIDogXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogZXhwYW5kZWRJc3N1ZSA9PT0gaXNzdWUuaWQgPyBcIjFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSlcIiA6IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDIgc3R5bGU9e3sgY29sb3I6IFRIRU1FLnByaW1hcnksIG1hcmdpbjogMCwgZm9udFNpemU6IFwiMmVtXCIgfX0+e2lzc3VlLnRpdGxlfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBjb2xvcjogVEhFTUUucHJpbWFyeSwgZm9udFNpemU6IFwiMS41ZW1cIiwgdHJhbnNmb3JtOiBgcm90YXRlKCR7ZXhwYW5kZWRJc3N1ZSA9PT0gaXNzdWUuaWQgPyAnMTgwZGVnJyA6ICcwZGVnJ30pYCwgdHJhbnNpdGlvbjogXCJ0cmFuc2Zvcm0gMC4zcyBlYXNlXCIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pa8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2V4cGFuZGVkSXNzdWUgPT09IGlzc3VlLmlkICYmIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogXCIzMHB4XCIsIGJhY2tncm91bmQ6IFwicmdiYSg0MCwgNDAsIDQwLCAwLjYpXCIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3sgZm9udFNpemU6IFwiMS4zZW1cIiwgbGluZUhlaWdodDogXCIxLjZcIiwgY29sb3I6IFwiIzg4OFwiLCBmb250V2VpZ2h0OiBcIjMwMFwiIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNzdWUuZGVzY3JpcHRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogXCIzMHB4XCIgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBzdHlsZT17eyBjb2xvcjogVEhFTUUucHJpbWFyeSwgZm9udFNpemU6IFwiMS44ZW1cIiwgbWFyZ2luQm90dG9tOiBcIjIwcHhcIiwgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIGdhcDogXCIxMHB4XCIgfX0+RXhhbXBsZTo8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cHJlIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBcInJnYmEoNTAsIDUwLCA1MCwgMC41KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCIxNXB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc3N1ZS5jb2RlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3ByZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMzBweFwiIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgc3R5bGU9e3sgY29sb3I6IFRIRU1FLnByaW1hcnksIGZvbnRTaXplOiBcIjEuOGVtXCIsIG1hcmdpbkJvdHRvbTogXCIyMHB4XCIgfX0+Q3VycmVudCBTdGF0dXM6PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIHN0eWxlPXt7IGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLCBnYXA6IFwiMTVweFwiLCBmb250U2l6ZTogXCIxLjFlbVwiIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzc3VlLnN0YXR1cy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGtleT17aW5kZXh9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IFwicmdiYSg1MCwgNTAsIDUwLCAwLjUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTVweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjEwcHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBcImZhZGVJbiAwLjVzIGZvcndhcmRzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkRlbGF5OiBgJHtpbmRleCAqIDAuMX1zYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2FhYVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogaXRlbS5zdWNjZXNzID8gXCIjMDBiODk0XCIgOiBcIiNmZjZiNmJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjEuMmVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5zdWNjZXNzID8gXCLinIVcIiA6IFwi4p2MXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0udGV4dH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxzdHlsZT5cclxuICAgICAgICAgICAgICAgIHtgXHJcbiAgICAgICAgICAgICAgICAgICAgQGtleWZyYW1lcyBmYWRlSW4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwcHgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYH1cclxuICAgICAgICAgICAgPC9zdHlsZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJc3N1ZXM7IiwiLyoqIEBqc3ggSGRSZWFjdC5jcmVhdGVFbGVtZW50ICovXHJcbmltcG9ydCBIZFJlYWN0IGZyb20gXCJoZC1yZWFjdFwiO1xyXG5cclxuaW1wb3J0IHsgVEhFTUUgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuY29uc3QgV2VsY29tZSA9ICgpID0+IChcclxuICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogXCIyMHB4XCIsIGJvcmRlclJhZGl1czogXCIxNXB4XCIsIGJveFNoYWRvdzogXCIwIDhweCAzMnB4IHJnYmEoMCwgMCwgMCwgMC4zKVwiIH19PlxyXG4gICAgICAgIDxoMSBzdHlsZT17eyBjb2xvcjogVEhFTUUucHJpbWFyeSwgZm9udFNpemU6IFwiM2VtXCIsIGZvbnRXZWlnaHQ6IFwiODAwXCIsIGxldHRlclNwYWNpbmc6IFwiLTFweFwiLCBtYXJnaW5Cb3R0b206IFwiMjBweFwiLCB0ZXh0U2hhZG93OiBcIjJweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4zKVwiIH19PldlbGNvbWUgdG8gSGRSZWFjdCE8L2gxPlxyXG4gICAgICAgIDxwIHN0eWxlPXt7IGZvbnRTaXplOiBcIjEuM2VtXCIsIGxpbmVIZWlnaHQ6IFwiMS42XCIsIGNvbG9yOiBcIiM4ODhcIiwgZm9udFdlaWdodDogXCIzMDBcIiB9fT5cclxuICAgICAgICAgICAgTGVhcm4gaG93IHRvIGJ1aWxkIHlvdXIgb3duIFJlYWN0LWxpa2UgbGlicmFyeSBmcm9tIHNjcmF0Y2ggdXNpbmcgbW9kZXJuIEphdmFTY3JpcHQgYW5kIGZ1bmN0aW9uYWwgcHJvZ3JhbW1pbmcgY29uY2VwdHMuXHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogXCJyZ2JhKDMwLCAzMCwgMzAsIDAuNilcIiwgcGFkZGluZzogXCIzMHB4XCIsIGJvcmRlclJhZGl1czogXCIyMHB4XCIsIG1hcmdpbjogXCIzMHB4IDBcIiwgYmFja2Ryb3BGaWx0ZXI6IFwiYmx1cigxMHB4KVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKVwiIH19PlxyXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3sgY29sb3I6IFRIRU1FLnByaW1hcnksIGZvbnRTaXplOiBcIjJlbVwiLCBtYXJnaW5Cb3R0b206IFwiMjBweFwiLCBib3JkZXJCb3R0b206IFwiMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKVwiLCBwYWRkaW5nQm90dG9tOiBcIjEwcHhcIiwgZm9udFdlaWdodDogXCI2MDBcIiB9fT5LZXkgRmVhdHVyZXM8L2gzPlxyXG4gICAgICAgICAgICA8dWwgc3R5bGU9e3sgZGlzcGxheTogXCJncmlkXCIsIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IFwiMWZyIDFmclwiLCBnYXA6IFwiMjBweFwiLCBmb250U2l6ZTogXCIxLjJlbVwiLCBjb2xvcjogXCIjZmZmXCIgfX0+XHJcbiAgICAgICAgICAgICAgICA8bGkgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIGdhcDogXCIxMHB4XCIsIGJhY2tncm91bmQ6IFwicmdiYSg1MCwgNTAsIDUwLCAwLjUpXCIsIHBhZGRpbmc6IFwiMTVweFwiLCBib3JkZXJSYWRpdXM6IFwiMTBweFwiIH19PuKaoSBGaWJlci1iYXNlZCByZWNvbmNpbGlhdGlvbjwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIGdhcDogXCIxMHB4XCIsIGJhY2tncm91bmQ6IFwicmdiYSg1MCwgNTAsIDUwLCAwLjUpXCIsIHBhZGRpbmc6IFwiMTVweFwiLCBib3JkZXJSYWRpdXM6IFwiMTBweFwiIH19PvCfjqMgQ29tcGxldGUgaG9va3Mgc3lzdGVtPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjEwcHhcIiwgYmFja2dyb3VuZDogXCJyZ2JhKDUwLCA1MCwgNTAsIDAuNSlcIiwgcGFkZGluZzogXCIxNXB4XCIsIGJvcmRlclJhZGl1czogXCIxMHB4XCIgfX0+8J+OqCBJbmxpbmUgQ1NTIHN0eWxpbmc8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIHN0eWxlPXt7IGRpc3BsYXk6IFwiZmxleFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBnYXA6IFwiMTBweFwiLCBiYWNrZ3JvdW5kOiBcInJnYmEoNTAsIDUwLCA1MCwgMC41KVwiLCBwYWRkaW5nOiBcIjE1cHhcIiwgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIiB9fT7wn5SlIEludGVyYWN0aXZlIEpTWCBzeW50YXg8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogXCJyZ2JhKDQwLCA0MCwgNDAsIDAuNilcIiwgcGFkZGluZzogXCIzMHB4XCIsIGJvcmRlclJhZGl1czogXCIyMHB4XCIsIG1hcmdpbjogXCIzMHB4IDBcIiwgYmFja2Ryb3BGaWx0ZXI6IFwiYmx1cigxMHB4KVwiLCBib3JkZXI6IFwiMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKVwiLCBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLCBvdmVyZmxvdzogXCJoaWRkZW5cIiB9fT5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB0b3A6IDAsIHJpZ2h0OiAwLCB3aWR0aDogXCIxNTBweFwiLCBoZWlnaHQ6IFwiMTUwcHhcIiB9fT48L2Rpdj5cclxuICAgICAgICAgICAgPGgzIHN0eWxlPXt7IGNvbG9yOiBUSEVNRS5wcmltYXJ5LCBmb250U2l6ZTogXCIxLjhlbVwiLCBtYXJnaW5Cb3R0b206IFwiMjBweFwiLCBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjEwcHhcIiB9fT7wn5OmIFJlZHV4IEludGVncmF0aW9uPC9oMz5cclxuICAgICAgICAgICAgPHAgc3R5bGU9e3sgY29sb3I6IFwiI2FhYVwiLCBtYXJnaW5Cb3R0b206IFwiMjBweFwiLCBsaW5lSGVpZ2h0OiBcIjEuNlwiLCBmb250U2l6ZTogXCIxLjFlbVwiIH19PlxyXG4gICAgICAgICAgICAgICAgTm93IHdpdGggZnVsbCBSZWR1eCBzdXBwb3J0ISBCdWlsZCBzY2FsYWJsZSBzdGF0ZSBtYW5hZ2VtZW50IHdpdGggb3VyIGN1c3RvbSBpbXBsZW1lbnRhdGlvbiBvZjpcclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8dWwgc3R5bGU9e3sgY29sb3I6IFwiI2FhYVwiLCBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgZ2FwOiBcIjE1cHhcIiwgZm9udFNpemU6IFwiMS4xZW1cIiB9fT5cclxuICAgICAgICAgICAgICAgIDxsaSBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjEwcHhcIiwgYmFja2dyb3VuZDogXCJyZ2JhKDUwLCA1MCwgNTAsIDAuNSlcIiwgcGFkZGluZzogXCIxNXB4XCIsIGJvcmRlclJhZGl1czogXCIxMHB4XCIgfX0+8J+TpiBDdXN0b20gUmVkdXggc3RvcmUgaW1wbGVtZW50YXRpb248L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIHN0eWxlPXt7IGRpc3BsYXk6IFwiZmxleFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBnYXA6IFwiMTBweFwiLCBiYWNrZ3JvdW5kOiBcInJnYmEoNTAsIDUwLCA1MCwgMC41KVwiLCBwYWRkaW5nOiBcIjE1cHhcIiwgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIiB9fT7wn5SMIFJlYWN0LVJlZHV4IGJpbmRpbmdzPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjEwcHhcIiwgYmFja2dyb3VuZDogXCJyZ2JhKDUwLCA1MCwgNTAsIDAuNSlcIiwgcGFkZGluZzogXCIxNXB4XCIsIGJvcmRlclJhZGl1czogXCIxMHB4XCIgfX0+8J+agCBPcHRpbWl6ZWQgc3RhdGUgdXBkYXRlczwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlbGNvbWU7IiwiLyoqIEBqc3ggSGRSZWFjdC5jcmVhdGVFbGVtZW50ICovXHJcbmltcG9ydCBIZFJlYWN0IGZyb20gXCJoZC1yZWFjdFwiO1xyXG5cclxuaW1wb3J0IERlbW8gZnJvbSBcIi4vRGVtb1wiO1xyXG5pbXBvcnQgV2VsY29tZSBmcm9tIFwiLi9XZWxjb21lLkNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBUSEVNRSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCBJc3N1ZXMgZnJvbSBcIi4vSXNzdWVzLkNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlY3Rpb25zID0gW1xyXG4gICAgeyBpZDogXCJ3ZWxjb21lXCIsIHRpdGxlOiBcIvCfmoAgV2VsY29tZSB0byBIZFJlYWN0XCIsIGNvbXBvbmVudDogPFdlbGNvbWUgLz4gfSxcclxuICAgIHsgaWQ6IFwiZGVtb1wiLCB0aXRsZTogXCLwn46JIERlbW9cIiwgY29tcG9uZW50OiA8RGVtbyAvPiB9LFxyXG4gICAgeyBpZDogXCJpc3N1ZXNcIiwgdGl0bGU6IFwi8J+QmyBLbm93biBJc3N1ZXNcIiwgY29tcG9uZW50OiA8SXNzdWVzIC8+IH0sXHJcbl07XHJcblxyXG5jb25zdCBTZWN0aW9ucyA9ICgpID0+IHtcclxuICAgIGNvbnN0IFthY3RpdmVTZWN0aW9uSW5kZXgsIHNldEFjdGl2ZVNlY3Rpb25JbmRleF0gPSBIZFJlYWN0LnVzZVN0YXRlPG51bWJlcj4oMCk7XHJcblxyXG4gICAgSGRSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gYEhkUmVhY3QgRG9jcyAtICR7c2VjdGlvbnNbYWN0aXZlU2VjdGlvbkluZGV4XS50aXRsZX1gO1xyXG4gICAgfSwgW2FjdGl2ZVNlY3Rpb25JbmRleF0pO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgaGVpZ2h0OiBcIjk3Ljh2aFwiLCBiYWNrZ3JvdW5kQ29sb3I6IFRIRU1FLmJnLCBjb2xvcjogVEhFTUUudGV4dCwgZm9udEZhbWlseTogXCInU2Vnb2UgVUknLCBzYW5zLXNlcmlmXCIsIGJvcmRlclJhZGl1czogXCI4cHhcIiwgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiBcIjMwMHB4XCIsIHBhZGRpbmc6IFwiMjBweFwiLCBib3JkZXJSaWdodDogYDJweCBzb2xpZCAke1RIRU1FLnByaW1hcnl9YCB9fT5cclxuICAgICAgICAgICAgICAgIDxoMiBzdHlsZT17eyBjb2xvcjogVEhFTUUucHJpbWFyeSB9fT7wn5OaIEhkUmVhY3QgRG9jczwvaDI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL0hkY2hhbWNoYW0xNi9IZFJlYWN0XCIgdGFyZ2V0PVwiX2JsYW5rXCIgc3R5bGU9e3sgdGV4dERlY29yYXRpb246IFwibm9uZVwiIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IFwiMTJweFwiLCBjb2xvcjogVEhFTUUudGV4dCwgbWFyZ2luQm90dG9tOiBcIjIwcHhcIiwgb3BhY2l0eTogMC43LCBjdXJzb3I6IFwicG9pbnRlclwiLCB0cmFuc2l0aW9uOiBcImFsbCAwLjNzIGVhc2VcIiwgXCI6aG92ZXJcIjogeyBvcGFjaXR5OiAxLCB0cmFuc2Zvcm06IFwic2NhbGUoMS4wNSlcIiB9IH19PkJ1aWx0IHdpdGggSGRSZWFjdCAtIDIwMjUgfCBHaXRIdWI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIHtzZWN0aW9ucy5tYXAoKHNlY3Rpb24sIGluZGV4KSA9PiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3NlY3Rpb24uaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVNlY3Rpb25JbmRleChpbmRleCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjE1cHhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogXCIxMHB4IDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYWN0aXZlU2VjdGlvbkluZGV4ID09PSBpbmRleCA/IGAke1RIRU1FLnByaW1hcnl9NDBgIDogXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBgMnB4IHNvbGlkICR7VEhFTUUucHJpbWFyeX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjhweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFRIRU1FLnRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJhbGwgMC4zc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEFsaWduOiBcImxlZnRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzZWN0aW9uLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIG92ZXJmbG93WTogXCJhdXRvXCIsIHBhZGRpbmc6IFwiMjBweFwiIH19PlxyXG4gICAgICAgICAgICAgICAge3NlY3Rpb25zW2FjdGl2ZVNlY3Rpb25JbmRleF0uY29tcG9uZW50fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWN0aW9uczsiLCJleHBvcnQgY29uc3QgVEhFTUUgPSB7XHJcbiAgICBiZzogXCIjMTExXCIsXHJcbiAgICB0ZXh0OiBcIiNmZmZmZmZcIixcclxuICAgIHByaW1hcnk6IFwiIzAwZmY4OFwiLFxyXG4gICAgc2Vjb25kYXJ5OiBcIiNmZjAwZmZcIixcclxufSIsImltcG9ydCBEb2NzIGZyb20gXCIuL1NlY3Rpb25zXCI7XHJcblxyXG5leHBvcnQgIGRlZmF1bHQgRG9jczsiLCJpbXBvcnQgSGRSZWFjdFJlZHV4LCB7IHVzZURpc3BhdGNoIH0gZnJvbSAnaGQtcmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBBY3Rpb24sIGNyZWF0ZVN0b3JlLCBUaHVuayB9IGZyb20gJ2hkLXJlZHV4JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGUge1xyXG4gICAgY291bnQ6IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHtcclxuICAgIGNvdW50OiAxMCxcclxufTtcclxuXHJcbmNvbnN0IHJlZHVjZXIgPSAoc3RhdGU6IFN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24/OiBBY3Rpb24pOiBTdGF0ZSA9PiB7XHJcbiAgICBpZiAoIWFjdGlvbikgcmV0dXJuIHN0YXRlO1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdJTkNSRU1FTlQnOlxyXG4gICAgICAgICAgICByZXR1cm4geyBjb3VudDogc3RhdGUuY291bnQgKyAxIH07XHJcbiAgICAgICAgY2FzZSAnREVDUkVNRU5UJzpcclxuICAgICAgICAgICAgcmV0dXJuIHsgY291bnQ6IHN0YXRlLmNvdW50IC0gMSB9O1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGluY3JlbWVudEFzeW5jID0gKCk6IFRodW5rPFN0YXRlPiA9PiB7XHJcbiAgICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdJTkNSRU1FTlQnIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnZXRTdGF0ZSgpKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlPFN0YXRlPihyZWR1Y2VyKTtcclxuXHJcbmZ1bmN0aW9uIHVzZVNlbGVjdG9yPFQ+KHNlbGVjdG9yOiAoc3RhdGU6IFN0YXRlKSA9PiBUKTogVCB7XHJcbiAgICByZXR1cm4gSGRSZWFjdFJlZHV4LnVzZVNlbGVjdG9yPFN0YXRlLCBUPihzZWxlY3Rvcik7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JlO1xyXG5cclxuZXhwb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH07XHJcbiIsIi8qKiBAanN4IEhkUmVhY3QuY3JlYXRlRWxlbWVudCAqL1xyXG5pbXBvcnQgSGRSZWFjdCBmcm9tIFwiaGQtcmVhY3RcIjtcclxuXHJcbmltcG9ydCBEb2NzIGZyb20gXCIuL0RvY3NcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPERvY3MgLz5cclxuICApO1xyXG59O1xyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkge1xyXG4vLyAgIGNvbnN0IFtjb3VudCwgc2V0Q291bnRdID0gSGRSZWFjdC51c2VTdGF0ZSgwKTtcclxuXHJcbi8vICAgSGRSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4vLyAgICAgY29uc29sZS5sb2coJ0VmZmVjdCByYW4hJyk7XHJcbi8vICAgfSwgW10pO1xyXG5cclxuLy8gICByZXR1cm4gKFxyXG4vLyAgICAgPGRpdj5cclxuLy8gICAgICAgPHA+Q291bnQ6IHtjb3VudH08L3A+XHJcbi8vICAgICAgIDxNZXNzYWdlIC8+XHJcbi8vICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0Q291bnQoY291bnQgKyAxKX0+SW5jcmVtZW50PC9idXR0b24+XHJcbi8vICAgICA8L2Rpdj5cclxuLy8gICApO1xyXG4vLyB9O1xyXG5cclxuY29uc3QgTWVzc2FnZSA9ICgpID0+IHtcclxuICByZXR1cm4gPHA+UG93ZXIgYnkgaGQtcmVhY3Q8L3A+O1xyXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqIEBqc3ggSGRSZWFjdC5jcmVhdGVFbGVtZW50ICovXHJcbmltcG9ydCBIZFJlYWN0IGZyb20gXCJoZC1yZWFjdFwiO1xyXG5pbXBvcnQgeyByZW5kZXJXaXRoUmVkdXggfSBmcm9tIFwiaGQtcmVhY3QtcmVkdXhcIjtcclxuXHJcbmltcG9ydCBzdG9yZSwgeyBTdGF0ZSB9IGZyb20gXCJAU3RvcmVcIjtcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9zcmNcIjtcclxuXHJcbmNvbnN0IHJlbmRlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSB8fCBkb2N1bWVudC5ib2R5O1xyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICByZW5kZXJXaXRoUmVkdXg8U3RhdGU+KDxBcHAgLz4sIGNvbnRhaW5lciwgc3RvcmUpO1xyXG59O1xyXG5cclxucmVuZGVyKCk7Il0sIm5hbWVzIjpbIkhkUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImN1cnJlbnRTdG9yZSIsInJlbmRlcldpdGhSZWR1eCIsImVsZW1lbnQiLCJjb250YWluZXIiLCJzdG9yZSIsImNvbnNvbGUiLCJsb2ciLCJyZW5kZXIiLCJ1c2VEaXNwYXRjaCIsIkVycm9yIiwiZGlzcGF0Y2giLCJ1c2VTZWxlY3RvciIsInNlbGVjdG9yIiwiZXF1YWxpdHlGbiIsIl91c2VTdGF0ZSIsImdldFN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5Iiwic2VsZWN0ZWRTdGF0ZSIsInNldFNlbGVjdGVkU3RhdGUiLCJjaGVja0ZvclVwZGF0ZXMiLCJuZXdTZWxlY3RlZFN0YXRlIiwiY3VycmVudCIsInVuc3Vic2NyaWJlIiwic3Vic2NyaWJlIiwiSGRSZWFjdFJlZHV4IiwiY3JlYXRlRWxlbWVudCIsInVwZGF0ZURvbSIsIndpcFJvb3QiLCJjdXJyZW50Um9vdCIsIm5leHRVbml0T2ZXb3JrIiwiZGVsZXRpb25zIiwid2lwRmliZXIiLCJob29rSW5kZXgiLCJjcmVhdGVEb20iLCJmaWJlciIsImRvbSIsInR5cGUiLCJkb2N1bWVudCIsImNyZWF0ZVRleHROb2RlIiwicHJvcHMiLCJjaGlsZHJlbiIsInBhcmVudCIsInVuZGVmaW5lZCIsImNoaWxkIiwic2libGluZyIsImFsdGVybmF0ZSIsIndvcmtMb29wIiwiZGVhZGxpbmUiLCJzaG91bGRZaWVsZCIsInBlcmZvcm1Vbml0T2ZXb3JrIiwidGltZVJlbWFpbmluZyIsImNvbW1pdFJvb3QiLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwiaXNGdW5jdGlvbkNvbXBvbmVudCIsInVwZGF0ZUZ1bmN0aW9uQ29tcG9uZW50IiwidXBkYXRlSG9zdENvbXBvbmVudCIsIm5leHRGaWJlciIsImhvb2tzIiwicmVjb25jaWxlQ2hpbGRyZW4iLCJpbml0aWFsIiwiX3dpcEZpYmVyIiwib2xkSG9vayIsImhvb2siLCJzdGF0ZSIsInF1ZXVlIiwiYWN0aW9ucyIsImZvckVhY2giLCJhY3Rpb24iLCJzZXRTdGF0ZSIsInB1c2giLCJjYWxsYmFjayIsImRlcHMiLCJfd2lwRmliZXIyIiwiY2xlYW51cCIsInByb2Nlc3NFZmZlY3RzIiwiX2N1cnJlbnRSb290IiwiX2xvb3AiLCJfZmliZXIkYWx0ZXJuYXRlIiwiaSIsIm9sZERlcHMiLCJuZXdEZXBzIiwiaGFzQ2hhbmdlZERlcHMiLCJsZW5ndGgiLCJzb21lIiwiZGVwIiwiaWR4IiwidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJfd2lwRmliZXIzIiwiaGFzQ2hhbmdlZCIsInVzZU1lbW8iLCJmYWN0b3J5IiwiX3dpcEZpYmVyNCIsInZhbHVlIiwiZWxlbWVudHMiLCJfd2lwRmliZXIkYWx0ZXJuYXRlIiwiaW5kZXgiLCJvbGRGaWJlciIsInByZXZTaWJsaW5nIiwibmV3RmliZXIiLCJzYW1lVHlwZSIsImVmZmVjdFRhZyIsIl93aXBSb290IiwiY29tbWl0V29yayIsImRvbVBhcmVudEZpYmVyIiwiX2RvbVBhcmVudEZpYmVyIiwiX2RvbVBhcmVudEZpYmVyMiIsImRvbVBhcmVudCIsImFwcGVuZENoaWxkIiwiX2ZpYmVyJGFsdGVybmF0ZTIiLCJjb21taXREZWxldGlvbiIsImNvbnRhaW5zIiwicmVtb3ZlQ2hpbGQiLCJ3YXJuIiwiX2xlbiIsImFyZ3VtZW50cyIsIkFycmF5IiwiX2tleSIsIl9vYmplY3RTcHJlYWQiLCJmbGF0IiwibWFwIiwiX3R5cGVvZiIsImNyZWF0ZVRleHRFbGVtZW50IiwidGV4dCIsIm5vZGVWYWx1ZSIsInByZXZQcm9wcyIsIm5leHRQcm9wcyIsImlzU3R5bGUiLCJrZXkiLCJpc1Byb3BlcnR5IiwiaXNFdmVudCIsInByZXZTdHlsZSIsInN0eWxlIiwibmV4dFN0eWxlIiwiT2JqZWN0Iiwia2V5cyIsInN0eWxlTmFtZSIsImZpbHRlciIsIm5hbWUiLCJldmVudFR5cGUiLCJ0b0xvd2VyQ2FzZSIsInN1YnN0cmluZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRzV2l0aCIsImNyZWF0ZVN0b3JlIiwicmVkdWNlciIsImxpc3RlbmVycyIsImxpc3RlbmVyIiwibCIsImhvb2tzU2FtcGxlQ29kZSIsInJlZHV4U2FtcGxlQ29kZSIsIkRlbW8iLCJkaXNwbGF5IiwiZ2FwIiwiZmxleERpcmVjdGlvbiIsImZsZXgiLCJzdHlsZXMiLCJzZWN0aW9uIiwic2VjdGlvbkhlYWRlciIsIkhvb2tzRGVtbyIsIndpZHRoIiwiYm9yZGVyIiwiUmVkdXhEZW1vIiwiQ29kZVNob3djYXNlIiwiX0hkUmVhY3QkdXNlU3RhdGUiLCJfSGRSZWFjdCR1c2VTdGF0ZTIiLCJ2aXNpYmxlQ29kZSIsInNldFZpc2libGVDb2RlIiwidG9nZ2xlQ29kZSIsInYiLCJzaG93Y2FzZSIsInRleHRBbGlnbiIsIm1hcmdpbkJvdHRvbSIsInRhYiIsImFjdGl2ZVRhYiIsIm9uQ2xpY2siLCJjb2RlQ29udGFpbmVyIiwiY29kZVRleHQiLCJjb2RlTGFiZWwiLCJfSGRSZWFjdCR1c2VTdGF0ZTMiLCJfSGRSZWFjdCR1c2VTdGF0ZTQiLCJjb3VudCIsInNldENvdW50IiwiX0hkUmVhY3QkdXNlU3RhdGU1IiwiX0hkUmVhY3QkdXNlU3RhdGU2IiwiY29sb3IiLCJzZXRDb2xvciIsInRpdGxlIiwiY29uY2F0IiwidG9nZ2xlQ29sb3IiLCJjIiwiY291bnRlciIsImJ1dHRvbkdyb3VwIiwiYnV0dG9uIiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImJvcmRlclJhZGl1cyIsIm1hcmdpbiIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsInRleHRTaGFkb3ciLCJqdXN0aWZ5Q29udGVudCIsImZsZXhXcmFwIiwiY3Vyc29yIiwidHJhbnNpdGlvbiIsInRleHRUcmFuc2Zvcm0iLCJsZXR0ZXJTcGFjaW5nIiwiYm94U2hhZG93IiwicG9zaXRpb24iLCJvdmVyZmxvdyIsImJhY2tncm91bmQiLCJhbmltYXRpb24iLCJsaW5lSGVpZ2h0Iiwib3ZlcmZsb3dYIiwiZm9udEZhbWlseSIsInRvcCIsInJpZ2h0IiwiVEhFTUUiLCJJc3N1ZXMiLCJleHBhbmRlZElzc3VlIiwic2V0RXhwYW5kZWRJc3N1ZSIsImlzc3VlcyIsImlkIiwiZGVzY3JpcHRpb24iLCJjb2RlIiwic3RhdHVzIiwic3VjY2VzcyIsInByaW1hcnkiLCJpc3N1ZSIsImJhY2tkcm9wRmlsdGVyIiwicHJldiIsImFsaWduSXRlbXMiLCJib3JkZXJCb3R0b20iLCJ0cmFuc2Zvcm0iLCJtYXJnaW5Ub3AiLCJpdGVtIiwib3BhY2l0eSIsImFuaW1hdGlvbkRlbGF5IiwiV2VsY29tZSIsInBhZGRpbmdCb3R0b20iLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwiaGVpZ2h0Iiwic2VjdGlvbnMiLCJjb21wb25lbnQiLCJTZWN0aW9ucyIsImFjdGl2ZVNlY3Rpb25JbmRleCIsInNldEFjdGl2ZVNlY3Rpb25JbmRleCIsImJnIiwiYm9yZGVyUmlnaHQiLCJocmVmIiwidGFyZ2V0IiwidGV4dERlY29yYXRpb24iLCJvdmVyZmxvd1kiLCJzZWNvbmRhcnkiLCJEb2NzIiwiaW5pdGlhbFN0YXRlIiwiaW5jcmVtZW50QXN5bmMiLCJzZXRUaW1lb3V0IiwiQXBwIiwiTWVzc2FnZSIsImdldEVsZW1lbnRCeUlkIiwiYm9keSIsImlubmVySFRNTCJdLCJzb3VyY2VSb290IjoiIn0=