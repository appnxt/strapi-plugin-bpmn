import { Layouts } from '@strapi/strapi/admin';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SideNav } from '../components/SideNav';
import { ProcessesPage } from './process';
import { ProcessesDetailPage } from './process/form';
import { InstancePage } from './instance';
import { InstanceDetailPage } from './instance/detail';
import { InvokeItemPage } from './instance/invokeItem';

const InnerApp = () => {
  // const setSettings = useSettingsStore(state => state.setSettings);
  // const { isLoading, data: config } = useConfig(setSettings);
  // if (isLoading || !config) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Layouts.Root sideNav={<SideNav />}>
      <Routes>
        <Route path="/processes" element={<ProcessesPage />} />
        <Route path="/process/:name" element={<ProcessesDetailPage  />} />
        <Route path="/instances/running" element={<InstancePage />} />
        <Route path="/instances/end" element={<InstancePage />} />
        <Route path="/instance/:id" element={<InstanceDetailPage />} />
        <Route path="/invokeItem" element={<InvokeItemPage />} />
        <Route path="*" element={<Navigate to="instances" replace />} />
      </Routes>
    </Layouts.Root>
  );
};

const App = () => {
  return (
    <InnerApp />
  );
};

export {App} ;
