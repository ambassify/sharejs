'use strict';

import _ from 'lodash';
import loadSdk from './sdk';
import doShare, { getChannel } from './share';
import { extractAttributesFromElement as fromElement } from './utils';

const allConfigurePromises = {};

/**
 * Configure and initialize social network SDK's
 */
export
function configure( config ) {
    const promises = [];

    Object.keys(config).forEach((k) => {
        const promise = loadSdk(k, config[k]);

        promises.push(promise);
        allConfigurePromises[k] = allConfigurePromises[k] || [];
        allConfigurePromises[k].push(promise);
    });

    return Promise.all(promises);
}

/**
 * Request a promise that resolves when all configuration calls have
 * been handled
 */
export
function ready( network ) {
    let promises = [];

    if (network) {
        const channel = getChannel(network);

        if (channel.sdk)
            promises = allConfigurePromises[channel.sdk] || [];
    } else {
        promises = _.reduce(allConfigurePromises, (aggregate, p) => {
            return aggregate.concat(p);
        }, []);
    }

    return Promise.all(promises);
}

/**
 * Share something
 */
export
function share( network, attributes = {} ) {
    return doShare(network, attributes);
}

/**
 * Create a callback to pass to event listeners
 */
export
function createCallback( network, attributes = {} ) {
    return (e) => {
        const attr = e && e.target ? _.merge(attributes, fromElement(e.target)) : attributes;
        share(network, attr);
    };
}
