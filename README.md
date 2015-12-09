# sharejs

Utility library for sharing.

## Usage

1. If you're using an SDK channel (see type) like Facebook Send; configure the SDK first.
2. Use `createCallback` to get a function you can attach to any DOM event listener. Or use the `share` function directly if you want to do custom event handling.

__Note__: Social SDK's are loaded asynchronously on demand (when you call `configure()`), so beware of popup blockers. A `ready` method is provided that returns a promise which will be resolved when the SDK is ready to be used. (`configure` returns the same promise.)

## Example

See `example/app.js`. You can run the example with `npm start` and opening your browser at [http://localhost:8080/webpack-dev-server/bundle](http://localhost:8080/webpack-dev-server/bundle). `HOST` and `PORT` can be customized through ENVIRONMENT variables.

## Resources

More share links! More features! More fun!

- http://faq.netvibes.com/knowledgebase/articles/370909-how-setup-a-custom-sharing
- https://github.com/itgalaxy-company/ss.js/blob/master/README.md#whoisdomaintoolscom
