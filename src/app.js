"use strict";
const remote = require("electron").remote;
const ffi = remote.require("ffi");
const options = {
  User32: (() => {
    return ffi.Library("user32", {
      GetWindowLongPtrW: ["int", ["int", "int"]],
      SetWindowLongPtrW: ["int", ["int", "int", "long"]],
      GetSystemMenu: ["int", ["int", "bool"]],
      DestroyWindow: ["bool", ["int"]]
    });
  })()
};
export default options;
