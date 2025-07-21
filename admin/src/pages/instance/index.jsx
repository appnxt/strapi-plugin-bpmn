import React, { useState, useEffect } from 'react';
import { Box, Main, Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Layouts, Page, Pagination, SearchInput, useQueryParams } from '@strapi/strapi/admin';
import { useFetchClient,auth } from '@strapi/strapi/admin';
import { Link,useLocation  } from 'react-router-dom';

const InstancePage = () => {
  const [instances, setInstances] = useState([]);
  const { get, put } = useFetchClient();
  const location = useLocation();
  
  useEffect(() => {
    fetchInstances(location.search);
  }, []);

  const fetchInstances = async () => {
    const { data } = await get('/bpmn/instances'+location.search);
    setInstances(Array.isArray(data)?data:[]);
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