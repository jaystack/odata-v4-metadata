export declare namespace Edm {
    class PrimitiveType {
        className: string;
        constructor(className: string);
    }
    let Binary: PrimitiveType;
    let Boolean: PrimitiveType;
    let Byte: PrimitiveType;
    let Date: PrimitiveType;
    let DateTimeOffset: PrimitiveType;
    let Decimal: PrimitiveType;
    let Double: PrimitiveType;
    let Duration: PrimitiveType;
    let Guid: PrimitiveType;
    let Int16: PrimitiveType;
    let Int32: PrimitiveType;
    let Int64: PrimitiveType;
    let SByte: PrimitiveType;
    let Single: PrimitiveType;
    let Stream: PrimitiveType;
    let String: PrimitiveType;
    let TimeOfDay: PrimitiveType;
    let Geography: PrimitiveType;
    let GeographyPoint: PrimitiveType;
    let GeographyLineString: PrimitiveType;
    let GeographyPolygon: PrimitiveType;
    let GeographyMultiPoint: PrimitiveType;
    let GeographyMultiLineString: PrimitiveType;
    let GeographyMultiPolygon: PrimitiveType;
    let GeographyCollection: PrimitiveType;
    let Geometry: PrimitiveType;
    let GeometryPoint: PrimitiveType;
    let GeometryLineString: PrimitiveType;
    let GeometryPolygon: PrimitiveType;
    let GeometryMultiPoint: PrimitiveType;
    let GeometryMultiLineString: PrimitiveType;
    let GeometryMultiPolygon: PrimitiveType;
    let GeometryCollection: PrimitiveType;
    class EdmItemBase {
        private parent;
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
}
