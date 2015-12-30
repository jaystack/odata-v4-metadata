import * as metacode from './metacode'

export namespace Edm {
    export class PrimitiveType { 
        constructor(public className: string) { }
        toString() { return this.className }
    }


    export const Binary = new PrimitiveType('Edm.Binary')
    export const Boolean = new PrimitiveType('Edm.Boolean')
    export const Byte = new PrimitiveType('Edm.Byte')
    export const Date = new PrimitiveType('Edm.Date')
    export const DateTimeOffset = new PrimitiveType('Edm.DateTimeOffset')
    export const Decimal = new PrimitiveType('Edm.Decimal')
    export const Double = new PrimitiveType('Edm.Double')
    export const Duration = new PrimitiveType('Edm.Duration')
    export const Guid = new PrimitiveType('Edm.Guid')
    export const Int16 = new PrimitiveType('Edm.Int16')
    export const Int32 = new PrimitiveType('Edm.Int32')
    export const Int64 = new PrimitiveType('Edm.Int64')
    export const SByte = new PrimitiveType('Edm.SByte')
    export const Single = new PrimitiveType('Edm.Single')
    export const Stream = new PrimitiveType('Edm.Stream')
    export const String = new PrimitiveType('Edm.String')
    export const TimeOfDay = new PrimitiveType('Edm.TimeOfDay')
    export const Geography = new PrimitiveType('Edm.Geography')
    export const GeographyPoint = new PrimitiveType('Edm.GeographyPoint')
    export const GeographyLineString = new PrimitiveType('Edm.GeographyLineString')
    export const GeographyPolygon = new PrimitiveType('Edm.GeographyPolygon')
    export const GeographyMultiPoint = new PrimitiveType('Edm.GeographyMultiPoint')
    export const GeographyMultiLineString = new PrimitiveType('Edm.GeographyMultiLineString')
    export const GeographyMultiPolygon = new PrimitiveType('Edm.GeographyMultiPolygon')
    export const GeographyCollection = new PrimitiveType('Edm.GeographyCollection')
    export const Geometry = new PrimitiveType('Edm.Geometry')
    export const GeometryPoint = new PrimitiveType('Edm.GeometryPoint')
    export const GeometryLineString = new PrimitiveType('Edm.GeometryLineString')
    export const GeometryPolygon = new PrimitiveType('Edm.GeometryPolygon')
    export const GeometryMultiPoint = new PrimitiveType('Edm.GeometryMultiPoint')
    export const GeometryMultiLineString = new PrimitiveType('Edm.GeometryMultiLineString')
    export const GeometryMultiPolygon = new PrimitiveType('Edm.GeometryMultiPolygon')
    export const GeometryCollection = new PrimitiveType('Edm.GeometryCollection')


    let MemberAttribute = metacode.MemberAttribute
    let parse = metacode.parse
    let required = metacode.required
    let defaultValue = metacode.defaultValue
    let parseAs = metacode.parseAs
    let AttributeFunctionChain = metacode.AttributeFunctionChain
    let mapArray = (sourceField, factory) => new metacode.AttributeFunctionChain( 
        (d, i) =>d[sourceField], 
        (props, i) => props || [],
        (props, i) => props.map(prop => factory(prop, i)))
        

    export class EdmItemBase {
        
        constructor(definition?: any, public parent?:EdmItemBase) {
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
        @parse
        @required
        public name: string
    
        
        @parse
        @required
        public type: string;
        
        @parse
        @defaultValue(true)
        public nullable: boolean;

        @parse
        public maxLength: number;
        
        @parse
        public precision: number;
        
        @parse
        public scale: number;
        
        @parse
        public unicode: boolean;
        
        @parse
        @defaultValue(0)
        public SRID: number;    
        
        @parse
        public defaultValue: any;
    }

    export class NavigationProperty extends EdmItemBase {
        @parse
        @required
        public name: string;
    
        
        @parse
        @required
        public type: string;
        
        @parse
        @defaultValue(true)
        public nullable: boolean;   
        
        @parse
        public partner: string
        
        @parse
        public containsTarget: boolean
        
        @parseAs(mapArray("referentialConstraint", (prop, i) => new ReferentialConstraint(prop, i)))
        public referentialConstraints: Array<ReferentialConstraint>
        
        //TODO onDelete

    }

    export class ReferentialConstraint extends EdmItemBase {
        @parse
        @required
        public property: string
        
        @parse
        @required
        public referencedProperty: string

    }

    export class PropertyRef extends EdmItemBase {
        @parse
        @required
        public name: string;
        
        @parse
        //@requiredIfContainerIsComplexType
        public alias: string;
    }

    export class Key extends EdmItemBase {

        @parseAs(mapArray("propertyRef", (prop, i) => new PropertyRef(prop, i)))
        public propertyRefs: Array<PropertyRef>
        //@arrayMinLength(1)    
    }


    export class EntityType extends EdmItemBase {
        
        @parse
        @required
        public name: string;
        
        
        @parseAs(new AttributeFunctionChain( 
            (d, i) =>d.key, 
            (props, i) => props || [],
            (props, i) => props.map(prop => new Key(prop, i)),
            (props) => props[0]))
        public key: Key;
        
        @parse
        public baseType: string;
        
        @parse
        public abstract: boolean;
        
        @parse
        public openType: boolean;
        
        @parse
        public hasStream: boolean;
        
        
        
        @parseAs(mapArray("property", (prop, i) => new Property(prop, i)))
        public properties: Array<Property>;

        @parseAs(mapArray("navigationProperty", (prop, i) => new NavigationProperty(prop, i)))
        public navigationProperties: Array<NavigationProperty>;

    }

    export class ComplexType extends EdmItemBase {
        
        @parse
        @required
        public name: string;

        @parse
        public baseType: string;
        
        @parse
        public abstract: boolean;
        
        @parse
        public openType: boolean;
        
        @parse
        public hasStream: boolean;
        
        @parseAs(mapArray("property", (prop, i) => new Property(prop, i)))
        public properties: Array<Property>;

        @parseAs(mapArray("navigationProperty", (prop, i) => new NavigationProperty(prop, i)))
        public navigationProperties: Array<NavigationProperty>;

    }
    export class Parameter extends EdmItemBase {
        
        @parse
        @required
        public name: string
    
        
        @parse
        @required
        public type: string;
        
        @parse
        @defaultValue(true)
        public nullable: boolean;

        @parse
        public maxLength: number;
        
        @parse
        public precision: number;
        
        @parse
        public scale: number;
        
        @parse
        public unicode: boolean;
        
        @parse
        @defaultValue(0)
        public SRID: number;    
        
        // according to specs there is no default value for params. but is that right?
        // @parse
        // public defaultValue: any;
    } 
    export class ReturnType extends EdmItemBase {
        @parse
        public type: string
        
        @parse
        @defaultValue(true)
        public nullable: boolean
    }
    
    export class Invokable extends EdmItemBase { }
    
    export class Action extends Invokable {
        @parse
        @required
        public name: string
        
        @parse
        public isBound: boolean
        
        @parse
        public entitySetPath: string
        
        @parseAs(mapArray("parameter", (prop, i) => new Parameter(prop, i)))
        public parameters: Array<Parameter>
        
        @parseAs(new AttributeFunctionChain(
                (d, i) => d.returnType, 
                (rt, i) => new ReturnType(rt, i)))

        public returnType: ReturnType
    }
    
    
    export class Function extends Invokable {
        @parse
        @required
        public name: string
        
        @parse
        public isBound: boolean
        
        @parse
        public entitySetPath: string
        
        @parseAs(mapArray("parameter", (prop, i) => new Parameter(prop, i)))
        public parameters: Array<Parameter>
        
        @parseAs(new AttributeFunctionChain(
                (d, i) => d.returnType, 
                (rt, i) => new ReturnType(rt, i)))
        public returnType: ReturnType        
        
        @parse
        public isComposable: boolean
    }
    export class Member extends EdmItemBase {
        @parse
        @required
        public name: string
     
        @parse
        public value: number

    }
    
    export class EnumType extends EdmItemBase {
        @parse
        @required
        public namespace: string
  
        @parse
        //@oneOf(Edm.Byte, Edm.SByte, Edm.Int16, Edm.Int32, Edm.Int64)
        @defaultValue(Edm.Int32)
        public underlyingType: PrimitiveType
        
        @parse
        public isFlags: boolean
        
        @parseAs(mapArray("member", (prop, i) => new Member(prop, i)))
        public members: Array<Member>        
               
    }
    
    export class Schema extends EdmItemBase {
        @parse
        @required
        public namespace: string
        
        @parse
        //@noneOf(["Edm", "odata", "System", "Transient")
        public alias: string

        @parseAs(mapArray("enumType", (prop, i) => new EnumType(prop, i)))
        public enumTypes: Array<EnumType>


        @parseAs(mapArray("complexType", (prop, i) => new ComplexType(prop, i)))
        public complexTypes: Array<ComplexType>

        
        @parseAs(mapArray("entityType", (prop, i) => new EntityType(prop, i)))
        public entityTypes: Array<EntityType>
        
        @parseAs(mapArray("action", (prop, i) => new Action(prop, i)))
        public actions: Array<Action>
        
        @parseAs(mapArray("function", (prop, i) => new Edm.Function(prop, i)))
        public functions: Array<Edm.Function>
        
        
        
    }
}


