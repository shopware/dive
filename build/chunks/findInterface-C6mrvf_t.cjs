"use strict";function r(n,e){return n?e in n:!1}function f(n,e){if(n)return r(n,e)?n:f(n.parent,e)}exports.findInterface=f;exports.implementsInterface=r;
