"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function isFunction(o) {
    return "function" === typeof o;
}
function isUndefined(o) {
    return o === undefined;
}
var definitionPropName = 'definition';
var MemberAttribute = (function () {
    function MemberAttribute(attributeName) {
        this.attributeName = attributeName;
    }
    MemberAttribute.prototype.registerMember = function (target, key) {
        var def = target[definitionPropName] = target[definitionPropName] || {};
        var md = (def.members || []);
        if (md.indexOf(key) < 0) {
            md.push(key);
        }
        def.members = md;
    };
    MemberAttribute.prototype.getDecoratorValue = function (target, key, presentedValue) {
        return presentedValue;
    };
    MemberAttribute.prototype.decorate = function (value) {
        var _this = this;
        return function (target, key, descriptor) {
            _this.registerMember(target, key);
            var decoratorValue = _this.getDecoratorValue(target, key, value);
            target[definitionPropName][_this.attributeName] = target[definitionPropName][_this.attributeName] || {};
            target[definitionPropName][_this.attributeName][key] = decoratorValue;
        };
    };
    Object.defineProperty(MemberAttribute.prototype, "decorator", {
        get: function () {
            return this.decorate();
        },
        enumerable: true,
        configurable: true
    });
    MemberAttribute.getMembers = function (target) {
        return target[definitionPropName].members;
    };
    MemberAttribute.getAttributeValue = function (target, memberName, attributeName) {
        return ((target[definitionPropName] || {})[attributeName] || {})[memberName];
    };
    return MemberAttribute;
}());
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
}());
exports.AttributeFunctionChain = AttributeFunctionChain;
var ParseAttribute = (function (_super) {
    __extends(ParseAttribute, _super);
    function ParseAttribute() {
        _super.call(this, "serialize");
    }
    ParseAttribute.prototype.getDecoratorValue = function (target, key, presentedValue) {
        if (!isUndefined(presentedValue)) {
            return presentedValue;
        }
        return new AttributeFunctionChain(function (d) { return d[key]; });
    };
    return ParseAttribute;
}(MemberAttribute));
exports.ParseAttribute = ParseAttribute;
exports.required = new MemberAttribute("required").decorate(true);
exports.defaultValueAttribute = new MemberAttribute("defaultValue");
exports.defaultValue = exports.defaultValueAttribute.decorate.bind(exports.defaultValueAttribute);
exports.parseAttribute = new ParseAttribute();
exports.parse = exports.parseAttribute.decorator;
exports.parseAs = exports.parseAttribute.decorate.bind(exports.parseAttribute);
exports.typeArgument = new MemberAttribute("typeArgument");
//# sourceMappingURL=metacode.js.map