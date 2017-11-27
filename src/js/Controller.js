let personModel = require("./PersonModel");
let locationCalculator = require("./PlzCalculator");

const person = personModel.initPerson();

module.exports = {

    init: function (document) {
        document.getElementById("personOrt").readOnly = true;

        document.getElementById("personName").addEventListener("input", () => {
            person.name = document.getElementById("personName").value;
        });

        document.getElementById("personPlz").addEventListener("input", () => {
            person.plz = document.getElementById("personPlz").value;
            const location = locationCalculator.getLocationFor(person.plz);
            person.ort = location;
            document.getElementById("personOrt").value = location;
        });
    },

    getPerson: function () {
        return person;
    }
};