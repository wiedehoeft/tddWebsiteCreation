import {PersonModel} from "../PersonModel";
import {PlzCalculator} from "../PlzCalculator";

export class PersonViewController {

    constructor(person) {
        this.person = new PersonModel();
    }

    initHtmlAttributes(document) {
        document.getElementById("personOrt").readOnly = true;

        console.log(document.getElementById("personName"));
        console.log(document.getElementById("personPlz"));
    }

    initEventModel(document) {
        console.log(document);
        document.getElementById("personName").addEventListener("input", () => {
            console.log("person name event");
            this.person.name = document.getElementById("personName").value;
        });

        document.getElementById("personPlz").addEventListener("input", () => {
            console.log("person plz event");
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