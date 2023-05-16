
export function createApp(component,domNode) {
    const element = window.document.createElement('div');
    element.id = 'app';
    window.document.body.appendChild(element);
    
    domNode.innerText = 'hello world';
    return;
}