"use strict";class e extends Error{constructor(r,s){super(`Failed to parse array buffer from ${r}`),this.uri=r,this.cause=s,this.name="ParseError"}}exports.ParseError=e;
