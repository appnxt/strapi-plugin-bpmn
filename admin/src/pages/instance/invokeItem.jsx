import React, { useState, useEffect } from 'react';
import { Button,TextInput,Field, Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import { Layouts, Page, Pagination, SearchInput, useQueryParams } from '@strapi/strapi/admin';
import { useFetchClient,auth } from '@strapi/strapi/admin';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const InvokeItemPage = () => {
  const [instanceDetails, setInstanceDetails] = useState([]);
  const [instanceItems, setInstanceItems] = useState([]);
  const [nodeInfo, setNodeInfo] = useState('');
  const { get, post } = useFetchClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get('id');
  const proceeName = searchParams.get('processName');
  const elementId = searchParams.get('elementId');
  const returnTo = searchParams.get('returnTo');

  useEffect(() => {
    fetchInstanceDetails();
  }, []);

  const getDefinitionsLoad = async (name) => {
    const { data } = await get('/bpmn/getDefinitionsLoad?name='+name);
    const newNodeInfo = viewHelperNodeInfo(data.xml,elementId);
    setNodeInfo(newNodeInfo);
  };

  const fetchInstanceDetails = async () => {
    const { data } = await get('/bpmn/instances?items.id='+id);
    setInstanceDetails(data[0]);
    setInstanceItems(Array.isArray(data)?data[0]['items']:[]);
    getDefinitionsLoad(proceeName);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
  }

  const viewHelperNodeInfo = (xmlString,elementId) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");

      const userTask = xmlDoc.querySelector(`*[id="${elementId}"]`);
      const formKey = userTask.getAttribute("camunda:formKey");

      const formFields = Array.from(userTask.querySelectorAll('formData > formField')).map(field => ({
        id: field.getAttribute('id'),
        label: field.getAttribute('label'),
        type: field.getAttribute('type')
      }));
      return {formKey, formFields};
  }

  const engineInvoke = async (input) => {
    console.log(input,"engineInvoke(itemQuery ,input)")
    const itemQuery = { "items.id": id }
    const { data } = await post('/bpmn/engine/invoke', {itemQuery ,input});
    console.log(data,"result.execution.id")
    navigate(`/plugins/bpmn/instance/${data.id}`, { 
      replace: true, 
      state: { data: 'example' } 
    });
  }

  function DynamicForm({ nodeInfo }) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      engineInvoke(data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {nodeInfo === "" ? '' :
          nodeInfo.formFields.map(item => (
            <div key={item.id}>
              <Field.Root id={item.id}>
                <Field.Label>{item.label}</Field.Label>
                <TextInput
                  placeholder=""
                  {...register(item.id, {
                    required: item.required ? `${item.label}是必填项` : false
                  })}
                />
                {errors[item.id] && <Field.Error>{errors[item.id].message}</Field.Error>}
                <Field.Hint />
              </Field.Root>
            </div>
          ))
        }
        <Button type="submit">Submit</Button>
      </form>
    );
  }
  return (
    <>
      <Page.Title children={'bpmn - instance'} />
      <Page.Main>
        <Layouts.Header
          title={"Invoking Item"}
          subtitle={proceeName}
          as="h2"
        />
        <Layouts.Action startActions={
          <>
            <SearchInput label="Search" />
            {/* <CommentsStatusFilters setQueryParams={setQueryParams}/> */}
          </>
        }/>
        <Layouts.Content>
          Item id: {id}, {instanceDetails.status}
          <Table>
            <Thead>
                <Tr>
                <Th>StarterUserId</Th>
                <Th>StartDate</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                <Td>{instanceDetails.version}</Td>
                <Td>{instanceDetails.startedAt}</Td>
                </Tr>
            </Tbody>
          </Table>
          <DynamicForm nodeInfo={nodeInfo} />
        </Layouts.Content>
      </Page.Main>
    </>

  );
};

export { InvokeItemPage };