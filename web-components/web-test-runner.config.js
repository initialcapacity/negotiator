import {vitePlugin} from '@remcovaes/web-test-runner-vite-plugin';
import {endpoints} from './test/test-server-endpoints.js';
import { playwrightLauncher } from '@web/test-runner-playwright';

const filteredLogs = [
    'Lit is in dev mode. Not recommended for production! See https://lit.dev/msg/dev-mode for more information.',
    '[vite] connecting',
]

const filterBrowserLogs = (log) => {
    for (const arg of log.args) {
        if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
            return false
        }
    }
    return true
}

const testServerPlugin = {
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
};
export default {
    browsers: [playwrightLauncher({ product: 'chromium' })],
filterBrowserLogs,
    staticLogging: true,
    plugins: [vitePlugin({
        plugins: [testServerPlugin]
    })],
};
