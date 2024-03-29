/*! Ionic Portals: https://ionic.io/portals - Commercial License */
import { registerPlugin, WebPlugin, Plugins } from '../../capacitorCore4';

const Portals = registerPlugin('Portals', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.PortalsWeb()),
    android: () => Promise.resolve().then(function () { return android; }).then(m => new m.PortalsAndroid()),
    ios: () => Promise.resolve().then(function () { return ios; }).then(m => new m.PortalsIOS())
});
/**
 * Provides access to any initial state provided by the native application.
 * If the web application is running in a Portal, this will always be defined
 * with the name property.
 * */
function getInitialContext() {
    return window.portalInitialContext;
}

class PortalsWeb extends WebPlugin {
    async publish(_message) { }
    async subscribe(_options, _callback) {
        return {
            subscriptionRef: -0,
            topic: ""
        };
    }
    async unsubscribe(_options) { }
}

const web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PortalsWeb: PortalsWeb
});

/* eslint-disable @typescript-eslint/consistent-type-imports */
class PortalsAndroid {
    async publish(message) {
        return Plugins.Portals.publishNative(message);
    }
    async subscribe(options, callback) {
        return new Promise((res) => {
            let subscribed = false;
            Plugins.Portals.subscribeNative(options, (result) => {
                if (!subscribed) {
                    res(result);
                    subscribed = true;
                }
                else {
                    callback(result);
                }
            });
        });
    }
    async unsubscribe(options) {
        return Plugins.Portals.unsubscribeNative(options);
    }
}

const android = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PortalsAndroid: PortalsAndroid
});

/* eslint-disable @typescript-eslint/consistent-type-imports */
class PortalsIOS {
    async publish(message) {
        return Plugins.Portals.publishNative(message);
    }
    async subscribe(options, callback) {
        return new Promise((res) => {
            let subscribed = false;
            Plugins.Portals.subscribeNative(options, (result) => {
                if (!subscribed) {
                    res(result);
                    subscribed = true;
                }
                else {
                    callback(result);
                }
            });
        });
    }
    async unsubscribe(options) {
        return Plugins.Portals.unsubscribeNative(options);
    }
}

const ios = /*#__PURE__*/Object.freeze({
    __proto__: null,
    PortalsIOS: PortalsIOS
});

export default Portals;
export { getInitialContext };
//# sourceMappingURL=index.js.map
