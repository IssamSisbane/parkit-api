import mongoose from "mongoose";

enum StatsType {
    entry = "entry",
    exit = "exit",
    reserved = "reserved",
    free = "free",
    occupied = "occupied"
}

type TStats = {
    parkingId: string;
    type: StatsType;
    timestamp: Date;
}

const statsSchema = new mongoose.Schema<TStats>({
    parkingId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["entry", "exit", "reserved", "free", "occupied"],
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
});

const Stats = mongoose.model("Stats", statsSchema, "stats");

export { StatsType, Stats, TStats, statsSchema };