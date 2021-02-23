import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Grid,
  Container,
} from '@material-ui/core';
import Page from 'src/components/Page';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const ExtractTextFromImage = () => {
  const classes = useStyles();
 
  return (
    <Container maxWidth={false}  className={classes.root}>
      <Grid
        container
        spacing={3}
      >
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Card>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Text Extraction from Image Removal API
              </Typography>
              <Typography variant="h5" component="h2">
                Coming Soon.....
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                
              </Typography>
              <Typography variant="body2" component="p">
                WIP
                <br />
                {'AI solutions of the freaks, by the freaks, for the freaks'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Email Us at rishabhb932@gmail.com to Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExtractTextFromImage;
