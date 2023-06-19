import { Request, Response } from 'express';
import Movie from '../schemas/Movy.schema.js';
import { IMovie } from '../interface/interface';
import UserSchema from '../schemas/User.schema.js';

class MovieController {
    public async createMovie(req: Request, res: Response) {
        try {
            const movieData: IMovie = req.body;
            const movie = new Movie(movieData);
            await UserSchema.findByIdAndUpdate(movieData.actors, {
                $push: {
                    movies: movie._id
                }
            });
            const createdMovie = await movie.save();

            res.status(201).json(createdMovie);
        } catch (error:unknown) {
            res.status(500).json({ message: 'Error creating movie', error: (error as Error).message });
        }
    }

    public async getMovies(req: Request, res: Response) {
        try {
            const movies = await Movie.find().populate('filmofactor');
            res.json(movies);
        } catch (error:unknown) {
            res.status(500).json({ message: 'Error retrieving movies', error: (error as Error).message });
        }
    }

    public async getMovie(req: Request, res: Response) {
        try {
            const movieId = req.params.id;
            const movie = await Movie.findById(movieId).populate('filmofactor');
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.json(movie);
        } catch (error:unknown) {
            res.status(500).json({ message: 'Error retrieving movie', error: (error as Error).message });
        }
    }

    public async updateMovie(req: Request, res: Response) {
        try {
            const movieId = req.params.id;
            const movieData: IMovie = req.body;
            const updatedMovie = await Movie.findByIdAndUpdate(movieId, movieData, {
                new: true,
            });
            if (!updatedMovie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.json(updatedMovie);
        } catch (error: unknown) {
            res.status(500).json({ message: 'Error updating movie', error: (error as Error).message });
        }
    }

    public async deleteMovie(req: Request, res: Response) {
        try {
            const movieId = req.params.id;
            const deletedMovie = await Movie.findByIdAndRemove(movieId);
            if (!deletedMovie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.json(deletedMovie);
        } catch (error:unknown) {
            res.status(500).json({ message: 'Error deleting movie', error: (error as Error).message });
        }
    }
}

export default new MovieController();
