const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref:'Fav'
  },
  JobId : {
      type:String
  },
  // Jobstitle: {
  //     type:String
  // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favourite", favoriteSchema);

