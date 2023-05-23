export function createApp(component, domNode) {
    const magic = ({ tag, props, children }) => {
        const root = document.createElement(tag);

        Object.keys(props).forEach(key => {
            if (key in root) {
                root[key] = props[key]
            } else {
                root.setAttribute(key, props[key]);
            }
        });
        
        children.forEach((child) => {
            if (typeof child === 'string') {
                const textNode = document.createTextNode(child);
                root.appendChild(textNode);
            } else {
                root.appendChild(magic(child));
            }
        });
        return root;
    }
    
    domNode.appendChild(magic(component));

    return;
}

// vdom:
// { tag: 'div', props: { className: 'block border' }, children: [] }
// createApp()
// - has a root component
// - can track some form of state?
// - re-renders 