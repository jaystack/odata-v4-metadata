/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
import 'reflect-metadata';
function isFunction(o: any) {
    return "function" === typeof o
}
function isUndefined(o: any) {
    return o === undefined
}

export class MemberAttribute {
    constructor(protected attributeName: string) { }

    private registerMember(target: Object, key: string) {
        let md = (Reflect.getMetadata("members", target) || [])
        if (md.indexOf(key) < 0) {
            md.push(key)
        } 
        
        Reflect.defineMetadata("members", md, target)        
    } 
    
    getDecoratorValue(target:Object, key:string, presentedValue?: any) {
        return presentedValue
    }
    
    decorate(value?:any):Function {
        return (target:Object, key: string, descriptor?: Object) => {
            this.registerMember(target, key)
            var decoratorValue = this.getDecoratorValue(target, key, value)
            
            //console.log("decorator runs",key, this.attributeName, decoratorValue, value)
            Reflect.defineMetadata(this.attributeName, 
                                decoratorValue,
                                target, 
                                key)
        }
    }
    
    get decorator(): Function {
        return this.decorate()
    }
    
    
    isApplied(instance: Object, memberName: string) {
        return Reflect.getMetadataKeys(Object.getPrototypeOf(instance), memberName).indexOf(this.attributeName) > -1
    }
    
    static getMembers(target: Function | Object) {
        return Reflect.getMetadata("members", isFunction(target) ? (<Function>target).prototype : target)
    }
    
    static getAttributeNames(target: Function | Object, memberName: string) {
        return Reflect.getMetadataKeys(target, memberName)           
    }
    
    static getAttributeValue(target: Object, memberName: string, attributeName: string) {
        return Reflect.getMetadata(attributeName, target, memberName)
    }

}

export class AttributeFunctionChain {
    private steps: Array<Function> = []
    constructor(...steps: Array<Function>) {
        this.steps = steps
    }
    
    invoke(definition, instance) {
        var result = definition
        this.steps.forEach(fn => {
            result = fn(result, instance)
        })
        return result
    }
}

export class ParseAttribute extends MemberAttribute {
    constructor() {
        super("serialize")
    }
    
    getDecoratorValue(target:Object, key:string, presentedValue?: any) {
        if (!isUndefined(presentedValue)) {
        return presentedValue 
        }
        return new AttributeFunctionChain(
            d => d[key]
        )
    }
        
    
}

export let required = new MemberAttribute("required").decorate(true)
export let defaultValueAttribute = new MemberAttribute("defaultValue")
export let defaultValue = defaultValueAttribute.decorate.bind(defaultValueAttribute)
export let parseAttribute = new ParseAttribute()
export let parse = parseAttribute.decorator
export let parseAs = parseAttribute.decorate.bind(parseAttribute)
export let typeArgument = new MemberAttribute("typeArgument")

