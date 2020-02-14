import User from '../models/user';

class UserController {
    async store(req, res) {
        const userExits = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExits) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const { id, email, name } = await User.create(req.body);
        return res.json(id, name, email);
    }
}

export default new UserController();
