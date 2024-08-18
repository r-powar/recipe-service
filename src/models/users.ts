import mongoose, { Schema, model, Document } from 'mongoose';

interface IUser extends Document{
        username: string;
        email: string;
        savedRecipes: mongoose.Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  savedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

const User = model<IUser>('User', userSchema);

export default User;
