// 'use client';

// import * as React from 'react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CircularProgress from '@mui/material/CircularProgress';
// import Divider from '@mui/material/Divider';
// import { Grid } from '@mui/material';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// import { toastApiResponse } from '@/utils/Toast';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/ReactToastify.min.css";
// import 'react-toastify/dist/ReactToastify.css';

// import { BookOpenText, PencilLine, Trash, UserPlus } from '@phosphor-icons/react';

// export function LandingPage(): React.JSX.Element {

//   const iconColor = '#635BFF'
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const integrations = [
//     {
//       id: '1',
//       title: 'Create',
//       description: 'Register a new user inside our database with your personal data.',
//       logo: <UserPlus size={45} color={iconColor} />
//     },
//     {
//       id: '2',
//       title: 'List',
//       description: 'All users registered in this sistem are show up for the currently user.',
//       logo: <BookOpenText size={45} color={iconColor} />,
//     },
//     {
//       id: '3',
//       title: 'Edit',
//       description: 'If you are not satisfected, you can change data and do new uptades.',
//       logo: <PencilLine size={45} color={iconColor} />
//     },
//     {
//       id: '4',
//       title: 'Delete',
//       description: 'Are you not satisfected? Do not worry, you can delete your user.',
//       logo: <Trash size={45} color={iconColor} />
//     },
//   ];

//   const handleClickListUsers = async () => {
//     setIsLoading(true);
//     toastApiResponse(null, 'Welcome to CRUD Test CF Partners! We hope you enjoy it a lot! Good luck!');
//     await new Promise(resolve => setTimeout(resolve, 3000));
//     router.push(`/dashboard/customers`);
//     setIsLoading(false);
//   };

//   return (
//     <Stack spacing={2}>
//       <Stack spacing={1} direction={'column'}>
//         <Typography color="inherit" sx={{ textAlign: 'center' }} variant="h4">
//           Welcome to project test  {' '}
//           <Box component="span" sx={{ color: '#635BFF' }}>
//             CRUD from CF Partners
//           </Box>
//         </Typography>

//         <Typography variant="h6" sx={{ mt: 2, lineHeight: '1.5em', textAlign: 'center' }}>
//           This project is about a create, read, update, delete users for
//           application for managing user details and credentials
//         </Typography>
//       </Stack>

//       <Grid container spacing={2} mb={2}>
//         {integrations.map((integration, index) => (
//           <Grid key={index} item lg={6} md={6} xs={12}>
//             <Card
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 height: '100%',
//                 transition: "all 0.25s",
//                 transitionTimingFunction: "spring(1 100 10 10)",
//                 '&:hover': { transform: 'translateY(-5px)' }
//               }
//               }>
//               <CardContent sx={{ flex: '1 1 auto' }}>
//                 <Stack spacing={1}>
//                   <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                     <Stack>
//                       {integration.logo}
//                     </Stack>
//                   </Box>
//                   <Stack spacing={1}>
//                     <Typography align="center" variant="h5">
//                       {integration.title}
//                     </Typography>
//                     <Typography align="center" variant="body1">
//                       {integration.description}
//                     </Typography>
//                   </Stack>
//                 </Stack>
//               </CardContent>
//               <Divider />
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Button variant="contained" color="primary" onClick={handleClickListUsers}>
//         {isLoading ? (
//           <CircularProgress size={14} color="inherit" />
//         ) : (
//           'Know the project'
//         )}
//       </Button>

//       <ToastContainer />
//     </Stack>
//   );
// }


'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { BookOpenText, PencilLine, Trash, UserPlus } from '@phosphor-icons/react';

export function LandingPage(): React.JSX.Element {

  const iconColor = '#635BFF'
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const peopleProfileImageUrl = 'https://www.aregiao.com.br/media/desabrigados-jan24.jpg';
  const animalsProfileImageUrl = 'https://ufape.com.br/wp-content/uploads/2023/12/Ufape-Hospital-Veterinario-cachorro-cansado-GS2-MKT-Freepik.jpg';
  const registerProfileImageUrl = 'https://schippers.com.br/wp-content/uploads/2020/03/cadastro.png';
  const giveProfileImageUrl = 'https://s2-g1.glbimg.com/IGDssk7UgQ7U9syranZXexKv7gI=/0x0:696x441/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/a/x/vYkNz8SP2S3Za3AARNxA/125372306-880713102465839-5794236268828256784-n.jpg';

  const integrations = [
    {
      id: '1',
      title: 'Pessoas',
      description: 'Encontre as pessoas desaparecidas na enchente',
      // logo: <UserPlus size={45} color={iconColor} />,
      route: '/dashboard/customers', 
      logo: <Avatar src={peopleProfileImageUrl} sx={{ height: '150px', width: '150px' }}/>,
    },
    {
      id: '2',
      title: 'Animais',
      description: 'Encontre os animais desaparecidos na enchente',
      // logo: <BookOpenText size={45} color={iconColor} />,
      route: '/dashboard/animals', 
      logo: <Avatar src={animalsProfileImageUrl} sx={{ height: '150px', width: '150px' }} />,
    },
    {
      id: '3',
      title: 'Doações',
      description: 'Contribua e doe alimentos, roupas, água e mais',
      // logo: <PencilLine size={45} color={iconColor} />,
      route: '/dashboard/donations', 
      logo: <Avatar src={giveProfileImageUrl} sx={{ height: '150px', width: '150px' }}/>,
    },
    // {
    //   id: '4',
    //   title: 'Cadastre-se',
    //   description: 'Casdastre-se aqui para sabermos sua localização',
    //   // logo: <Trash size={45} color={iconColor} />,
    //   route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/', 
    //   logo: <Avatar src={registerProfileImageUrl} sx={{ height: '150px', width: '150px' }} />,
    // },
  ];

  // const handleClickListUsers = async () => {
  //   setIsLoading(true);
  //   toastApiResponse(null, 'O Brasil está voces Rio Grande do Sul!');
  //   await new Promise(resolve => setTimeout(resolve, 2000));
  //   router.push(`/dashboard/animals`);
  //   setIsLoading(false);
  // };

  const handleClickListUsers = async (route: string) => {
    setIsLoading(true);
    toastApiResponse(null, 'O Brasil está voces Rio Grande do Sul!');
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push(route);
    setIsLoading(false);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={1} direction={'column'}>
        <Typography color="inherit" sx={{ textAlign: 'center' }} variant="h4">
          {/* AJUDE O POVO GAÚCHO A {' '} */}
          <Box component="span" sx={{ color: '#635BFF' }}>
            {/* ENCONTRE AQUI OS DESAPARECIDOS */}
            Encontre aqui os desaparecidos
          </Box>
        </Typography>

        <Typography variant="h6" sx={{ mt: 1, lineHeight: '1.5em', textAlign: 'center' }}>
          Após a tragédia, milhares de pessoas ainda não foram encontradas, assim como seus animais. 
          Ajude-nos a encontrá-los, cadastre-se ou forneça informações que possam ajudar neste momento tão difícil!
        </Typography>
      </Stack>

      <Grid container spacing={2} mt={0}>
        {integrations.map((integration, index) => (
          <Grid key={index} item lg={6} md={6} xs={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: "all 0.25s",
                transitionTimingFunction: "spring(1 100 10 10)",
                '&:hover': { transform: 'translateY(-5px)' }
              }
              }>
              <CardContent sx={{ flex: '1 1 auto' }}>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack>
                      {integration.logo}
                    </Stack>
                  </Box>
                  <Stack spacing={1} mb={1}>
                    <Typography align="center" variant="h5">
                      {integration.title}
                    </Typography>
                    <Typography align="center" variant="body1">
                      {integration.description}
                    </Typography>
                  </Stack>
                  {/* <Button variant="contained" component="a" href={integration.route} target="_blank">
                    Clique aqui
                  </Button> */}

                  {/* <Button variant="contained" color="primary" onClick={handleClickListUsers}>
                    {isLoading ? (
                      <CircularProgress size={14} color="inherit" />
                    ) : (
                      'Clique aqui'
                    )}
                  </Button> */}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClickListUsers(integration.route)}
                  >
                    {isLoading ? (
                      <CircularProgress size={14} color="inherit" />
                    ) : (
                      'Clique aqui'
                    )}
                  </Button>

                  
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* <Grid container spacing={2} mb={2}>
        {integrations.map((integration, index) => (
          <Grid key={index} item lg={6} md={6} xs={12}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: "all 0.25s",
                transitionTimingFunction: "spring(1 100 10 10)",
                '&:hover': { transform: 'translateY(-5px)' }
              }
              }>
              <CardContent sx={{ flex: '1 1 auto' }}>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack>
                      {integration.logo}
                    </Stack>
                  </Box>
                  <Stack spacing={1}>
                    <Typography align="center" variant="h5">
                      {integration.title}
                    </Typography>
                    <Typography align="center" variant="body1">
                      {integration.description}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider />
            </Card>
          </Grid>
        ))}
      </Grid> */}

      {/* <Button variant="contained" color="primary" onClick={handleClickListUsers}>
        {isLoading ? (
          <CircularProgress size={14} color="inherit" />
        ) : (
          'Know the project'
        )}
      </Button> */}

      <ToastContainer />
    </Stack>
  );
}
