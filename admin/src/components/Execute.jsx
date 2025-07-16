import { Link } from 'react-router-dom';
const Execute = ({item,name}) => {
    var ref = `?id=${item.id}&processName=${name}&elementId=${item.elementId}`
  return (<>
    <Link to={"/plugins/bpmn/invokeItem"+ref}>{(item.status === 'wait' && item.type === 'bpmn:UserTask') ? 'Execute' : ''} </Link>
    {/* <a href={"/assign${ref}"} >
        {(item.status === 'wait' && item.type === 'bpmn:UserTask') ? 'Assign' : ''}
    </a> */}
  </>);
};

export { Execute };
