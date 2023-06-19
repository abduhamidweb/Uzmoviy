import { Request, Response } from 'express';
import Actor from "../schemas/User.schema.js";
import { IActor } from '../interface/interface.js';
import MovySchema from '../schemas/Movy.schema.js';
class ActorController {
    public async createActor(req: Request, res: Response) {
        try {
            const actorData: IActor = req.body;
            const actor = new Actor(actorData);
            await MovySchema.findByIdAndUpdate(actor.moviesPlayed, {
                $push: {
                    filmofactor: actor._id
                }
            });
            const createdActor = await actor.save();
            res.status(201).json(createdActor);
        } catch (error: unknown) {
            res.status(500).json({ message: 'Error creating actor', error: (error as Error).message });
        }
    }
    public async getActors(req: Request, res: Response) {
        try {
            const actors = await Actor.find().populate('movies');
            res.json(actors);
        } catch (error: unknown) {
            res.status(500).json({ message: 'Error retrieving actors', error: (error as Error).message });
        }
    }
    public async getActor(req: Request, res: Response) {
        try {
            const actorId = req.params.id;
            const actor = await Actor.findById(actorId).populate('movies');
            if (!actor) {
                return res.status(404).json({ message: 'Actor not found' });
            }
            res.json(actor);
        } catch (error: unknown) {
            res.status(500).json({ message: 'Error retrieving actor', error: (error as Error).message });
        }
    }

    public async updateActor(req: Request, res: Response) {
        try {
            const actorId = req.params.id;
            const actorData: IActor = req.body;
            const updatedActor = await Actor.findByIdAndUpdate(actorId, actorData, {
                new: true,
            });
            if (!updatedActor) {
                return res.status(404).json({ message: 'Actor not found' });
            }
            res.json(updatedActor);
        } catch (error: unknown) {
            res.status(500).json({ message: 'Error updating actor', error: (error as Error).message });
        }
    }

    public async deleteActor(req: Request, res: Response) {
        try {
            const actorId = req.params.id;
            const deletedActor = await Actor.findByIdAndRemove(actorId);
            if (!deletedActor) {
                return res.status(404).json({ message: 'Actor not found' });
            }
            res.json(deletedActor);
        } catch (error: unknown) {
            res.status(500).json({ message: 'Error deleting actor', error: (error as Error).message });
        }
    }
}

export default new ActorController();
