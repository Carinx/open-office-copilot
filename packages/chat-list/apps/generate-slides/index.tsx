/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react';

import { createRoot } from 'react-dom/client';
import { plugins } from 'chat-list/plugins/slide';
import { init } from 'chat-list/service/log';
import { UserProvider } from 'chat-list/store/userContext';
import { ChatProvider } from 'chat-list/store/chatContext';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import 'chat-list/components/icon/svg-icons-register';
import Wellcome from 'chat-list/components/wellcome';
import 'chat-list/assets/css/global.css';
import 'chat-list/assets/css/common.less';

import { DocType, IChatPlugin } from 'chat-list/types/plugin';
import { getLocalStore, setLocalStore } from 'chat-list/local/local';
import { Toaster } from "chat-list/components/ui/toaster";
// import AgentStore from 'chat-list/pages/agent-store';
import { TooltipProvider } from 'chat-list/components/ui/tooltip';
import 'chat-list/locales/i18n';
import { useTranslation } from 'react-i18next';
import GenerateSlides from 'chat-list/pages/generate-slides';
const router = createMemoryRouter(
  [

    {
      path: '/',
      element: <GenerateSlides />,
    },
    // {
    //   path: '/agent-store',
    //   element: <AgentStore />,
    // }
  ],
  {
    basename: '/',
  }
);

interface IMainProps {
  docType: DocType;
  plugins: IChatPlugin[];
}

export default function Main({ docType, plugins }: IMainProps) {
  const [wellcome, setWellcome] = useState(getLocalStore('sheet-chat-wellcome'));
  const { t, i18n } = useTranslation('base', {
    lng: 'en-US',
  });

  useEffect(() => {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.remove();
    }
  }, []);
  return (
    <React.StrictMode>
      <TooltipProvider>
        <UserProvider>
          <ChatProvider docType={docType} plugins={plugins}>
            {
              wellcome && (
                <RouterProvider router={router} />
              )
            }
            {
              !wellcome && (
                <Wellcome onStart={() => {
                  setLocalStore('sheet-chat-wellcome', '1');
                  setWellcome('1');
                }} />
              )
            }
            <Toaster />
          </ChatProvider>
        </UserProvider>
      </TooltipProvider>
    </React.StrictMode>
  );
}

export const render = () => {
  init();
  const container: any = document.getElementById('root');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<Main docType="slide" plugins={plugins} />);
};
