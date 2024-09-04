"use strict";
const sks = require("./main");
(async () => {
    await sks.init();
    console.log(process.sks);
})();
