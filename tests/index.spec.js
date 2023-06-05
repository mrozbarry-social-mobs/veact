import {createApp, createElement, doesDomElementMatchVdom} from '../src/index.js';
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

        it('renders a taco vdom object', () => {
            createApp({ tag: 'div', props: {}, children: ['taco hello world'] }, element);
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


        // Only do a setAttribute when we know the value is serializable as a string

//        it('returns the same dome as the vdom', () => {
//            element.innerHTML = '<div>foo</div>';
//            const app = createApp({ tag: 'div', props: {}, children: ['hello world'] }, element);
//
//            expect(window.document.querySelector('#app').innerHTML).toEqual('<div>hello world</div>');
//            const oldDom = element.childNodes[0];
//
//            app.render();
//
//            expect(element.childNodes[0]).toStrictEqual(oldDom);
//        })


    });

    describe('doesDomElementMatchVdom', () => {
        it('returns false when tags are not the same', () => {
            element.innerHTML = '<div>foo</div>';
            const oldDom = element.children[0];

            const doTheyMatch = doesDomElementMatchVdom(oldDom, {tag: 'select', props: {}});
            expect(doTheyMatch).toBe(false);
        })

        it('returns true when tags are the same', () => {
             element.innerHTML = '<div>foo</div>';
             const oldDom = element.children[0];

             const doTheyMatch = doesDomElementMatchVdom(oldDom, {tag: 'div', props: {}});
             expect(doTheyMatch).toBe(true);
         })

        it.only('returns false when the tags are the same but the props are different', () => {
            element.innerHTML = '<div id="taco">foo</div>';
            const oldDom = element.children[0];

            const doTheyMatch = doesDomElementMatchVdom(oldDom, {tag: 'div', props: oldDom.props});
            expect(doTheyMatch).toBe(false);
        })


        it('returns true when the props are the same', () => {
            element.innerHTML = '<div id="taco">foo</div>';
            const oldDom = element.children[0];

            const doTheyMatch = doesDomElementMatchVdom(oldDom, {tag: 'div', props: oldDom.props});
            expect(doTheyMatch).toBe(true);
        })
    })

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
