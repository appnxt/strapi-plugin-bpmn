module.exports = {
  async getProcesses(ctx) {
    try {
      const processes = await strapi.plugins['bpmn'].service('bpmclient').getProcessDefinitions();
      ctx.send(processes);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async deployProcess(ctx) {
    try {
      const { bpmnXml } = ctx.request.body;
      const result = await strapi.plugins['bpmn'].service('bpmclient').deployProcess(bpmnXml);
      ctx.send(result);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async startProcess(ctx) {
    try {
      const { processName } = ctx.params;
      const inputData = ctx.request.body;
      const result = await strapi.plugins['bpmn'].service('bpmclient').startProcess(processName, inputData);
      ctx.send(result);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getInstances(ctx) {
    try {
      const instances = await strapi.plugins['bpmn'].services.bpmclient.getProcessInstances(ctx.query);
      ctx.send(instances);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async getDefinitionsLoad(ctx) {
    try {
      const name = ctx.query.name
      const xml = await strapi.plugins['bpmn'].service('bpmclient').getDefinitionsLoad(name);
      ctx.send(xml);
    } catch (err) {
      ctx.throw(500, err);
    }    
  }

};

