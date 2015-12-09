'use strict';

import { ATTRIBUTES } from './constants';

export
function extractAttributesFromElement(element) {
    const attributes = {};

    ATTRIBUTES.forEach((attr) => {
        const v = element.getAttribute('data-' + attr) || element.getAttribute(attr);

        if (v) {
            attributes[attr] = v;
        }
    });

    return attributes;
}
