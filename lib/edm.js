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
        return PrimitiveType;
    })();
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
    var mapArray = function (sourceField, factory) { return new metacode.AttributeFunctionChain(function (d, i) { return d[sourceField]; }, function (props, i) { return props || []; }, function (props, i) { return props.map(function (prop) { return factory(prop, i); }); }); };
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
                var v = parser.invoke(definition, _this);
                _this[membername] = v;
            });
        };
        return EdmItemBase;
    })();
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
        return Property;
    })(EdmItemBase);
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
        return NavigationProperty;
    })(EdmItemBase);
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
    })(EdmItemBase);
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
    })(EdmItemBase);
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
    })(EdmItemBase);
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
        return EntityType;
    })(EdmItemBase);
    Edm.EntityType = EntityType;
})(Edm = exports.Edm || (exports.Edm = {}));
