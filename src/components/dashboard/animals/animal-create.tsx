// 'use client';

// import * as React from 'react';
// import { useRouter } from 'next/navigation';

// import Button from '@mui/material/Button';
// import CardActions from '@mui/material/CardActions';
// import CardHeader from '@mui/material/CardHeader';
// import CircularProgress from '@mui/material/CircularProgress';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import { Grid } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// import dayjs from 'dayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { Controller, useForm } from 'react-hook-form';
// import { z as zod } from 'zod';

// import { paths } from '@/paths';
// import { authClient } from '@/lib/auth/client';
// import { useUser } from '@/hooks/use-user';

// import { useState } from 'react';
// import { api } from '@/services/api';

// import { toast } from 'react-toastify';
// import { toastApiResponse } from '@/utils/Toast';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/ReactToastify.min.css";
// import 'react-toastify/dist/ReactToastify.css';

// import { ArrowFatLineLeft, ClipboardText, Dog, IdentificationCard } from '@phosphor-icons/react';

// // import Radio from '@mui/material/Radio';
// // import RadioGroup from '@mui/material/RadioGroup';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import FormLabel from '@mui/material/FormLabel';
// import DragAndDrop from '@/utils/DragAndDrop';
// // import { DragAndDrop } from '@/utils/DragAndDrop';

// const schema = zod.object({
//   nomeAnimal: zod.string().min(1, { message: 'Nome do animal é obriogatório' }).optional(),
//   microchip: zod.string().min(1, { message: 'Microchip é obriogatório' }).optional(),
//   especie: zod.string().min(1, { message: 'Especie é obriogatório' }).optional(),
//   raca: zod.string().min(1, { message: 'Raça é obriogatório' }).optional(),
//   abrigo: zod.string().min(1, { message: 'Abrigo é obriogatório' }).optional(),
//   obrigacoes: zod.string().min(1, { message: 'Obrigacoes é obriogatório' }).optional(),
// });

// type Values = zod.infer<typeof schema>;

// const defaultValues: Values = {};

// export function AnimalCreateForm(): React.JSX.Element {
//   const router = useRouter();

//   const { checkSession } = useUser();

//   const [isPending, setIsPending] = React.useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState('');

//   console.log('selectedFiles 12:05 => ', selectedFiles);

//   const [value, setValue] = React.useState('female');

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValue((event.target as HTMLInputElement).value);
//   };

//   const handleFileSelection = (files: any) => {
//     console.log('ta chegando aqui as 12:00 => ');
//     setSelectedFiles(files);
//     console.log('selectedFiles 20:00 => ', files);
//   };

//   const handleApiError = () => {
//     const title = 'Your password is incorrect. Please try again';
//     toast.error(title, {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//     });
//   };

//   const formatPhoneNumber = (value: string) => {
//     const cleaned = value.replace(/\D/g, '');
//     let formattedValue = '';
//     if (cleaned.length > 0) {
//       formattedValue = `(${cleaned.slice(0, 3)})`;
//       if (cleaned.length > 3) {
//         formattedValue += ` ${cleaned.slice(3, 8)}`;
//         if (cleaned.length > 8) {
//           formattedValue += `-${cleaned.slice(8, 12)}`;
//         }
//       }
//     }
//     return formattedValue;
//   };

//   const convertDate = (dateString: string): string => {
//     const [day, month, year] = dateString.split('/');
//     const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
//     return formattedDate;
//   };

//   const { control, handleSubmit, setError, formState: { errors } } = useForm<Values>({
//     defaultValues,
//     resolver: zodResolver(schema)
//   });

//   const onSubmit = React.useCallback(
//     async (values: Values): Promise<void> => {
//       console.log('enviou os dados com sucesso => ', values.abrigo);
//       // return
      
//       setIsLoading(true);
//       // const convertedDate = convertDate(values.birthDate);

//         try {
//           const formData = new FormData();
//           // formData.append("abrigo", values.abrigo);
//           // formData.append("especie", values.especie);
//           // formData.append("microchip", values.microchip);
//           // formData.append("nomeAnimal", values.nomeAnimal);
//           // formData.append("obrigacoes", values.obrigacoes);
//           // formData.append("raca", values.raca);

//           const registerNewUserEndpoint = '/crud_users/api/v2/user/create';
//           const response = await api.post(registerNewUserEndpoint, formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             }
//           });

//           if (response.data.status) {
//             toastApiResponse(response, response.data.message);
//           }

//           await new Promise(resolve => setTimeout(resolve, 3000));
//           setIsPending(true);

//           // const { error } = await authClient.signUp(values);

//           // if (error) {
//           //   setError('root', { type: 'server', message: error });
//           //   setIsPending(false);
//           //   return;
//           // }

//           setIsLoading(false);
//           await checkSession?.();
//           router.push(paths.dashboard.customers.list);

//         } catch (error) {
//           console.error('Error:', error);
//           toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
//           setIsLoading(false);
//         }

//     },
//     [checkSession, router, setError]
//   );

//   const handleGoToListUsers = () => {
//     router.push(paths.dashboard.customers.list);
//   };

//   return (
//     <Stack spacing={2}>
//       <Typography variant="h4">Animal</Typography>

//       <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '-20px', marginLeft: '-7px' }}>
//         <Stack direction="row" sx={{ alignItems: 'center' }}>
//           <Stack paddingTop={1.5}>
//             <IdentificationCard size={45} />
//           </Stack>

//           <CardHeader
//             subheader="Cadastre aqui os dados e caracteristicas do animal para que ela possa ser encontrada"
//             title="Registrar novo animal"
//           />
//         </Stack>

//         <Stack pt={3}>
//           <Button
//             startIcon={<ArrowFatLineLeft fontSize="var(--icon-fontSize-md)" />}
//             variant="contained"
//             color="info"
//             onClick={handleGoToListUsers}
//           >
//             Voltar a tela anterior
//           </Button>
//         </Stack>
//       </CardActions>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Stack spacing={2}>
//           <Controller
//             control={control}
//             name="nomeAnimal"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.nomeAnimal)}>
//                 <InputLabel>Nome do animal</InputLabel>
//                 <OutlinedInput {...field} label="Nome do animal" />
//                 {errors.nomeAnimal ?
//                   <FormHelperText>
//                     {errors.nomeAnimal.message}
//                   </FormHelperText> : null}
//               </FormControl>
//             )}
//           />

//           <Controller
//             control={control}
//             name="microchip"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.microchip)}>
//                 <InputLabel>Microchip</InputLabel>
//                 <OutlinedInput {...field} label="Microchip" />
//                 {errors.microchip ? <FormHelperText>{errors.microchip.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />

//           <Controller
//             control={control}
//             name="especie"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.especie)}>
//                 <InputLabel>Especie</InputLabel>
//                 <OutlinedInput {...field} label="Especie" />
//                 {errors.especie ? <FormHelperText>{errors.especie.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />

//           <Controller
//             control={control}
//             name="raca"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.raca)}>
//                 <InputLabel>Raça</InputLabel>
//                 <OutlinedInput {...field} label="Raça" />
//                 {errors.raca ? <FormHelperText>{errors.raca.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />

//           <Controller
//             control={control}
//             name="abrigo"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.abrigo)}>
//                 <InputLabel>Abrigo</InputLabel>
//                 <OutlinedInput {...field} label="Abrigo" />
//                 {errors.abrigo ? <FormHelperText>{errors.abrigo.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />

//           <Controller
//             control={control}
//             name="obrigacoes"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.obrigacoes)}>
//                 <InputLabel>Obrigações</InputLabel>
//                 <OutlinedInput {...field} label="Obrigações" />
//                 {errors.obrigacoes ? <FormHelperText>{errors.obrigacoes.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />

//           <CardActions sx={{ justifyContent: 'flex-start', alignItems: 'center', width:'100%'}}>
//             <Stack direction="row" sx={{ alignItems: 'center' }}>
//               <Stack paddingTop={1.5}>
//                 <Dog size={45} />            
//               </Stack>

//               <CardHeader 
//                 subheader="Por favor, tire uma foto do animal para facilitar o registro e o encontro do dono" 
//                 title="Foto"
//               />
//             </Stack>          
//           </CardActions>

//           <Grid item xs={12} sm={12} lg={12}>
//             <DragAndDrop onFilesSelected={handleFileSelection} />
//           </Grid>

//           <CardActions sx={{ justifyContent: 'flex-end' }}>
//             <Button
//               startIcon={isLoading === false && <ClipboardText fontSize="var(--icon-fontSize-md)" />}
//               variant="contained"
//               type="submit"
//               color="primary"
//               disabled={isPending}
//             >
//               {isLoading ? (
//                 <CircularProgress size={14} color="inherit" />
//               ) : (
//                 'Register'
//               )}
//             </Button>
//           </CardActions>
//         </Stack>
//       </form>


//       <ToastContainer />
//     </Stack>
//   );
// }





'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

import { useState } from 'react';
import { api } from '@/services/api';

import { toast } from 'react-toastify';
import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { ArrowFatLineLeft, ClipboardText, Dog, IdentificationCard } from '@phosphor-icons/react';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import DragAndDrop from '@/utils/DragAndDrop';

export function AnimalCreateForm() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState('');
  const [owner, setOwner] = useState('nao');

  const [values, setValues] = useState({
    nomeDono: '',
    telefoneDono: '',
    nomeAnimal: '',
    microchip: '',
    especie: '',
    raca: '',
    abrigo: '',
    observacoes: '',
  })

  const [errors, setErrors] = useState({
    nomeDono: false,
    telefoneDono: false,
    nomeAnimal: false,
    microchip: false,
    especie: false,
    raca: false,
    abrigo: false,
    observacoes: false,
  })

  const validateConfig = {
    nomeDono: false,
    telefoneDono: false,
    nomeAnimal: true,
    microchip: false,
    especie: false,
    raca: false,
    abrigo: false,
    observacoes: false,
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const validateFields = () => {
    const newErrors = {
      nomeDono: validateConfig.nomeDono ? !values.nomeDono : false,
      telefoneDono: validateConfig.telefoneDono ? !values.telefoneDono : false,
      nomeAnimal: validateConfig.nomeAnimal ? !values.nomeAnimal : false,
      microchip: validateConfig.microchip ? !values.microchip : false,
      especie: validateConfig.especie ? !values.especie : false,
      raca: validateConfig.raca ? !values.raca : false,
      abrigo: validateConfig.abrigo ? !values.abrigo : false,
      observacoes: validateConfig.observacoes ? !values.observacoes : false,
    }
    setErrors(newErrors)
    return Object.values(newErrors).every((error) => !error)
  }

  const handleApiError = () => {
    const title = 'Your password is incorrect. Please try again';
    toast.error(title, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleFileSelection = (files: any) => {
    console.log('ta chegando aqui as 12:00 => ');
    setSelectedFiles(files);
    console.log('selectedFiles 20:00 => ', files);
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

  const formatRG = (input: string) => {
    const digits = input.replace(/\D/g, '').slice(0, 9);
    return digits.replace(/(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/, (_, p1, p2, p3) => {
      let result = p1;
      if (p2) result += `.${p2}`;
      if (p3) result += `.${p3}`;
      return result;
    });
  }

  const formatCPF = (input: string) => {
    const digits = input.replace(/\D/g, '').slice(0, 11);
    return digits.replace(/(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/, (_, p1, p2, p3, p4) => {
      let result = p1;
      if (p2) result += `.${p2}`;
      if (p3) result += `.${p3}`;
      if (p4) result += `-${p4}`;
      return result;
    });
  }

  const convertDate = (dateString: string): string => {
    const [day, month, year] = dateString.split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    return formattedDate;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('chegou aqui', values)
    // setIsLoading(true)
    event.preventDefault()

    if (validateFields()) {
      toast.success('Dados salvos com sucesso')
    } else {
      toast.error('Formulário inválido')
      console.log('Formulário inválido')
    }

    // await new Promise(resolve => setTimeout(resolve, 2000));
    // setIsLoading(false)
    // handleGoToListUsers()
    return

    try {
      const formData = new FormData();
      formData.append("nomeAnimal", values.nomeAnimal);
      formData.append("microchip", values.microchip);
      formData.append("especie", values.especie);
      formData.append("raca", values.raca);
      formData.append("observacoes", values.observacoes);
      formData.append("abrigo", values.abrigo);

      const registerNewUserEndpoint = '/crud_users/api/v2/user/create';
      const response = await api.post(registerNewUserEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        toastApiResponse(response, response.data.message);
      }

      await new Promise(resolve => setTimeout(resolve, 3000));

      setIsLoading(false);
      router.push(paths.dashboard.customers.list);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
      setIsLoading(false);
    }
    setIsLoading(false)
  }

  const handleGoToListUsers = () => {
    router.push(paths.dashboard.customers.list);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Animais</Typography>

      <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '-20px', marginLeft: '-7px' }}>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Stack paddingTop={1.5}>
            <IdentificationCard size={45} />
          </Stack>

          <CardHeader
            subheader="Cadastre aqui os dados e caracteristicas do animal para que ela possa ser encontrada"
            title="Registrar novo animal"
          />
        </Stack>

        <Stack pt={3}>
          <Button
            startIcon={<ArrowFatLineLeft fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            color="info"
            onClick={handleGoToListUsers}
          >
            Voltar a tela anterior
          </Button>
        </Stack>
      </CardActions>

      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h6">Este animal é seu?</Typography>
          </Grid>
   
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <RadioGroup
              aria-label="owner"
              row
              name="owner"
              value={owner}
              onChange={(e) => {
                // console.log("Radio button value:", e.target.value);
                setOwner(e.target.value);
              }}
              // sx={{ mb: 2 }}
            >
              <FormControlLabel value="nao" control={<Radio />} label="Não, estou apenas cadastrando" />
              <FormControlLabel value="sim" control={<Radio />} label="Sim, pertence a mim" />
            </RadioGroup>
          </Grid>
         
          {owner === 'sim' && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h6" my={1}>Informações do dono</Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} >
                <TextField
                  fullWidth
                  error={errors.nomeDono}
                  id="outlined-nomeAnimal"
                  name="nomeAnimal"
                  label="Nome do dono do animal"
                  value={values.nomeDono}
                  onChange={handleChange}
                  helperText={errors.nomeDono ? 'Nome animal é obrigatório.' : ''}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  error={errors.telefoneDono}
                  id="telefone"
                  type='tel'
                  name="telefone"
                  label="Telefone"
                  value={formatPhoneNumber(values.telefoneDono)}
                  onChange={handleChange}
                  helperText={errors.telefoneDono ? 'Telefone é obrigatório.' : ''}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h6" my={1}>Dados do animal</Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} >
            <TextField
              fullWidth
              error={errors.nomeAnimal}
              id="outlined-nomeAnimal"
              name="nomeAnimal"
              label="Nome do animal"
              value={values.nomeAnimal}
              onChange={handleChange}
              helperText={errors.nomeAnimal ? 'Nome animal é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              error={errors.microchip}
              id="filled-microchip"
              name="microchip"
              type='text'
              label="Microchip"
              value={values.microchip}
              onChange={handleChange}
              helperText={errors.microchip ? 'Microchip é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              fullWidth
              error={errors.especie}
              id="especie"
              type='text'
              name="especie"
              label="Especie do animal"
              value={values.especie}
              onChange={handleChange}
              helperText={errors.especie ? 'Especie é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              fullWidth
              error={errors.raca}
              id="filled-raca"
              type='text'
              name="raca"
              label="Raça"
              value={values.raca}
              onChange={handleChange}
              helperText={errors.raca ? 'Raça é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h6" my={1}>Localização</Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              error={errors.abrigo}
              id="filled-abrigo"
              name="abrigo"
              label="Abrigo onde o animal está"
              value={values.abrigo}
              onChange={handleChange}
              helperText={errors.abrigo ? 'Abrigo é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              error={errors.observacoes}
              id="filled-observacoes"
              name="observacoes"
              label="Observacoes"
              value={values.observacoes}
              onChange={handleChange}
              helperText={errors.observacoes ? 'Observacoes de resgate é obrigatório.' : ''}
            />
          </Grid>

          <CardActions sx={{ justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              <Stack paddingTop={1.5}>
                <Dog size={45} />  
              </Stack>

              <CardHeader
                subheader="Por favor, tire uma foto do animal para facilitar o registro e o encontro dele"
                title="Foto"
              />
            </Stack>
          </CardActions>

          <Grid item xs={12} sm={12} lg={12}>
            <DragAndDrop onFilesSelected={handleFileSelection} />
          </Grid>
        </Grid>

        <Grid container justifyContent={'flex-end'}>
          <Button
            startIcon={isLoading === false && <ClipboardText fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            type="submit"
            color="primary"
          >
            {isLoading ? (
              <CircularProgress size={14} color="inherit" />
            ) : (
              'Cadastrar'
            )}
          </Button>
        </Grid>
      </Box>
      <ToastContainer />
    </Stack>
  )
}