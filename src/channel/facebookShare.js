'use strict';

import { TYPE_POPUP } from '../constants';

export default {
    name: 'FacebookShare',
    type: TYPE_POPUP,
    url: 'http://www.facebook.com/sharer.php?u=<%= url %>',
    window: {
        width: 600,
        height: 500
    }
};
