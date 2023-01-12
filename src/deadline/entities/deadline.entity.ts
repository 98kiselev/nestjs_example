import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeadlineDocument = Deadline & Document;

@Schema()
export class Deadline {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date })
  date: Date;

  @Prop({ type: String, required: true })
  student_id: string;
}

export const DeadlineSchema = SchemaFactory.createForClass(Deadline);
