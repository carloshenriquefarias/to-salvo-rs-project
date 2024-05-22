'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { paths } from '@/paths';

import { useEffect, useRef, useState } from 'react';
import { api } from '@/services/api';

import { toast } from 'react-toastify';
import { toastApiResponse } from '@/utils/Toast';
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { ArrowFatLineLeft, Camera, ClipboardText, Dog, IdentificationCard } from '@phosphor-icons/react';
import DragAndDrop from '@/utils/DragAndDrop';

export function AnimalCreateForm() {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState('');
  const [owner, setOwner] = useState('nao');

  const [capturedImage, setCapturedImage] = useState('');
  const [takePhoto, setTakePhoto] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    nomeAnimal: false,
    microchip: false,
    especie: true,
    raca: false,
    abrigo: true,
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
        formData.append("nomeDono", values.nomeDono);
        formData.append("telefoneDono", values.telefoneDono);
        formData.append("nomeAnimal", values.nomeAnimal);
        formData.append("microchip", values.microchip);
        formData.append("especie", values.especie);
        formData.append("raca", values.raca);
        formData.append("observacoes", values.observacoes);
        formData.append("abrigo", values.abrigo);
        formData.append("situacao", '0');

        if (selectedFiles.length > 0) {
          const imagemGaleria = new File([selectedFiles[0]], 'image_galeria.jpg', { type: (selectedFiles[0] as any).type });
          formData.append('fotoGaleria', imagemGaleria);
        }

        if (mimeMatch) {
          const mimeType = mimeMatch[1];
          const imageBlob = base64ToBlob({ base64: base64Image, mime: mimeType });
          if(imageBlob.size > 1741){
            formData.append("fotoCamera", imageBlob);
          }
        }

        const registerNewUserEndpoint = '/tosalvo/api/v2/animal/create';
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
        router.push(paths.dashboard.animals.list);

      } catch (error) {
        console.error('Error:', error);
        toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
        setIsLoading(false);
      }
    } else {
      toast.error('Preencha os campos obrigatorios');
    }
    setIsLoading(false)
  }

  const handleGoToListUsers = () => {
    router.push(paths.dashboard.customers.list);
  };

  useEffect(() => {
    handleTakePhoto()
  }, [capturedImage]);

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
                setOwner(e.target.value);
              }}
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
                  id="outlined-nomeDono"
                  name="nomeDono"
                  type='text'
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
                  id="telefoneDono"
                  type='tel'
                  name="telefoneDono"
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
              label="Especie do animal. Ex: cachorro"
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
              label="Raça. Ex: Pitbull"
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

          <Grid container justifyContent={'center'}>
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