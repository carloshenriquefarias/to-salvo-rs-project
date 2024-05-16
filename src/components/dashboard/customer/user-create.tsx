'use client';

import * as React from 'react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, CardActions, CardHeader, CircularProgress, Grid, Stack, Typography, TextField } from '@mui/material';
import { paths } from '@/paths';
import { api } from '@/services/api';

import { toast } from 'react-toastify';
import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { ArrowFatLineLeft, Camera, ClipboardText, IdentificationCard } from '@phosphor-icons/react';

import DragAndDrop from '@/utils/DragAndDrop';

export function UserCreateForm() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState('');

  const [capturedImage, setCapturedImage] = useState('');
  const [takePhoto, setTakePhoto] = useState(false);
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
    abrigo: true,
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

  const handleFileSelection = (files: any) => {
    setSelectedFiles(files);
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
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context && videoRef.current) {
        context.drawImage(videoRef.current, 0, 0, 300, 225);
        const dataURI = canvasRef.current.toDataURL('image/png');
        setCapturedImage(dataURI);
      }
    }
  };

  function base64ToBlob({ base64, mime }: any) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (validateFields()) {
      setIsLoading(true)
      
      const base64Image = capturedImage;
      const mimeMatch = base64Image.match(/data:(.*);base64,/);

      try {
        const formData = new FormData();
        formData.append("nome", values.nome);
        formData.append("dataNascimento", values.dataNascimento);
        formData.append("email", values.email);
        formData.append("telefone", values.telefone);
        formData.append("cpf", values.cpf);
        formData.append("rg", values.rg);
        formData.append("situacao", '0');
        formData.append("cidadeDeResgate", values.cidadeDeResgate);
        formData.append("abrigo", values.abrigo);

        if (selectedFiles.length > 0) {
          const imagemGaleria = new File([selectedFiles[0]], 'image_galeria.jpg', { type: (selectedFiles[0] as any).type });
          formData.append('fotoGaleria', imagemGaleria);
        }

        if (mimeMatch) {
          const mimeType = mimeMatch[1];
          const imageBlob = base64ToBlob({ base64: base64Image, mime: mimeType });
          formData.append("fotoCamera", imageBlob);
        }

        const registerNewUserEndpoint = '/tosalvo/api/v2/people/create';
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
    } else {
      toast.error('Formulário inválido')
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
            onClick={handleGoToListUsers}
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
            <DragAndDrop onFilesChange={handleFileSelection} />
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

          {takePhoto === true && (
            <Grid item xs={12} sm={12} lg={12}>
              <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {capturedImage !== '' && (
                  <>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="h6">Sua foto selecionada será essa:</Typography>
                    </Grid>

                    <div >
                      <img src={capturedImage} alt="Captured" width="300" height="225" />
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