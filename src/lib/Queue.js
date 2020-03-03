import Bee from 'bee-queue';
import CancellationMail from '../App/jobs/cancellationMails';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
    constructor() {
        this.queues = {};

        this.init();
    }

    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: redisConfig,
                }),
                handle,
            };
        });
    }

    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    }

    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];
            bee.on('failed', this.handleFailure).bee.process(handle);
        });
    }

    handleFailure(job, err) {
        console.log(`${job.queue.name} failed `, err);
    }

    teste() {
        console.table('nada para fazer');
    }
}

export default new Queue();
