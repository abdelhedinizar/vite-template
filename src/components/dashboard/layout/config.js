import { paths } from '@/paths';

export const layoutConfig = {
  navItems: [
    {
      key: 'dashboards',
      title: 'Dashboards',
      items: [
        { key: 'home', title: 'Home', href: paths.dashboard.home, icon: 'house' },
        { key: 'orders', title: 'Orders', href: paths.dashboard.ordersDetail, icon: 'receipt' },
        { key: 'analytics', title: 'Analytics', href: paths.dashboard.analytics, icon: 'chart-pie' },
      ],
    },
    {
      key: 'general',
      title: 'General',
      items: [
        {
          key: 'settings',
          title: 'Settings',
          href: paths.dashboard.settings.account,
          icon: 'gear',
          matcher: { type: 'startsWith', href: '/dashboard/settings' },
        },
        {
          key: 'customers',
          title: 'Customers',
          icon: 'users',
          items: [
            { key: 'customers', title: 'List customers', href: paths.dashboard.customers.list },
            { key: 'customers:create', title: 'Create customer', href: paths.dashboard.customers.create },
            { key: 'customers:details', title: 'Customer details', href: paths.dashboard.customers.details('1') },
          ],
        },
        {
          key: 'products',
          title: 'Products',
          icon: 'shopping-bag-open',
          items: [
            { key: 'products', title: 'List products', href: paths.dashboard.products.list },
            { key: 'products:create', title: 'Create product', href: paths.dashboard.products.create },
            { key: 'products:details', title: 'Product details', href: paths.dashboard.products.details('1') },
          ],
        },
        {
          key: 'orders',
          title: 'Orders',
          icon: 'shopping-cart-simple',
          items: [
            { key: 'orders', title: 'order history', href: paths.dashboard.orders.list },
            { key: 'orders', title: "today's orders", href: paths.dashboard.orders.todaylist },
            { key: 'orders:create', title: 'Create order', href: paths.dashboard.orders.create },
            { key: 'orders:details', title: 'Order details', href: paths.dashboard.orders.details('1') },
          ],
        },
      ],
    }/*,
    {
      key: 'other',
      title: 'Other',
      items: [
        {
          key: 'auth',
          title: 'Auth',
          icon: 'lock',
          items: [
            {
              key: 'auth:sign-in',
              title: 'Sign in',
              items: [
                { key: 'auth:sign-in:centered', title: 'Centered', href: paths.auth.samples.signIn.centered },
                { key: 'auth:sign-in:split', title: 'Split', href: paths.auth.samples.signIn.split },
              ],
            },
            {
              key: 'auth:sign-up',
              title: 'Sign up',
              items: [
                { key: 'auth:sign-up:centered', title: 'Centered', href: paths.auth.samples.signUp.centered },
                { key: 'auth:sign-up:split', title: 'Split', href: paths.auth.samples.signUp.split },
              ],
            },
            {
              key: 'auth:reset-password',
              title: 'Reset password',
              items: [
                {
                  key: 'auth:reset-password:centered',
                  title: 'Centered',
                  href: paths.auth.samples.resetPassword.centered,
                },
                { key: 'auth:reset-password:split', title: 'Split', href: paths.auth.samples.resetPassword.split },
              ],
            },
            {
              key: 'auth:update-password',
              title: 'Update password',
              items: [
                {
                  key: 'auth:update-password:centered',
                  title: 'Centered',
                  href: paths.auth.samples.updatePassword.centered,
                },
                { key: 'auth:update-password:split', title: 'Split', href: paths.auth.samples.updatePassword.split },
              ],
            },
            {
              key: 'auth:verify-code',
              title: 'Verify code',
              items: [
                { key: 'auth:verify-code:centered', title: 'Centered', href: paths.auth.samples.verifyCode.centered },
                { key: 'auth:verify-code:split', title: 'Split', href: paths.auth.samples.verifyCode.split },
              ],
            },
          ],
        },
        { key: 'pricing', title: 'Pricing', href: paths.pricing, icon: 'credit-card' },
        { key: 'checkout', title: 'Checkout', href: paths.checkout, icon: 'sign-out' },
        { key: 'contact', title: 'Contact', href: paths.contact, icon: 'address-book' },
        {
          key: 'error',
          title: 'Error',
          icon: 'file-x',
          items: [
            { key: 'error:not-authorized', title: 'Not authorized', href: paths.notAuthorized },
            { key: 'error:not-found', title: 'Not found', href: paths.notFound },
            { key: 'error:internal-server-error', title: 'Internal server error', href: paths.internalServerError },
          ],
        },
      ],
    },
    {
      key: 'misc',
      title: 'Misc',
      items: [
        { key: 'i18n', title: 'i18n', href: paths.dashboard.i18n, icon: 'translate' },
      ],
    },
    */
  ],
};
