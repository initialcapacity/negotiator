import {vitePlugin} from '@remcovaes/web-test-runner-vite-plugin';
import {endpoints} from './test/test-server-endpoints.js'

export default {
    plugins: [vitePlugin({
        plugins: [{
            name: 'test-server',
            configureServer: server => {
                server.middlewares.use(async ({url}, response, next) => {
                    const endpoint = endpoints[url];
                    if (endpoint === undefined) {
                        next();
                        return
                    }

                    if (endpoint.contentType) {
                        response.setHeader("Content-Type", endpoint.contentType);
                    }
                    response.statusCode = endpoint.statusCode;
                    response.end(endpoint.body);
                });
            }
        }]
    })],
};
