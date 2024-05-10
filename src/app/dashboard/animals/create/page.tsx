import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';
// import { UserCreateForm } from '@/components/dashboard/customer/user-create';
import { AnimalCreateForm } from '@/components/dashboard/animals/animal-create';

export const metadata = { title: `Register new animal` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <AnimalCreateForm/>
    </Stack>
  );
}