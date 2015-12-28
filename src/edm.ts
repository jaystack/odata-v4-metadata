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

export class SerializeAttribute extends MemberAttribute {
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

var required = new MemberAttribute("required").decorate(true)
var defaultValueAttribute = new MemberAttribute("defaultValue")
var defaultValue = defaultValueAttribute.decorate.bind(defaultValueAttribute)
var serializeAttribute = new SerializeAttribute()
let serialize = serializeAttribute.decorator
let serializeAs = serializeAttribute.decorate.bind(serializeAttribute)
var typeArgument = new MemberAttribute("typeArgument")


let mapArray = (sourceField, factory) => new AttributeFunctionChain( 
        (d, i) =>d[sourceField], 
        (props, i) => props || [],
        (props, i) => props.map(prop => factory(prop, i)))
        
export class EdmItemBase {
    
    constructor(definition?: any, private parent?:EdmItemBase) {
      definition && this.loadFrom(definition)
    }
    
    loadFrom(definition) {
        var proto = Object.getPrototypeOf(this)
        MemberAttribute.getMembers(proto).forEach( membername => {
            var parser = MemberAttribute.getAttributeValue(proto, membername, "serialize")
            var v = parser.invoke(definition, this)
            this[membername] = v
        })
    }

}


export class Property extends EdmItemBase {
    @serialize
    @required
    public name: string;
  
    
    @serialize
    @required
    public type: string;
    
    @serialize
    @defaultValue(true)
    public nullable: boolean;

    @serialize
    public maxLength: number;
    
    @serialize
    public precision: number;
    
    @serialize
    public scale: number;
    
    @serialize
    public unicode: boolean;
    
    @serialize
    @defaultValue(0)
    public SRID: number;    
    
    @serialize
    public defaultValue: any;
}

export class NavigationProperty extends EdmItemBase {
    @serialize
    @required
    public name: string;
  
    
    @serialize
    @required
    public type: string;
    
    @serialize
    @defaultValue(true)
    public nullable: boolean;   
    
    @serialize
    public partner: string
    
    @serialize
    public containsTarget: boolean
    
    @serializeAs(mapArray("referentialConstraint", (prop, i) => new ReferentialConstraint(prop, i)))
    public referentialConstraints: Array<ReferentialConstraint>
    
    //TODO onDelete

}

export class ReferentialConstraint extends EdmItemBase {
    @serialize
    @required
    public property: string
    
    @serialize
    @required
    public referencedProperty: string

}

export class PropertyRef {
    
}


export class EntityType extends EdmItemBase {
    
    @serialize
    @required
    public name: string;
    
    @serialize
    public baseType: string;
    
    @serialize
    public abstract: boolean;
    
    @serialize
    public openType: boolean;
    
    @serialize
    public hasStream: boolean;
    
    @serializeAs(mapArray("property", (prop, i) => new Property(prop, i)))
    public properties: Array<Property>;

    @serializeAs(mapArray("navigationProperty", (prop, i) => new NavigationProperty(prop, i)))
    public navigationProperties: Array<NavigationProperty>;

}



