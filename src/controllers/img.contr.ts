import { Request, Response } from 'express';
import ImgModel from '../schemas/img.schema.js';
import { Img } from '../interface/interface';

export default class ImgController {
    public static createImg = async (req: Request, res: Response): Promise<void> => {
        try {
            const { imgLink }: Img = req.body;

            const newImg: {} = {
                imgLink,
            };
            const img: Img = await ImgModel.create(newImg);
            // await ProductSchema.findByIdAndUpdate(id, {
            //     $push: {
            //         images: img._id
            //     }
            // });
            res.status(201).json({ success: true, data: img });
        } catch (error: unknown) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }

    }
    public static getAllImg = async (req: Request, res: Response): Promise<void> => {
        try {
            const img: Img[] | null = await ImgModel.find();

            if (!img) {
                res.status(404).json({ success: false, error: 'Image not found' });
                return;
            }

            res.status(200).json({ success: true, data: img });
        } catch (error: unknown) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }

    }
    public static getImg = async (req: Request, res: Response): Promise<void> => {
        try {
            const img: Img | null = await ImgModel.findById(req.params.id);

            if (!img) {
                res.status(404).json({ success: false, error: 'Image not found' });
                return;
            }

            res.status(200).json({ success: true, data: img });
        } catch (error: unknown) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }

    }

    public static updateImg = async (req: Request, res: Response): Promise<void> => {
        try {
            const { imgLink }: Img = req.body;

            const updatedImg: Img | null = await ImgModel.findByIdAndUpdate(req.params.id, { imgLink }, { new: true });

            if (!updatedImg) {
                res.status(404).json({ success: false, error: 'Image not found' });
                return;
            }

            res.status(200).json({ success: true, data: updatedImg });
        } catch (error: unknown) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }

    }

    public static deleteImg = async (req: Request, res: Response): Promise<void> => {
        try {
            const deletedImg: Img | null = await ImgModel.findByIdAndDelete(req.params.id);

            if (!deletedImg) {
                res.status(404).json({ success: false, error: 'Image not found' });
                return;
            }

            res.status(200).json({ success: true, data: {} });
        } catch (error: unknown) {
            res.status(500).json({ success: false, error: (error as Error).message });
        }

    }
}
