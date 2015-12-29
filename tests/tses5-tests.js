/// <reference path="../lib/Edm.d.ts" />
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
require('reflect-metadata');

var Edm = require('../lib/Edm.js').Edm
var expect = require('chai').expect
Edm.S
describe("Edm.EntityProperty", () => {
    it("should support no init data", () => {
        var ep = new Edm.Property();
        expect(ep).to.be.instanceof(Edm.Property)
    });
    
    it("should support initialize name from init data", () => {
        var p = {
            name: "h",
            property: [
                { name:"p1"},{name:"p2"},{name:"p3"}
            ]
        }
        var ed = new Edm.EntityType(p, {})
        expect(ed.properties[0]).to.be.instanceof(Edm.Property)
        expect(ed.properties[0].name).to.equal("p1")
    });
})

describe("Edm.NavigationProperty", () => {

    
    it("should support initialize name from init data", () => {
        var p = {
            name: "h",
            referentialConstraint: [
                { property:"p1"},{property:"p2"},{property:"p3"}
            ]
        }
        var ed = new Edm.NavigationProperty(p, {})
        expect(ed.name).to.equal("h")
        expect(ed.referentialConstraints[0]).to.be.instanceof(Edm.ReferentialConstraint)
        expect(ed.referentialConstraints[0].property).to.equal("p1")
    });
})

describe("Edm.EntityType", () => {
    
    
    it("should support initialize name from init data", () => {
        var p = {
            name: "h",
            '@info': 'odata4-js incorrectly exports key as array, we follow this pattern in thests',
            key: [
              {
                "propertyRef": [
                  {
                    "name": "OrderID"
                  },
                 {
                    "name": "CustoerID"
                  }  
                ]
              }
            ],
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
        var ed = new Edm.EntityType(p, {})
        expect(ed.name).to.equal("h")
        expect(ed.navigationProperties[0]).to.be.instanceof(Edm.NavigationProperty)
        expect(ed.properties[0]).to.be.instanceof(Edm.Property)
        expect(ed.navigationProperties[0].referentialConstraints[0].property).to.equal("np1")
        expect(ed.key).to.be.instanceof(Edm.Key)
        expect(ed.key.propertyRefs[0]).to.be.instanceof(Edm.PropertyRef)
        
    });
})