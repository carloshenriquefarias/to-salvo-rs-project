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

// import { ArrowFatLineLeft, ClipboardText, IdentificationCard } from '@phosphor-icons/react';
// import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
// import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';

// const schema = zod.object({
//   firstName: zod.string().min(1, { message: 'Firstname is required' }),
//   lastName: zod.string().min(1, { message: 'Lastname is required' }),
//   userName: zod.string().min(1, { message: 'Username is required' }),
//   email: zod.string().min(1, { message: 'Email is required' }).email(),
//   birthDate: zod.string().refine((value) => {
//     const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/;
//     if (!dateFormatRegex.test(value)) { return false }
//     const [day, month, year] = value.split('/');
//     return dayjs(`${year}-${month}-${day}`, 'YYYY-MM-DD').isValid();
//   }, 'Birth date is required'),
//   mobile: zod.string()
//     .min(1, { message: 'Mobile is required' })
//     .regex(/^\d+$/, { message: 'Mobile must contain only digits' }),
//   password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
//   confirmPassword: zod.string().min(6, { message: 'Confirm password should be the same password' }),
// });

// type Values = zod.infer<typeof schema>;

// const defaultValues = {
//   firstName: '',
//   lastName: '',
//   userName: '',
//   email: '',
//   birthDate: '',
//   mobile: '',
//   password: '',
//   confirmPassword: '',
// } satisfies Values;

// export function UserCreateForm(): React.JSX.Element {
//   const router = useRouter();

//   const { checkSession } = useUser();

//   const [isPending, setIsPending] = React.useState<boolean>(false);
//   const [showPassword, setShowPassword] = React.useState<boolean>();
//   const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>();
//   const [isLoading, setIsLoading] = useState(false);

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
//       setIsLoading(true);

//       if (values.password !== values.confirmPassword) {
//         handleApiError();
//         setIsLoading(false);
//         return;
//       }

//       const convertedDate = convertDate(values.birthDate);

//       if (values.password === values.confirmPassword) {
//         try {
//           const formData = new FormData();
//           formData.append("firstname", values.firstName);
//           formData.append("lastname", values.lastName);
//           formData.append("username", values.userName);
//           formData.append("email", values.email);
//           formData.append("mobile", values.mobile);
//           formData.append("dateofbirth", convertedDate);
//           formData.append("password", values.password);

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

//           const { error } = await authClient.signUp(values);

//           if (error) {
//             setError('root', { type: 'server', message: error });
//             setIsPending(false);
//             return;
//           }

//           setIsLoading(false);
//           await checkSession?.();
//           router.push(paths.dashboard.customers.list);

//         } catch (error) {
//           console.error('Error:', error);
//           toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
//           setIsLoading(false);
//         }
//       }
//     },
//     [checkSession, router, setError]
//   );

//   const handleGoToListUsers = () => {
//     router.push(paths.dashboard.customers.list);
//   };

//   return (
//     <Stack spacing={2}>
//       <Typography variant="h4">User</Typography>

//       <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '-20px', marginLeft: '-7px' }}>
//         <Stack direction="row" sx={{ alignItems: 'center' }}>
//           <Stack paddingTop={1.5}>
//             <IdentificationCard size={45} />
//           </Stack>

//           <CardHeader
//             subheader="Register your data here and create a new account for you"
//             title="Register new user"
//           />
//         </Stack>

//         <Stack pt={3}>
//           <Button
//             startIcon={<ArrowFatLineLeft fontSize="var(--icon-fontSize-md)" />}
//             variant="contained"
//             color="info"
//             onClick={handleGoToListUsers}
//           >
//             List users
//           </Button>
//         </Stack>
//       </CardActions>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Stack spacing={2}>
//           <Controller
//             control={control}
//             name="firstName"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.firstName)}>
//                 <InputLabel>First name</InputLabel>
//                 <OutlinedInput {...field} label="First name" />
//                 {errors.firstName ?
//                   <FormHelperText>
//                     {errors.firstName.message}
//                   </FormHelperText> : null}
//               </FormControl>
//             )}
//           />

//           <Controller
//             control={control}
//             name="lastName"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.lastName)}>
//                 <InputLabel>Last name</InputLabel>
//                 <OutlinedInput {...field} label="Last name" />
//                 {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />

//           <Controller
//             control={control}
//             name="userName"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.userName)}>
//                 <InputLabel>User name</InputLabel>
//                 <OutlinedInput {...field} label="Last name" />
//                 {errors.userName ? <FormHelperText>{errors.userName.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />

//           <Controller
//             control={control}
//             name="email"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.email)}>
//                 <InputLabel>Email address</InputLabel>
//                 <OutlinedInput {...field} label="Email address" type="email" />
//                 {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />

//           <Controller
//             name="mobile"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.mobile)}>
//                 <InputLabel htmlFor="mobile">Mobile</InputLabel>
//                 <OutlinedInput
//                   {...field}
//                   id="mobile"
//                   label="Mobile"
//                   type='tel'
//                   value={formatPhoneNumber(field.value)}
//                   onChange={(e) => {
//                     const cleanedValue = e.target.value.replace(/\D/g, '');
//                     field.onChange(cleanedValue);
//                   }}
//                 />
//                 {errors.mobile && (
//                   <FormHelperText>{errors.mobile.message}</FormHelperText>
//                 )}
//               </FormControl>
//             )}
//           />

//           <FormControl fullWidth error={Boolean(errors.birthDate)}>
//             <Controller
//               name="birthDate"
//               control={control}
//               defaultValue=""
//               rules={{
//                 validate: (value) => {
//                   try {
//                     schema.parse(value);
//                     return true;
//                   } catch (error) {
//                     return false;
//                   }
//                 }
//               }}
//               render={({ field }) => (
//                 <DatePicker
//                   {...field}
//                   label="Birth date"
//                   value={field.value ? dayjs(field.value, 'DD/MM/YYYY').toDate() : null}
//                   onChange={(newValue) => {
//                     const formattedValue = newValue ? dayjs(newValue).format('DD/MM/YYYY') : '';
//                     field.onChange(formattedValue);
//                   }}
//                   format="DD/MM/YYYY"
//                 />
//               )}
//             />
//             {errors.birthDate && (
//               <FormHelperText>{errors.birthDate.message}</FormHelperText>
//             )}
//           </FormControl>

//           <Stack spacing={2} sx={{ alignItems: 'flex-start', width: '100%' }} my={2}>
//             <Grid container spacing={2}>
//               <Grid item lg={6} xs={12}>
//                 <Controller
//                   control={control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormControl error={Boolean(errors.password)} sx={{ width: '100%' }}>
//                       <InputLabel>Password</InputLabel>
//                       <OutlinedInput
//                         {...field}
//                         endAdornment={
//                           showPassword ? (
//                             <EyeIcon
//                               cursor="pointer"
//                               fontSize="var(--icon-fontSize-md)"
//                               onClick={(): void => {
//                                 setShowPassword(false);
//                               }}
//                             />
//                           ) : (
//                             <EyeSlashIcon
//                               cursor="pointer"
//                               fontSize="var(--icon-fontSize-md)"
//                               onClick={(): void => {
//                                 setShowPassword(true);
//                               }}
//                             />
//                           )
//                         }
//                         label="Password"
//                         type={showPassword ? 'text' : 'password'}
//                       />
//                       {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
//                     </FormControl>
//                   )}
//                 />
//               </Grid>

//               <Grid item lg={6} xs={12}>
//                 <Controller
//                   control={control}
//                   name="confirmPassword"
//                   render={({ field }) => (
//                     <FormControl error={Boolean(errors.confirmPassword)} sx={{ width: '100%' }}>
//                       <InputLabel>Confirm password</InputLabel>
//                       <OutlinedInput
//                         {...field}
//                         endAdornment={
//                           showConfirmPassword ? (
//                             <EyeIcon
//                               cursor="pointer"
//                               fontSize="var(--icon-fontSize-md)"
//                               onClick={(): void => {
//                                 setShowConfirmPassword(false);
//                               }}
//                             />
//                           ) : (
//                             <EyeSlashIcon
//                               cursor="pointer"
//                               fontSize="var(--icon-fontSize-md)"
//                               onClick={(): void => {
//                                 setShowConfirmPassword(true);
//                               }}
//                             />
//                           )
//                         }
//                         label="Confirm password"
//                         type={showConfirmPassword ? 'text' : 'password'}
//                       />
//                       {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
//                     </FormControl>
//                   )}
//                 />
//               </Grid>
//             </Grid>
//           </Stack>

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
import { Grid } from '@mui/material';
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

import { useRef, useState } from 'react';
import { api } from '@/services/api';

import { toast } from 'react-toastify';
import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { ArrowFatLineLeft, Camera, ClipboardText, IdentificationCard } from '@phosphor-icons/react';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import DragAndDrop from '@/utils/DragAndDrop';

export function UserCreateForm() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState('');

  const [capturedImage, setCapturedImage] = useState('');
  const [takePhoto, setTakePhoto] = useState(false);
  const [showTextPhoto, setShowTextPhoto] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [values, setValues] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    cidadeDeResgate: '',
    abrigo: '',
  })

  const [errors, setErrors] = useState({
    nome: false,
    email: false,
    telefone: false,
    dataNascimento: false,
    cpf: false,
    rg: false,
    cidadeDeResgate: false,
    abrigo: false,
  })

  const validateConfig = {
    nome: true,
    email: false,
    telefone: false,
    dataNascimento: false,
    cpf: false,
    rg: false,
    cidadeDeResgate: false,
    abrigo: false,
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const validateFields = () => {
    const newErrors = {
      nome: validateConfig.nome ? !values.nome : false,
      email: validateConfig.email ? !values.email : false,
      telefone: validateConfig.telefone ? !values.telefone : false,
      dataNascimento: validateConfig.dataNascimento ? !values.dataNascimento : false,
      cpf: validateConfig.cpf ? !values.cpf : false,
      rg: validateConfig.rg ? !values.rg : false,
      cidadeDeResgate: validateConfig.cidadeDeResgate ? !values.cidadeDeResgate : false,
      abrigo: validateConfig.abrigo ? !values.abrigo : false,
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

  const handleStartCapture = async () => {
    setTakePhoto(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleTakePhoto = () => {
    setShowTextPhoto(true);
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context && videoRef.current) {
        context.drawImage(videoRef.current, 0, 0, 300, 225);
        const dataURI = canvasRef.current.toDataURL('image/png');
        setCapturedImage(dataURI);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('chegou aqui campos 09:49 =>', values)
    console.log('chegou aqui foto 09:50 =>', capturedImage)

    setIsLoading(true)
    event.preventDefault()

    if (validateFields()) {
      toast.success('Dados salvos com sucesso')
    } else {
      toast.error('Formulário inválido')
      console.log('Formulário inválido')
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false)
    handleGoToListUsers()
    return

    try {
      const formData = new FormData();
      formData.append("nome", values.nome);
      formData.append("email", values.email);
      formData.append("telefone", values.telefone);
      formData.append("dataNascimento", values.dataNascimento);
      formData.append("cpf", values.cpf);
      formData.append("rg", values.rg);
      formData.append("cidadeDeResgate", values.cidadeDeResgate);
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
      <Typography variant="h4">Pessoas</Typography>

      <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '-20px', marginLeft: '-7px' }}>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Stack paddingTop={1.5}>
            <IdentificationCard size={45} />
          </Stack>

          <CardHeader
            subheader="Cadastre aqui os dados pessoais de uma pessoa para que ela possa ser encontrada"
            title="Registrar nova pessoa"
          />
        </Stack>

        <Stack pt={3}>
          <Button
            startIcon={<ArrowFatLineLeft fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            color="info"
          // onClick={handleGoToListUsers}
          >
            Voltar a tela anterior
          </Button>
        </Stack>
      </CardActions>

      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h6" my={1}>Dados pessoais</Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} >
            <TextField
              fullWidth
              error={errors.nome}
              id="outlined-nome"
              name="nome"
              label="Nome completo"
              value={values.nome}
              onChange={handleChange}
              helperText={errors.nome ? 'Nome é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              error={errors.email}
              id="filled-email"
              name="email"
              type='email'
              label="Email"
              value={values.email}
              onChange={handleChange}
              helperText={errors.email ? 'Email é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              fullWidth
              error={errors.telefone}
              id="telefone"
              type='tel'
              name="telefone"
              label="Telefone"
              value={formatPhoneNumber(values.telefone)}
              onChange={handleChange}
              helperText={errors.telefone ? 'Telefone é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={errors.dataNascimento}
              id="filled-dataNascimento"
              type='date'
              name="dataNascimento"
              label="Data nascimento"
              value={values.dataNascimento}
              onChange={handleChange}
              helperText={errors.dataNascimento ? 'Data nascimento é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              fullWidth
              error={errors.cpf}
              id="filled-cpf"
              type='tel'
              name="cpf"
              label="CPF"
              value={formatCPF(values.cpf)}
              onChange={handleChange}
              helperText={errors.cpf ? 'CPF é obrigatório.' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <TextField
              fullWidth
              error={errors.rg}
              id="filled-rg"
              type='tel'
              name="rg"
              label="RG"
              value={formatRG(values.rg)}
              onChange={handleChange}
              helperText={errors.rg ? 'RG é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h6" my={1}>Localização</Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              error={errors.cidadeDeResgate}
              id="filled-cidadeDeResgate"
              name="cidadeDeResgate"
              label="Cidade de resgate"
              value={values.cidadeDeResgate}
              onChange={handleChange}
              helperText={errors.cidadeDeResgate ? 'Cidade de resgate é obrigatório.' : ''}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              error={errors.abrigo}
              id="filled-abrigo"
              name="abrigo"
              label="Abrigo"
              value={values.abrigo}
              onChange={handleChange}
              helperText={errors.abrigo ? 'Abrigo é obrigatório.' : ''}
            />
          </Grid>

          <CardActions sx={{ justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              <Stack paddingTop={1.5}>
                <IdentificationCard size={45} />
              </Stack>

              <CardHeader
                subheader="Por favor, tire uma foto da pessoa para facilitar o registro e o encontro dela"
                title="Foto"
              />
            </Stack>
          </CardActions>

          <Grid item xs={12} sm={12} lg={12}>
            <DragAndDrop onFilesSelected={handleFileSelection} />
          </Grid>
        </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h6">Se quiser, use sua camera e tire uma foto atual</Typography>
          </Grid>

          <Grid container justifyContent={'center'}>
            <Grid item xs={12} sm={12} lg={12}>
              <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  startIcon={<Camera fontSize="var(--icon-fontSize-md)" />}
                  variant="contained"
                  onClick={handleStartCapture}
                  color="primary"
                >
                  Clique aqui para abrir sua camera
                </Button>

                <video ref={videoRef} width="300" height="225" autoPlay></video>
                <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="225"></canvas>

                {takePhoto === true && (           
                  <Button
                    startIcon={<Camera fontSize="var(--icon-fontSize-md)" />}
                    variant="contained"
                    onClick={handleTakePhoto}
                    color="primary"
                  >
                    Clique aqui para tirar foto
                  </Button>
                )}
              </Stack>
            </Grid>

            {/* {showTextPhoto === true && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h6">Sua foto selecionada é essa:</Typography>
              </Grid>
            )} */}

            {takePhoto === true && (
              <Grid item xs={12} sm={12} lg={12}>
                <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {capturedImage !== '' && (
                    <>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="h6">Sua foto selecionada será essa:</Typography>
                      </Grid>

                      <div >
                        <img src={capturedImage} alt="Captured" width="300" height="225"/>
                      </div>
                    </>
                  )}
                </Stack>
              </Grid>
            )}
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