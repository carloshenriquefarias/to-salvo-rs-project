'use client';

import * as React from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

import { 
  Avatar, Button, Box, Card, CardContent, InputAdornment, 
  Divider, Grid, OutlinedInput, Pagination, Stack, Typography 
} from '@mui/material';

// import ModalFilterAnimals from './modalFilterAnimals';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

interface Local {
  id: string;
  nome: string;
  cidade: string;
  endereço: string;
  logo: string;
  // microchip: string;
  // especie: string;
  // raça: string;
  // abrigo: string;
  // dataDoCadastro: string;
  // cadastradoPor: string;
  // route: string;
}

export function DonationsListTable() {

  const animalDefault = 'https://images.vexels.com/media/users/3/235658/isolated/preview/ab14b963565a4c5ab27169d90c341994-animais-silhueta-21.png'

  const locais = [
    {
      id: '1',
      nome: 'Paróquia nossa senhora das graças',
      cidade: 'Porto Alegre',
      endereço: 'Avenida Wenceslau Escobar, Nº 2380, Bairro Tristeza',
      logo: 'https://www.correiodopovo.com.br/image/contentid/policy:1.750858:1677736883/Santa%20Casa.jpeg?a=2%3A1&$p$a=3c60d33',
    },
    {
      id: '2',
      nome: 'Enjoy',
      cidade: 'Canoas',
      endereço: 'Avenida Cel. Marcos, Nº 1085, Bairro Ipanema',
      logo: 'https://ocorreio.com.br/wp-content/uploads/2019/12/ulbra.jpg',
    },
    {
      id: '3',
      nome: 'Portinari',
      cidade: 'Bento gonçalves',
      endereço: 'Avenida Landel de moura, Nº 430, Bairro Tristeza',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNZ__itxeBsYNGPIHRTK4jzdsKcmaU27yVixaGpBKkl6cYoIxPswlcGqwcIADPfa60L0&usqp=CAU',
    },
    {
      id: '4',
      nome: 'Anhanguera',
      cidade: 'Canoas',
      endereço: 'Avenida cavalhada, Nº 4890, Bairro Cavalhada',
      logo: 'https://parauapebas.pa.gov.br/wp-content/uploads/2022/05/5fb22f9f-c84f-4d23-9041-72acc0b45509.jpg',
    },  
    {
      id: '5',
      nome: 'Paróquia nossa senhora das assunção',
      cidade: 'Porto Alegre',
      endereço: 'Praça José Assunção, Nº 001, Bairro Vila assunção',
      logo: 'https://www.correiodopovo.com.br/image/contentid/policy:1.750858:1677736883/Santa%20Casa.jpeg?a=2%3A1&$p$a=3c60d33',
    },
    {
      id: '6',
      nome: 'Santa Rita de Cassia',
      cidade: 'Rio branco',
      endereço: 'Rua Jacunda, Nº 345, Bairro Guarujá',
      logo: 'https://ocorreio.com.br/wp-content/uploads/2019/12/ulbra.jpg',
    },
    // {
    //   id: '7',
    //   nome: 'Unopar',
    //   cidade: 'Bento gonçalves',
    //   logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNZ__itxeBsYNGPIHRTK4jzdsKcmaU27yVixaGpBKkl6cYoIxPswlcGqwcIADPfa60L0&usqp=CAU',
    // },
    // {
    //   id: '8',
    //   nome: 'Escola bom jesus',
    //   cidade: 'Canoas',
    //   logo: 'https://parauapebas.pa.gov.br/wp-content/uploads/2022/05/5fb22f9f-c84f-4d23-9041-72acc0b45509.jpg',
    // },   
  ];

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [consult, setConsult] = useState<Local[]>(locais);
  const [rechargeListAnimals, setRechargeListAnimals] = useState(false);
  const [originalAnimals, setOriginalAnimals] = useState<Local[]>(locais);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    handleResetFilter();
    setOpen(false);
  };

  const handleConsult = (animals: Local[]) => {
    setConsult(animals);
    console.log('Dados recebidos do bicho:', animals);
  };

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleClickEditUser = async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push(`/dashboard/customers/edit/${userId}`);
  };

  const fetchAllUsers = async () => {
    try {
      const response = await api.post('/crud_users/api/v2/users');
      const newsResponse = response.data;
      // setUsers(newsResponse?.data)

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load users details');
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUserId) {
      try {
        const formData = new FormData();
        formData.append("id", selectedUserId);

        const deleteUserEndpoint = '/crud_users/api/v2/user/delete';
        const response = await api.post(deleteUserEndpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.status) {
          toastApiResponse(response, response.data.message);
        }

        setRechargeListAnimals(true);
        handleCloseModal();

      } catch (error) {
        toastApiResponse(null, 'It is not possible to delete this user');
      }
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    let formattedValue = '';
    if (cleaned.length > 0) {
      formattedValue = `(${cleaned.slice(0, 3)})`;
      if (cleaned.length > 3) {
        formattedValue += ` ${cleaned.slice(3, 8)}`;
        if (cleaned.length > 8) {
          formattedValue += `-${cleaned.slice(8, 12)}`;
        }
      }
    }
    return formattedValue;
  };

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredAnimals = (term: string) => {
    setSearchTerm(term);
    if (term.trim() !== '') {
      const filtered = originalAnimals.filter(user =>
        user.nome.toLowerCase().includes(term.toLowerCase())
      );
      setConsult(filtered);
    } else {
      setConsult(originalAnimals);
    }
  };

  const handleResetFilter = () => {
    setSearchTerm('');
    setOriginalAnimals(locais);
    // setConsult(animals);
  }

  useEffect(() => {
    fetchAllUsers();
    setRechargeListAnimals(false);
  }, [rechargeListAnimals]);

  return (
    <Card>

      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} xs={12}>

          <Card sx={{ px: 2, py: 2, alignItems: 'space-between', justifyContent: 'center' }}>
            <OutlinedInput
              value={searchTerm}
              onChange={(e) => filteredAnimals(e.target.value)}
              fullWidth
              placeholder="Digite o nome do local que procura..."
              startAdornment={
                <InputAdornment position="start">
                  <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                </InputAdornment>
              }
              sx={{ maxWidth: 'full' }}
            />

            {/* <Stack py={2}>
              <Button
                startIcon={<MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />}
                variant="contained"
                onClick={handleOpenModal}
                sx={{ backgroundColor: '#1481b8', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
              >
                Clique aqui para realizar uma busca avançada
              </Button>
            </Stack> */}
          </Card>
        </Grid>
      </Grid>

      <div>
        {consult.length > 0 ? (
          <Grid container spacing={2} mt={0}>
            {consult.map((locais, index) => (
              <Grid key={index} item xl={12} lg={12} md={12} xs={12}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: "all 0.25s",
                    transitionTimingFunction: "spring(1 100 10 10)",
                    '&:hover': { transform: 'translateY(-5px)' }
                  }}
                >
                  <CardContent sx={{ flex: '1 1 auto' }}>
                    <Stack spacing={0}>
                      {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Stack>
                          {locais.logo ? (
                            <Avatar src={locais.logo} sx={{ height: '200px', width: '200px', borderRadius: '10px' }} variant='square'/>
                          ) : (
                            <Avatar src={animalDefault} sx={{ height: '150px', width: '150px' }} variant='square' />
                          )}
                        </Stack>
                      </Box> */}

                      <Stack spacing={0}>
                        {/* <Typography align="left" variant="body2" sx={{ color: 'GrayText', textAlign: 'center' }}>
                          Nome da institução:
                        </Typography> */}
                        <Typography align="left" variant="body1" sx={{ textAlign: 'left' }}>
                          Nome da institução: {locais.nome}
                        </Typography>

                        {/* <Typography align="left" variant="body2" sx={{ color: 'GrayText', textAlign: 'center' }} mt={2}>
                          Cidade:
                        </Typography> */}
                        <Typography align="left" variant="body1" sx={{ textAlign: 'left' }} mt={1}>
                          Cidade: {locais.cidade}
                        </Typography>
                        <Typography align="left" variant="body1" mt={1}>
                          Endereço: {locais.endereço}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2} mt={0.5}>
            {consult.map((locais, index) => (
              <Grid key={index} item xl={12} lg={12} md={12} xs={12}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: "all 0.25s",
                    transitionTimingFunction: "spring(1 100 10 10)",
                    '&:hover': { transform: 'translateY(-5px)' }
                  }}
                >
                  <CardContent sx={{ flex: '1 1 auto' }}>
                    <Stack spacing={0}>
                      {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Stack>
                          {locais.logo ? (
                            <Avatar src={locais.logo} sx={{ height: '150px', width: '150px' }} />
                          ) : (
                            <Avatar src={animalDefault} sx={{ height: '150px', width: '150px' }} />
                          )}
                        </Stack>
                      </Box> */}
                      <Stack spacing={0} my={1}>
                        <Typography align="left" variant="body1">
                          Nome da institução: {locais.nome}
                        </Typography>
                        <Typography align="left" variant="body1">
                          Cidade: {locais.cidade}
                        </Typography>
                        <Typography align="left" variant="body1">
                          Endereço: {locais.endereço}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      {consult !== originalAnimals && (
        <Grid container justifyContent={'flex-end'} pr={2}>
          <Button variant="contained" color="primary" onClick={handleResetFilter}>
            Limpar filtros
          </Button>
        </Grid>
      )}

      {/* <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination count={10} defaultPage={6} variant="outlined" shape="rounded" />
      </Stack> */}

      {/* <ModalFilterAnimals
        open={open}
        handleClose={handleCloseModal}
        onConsult={handleConsult}
      /> */}

      <Divider />
      <ToastContainer />
    </Card>
  );
}
