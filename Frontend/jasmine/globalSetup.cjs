/// <reference path="../src/global.d.ts" />
/// <reference path="./jasmine.d.ts" />
// noinspection JSConstantReassignment,JSUnusedGlobalSymbols

process.env.NODE_ENV = 'testing';
process.env.TZ = 'Europe/Berlin';

const jsdom = require('jsdom');

// noinspection JSUnresolvedReference
global.window = new jsdom.JSDOM().window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.customElements = window.customElements;
global.MouseEvent = window.MouseEvent;

require('./mock.cjs');

// @ts-ignore
global.Storage = class {
    length = 0;

    setItem() {
    };

    removeItem() {
    };

    key() {
    };

    getItem() {
    };
};
