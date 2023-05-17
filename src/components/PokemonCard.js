import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={pokemon.picture}
        title={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pokemon.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>More info</Button>
      </CardActions>
    </Card>
  );
}

export default PokemonCard;