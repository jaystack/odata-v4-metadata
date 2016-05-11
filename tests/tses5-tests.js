/// <reference path="../lib/Edm.d.ts" />

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
                { name: "p1" }, { name: "p2" }, { name: "p3" }
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
                { property: "p1" }, { property: "p2" }, { property: "p3" }
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
                    name: "np1",
                    referentialConstraint: [
                        { property: "np1" }, { property: "p2" }, { property: "p3" }
                    ]

                }
            ],
            property: [
                { name: "p1" }, { name: "p2" }, { name: "p3" }
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

describe("Edm.Edmx", () => {
    it("should support initialize name from init data (edmx)", () => {
        var d = new Edm.Edmx(nwindSchema)
        var s = d.dataServices.schemas[0]
        //s.
        expect(s.entityTypes).to.have.length(26)
        expect(s.entityTypes[0]).to.be.instanceof(Edm.EntityType)
        expect(s.entityTypes[0].key.propertyRefs[0]).to.be.instanceof(Edm.PropertyRef)
        expect(s.entityTypes[0].key.propertyRefs[0].name).to.equal("CategoryID")
    })
})

describe("Edm.Reference", () => {
    it("should support initialize name from init data (edmx)", () => {
        var d = new Edm.Edmx(nwindSchema)

        expect(d.references).to.have.length(2)
        expect(d.references[0]).to.be.instanceof(Edm.Reference)
        expect(d.references[0].includes).to.have.length(1)
        expect(d.references[0].includes[0]).to.be.instanceof(Edm.ReferenceInclude)
        expect(d.references[0].includes[0].namespace).to.equal("Org.OData.Core.V1")
        expect(d.references[0].includes[0].alias).to.equal("Core")
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

describe("Edm.Annotations", () => {
    var attributeCount = 5;

    it("Edm.BoolAnnotation attribute", () => {
        var json = o4schema.dataServices.schema[0]
        var schema = new Edm.Schema(json)

        expect(schema.annotations).to.have.length(attributeCount)
        expect(schema.annotations[0]).to.be.instanceof(Edm.Annotations)
        expect(schema.annotations[0].annotations).to.have.length(1)
        expect(schema.annotations[0].annotations[0]).to.instanceof(Edm.BoolAnnotation)
        expect(schema.annotations[0].annotations[0].term).to.equal("Org.OData.Core.V1.Computed")
        expect(schema.annotations[0].annotations[0].bool).to.equal("true")
    })

    it("Edm.BoolAnnotation child", () => {
        var json = o4schema.dataServices.schema[0]
        var schema = new Edm.Schema(json)

        expect(schema.annotations).to.have.length(attributeCount)
        expect(schema.annotations[1]).to.be.instanceof(Edm.Annotations)
        expect(schema.annotations[1].annotations).to.have.length(1)
        expect(schema.annotations[1].annotations[0]).to.instanceof(Edm.BoolAnnotation)
        expect(schema.annotations[1].annotations[0].term).to.equal("Org.OData.Core.V1.Computed")
        expect(schema.annotations[1].annotations[0].bool).to.equal("true")
    })
    it("Edm.StringAnnotation attribute", () => {
        var json = o4schema.dataServices.schema[0]
        var schema = new Edm.Schema(json)

        expect(schema.annotations).to.have.length(attributeCount)
        expect(schema.annotations[2]).to.be.instanceof(Edm.Annotations)
        expect(schema.annotations[2].annotations).to.have.length(1)
        expect(schema.annotations[2].annotations[0]).to.instanceof(Edm.StringAnnotation)
        expect(schema.annotations[2].annotations[0].term).to.equal("UI.DisplayName")
        expect(schema.annotations[2].annotations[0].string).to.equal("Lead")
    })

    it("Edm.StringAnnotation child", () => {
        var json = o4schema.dataServices.schema[0]
        var schema = new Edm.Schema(json)

        expect(schema.annotations).to.have.length(attributeCount)
        expect(schema.annotations[3]).to.be.instanceof(Edm.Annotations)
        expect(schema.annotations[3].annotations).to.have.length(1)
        expect(schema.annotations[3].annotations[0]).to.instanceof(Edm.StringAnnotation)
        expect(schema.annotations[3].annotations[0].term).to.equal("UI.DisplayName")
        expect(schema.annotations[3].annotations[0].string).to.equal("Lead")
    })

    it("Multiple annotations", () => {
        var json = o4schema.dataServices.schema[0]
        var schema = new Edm.Schema(json)

        expect(schema.annotations).to.have.length(attributeCount)
        expect(schema.annotations[4]).to.be.instanceof(Edm.Annotations)
        expect(schema.annotations[4].annotations).to.have.length(2)

        expect(schema.annotations[4].annotations[0]).to.instanceof(Edm.BoolAnnotation)
        expect(schema.annotations[4].annotations[0].term).to.equal("Org.OData.Core.V1.Computed")
        expect(schema.annotations[4].annotations[0].bool).to.equal("true")

        expect(schema.annotations[4].annotations[1]).to.instanceof(Edm.StringAnnotation)
        expect(schema.annotations[4].annotations[1].term).to.equal("UI.DisplayName")
        expect(schema.annotations[4].annotations[1].string).to.equal("Identifier")
    })

    it("Edm.Annotation on property", () => {
        var p = {
            name: "h",
            property: [
                { name: "p1" },
                { name: "p2" },
                {
                    name: "p3",
                    annotation: [
                        {
                            term: "UI.DisplayName"
                        }
                    ]
                }
            ]
        }
        var ed = new Edm.EntityType(p, {})
        expect(ed.properties[2]).to.be.instanceof(Edm.Property)
        expect(ed.properties[2].name).to.equal("p3")
        expect(ed.properties[2].annotations[0]).to.be.instanceof(Edm.Annotation)
        expect(ed.properties[2].annotations[0].term).to.equal("UI.DisplayName")
    })

    it("Edm.Annotation on navigationProperty", () => {
        var p = {
            name: "h",
            navigationProperty: [
                { name: "p1" },
                { name: "p2" },
                {
                    name: "p3",
                    annotation: [
                        {
                            term: "UI.DisplayName"
                        }
                    ]
                }
            ]
        }
        var ed = new Edm.EntityType(p, {})
        expect(ed.navigationProperties[2]).to.be.instanceof(Edm.NavigationProperty)
        expect(ed.navigationProperties[2].name).to.equal("p3")
        expect(ed.navigationProperties[2].annotations[0]).to.be.instanceof(Edm.Annotation)
        expect(ed.navigationProperties[2].annotations[0].term).to.equal("UI.DisplayName")
    })

    it("Edm.Annotation on type", () => {
        var p = {
            name: "h",
            property: [
                { name: "p1" },
                { name: "p2" },
                { name: "p3" }
            ],
            annotation: [
                {
                    term: "UI.DisplayName",
                    string: 'hh'
                }
            ]
        }
        var ed = new Edm.EntityType(p, {})
        expect(ed.properties[2]).to.be.instanceof(Edm.Property)
        expect(ed.properties[2].name).to.equal("p3")
        expect(ed.annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.annotations[0].term).to.equal("UI.DisplayName")
        expect(ed.annotations[0].string).to.equal("hh")
    })

    it("Edm.Annotation on complex type", () => {
        var p = {
            name: "h",
            property: [
                { name: "p1" },
                { name: "p2" },
                { name: "p3" }
            ],
            annotation: [
                {
                    term: "UI.DisplayName",
                    string: 'hh'
                }
            ]
        }
        var ed = new Edm.ComplexType(p, {})
        expect(ed.properties[2]).to.be.instanceof(Edm.Property)
        expect(ed.properties[2].name).to.equal("p3")
        expect(ed.annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.annotations[0].term).to.equal("UI.DisplayName")
        expect(ed.annotations[0].string).to.equal("hh")
    })

    it("Edm.Annotation on type for property", () => {
        var p = {
            name: "h",
            property: [
                { name: "p1" },
                { name: "p2" },
                { name: "p3" }
            ],
            annotation: [
                {
                    term: "UI.DisplayName",
                    string: 'hh',
                    path: 'p3'
                }
            ]
        }
        var ed = new Edm.EntityType(p, {})
        expect(ed.properties[2]).to.be.instanceof(Edm.Property)
        expect(ed.properties[2].name).to.equal("p3")
        expect(ed.annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.annotations[0].term).to.equal("UI.DisplayName")
        expect(ed.annotations[0].string).to.equal("hh")
        expect(ed.annotations[0].path).to.equal("p3")
    })

    it("Edm.Annotation on action parameter", () => {
        var p = {
            name: "h",
            parameter: [
                { name: "p1", type: "Edm.String" },
                { name: "p2", type: "Edm.Int32" },
                {
                    name: "p3",
                    type: "Edm.String",
                    annotation: [
                        {
                            term: "UI.ControlHint",
                            string: 'hh'
                        }
                    ]
                }
            ]
        }
        var ed = new Edm.Action(p, {})
        expect(ed.parameters[2]).to.be.instanceof(Edm.Parameter)
        expect(ed.parameters[2].name).to.equal("p3")
        expect(ed.parameters[2].annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.parameters[2].annotations[0].term).to.equal("UI.ControlHint")
        expect(ed.parameters[2].annotations[0].string).to.equal("hh")
    })

    it("Edm.Annotation on action returnType", () => {
        var p = {
            name: "h",
            parameter: [
                { name: "p1", type: "Edm.String" },
                { name: "p2", type: "Edm.Int32" },
                { name: "p3", type: "Edm.String" }
            ],
            returnType: {
                type: "Edm.String",
                annotation: [
                    {
                        term: "UI.ControlHint",
                        string: 'hh'
                    }
                ]
            }
        }
        var ed = new Edm.Action(p, {})
        expect(ed.returnType).to.be.instanceof(Edm.ReturnType)
        expect(ed.returnType.type).to.equal("Edm.String")
        expect(ed.returnType.annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.returnType.annotations[0].term).to.equal("UI.ControlHint")
        expect(ed.returnType.annotations[0].string).to.equal("hh")
    })

    it("Edm.Annotation on action", () => {
        var p = {
            name: "h",
            parameter: [
                { name: "p1", type: "Edm.String" },
                { name: "p2", type: "Edm.Int32" },
                { name: "p3", type: "Edm.String" }
            ],
            annotation: [
                {
                    term: "UI.ControlHint",
                    string: 'hh',
                    path: 'p3'
                }
            ]
        }
        var ed = new Edm.Action(p, {})
        expect(ed.parameters[2]).to.be.instanceof(Edm.Parameter)
        expect(ed.parameters[2].name).to.equal("p3")
        expect(ed.annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.annotations[0].term).to.equal("UI.ControlHint")
        expect(ed.annotations[0].string).to.equal("hh")
        expect(ed.annotations[0].path).to.equal("p3")
    })

    it("Edm.Annotation on function parameter", () => {
        var p = {
            name: "h",
            parameter: [
                { name: "p1", type: "Edm.String" },
                { name: "p2", type: "Edm.Int32" },
                {
                    name: "p3",
                    type: "Edm.String",
                    annotation: [
                        {
                            term: "UI.ControlHint",
                            string: 'hh'
                        }
                    ]
                }
            ]
        }
        var ed = new Edm.Function(p, {})
        expect(ed.parameters[2]).to.be.instanceof(Edm.Parameter)
        expect(ed.parameters[2].name).to.equal("p3")
        expect(ed.parameters[2].annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.parameters[2].annotations[0].term).to.equal("UI.ControlHint")
        expect(ed.parameters[2].annotations[0].string).to.equal("hh")
    })

    it("Edm.Annotation on function returnType", () => {
        var p = {
            name: "h",
            parameter: [
                { name: "p1", type: "Edm.String" },
                { name: "p2", type: "Edm.Int32" },
                { name: "p3", type: "Edm.String" }
            ],
            returnType: {
                type: "Edm.String",
                annotation: [
                    {
                        term: "UI.ControlHint",
                        string: 'hh'
                    }
                ]
            }
        }
        var ed = new Edm.Function(p, {})
        expect(ed.returnType).to.be.instanceof(Edm.ReturnType)
        expect(ed.returnType.type).to.equal("Edm.String")
        expect(ed.returnType.annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.returnType.annotations[0].term).to.equal("UI.ControlHint")
        expect(ed.returnType.annotations[0].string).to.equal("hh")
    })

    it("Edm.Annotation on function", () => {
        var p = {
            name: "h",
            parameter: [
                { name: "p1", type: "Edm.String" },
                { name: "p2", type: "Edm.Int32" },
                { name: "p3", type: "Edm.String" }
            ],
            annotation: [
                {
                    term: "UI.ControlHint",
                    string: 'hh',
                    path: 'p3'
                }
            ]
        }
        var ed = new Edm.Function(p, {})
        expect(ed.parameters[2]).to.be.instanceof(Edm.Parameter)
        expect(ed.parameters[2].name).to.equal("p3")
        expect(ed.annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.annotations[0].term).to.equal("UI.ControlHint")
        expect(ed.annotations[0].string).to.equal("hh")
        expect(ed.annotations[0].path).to.equal("p3")
    })

    it("Edm.Annotation on EnumType", () => {
        var p = {
            "name": "UserType",
            "member": [
                {
                    "name": "Admin",
                    "value": "0"
                },
                {
                    "name": "Customer",
                    "value": "1"
                },
                {
                    "name": "Guest",
                    "value": "2"
                }
            ],
            annotation: [
                {
                    term: "UI.ControlHint",
                    string: 'hh',
                    path: 'Guest'
                }
            ]
        }
        var ed = new Edm.EnumType(p, {})
        expect(ed.members[2]).to.be.instanceof(Edm.Member)
        expect(ed.members[2].name).to.equal("Guest")
        expect(ed.annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.annotations[0].term).to.equal("UI.ControlHint")
        expect(ed.annotations[0].string).to.equal("hh")
        expect(ed.annotations[0].path).to.equal("Guest")
    })

    it("Edm.Annotation on EnumType member", () => {
        var p = {
            "name": "UserType",
            "member": [
                {
                    "name": "Admin",
                    "value": "0"
                },
                {
                    "name": "Customer",
                    "value": "1"
                },
                {
                    "name": "Guest",
                    "value": "2",
                    "annotation": [
                        {
                            term: "UI.ControlHint",
                            string: 'hh'
                        }
                    ]
                }
            ]
        }
        var ed = new Edm.EnumType(p, {})
        expect(ed.members[2]).to.be.instanceof(Edm.Member)
        expect(ed.members[2].name).to.equal("Guest")
        expect(ed.members[2].annotations[0]).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.members[2].annotations[0].term).to.equal("UI.ControlHint")
        expect(ed.members[2].annotations[0].string).to.equal("hh")
    })

    it("Edm.Annotation on EntitySet", () => {
        var p = {
            "name": "Articles",
            "entityType": "JayData.Test.CommonItems.Entities.Article",
            "navigationPropertyBinding": [
                {
                    "path": "Category",
                    "target": "Categories"
                },
                {
                    "path": "Tags",
                    "target": "TagConnections"
                },
                {
                    "path": "Author",
                    "target": "Users"
                },
                {
                    "path": "Reviewer",
                    "target": "Users"
                }
            ],
            "annotation": [
                {
                    "term": "Org.OData.Core.V1.OptimisticConcurrency",
                    "collection": [
                        {
                            "propertyPath": [
                                {
                                    "text": "RowVersion"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        var ed = new Edm.EntitySet(p, {})
        expect(ed.annotations[0]).to.be.instanceof(Edm.PropertyPathAnnotation)
        expect(ed.annotations[0].term).to.equal("Org.OData.Core.V1.OptimisticConcurrency")
        expect(ed.annotations[0].propertyPaths).to.deep.equal(["RowVersion"])
    })

    it("Edm.StringAnnotation collection value", () => {
        var p = {
            "term": "org.example.seo.SeoTerms",
            "collection": [
                {
                    "string": [
                        {
                            "text": "Product"
                        },
                        {
                            "text": "Supplier"
                        },
                        {
                            "text": "Customer"
                        }
                    ]
                }
            ]
        }
        var ed = new Edm.StringAnnotation(p, {})

        expect(ed).to.be.instanceof(Edm.StringAnnotation)
        expect(ed.term).to.equal("org.example.seo.SeoTerms")
        expect(ed.string).to.deep.equal(["Product", "Supplier", "Customer"])

    })

    it("Edm.NullAnnotation", () => {
        var p = {
            "name": "Description",
            "type": "Edm.String",
            "annotation": [
                {
                    "term": "org.example.display.DisplayName",
                    "null": [
                        {}
                    ]
                }
            ]
        }
        var ed = new Edm.Property(p, {})
        expect(ed.annotations[0]).to.be.instanceof(Edm.NullAnnotation)
        expect(ed.annotations[0].term).to.equal("org.example.display.DisplayName")
        expect(ed.annotations[0].null).to.be.undefined
    })
})




