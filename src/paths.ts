export const paths = {
  home: '/dashboard/customers',
  dashboard: {    
    customers: 
    { 
      list: '/dashboard/customers', 
      create: '/dashboard/customers/create', 
      edit: '/dashboard/customers/user-edit-form'
    },
    animals: 
    { 
      list: '/dashboard/animals', 
      create: '/dashboard/animals/create', 
    },
    donations: 
    { 
      list: '/dashboard/donations', 
    },
  },
  errors: { notFound: '/errors/not-found' },
} as const;
