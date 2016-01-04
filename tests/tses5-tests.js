/// <reference path="../lib/Edm.d.ts" />
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
require('reflect-metadata');

var Edm = require('../lib/edm.js').Edm
var expect = require('chai').expect

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





var nwindSchema = require('./schema.json')
var entitySchema = nwindSchema.dataServices.schema[0]
describe("Edm.Schema", () => {
        it("should support initialize name from init data", () => {
              var s = new Edm.Schema(entitySchema)
              //s.
              expect(s.entityTypes).to.have.length(26)
              expect(s.entityTypes[0]).to.be.instanceof(Edm.EntityType)
              expect(s.entityTypes[0].key.propertyRefs[0]).to.be.instanceof(Edm.PropertyRef)
              expect(s.entityTypes[0].key.propertyRefs[0].name).to.equal("CategoryID")
        })
})

var dataServices = nwindSchema.dataServices
describe("Edm.DataService", () => {
        it("should support initialize name from init data (dataservice)", () => {
              var d = new Edm.DataServices(dataServices)
              var s = d.schemas[0]
              //s.
              expect(s.entityTypes).to.have.length(26)
              expect(s.entityTypes[0]).to.be.instanceof(Edm.EntityType)
              expect(s.entityTypes[0].key.propertyRefs[0]).to.be.instanceof(Edm.PropertyRef)
              expect(s.entityTypes[0].key.propertyRefs[0].name).to.equal("CategoryID")
        })
})

var o4schema = require('./schema2.json')

describe("Edm.Action", () => {
    it("should support init data", () => {
        var json = o4schema.dataServices.schema[1]
        var schema = new Edm.Schema(json)
        var action = schema.actions[0]
        
        expect(action).to.be.instanceof(Edm.Action)
        expect(action.parameters).to.have.length(2)
        expect(action.parameters[0]).to.be.instanceof(Edm.Parameter)
        expect(action.parameters[0].name).to.be.equal("bindingParameter")
    })
})

describe("Edm.Action", () => {
    it("should support init data", () => {
        var json = o4schema.dataServices.schema[1]
        var schema = new Edm.Schema(json)
        var func = schema.functions[0]
        //console.log(schema.functions)
 
        expect(func).to.be.instanceof(Edm.Function)
        expect(func.parameters).to.have.length(2)
        expect(func.parameters[0]).to.be.instanceof(Edm.Parameter)
        expect(func.parameters[0].name).to.be.equal("bindingParameter")
    })
})

describe("Edm.ComplexType", () => {
    it("should support init data", () => {
        var json = o4schema.dataServices.schema[0]
        var schema = new Edm.Schema(json)
      
        expect(schema.complexTypes).to.have.length(1)
        expect(schema.complexTypes[0]).to.be.instanceof(Edm.ComplexType)
        expect(schema.complexTypes[0].properties[0]).to.be.instanceof(Edm.Property)
        expect(schema.complexTypes[0].properties[0].name).to.be.equal("Address")
        expect(schema.complexTypes[0].properties[0].type).to.equal(Edm.String.toString())
    })
})

describe("Edm.EnumType", () => {
    it("should support init data", () => {
        var json = o4schema.dataServices.schema[0]
        var schema = new Edm.Schema(json)
      
        expect(schema.enumTypes).to.have.length(1)
        expect(schema.enumTypes[0]).to.be.instanceof(Edm.EnumType)
        expect(schema.enumTypes[0].members).to.have.length(3)
        expect(schema.enumTypes[0].members[0]).to.instanceof(Edm.Member)
        expect(schema.enumTypes[0].members[0].name).to.equal("Admin")
        expect(schema.enumTypes[0].members[0].value).to.equal('0')
    })
})