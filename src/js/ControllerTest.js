"use strict";
const sinon = require("sinon");
const expect = require("chai").expect;
const controller = require("./Controller");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const fs = require('fs');
const path = require('path');
const locationCalculator = require("./PlzCalculator");

describe("Testing controller for personView", () => {

    let filePath = path.join(__dirname, '../html/PersonView.html');
    let document;
    let ort;

    beforeEach("Init dom for testing", () => {
        const personViewTemplate = fs.readFileSync(filePath, "utf8");
        const dom = new JSDOM(personViewTemplate);
        ort = dom.window.document.getElementById("personOrt");
        document = dom.window.document;
    });

    it("should create disabled location textfield", () => {

        // When
        controller.init(document);

        // Then
        expect(ort.readOnly).to.be.true;

    });

    it("should set name value after input changed", () => {

        // Given
        controller.init(document);

        // When
        document.getElementById("personName").value = "Hugo";
        const event = document.createEvent("KeyboardEvent");
        event.initEvent("input", true, true);
        document.getElementById("personName").dispatchEvent(event);

        // Then
        expect(controller.getPerson().name).to.be.equals("Hugo");
    });

    it("should set plz value after input changed", () => {

        // Given
        controller.init(document);

        // When
        document.getElementById("personPlz").value = "44135";
        const event = document.createEvent("KeyboardEvent");
        event.initEvent("input", true, true);
        document.getElementById("personPlz").dispatchEvent(event);

        // Then
        expect(controller.getPerson().plz).to.be.equals("44135");
    });

    it("Should set location value after user inserted postalCode", () => {
        // Given
        controller.init(document);
        const locationCalculatorStub = sinon.stub(locationCalculator, 'getLocationFor').returns("Dortmund");

        // When
        document.getElementById("personPlz").value = "44135";
        const event = document.createEvent("KeyboardEvent");
        event.initEvent("input", true, true);
        document.getElementById("personPlz").dispatchEvent(event);

        // Then
        expect(controller.getPerson().ort).to.be.equals("Dortmund");
        expect(document.getElementById("personOrt").value).to.be.equals("Dortmund")
    });
});