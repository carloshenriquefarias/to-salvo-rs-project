import * as React from 'react';
import { 
  Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
  Divider, FormControlLabel, Radio, RadioGroup, TextField, Typography 
} from '@mui/material';
import { useState } from 'react';
import { api } from '@/services/api';
import { Funnel } from '@phosphor-icons/react';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  onConsult: (animal: Animals[]) => void;
}

interface Animals {
  id: string;
  nome: string;
  sexo: string;
  microchip: string;
  especie: string;
  raça: string;
  abrigo: string;
  dataDoCadastro: string;
  cadastradoPor: string;
  route: string;
  logo: JSX.Element;
}

export default function ModalFilterAnimals({ open, handleClose, onConsult } : ModalProps) {

  const [isLoading, setIsLoading] = useState(false);
  const [sexo, setSexo] = useState('');
  const [raca, setRaca] = useState('');
  const [especie, setEspecie] = useState('');
  const [abrigo, setAbrigo] = useState('');
  const [animals, setAnimals] = useState<Animals[]>([
    {
      id: '1',
      nome: 'Toto',
      sexo: 'Macho',
      microchip: '101010',
      especie: 'Cachorro',
      raça: 'Viralata',
      abrigo: 'Faculdade Unopar',
      dataDoCadastro: '09/05/2024',
      cadastradoPor: 'Ana Julia',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/',
      logo: <Avatar src={'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSAOnLXSaPbc4K0IId0dSTI050OfwusYAyfQzMiCF6mrwNPVdmN'} sx={{ height: '150px', width: '150px' }} />,
    },
  ]);

  async function handleConsult() {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const dataFilter = {
      sexo: sexo,
      raca: raca,
      especie: especie,
      abrigo: abrigo,
      // limit: 20
    };

    const filteredDataFilter = filterObject(dataFilter);
    console.log(filteredDataFilter, "11:24")

    onConsult(animals);
    setIsLoading(false);
    handleClose();
    return
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

  const handleResetFields = () => {
    setSexo('');
    setRaca('');
    setEspecie('');
    setAbrigo('');
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
            Pesquise aqui de forma detalhada os animais por caracteristicas especificas
          </DialogContentText>

          <Divider />

          <Typography align="left" variant="body2" mt={2}>
            Selecione o sexo do animal:
          </Typography>

          <RadioGroup
            aria-label="sexo"
            row
            name="sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="Macho" control={<Radio />} label="Macho" />
            <FormControlLabel value="Fêmea" control={<Radio />} label="Fêmea" />
          </RadioGroup>

          <Typography align="left" variant="body2" mt={0}>
            Insira a idade da pessoa que procura (apenas numeros):
          </Typography>

          <TextField
            label="Raça"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <Typography align="left" variant="body2" mt={2}>
            Insira o nome da espécie
          </Typography>

          <TextField
            label="Espécie"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
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
          <Button 
            onClick={() => {
              handleResetFields();
              handleClose();
            }}>
            Cancelar
          </Button>

          <Button
            startIcon={isLoading === false && <Funnel fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={() => handleConsult()}
            color="primary"
          >
            {isLoading ? (
              <CircularProgress size={14} color="inherit" />
            ) : (
              'Fazer pesquisa'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}