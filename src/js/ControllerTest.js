"use strict";

const expect = require("chai").expect;
const controller = require("./Controller");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');


describe("Testing controller for personView", () => {

    it("should create disabled location textfield", () => {

        let filePath = path.join(__dirname, '../html/PersonView.html');

        const personViewTemplate = fs.readFileSync(filePath, "utf8");
        const dom = new JSDOM(personViewTemplate);
        let ort = dom.window.document.getElementById("personOrt");

        expect(ort).not.to.be.null;

    });
});