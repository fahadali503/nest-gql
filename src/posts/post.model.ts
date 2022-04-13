import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from 'src/user/user.model';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Post {
  @prop({ type: String })
  title: string;

  @prop({ type: String })
  body: string;

  @prop({ ref: () => User })
  user: Ref<User, string>;
}
