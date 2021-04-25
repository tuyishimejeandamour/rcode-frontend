
exports.open = void 0;
var electron_1 = require("electron");
function open() {
    electron_1.ipcRenderer.send('newWindow', 'main.html');
}
exports.open = open;
//# sourceMappingURL=tasker.js.map
