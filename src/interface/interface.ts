import mongoose, { Document, Types } from 'mongoose';
export interface IActor extends Document {
    name: string;
    familyName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    image: string;
    bio: string;
    moviesPlayed?: string;
    movies?: Types.ObjectId;
}
export interface IMovie extends Document { 
    name: string;
    image: string;
    actors?: string;
    filmofactor?: Types.ObjectId;
}