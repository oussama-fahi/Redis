import { DynamicModule,Module } from "@nestjs/common";
import { defer, lastValueFrom } from "rxjs";
import { catchError } from "rxjs/operators";
import Redis from "ioredis";
import { RedisOptions } from "ioredis/built/redis/RedisOptions";
import { Global } from "@nestjs/common/decorators";

@Global()
@Module({})
export class CacheCoreModule {
  private static redis: Redis;
  static forRoot(port?: number, host?: string, options?: RedisOptions): DynamicModule {
    this.redis = new Redis(port,host, options);
    const connectionProvider = {
      provide: 'REDIS_MODULE',
      useFactory: async (): Promise<any> =>
        await lastValueFrom(
          defer(async () => this.redis).pipe(
            catchError((error) => {
              throw Error('Redis Error: ' + error);
            }),
          ),
        ),
    };
    return {
      module: CacheCoreModule,
      providers: [connectionProvider],
      exports: [connectionProvider],
    };
  }
}