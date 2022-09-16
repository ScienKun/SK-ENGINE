/*:
* @target MZ
* @plugindesc Engine for creating titlescreen layout
* @author eska
*
* @help SKE_Titlescreen.js
*
* Commands for this plugin :
*
*/


/* 
    comment dessiner une fenêtre ?


*/


var SKE = SKE || {};
SKE.TTSE = SKE.TTSE || {};
SKE.TTSE.version = 0.1;

var Imported = Imported || {};
Imported[SKE.TTSE] = true;


$dataTitleScreen = null;


class WindowTTSE {
    constructor (x, y, w, h, text) {
        this.rect = new Rectangle(x, y, w, h);
        this.text = text;
    }

    generateWindow() {

    }

}

class TitleScreen extends Engine {
    
    _windows = [];
    _dataBase = [
        { name: "$dataTitleScreen", src: "TitleWindows.json"}
    ];

    createWindow(data) {
        this._windows.push(data)
    }
        
    createContent(x, y, w, h, content) {
        let _window = new WindowTTSE(x, y, w, h, content)
        this.createWindow(_window);
    }

    drawAllContent() {
        for (const w of this._windows) {
            console.log(w)
        }
    }

    drawText(element) {
        const x = 20;
        const y = 22;
        const maxWidth = Graphics.width - x * 2;
        const text = "hello there";
        const bitmap = element.bitmap;
        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.textColor = "black";
        bitmap.outlineColor = "#fff";
        bitmap.outlineWidth = 2;
        bitmap.fontSize = 24;
        bitmap.drawText(text, x, y, maxWidth, 48, "center");
    }

    loadDatabase() {
        for (const data of this._dataBase) {
            this.loadDataFile(data.name, data.src);
        }
    }

    loadDataFile(name, src) {
        const xhr = new XMLHttpRequest();
        const url = "data/" + src;
        window[name];
        xhr.open("GET", url);
        xhr.overrideMimeType("application/json");
        xhr.onload = () => this.onXhrLoad(xhr, name, src, url);
        xhr.onerror = () => this.onXhrError(name, src, url);
        xhr.send();
    }

    onXhrLoad(xhr, name, src, url) {
        if (xhr.status < 400) {
            window[name] = JSON.parse(xhr.responseText);
            this.onLoad(window[name]);
        } else {
            this.onXhrError(name, src, url);
        }
    }

    onXhrError(name, src, url) {
        const error = { name: name, src: src, url: url };
        DataManager._errors.push(error);
    }
 
    onLoad(object) {
        DataManager.extractArrayMetadata(object);
    }
}

SKE.TTSE._ttse = new TitleScreen();

let htmlChild = [null];

function eraseHtml () {
    document.body.removeChild(htmlChild[1]);
}

function createHtml () {
    let html = document.createElement('div');
    html.id = "caroussel";
    html.style.position = "absolute";
    html.style.borderRadius = "25px";
    html.style.top = "25px";
    html.style.left = "55px";
    html.style.background = `linear-gradient(0deg, rgba(195,34,76,1) 0%, rgba(228,87,46,1) 100%)`;
    html.style.zIndex = 10;
    html.style.width = "560px";
    html.style.height = "315px";
    html.style.margin = "auto";
    let yt = document.createElement("div");
    yt.innerHTML = `<iframe width="250" height="165" style="border-radius: 15px" src="https://www.youtube.com/embed/frw76rwbd1w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    yt.style.borderRadius = "25px";
    yt.style.objectFit = "fill";
    let xy = document.createElement("a");
    xy.innerText = "Click here !";
    xy.style.backgroundColor = "#e38c6f";
    xy.style.display = "inline-block";
    xy.style.width = "120px";
    xy.style.padding = "12px";
    xy.style.position = "absolute";
    xy.style.top = "25px";
    xy.style.left = "55px";
    xy.target = "_blank";
    xy.href = "https://www.youtube.com/watch?v=frw76rwbd1w";
    html.appendChild(xy);
    html.appendChild(yt);
    document.body.appendChild(html);
    htmlChild.push(html);
}

(() => {
    "use strict";

   

    /* 
        > charge titlescreen.json in database 

        > permit dev (only on test mode) to use the titlescreen Engine UI ()

        > each command generate an title_element and save it in the js

        > create a window a display it with parameters to the right place
    */

  

    const _scene_title_start = Scene_Title.prototype.start;

    Scene_Title.prototype.start = function() {
        _scene_title_start.apply(this, arguments);
        console.log('script enabled');
    };
    
    const _scene_title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function () {
        _scene_title_create.apply(this, arguments);
        SKE.TTSE._ttse.loadDatabase();
        SKE.TTSE._ttse.createContent(15, 15, 80, 25, ["salut", "echec critique"]);
        SKE.TTSE._ttse.drawAllContent();
    };

    const _create_foreground = Scene_Title.prototype.createForeground;
    Scene_Title.prototype.createForeground = function () {
        _create_foreground.apply(this, arguments);
        this._newText = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this.addChild(this._newText);
        SKE.TTSE._ttse.drawText(this._newText);
        createHtml();
    };

    const _scene_title_terminate = Scene_Title.prototype.terminate;
    Scene_Title.prototype.terminate = function() {
        eraseHtml();
        _scene_title_terminate.apply(this, arguments);
    };
    
    
    

})();