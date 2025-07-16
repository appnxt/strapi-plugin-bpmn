import React, { useState, useEffect } from 'react';
import { Box, Main, Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Layouts, Page, Pagination, SearchInput, useQueryParams } from '@strapi/strapi/admin';
import { useFetchClient,auth } from '@strapi/strapi/admin';
import { Link } from 'react-router-dom';

const InstancePage = () => {
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
    <>
      <Page.Title children={'BPMN - instance'} />
      <Page.Main>
        <Layouts.Header
          title={"Instances"}
          subtitle={`list`}
          as="h2"
        />
        <Layouts.Action startActions={
          <>
            <SearchInput label="Search" />
            {/* <CommentsStatusFilters setQueryParams={setQueryParams}/> */}
          </>
        }/>
        <Layouts.Content>
          <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Process</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {instances.map(instance => (
                  <Tr key={instance.id}>
                    <Td>{instance.id}</Td>
                    <Td>{instance.name}</Td>
                    <Td>{instance.status}</Td>
                    <Td><Link to={"/plugins/bpmn/instance/"+instance.id}>Detail</Link></Td>
                  </Tr>
                ))}
              </Tbody>
          </Table>
          {/* <Pagination.Root pageCount={pagination.pageCount} total={pagination.total}>
            <Pagination.PageSize />
            <Pagination.Links />
          </Pagination.Root> */}
        </Layouts.Content>
      </Page.Main>
    </>

  );
};

export { InstancePage };