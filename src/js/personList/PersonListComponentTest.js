"use strict";
const sinon = require("sinon");
const expect = require("chai").expect;
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const fs = require('fs');
const path = require('path');
const personList = require('./PersonListComponent');
let personModel = require("../personView/PersonModel");

describe("Testing behaviour of custom person list", () => {

    let filePath = path.join(__dirname, '../html/PersonList.html');
    let document;
    let ort;

    beforeEach("Init dom for testing", () => {
        const personListTemplate = fs.readFileSync(filePath, "utf8");
        const dom = new JSDOM(personListTemplate);
        document = dom.window.document;
        global.window = dom.window;
        global.document = window.document;
        global.HTMLElement = window.HTMLElement;
    });

    it("should append tableRow for new person object", () => {
        // Given
        const personList = new PersonList();
        const person = personModel.initPerson();

        // When
        personList.addPerson(person);

        //Then

    });
});