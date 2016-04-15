#OData V4 metadata classes

This library implements the EDM and EMDX classes from the OData CSDL V4. 


## Features
- Edm and Edmx classes
- will provide Validation logic - based on specs (-on the way)
- will Download and parse metadata from $metadata document or uri endpoint

##Usage

```
$ npm install odata-v4-metadata
```

then just

```javascript
import {Edm} from 'odata-v4-metadata'

let entityType = new edm.EntityType({ name: "Orders", property: [{ name:"OrderID", type:edm.Integer}]
entityType.properties.push(new Edm.Property(...))
```

## Edm classes implemented

### Edm.Action

### Edm.ComplexType

### Edm.EntityType

### Edm.EnumType

### Edm.Function

### Edm.Member

### Edm.NavigationProperty

### Edm.Parameter

### Edm.Property

### Edm.PropertyRef

### Edm.ReferentialConstraint

### Edm.ReturnType

### Edm.Schema

