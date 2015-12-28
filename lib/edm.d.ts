/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
export declare class MemberAttribute {
    protected attributeName: string;
    constructor(attributeName: string);
    private registerMember(target, key);
    getDecoratorValue(target: Object, key: string, presentedValue?: any): any;
    decorate(value?: any): Function;
    decorator: Function;
    isApplied(instance: Object, memberName: string): boolean;
    static getMembers(target: Function | Object): any;
    static getAttributeNames(target: Function | Object, memberName: string): any[];
    static getAttributeValue(target: Object, memberName: string, attributeName: string): any;
}
export declare class AttributeFunctionChain {
    private steps;
    constructor(...steps: Array<Function>);
    invoke(definition: any, instance: any): any;
}
export declare class SerializeAttribute extends MemberAttribute {
    constructor();
    getDecoratorValue(target: Object, key: string, presentedValue?: any): any;
}
export declare class EdmItemBase {
    private parent;
    constructor(definition?: any, parent?: EdmItemBase);
    loadFrom(definition: any): void;
}
export declare class Property extends EdmItemBase {
    name: string;
    type: string;
    nullable: boolean;
    maxLength: number;
    precision: number;
    scale: number;
    unicode: boolean;
    SRID: number;
    defaultValue: any;
}
export declare class NavigationProperty extends EdmItemBase {
    name: string;
    type: string;
    nullable: boolean;
    partner: string;
    containsTarget: boolean;
    referentialConstraints: Array<ReferentialConstraint>;
}
export declare class ReferentialConstraint extends EdmItemBase {
    property: string;
    referencedProperty: string;
}
export declare class PropertyRef {
}
export declare class EntityType extends EdmItemBase {
    name: string;
    baseType: string;
    abstract: boolean;
    openType: boolean;
    hasStream: boolean;
    properties: Array<Property>;
    navigationProperties: Array<NavigationProperty>;
}
