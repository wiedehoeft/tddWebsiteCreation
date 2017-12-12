/*let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>:host { ... }</style> <!-- look ma, scoped styles -->
  <b>I'm in shadow dom!</b>
  <slot></slot>
`;*/

class PersonList extends HTMLElement {

    constructor() {
        super();
        let link = document.querySelector('link[rel="import"][href="PersonList.html"]');
        let template = link.import.querySelector('#person-list-tmpl');
        let shadowRoot = this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        document.getElementById("buttonAddPerson").addEventListener("click", () => {
            this.addPerson();
        });
    }

    addPerson(person) {
        var tableRef = this.shadowRoot.getElementById('personTable').getElementsByTagName('tbody')[0];

        // Insert a row in the table at the last row
        var newRow = tableRef.insertRow(tableRef.rows.length);

        // Insert a cell in the row at index 0
        var newCell = newRow.insertCell(0);

        // Append a text node to the cell
        var newText = document.createTextNode('New row');
        newCell.appendChild(newText);
    }
}

window.customElements.define("person-list", PersonList);

module.exports.PersonList = PersonList;