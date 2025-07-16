module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/processes',
      handler: 'bpmn.getProcesses',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
        description: 'Get all deployed processes'
      }
    },
    {
      method: 'POST',
      path: '/deploy',
      handler: 'bpmn.deployProcess',
      config: {
        policies: [],
        description: 'Deploy a new BPMN process'
      }
    },
    {
      method: 'POST',
      path: '/start/:processName',
      handler: 'bpmn.startProcess',
      config: {
        policies: [],
        description: 'Start a BPMN process instance'
      }
    },
    {
      method: 'GET',
      path: '/instances',
      handler: 'bpmn.getInstances',
      config: {
        auth: false,
        // policies: ['plugin::bpmn.isAuthenticated'],
        description: 'Get all process instances'
      }
    },
    {
      method: 'GET',
      path: '/getDefinitionsLoad',
      handler: 'bpmn.getDefinitionsLoad',
      config: {
        description: 'Get all process instances'
      }
    },    
  ]
};