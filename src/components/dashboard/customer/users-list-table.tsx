'use client';

import * as React from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { Trash } from '@phosphor-icons/react/dist/ssr/Trash';
import { PencilLine } from '@phosphor-icons/react/dist/ssr/PencilLine';

import Modal from './modal';

import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

import { SearchBox } from './searchBox';

import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

import "react-toastify/ReactToastify.min.css";
import 'react-toastify/dist/ReactToastify.css';

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import Pagination from '@mui/material/Pagination';


export interface Users {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  mobile: string;
  dateofbirth: string;
  password: string;
}

export function UsersListTable() {

  const peopleProfileImageUrl = 'https://www.aregiao.com.br/media/desabrigados-jan24.jpg';
  const animalsProfileImageUrl = 'https://ufape.com.br/wp-content/uploads/2023/12/Ufape-Hospital-Veterinario-cachorro-cansado-GS2-MKT-Freepik.jpg';
  const registerProfileImageUrl = 'https://schippers.com.br/wp-content/uploads/2020/03/cadastro.png';
  const giveProfileImageUrl = 'https://s2-g1.glbimg.com/IGDssk7UgQ7U9syranZXexKv7gI=/0x0:696x441/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/a/x/vYkNz8SP2S3Za3AARNxA/125372306-880713102465839-5794236268828256784-n.jpg';

  const users = [
    {
      id: '1',
      name: 'Carlos Henrique',
      sexo: 'Masculino',
      idade: '32 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://www.agendartecultura.com.br/wp-content/uploads/2022/12/meneson.jpg'} sx={{ height: '150px', width: '150px' }} />,
    },
    {
      id: '2',
      name: 'João Pedro',
      sexo: 'Masculino',
      idade: '32 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/07/IMG_4029.jpg?w=732&h=412&crop=1'} sx={{ height: '150px', width: '150px' }} />,
    }, {
      id: '3',
      name: 'Henrique Jr',
      sexo: 'Masculino',
      idade: '32 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://cajamar.sp.gov.br/noticias/wp-content/uploads/sites/2/2021/07/site-vacinacao-33-anos.png'} sx={{ height: '150px', width: '150px' }} />,
    }, {
      id: '4',
      name: 'Maria Julia',
      sexo: 'Masculino',
      idade: '32 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf3nrGZD31Y7wdGv7HZR-b7atmn2KCQDvt_w954nYszg&s'} sx={{ height: '150px', width: '150px' }} />,
    }, {
      id: '5',
      name: 'Ashley Cole',
      sexo: 'Masculino',
      idade: '32 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://tm.ibxk.com.br/2019/02/17/17124052466014.jpg'} sx={{ height: '150px', width: '150px' }} />,
    }, {
      id: '6',
      name: 'Palmer Watson',
      sexo: 'Masculino',
      idade: '32 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://amanha.com.br/images/p/15603/Bruno-de-Oliveira.jpg'} sx={{ height: '150px', width: '150px' }} />,
    }, {
      id: '7',
      name: 'Pedro da silva',
      sexo: 'Masculino',
      idade: '32 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://img.freepik.com/fotos-gratis/estilo-de-vida-beleza-e-moda-conceito-de-emocoes-de-pessoas-jovem-gerente-de-escritorio-feminino-asiatico-ceo-com-expressao-satisfeita-em-pe-sobre-um-fundo-branco-sorrindo-com-os-bracos-cruzados-sobre-o-peito_1258-59329.jpg?size=626&ext=jpg&ga=GA1.1.672697106.1715212800&semt=sph'} sx={{ height: '150px', width: '150px' }} />,
    }, {
      id: '8',
      name: 'Dhiane Filho',
      sexo: 'Masculino',
      idade: '32 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://img.freepik.com/fotos-gratis/feliz-jovem-sucedido-gerente-retrato_1262-16187.jpg'} sx={{ height: '150px', width: '150px' }} />,
    }, {
      id: '9',
      name: 'Oliver Pam',
      sexo: 'Masculino',
      idade: '32 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/07/IMG_4032.jpg?w=732&h=412&crop=1'} sx={{ height: '150px', width: '150px' }} />,
    }, {
      id: '10',
      name: 'Antonio Andrade',
      sexo: 'Masculino',
      idade: '32 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://i.pinimg.com/236x/4c/20/2b/4c202b6376037a5fc660a6c7b6e55661.jpg'} sx={{ height: '150px', width: '150px' }} />,
    },
  ];

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  // const [users, setUsers] = useState<Users[]>([]);
  const [rechargeListUsers, setRechargeListUsers] = useState(false);

  const handleOpenModal = (userId: any) => {
    setSelectedUserId(userId);
    setOpen(true);
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

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUserId(null);
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

        setRechargeListUsers(true);
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

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchAllUsers();
    setRechargeListUsers(false);
  }, [rechargeListUsers]);

  return (
    <Card>

      <Grid container spacing={2}>
        <Grid item xl={12} lg={6} md={6} xs={12}>
          {/* <SearchBox/> */}

          <Card sx={{ px: 2, py: 2, alignItems: 'space-between', justifyContent: 'center' }}>
            <OutlinedInput
              value={searchTerm}
              onChange={handleSearch}
              fullWidth
              placeholder="Digite o nome da pessoa que procura..."
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
                color="primary"
                sx={{ backgroundColor: '#1481b8' }}
              >
                Clique aqui para realizar a busca
              </Button>
            </Stack> */}
          </Card>
        </Grid>
      </Grid>

      {/* <Box sx={{ overflowX: 'auto' }} mt={5}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>User name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Birth date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length > 0 && users.map((user, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                    <Typography variant="subtitle2">{user.firstname}</Typography>
                  </Stack>
                </TableCell>

                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{(formatPhoneNumber(user.mobile))}</TableCell>
                <TableCell>{(formatDate(user.dateofbirth))}</TableCell>

                <TableCell>
                  <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                    <Button
                      startIcon={<PencilLine fontSize="var(--icon-fontSize-md)" />}
                      variant="contained"
                      onClick={() => handleClickEditUser(user.id)}
                      sx={{
                        backgroundColor: '#00aaff',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#1481b8',
                          color: 'white',
                        }
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      startIcon={<Trash fontSize="var(--icon-fontSize-md)" />}
                      variant="contained"
                      onClick={() => { handleOpenModal(user.id) }}
                      sx={{ backgroundColor: '#ff6961', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box> */}

      <div>
        {searchTerm === '' ? (
          <Grid container spacing={2} mt={0}>
            {users.map((user, index) => (
              <Grid key={index} item xl={3} lg={6} md={6} xs={12}>
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
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Stack>
                          {user.logo}
                        </Stack>
                      </Box>
                      <Stack spacing={0} my={2}>
                        <Typography align="left" variant="body2">
                          Nome: {user.name}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Idade: {user.idade}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Sexo: {user.sexo}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Local de resgate: {user.localDeResgate}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Abrigo: {user.abrigo}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Data do cadastro: {user.dataDoCadastro}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Cadastrado por: {user.cadastradoPor}
                        </Typography>
                      </Stack>
                      <Button variant="contained" color="primary">
                        Ver perfil completo
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2} mt={0.5}>
            {filteredUsers.map((user, index) => (
              <Grid key={index} item xl={3} lg={6} md={6} xs={12} >
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
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Stack>
                          {user.logo}
                        </Stack>
                      </Box>
                      <Stack spacing={0} my={2}>
                        <Typography align="left" variant="body2">
                          Nome: {user.name}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Idade: {user.idade}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Sexo: {user.sexo}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Local de resgate: {user.localDeResgate}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Abrigo: {user.abrigo}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Data do cadastro: {user.dataDoCadastro}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Cadastrado por: {user.cadastradoPor}
                        </Typography>
                      </Stack>
                      <Button variant="contained" color="primary">
                        Ver perfil completo
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination count={10} defaultPage={6} variant="outlined" shape="rounded" />
      </Stack>

      <Modal
        open={open}
        handleClose={handleCloseModal}
        handleDeleteUserById={handleDeleteUser}
      />

      <Divider />
      <ToastContainer />
    </Card>
  );
}
