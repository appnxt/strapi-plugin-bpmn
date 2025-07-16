import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Main,Button,Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { useFetchClient,auth } from '@strapi/strapi/admin';
import { Layouts, Page, Pagination, SearchInput, useQueryParams } from '@strapi/strapi/admin';

const ProcessesPage = () => {
  const [processes, setProcesses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [bpmnXml, setBpmnXml] = useState('');
  const { get, put, post } = useFetchClient();
  const navigate = useNavigate();
  
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


  const handleStartProcess = async (processName) => {
    const {data} = await post(`/bpmn/start/${processName}`);
    navigate(`/plugins/bpmn/instance/${data.id}`, { 
      replace: true, 
      state: { data: 'started' } 
    });
  };

  return (
    <>
      <Page.Title children={'Comments - discover'} />
      <Page.Main>
        <Layouts.Header
          title={"Processes"}
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
                  <Th>Process Name</Th>
                  <Th>Version</Th>
                  <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
            {processes.map(process => (
                <Tr key={process.id}>
                <Td>{process.name}</Td>
                <Td><Link to={`/plugins/bpmn/process/`+process.name}>Detail</Link></Td>
                <Td>
                    <Button onClick={() => handleStartProcess(process.name)}>
                    Start Instance
                    </Button>
                </Td>
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

export { ProcessesPage };