function isFunction(o: any) {
    return "function" === typeof o
}
function isUndefined(o: any) {
    return o === undefined
}

const definitionPropName = 'definition';

export class MemberAttribute {
    constructor(protected attributeName: string) { }

    private registerMember(target: Object, key: string) {
        var def = target[definitionPropName] = target[definitionPropName] || {};
        let md = (def.members || [])
        if (md.indexOf(key) < 0) {
            md.push(key)
        } 
        
        def.members = md
    } 
    
    getDecoratorValue(target:Object, key:string, presentedValue?: any) {
        return presentedValue
    }
    
    decorate(value?:any):Function {
        return (target:Object, key: string, descriptor?: Object) => {
            this.registerMember(target, key)
            var decoratorValue = this.getDecoratorValue(target, key, value)
            
            target[definitionPropName][this.attributeName] = target[definitionPropName][this.attributeName] || {}
            target[definitionPropName][this.attributeName][key] = decoratorValue;
        }
    }
    
    get decorator(): Function {
        return this.decorate()
    }
    
    static getMembers(target: Function | Object) {
        return target[definitionPropName].members
    }
    
    static getAttributeValue(target: Object, memberName: string, attributeName: string) {
        return ((target[definitionPropName] || {})[attributeName] || {})[memberName]
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

