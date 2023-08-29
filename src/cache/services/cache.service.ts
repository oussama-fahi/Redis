import { Observable } from "rxjs";

export interface CacheService {
  set(id: string, payload: any): Observable<any>;
  get(id: string): Observable<any>;
}
