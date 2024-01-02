import {FiltersTypes} from "../../../../shared/filter/domain/types/filters.type";
import {Filter} from "../../../../shared/filter/domain/entities/filter.entity";

export class TeamFilter extends Filter{
  id?: number;
  key?: FiltersTypes | string;

  constructor(
    args?: {id?: number, key?: FiltersTypes | string}
  ) {
    super();
    this.id = args.id;
    this.key = args.key;
  }
}