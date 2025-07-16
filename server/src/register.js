const register = async ({ strapi }) => {
  const bpmClient = strapi.plugin('bpmn').services.bpmclient;
  
  // // Initialize BPMN Server
  const bpmclient = await bpmClient.init();

  // Register service
  strapi.plugin('bpmn').services.bpmn = bpmclient;

};

export default register;
