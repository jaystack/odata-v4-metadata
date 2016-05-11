"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var metacode = require('./metacode');
var Edm;
(function (Edm) {
    var PrimitiveType = (function () {
        function PrimitiveType(className) {
            this.className = className;
        }
        PrimitiveType.prototype.toString = function () { return this.className; };
        return PrimitiveType;
    }());
    Edm.PrimitiveType = PrimitiveType;
    Edm.Binary = new PrimitiveType('Edm.Binary');
    Edm.Boolean = new PrimitiveType('Edm.Boolean');
    Edm.Byte = new PrimitiveType('Edm.Byte');
    Edm.Date = new PrimitiveType('Edm.Date');
    Edm.DateTimeOffset = new PrimitiveType('Edm.DateTimeOffset');
    Edm.Decimal = new PrimitiveType('Edm.Decimal');
    Edm.Double = new PrimitiveType('Edm.Double');
    Edm.Duration = new PrimitiveType('Edm.Duration');
    Edm.Guid = new PrimitiveType('Edm.Guid');
    Edm.Int16 = new PrimitiveType('Edm.Int16');
    Edm.Int32 = new PrimitiveType('Edm.Int32');
    Edm.Int64 = new PrimitiveType('Edm.Int64');
    Edm.SByte = new PrimitiveType('Edm.SByte');
    Edm.Single = new PrimitiveType('Edm.Single');
    Edm.Stream = new PrimitiveType('Edm.Stream');
    Edm.String = new PrimitiveType('Edm.String');
    Edm.TimeOfDay = new PrimitiveType('Edm.TimeOfDay');
    Edm.Geography = new PrimitiveType('Edm.Geography');
    Edm.GeographyPoint = new PrimitiveType('Edm.GeographyPoint');
    Edm.GeographyLineString = new PrimitiveType('Edm.GeographyLineString');
    Edm.GeographyPolygon = new PrimitiveType('Edm.GeographyPolygon');
    Edm.GeographyMultiPoint = new PrimitiveType('Edm.GeographyMultiPoint');
    Edm.GeographyMultiLineString = new PrimitiveType('Edm.GeographyMultiLineString');
    Edm.GeographyMultiPolygon = new PrimitiveType('Edm.GeographyMultiPolygon');
    Edm.GeographyCollection = new PrimitiveType('Edm.GeographyCollection');
    Edm.Geometry = new PrimitiveType('Edm.Geometry');
    Edm.GeometryPoint = new PrimitiveType('Edm.GeometryPoint');
    Edm.GeometryLineString = new PrimitiveType('Edm.GeometryLineString');
    Edm.GeometryPolygon = new PrimitiveType('Edm.GeometryPolygon');
    Edm.GeometryMultiPoint = new PrimitiveType('Edm.GeometryMultiPoint');
    Edm.GeometryMultiLineString = new PrimitiveType('Edm.GeometryMultiLineString');
    Edm.GeometryMultiPolygon = new PrimitiveType('Edm.GeometryMultiPolygon');
    Edm.GeometryCollection = new PrimitiveType('Edm.GeometryCollection');
    var MemberAttribute = metacode.MemberAttribute;
    var parse = metacode.parse;
    var required = metacode.required;
    var defaultValue = metacode.defaultValue;
    var parseAs = metacode.parseAs;
    var AttributeFunctionChain = metacode.AttributeFunctionChain;
    var mapArray = function (sourceField, factory) { return new metacode.AttributeFunctionChain(function (d, i) { return d[sourceField]; }, function (props, i) { return Array.isArray(props) ? props : (props ? [props] : []); }, function (props, i) { return props.map(function (prop) { return factory(prop, i); }); }); };
    var primitiveAnnotationValue = function (sourceField) { return new metacode.AttributeFunctionChain(function (d, i) {
        if (d['collection'] && d['collection'][0] && Array.isArray(d['collection'][0][sourceField]) && !d[sourceField]) {
            return d['collection'][0][sourceField].map(function (x) { return x.text; });
        }
        var props = d[sourceField];
        if (Array.isArray(props)) {
            return props.filter(function (x) { return 'text' in x; }).map(function (x) { return x.text; })[0];
        }
        else {
            return props;
        }
    }); };
    var annotationTypeSelector = function (source) {
        for (var i in Edm.AnnotationTypes) {
            if (i in source || (source['collection'] && source['collection'][0] && i in source['collection'][0])) {
                return Edm.AnnotationTypes[i];
            }
        }
        return Annotation;
    };
    var EdmItemBase = (function () {
        function EdmItemBase(definition, parent) {
            this.parent = parent;
            definition && this.loadFrom(definition);
        }
        EdmItemBase.prototype.loadFrom = function (definition) {
            var _this = this;
            var proto = Object.getPrototypeOf(this);
            MemberAttribute.getMembers(proto).forEach(function (membername) {
                var parser = MemberAttribute.getAttributeValue(proto, membername, "serialize");
                if (parser) {
                    var v = parser.invoke(definition, _this);
                    _this[membername] = v;
                }
            });
        };
        return EdmItemBase;
    }());
    Edm.EdmItemBase = EdmItemBase;
    var Property = (function (_super) {
        __extends(Property, _super);
        function Property() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], Property.prototype, "name", void 0);
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], Property.prototype, "type", void 0);
        __decorate([
            parse,
            defaultValue(true), 
            __metadata('design:type', Boolean)
        ], Property.prototype, "nullable", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Number)
        ], Property.prototype, "maxLength", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Number)
        ], Property.prototype, "precision", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Number)
        ], Property.prototype, "scale", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], Property.prototype, "unicode", void 0);
        __decorate([
            parse,
            defaultValue(0), 
            __metadata('design:type', Number)
        ], Property.prototype, "SRID", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Object)
        ], Property.prototype, "defaultValue", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Object)
        ], Property.prototype, "concurrencyMode", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], Property.prototype, "annotations", void 0);
        return Property;
    }(EdmItemBase));
    Edm.Property = Property;
    var NavigationProperty = (function (_super) {
        __extends(NavigationProperty, _super);
        function NavigationProperty() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], NavigationProperty.prototype, "name", void 0);
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], NavigationProperty.prototype, "type", void 0);
        __decorate([
            parse,
            defaultValue(true), 
            __metadata('design:type', Boolean)
        ], NavigationProperty.prototype, "nullable", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], NavigationProperty.prototype, "partner", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], NavigationProperty.prototype, "containsTarget", void 0);
        __decorate([
            parseAs(mapArray("referentialConstraint", function (prop, i) { return new ReferentialConstraint(prop, i); })), 
            __metadata('design:type', Array)
        ], NavigationProperty.prototype, "referentialConstraints", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], NavigationProperty.prototype, "annotations", void 0);
        return NavigationProperty;
    }(EdmItemBase));
    Edm.NavigationProperty = NavigationProperty;
    var ReferentialConstraint = (function (_super) {
        __extends(ReferentialConstraint, _super);
        function ReferentialConstraint() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], ReferentialConstraint.prototype, "property", void 0);
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], ReferentialConstraint.prototype, "referencedProperty", void 0);
        return ReferentialConstraint;
    }(EdmItemBase));
    Edm.ReferentialConstraint = ReferentialConstraint;
    var PropertyRef = (function (_super) {
        __extends(PropertyRef, _super);
        function PropertyRef() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], PropertyRef.prototype, "name", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], PropertyRef.prototype, "alias", void 0);
        return PropertyRef;
    }(EdmItemBase));
    Edm.PropertyRef = PropertyRef;
    var Key = (function (_super) {
        __extends(Key, _super);
        function Key() {
            _super.apply(this, arguments);
        }
        __decorate([
            parseAs(mapArray("propertyRef", function (prop, i) { return new PropertyRef(prop, i); })), 
            __metadata('design:type', Array)
        ], Key.prototype, "propertyRefs", void 0);
        return Key;
    }(EdmItemBase));
    Edm.Key = Key;
    var EntityType = (function (_super) {
        __extends(EntityType, _super);
        function EntityType() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], EntityType.prototype, "name", void 0);
        __decorate([
            parseAs(new AttributeFunctionChain(function (d, i) { return d.key; }, function (props, i) { return props || []; }, function (props, i) { return props.map(function (prop) { return new Key(prop, i); }); }, function (props) { return props[0]; })), 
            __metadata('design:type', Key)
        ], EntityType.prototype, "key", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], EntityType.prototype, "baseType", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], EntityType.prototype, "abstract", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], EntityType.prototype, "openType", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], EntityType.prototype, "hasStream", void 0);
        __decorate([
            parseAs(mapArray("property", function (prop, i) { return new Property(prop, i); })), 
            __metadata('design:type', Array)
        ], EntityType.prototype, "properties", void 0);
        __decorate([
            parseAs(mapArray("navigationProperty", function (prop, i) { return new NavigationProperty(prop, i); })), 
            __metadata('design:type', Array)
        ], EntityType.prototype, "navigationProperties", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], EntityType.prototype, "annotations", void 0);
        return EntityType;
    }(EdmItemBase));
    Edm.EntityType = EntityType;
    var ComplexType = (function (_super) {
        __extends(ComplexType, _super);
        function ComplexType() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], ComplexType.prototype, "name", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], ComplexType.prototype, "baseType", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], ComplexType.prototype, "abstract", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], ComplexType.prototype, "openType", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], ComplexType.prototype, "hasStream", void 0);
        __decorate([
            parseAs(mapArray("property", function (prop, i) { return new Property(prop, i); })), 
            __metadata('design:type', Array)
        ], ComplexType.prototype, "properties", void 0);
        __decorate([
            parseAs(mapArray("navigationProperty", function (prop, i) { return new NavigationProperty(prop, i); })), 
            __metadata('design:type', Array)
        ], ComplexType.prototype, "navigationProperties", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], ComplexType.prototype, "annotations", void 0);
        return ComplexType;
    }(EdmItemBase));
    Edm.ComplexType = ComplexType;
    var Parameter = (function (_super) {
        __extends(Parameter, _super);
        function Parameter() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], Parameter.prototype, "name", void 0);
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], Parameter.prototype, "type", void 0);
        __decorate([
            parse,
            defaultValue(true), 
            __metadata('design:type', Boolean)
        ], Parameter.prototype, "nullable", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Number)
        ], Parameter.prototype, "maxLength", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Number)
        ], Parameter.prototype, "precision", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Number)
        ], Parameter.prototype, "scale", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], Parameter.prototype, "unicode", void 0);
        __decorate([
            parse,
            defaultValue(0), 
            __metadata('design:type', Number)
        ], Parameter.prototype, "SRID", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], Parameter.prototype, "annotations", void 0);
        return Parameter;
    }(EdmItemBase));
    Edm.Parameter = Parameter;
    var ReturnType = (function (_super) {
        __extends(ReturnType, _super);
        function ReturnType() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], ReturnType.prototype, "type", void 0);
        __decorate([
            parse,
            defaultValue(true), 
            __metadata('design:type', Boolean)
        ], ReturnType.prototype, "nullable", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], ReturnType.prototype, "annotations", void 0);
        return ReturnType;
    }(EdmItemBase));
    Edm.ReturnType = ReturnType;
    var Invokable = (function (_super) {
        __extends(Invokable, _super);
        function Invokable() {
            _super.apply(this, arguments);
        }
        return Invokable;
    }(EdmItemBase));
    Edm.Invokable = Invokable;
    var Action = (function (_super) {
        __extends(Action, _super);
        function Action() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], Action.prototype, "name", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], Action.prototype, "isBound", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], Action.prototype, "entitySetPath", void 0);
        __decorate([
            parseAs(mapArray("parameter", function (prop, i) { return new Parameter(prop, i); })), 
            __metadata('design:type', Array)
        ], Action.prototype, "parameters", void 0);
        __decorate([
            parseAs(new AttributeFunctionChain(function (d, i) { return d.returnType; }, function (rt, i) { return new ReturnType(rt, i); })), 
            __metadata('design:type', ReturnType)
        ], Action.prototype, "returnType", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], Action.prototype, "annotations", void 0);
        return Action;
    }(Invokable));
    Edm.Action = Action;
    var Function = (function (_super) {
        __extends(Function, _super);
        function Function() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], Function.prototype, "name", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], Function.prototype, "isBound", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], Function.prototype, "entitySetPath", void 0);
        __decorate([
            parseAs(mapArray("parameter", function (prop, i) { return new Parameter(prop, i); })), 
            __metadata('design:type', Array)
        ], Function.prototype, "parameters", void 0);
        __decorate([
            parseAs(new AttributeFunctionChain(function (d, i) { return d.returnType; }, function (rt, i) { return new ReturnType(rt, i); })), 
            __metadata('design:type', ReturnType)
        ], Function.prototype, "returnType", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], Function.prototype, "isComposable", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], Function.prototype, "annotations", void 0);
        return Function;
    }(Invokable));
    Edm.Function = Function;
    var Member = (function (_super) {
        __extends(Member, _super);
        function Member() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], Member.prototype, "name", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Number)
        ], Member.prototype, "value", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], Member.prototype, "annotations", void 0);
        return Member;
    }(EdmItemBase));
    Edm.Member = Member;
    var EnumType = (function (_super) {
        __extends(EnumType, _super);
        function EnumType() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], EnumType.prototype, "name", void 0);
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], EnumType.prototype, "namespace", void 0);
        __decorate([
            parse,
            defaultValue(Edm.Int32), 
            __metadata('design:type', PrimitiveType)
        ], EnumType.prototype, "underlyingType", void 0);
        __decorate([
            parse, 
            __metadata('design:type', Boolean)
        ], EnumType.prototype, "isFlags", void 0);
        __decorate([
            parseAs(mapArray("member", function (prop, i) { return new Member(prop, i); })), 
            __metadata('design:type', Array)
        ], EnumType.prototype, "members", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], EnumType.prototype, "annotations", void 0);
        return EnumType;
    }(EdmItemBase));
    Edm.EnumType = EnumType;
    var EntitySet = (function (_super) {
        __extends(EntitySet, _super);
        function EntitySet() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], EntitySet.prototype, "name", void 0);
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], EntitySet.prototype, "entityType", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], EntitySet.prototype, "annotations", void 0);
        return EntitySet;
    }(EdmItemBase));
    Edm.EntitySet = EntitySet;
    var ActionImport = (function (_super) {
        __extends(ActionImport, _super);
        function ActionImport() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], ActionImport.prototype, "name", void 0);
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], ActionImport.prototype, "action", void 0);
        return ActionImport;
    }(EdmItemBase));
    Edm.ActionImport = ActionImport;
    var FunctionImport = (function (_super) {
        __extends(FunctionImport, _super);
        function FunctionImport() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], FunctionImport.prototype, "name", void 0);
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], FunctionImport.prototype, "function", void 0);
        __decorate([
            parse,
            defaultValue(false), 
            __metadata('design:type', Boolean)
        ], FunctionImport.prototype, "includeInServiceDocument", void 0);
        return FunctionImport;
    }(EdmItemBase));
    Edm.FunctionImport = FunctionImport;
    var EntityContainer = (function (_super) {
        __extends(EntityContainer, _super);
        function EntityContainer() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], EntityContainer.prototype, "name", void 0);
        __decorate([
            parseAs(mapArray("entitySet", function (prop, i) { return new EntitySet(prop, i); })), 
            __metadata('design:type', Array)
        ], EntityContainer.prototype, "entitySets", void 0);
        __decorate([
            parseAs(mapArray("actionImport", function (prop, i) { return new ActionImport(prop, i); })), 
            __metadata('design:type', Array)
        ], EntityContainer.prototype, "actionImports", void 0);
        __decorate([
            parseAs(mapArray("functionImport", function (prop, i) { return new FunctionImport(prop, i); })), 
            __metadata('design:type', Array)
        ], EntityContainer.prototype, "functionImports", void 0);
        return EntityContainer;
    }(EdmItemBase));
    Edm.EntityContainer = EntityContainer;
    var Schema = (function (_super) {
        __extends(Schema, _super);
        function Schema() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], Schema.prototype, "namespace", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], Schema.prototype, "alias", void 0);
        __decorate([
            parseAs(mapArray("enumType", function (prop, i) { return new EnumType(prop, i); })), 
            __metadata('design:type', Array)
        ], Schema.prototype, "enumTypes", void 0);
        __decorate([
            parseAs(mapArray("complexType", function (prop, i) { return new ComplexType(prop, i); })), 
            __metadata('design:type', Array)
        ], Schema.prototype, "complexTypes", void 0);
        __decorate([
            parseAs(mapArray("entityType", function (prop, i) { return new EntityType(prop, i); })), 
            __metadata('design:type', Array)
        ], Schema.prototype, "entityTypes", void 0);
        __decorate([
            parseAs(mapArray("action", function (prop, i) { return new Action(prop, i); })), 
            __metadata('design:type', Array)
        ], Schema.prototype, "actions", void 0);
        __decorate([
            parseAs(mapArray("function", function (prop, i) { return new Edm.Function(prop, i); })), 
            __metadata('design:type', Array)
        ], Schema.prototype, "functions", void 0);
        __decorate([
            parseAs(mapArray("entityContainer", function (prop, i) { return new Edm.EntityContainer(prop, i); })), 
            __metadata('design:type', Array)
        ], Schema.prototype, "entityContainer", void 0);
        __decorate([
            parseAs(mapArray("annotations", function (prop, i) { return new Edm.Annotations(prop, i); })), 
            __metadata('design:type', Array)
        ], Schema.prototype, "annotations", void 0);
        return Schema;
    }(EdmItemBase));
    Edm.Schema = Schema;
    var DataServices = (function (_super) {
        __extends(DataServices, _super);
        function DataServices() {
            _super.apply(this, arguments);
        }
        __decorate([
            parseAs(mapArray("schema", function (prop, i) { return new Schema(prop, i); })), 
            __metadata('design:type', Array)
        ], DataServices.prototype, "schemas", void 0);
        return DataServices;
    }(EdmItemBase));
    Edm.DataServices = DataServices;
    var Reference = (function (_super) {
        __extends(Reference, _super);
        function Reference() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], Reference.prototype, "uri", void 0);
        __decorate([
            parseAs(mapArray("include", function (prop, i) { return new ReferenceInclude(prop, i); })), 
            __metadata('design:type', Array)
        ], Reference.prototype, "includes", void 0);
        return Reference;
    }(EdmItemBase));
    Edm.Reference = Reference;
    var ReferenceInclude = (function (_super) {
        __extends(ReferenceInclude, _super);
        function ReferenceInclude() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], ReferenceInclude.prototype, "namespace", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], ReferenceInclude.prototype, "alias", void 0);
        return ReferenceInclude;
    }(EdmItemBase));
    Edm.ReferenceInclude = ReferenceInclude;
    var Edmx = (function (_super) {
        __extends(Edmx, _super);
        function Edmx() {
            _super.apply(this, arguments);
        }
        __decorate([
            parseAs(new AttributeFunctionChain(function (edm) { return new Edm.DataServices(edm.dataServices); })), 
            __metadata('design:type', DataServices)
        ], Edmx.prototype, "dataServices", void 0);
        __decorate([
            parseAs(mapArray("reference", function (prop, i) { return new Reference(prop, i); })), 
            __metadata('design:type', Array)
        ], Edmx.prototype, "references", void 0);
        return Edmx;
    }(EdmItemBase));
    Edm.Edmx = Edmx;
    var Annotations = (function (_super) {
        __extends(Annotations, _super);
        function Annotations() {
            _super.apply(this, arguments);
        }
        __decorate([
            parse,
            required, 
            __metadata('design:type', String)
        ], Annotations.prototype, "target", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], Annotations.prototype, "qualifier", void 0);
        __decorate([
            parseAs(mapArray("annotation", function (prop, i) { return new (annotationTypeSelector(prop))(prop, i); })), 
            __metadata('design:type', Array)
        ], Annotations.prototype, "annotations", void 0);
        return Annotations;
    }(EdmItemBase));
    Edm.Annotations = Annotations;
    var Annotation = (function (_super) {
        __extends(Annotation, _super);
        function Annotation() {
            _super.apply(this, arguments);
            this.annotationType = "Unknown";
        }
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], Annotation.prototype, "term", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], Annotation.prototype, "qualifier", void 0);
        __decorate([
            parse, 
            __metadata('design:type', String)
        ], Annotation.prototype, "path", void 0);
        return Annotation;
    }(EdmItemBase));
    Edm.Annotation = Annotation;
    var BinaryAnnotation = (function (_super) {
        __extends(BinaryAnnotation, _super);
        function BinaryAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "Binary";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("binary")), 
            __metadata('design:type', Object)
        ], BinaryAnnotation.prototype, "binary", void 0);
        return BinaryAnnotation;
    }(Annotation));
    Edm.BinaryAnnotation = BinaryAnnotation;
    var BoolAnnotation = (function (_super) {
        __extends(BoolAnnotation, _super);
        function BoolAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "Bool";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("bool")), 
            __metadata('design:type', Object)
        ], BoolAnnotation.prototype, "bool", void 0);
        return BoolAnnotation;
    }(Annotation));
    Edm.BoolAnnotation = BoolAnnotation;
    var DateAnnotation = (function (_super) {
        __extends(DateAnnotation, _super);
        function DateAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "Date";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("date")), 
            __metadata('design:type', Object)
        ], DateAnnotation.prototype, "date", void 0);
        return DateAnnotation;
    }(Annotation));
    Edm.DateAnnotation = DateAnnotation;
    var DateTimeOffsetAnnotation = (function (_super) {
        __extends(DateTimeOffsetAnnotation, _super);
        function DateTimeOffsetAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "DateTimeOffset";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("dateTimeOffset")), 
            __metadata('design:type', Object)
        ], DateTimeOffsetAnnotation.prototype, "dateTimeOffset", void 0);
        return DateTimeOffsetAnnotation;
    }(Annotation));
    Edm.DateTimeOffsetAnnotation = DateTimeOffsetAnnotation;
    var DecimalAnnotation = (function (_super) {
        __extends(DecimalAnnotation, _super);
        function DecimalAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "Decimal";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("decimal")), 
            __metadata('design:type', Object)
        ], DecimalAnnotation.prototype, "decimal", void 0);
        return DecimalAnnotation;
    }(Annotation));
    Edm.DecimalAnnotation = DecimalAnnotation;
    var DurationAnnotation = (function (_super) {
        __extends(DurationAnnotation, _super);
        function DurationAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "Duration";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("duration")), 
            __metadata('design:type', Object)
        ], DurationAnnotation.prototype, "duration", void 0);
        return DurationAnnotation;
    }(Annotation));
    Edm.DurationAnnotation = DurationAnnotation;
    var EnumMemberAnnotation = (function (_super) {
        __extends(EnumMemberAnnotation, _super);
        function EnumMemberAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "EnumMember";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("enumMember")), 
            __metadata('design:type', Object)
        ], EnumMemberAnnotation.prototype, "enumMember", void 0);
        return EnumMemberAnnotation;
    }(Annotation));
    Edm.EnumMemberAnnotation = EnumMemberAnnotation;
    var FloatAnnotation = (function (_super) {
        __extends(FloatAnnotation, _super);
        function FloatAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "Float";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("float")), 
            __metadata('design:type', Object)
        ], FloatAnnotation.prototype, "float", void 0);
        return FloatAnnotation;
    }(Annotation));
    Edm.FloatAnnotation = FloatAnnotation;
    var GuidAnnotation = (function (_super) {
        __extends(GuidAnnotation, _super);
        function GuidAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "Guid";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("guid")), 
            __metadata('design:type', Object)
        ], GuidAnnotation.prototype, "guid", void 0);
        return GuidAnnotation;
    }(Annotation));
    Edm.GuidAnnotation = GuidAnnotation;
    var IntAnnotation = (function (_super) {
        __extends(IntAnnotation, _super);
        function IntAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "Int";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("int")), 
            __metadata('design:type', Object)
        ], IntAnnotation.prototype, "int", void 0);
        return IntAnnotation;
    }(Annotation));
    Edm.IntAnnotation = IntAnnotation;
    var StringAnnotation = (function (_super) {
        __extends(StringAnnotation, _super);
        function StringAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "String";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("string")), 
            __metadata('design:type', Object)
        ], StringAnnotation.prototype, "string", void 0);
        return StringAnnotation;
    }(Annotation));
    Edm.StringAnnotation = StringAnnotation;
    var TimeOfDayAnnotation = (function (_super) {
        __extends(TimeOfDayAnnotation, _super);
        function TimeOfDayAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "TimeOfDay";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("timeOfDay")), 
            __metadata('design:type', Object)
        ], TimeOfDayAnnotation.prototype, "timeOfDay", void 0);
        return TimeOfDayAnnotation;
    }(Annotation));
    Edm.TimeOfDayAnnotation = TimeOfDayAnnotation;
    var PropertyPathAnnotation = (function (_super) {
        __extends(PropertyPathAnnotation, _super);
        function PropertyPathAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "PropertyPath";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("propertyPath")), 
            __metadata('design:type', Object)
        ], PropertyPathAnnotation.prototype, "propertyPaths", void 0);
        return PropertyPathAnnotation;
    }(Annotation));
    Edm.PropertyPathAnnotation = PropertyPathAnnotation;
    var NavigationPropertyPathAnnotation = (function (_super) {
        __extends(NavigationPropertyPathAnnotation, _super);
        function NavigationPropertyPathAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "NavigationPropertyPath";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("propertyPath")), 
            __metadata('design:type', Object)
        ], NavigationPropertyPathAnnotation.prototype, "navigationPropertyPaths", void 0);
        return NavigationPropertyPathAnnotation;
    }(Annotation));
    Edm.NavigationPropertyPathAnnotation = NavigationPropertyPathAnnotation;
    var AnnotationPathAnnotation = (function (_super) {
        __extends(AnnotationPathAnnotation, _super);
        function AnnotationPathAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "AnnotationPath";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("annotationPath")), 
            __metadata('design:type', Object)
        ], AnnotationPathAnnotation.prototype, "annotationPaths", void 0);
        return AnnotationPathAnnotation;
    }(Annotation));
    Edm.AnnotationPathAnnotation = AnnotationPathAnnotation;
    var NullAnnotation = (function (_super) {
        __extends(NullAnnotation, _super);
        function NullAnnotation() {
            _super.apply(this, arguments);
            this.annotationType = "Null";
        }
        __decorate([
            parseAs(primitiveAnnotationValue("null")), 
            __metadata('design:type', Array)
        ], NullAnnotation.prototype, "null", void 0);
        return NullAnnotation;
    }(Annotation));
    Edm.NullAnnotation = NullAnnotation;
    Edm.AnnotationTypes = {
        binary: BinaryAnnotation,
        bool: BoolAnnotation,
        date: DateAnnotation,
        dateTimeOffset: DateTimeOffsetAnnotation,
        decimal: DecimalAnnotation,
        duration: DurationAnnotation,
        enumMember: EnumMemberAnnotation,
        float: FloatAnnotation,
        guid: GuidAnnotation,
        int: IntAnnotation,
        string: StringAnnotation,
        timeOfDay: TimeOfDayAnnotation,
        propertyPath: PropertyPathAnnotation,
        navigationPropertyPath: NavigationPropertyPathAnnotation,
        annotationPath: AnnotationPathAnnotation,
        null: NullAnnotation
    };
})(Edm = exports.Edm || (exports.Edm = {}));
//# sourceMappingURL=edm.js.map