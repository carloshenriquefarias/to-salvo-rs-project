import { useEffect, useState } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Trash, UploadSimple } from '@phosphor-icons/react';

interface CustomFile extends File {
  preview: string;
}

const DragAndDrop = ({ onFilesChange, imagesBoat }: any) => {
  const [files, setFiles] = useState<CustomFile[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    // accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    },
  });

  const removeFile = (fileToRemove: CustomFile) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  useEffect(() => {
    console.log(imagesBoat,'imagesBoat');
  }, []);

  return (
    <>
      <div className="container">
        <Box 
          {...getRootProps()} 
          borderRadius={5}
        >
          <Stack 
            spacing={2} 
            my={0} 
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p:2,
              border: '3px dashed',
              borderColor: 'gray',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: 0,
              marginBottom: 3,
            }}
          >      
            <UploadSimple size={45} />            
            <input {...getInputProps()} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ margin: 0 }}>Selecione a foto do animal na sua galeria</p>
            </div>
          </Stack>
        </Box>
      </div>

      <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box display="flex" flexWrap="wrap">
          {(
          //   imagesBoat && files.length === 0) ? (
          //   <Box key={imagesBoat[0]} border={1} borderRadius="lg" p={1} m={2} position="relative">
          //     <Box position="relative">
          //       <img src={'https://techsoluctionscold.com.br/api-boats/uploads/boats_images/'+imagesBoat[0]} width="100%" height="100%" alt="Boat" />
          //     </Box>
          //   </Box>
          // ) : (
            files.map((file) => (
              <Box key={file.name} border={1} borderRadius="lg" p={1} m={2} position="relative">
                {/* <Box
                  position="absolute"
                  top={15}
                  right={15}
                  zIndex={1}
                >
                  <Button variant="contained" startIcon={<Trash size={20}/>} onClick={() => removeFile(file)}>
                    Deletar
                  </Button>
                </Box> */}
                 
                <Box position="relative">
                  {file.type?.startsWith('image/') ? (
                    <img src={file.preview} alt={file.name} width="100%" height="100%" />
                  ) : (
                    <div>File type not supported</div>
                  )}
                </Box>
              </Box>
            ))
          )}
        </Box>

      </Stack>
    </>
  );
};

export default DragAndDrop;
