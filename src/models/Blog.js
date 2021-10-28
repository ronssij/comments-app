import Comment from "./Comment";
import Model from "./Model";

export default class Blog extends Model {
  resource() {
    return "blogs";
  }

  comments() {
    return this.hasMany(Comment);
  }
}
