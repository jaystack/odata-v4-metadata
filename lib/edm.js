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
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
require('reflect-metadata');
function isFunction(o) {
    return "function" === typeof o;
}
function isUndefined(o) {
    return o === undefined;
}
var MemberAttribute = (function () {
    function MemberAttribute(attributeName) {
        this.attributeName = attributeName;
    }
    MemberAttribute.prototype.registerMember = function (target, key) {
        var md = (Reflect.getMetadata("members", target) || []);
        if (md.indexOf(key) < 0) {
            md.push(key);
        }
        Reflect.defineMetadata("members", md, target);
    };
    MemberAttribute.prototype.getDecoratorValue = function (target, key, presentedValue) {
        return presentedValue;
    };
    MemberAttribute.prototype.decorate = function (value) {
        var _this = this;
        return function (target, key, descriptor) {
            _this.registerMember(target, key);
            var decoratorValue = _this.getDecoratorValue(target, key, value);
            //console.log("decorator runs",key, this.attributeName, decoratorValue, value)
            Reflect.defineMetadata(_this.attributeName, decoratorValue, target, key);
        };
    };
    Object.defineProperty(MemberAttribute.prototype, "decorator", {
        get: function () {
            return this.decorate();
        },
        enumerable: true,
        configurable: true
    });
    MemberAttribute.prototype.isApplied = function (instance, memberName) {
        return Reflect.getMetadataKeys(Object.getPrototypeOf(instance), memberName).indexOf(this.attributeName) > -1;
    };
    MemberAttribute.getMembers = function (target) {
        return Reflect.getMetadata("members", isFunction(target) ? target.prototype : target);
    };
    MemberAttribute.getAttributeNames = function (target, memberName) {
        return Reflect.getMetadataKeys(target, memberName);
    };
    MemberAttribute.getAttributeValue = function (target, memberName, attributeName) {
        return Reflect.getMetadata(attributeName, target, memberName);
    };
    return MemberAttribute;
})();
exports.MemberAttribute = MemberAttribute;
var AttributeFunctionChain = (function () {
    function AttributeFunctionChain() {
        var steps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            steps[_i - 0] = arguments[_i];
        }
        this.steps = [];
        this.steps = steps;
    }
    AttributeFunctionChain.prototype.invoke = function (definition, instance) {
        var result = definition;
        this.steps.forEach(function (fn) {
            result = fn(result, instance);
        });
        return result;
    };
    return AttributeFunctionChain;
})();
exports.AttributeFunctionChain = AttributeFunctionChain;
var SerializeAttribute = (function (_super) {
    __extends(SerializeAttribute, _super);
    function SerializeAttribute() {
        _super.call(this, "serialize");
    }
    SerializeAttribute.prototype.getDecoratorValue = function (target, key, presentedValue) {
        if (!isUndefined(presentedValue)) {
            return presentedValue;
        }
        return new AttributeFunctionChain(function (d) { return d[key]; });
    };
    return SerializeAttribute;
})(MemberAttribute);
exports.SerializeAttribute = SerializeAttribute;
var required = new MemberAttribute("required").decorate(true);
var defaultValueAttribute = new MemberAttribute("defaultValue");
var defaultValue = defaultValueAttribute.decorate.bind(defaultValueAttribute);
var serializeAttribute = new SerializeAttribute();
var serialize = serializeAttribute.decorator;
var serializeAs = serializeAttribute.decorate.bind(serializeAttribute);
var typeArgument = new MemberAttribute("typeArgument");
var mapArray = function (sourceField, factory) { return new AttributeFunctionChain(function (d, i) { return d[sourceField]; }, function (props, i) { return props || []; }, function (props, i) { return props.map(function (prop) { return factory(prop, i); }); }); };
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
exports.EdmItemBase = EdmItemBase;
var Property = (function (_super) {
    __extends(Property, _super);
    function Property() {
        _super.apply(this, arguments);
    }
    __decorate([
        serialize,
        required, 
        __metadata('design:type', String)
    ], Property.prototype, "name", void 0);
    __decorate([
        serialize,
        required, 
        __metadata('design:type', String)
    ], Property.prototype, "type", void 0);
    __decorate([
        serialize,
        defaultValue(true), 
        __metadata('design:type', Boolean)
    ], Property.prototype, "nullable", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', Number)
    ], Property.prototype, "maxLength", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', Number)
    ], Property.prototype, "precision", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', Number)
    ], Property.prototype, "scale", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', Boolean)
    ], Property.prototype, "unicode", void 0);
    __decorate([
        serialize,
        defaultValue(0), 
        __metadata('design:type', Number)
    ], Property.prototype, "SRID", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', Object)
    ], Property.prototype, "defaultValue", void 0);
    return Property;
})(EdmItemBase);
exports.Property = Property;
var NavigationProperty = (function (_super) {
    __extends(NavigationProperty, _super);
    function NavigationProperty() {
        _super.apply(this, arguments);
    }
    __decorate([
        serialize,
        required, 
        __metadata('design:type', String)
    ], NavigationProperty.prototype, "name", void 0);
    __decorate([
        serialize,
        required, 
        __metadata('design:type', String)
    ], NavigationProperty.prototype, "type", void 0);
    __decorate([
        serialize,
        defaultValue(true), 
        __metadata('design:type', Boolean)
    ], NavigationProperty.prototype, "nullable", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', String)
    ], NavigationProperty.prototype, "partner", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', Boolean)
    ], NavigationProperty.prototype, "containsTarget", void 0);
    __decorate([
        serializeAs(mapArray("referentialConstraint", function (prop, i) { return new ReferentialConstraint(prop, i); })), 
        __metadata('design:type', Array)
    ], NavigationProperty.prototype, "referentialConstraints", void 0);
    return NavigationProperty;
})(EdmItemBase);
exports.NavigationProperty = NavigationProperty;
var ReferentialConstraint = (function (_super) {
    __extends(ReferentialConstraint, _super);
    function ReferentialConstraint() {
        _super.apply(this, arguments);
    }
    __decorate([
        serialize,
        required, 
        __metadata('design:type', String)
    ], ReferentialConstraint.prototype, "property", void 0);
    __decorate([
        serialize,
        required, 
        __metadata('design:type', String)
    ], ReferentialConstraint.prototype, "referencedProperty", void 0);
    return ReferentialConstraint;
})(EdmItemBase);
exports.ReferentialConstraint = ReferentialConstraint;
var PropertyRef = (function () {
    function PropertyRef() {
    }
    return PropertyRef;
})();
exports.PropertyRef = PropertyRef;
var EntityType = (function (_super) {
    __extends(EntityType, _super);
    function EntityType() {
        _super.apply(this, arguments);
    }
    __decorate([
        serialize,
        required, 
        __metadata('design:type', String)
    ], EntityType.prototype, "name", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', String)
    ], EntityType.prototype, "baseType", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', Boolean)
    ], EntityType.prototype, "abstract", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', Boolean)
    ], EntityType.prototype, "openType", void 0);
    __decorate([
        serialize, 
        __metadata('design:type', Boolean)
    ], EntityType.prototype, "hasStream", void 0);
    __decorate([
        serializeAs(mapArray("property", function (prop, i) { return new Property(prop, i); })), 
        __metadata('design:type', Array)
    ], EntityType.prototype, "properties", void 0);
    __decorate([
        serializeAs(mapArray("navigationProperty", function (prop, i) { return new NavigationProperty(prop, i); })), 
        __metadata('design:type', Array)
    ], EntityType.prototype, "navigationProperties", void 0);
    return EntityType;
})(EdmItemBase);
exports.EntityType = EntityType;
