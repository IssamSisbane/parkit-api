import { Request, Response } from "express";
import { TStats } from "~/models/stats.model";
import StatsService from "~/services/stats.service";

class StatsController {
    public statsService: StatsService;

    public async createStats(req: Request, res: Response) {
        const statsData: TStats = req.body;
        const createStatsData: TStats = await this.statsService.createStats(statsData);
        res.json(createStatsData);
    }

    public async getAllStats(req: Request, res: Response) {
        const stats = await this.statsService.findAllStats();
        res.json(stats);
    }

    public async getStatsByParking(req: Request, res: Response) {
        const parkingId = req.params.parkingId;
        const stats = await this.statsService.findStatsByParking(parkingId);
        res.json(stats);
    }

    public async getLastStatsByParking(req: Request, res: Response) {
        const parkingId = req.params.parkingId;
        const stats = await this.statsService.findLastStatsByParking(parkingId);
        res.json(stats);
    }

    public async getStatsBetweenDates(req: Request, res: Response) {
        const parkingId = req.params.parkingId;
        const t1 = new Date(req.body.t1);
        const t2 = new Date(req.body.t2);
        const stats = await this.statsService.findStatsBetweenDates(parkingId, t1, t2);
        res.json(stats);
    }
}

export default StatsController;