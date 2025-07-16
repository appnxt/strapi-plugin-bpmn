import React, { useRef, useEffect } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

const Modeler = ({initialXml, onXmlChange }) => {
  const containerRef = useRef(null);
  const modelerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !modelerRef.current) {
      modelerRef.current = new BpmnModeler({
        container: containerRef.current
      });

      if (initialXml) {
        modelerRef.current.importXML(initialXml)
          .then(() => modelerRef.current.get('canvas').zoom('fit-viewport'))
          .catch(err => console.error('Initial load error', err));
      } else {
        modelerRef.current.createDiagram();
      }
      
      modelerRef.current.on('commandStack.changed', async () => {
        try {
          const { xml } = await modelerRef.current.saveXML({ format: true });
          onXmlChange(xml);
        } catch (err) {
          console.error('Error saving XML', err);
        }
      });
    }

    return () => {
      if (modelerRef.current) {
        modelerRef.current.destroy();
        modelerRef.current = null;
      }
    };
  }, [initialXml]);

  return (
    <div 
      ref={containerRef} 
      style={{ height: '500px', border: '1px solid #ccc' }}
    />
  );
};

export { Modeler } ;