import React, { useState, useEffect } from 'react';
import { Box, Main,Button,Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { useFetchClient,auth } from '@strapi/strapi/admin';
import { Layouts, Page, Pagination, useQueryParams } from '@strapi/strapi/admin';
import { useParams,useNavigate } from 'react-router-dom';
import {Modeler} from '../../components/Modeler';

const ProcessesDetailPage = () => {
  const [processes, setProcesses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [bpmnXml, setBpmnXml] = useState('');
  const { get, put, post } = useFetchClient();
  const { name } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
      fetchProcesses();
      getDefinitionsLoad(name);
  }, []);

  const fetchProcesses = async () => {
    const { data } = await get('/bpmn/processes');
    setProcesses(Array.isArray(data)?data:[]);
  };

  const getDefinitionsLoad = async (name) => {
    const { data } = await get('/bpmn/getDefinitionsLoad?name='+name);
    setBpmnXml(data.xml);
  };

  const handleStartProcess = async (processName) => {
    const {data} = await post(`/bpmn/start/${processName}`);
    navigate(`/plugins/bpmn/instance/${data.id}`, { 
      replace: true, 
      state: { data: 'example' } 
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
            <Button                     
              variant="secondary"
              onClick={() => handleStartProcess(name)}
              type="button"
              >
               Execute
            </Button>
          </>
        }/>
        <Layouts.Content>
            <Modeler initialXml={bpmnXml} onXmlChange={setBpmnXml} />
          <Table>
            <Thead>
            </Thead>
            <Tbody>

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

export { ProcessesDetailPage };