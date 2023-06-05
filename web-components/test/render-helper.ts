import {LitHTMLRenderable} from '@open-wc/testing-helpers/src/renderable';
import {fixture} from '@open-wc/testing';
import * as Components from '../src/main'

export const renderComponent = async (toRender: LitHTMLRenderable) => {
    // ensure all web components are imported so they are rendered properly in tests
    console.trace('loading', Components)
    return fixture(toRender);
};
