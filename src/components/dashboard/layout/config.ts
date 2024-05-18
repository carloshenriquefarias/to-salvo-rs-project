import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'customers', title: 'Todas as pessoas', href: paths.dashboard.customers.list, icon: 'users' },
  { key: 'animals', title: 'Animais', href: paths.dashboard.animals.list, icon: 'users' },
  { key: 'donations', title: 'Locais e doações', href: paths.dashboard.donations.list, icon: 'users' },
] satisfies NavItemConfig[];
