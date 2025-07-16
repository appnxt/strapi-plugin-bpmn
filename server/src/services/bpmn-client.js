'use strict';

import { getInstances } from '../controllers/bpmn';

const { BPMNClient } = require('bpmn-client');

const bpmclient = ({ strapi }) => ({
  async init() {
    const API_KEY = process.env.BPMN_API_KEY || '12345';
    const HOST = process.env.BPMN_HOST || 'localhost';
    const PORT = process.env.BPMN_PORT || '3000';

    this.client = new BPMNClient(HOST, PORT, API_KEY);
    return this;
  },
  
  async getProcessDefinitions() {
    return this.client.definitions.list();
  },
  
  async startProcess(processName, inputData) {
    return this.client.engine.start(processName, inputData);
  },
  
  async getProcessInstances(query) {
    `{
        'items.elementId': 'task_Buy',
    }`
    let res = await this.client.datastore.findInstances(query);
    return res;
  },
  async getDefinitionsLoad(name) {
    let res = await this.client.definitions.load(name);
    return {"xml": res}
  },

  async engineInvoke(itemQuery ,input) {
    let res = await this.client.engine.invoke(itemQuery, input);
    return res;
  }
});

export default bpmclient;

