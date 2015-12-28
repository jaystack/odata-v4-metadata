#OData metadata utilties

This library implements the EDM and EMDX classes from the OData CSDL.

##Usage

```
$ npm install odata-metadata
```

then just

```javascript
import {edm} from 'odata-metadata'

let entityType = new edm.EntityType({ name: "Orders", property: [{ name:"OrderID", type:edm.Integer}]
```

Comes with a nice d.ts for intellisense.
