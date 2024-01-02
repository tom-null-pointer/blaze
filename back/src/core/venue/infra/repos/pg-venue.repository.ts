import {injectable} from "inversify";
import {CreateVenueDto} from "../dtos/create-venue.dto";
import {Venue} from "../../domain/entities/venue.entity";
import {IVenueRepository} from "../../domain/interfaces/venue-repository.interface";
import {Repository} from "typeorm";
import {pgDatasource} from "../../../../main";
import {InternalServerException} from "../../../../shared/errors/internal-server.exception";

@injectable()
export class PgVenueRepository implements IVenueRepository{
  private readonly venueRepo: Repository<Venue> = pgDatasource.getRepository(Venue);
  async upsert(createVenueDtos: CreateVenueDto[]): Promise<Venue[]> {
    try {
      const result = await this.venueRepo.createQueryBuilder('v')
        .insert()
        .into(Venue)
        .values(createVenueDtos)
        .orUpdate(['address', 'city', 'capacity', 'surface', 'updatedAt', 'active'], ['name'])
        .returning(['id', 'name', 'address', 'city', 'capacity', 'surface', 'createdAt', 'updatedAt', 'active'])
        .execute();
      return result.generatedMaps as Venue[];
    } catch(e) {
      console.error(e);
      throw new InternalServerException('Error trying to upsert venues.');
    }
  }
}