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
    }
    class NavigationProperty extends EdmItemBase {
        name: string;
        type: string;
        nullable: boolean;
        partner: string;
        containsTarget: boolean;
        referentialConstraints: Array<ReferentialConstraint>;
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
    }
    class ComplexType extends EdmItemBase {
        name: string;
        baseType: string;
        abstract: boolean;
        openType: boolean;
        hasStream: boolean;
        properties: Array<Property>;
        navigationProperties: Array<NavigationProperty>;
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
    }
    class ReturnType extends EdmItemBase {
        type: string;
        nullable: boolean;
    }
    class Invokable extends EdmItemBase {
    }
    class Action extends Invokable {
        name: string;
        isBound: boolean;
        entitySetPath: string;
        parameters: Array<Parameter>;
        returnType: ReturnType;
    }
    class Function extends Invokable {
        name: string;
        isBound: boolean;
        entitySetPath: string;
        parameters: Array<Parameter>;
        returnType: ReturnType;
        isComposable: boolean;
    }
    class Member extends EdmItemBase {
        name: string;
        value: number;
    }
    class EnumType extends EdmItemBase {
        name: string;
        namespace: string;
        underlyingType: PrimitiveType;
        isFlags: boolean;
        members: Array<Member>;
    }
    class EntitySet extends EdmItemBase {
        name: string;
        entityType: string;
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
    }
    class DataServices extends EdmItemBase {
        schemas: Array<Schema>;
    }
    class Edmx extends EdmItemBase {
        dataServices: Array<DataServices>;
    }
}
