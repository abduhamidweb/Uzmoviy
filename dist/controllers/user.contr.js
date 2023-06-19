var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Actor from "../schemas/User.schema.js";
import MovySchema from '../schemas/Movy.schema.js';
class ActorController {
    createActor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const actorData = req.body;
                const actor = new Actor(actorData);
                yield MovySchema.findByIdAndUpdate(actor.moviesPlayed, {
                    $push: {
                        filmofactor: actor._id
                    }
                });
                const createdActor = yield actor.save();
                res.status(201).json(createdActor);
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating actor', error: error.message });
            }
        });
    }
    getActors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const actors = yield Actor.find().populate('movies');
                res.json(actors);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving actors', error: error.message });
            }
        });
    }
    getActor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const actorId = req.params.id;
                const actor = yield Actor.findById(actorId).populate('movies');
                if (!actor) {
                    return res.status(404).json({ message: 'Actor not found' });
                }
                res.json(actor);
            }
            catch (error) {
                res.status(500).json({ message: 'Error retrieving actor', error: error.message });
            }
        });
    }
    updateActor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const actorId = req.params.id;
                const actorData = req.body;
                const updatedActor = yield Actor.findByIdAndUpdate(actorId, actorData, {
                    new: true,
                });
                if (!updatedActor) {
                    return res.status(404).json({ message: 'Actor not found' });
                }
                res.json(updatedActor);
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating actor', error: error.message });
            }
        });
    }
    deleteActor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const actorId = req.params.id;
                const deletedActor = yield Actor.findByIdAndRemove(actorId);
                if (!deletedActor) {
                    return res.status(404).json({ message: 'Actor not found' });
                }
                res.json(deletedActor);
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting actor', error: error.message });
            }
        });
    }
}
export default new ActorController();
