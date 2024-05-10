import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'customers', title: 'Todas as pessoas', href: paths.dashboard.customers.list, icon: 'users' },
  { key: 'customers', title: 'Animais', href: paths.dashboard.customers.list, icon: 'users' },
] satisfies NavItemConfig[];
