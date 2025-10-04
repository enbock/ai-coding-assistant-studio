///<reference path="../src/global.d.ts"/>

function mock(obj) {
    return buildStub(obj ?? {});
}

function buildStub(target) {
    return new Proxy(target, {
        get: (obj, property) => {
            if (property in obj) {
                return obj[property];
            }
            if (property == 'then') {
                // Resolve timeout on data objects that returns over async
                return undefined;
            }
            obj[property] = jasmine.createSpy(property);
            return obj[property];
        }
    });
}

// noinspection UnreachableCodeJS
global.mock = mock;
