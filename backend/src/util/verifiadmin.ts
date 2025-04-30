import jwt from 'jsonwebtoken';
import { Servererror } from '../middleware/errorhanddler';

export const verification = (token: string): number => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!token || !JWT_SECRET) {
        throw new Servererror("Token or secret not found", 400);
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
        throw new Servererror("Unauthorized access", 401);
    }
    return Number(decoded.id);
}


