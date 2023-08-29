import { CacheService } from "../cache.service";
import { Inject, Injectable } from "@nestjs/common";
import { from, Observable,map } from "rxjs";

@Injectable()
export class CacheImplService implements CacheService {

  constructor(@Inject('REDIS_MODULE')private readonly redisService: any) {

  }

  get(id: string): Observable<any> {
    return from(this.redisService.get(id)).pipe(map((data: any) => JSON.parse(data)));
  }
  set(id: string, payload: any): Observable<any> {
    return from(this.redisService.set(id, JSON.stringify(payload),'ex',2640000000));
  }
}
