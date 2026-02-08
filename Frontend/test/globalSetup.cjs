const {JSDOM} = require('jsdom');

process.env.NODE_ENV = 'testing';
process.env.TZ = 'Europe/Berlin';

const dom = new JSDOM();

global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.customElements = dom.window.customElements;
global.MouseEvent = dom.window.MouseEvent;
global.Storage = class {
    length = 0;

    setItem() {
    }

    removeItem() {
    }

    key() {
        return null;
    }

    getItem() {
        return null;
    }

    clear() {
    }
};

