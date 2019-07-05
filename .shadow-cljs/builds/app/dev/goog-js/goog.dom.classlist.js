["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/dom/classlist.js"],"~:js","goog.provide(\"goog.dom.classlist\");\ngoog.require(\"goog.array\");\n/** @define {boolean} */ goog.define(\"goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST\", false);\n/**\n @param {Element} element\n @return {!IArrayLike<?>}\n */\ngoog.dom.classlist.get = function(element) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    return element.classList;\n  }\n  var className = element.className;\n  return goog.isString(className) && className.match(/\\S+/g) || [];\n};\n/**\n @param {Element} element\n @param {string} className\n */\ngoog.dom.classlist.set = function(element, className) {\n  element.className = className;\n};\n/**\n @param {Element} element\n @param {string} className\n @return {boolean}\n */\ngoog.dom.classlist.contains = function(element, className) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    return element.classList.contains(className);\n  }\n  return goog.array.contains(goog.dom.classlist.get(element), className);\n};\n/**\n @param {Element} element\n @param {string} className\n */\ngoog.dom.classlist.add = function(element, className) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    element.classList.add(className);\n    return;\n  }\n  if (!goog.dom.classlist.contains(element, className)) {\n    element.className += element.className.length > 0 ? \" \" + className : className;\n  }\n};\n/**\n @param {Element} element\n @param {IArrayLike<string>} classesToAdd\n */\ngoog.dom.classlist.addAll = function(element, classesToAdd) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    goog.array.forEach(classesToAdd, function(className) {\n      goog.dom.classlist.add(element, className);\n    });\n    return;\n  }\n  var classMap = {};\n  goog.array.forEach(goog.dom.classlist.get(element), function(className) {\n    classMap[className] = true;\n  });\n  goog.array.forEach(classesToAdd, function(className) {\n    classMap[className] = true;\n  });\n  element.className = \"\";\n  for (var className in classMap) {\n    element.className += element.className.length > 0 ? \" \" + className : className;\n  }\n};\n/**\n @param {Element} element\n @param {string} className\n */\ngoog.dom.classlist.remove = function(element, className) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    element.classList.remove(className);\n    return;\n  }\n  if (goog.dom.classlist.contains(element, className)) {\n    element.className = goog.array.filter(goog.dom.classlist.get(element), function(c) {\n      return c != className;\n    }).join(\" \");\n  }\n};\n/**\n @param {Element} element\n @param {IArrayLike<string>} classesToRemove\n */\ngoog.dom.classlist.removeAll = function(element, classesToRemove) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    goog.array.forEach(classesToRemove, function(className) {\n      goog.dom.classlist.remove(element, className);\n    });\n    return;\n  }\n  element.className = goog.array.filter(goog.dom.classlist.get(element), function(className) {\n    return !goog.array.contains(classesToRemove, className);\n  }).join(\" \");\n};\n/**\n @param {Element} element\n @param {string} className\n @param {boolean} enabled\n */\ngoog.dom.classlist.enable = function(element, className, enabled) {\n  if (enabled) {\n    goog.dom.classlist.add(element, className);\n  } else {\n    goog.dom.classlist.remove(element, className);\n  }\n};\n/**\n @param {!Element} element\n @param {?IArrayLike<string>} classesToEnable\n @param {boolean} enabled\n */\ngoog.dom.classlist.enableAll = function(element, classesToEnable, enabled) {\n  var f = enabled ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll;\n  f(element, classesToEnable);\n};\n/**\n @param {Element} element\n @param {string} fromClass\n @param {string} toClass\n @return {boolean}\n */\ngoog.dom.classlist.swap = function(element, fromClass, toClass) {\n  if (goog.dom.classlist.contains(element, fromClass)) {\n    goog.dom.classlist.remove(element, fromClass);\n    goog.dom.classlist.add(element, toClass);\n    return true;\n  }\n  return false;\n};\n/**\n @param {Element} element\n @param {string} className\n @return {boolean}\n */\ngoog.dom.classlist.toggle = function(element, className) {\n  var add = !goog.dom.classlist.contains(element, className);\n  goog.dom.classlist.enable(element, className, add);\n  return add;\n};\n/**\n @param {Element} element\n @param {string} classToRemove\n @param {string} classToAdd\n */\ngoog.dom.classlist.addRemove = function(element, classToRemove, classToAdd) {\n  goog.dom.classlist.remove(element, classToRemove);\n  goog.dom.classlist.add(element, classToAdd);\n};\n","~:source","// Copyright 2012 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Utilities for detecting, adding and removing classes.  Prefer\n * this over goog.dom.classes for new code since it attempts to use classList\n * (DOMTokenList: http://dom.spec.whatwg.org/#domtokenlist) which is faster\n * and requires less code.\n *\n * Note: these utilities are meant to operate on HTMLElements\n * and may have unexpected behavior on elements with differing interfaces\n * (such as SVGElements).\n */\n\n\ngoog.provide('goog.dom.classlist');\n\ngoog.require('goog.array');\n\n\n/**\n * Override this define at build-time if you know your target supports it.\n * @define {boolean} Whether to use the classList property (DOMTokenList).\n */\ngoog.define('goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST', false);\n\n\n/**\n * Gets an array-like object of class names on an element.\n * @param {Element} element DOM node to get the classes of.\n * @return {!IArrayLike<?>} Class names on `element`.\n */\ngoog.dom.classlist.get = function(element) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    return element.classList;\n  }\n\n  var className = element.className;\n  // Some types of elements don't have a className in IE (e.g. iframes).\n  // Furthermore, in Firefox, className is not a string when the element is\n  // an SVG element.\n  return goog.isString(className) && className.match(/\\S+/g) || [];\n};\n\n\n/**\n * Sets the entire class name of an element.\n * @param {Element} element DOM node to set class of.\n * @param {string} className Class name(s) to apply to element.\n */\ngoog.dom.classlist.set = function(element, className) {\n  element.className = className;\n};\n\n\n/**\n * Returns true if an element has a class.  This method may throw a DOM\n * exception for an invalid or empty class name if DOMTokenList is used.\n * @param {Element} element DOM node to test.\n * @param {string} className Class name to test for.\n * @return {boolean} Whether element has the class.\n */\ngoog.dom.classlist.contains = function(element, className) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    return element.classList.contains(className);\n  }\n  return goog.array.contains(goog.dom.classlist.get(element), className);\n};\n\n\n/**\n * Adds a class to an element.  Does not add multiples of class names.  This\n * method may throw a DOM exception for an invalid or empty class name if\n * DOMTokenList is used.\n * @param {Element} element DOM node to add class to.\n * @param {string} className Class name to add.\n */\ngoog.dom.classlist.add = function(element, className) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    element.classList.add(className);\n    return;\n  }\n\n  if (!goog.dom.classlist.contains(element, className)) {\n    // Ensure we add a space if this is not the first class name added.\n    element.className +=\n        element.className.length > 0 ? (' ' + className) : className;\n  }\n};\n\n\n/**\n * Convenience method to add a number of class names at once.\n * @param {Element} element The element to which to add classes.\n * @param {IArrayLike<string>} classesToAdd An array-like object\n * containing a collection of class names to add to the element.\n * This method may throw a DOM exception if classesToAdd contains invalid\n * or empty class names.\n */\ngoog.dom.classlist.addAll = function(element, classesToAdd) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    goog.array.forEach(classesToAdd, function(className) {\n      goog.dom.classlist.add(element, className);\n    });\n    return;\n  }\n\n  var classMap = {};\n\n  // Get all current class names into a map.\n  goog.array.forEach(goog.dom.classlist.get(element), function(className) {\n    classMap[className] = true;\n  });\n\n  // Add new class names to the map.\n  goog.array.forEach(\n      classesToAdd, function(className) { classMap[className] = true; });\n\n  // Flatten the keys of the map into the className.\n  element.className = '';\n  for (var className in classMap) {\n    element.className +=\n        element.className.length > 0 ? (' ' + className) : className;\n  }\n};\n\n\n/**\n * Removes a class from an element.  This method may throw a DOM exception\n * for an invalid or empty class name if DOMTokenList is used.\n * @param {Element} element DOM node to remove class from.\n * @param {string} className Class name to remove.\n */\ngoog.dom.classlist.remove = function(element, className) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    element.classList.remove(className);\n    return;\n  }\n\n  if (goog.dom.classlist.contains(element, className)) {\n    // Filter out the class name.\n    element.className = goog.array\n                            .filter(\n                                goog.dom.classlist.get(element),\n                                function(c) { return c != className; })\n                            .join(' ');\n  }\n};\n\n\n/**\n * Removes a set of classes from an element.  Prefer this call to\n * repeatedly calling `goog.dom.classlist.remove` if you want to remove\n * a large set of class names at once.\n * @param {Element} element The element from which to remove classes.\n * @param {IArrayLike<string>} classesToRemove An array-like object\n * containing a collection of class names to remove from the element.\n * This method may throw a DOM exception if classesToRemove contains invalid\n * or empty class names.\n */\ngoog.dom.classlist.removeAll = function(element, classesToRemove) {\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\n    goog.array.forEach(classesToRemove, function(className) {\n      goog.dom.classlist.remove(element, className);\n    });\n    return;\n  }\n  // Filter out those classes in classesToRemove.\n  element.className =\n      goog.array\n          .filter(\n              goog.dom.classlist.get(element),\n              function(className) {\n                // If this class is not one we are trying to remove,\n                // add it to the array of new class names.\n                return !goog.array.contains(classesToRemove, className);\n              })\n          .join(' ');\n};\n\n\n/**\n * Adds or removes a class depending on the enabled argument.  This method\n * may throw a DOM exception for an invalid or empty class name if DOMTokenList\n * is used.\n * @param {Element} element DOM node to add or remove the class on.\n * @param {string} className Class name to add or remove.\n * @param {boolean} enabled Whether to add or remove the class (true adds,\n *     false removes).\n */\ngoog.dom.classlist.enable = function(element, className, enabled) {\n  if (enabled) {\n    goog.dom.classlist.add(element, className);\n  } else {\n    goog.dom.classlist.remove(element, className);\n  }\n};\n\n\n/**\n * Adds or removes a set of classes depending on the enabled argument.  This\n * method may throw a DOM exception for an invalid or empty class name if\n * DOMTokenList is used.\n * @param {!Element} element DOM node to add or remove the class on.\n * @param {?IArrayLike<string>} classesToEnable An array-like object\n *     containing a collection of class names to add or remove from the element.\n * @param {boolean} enabled Whether to add or remove the classes (true adds,\n *     false removes).\n */\ngoog.dom.classlist.enableAll = function(element, classesToEnable, enabled) {\n  var f = enabled ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll;\n  f(element, classesToEnable);\n};\n\n\n/**\n * Switches a class on an element from one to another without disturbing other\n * classes. If the fromClass isn't removed, the toClass won't be added.  This\n * method may throw a DOM exception if the class names are empty or invalid.\n * @param {Element} element DOM node to swap classes on.\n * @param {string} fromClass Class to remove.\n * @param {string} toClass Class to add.\n * @return {boolean} Whether classes were switched.\n */\ngoog.dom.classlist.swap = function(element, fromClass, toClass) {\n  if (goog.dom.classlist.contains(element, fromClass)) {\n    goog.dom.classlist.remove(element, fromClass);\n    goog.dom.classlist.add(element, toClass);\n    return true;\n  }\n  return false;\n};\n\n\n/**\n * Removes a class if an element has it, and adds it the element doesn't have\n * it.  Won't affect other classes on the node.  This method may throw a DOM\n * exception if the class name is empty or invalid.\n * @param {Element} element DOM node to toggle class on.\n * @param {string} className Class to toggle.\n * @return {boolean} True if class was added, false if it was removed\n *     (in other words, whether element has the class after this function has\n *     been called).\n */\ngoog.dom.classlist.toggle = function(element, className) {\n  var add = !goog.dom.classlist.contains(element, className);\n  goog.dom.classlist.enable(element, className, add);\n  return add;\n};\n\n\n/**\n * Adds and removes a class of an element.  Unlike\n * {@link goog.dom.classlist.swap}, this method adds the classToAdd regardless\n * of whether the classToRemove was present and had been removed.  This method\n * may throw a DOM exception if the class names are empty or invalid.\n *\n * @param {Element} element DOM node to swap classes on.\n * @param {string} classToRemove Class to remove.\n * @param {string} classToAdd Class to add.\n */\ngoog.dom.classlist.addRemove = function(element, classToRemove, classToAdd) {\n  goog.dom.classlist.remove(element, classToRemove);\n  goog.dom.classlist.add(element, classToAdd);\n};\n","~:compiled-at",1562072615709,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.dom.classlist.js\",\n\"lineCount\":153,\n\"mappings\":\"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\",\n\"sources\":[\"goog/dom/classlist.js\"],\n\"sourcesContent\":[\"// Copyright 2012 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Utilities for detecting, adding and removing classes.  Prefer\\n * this over goog.dom.classes for new code since it attempts to use classList\\n * (DOMTokenList: http://dom.spec.whatwg.org/#domtokenlist) which is faster\\n * and requires less code.\\n *\\n * Note: these utilities are meant to operate on HTMLElements\\n * and may have unexpected behavior on elements with differing interfaces\\n * (such as SVGElements).\\n */\\n\\n\\ngoog.provide('goog.dom.classlist');\\n\\ngoog.require('goog.array');\\n\\n\\n/**\\n * Override this define at build-time if you know your target supports it.\\n * @define {boolean} Whether to use the classList property (DOMTokenList).\\n */\\ngoog.define('goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST', false);\\n\\n\\n/**\\n * Gets an array-like object of class names on an element.\\n * @param {Element} element DOM node to get the classes of.\\n * @return {!IArrayLike<?>} Class names on `element`.\\n */\\ngoog.dom.classlist.get = function(element) {\\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\\n    return element.classList;\\n  }\\n\\n  var className = element.className;\\n  // Some types of elements don't have a className in IE (e.g. iframes).\\n  // Furthermore, in Firefox, className is not a string when the element is\\n  // an SVG element.\\n  return goog.isString(className) && className.match(/\\\\S+/g) || [];\\n};\\n\\n\\n/**\\n * Sets the entire class name of an element.\\n * @param {Element} element DOM node to set class of.\\n * @param {string} className Class name(s) to apply to element.\\n */\\ngoog.dom.classlist.set = function(element, className) {\\n  element.className = className;\\n};\\n\\n\\n/**\\n * Returns true if an element has a class.  This method may throw a DOM\\n * exception for an invalid or empty class name if DOMTokenList is used.\\n * @param {Element} element DOM node to test.\\n * @param {string} className Class name to test for.\\n * @return {boolean} Whether element has the class.\\n */\\ngoog.dom.classlist.contains = function(element, className) {\\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\\n    return element.classList.contains(className);\\n  }\\n  return goog.array.contains(goog.dom.classlist.get(element), className);\\n};\\n\\n\\n/**\\n * Adds a class to an element.  Does not add multiples of class names.  This\\n * method may throw a DOM exception for an invalid or empty class name if\\n * DOMTokenList is used.\\n * @param {Element} element DOM node to add class to.\\n * @param {string} className Class name to add.\\n */\\ngoog.dom.classlist.add = function(element, className) {\\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\\n    element.classList.add(className);\\n    return;\\n  }\\n\\n  if (!goog.dom.classlist.contains(element, className)) {\\n    // Ensure we add a space if this is not the first class name added.\\n    element.className +=\\n        element.className.length > 0 ? (' ' + className) : className;\\n  }\\n};\\n\\n\\n/**\\n * Convenience method to add a number of class names at once.\\n * @param {Element} element The element to which to add classes.\\n * @param {IArrayLike<string>} classesToAdd An array-like object\\n * containing a collection of class names to add to the element.\\n * This method may throw a DOM exception if classesToAdd contains invalid\\n * or empty class names.\\n */\\ngoog.dom.classlist.addAll = function(element, classesToAdd) {\\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\\n    goog.array.forEach(classesToAdd, function(className) {\\n      goog.dom.classlist.add(element, className);\\n    });\\n    return;\\n  }\\n\\n  var classMap = {};\\n\\n  // Get all current class names into a map.\\n  goog.array.forEach(goog.dom.classlist.get(element), function(className) {\\n    classMap[className] = true;\\n  });\\n\\n  // Add new class names to the map.\\n  goog.array.forEach(\\n      classesToAdd, function(className) { classMap[className] = true; });\\n\\n  // Flatten the keys of the map into the className.\\n  element.className = '';\\n  for (var className in classMap) {\\n    element.className +=\\n        element.className.length > 0 ? (' ' + className) : className;\\n  }\\n};\\n\\n\\n/**\\n * Removes a class from an element.  This method may throw a DOM exception\\n * for an invalid or empty class name if DOMTokenList is used.\\n * @param {Element} element DOM node to remove class from.\\n * @param {string} className Class name to remove.\\n */\\ngoog.dom.classlist.remove = function(element, className) {\\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\\n    element.classList.remove(className);\\n    return;\\n  }\\n\\n  if (goog.dom.classlist.contains(element, className)) {\\n    // Filter out the class name.\\n    element.className = goog.array\\n                            .filter(\\n                                goog.dom.classlist.get(element),\\n                                function(c) { return c != className; })\\n                            .join(' ');\\n  }\\n};\\n\\n\\n/**\\n * Removes a set of classes from an element.  Prefer this call to\\n * repeatedly calling `goog.dom.classlist.remove` if you want to remove\\n * a large set of class names at once.\\n * @param {Element} element The element from which to remove classes.\\n * @param {IArrayLike<string>} classesToRemove An array-like object\\n * containing a collection of class names to remove from the element.\\n * This method may throw a DOM exception if classesToRemove contains invalid\\n * or empty class names.\\n */\\ngoog.dom.classlist.removeAll = function(element, classesToRemove) {\\n  if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || element.classList) {\\n    goog.array.forEach(classesToRemove, function(className) {\\n      goog.dom.classlist.remove(element, className);\\n    });\\n    return;\\n  }\\n  // Filter out those classes in classesToRemove.\\n  element.className =\\n      goog.array\\n          .filter(\\n              goog.dom.classlist.get(element),\\n              function(className) {\\n                // If this class is not one we are trying to remove,\\n                // add it to the array of new class names.\\n                return !goog.array.contains(classesToRemove, className);\\n              })\\n          .join(' ');\\n};\\n\\n\\n/**\\n * Adds or removes a class depending on the enabled argument.  This method\\n * may throw a DOM exception for an invalid or empty class name if DOMTokenList\\n * is used.\\n * @param {Element} element DOM node to add or remove the class on.\\n * @param {string} className Class name to add or remove.\\n * @param {boolean} enabled Whether to add or remove the class (true adds,\\n *     false removes).\\n */\\ngoog.dom.classlist.enable = function(element, className, enabled) {\\n  if (enabled) {\\n    goog.dom.classlist.add(element, className);\\n  } else {\\n    goog.dom.classlist.remove(element, className);\\n  }\\n};\\n\\n\\n/**\\n * Adds or removes a set of classes depending on the enabled argument.  This\\n * method may throw a DOM exception for an invalid or empty class name if\\n * DOMTokenList is used.\\n * @param {!Element} element DOM node to add or remove the class on.\\n * @param {?IArrayLike<string>} classesToEnable An array-like object\\n *     containing a collection of class names to add or remove from the element.\\n * @param {boolean} enabled Whether to add or remove the classes (true adds,\\n *     false removes).\\n */\\ngoog.dom.classlist.enableAll = function(element, classesToEnable, enabled) {\\n  var f = enabled ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll;\\n  f(element, classesToEnable);\\n};\\n\\n\\n/**\\n * Switches a class on an element from one to another without disturbing other\\n * classes. If the fromClass isn't removed, the toClass won't be added.  This\\n * method may throw a DOM exception if the class names are empty or invalid.\\n * @param {Element} element DOM node to swap classes on.\\n * @param {string} fromClass Class to remove.\\n * @param {string} toClass Class to add.\\n * @return {boolean} Whether classes were switched.\\n */\\ngoog.dom.classlist.swap = function(element, fromClass, toClass) {\\n  if (goog.dom.classlist.contains(element, fromClass)) {\\n    goog.dom.classlist.remove(element, fromClass);\\n    goog.dom.classlist.add(element, toClass);\\n    return true;\\n  }\\n  return false;\\n};\\n\\n\\n/**\\n * Removes a class if an element has it, and adds it the element doesn't have\\n * it.  Won't affect other classes on the node.  This method may throw a DOM\\n * exception if the class name is empty or invalid.\\n * @param {Element} element DOM node to toggle class on.\\n * @param {string} className Class to toggle.\\n * @return {boolean} True if class was added, false if it was removed\\n *     (in other words, whether element has the class after this function has\\n *     been called).\\n */\\ngoog.dom.classlist.toggle = function(element, className) {\\n  var add = !goog.dom.classlist.contains(element, className);\\n  goog.dom.classlist.enable(element, className, add);\\n  return add;\\n};\\n\\n\\n/**\\n * Adds and removes a class of an element.  Unlike\\n * {@link goog.dom.classlist.swap}, this method adds the classToAdd regardless\\n * of whether the classToRemove was present and had been removed.  This method\\n * may throw a DOM exception if the class names are empty or invalid.\\n *\\n * @param {Element} element DOM node to swap classes on.\\n * @param {string} classToRemove Class to remove.\\n * @param {string} classToAdd Class to add.\\n */\\ngoog.dom.classlist.addRemove = function(element, classToRemove, classToAdd) {\\n  goog.dom.classlist.remove(element, classToRemove);\\n  goog.dom.classlist.add(element, classToAdd);\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"define\",\"dom\",\"classlist\",\"get\",\"goog.dom.classlist.get\",\"element\",\"ALWAYS_USE_DOM_TOKEN_LIST\",\"classList\",\"className\",\"isString\",\"match\",\"set\",\"goog.dom.classlist.set\",\"contains\",\"goog.dom.classlist.contains\",\"array\",\"add\",\"goog.dom.classlist.add\",\"length\",\"addAll\",\"goog.dom.classlist.addAll\",\"classesToAdd\",\"forEach\",\"classMap\",\"remove\",\"goog.dom.classlist.remove\",\"filter\",\"c\",\"join\",\"removeAll\",\"goog.dom.classlist.removeAll\",\"classesToRemove\",\"enable\",\"goog.dom.classlist.enable\",\"enabled\",\"enableAll\",\"goog.dom.classlist.enableAll\",\"classesToEnable\",\"f\",\"swap\",\"goog.dom.classlist.swap\",\"fromClass\",\"toClass\",\"toggle\",\"goog.dom.classlist.toggle\",\"addRemove\",\"goog.dom.classlist.addRemove\",\"classToRemove\",\"classToAdd\"]\n}\n"]