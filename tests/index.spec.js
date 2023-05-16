import { createApp } from '../src/index.js';

describe('src/index', () => {
    describe('createApp', () => {
        it('renders a vdom object', () => {
            const element = window.document.createElement('div');
            element.id = 'app';
            window.document.body.appendChild(element);
            
            createApp({ tag: 'div', props: {}, children: ['hello world']}, element);
            
            expect(window.document.querySelector('#app').innerText).toEqual('hello world');
        });
        
        it('renders a nested vdom', () => {
            const element = window.document.createElement('div');
            element.id = 'app';
            window.document.body.appendChild(element);
            
            createApp({ tag: 'div', props: {}, children: [{tag: 'h1', props: {}, children: ['Second layer header']}]}, element);

            expect(window.document.querySelector('#app div h1').innerText).toEqual('Second layer header');
        });
    })
})