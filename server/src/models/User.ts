import mongoose, { Document, Schema } from "mongoose";

// Define the IUser interface with the new fields
export interface IUser extends Document {
  email: string;
  password: string;
  authMethod: string;
  country?: string;
  confirmpassword?: string;
  firstname?: string;
  lastname?: string;
  socials?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    authMethod: {
      type: String,
      required: true,
      default: "email",
    },
    country: {
      type: String,
      required: false,
    },
    confirmpassword: {
      type: String,
      required: [true, "Confirm Password is required"],
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: false,
    },
    socials: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
