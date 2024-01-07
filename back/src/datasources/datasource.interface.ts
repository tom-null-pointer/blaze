export interface IDatasource {
  // TODO: should decouple this from typeorm and define Base Datasource Type.
  initialize: () => Promise<any>
}