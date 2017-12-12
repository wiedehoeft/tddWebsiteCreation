import {PersonModel} from "./PersonModel";
import {PlzCalculator} from "./PlzCalculator";

export class PersonViewController {

    constructor(person) {
        this.person = new PersonModel();
    }

    initHtmlAttributes(document) {
        document.getElementById("personOrt").readOnly = true;
    }

    initEventModel(document) {
        document.getElementById("personName").addEventListener("input", () => {
            this.person.name = document.getElementById("personName").value;
        });

        document.getElementById("personPlz").addEventListener("input", () => {
            this.person.plz = document.getElementById("personPlz").value;
            const location = new PlzCalculator().getLocationFor(this.person.plz);
            this.person.ort = location;
            document.getElementById("personOrt").value = location;
        });
    }

    getPerson() {
        return this.person;
    }
}