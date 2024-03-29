<img src="https://user-images.githubusercontent.com/1365728/127748628-47575d74-a2fb-4539-a31e-74d8b435fc21.png" width="30%" >

# OLT Angular Library 

General Angular Library for OLT Applications

## Models

_Some of the models work in conjunction with the OLT Core Library Json Models_

| TypeScript Class| TypeScript Interface | OLT Core Model | Definition |
|--|--|--|--|
| [Paged<T>](./src/lib/models/paged.model.ts) | [IPaged<T>](./src/lib/interfaces/paged.interface.ts) | [OltPagedJson<TModel>](https://github.com/OuterlimitsTech/olt-dotnet-core/blob/34ce52f80defb56936b6c2664d4a8cf3d0eb5e81/src/OLT.Core.Common/Models/Json/OltPagedJson.cs) | Paged Result |
| [PagedSearch<T>](./src/lib/models/paged-search.model.ts) | [IPagedSearch<T>](./src/lib/interfaces/paged-search.interface.ts) | [OltPagedJson<TModel>](https://github.com/OuterlimitsTech/olt-dotnet-core/blob/34ce52f80defb56936b6c2664d4a8cf3d0eb5e81/src/OLT.Core.Common/Models/Json/OltPagedSearchJson.cs) | Paged Search Result |
|[PersonName](./src/lib/models/person-name.model.ts) | [IPersonName](./src/lib/interfaces/person-name.interface.ts) | [OltPersonName](https://github.com/OuterlimitsTech/olt-dotnet-core/blob/34ce52f80defb56936b6c2664d4a8cf3d0eb5e81/src/OLT.Core.Common/Models/PersonName/OltPersonName.cs) | Person's Name with (F/M/L/S) |


