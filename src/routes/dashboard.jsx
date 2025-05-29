import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from '@/components/dashboard/layout/layout';
import { Layout as SettingsLayout } from '@/components/dashboard/settings/layout';

export const route = {
  path: 'dashboard',
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    {
      path: 'home',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/home');
        return { Component: Page };
      },
    },
    {
      path: 'waiter',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/chat/bot');
        return { Component: Page };
      },
    },
    {
      path: 'orders',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/orders/details');
        return { Component: Page };
      },
    },
    {
      path: 'basket',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/basket/create');
            return { Component: Page };
          },
        },
        {
          path: 'detail',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/basket/detail');
            return { Component: Page };
          },
        },
        {
          path: 'success',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/basket/success');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'analytics',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/analytics');
        return { Component: Page };
      },
    },
    {
      path: 'customers',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/customers/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/customers/create');
            return { Component: Page };
          },
        },
        {
          path: ':customerId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/customers/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'i18n',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/i18n');
        return { Component: Page };
      },
    },
    {
      path: 'orders',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/orders/list');
            return { Component: Page };
          },
        },
        {
          path: 'today',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/orders/today');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/orders/create');
            return { Component: Page };
          },
        },
        {
          path: ':orderId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/orders/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'products',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/products/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/products/create');
            return { Component: Page };
          },
        },
        {
          path: ':productId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/products/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'settings',
      element: (
        <SettingsLayout>
          <Outlet />
        </SettingsLayout>
      ),
      children: [
        {
          path: 'account',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/account');
            return { Component: Page };
          },
        },
        {
          path: 'billing',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/billing');
            return { Component: Page };
          },
        },
        {
          path: 'notifications',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/notifications');
            return { Component: Page };
          },
        },
        {
          path: 'security',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/security');
            return { Component: Page };
          },
        },
        {
          path: 'team',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/team');
            return { Component: Page };
          },
        },
        {
          path: 'integrations',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/integrations');
            return { Component: Page };
          },
        },
      ],
    },
  ],
};
