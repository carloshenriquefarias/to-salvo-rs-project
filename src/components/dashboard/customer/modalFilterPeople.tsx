import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { api } from '@/services/api';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  onConsult: (people: Person[]) => void;
}

interface Person {
  id: string;
  name: string;
  sexo: string;
  idade: string;
  localDeResgate: string;
  abrigo: string;
  dataDoCadastro: string;
  cadastradoPor: string;
  route: string;
  logo: JSX.Element;
}

export default function ModalFilterPeople({ open, handleClose, onConsult } : ModalProps) {
  const [sexo, setSexo] = useState('');
  const [idade, setIdade] = useState('');
  const [abrigo, setAbrigo] = useState('');
  const [people, setPeople] = useState<Person[]>([
    {
      id: '1',
      name: 'Pedrita Maria',
      sexo: 'Feminino',
      idade: '25 anos',
      localDeResgate: 'Canoas',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://www.agendartecultura.com.br/wp-content/uploads/2022/12/meneson.jpg'} sx={{ height: '150px', width: '150px' }} />,
    }
  ]);

  async function handleConsult() {

    const dataFilter = {
      sexo: sexo,
      idade: idade,
      abrigo: abrigo,
      // limit: 20
    };

    const filteredDataFilter = filterObject(dataFilter);
    console.log(filteredDataFilter, "11:24")

    onConsult(people);
    handleClose();
    return

    // try {
    //   // setIsLoading(true);
    //   const response = await api.post('/list_all_boats.php', JSON.stringify(filteredDataFilter));

    //   onConsult(response);
    //   setSearchInitiated(true);
    //   // closeModal();
    //   // setIsLoading(false);

    // } catch (error) {
    //   console.error('Error:', error);
    //   toastApiResponse(error, 'Não foi possível realizar a consulta');
    // }
  }

  function filterObject(obj: Record<string, any>): Record<string, any> {
    const filteredObj: Record<string, any> = {};

    Object.entries(obj).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        filteredObj[key] = value;
      }
    });

    return filteredObj;
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Filtro de busca avançado
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description" mb={2}>
            Pesquise aqui de forma detalhada as pessoas por caracteristicas especificas
          </DialogContentText>

          <Divider />

          <Typography align="left" variant="body2" mt={2}>
            Selecione o sexo da pessoa:
          </Typography>

          <RadioGroup
            aria-label="sexo"
            row
            name="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
            <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
            <FormControlLabel value="Indefinido" control={<Radio />} label="Indefinido" />
          </RadioGroup>

          <Typography align="left" variant="body2" mt={2}>
            Insira a idade da pessoa que procura (apenas numeros):
          </Typography>

          <TextField
            label="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <Typography align="left" variant="body2" mt={2}>
            Insira o nome do abrigo
          </Typography>

          <TextField
            label="Abrigo"
            value={abrigo}
            onChange={(e) => setAbrigo(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />

        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleConsult()} variant='contained'>
            Fazer pesquisa
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}