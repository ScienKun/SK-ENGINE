/*:
 *
 * @target MZ
 * @title SKE_CORE
 * @author eska
 * @plugindesc Base plugin for the SKE library.
 * 
 * @help SKE_Core.js v0.1a
*/

var SKE = SKE || {};
SKE.CORE = SKE.CORE || {};
SKE.CORE.version = 0.1;

var Imported = Imported || {};
Imported[SKE.CORE] = true;


class Engine {
    constructor() {
        this.version = SKE.CORE.version;
    }

    helloWorld() {
        console.info(`======= SKE_CORE ====== \n version ${this.version}`)
    }
}


(() => {

    "use strict";
    const engine = new Engine();

    


})();