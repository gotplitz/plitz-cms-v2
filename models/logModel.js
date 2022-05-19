import mongoose from 'mongoose';

const logSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    logtype: {
      type: String,
      require: true,
    },
    logcontent: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model('Log', logSchema);

export default Log;
