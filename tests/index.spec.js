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

        it('can add html properites', () => {
            const ariaLabel = 'any known value';
            createApp({ tag: 'div', props: { ariaLabel }, children: ['hello world']}, element);

            expect(window.document.querySelector('#app').innerHTML).toEqual('<div>hello world</div>');
            expect(window.document.querySelector('#app div').ariaLabel).toEqual('any known value');
        });

//        it.skip('can add html events');
//
//        it.skip('can add html attributes');

    });
});

/*

function Tacos(props) {
  return (
    <div>
      <h1>Tacos!</h1>
    </div>
  );
}

function Tacos(props) {
  return React.createElement('div', {}, [
      React.createElement('h1', {}, 'Tacos!'),
    ]);
}

{ tag: 'div', props: {}, children: [
  { tag: 'h1', props: {}, children: 'Tacos!' },
] }



*/