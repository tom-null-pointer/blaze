import {injectable} from "inversify";
import {Filter} from "../domain/entities/filter";
import {InFilter} from "../domain/entities/in.filter";
import {In} from "typeorm";
import {FiltersTypes} from "../domain/types/filters.type";

@injectable()
export class MapFilterToPostgresFilterService {
  private readonly mapper: { [key: string]: (filter: FiltersTypes) => any} = {
    [InFilter.name]: (filter: InFilter<any>) => {
      return In(filter.in);
    }
  };

  map(filter: Filter) {
    const postgresFilter = {};
    Object.keys(filter).forEach(property => {
      const value = filter[property];
      if (!value) { return; }
      if (
        (typeof value !== 'string' ||
        Number.isNaN(value)) &&
        typeof value === 'object'
      ) {
        if (this.mapper[value.constructor.name]) {
          postgresFilter[property] = this.mapper[value.constructor.name](value);
          return;
        }
      }
      postgresFilter[property] = filter[property];
    });
    return postgresFilter;
  }

}