import User from '../models/User';
import File from '../models/File';

class ProvideController {
    async index(req, res) {
        const providers = await User.findAll({
            where: { provider: true },
            attributes: ['id', 'name', 'avatar_id'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'path'],
                },
            ],
        });
        return res.json(providers);
    }
}

export default new ProvideController();
