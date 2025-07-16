import React, { useState, useEffect } from 'react';
import { Box, Main } from '@strapi/design-system';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Button } from '@strapi/design-system';
import { TextInput } from '@strapi/design-system';
// import { Stack } from '@strapi/design-system';
import {Modeler} from '../components/Modeler';
import { useFetchClient,auth } from '@strapi/strapi/admin';

const BpmnPage = () => {
  const [processes, setProcesses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [bpmnXml, setBpmnXml] = useState('');
  const { get, put } = useFetchClient();
  
  useEffect(() => {
    fetchProcesses();
    fetchInstances();
  }, []);

  const fetchProcesses = async () => {
    
    const { data } = await get('/bpmn/processes');
    console.log("11111111111111",data);
    setProcesses(Array.isArray(data)?data:[]);
  };

  const fetchInstances = async () => {
    const { data } = await get('/bpmn/instances');
    setInstances(Array.isArray(data)?data:[]);
  };

  const handleDeploy = async () => {
    await fetch('/bpmn/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bpmnXml })
    });
    fetchProcesses();
  };

  const handleStartProcess = async (processName) => {
    await fetch(`/bpmn/start/${processName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    fetchInstances();
  };

  return (
    <Main>
      <h1>Welcome to bpmn modeler</h1>
    
      <Box background="neutral100">
        {/* <HeaderLayout 
          title="BPMN Server Integration" 
          subtitle="Manage your business processes" 
          as="h2" 
        /> */}
        
        {/* <ContentLayout> */}
          {/* <Stack spacing={4}>*/}
            {/* <TextInput 
              label="BPMN XML" 
              name="bpmnXml" 
              onChange={e => setBpmnXml(e.target.value)}
              value={bpmnXml}
              multiline
              rows={10}
            />  */}
            <Modeler onXmlChange={setBpmnXml} />
            <Button onClick={handleDeploy}>Deploy Process</Button>
            
            <Table colCount={3} rowCount={processes.length}>
              <Thead>
                <Tr>
                  <Th>Process Name</Th>
                  <Th>Version</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {processes.map(process => (
                  <Tr key={process.id}>
                    <Td>{process.name}</Td>
                    <Td>{process.version}</Td>
                    <Td>
                      <Button onClick={() => handleStartProcess(process.name)}>
                        Start Instance
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            
            <h2>Process Instances</h2>
            <Table colCount={3} rowCount={instances.length}>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Process</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {instances.map(instance => (
                  <Tr key={instance.id}>
                    <Td>{instance.id}</Td>
                    <Td>{instance.name}</Td>
                    <Td>{instance.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          {/* </Stack> */}
        {/* </ContentLayout> */}
      </Box>
    </Main>
  );
};

export { BpmnPage };