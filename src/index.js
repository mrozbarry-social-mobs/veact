export function createApp(component, domNode) {
    const vdomToRealDom = ({ tag, props, children }, oldNode) => {
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
                root.appendChild(vdomToRealDom(child));
            }
        });
        return root;
    }
    
    function tacos() {
        domNode.innerHTML = '';
        domNode.appendChild(vdomToRealDom(component));
    }
    tacos();

    return {
        render: () => {
            tacos();
        },
    }
}

export function createElement(tag, props = {}, ...children) {
    return { tag, props, children };
}

export function doesDomElementMatchVdom(domElement, { tag, props }) {
    console.log('skfbkfjg', domElement.nodeName, tag)
    if(domElement.nodeName.toLowerCase() === tag) {
        return true;
    }

    domElement.props.forEach(prop => {
        if (!props.contains(prop)){
            return false;
        }
    })

    return true;
}
