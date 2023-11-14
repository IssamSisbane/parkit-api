import App from '~/app';
import AuthRoute from '~/routes/auth.route';
import IndexRoute from '~/routes/index.route';
import UsersRoute from '~/routes/user.route';
import PlacesRoute from '~/routes/place.route';
import ReservationsRoute from '~/routes/reservation.route';


const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new PlacesRoute(), new ReservationsRoute()]);
app.listen();
