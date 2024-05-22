'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

import {
  Avatar, Box, Card, CircularProgress, Divider, CardContent, Grid,
  InputAdornment, OutlinedInput, Pagination, Stack, Typography
} from '@mui/material';

import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { processString } from '@/utils/Helpers';

interface Animals {
  id: string;
  nomeDono: string;
  nomeAnimal: string;
  telefoneDono: string;
  sexo: string;
  microchip: string;
  especie: string;
  raca: string;
  abrigo: string;
  fotoCamera: string;
  fotoGaleria: string;
  dataDoCadastro: string;
  cadastradoPor: string;
  situacao: string;
  created_at: string;
  route: string;
  logo: string;
}

export function AnimalsListTable() {

  const animalDefault = 'https://images.vexels.com/media/users/3/235658/isolated/preview/ab14b963565a4c5ab27169d90c341994-animais-silhueta-21.png'
  const ITEMS_PER_PAGE = 12;

  const [allAnimals, setAllAnimals] = useState<Animals[]>([]);
  const [allAnimalsOriginal, setAllAnimalsOriginal] = useState<Animals[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [historySearch, setHistorySearch] = useState('');
  const [loading, setLoading] = useState(true);

  const getCurrentPageData = () => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return allAnimals.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const currentPageData = getCurrentPageData();

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const count = Math.ceil(allAnimals.length / ITEMS_PER_PAGE);

  const fetchAllAnimals = async () => {
    try {
      setLoading(true);
      const response = await api.post('/tosalvo/api/v2/animals');
      const newsResponse = response.data;
      setAllAnimals(newsResponse?.data)
      setAllAnimalsOriginal(newsResponse?.data)
      setLoading(false);

    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      toastApiResponse(error, 'It is not possible to load animals details');
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

  const filteredAnimals = (term: string) => {
    setLoading(true);
    setSearchTerm(term);
    term = (term).toLowerCase();

    if (term !== '' && term.length > historySearch.length) {
      const filtered = allAnimals.filter(animal =>
        processString(animal.nomeAnimal).includes(term) ||
        processString(animal.nomeDono).includes(term) ||
        processString(animal.microchip).includes(term) ||
        processString(animal.sexo).includes(term) ||
        processString(animal.especie).includes(term) ||
        processString(animal.abrigo).includes(term)
      );
      setAllAnimals(filtered);
    } else if (term.length < historySearch.length) {
      const ram = allAnimalsOriginal;

      const filtered = ram.filter(animal =>
        processString(animal.nomeAnimal).includes(term) ||
        processString(animal.nomeDono).includes(term) ||
        processString(animal.microchip).includes(term) ||
        processString(animal.sexo).includes(term) ||
        processString(animal.especie).includes(term) ||
        processString(animal.abrigo).includes(term)
      );
      setAllAnimals(filtered);
    }

    setHistorySearch(term);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllAnimals();
  }, []);

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} xs={12}>
          <Card sx={{ px: 2, py: 2, alignItems: 'space-between', justifyContent: 'center' }}>
            <OutlinedInput
              value={searchTerm}
              onChange={(e) => filteredAnimals(e.target.value)}
              fullWidth
              placeholder="Digite o nome do animal que procura..."
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

      {loading ?
        <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress size={"2rem"} />
        </Stack>
        :
        <div>
          {allAnimals.length === 0 && loading === false ? (
            <div style={{ padding: "1rem", display: "flex", justifyContent: 'center' }}>
              Registro não encontrado!
            </div>
          ) : (
            <Grid container spacing={2} mt={0} px={1}>
              {currentPageData.map((animal, index) => (
                animal.situacao === '1' && (
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
                              {animal.fotoGaleria ? (
                                <Avatar
                                  src={'https://techsoluctionscold.com.br/tosalvo/' + animal.fotoGaleria}
                                  sx={{ height: '150px', width: '150px' }}
                                />
                              ) : (
                                animal.fotoCamera ? (
                                  <Avatar
                                    src={'https://techsoluctionscold.com.br/tosalvo/' + animal.fotoCamera}
                                    sx={{ height: '150px', width: '150px' }}
                                  />
                                ) : (
                                  <Avatar src={animalDefault} sx={{ height: '150px', width: '150px' }} />
                                )
                              )
                              }
                            </Stack>
                          </Box>

                          <Stack spacing={0} my={2}>
                            {animal.nomeDono && (
                              <>
                                <Typography align="left" variant="body2">
                                  Dono: {animal.nomeDono}
                                </Typography>
                                <Typography align="left" variant="body2">
                                  Telefone: {formatPhoneNumber(animal.telefoneDono)}
                                </Typography>
                              </>
                            )}

                            <Typography align="left" variant="body2">
                              Nome do animal: {animal.nomeAnimal}
                            </Typography>
                            <Typography align="left" variant="body2">
                              Raça: {animal.raca}
                            </Typography>
                            <Typography align="left" variant="body2">
                              Especie: {animal.especie}
                            </Typography>
                            <Typography align="left" variant="body2">
                              Microchip: {animal.microchip}
                            </Typography>
                            <Typography align="left" variant="body2">
                              Abrigo: {animal.abrigo}
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              ))}
            </Grid>
          )}
        </div>
      }

      <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination count={count} defaultPage={page} onChange={handleChange} variant="outlined" shape="rounded" color='primary' />
      </Stack>

      <Divider />
      <ToastContainer />
    </Card>
  );
}
