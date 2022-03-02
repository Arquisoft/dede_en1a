import {ObjectId, Model} from "mongoose";

// Basic CRUD functions for all entities.

export function findById(id: ObjectId) {
    return Model.findById(id);
}

export function findAll(model: Model<any>) {
    return model.find({});
}

export function update(id: ObjectId, doc: Document){
    return Model.findByIdAndUpdate(id, doc);
}

export function create(doc: Document) {
    return Model.create(doc);
}

export function remove(id: ObjectId) {
    return Model.findByIdAndDelete(id);
}