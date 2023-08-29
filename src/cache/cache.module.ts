import { DynamicModule, Module } from "@nestjs/common";
import { CacheImplService } from "./services/impls/cache-impl.service";
import { CacheCoreModule } from "./cache-core.module";
import { RedisOptions } from "ioredis/built/redis/RedisOptions";


@Module({
  imports: [],
  exports: [
    {
      provide: "CacheService",
      useClass: CacheImplService,
    },
  ],
  providers: [
    {
      provide: "CacheService",
      useClass: CacheImplService,
    },
    
  ],
  controllers: [],
})
export class CacheModule {
  static forRoot(port?: number, host?: string, options?: RedisOptions): DynamicModule {
    return {
      module: CacheModule,
      imports: [CacheCoreModule.forRoot(port, host,{password:'7yy42cf8gdBnabgWlFe-a6JkH1WPI3LB'} )],
    };
  }
}
//{}