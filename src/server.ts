import App from '~/app';
import AuthRoute from '~/routes/auth.route';
import IndexRoute from '~/routes/index.route';
import UsersRoute from '~/routes/user.route';
import SpotsRoute from '~/routes/spot.route';
import ReservationsRoute from '~/routes/reservation.route';
import ParkingsRoute from './routes/parking.route';
import StatsRoute from './routes/stats.route';


const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new SpotsRoute(), new ReservationsRoute(), new ParkingsRoute(), new StatsRoute()]);
app.listen();
