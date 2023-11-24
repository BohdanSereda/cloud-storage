import {Module} from "@nestjs/common";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {configuration} from "./common/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RolesModule} from "./roles/roles.module";
import {FilesModule} from "./files/files.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres",
          host: config.get<string>("POSTGRES_HOST"),
          port: config.get<number>("POSTGRES_PORT"),
          username: config.get<string>("POSTGRES_USER"),
          password: config.get<string>("POSTGRES_PASSWORD"),
          database: config.get<string>("POSTGRES_DATABASE"),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    RolesModule,
    FilesModule,
  ],
})
export class AppModule {}
