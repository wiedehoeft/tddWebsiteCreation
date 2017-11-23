let personModel = require("./PersonModel");

const person = personModel.initPerson();

module.exports = {

    init: function (document) {
        document.getElementById("personOrt").readOnly = true;

        document.getElementById("personName").addEventListener("input", () => {
           person.name =  document.getElementById("personName").value;
        });

        document.getElementById("personPlz").addEventListener("input", () => {
            person.plz =  document.getElementById("personPlz").value;
        });
    },

    getPerson: function() {
        return person;
    }
};