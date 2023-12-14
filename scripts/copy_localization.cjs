const fs = require("fs");
const path = require('path');

fs.copyFile(path.resolve(__dirname,"../locales/bundle.l10n.en.json"), path.resolve(__dirname,"../package.nls.json"),fs.constants.COPYFILE_FICLONE,(e)=>{});
fs.copyFile(path.resolve(__dirname,"../locales/bundle.l10n.zh-cn.json"), path.resolve(__dirname,"../package.nls.zh-cn.json"),fs.constants.COPYFILE_FICLONE,(e)=>{});
