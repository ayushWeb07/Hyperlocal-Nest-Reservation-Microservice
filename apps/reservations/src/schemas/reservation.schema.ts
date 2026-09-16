import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractSchema } from '@app/common/database/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class ReservationDocument extends AbstractSchema {
  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, type: String })
  placeId: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: String })
  invoiceId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
