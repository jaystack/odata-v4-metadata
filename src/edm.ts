import * as metacode from './metacode'

export namespace Edm {
    export class PrimitiveType { 
        constructor(public className: string) { }
    }

    export let Binary = new PrimitiveType('Edm.Binary')
    export let Boolean = new PrimitiveType('Edm.Boolean')
    export let Byte = new PrimitiveType('Edm.Byte')
    export let Date = new PrimitiveType('Edm.Date')
    export let DateTimeOffset = new PrimitiveType('Edm.DateTimeOffset')
    export let Decimal = new PrimitiveType('Edm.Decimal')
    export let Double = new PrimitiveType('Edm.Double')
    export let Duration = new PrimitiveType('Edm.Duration')
    export let Guid = new PrimitiveType('Edm.Guid')
    export let Int16 = new PrimitiveType('Edm.Int16')
    export let Int32 = new PrimitiveType('Edm.Int32')
    export let Int64 = new PrimitiveType('Edm.Int64')
    export let SByte = new PrimitiveType('Edm.SByte')
    export let Single = new PrimitiveType('Edm.Single')
    export let Stream = new PrimitiveType('Edm.Stream')
    export let String = new PrimitiveType('Edm.String')
    export let TimeOfDay = new PrimitiveType('Edm.TimeOfDay')
    export let Geography = new PrimitiveType('Edm.Geography')
    export let GeographyPoint = new PrimitiveType('Edm.GeographyPoint')
    export let GeographyLineString = new PrimitiveType('Edm.GeographyLineString')
    export let GeographyPolygon = new PrimitiveType('Edm.GeographyPolygon')
    export let GeographyMultiPoint = new PrimitiveType('Edm.GeographyMultiPoint')
    export let GeographyMultiLineString = new PrimitiveType('Edm.GeographyMultiLineString')
    export let GeographyMultiPolygon = new PrimitiveType('Edm.GeographyMultiPolygon')
    export let GeographyCollection = new PrimitiveType('Edm.GeographyCollection')
    export let Geometry = new PrimitiveType('Edm.Geometry')
    export let GeometryPoint = new PrimitiveType('Edm.GeometryPoint')
    export let GeometryLineString = new PrimitiveType('Edm.GeometryLineString')
    export let GeometryPolygon = new PrimitiveType('Edm.GeometryPolygon')
    export let GeometryMultiPoint = new PrimitiveType('Edm.GeometryMultiPoint')
    export let GeometryMultiLineString = new PrimitiveType('Edm.GeometryMultiLineString')
    export let GeometryMultiPolygon = new PrimitiveType('Edm.GeometryMultiPolygon')
    export let GeometryCollection = new PrimitiveType('Edm.GeometryCollection')



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
}


