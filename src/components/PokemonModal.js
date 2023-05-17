import React from 'react'
import { Box, Button, List, ListItem, Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  margin: "16px",
  pt: 2,
  px: 4,
  pb: 3,
};

function PokemonModal({ openModal, handleClose, pokemon }) {
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">{pokemon.name}</h2>
        <List>
          <ListItem>
            <b>Habitat</b>: {pokemon.habitat}  
          </ListItem>
          <ListItem>
            <b>Growth Rate</b>: {pokemon.growth_rate}
          </ListItem>
          <ListItem>
            <b>Shape</b>: {pokemon.shape}
          </ListItem>
        </List>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  )
}

export default PokemonModal