import mongoose, { Document } from 'mongoose';
export interface IActor extends Document {
    name: string;
    familyName: string;
    dateOfBirth: Date;
    placeOfBirth: string;
    image: string;
    bio: string;
    moviesPlayed: string[];
}
export interface IMovie extends Document {
    name: string;
    image: string;
    actors: string[];
}