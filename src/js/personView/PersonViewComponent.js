import {PersonViewController} from "./PersonViewController";

class PersonViewComponent extends HTMLElement {

    constructor() {
        super();
        let link = document.querySelector('link[rel="import"][href="PersonView.html"]');
        let template = link.import.querySelector('#person-view-tmpl');
        let shadowRoot = this.attachShadow({mode: 'open'});
        new PersonViewController().initHtmlAttributes(template.content);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        new PersonViewController().initEventModel(this.shadowRoot);
     }
}

window.customElements.define("person-view", PersonViewComponent);