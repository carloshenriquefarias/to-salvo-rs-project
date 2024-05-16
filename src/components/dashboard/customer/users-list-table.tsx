'use client';

import * as React from 'react';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Avatar, Box, Button, Card, Divider, CardContent, Grid, Pagination, Stack, Typography} from '@mui/material';

import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import 'react-toastify/dist/ReactToastify.css';

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { WhatsappLogo } from '@phosphor-icons/react';

interface PersonI {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  cidadeDeResgate: string;
  abrigo: string;
  fotoCamera: string;
  fotoGaleria: string;
  observacao: null;
  situacao: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export function UsersListTable() {

  const userDefault = 'https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'

  const [allPeopleOriginal, setAllPeopleOriginal] = useState<PersonI[]>([]);
  const [allPeople, setAllPeople] = useState<PersonI[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleShare = async (user: PersonI) => {
    try {
      const shareURL = `https://tosalvo.ong.br/user/${user.id}`;
      await navigator.share({
        title: 'Compartilhar usuário',
        text: `Veja as informações de ${user.nome}`,
        url: shareURL,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  const buildShareURL = (user: string) => {
    const params = new URLSearchParams();
    Object.entries(user).forEach(([key, value]) => {
      params.append(key, value);
    });
    return `https://tosalvo.ong.br/informacoes-usuario?${params.toString()}`;
  };

  const fetchAllUsers = async () => {
    try {
      const response = await api.post('/tosalvo/api/v2/people');
      const newsResponse = response.data;
      setAllPeople(newsResponse?.data)
      setAllPeopleOriginal(newsResponse?.data)

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load users details');
    }
  };

  const filteredUsers = (term: string) => {
    setSearchTerm(term);
    term = term.trim().toLowerCase();
    if (term !== '') {
      const filtered = allPeople.filter(user =>
        user.nome.toLowerCase().includes(term) ||
        user.abrigo.toLowerCase().includes(term) ||
        user.cidadeDeResgate.toLowerCase().includes(term) ||
        user.cpf.toLowerCase().includes(term) ||
        user.dataNascimento.toLowerCase().includes(term)
      );
      setAllPeople(filtered);
    } else {
      setAllPeople(allPeopleOriginal);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Card sx={{ px: 2, py: 2, alignItems: 'space-between', justifyContent: 'center' }}>
            <OutlinedInput
              value={searchTerm}
              onChange={(e) => filteredUsers(e.target.value)}
              fullWidth
              placeholder="Digite o nome da pessoa, sexo, abrigo, idade que procura..."
              startAdornment={
                <InputAdornment position="start">
                  <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                </InputAdornment>
              }
              sx={{ maxWidth: 'full' }}
            />
          </Card>
        </Grid>
      </Grid>

      <div>
        {allPeople.length > 0 ? (
          <Grid container spacing={2} mt={0}>
            {allPeople.map((user, index) => (
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
                          {user.fotoCamera ? (
                            <Avatar 
                              src={'https://techsoluctionscold.com.br/tosalvo/'+ user.fotoCamera} 
                              sx={{ height: '150px', width: '150px' }} 
                            />
                          ) : (
                            <Avatar src={userDefault} sx={{ height: '150px', width: '150px' }} />
                          )}
                        </Stack>
                      </Box>

                      <Stack spacing={0} my={2}>
                        <Typography align="left" variant="body2">
                          Nome: {user.nome}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Local de resgate: {user.cidadeDeResgate}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Abrigo: {user.abrigo}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Data de nascimento: {formatDate(user.dataNascimento)}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Data de cadastro: {formatDate(user.created_at)}
                        </Typography>
                      </Stack>

                      <Button
                        color="primary"
                        key={user.id}
                        sx={{
                          background: "#1E854E",
                          color: "#FFF",
                          '&:hover': {
                            background: "#25D366",
                          }
                        }}
                        startIcon={<WhatsappLogo fontSize="var(--icon-fontSize-md)" />}
                        onClick={() => handleShare(user)}
                      >
                        Encaminhar informações
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2} mt={0.5}>
            {allPeople.map((user, index) => (
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
                          {user.nome}
                        </Stack>
                      </Box>
                      
                      <Stack spacing={0} my={2}>
                        <Typography align="left" variant="body2">
                          Nome: {user.nome}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Local de resgate: {user.cidadeDeResgate}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Abrigo: {user.abrigo}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Data de nascimento: {formatDate(user.dataNascimento)}
                        </Typography>
                        <Typography align="left" variant="body2">
                          Data de cadastro: {formatDate(user.created_at)}
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

      <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination count={10} defaultPage={6} variant="outlined" shape="rounded" />
      </Stack>

      <Divider />
      <ToastContainer />
    </Card>
  );
}
