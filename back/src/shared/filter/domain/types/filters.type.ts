import {InFilter} from "../entities/in.filter";
import {GreaterThanFilter} from "../entities/greater-than.filter";

export type FiltersTypes = (InFilter<any> | GreaterThanFilter)