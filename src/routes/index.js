import home from './home';
import login from './login'

const router = app => {
    app.use('/', home);
    app.use('/login', login);
}

export default router;