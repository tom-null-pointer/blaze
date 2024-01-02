import {Venue} from "../entities/venue.entity";
import {CreateVenueDto} from "../../infra/dtos/create-venue.dto";

export interface IVenueRepository {
  upsert: (createVenueDtos: CreateVenueDto[]) => Promise<Venue[]>
}
export const IVenueRepository = Symbol('IVenueRepository');