import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DeadlineModule } from './deadline/deadline.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL') + 'deadline',
      }),
      inject: [ConfigService],
    }),
    DeadlineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
