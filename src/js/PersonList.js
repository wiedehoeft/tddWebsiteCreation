/*let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>:host { ... }</style> <!-- look ma, scoped styles -->
  <b>I'm in shadow dom!</b>
  <slot></slot>
`;*/

let link = document.querySelector('link[rel="import"][href="PersonList.html"]');
let template = link.import.querySelector('#person-list-tmpl');

class PersonList extends HTMLElement {

    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
    }
}

window.customElements.define("person-list", PersonList);
