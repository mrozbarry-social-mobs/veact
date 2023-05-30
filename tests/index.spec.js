import {createApp, createElement} from '../src/index.js';
import * as jest from 'jest-mock';

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
            createApp({ tag: 'div', props: {}, children: ['hello world'] }, element);
            
            expect(window.document.querySelector('#app').innerHTML).toEqual('<div>hello world</div>');
        });

        it('renders a nested vdom', () => {
            createApp(
                { tag: 'div', props: {}, children: [{tag: 'h1', props: {}, children: ['Second layer header']}]},
                element
                );

            expect(window.document.querySelector('#app').innerHTML).toEqual('<div><h1>Second layer header</h1></div>');
        });

        it('can add html events', () => {
            const onclick = jest.fn();

            createApp({ tag: 'button', props: { onclick }, children: ['something different']}, element);
            document.querySelector('button').click();

            expect(window.document.querySelector('#app').innerHTML).toEqual('<button>something different</button>');
            expect(onclick).toHaveBeenCalledTimes(1);
        });

        it('can add html attributes', () => {
            const dataType = 'any known value';
            const tacos = 'tacoooooos';
            createApp({ tag: 'div', props: { "data-type": dataType, tacos }, children: ['hello world']}, element);

            expect(window.document.querySelector('#app').innerHTML).toEqual(`<div data-type="${dataType}" tacos="${tacos}">hello world</div>`);

        });

    });

    describe('createElement', () => {
        it('creates a div vdom', () => {
            const element = createElement('div');

            expect(element).toEqual({ tag: 'div', props: {}, children: [] });
        })

        it('creates a div vdom with props', () => {
            const element = createElement('div', { foo: 'bar' });

            expect(element).toEqual({ tag: 'div', props: { foo: 'bar' }, children: [] });
        })


        it('nests vdom elements', () => {
            const element = createElement('div', {}, createElement('span', {}, 'cool'));

            expect(element).toEqual({ tag: 'div', props: {}, children: [{ tag: 'span', props: {}, children: ['cool'] }] });
        })
    });
});