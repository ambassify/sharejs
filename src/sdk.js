'use strict';

import _ from 'lodash';

const requested = {};
const loaded = {};

function _isLoaded(def, config) {
    return !!loaded[def.name] || def.test ? def.test(config) : false;
}

function _isRequested(def) {
    return !!requested[def.name];
}

function _waitFor(def, resolve, reject) {
    return requested[def.name].then(resolve).catch(reject);
}

function _request(def, config, resolve, reject) {
    requested[def.name] = new Promise((innerResolve, innerReject) => {
        if (def.before)
            def.before(config, innerResolve, innerReject);

        const anchor = document.getElementsByTagName('script')[0];
        const js = document.createElement('script');
        js.src = _.template(def.url)(config);
        js.async = true;
        js.defer = true;

        if (def.after)
            js.onload = def.after.bind(this, config, innerResolve, innerReject);

        anchor.parentNode.insertBefore(js, anchor);
    });

    return _waitFor(def, resolve, reject);
}

function _loadSdk(sdk, config, resolve, reject) {
    let def;

    try {
        def = require(`./sdk/${sdk}.js`);
    } catch (e) {
        return reject(new Error(`SDK ${sdk} is not available.`));
    }

    if (_isLoaded(def, config))
        return resolve(def.get(config));

    if (_isRequested(def))
        return _waitFor(def, resolve, reject);

    return _request(def, config, resolve, reject);
}

export default function loadSdk( sdk, config ){
    return new Promise(_loadSdk.bind(this, sdk, config));
}
