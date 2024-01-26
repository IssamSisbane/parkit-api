import { MqttClient, connect, IClientOptions } from 'mqtt';
import { MQTT_HOST, MQTT_PORT, MQTT_PROTOCOL, MQTT_USERNAME, MQTT_PASSWORD } from '../config/env.config';
import ParkingService from '~/services/parking.service';
import ReservationService from '~/services/reservation.service';
import SpotService from '~/services/spot.service';
import { Spot } from '~/models/spot.model';
import UserService from '~/services/user.service';
import StatsService from '~/services/stats.service';
import { StatsType } from '~/models/stats.model';


class MQTTHandler {
    private client: MqttClient;
    private parkingService: ParkingService;
    private reservationService: ReservationService;
    private spotService: SpotService;
    private userService: UserService;
    private statsService: StatsService;

    constructor() {
        // on initialise le client MQTT
        const options = {
            host: MQTT_HOST,
            port: MQTT_PORT,
            protocol: MQTT_PROTOCOL,
            username: MQTT_USERNAME,
            password: MQTT_PASSWORD
        } as IClientOptions;
        this.client = connect(options);
    }

    public async configure(): Promise<void> {
        // on initialise les services dont on a besoin
        this.parkingService = new ParkingService();
        this.reservationService = new ReservationService();
        this.spotService = new SpotService();
        this.statsService = new StatsService();

        // setup the callbacks
        this.client.on('connect', function () {
            console.log('MQTT Client Connected');
            console.log(`=====================================`);
        });

        this.client.on('error', function (error) {
            console.log(error);
        });

        const parkings = await this.parkingService.findAllParking();
        for (const parking of parkings) {
            this.subscribe(`parking/${parking._id}/spot/free`);
            this.subscribe(`parking/${parking._id}/spot/occupied`);
            this.subscribe(`parking/${parking._id}/ask/spots/getAll`);
            this.subscribe(`parking/${parking._id}/ask/nfc/verify`);
            this.subscribe(`parking/${parking._id}/gate/entry`);
            this.subscribe(`parking/${parking._id}/gate/exit`);
        }

        this.client.on('message', async (topic, message) => {

            const spotFreeMatch = topic.match(/^parking\/(.+)\/spot\/free$/);
            const spotOccupiedMatch = topic.match(/^parking\/(.+)\/spot\/occupied$/);
            const spotsGetAllMatch = topic.match(/^parking\/(.+)\/ask\/spots\/getAll$/);
            const nfcVerifyMatch = topic.match(/^parking\/(.+)\/ask\/nfc\/verify$/);
            const gateEntryMatch = topic.match(/^parking\/(.+)\/gate\/entry$/);
            const gateExitMatch = topic.match(/^parking\/(.+)\/gate\/exit$/);

            if (spotFreeMatch) {
                const parkingId = spotFreeMatch[1];   // if id and not place name
                const spotName = message;
                const spot = await this.spotService.spots.findOne({ parking: parkingId, name: spotName });
                console.log("free");
                await this.spotService.spots.findByIdAndUpdate(spot?.id, { state: 'free' });
                this.statsService.createStats({ parkingId: parkingId, type: StatsType.free, timestamp: new Date() });                // Handle the case where the spot becomes free

            } else if (spotOccupiedMatch) {
                const parkingId = spotOccupiedMatch[1];
                const spotName = message;
                const spot = await this.spotService.spots.findOne({ parking: parkingId, name: spotName });
                if (spot!.state == 'reserved') {
                    const reservations = await this.reservationService.findReservationsBySpot(spot!.id);
                    await this.reservationService.deleteReservation(reservations[0]._id.toString());
                }
                console.log("occupied");
                await this.spotService.spots.findByIdAndUpdate(spot?.id, { state: 'occupied' });
                this.statsService.createStats({ parkingId: parkingId, type: StatsType.occupied, timestamp: new Date() });
                // Handle the case where the spot becomes occupied
            } else if (spotsGetAllMatch) {
                const parkingId = spotsGetAllMatch[1];
                console.log("getAll");
                const spots = await this.spotService.findAllSpotsFromParking(parkingId, '');
                this.publish(`parking/${parkingId}/ans/spots/getAll`, JSON.stringify(spots));
                // Handle the case where all spots are requested
            } else if (nfcVerifyMatch) {
                // Handle the case where NFC verification is requested
                const parkingId = nfcVerifyMatch[1];
                console.log("verify");
                const nfcId = JSON.parse(message.toString()).nfcId;
                const user = await this.userService.findUserById(nfcId);

                if (user) {
                    this.publish(`parking/${parkingId}/ans/nfc/verify`, JSON.stringify({ verified: true, user: user.username }));
                }
            } else if (gateEntryMatch) {
                const parkingId = gateEntryMatch[1];
                console.log("entry");
                this.statsService.createStats({ parkingId: parkingId, type: StatsType.entry, timestamp: new Date() });

                // Handle the case where a vehicle enters the parking
            } else if (gateExitMatch) {
                const parkingId = gateExitMatch[1];
                console.log("exit");
                this.statsService.createStats({ parkingId: parkingId, type: StatsType.exit, timestamp: new Date() });
                // Handle the case where a vehicle exits the parking
            }
        });
    }

    public async publish(topic: string, message: string): Promise<void> {
        this.client.publish(topic, message);
    }

    public async subscribe(topic: string): Promise<void> {
        this.client.subscribe(topic);
    }
}

export default MQTTHandler;