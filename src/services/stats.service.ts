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

    public async findStatsBetweenDates(parkingId: string, t1: Date, t2: Date): Promise<TStats[]> {
        const stats: TStats[] = await this.stats.find({ parkingId: parkingId, timestamp: { $gte: t1, $lte: t2 } });
        return stats;
    }
}


export default StatsService;