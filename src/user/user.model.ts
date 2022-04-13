import { ModelOptions, prop } from '@typegoose/typegoose';
@ModelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop()
  fullName: string;
  @prop()
  email: string;
  @prop()
  password: string;
}
