import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import NotFoundPage from './pages/404';
import EditorPage from './pages/Editor';

const App: React.FC = () => {
  return (
    <React.Suspense fallback={<>loading...</>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EditorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default App;
