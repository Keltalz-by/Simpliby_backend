import { modelOptions, prop, Severity, getModelForClass, Ref } from '@typegoose/typegoose';
import { type User } from '../user/user.model';

@modelOptions({
  schemaOptions: {
    collection: 'chat',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Chat {
  @prop({ ref: 'User', type: () => String })
  public sender: Ref<User>;

  @prop({ ref: 'User', type: () => String })
  public receiver: Ref<User>;

  @prop({ required: true })
  public message!: string;
}

const ChatModel = getModelForClass(Chat);
export default ChatModel;
