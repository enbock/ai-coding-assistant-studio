///<reference path="../src/global.d.ts"/>
const m = require('module');

let Module = m;
const origLoader = Module._load;
const moduleCache = {};
const moduleCopy = {};

// Reference to https://github.com/nodejs/node/blob/main/lib/internal/modules/cjs/loader.js#1202
Module._load = function (request, parent, isMain) {
    let module;
    if (request.endsWith('.css'))
        return '';
    else
        module = origLoader(request, parent, isMain);

    moduleCache[request] = module;
    moduleCopy[request] = {...module};

    return module;
};

global.mockModule = function mockModule(path, factory) {
    const module = moduleCache[path];
    if (module === undefined) throw new TypeError('Module ' + path + ' is not imported or does not exists.');
    const mock = factory(module);
    Object.keys(mock).forEach(key => {
        module[key] = mock[key];
    });
};

global.restoreModules = function restoreModules() {
    for (const path of Object.keys(moduleCopy)) {
        const copy = moduleCopy[path];
        const module = moduleCache[path];
        Object.keys(copy).forEach(key => {
            try {
                module[key] = copy[key];
            } catch {
            }
        });
    }
};
