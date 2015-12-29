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
export declare class ParseAttribute extends MemberAttribute {
    constructor();
    getDecoratorValue(target: Object, key: string, presentedValue?: any): any;
}
export declare let required: Function;
export declare let defaultValueAttribute: MemberAttribute;
export declare let defaultValue: any;
export declare let parseAttribute: ParseAttribute;
export declare let parse: Function;
export declare let parseAs: any;
export declare let typeArgument: MemberAttribute;
