'use strict';

import { TYPE_POPUP } from '../constants';

export default {
    name: 'Whatsapp',
    type: TYPE_POPUP,
    url: 'whatsapp://send?text=<%= title %>%0A<%= description %>%0A<%= url %>',
    window: {
        width: 600,
        height: 500
    }
};
