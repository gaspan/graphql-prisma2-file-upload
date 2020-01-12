import { objectType } from "nexus";
import { GraphQLUpload } from 'graphql-upload';

export const Upload = GraphQLUpload;

export const File = objectType({
  name: "File",
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt() 
    t.model.filename()
    t.model.mimetype()
    t.model.encoding()
    t.model.path()//path

  }
});