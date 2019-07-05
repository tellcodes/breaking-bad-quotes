["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/dom/browserfeature.js"],"~:js","goog.provide(\"goog.dom.BrowserFeature\");\ngoog.require(\"goog.userAgent\");\n/** @enum {boolean} */ goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher(\"1.9.1\"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(\"9\"), CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE || goog.userAgent.OPERA || \ngoog.userAgent.WEBKIT, INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE, LEGACY_IE_RANGES:goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)};\n","~:source","// Copyright 2010 The Closure Library Authors. All Rights Reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n//      http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS-IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n/**\n * @fileoverview Browser capability checks for the dom package.\n *\n */\n\n\ngoog.provide('goog.dom.BrowserFeature');\n\ngoog.require('goog.userAgent');\n\n\n/**\n * Enum of browser capabilities.\n * @enum {boolean}\n */\ngoog.dom.BrowserFeature = {\n  /**\n   * Whether attributes 'name' and 'type' can be added to an element after it's\n   * created. False in Internet Explorer prior to version 9.\n   */\n  CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:\n      !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),\n\n  /**\n   * Whether we can use element.children to access an element's Element\n   * children. Available since Gecko 1.9.1, IE 9. (IE<9 also includes comment\n   * nodes in the collection.)\n   */\n  CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE ||\n      goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) ||\n      goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher('1.9.1'),\n\n  /**\n   * Opera, Safari 3, and Internet Explorer 9 all support innerText but they\n   * include text nodes in script and style tags. Not document-mode-dependent.\n   */\n  CAN_USE_INNER_TEXT:\n      (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher('9')),\n\n  /**\n   * MSIE, Opera, and Safari>=4 support element.parentElement to access an\n   * element's parent if it is an Element.\n   */\n  CAN_USE_PARENT_ELEMENT_PROPERTY:\n      goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,\n\n  /**\n   * Whether NoScope elements need a scoped element written before them in\n   * innerHTML.\n   * MSDN: http://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx#1\n   */\n  INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,\n\n  /**\n   * Whether we use legacy IE range API.\n   */\n  LEGACY_IE_RANGES:\n      goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)\n};\n","~:compiled-at",1562072615649,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.dom.browserfeature.js\",\n\"lineCount\":5,\n\"mappings\":\"AAoBAA,IAAAC,QAAA,CAAa,yBAAb,CAAA;AAEAD,IAAAE,QAAA,CAAa,gBAAb,CAAA;AAOA,uBAAAF,IAAAG,IAAAC,eAAA,GAA0B,CAKxBC,gCACI,CAACL,IAAAM,UAAAC,GADLF,IAC0BL,IAAAM,UAAAE,uBAAA,CAAsC,CAAtC,CANF,EAaxBC,2BAA4B,CAACT,IAAAM,UAAAI,MAA7BD,IAAqD,CAACT,IAAAM,UAAAC,GAAtDE,IACIT,IAAAM,UAAAC,GADJE,IACyBT,IAAAM,UAAAE,uBAAA,CAAsC,CAAtC,CADzBC,IAEIT,IAAAM,UAAAI,MAFJD,IAE4BT,IAAAM,UAAAK,kBAAA,CAAiC,OAAjC,CAfJ,EAqBxBC,mBACKZ,IAAAM,UAAAC,GADLK,IAC0B,CAACZ,IAAAM,UAAAK,kBAAA,CAAiC,GAAjC,CAtBH,EA4BxBE,gCACIb,IAAAM,UAAAC,GADJM,IACyBb,IAAAM,UAAAQ,MADzBD;AACiDb,IAAAM,UAAAS,OA7BzB,EAoCxBC,gCAAiChB,IAAAM,UAAAC,GApCT,EAyCxBU,iBACIjB,IAAAM,UAAAC,GADJU,IACyB,CAACjB,IAAAM,UAAAE,uBAAA,CAAsC,CAAtC,CA1CF,CAA1B;;\",\n\"sources\":[\"goog/dom/browserfeature.js\"],\n\"sourcesContent\":[\"// Copyright 2010 The Closure Library Authors. All Rights Reserved.\\n//\\n// Licensed under the Apache License, Version 2.0 (the \\\"License\\\");\\n// you may not use this file except in compliance with the License.\\n// You may obtain a copy of the License at\\n//\\n//      http://www.apache.org/licenses/LICENSE-2.0\\n//\\n// Unless required by applicable law or agreed to in writing, software\\n// distributed under the License is distributed on an \\\"AS-IS\\\" BASIS,\\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\\n// See the License for the specific language governing permissions and\\n// limitations under the License.\\n\\n/**\\n * @fileoverview Browser capability checks for the dom package.\\n *\\n */\\n\\n\\ngoog.provide('goog.dom.BrowserFeature');\\n\\ngoog.require('goog.userAgent');\\n\\n\\n/**\\n * Enum of browser capabilities.\\n * @enum {boolean}\\n */\\ngoog.dom.BrowserFeature = {\\n  /**\\n   * Whether attributes 'name' and 'type' can be added to an element after it's\\n   * created. False in Internet Explorer prior to version 9.\\n   */\\n  CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:\\n      !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),\\n\\n  /**\\n   * Whether we can use element.children to access an element's Element\\n   * children. Available since Gecko 1.9.1, IE 9. (IE<9 also includes comment\\n   * nodes in the collection.)\\n   */\\n  CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE ||\\n      goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) ||\\n      goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher('1.9.1'),\\n\\n  /**\\n   * Opera, Safari 3, and Internet Explorer 9 all support innerText but they\\n   * include text nodes in script and style tags. Not document-mode-dependent.\\n   */\\n  CAN_USE_INNER_TEXT:\\n      (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher('9')),\\n\\n  /**\\n   * MSIE, Opera, and Safari>=4 support element.parentElement to access an\\n   * element's parent if it is an Element.\\n   */\\n  CAN_USE_PARENT_ELEMENT_PROPERTY:\\n      goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,\\n\\n  /**\\n   * Whether NoScope elements need a scoped element written before them in\\n   * innerHTML.\\n   * MSDN: http://msdn.microsoft.com/en-us/library/ms533897(VS.85).aspx#1\\n   */\\n  INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,\\n\\n  /**\\n   * Whether we use legacy IE range API.\\n   */\\n  LEGACY_IE_RANGES:\\n      goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"dom\",\"BrowserFeature\",\"CAN_ADD_NAME_OR_TYPE_ATTRIBUTES\",\"userAgent\",\"IE\",\"isDocumentModeOrHigher\",\"CAN_USE_CHILDREN_ATTRIBUTE\",\"GECKO\",\"isVersionOrHigher\",\"CAN_USE_INNER_TEXT\",\"CAN_USE_PARENT_ELEMENT_PROPERTY\",\"OPERA\",\"WEBKIT\",\"INNER_HTML_NEEDS_SCOPED_ELEMENT\",\"LEGACY_IE_RANGES\"]\n}\n"]