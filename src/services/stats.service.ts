import { HttpException } from "~/exceptions/HttpException";
import { TStats, Stats } from "~/models/stats.model"

class StatsService {
    public stats = Stats;

    public async findAllStats(): Promise<TStats[]> {
        const stats: TStats[] = await this.stats.find();
        return stats;
    }

    public async findStatsByParking(parkingId: string): Promise<TStats[]> {
        const stats: TStats[] = await this.stats.find({ parkingId: parkingId });
        return stats;
    }

    public async findLastStatsByParking(parkingId: string): Promise<TStats> {
        const stats: TStats | null = await this.stats.findOne({ parkingId: parkingId }).sort({ timestamp: -1 });
        if (!stats) throw new HttpException(409, "Il n'y a aucune statistique pour ce parking.");

        return stats;
    }

    public async createStats(statsData: TStats): Promise<TStats> {
        const createStatsData: TStats = await this.stats.create({ ...statsData });
        return createStatsData;
    }

    public async getLastDayStats(parkingId: string): Promise<TStats[]> {
        const stats: TStats[] = await this.stats.find({ parkingId: parkingId, timestamp: { $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) } });
        return stats;
    }
}


export default StatsService;