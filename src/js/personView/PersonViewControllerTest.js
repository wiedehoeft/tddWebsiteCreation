import {PersonViewController} from "./PersonViewController";
import * as path from 'path';
import * as fs from 'fs';
import {JSDOM} from "jsdom";
import {expect} from 'chai'
import * as sinon from "sinon";
import {PlzCalculator} from "../PlzCalculator";

describe("Testing behaviour of person details view", () => {

    let personViewController;
    let filePath = path.join(__dirname, '../../html/PersonView.html');
    let document;
    let ort;

    beforeEach("Init object under test", () => {
        personViewController = new PersonViewController();

        const personViewTemplate = fs.readFileSync(filePath, "utf8").replace("template", "div");
        const dom = new JSDOM(personViewTemplate);
        ort = dom.window.document.getElementById("personOrt");
        document = dom.window.document;
    });

    it("should create disabled location textfield", () => {

        // When
        personViewController.initHtmlAttributes(document);

        // Then
        expect(ort.readOnly).to.be.true;
    });

    it("should set name value after input changed", () => {

        // Given
        personViewController.initHtmlAttributes(document);

        // When
        document.getElementById("personName").value = "Hugo";
        const event = document.createEvent("KeyboardEvent");
        event.initEvent("input", true, true);
        document.getElementById("personName").dispatchEvent(event);

        // Then
        expect(personViewController.getPerson().name).to.be.equals("Hugo");
    });

    it("should set plz value after input changed", () => {

        // Given
        personViewController.initHtmlAttributes(document);

        // When
        document.getElementById("personPlz").value = "44135";
        const event = document.createEvent("KeyboardEvent");
        event.initEvent("input", true, true);
        document.getElementById("personPlz").dispatchEvent(event);

        // Then
        expect(personViewController.getPerson().plz).to.be.equals("44135");
    });

    it("Should set location value after user inserted postalCode", () => {
        // Given
        personViewController.initHtmlAttributes(document);
        const locationCalculatorStub = sinon.stub(new PlzCalculator(), 'getLocationFor').returns("Dortmund");

        // When
        document.getElementById("personPlz").value = "44135";
        const event = document.createEvent("KeyboardEvent");
        event.initEvent("input", true, true);
        document.getElementById("personPlz").dispatchEvent(event);

        // Then
        expect(personViewController.getPerson().ort).to.be.equals("Dortmund");
        expect(document.getElementById("personOrt").value).to.be.equals("Dortmund")
    });
});