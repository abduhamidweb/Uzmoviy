var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Movie from '../schemas/Movy.schema.js';
import UserSchema from '../schemas/User.schema.js';
class MovieController {
    createMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieData = req.body;
                const movie = new Movie(movieData);
                yield UserSchema.findByIdAndUpdate(movieData.actors, {
                    $push: {
                        movies: movie._id
                    }
                });
                const createdMovie = yield movie.save();
                res.status(201).json(createdMovie);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating movie', error: error.message });
            }
        });
    }
    getMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield Movie.find().populate('filmofactor');
                res.json(movies);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving movies', error: error.message });
            }
        });
    }
    getMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieId = req.params.id;
                const movie = yield Movie.findById(movieId).populate('filmofactor');
                if (!movie) {
                    return res.status(404).json({ message: 'Movie not found' });
                }
                res.json(movie);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving movie', error: error.message });
            }
        });
    }
    updateMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieId = req.params.id;
                const movieData = req.body;
                const updatedMovie = yield Movie.findByIdAndUpdate(movieId, movieData, {
                    new: true,
                });
                if (!updatedMovie) {
                    return res.status(404).json({ message: 'Movie not found' });
                }
                res.json(updatedMovie);
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating movie', error: error.message });
            }
        });
    }
    deleteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieId = req.params.id;
                const deletedMovie = yield Movie.findByIdAndRemove(movieId);
                if (!deletedMovie) {
                    return res.status(404).json({ message: 'Movie not found' });
                }
                res.json(deletedMovie);
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting movie', error: error.message });
            }
        });
    }
}
export default new MovieController();
