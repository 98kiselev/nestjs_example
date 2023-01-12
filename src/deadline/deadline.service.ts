import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deadline, DeadlineDocument } from './entities/deadline.entity';
import { Model } from 'mongoose';
import {
  DeadlineHistory,
  DeadlineHistoryDocument,
} from './entities/deadline-history.entity';
import { ClientGrpc } from '@nestjs/microservices';
import {
  IStudent,
  StudentsService,
} from './intefaces/students.service';
import * as mongoose from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DeadlineService implements OnModuleInit {
  private studentsService: StudentsService;
  constructor(
    @Inject('STUDENTS_PACKAGE') private client: ClientGrpc,
    @InjectModel(Deadline.name)
    private deadlineModel: Model<DeadlineDocument>,
    @InjectModel(DeadlineHistory.name)
    private deadlineHistoryModel: Model<DeadlineHistoryDocument>,
  ) {}

  async onModuleInit() {
    this.studentsService = this.client.getService<StudentsService>('Service');
  }

  async get_deadlines() {
    const deadlines = await this.deadlineModel.aggregate([
      {
        $lookup: {
          from: 'deadlinehistories',
          localField: '_id',
          foreignField: 'deadline_id',
          as: 'history',
        },
      },
    ]);

    const user_set = new Set<string>();

    for (const deadline of deadlines) {
      user_set.add(deadline.student_id);
    }

    const students = (
      await firstValueFrom(
        this.studentsService.getStudentsByEmail({
          emails: Array.from(user_set),
        }),
      )
    ).students;

    return deadlines.map((el) => {
      return {
        ...el,
        student: students.find((el2) => el2.email === el.student_id),
      };
    });
  }

  async add_deadline(body: IStudent) {
    const deadline = new this.deadlineModel(body);
    return deadline.save();
  }

  async complete_deadline(deadline_id: string, completed: boolean) {
    const hist = new this.deadlineHistoryModel({
      deadline_id: new mongoose.Types.ObjectId(deadline_id),
      status: completed,
      date: new Date(),
    });

    return hist.save();
  }
}
