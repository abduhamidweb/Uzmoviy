import { Request, Response } from 'express';
import Movie from '../schemas/Movy.schema.js';
import { IMovie } from '../interface/interface';

class MovieController {
    public async createMovie(req: Request, res: Response) {
        try {
            const movieData: IMovie = req.body;
            const movie = new Movie(movieData);
            const createdMovie = await movie.save();
            res.status(201).json(createdMovie);
        } catch (error) {
            res.status(500).json({ message: 'Error creating movie' });
        }
    }

    public async getMovies(req: Request, res: Response) {
        try {
            const movies = await Movie.find();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving movies' });
        }
    }

    public async getMovie(req: Request, res: Response) {
        try {
            const movieId = req.params.id;
            const movie = await Movie.findById(movieId);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.json(movie);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving movie' });
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
        } catch (error) {
            res.status(500).json({ message: 'Error updating movie' });
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
        } catch (error) {
            res.status(500).json({ message: 'Error deleting movie' });
        }
    }
}

export default new MovieController();
