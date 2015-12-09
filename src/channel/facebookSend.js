'use strict';

import { TYPE_SDK } from '../constants';

export default {
    name: 'FacebookSend',
    type: TYPE_SDK,
    sdk: 'facebook',
    action: (attributes) => {
        window.FB.ui({
            method: 'send',
            link: attributes.url,
            redirect_uri: attributes.redirectUrl || document.location.href
        });
    }
};
