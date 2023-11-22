import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const SERVER_PORT = config.get<number>("SERVER_PORT");
  await app.listen(SERVER_PORT, () =>
    console.log(`Server started on port: ${SERVER_PORT}`)
  );
}
bootstrap();
