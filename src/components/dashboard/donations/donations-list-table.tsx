'use client';

import * as React from 'react';
import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { MapPin } from '@phosphor-icons/react';

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export function DonationsListTable() {
  const locais = [
    {
      id: '1',
      nome: 'Paróquia nossa senhora das graças',
      cidade: 'Porto Alegre',
      endereço: 'Avenida Wenceslau Escobar, Nº 2380, Bairro Tristeza',
      route: 'https://maps.app.goo.gl/hCakbC8aTF3aAxFu7',
      logo: 'https://www.correiodopovo.com.br/image/contentid/policy:1.750858:1677736883/Santa%20Casa.jpeg?a=2%3A1&$p$a=3c60d33',
    },
    {
      id: '2',
      nome: 'Enjoy',
      cidade: 'Canoas',
      endereço: 'Avenida Cel. Marcos, Nº 1085, Bairro Ipanema',
      route: 'https://maps.app.goo.gl/orvAMTDh9E91KkKk9',
      logo: 'https://ocorreio.com.br/wp-content/uploads/2019/12/ulbra.jpg',
    },
    {
      id: '3',
      nome: 'Portinari',
      cidade: 'Bento gonçalves',
      endereço: 'Avenida Landel de moura, Nº 430, Bairro Tristeza',
      route: 'https://maps.app.goo.gl/MUhtUddzC7PpGW2g8',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNZ__itxeBsYNGPIHRTK4jzdsKcmaU27yVixaGpBKkl6cYoIxPswlcGqwcIADPfa60L0&usqp=CAU',
    },
    {
      id: '4',
      nome: 'Anhanguera',
      cidade: 'Canoas',
      endereço: 'Avenida cavalhada, Nº 4890, Bairro Cavalhada',
      route: 'https://maps.app.goo.gl/pMGJNNBj5wKV5Tnr7',
      logo: 'https://parauapebas.pa.gov.br/wp-content/uploads/2022/05/5fb22f9f-c84f-4d23-9041-72acc0b45509.jpg',
    },  
    {
      id: '5',
      nome: 'Paróquia nossa senhora das assunção',
      cidade: 'Porto Alegre',
      endereço: 'Praça José Assunção, Nº 001, Bairro Vila assunção',
      route: 'https://maps.app.goo.gl/YGQ47SdYzAwCfh1o8',
      logo: 'https://www.correiodopovo.com.br/image/contentid/policy:1.750858:1677736883/Santa%20Casa.jpeg?a=2%3A1&$p$a=3c60d33',
    },
    {
      id: '6',
      nome: 'Santa Rita de Cassia',
      cidade: 'Rio branco',
      endereço: 'Rua Jacunda, Nº 345, Bairro Guarujá',
      route: 'https://maps.app.goo.gl/Ta1iQ4RBKAYi9du56',
      logo: 'https://ocorreio.com.br/wp-content/uploads/2019/12/ulbra.jpg',
    }, 
  ];

  return (
    <Card>
      <div>
        <Grid container spacing={2} mt={0}>
          {locais.map((local, index) => (
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
                    <Stack spacing={0}>
                      <Typography align="left" variant="body1" sx={{ textAlign: 'left' }}>
                        Nome da institução: {local.nome}
                      </Typography>
                      <Typography align="left" variant="body1" sx={{ textAlign: 'left' }} mt={1}>
                        Cidade: {local.cidade}
                      </Typography>
                      <Typography align="left" variant="body1" mt={1}>
                        Endereço: {local.endereço}
                      </Typography>
                      <Grid item lg={3} md={6} xs={6} mt={2}>
                        <Button 
                          key={local.id}
                          sx={{ display: 'flex', justifyContent: 'center'}} 
                          variant="contained" 
                          size='medium'
                          component="a" 
                          startIcon={<MapPin fontSize="var(--icon-fontSize-md)" />}
                          target="_blank"
                          href={local.route}
                        >
                          Ver a localização
                        </Button>
                      </Grid>            
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> 
      </div>

      <Divider />
      <ToastContainer />
    </Card> 
  );
}
