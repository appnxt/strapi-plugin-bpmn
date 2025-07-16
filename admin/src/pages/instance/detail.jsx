import React, { useState, useEffect } from 'react';
import { Box, Main, Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Layouts, Page, Pagination, SearchInput, useQueryParams } from '@strapi/strapi/admin';
import { useFetchClient,auth } from '@strapi/strapi/admin';
import { useParams } from 'react-router-dom';
import { Execute } from '../../components/Execute';

const InstanceDetailPage = () => {
  const [instanceDetails, setInstanceDetails] = useState([]);
  const [instanceItems, setInstanceItems] = useState([]);
  const [bpmnXml, setBpmnXml] = useState('');
  const { get, put } = useFetchClient();
  const { id } = useParams();
  
  
  useEffect(() => {
    // getDefinitionsLoad();
    fetchInstanceDetails();
  }, []);

  const getDefinitionsLoad = async (name) => {
    const { data } = await get('/bpmn/getDefinitionsLoad?name='+name);
    return data;
  };

  const fetchInstanceDetails = async () => {
    const { data } = await get('/bpmn/instances?id='+id);
    // const svg = await getDefinitionsLoad(data[0].name);
    setInstanceDetails(data[0]);
    setInstanceItems(Array.isArray(data)?data[0]['items']:[]);
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
    fetchInstanceDetails();
  };
  


  return (
    <>
      <Page.Title children={'bpmn - instance'} />
      <Page.Main>
        <Layouts.Header
          title={"instanceItems"}
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
                  <Th>Element Id</Th>
                  <Th>Name</Th>
                  <Th>Started</Th>
                  <Th>Ended</Th>
                  <Th>Type</Th>
                  <Th>User</Th>
                  <Th>Assignee</Th>
                  <Th>Due date</Th>
                  <Th>Priority</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {instanceItems.map(item => (
                  <Tr key={item.id}>
                    <Td>{item.elementId}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.startedAt}</Td>
                    <Td>{item.endedAt}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.userName}</Td>
                    <Td>{item.assignee}</Td>
                    <Td>{item.dueDate}</Td>
                    <Td>{item.priority}</Td>
                    <Td><Execute item={item} name={instanceDetails.name}/></Td>
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

export { InstanceDetailPage };