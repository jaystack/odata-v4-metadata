export declare namespace Edm {
    class PrimitiveType {
        className: string;
        constructor(className: string);
        toString(): string;
    }
    const Binary: PrimitiveType;
    const Boolean: PrimitiveType;
    const Byte: PrimitiveType;
    const Date: PrimitiveType;
    const DateTimeOffset: PrimitiveType;
    const Decimal: PrimitiveType;
    const Double: PrimitiveType;
    const Duration: PrimitiveType;
    const Guid: PrimitiveType;
    const Int16: PrimitiveType;
    const Int32: PrimitiveType;
    const Int64: PrimitiveType;
    const SByte: PrimitiveType;
    const Single: PrimitiveType;
    const Stream: PrimitiveType;
    const String: PrimitiveType;
    const TimeOfDay: PrimitiveType;
    const Geography: PrimitiveType;
    const GeographyPoint: PrimitiveType;
    const GeographyLineString: PrimitiveType;
    const GeographyPolygon: PrimitiveType;
    const GeographyMultiPoint: PrimitiveType;
    const GeographyMultiLineString: PrimitiveType;
    const GeographyMultiPolygon: PrimitiveType;
    const GeographyCollection: PrimitiveType;
    const Geometry: PrimitiveType;
    const GeometryPoint: PrimitiveType;
    const GeometryLineString: PrimitiveType;
    const GeometryPolygon: PrimitiveType;
    const GeometryMultiPoint: PrimitiveType;
    const GeometryMultiLineString: PrimitiveType;
    const GeometryMultiPolygon: PrimitiveType;
    const GeometryCollection: PrimitiveType;
    class EdmItemBase {
        parent: EdmItemBase;
        constructor(definition?: any, parent?: EdmItemBase);
        loadFrom(definition: any): void;
    }
    class Property extends EdmItemBase {
        name: string;
        type: string;
        nullable: boolean;
        maxLength: number;
        precision: number;
        scale: number;
        unicode: boolean;
        SRID: number;
        defaultValue: any;
        concurrencyMode: String;
        annotations: Array<Edm.Annotation>;
    }
    class NavigationProperty extends EdmItemBase {
        name: string;
        type: string;
        nullable: boolean;
        partner: string;
        containsTarget: boolean;
        referentialConstraints: Array<ReferentialConstraint>;
        annotations: Array<Edm.Annotation>;
    }
    class ReferentialConstraint extends EdmItemBase {
        property: string;
        referencedProperty: string;
    }
    class PropertyRef extends EdmItemBase {
        name: string;
        alias: string;
    }
    class Key extends EdmItemBase {
        propertyRefs: Array<PropertyRef>;
    }
    class EntityType extends EdmItemBase {
        name: string;
        key: Key;
        baseType: string;
        abstract: boolean;
        openType: boolean;
        hasStream: boolean;
        properties: Array<Property>;
        navigationProperties: Array<NavigationProperty>;
        annotations: Array<Edm.Annotation>;
    }
    class ComplexType extends EdmItemBase {
        name: string;
        baseType: string;
        abstract: boolean;
        openType: boolean;
        hasStream: boolean;
        properties: Array<Property>;
        navigationProperties: Array<NavigationProperty>;
        annotations: Array<Edm.Annotation>;
    }
    class Parameter extends EdmItemBase {
        name: string;
        type: string;
        nullable: boolean;
        maxLength: number;
        precision: number;
        scale: number;
        unicode: boolean;
        SRID: number;
        annotations: Array<Edm.Annotation>;
    }
    class ReturnType extends EdmItemBase {
        type: string;
        nullable: boolean;
        annotations: Array<Edm.Annotation>;
    }
    class Invokable extends EdmItemBase {
    }
    class Action extends Invokable {
        name: string;
        isBound: boolean;
        entitySetPath: string;
        parameters: Array<Parameter>;
        returnType: ReturnType;
        annotations: Array<Edm.Annotation>;
    }
    class Function extends Invokable {
        name: string;
        isBound: boolean;
        entitySetPath: string;
        parameters: Array<Parameter>;
        returnType: ReturnType;
        isComposable: boolean;
        annotations: Array<Edm.Annotation>;
    }
    class Member extends EdmItemBase {
        name: string;
        value: number;
        annotations: Array<Edm.Annotation>;
    }
    class EnumType extends EdmItemBase {
        name: string;
        namespace: string;
        underlyingType: PrimitiveType;
        isFlags: boolean;
        members: Array<Member>;
        annotations: Array<Edm.Annotation>;
    }
    class EntitySet extends EdmItemBase {
        name: string;
        entityType: string;
        annotations: Array<Edm.Annotation>;
    }
    class Singleton extends EdmItemBase {
        name: string;
        type: string;
        annotations: Array<Edm.Annotation>;
    }
    class ActionImport extends EdmItemBase {
        name: string;
        action: string;
    }
    class FunctionImport extends EdmItemBase {
        name: string;
        function: string;
        includeInServiceDocument: boolean;
    }
    class EntityContainer extends EdmItemBase {
        name: string;
        entitySets: Array<EntitySet>;
        singletons: Array<Singleton>;
        actionImports: Array<ActionImport>;
        functionImports: Array<FunctionImport>;
    }
    class Schema extends EdmItemBase {
        namespace: string;
        alias: string;
        enumTypes: Array<EnumType>;
        complexTypes: Array<ComplexType>;
        entityTypes: Array<EntityType>;
        actions: Array<Action>;
        functions: Array<Edm.Function>;
        entityContainer: Array<Edm.EntityContainer>;
        annotations: Array<Edm.Annotations>;
    }
    class DataServices extends EdmItemBase {
        schemas: Array<Schema>;
    }
    class Reference extends EdmItemBase {
        uri: string;
        includes: Array<ReferenceInclude>;
    }
    class ReferenceInclude extends EdmItemBase {
        namespace: string;
        alias: string;
    }
    class Edmx extends EdmItemBase {
        dataServices: DataServices;
        references: Array<Edm.Reference>;
    }
    class Annotations extends EdmItemBase {
        target: string;
        qualifier: string;
        annotations: Array<Edm.Annotation>;
    }
    class Annotation extends EdmItemBase {
        annotationType: string;
        term: string;
        qualifier: string;
        path: string;
    }
    class BinaryAnnotation extends Annotation {
        annotationType: string;
        binary: String;
    }
    class BoolAnnotation extends Annotation {
        annotationType: string;
        bool: String;
    }
    class DateAnnotation extends Annotation {
        annotationType: string;
        date: String;
    }
    class DateTimeOffsetAnnotation extends Annotation {
        annotationType: string;
        dateTimeOffset: String;
    }
    class DecimalAnnotation extends Annotation {
        annotationType: string;
        decimal: String;
    }
    class DurationAnnotation extends Annotation {
        annotationType: string;
        duration: String;
    }
    class EnumMemberAnnotation extends Annotation {
        annotationType: string;
        enumMember: String;
    }
    class FloatAnnotation extends Annotation {
        annotationType: string;
        float: String;
    }
    class GuidAnnotation extends Annotation {
        annotationType: string;
        guid: String;
    }
    class IntAnnotation extends Annotation {
        annotationType: string;
        int: String;
    }
    class StringAnnotation extends Annotation {
        annotationType: string;
        string: String;
    }
    class TimeOfDayAnnotation extends Annotation {
        annotationType: string;
        timeOfDay: String;
    }
    class PropertyPathAnnotation extends Annotation {
        annotationType: string;
        propertyPaths: String;
    }
    class NavigationPropertyPathAnnotation extends Annotation {
        annotationType: string;
        navigationPropertyPaths: String;
    }
    class AnnotationPathAnnotation extends Annotation {
        annotationType: string;
        annotationPaths: String;
    }
    class NullAnnotation extends Annotation {
        annotationType: string;
        null: Array<Object>;
    }
    const AnnotationTypes: {
        binary: typeof BinaryAnnotation;
        bool: typeof BoolAnnotation;
        date: typeof DateAnnotation;
        dateTimeOffset: typeof DateTimeOffsetAnnotation;
        decimal: typeof DecimalAnnotation;
        duration: typeof DurationAnnotation;
        enumMember: typeof EnumMemberAnnotation;
        float: typeof FloatAnnotation;
        guid: typeof GuidAnnotation;
        int: typeof IntAnnotation;
        string: typeof StringAnnotation;
        timeOfDay: typeof TimeOfDayAnnotation;
        propertyPath: typeof PropertyPathAnnotation;
        navigationPropertyPath: typeof NavigationPropertyPathAnnotation;
        annotationPath: typeof AnnotationPathAnnotation;
        null: typeof NullAnnotation;
    };
}
