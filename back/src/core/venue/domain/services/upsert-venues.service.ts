import {inject, injectable} from "inversify";
import {IVenueRepository} from "../interfaces/venue-repository.interface";
import {CreateVenueDto} from "../../infra/dtos/create-venue.dto";
import {Venue} from "../entities/venue.entity";

@injectable()
export class UpsertVenuesService {
  @inject(IVenueRepository)
  private readonly venueRepo: IVenueRepository;
  async upsert(createVenueDtos: CreateVenueDto[]): Promise<Venue[]> {
    return this.venueRepo.upsert(createVenueDtos);
  }
}