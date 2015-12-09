'use strict';

export default {
    name: 'facebook',
    id: 'facebook-jssdk',
    url: '//connect.facebook.net/<%= locale %>/sdk.js',
    test: (/* config */) => { return !!window.FB; },
    get: (/* config */) => { return window.FB; },
    before: (config, resolve/* , reject */) => {
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: config.appId,
                xfbml: false,
                status: false,
                version: 'v2.5'
            });

            resolve();
        };
    }
    // after: (config, resolve, reject) => {}
};
