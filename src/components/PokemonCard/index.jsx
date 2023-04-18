import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { typeHandler } from "../../utils";

export default function PokemonCard({ name, image, types }) {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "#353634" }}>
      <CardActionArea>
        <CardMedia component="img" height="200" image={image} alt="green iguana" />
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography gutterBottom variant="h5" component="div"  style={{ color: "white" }}>
              {name}
            </Typography>
            <Typography gutterBottom variant="caption" component="div" style={{ color: "white" }}>
              {typeHandler(types)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
