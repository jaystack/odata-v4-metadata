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
        (props, i) => Array.isArray(props) ? props : (props ? [props] : []),
        (props, i) => props.map(prop => factory(prop, i)))
        
    let primitiveAnnotationValue = (sourceField) => new metacode.AttributeFunctionChain( 
        (d, i) => {
            if(d['collection'] && d['collection'][0] && Array.isArray(d['collection'][0][sourceField]) && !d[sourceField]){
                return  d['collection'][0][sourceField].map(x => x.text)
            } 
            var props = d[sourceField];
            if(Array.isArray(props)) {
                 return props.filter(x => 'text' in x).map(x => x.text)[0]
            } else {
                return props    
            }
        })
        
   
    let annotationTypeSelector = (source) => {
        for(var i in AnnotationTypes){
            if(i in source || (source['collection'] && source['collection'][0] && i in source['collection'][0])){
                return AnnotationTypes[i]
            }
        }
        return Annotation
    } 
        

    export class EdmItemBase {
        
        constructor(definition?: any, public parent?:EdmItemBase) {
            definition && this.loadFrom(definition)
        }
        
        loadFrom(definition) {

            var proto = Object.getPrototypeOf(this)
            MemberAttribute.getMembers(proto).forEach( membername => {
                var parser = MemberAttribute.getAttributeValue(proto, membername, "serialize")
                if (parser) {
                    var v = parser.invoke(definition, this)
                    this[membername] = v
                }
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
        
        @parse
        public concurrencyMode: String
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
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

        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
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
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
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
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
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
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
        
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
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
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
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
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
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
    }
    export class Member extends EdmItemBase {
        @parse
        @required
        public name: string
     
        @parse
        public value: number
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
    }
    
    export class EnumType extends EdmItemBase {
        @parse
        @required
        public name: string
        
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
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
    }
    
    export class EntitySet extends EdmItemBase {
        @parse
        @required
        public name: string
        
        @parse
        @required
        public entityType: string
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
    }
    
    export class ActionImport extends EdmItemBase {
        @parse
        @required
        public name: string
        
        @parse
        @required
        public action: string

        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
    }
    
    export class FunctionImport extends EdmItemBase {
        @parse
        @required
        public name: string
        
        @parse
        @required
        public function: string
        
        @parse
        @defaultValue(false)
        public includeInServiceDocument: boolean

        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
    }
    
    export class EntityContainer extends EdmItemBase {
        @parse
        public name: string
        
        @parseAs(mapArray("entitySet", (prop, i) => new EntitySet(prop, i)))
        public entitySets: Array<EntitySet>
        
        @parseAs(mapArray("actionImport", (prop, i) => new ActionImport(prop, i)))
        public actionImports: Array<ActionImport>
        
        @parseAs(mapArray("functionImport", (prop, i) => new FunctionImport(prop, i)))
        public functionImports: Array<FunctionImport>
    }
    
    // "Name", "UnderlyingType", "MaxLength", "Unicode", "Precision", "Scale", "SRID"
    export class TypeDefinition extends EdmItemBase {
        @parse
        public name: string

        @parse
        public underlyingType: PrimitiveType

        @parse
        public maxLength: number

        @parse
        public unicode: boolean

        @parse
        public precision: number

        @parse
        public scale: number

        @parse
        @defaultValue(0)
        public SRID: number;

        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
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

        @parseAs(mapArray("typeDefinition", (prop, i) => new TypeDefinition(prop, i)))
        public typeDefinitions: Array<TypeDefinition>

        @parseAs(mapArray("complexType", (prop, i) => new ComplexType(prop, i)))
        public complexTypes: Array<ComplexType>

        
        @parseAs(mapArray("entityType", (prop, i) => new EntityType(prop, i)))
        public entityTypes: Array<EntityType>
        
        @parseAs(mapArray("action", (prop, i) => new Action(prop, i)))
        public actions: Array<Action>
        
        @parseAs(mapArray("function", (prop, i) => new Edm.Function(prop, i)))
        public functions: Array<Edm.Function>
        
        @parseAs(mapArray("entityContainer", (prop, i) => new Edm.EntityContainer(prop, i)))
        public entityContainer: Array<Edm.EntityContainer>
        
        @parseAs(mapArray("annotations", (prop, i) => new Edm.Annotations(prop, i)))
        public annotations: Array<Edm.Annotations>
    }
    
    
    export class DataServices extends EdmItemBase {
        @parseAs(mapArray("schema", (prop, i) => new Schema(prop, i)))
        public schemas: Array<Schema>
    }
    
    export class Reference extends EdmItemBase {
        @parse
        public uri: string
        
        @parseAs(mapArray("include", (prop, i) => new ReferenceInclude(prop, i)))
        public includes: Array<ReferenceInclude>
    }
    
    export class ReferenceInclude extends EdmItemBase {
        @parse
        public namespace: string
        
        @parse
        public alias: string
    }
    
    export class Edmx extends EdmItemBase {
        public version = "4.0"

        @parseAs(new AttributeFunctionChain(
            (edm) => new Edm.DataServices(edm.dataServices)
        ))
        public dataServices: DataServices
        
        @parseAs(mapArray("reference", (prop, i) => new Reference(prop, i)))
        public references: Array<Edm.Reference>
    }
    
    export class Annotations extends EdmItemBase {
        @parse
        @required
        public target: string
        
        @parse
        public qualifier: string
        
        @parseAs(mapArray("annotation", (prop, i) => new (annotationTypeSelector(prop))(prop, i)))
        public annotations: Array<Edm.Annotation>
    }
    
    export class Annotation extends EdmItemBase {
        public annotationType: string = "Unknown";
        
        @parse
        public term: string
        
        @parse
        public qualifier: string
        
        @parse
        public path: string
    }
    
    export class BinaryAnnotation extends Annotation {
        public annotationType: string = "Binary";
        
        @parseAs(primitiveAnnotationValue("binary"))
        public binary: String
    }
    
    export class BoolAnnotation extends Annotation {
        public annotationType: string = "Bool";
        
        @parseAs(primitiveAnnotationValue("bool"))
        public bool: String
    }
    
    export class DateAnnotation extends Annotation {
        public annotationType: string = "Date";
        
        @parseAs(primitiveAnnotationValue("date"))
        public date: String
    }
    
    export class DateTimeOffsetAnnotation extends Annotation {
        public annotationType: string = "DateTimeOffset";
        
        @parseAs(primitiveAnnotationValue("dateTimeOffset"))
        public dateTimeOffset: String
    }
    
    export class DecimalAnnotation extends Annotation {
        public annotationType: string = "Decimal";
        
        @parseAs(primitiveAnnotationValue("decimal"))
        public decimal: String
    }
    
    export class DurationAnnotation extends Annotation {
        public annotationType: string = "Duration";
        
        @parseAs(primitiveAnnotationValue("duration"))
        public duration: String
    }
    
    export class EnumMemberAnnotation extends Annotation {
        public annotationType: string = "EnumMember";
        
        @parseAs(primitiveAnnotationValue("enumMember"))
        public enumMember: String
    }
    
    export class FloatAnnotation extends Annotation {
        public annotationType: string = "Float";
        
        @parseAs(primitiveAnnotationValue("float"))
        public float: String
    }
    
    export class GuidAnnotation extends Annotation {
        public annotationType: string = "Guid";
        
        @parseAs(primitiveAnnotationValue("guid"))
        public guid: String
    }
    
    export class IntAnnotation extends Annotation {
        public annotationType: string = "Int";
        
        @parseAs(primitiveAnnotationValue("int"))
        public int: String
    }
    
    export class StringAnnotation extends Annotation {
        public annotationType: string = "String";
        
        @parseAs(primitiveAnnotationValue("string"))
        public string: String
    }
    
    export class TimeOfDayAnnotation extends Annotation {
        public annotationType: string = "TimeOfDay";
        
        @parseAs(primitiveAnnotationValue("timeOfDay"))
        public timeOfDay: String
    }
    
    export class PropertyPathAnnotation extends Annotation {
        public annotationType: string = "PropertyPath";
        
        @parseAs(primitiveAnnotationValue("propertyPath"))
        public propertyPaths: String
    }
    
    export class NavigationPropertyPathAnnotation extends Annotation {
        public annotationType: string = "NavigationPropertyPath";
        
        @parseAs(primitiveAnnotationValue("propertyPath"))
        public navigationPropertyPaths: String
    }
    
    export class AnnotationPathAnnotation extends Annotation {
        public annotationType: string = "AnnotationPath";
        
        @parseAs(primitiveAnnotationValue("annotationPath"))
        public annotationPaths: String
    }
    
    export class NullAnnotation extends Annotation {
        public annotationType: string = "Null";
        
        @parseAs(primitiveAnnotationValue("null"))
        public null: Array<Object>
    }
    
    
    export const AnnotationTypes = {
        binary: BinaryAnnotation,
        bool: BoolAnnotation,
        date: DateAnnotation,
        dateTimeOffset: DateTimeOffsetAnnotation,
        decimal: DecimalAnnotation,
        duration: DurationAnnotation,
        enumMember: EnumMemberAnnotation,
        float: FloatAnnotation,
        guid: GuidAnnotation,
        int: IntAnnotation,
        string: StringAnnotation,
        timeOfDay: TimeOfDayAnnotation,
        propertyPath: PropertyPathAnnotation,
        navigationPropertyPath: NavigationPropertyPathAnnotation,
        annotationPath: AnnotationPathAnnotation,
        null: NullAnnotation
    }
}


