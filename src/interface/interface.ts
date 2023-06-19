import mongoose, { Document, ObjectId, Types } from 'mongoose';
export interface IActor extends Document {
    name: string;
    familyName: string;
    dateOfBirth: Date;
    placeOfBirth: string;
    image: string;
    bio: string;
    moviesPlayed: Types.ObjectId[];
}
export interface IMovie extends Document {
    name: string;
    image: string;
    actors: Types.ObjectId[];
}