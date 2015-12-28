/// <reference path="../dest/edm.d.ts" />
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
require('reflect-metadata');

var edm = require('../dest/edm.js')
var expect = require('chai').expect
var serialize = new edm.SerializeAttribute()
var typeArgumentAttribute = new edm.MemberAttribute("typeArgument")

describe("edm.EntityProperty", () => {
    it("should support no init data", () => {
        var ep = new edm.Property();
        expect(ep).to.be.instanceof(edm.Property)
    });
    
    it("should support initialize name from init data", () => {
        var p = {
            name: "h",
            property: [
                { name:"p1"},{name:"p2"},{name:"p3"}
            ]
        }
        var ed = new edm.EntityType(p, {})
        expect(ed.properties[0]).to.be.instanceof(edm.Property)
        expect(ed.properties[0].name).to.equal("p1")
    });
})

describe("edm.NavigationProperty", () => {

    
    it("should support initialize name from init data", () => {
        var p = {
            name: "h",
            referentialConstraint: [
                { property:"p1"},{property:"p2"},{property:"p3"}
            ]
        }
        var ed = new edm.NavigationProperty(p, {})
        expect(ed.name).to.equal("h")
        expect(ed.referentialConstraints[0]).to.be.instanceof(edm.ReferentialConstraint)
        expect(ed.referentialConstraints[0].property).to.equal("p1")
    });
})

describe("edm.EntityType", () => {
    
    
    it("should support initialize name from init data", () => {
        var p = {
            name: "h",
            navigationProperty: [
                {
                    name:"np1",
                   referentialConstraint: [
                         { property:"np1"},{property:"p2"},{property:"p3"}
                    ]
      
                }
            ],
            property: [
                { name:"p1"},{name:"p2"},{name:"p3"}
            ]
        }
        var ed = new edm.EntityType(p, {})
        expect(ed.name).to.equal("h")
        console.log()
        expect(ed.navigationProperties[0]).to.be.instanceof(edm.NavigationProperty)
        expect(ed.properties[0]).to.be.instanceof(edm.Property)
        expect(ed.navigationProperties[0].referentialConstraints[0].property).to.equal("np1")
    });
})