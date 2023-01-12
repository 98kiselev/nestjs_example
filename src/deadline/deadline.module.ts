import { Module } from '@nestjs/common';
import { DeadlineService } from './deadline.service';
import { DeadlineController } from './deadline.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Deadline, DeadlineSchema } from './entities/deadline.entity';
import {
  DeadlineHistory,
  DeadlineHistorySchema,
} from './entities/deadline-history.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Deadline.name, schema: DeadlineSchema },
      { name: DeadlineHistory.name, schema: DeadlineHistorySchema },
    ]),
    ClientsModule.register([
      {
        name: 'STUDENTS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'students',
          url: '185.130.113.189:50051',
          protoPath: join(__dirname, 'students.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [DeadlineController],
  providers: [DeadlineService],
})
export class DeadlineModule {}
