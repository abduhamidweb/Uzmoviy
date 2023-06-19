import { Request, Response } from 'express';
import ContactModel from '../schemas/contact.schema.js';
import { Contact } from '../interface/interface';

export default class ContactController {
    public static createContact = async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, email, phone, message }: Contact = req.body;

            const newContact: {} = {
                username,
                email,
                phone,
                message,
            };

            const contact: Contact = await ContactModel.create(newContact);

            res.status(201).json({ success: true, data: contact });
        } catch (error: unknown) {
            res.status(500).json({ success: false, error: error });
        }
    }

    public static getContacts = async (req: Request, res: Response): Promise<void> => {
        try {
            const contacts: Contact[] = await ContactModel.find();

            res.status(200).json({ success: true, data: contacts });
        } catch (error: unknown) {
            res.status(500).json({ success: false, error: error });
        }
    }

    public static getContactById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            const contact: Contact | null = await ContactModel.findById(id);

            if (!contact) {
                res.status(404).json({ success: false, error: 'Contact not found' });
                return;
            }

            res.status(200).json({ success: true, data: contact });
        } catch (error: unknown) {
            res.status(500).json({ success: false, error: error });
        }
    }

    public static updateContact = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { username, email, phone, message }: Contact = req.body;

            const updatedContact: {} = {
                username,
                email,
                phone,
                message,
            };

            const contact: Contact | null = await ContactModel.findByIdAndUpdate(id, updatedContact, {
                new: true,
                runValidators: true,
            });

            if (!contact) {
                res.status(404).json({ success: false, error: 'Contact not found' });
                return;
            }

            res.status(200).json({ success: true, data: contact });
        } catch (error: unknown) {
            res.status(500).json({ success: false, error: error });
        }
    }

    public static deleteContact = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            const contact: Contact | null = await ContactModel.findByIdAndDelete(id);

            if (!contact) {
                res.status(404).json({ success: false, error: 'Contact not found' });
                return;
            }
            res.status(200).json({ success: true, data: {} });
        } catch (error: unknown) {
            res.status(500).json({ success: false, error: error });
        }
    }
}
