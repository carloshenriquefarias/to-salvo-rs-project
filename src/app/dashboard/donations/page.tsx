import * as React from 'react';

import type { Metadata } from 'next';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { DonationsListTable } from '@/components/dashboard/donations/donations-list-table';
import { paths } from '@/paths';
import { Buildings } from '@phosphor-icons/react/dist/ssr/Buildings';

export const metadata = { title: `List users` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="column" spacing={1} sx={{ flex: '1 1 auto', width:'100%'}}>

        <Typography variant="h4">Pontos de ajuda e apoio</Typography>

        <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center', width:'100%'}}>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Stack paddingTop={1.5}>
              <Buildings size={45} />            
            </Stack>

            <CardHeader 
              subheader="Encontre aqui todas os pontos de coleta disponiveis nas cidades" 
              title="Locais de arrecadação"
            />
          </Stack>

          {/* <Stack pt={3}>
            <Button
              startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
              variant="contained"
              color="primary"  
              href={paths.dashboard.customers.create}      
            >
              Cadastrar pessoa
            </Button>
          </Stack> */}
        </CardActions>
      </Stack>

      <DonationsListTable/>
    </Stack>
  );
}

