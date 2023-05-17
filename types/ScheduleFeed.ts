import Dates from "./Dates";
import Metadata from "./Metadata";


class ScheduleFeed {
    public copyright: string;
    public totalItems: number;
    public totalEvents: number;
    public totalGames: number;
    public totalMatches: number;
    public metaData: Metadata;
    public wait: number;
    public dates: Dates[];
};

export default ScheduleFeed;