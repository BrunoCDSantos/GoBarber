import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointments';
import File from '../models/File';
import User from '../models/User';

class AppointmentController {
    async index(req, res) {
        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date'],
            attributes: ['id', 'name'],
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'Avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
            ],
        });
        return res.json({ appointments });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { provider_id, date } = req.body;
        const checkIsProvider = await User.findOnew({
            where: { id: provider_id, provider: true },
        });

        if (!checkIsProvider) {
            return res.status(401).json({
                error: 'You can only create appointment with provider',
            });
        }
        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are not permitted' });
        }

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_id: null,
                date: hourStart,
            },
        });

        if (checkAvailability) {
            return res
                .status(400)
                .json({ error: 'Appointment date is not disponible' });
        }
        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date: hourStart,
        });
        return res.json(appointment);
    }
}

export default new AppointmentController();
