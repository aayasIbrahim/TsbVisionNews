import mongoose, { Document, Model } from "mongoose";

// Interface for Video document
export interface IVideo extends Document {
  title: string;
  youtubeUrl: string;
  videoId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Video schema
const videoSchema = new mongoose.Schema<IVideo>(
  {
    title: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    videoId: { type: String, required: true },
  },
  { timestamps: true }
);

const Video: Model<IVideo> =
  mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;
