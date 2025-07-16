import { routes as bpmnAPIRoutes} from './bpmn-routes';

const routes = {
  'content-api': {
    type: 'content-api',
    routes: bpmnAPIRoutes,
  },
    'admin-api': {
    type: 'admin',
    routes: bpmnAPIRoutes,
  },
};

export default routes;
