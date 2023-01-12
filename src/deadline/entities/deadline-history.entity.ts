import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type DeadlineHistoryDocument = DeadlineHistory & Document;

@Schema()
export class DeadlineHistory {
  @Prop({ type: mongoose.Types.ObjectId })
  deadline_id: mongoose.Types.ObjectId;

  @Prop({ type: Boolean })
  status: boolean;

  @Prop({ type: Date })
  date: Date;
}

export const DeadlineHistorySchema =
  SchemaFactory.createForClass(DeadlineHistory);
