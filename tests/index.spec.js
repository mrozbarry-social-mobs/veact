import { createApp } from '../src/index.js';

describe('src/index', () => {
    let element = null;

    describe('createApp', () => {
        beforeEach(() => {
            window.document.body.innerHTML = '';
            element = window.document.createElement('div');
            element.id = 'app';
            window.document.body.appendChild(element);
        });

        it('renders a vdom object', () => {
            createApp({ tag: 'div', props: {}, children: ['hello world']}, element);
            
            expect(window.document.querySelector('#app').innerHTML).toEqual('<div>hello world</div>');
        });

        it('renders a nested vdom', () => {
            createApp(
                { tag: 'div', props: {}, children: [{tag: 'h1', props: {}, children: ['Second layer header']}]},
                element
                );

            expect(window.document.querySelector('#app').innerHTML).toEqual('<div><h1>Second layer header</h1></div>');
        });

        xit('can add html attributes');

        xit('can add html properites');

        xit('can add html events');
    });
});