'use strict';

import _ from 'lodash';
import { TYPE_POPUP, TYPE_SDK } from './constants';

export function getChannel( channel ) {
    let c;

    try {
        c = require(`./channel/${channel}.js`);
    } catch (e) {
        throw new Error(`Channel ${channel} is not available.`);
    }

    return c;
}

function _share(network, attributes, resolve, reject) {
    const channel = getChannel(network);

    if (channel.type === TYPE_POPUP) {

        if (_showPopup(channel, attributes))
            return resolve();
        else
            return reject(`Popup blocked for ${network}.`);

    } else if (channel.type === TYPE_SDK) {
        channel.action(attributes);
        return resolve();

    }

    return reject(new Error(`Invalid channel ${network}`));
}

function _showPopup(channel, attributes) {
    const url = _.template(channel.url)(_.mapValues(attributes, (v) => {
        return encodeURIComponent(v);
    }));
    const features = _.reduce(channel.window, (acc, v, k) => {
        acc.push(k + '=' + v);
        return acc;
    }, []).join(',');

    return window.open(url, channel.name, features);
}

export default function share( network, attributes ) {
    return new Promise(_share.bind(this, network, attributes));
}
