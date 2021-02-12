import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { sourceLanguages, targetLanguages, sampleJAVACode, samplePythonCode } from '../../../utils/constants'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '70ch',
    },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  convertButtonClass: {
    margin: theme.spacing(2),
    minWidth: 120,
  }
}));

 

const Dashboard = () => {
  const classes = useStyles();

  // Source language
  const [sourceLanguage, setSourceLanguage] = React.useState('');

  // target language
  const [targetLanguage, setTargetLanguage] = React.useState('');

  // setting source language value
  const handleChangeSource = (event) => {
    setSourceLanguage(event.target.value);
  };

  // setting target language value
  const handleChangeTarget = (event) => {
    setTargetLanguage(event.target.value);
  };

  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={2}
            sm={4}
            xl={2}
            xs={6}
          >
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Source</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={sourceLanguage}
                onChange={handleChangeSource}
                label="Language"
              >
                <MenuItem value={10}>{sourceLanguages[0]}</MenuItem>
                <MenuItem value={20}>{sourceLanguages[1]}</MenuItem>
                <MenuItem value={30}>{sourceLanguages[2]}</MenuItem>
              </Select>
            </FormControl>
          </Grid> 
          <Grid
            item
            lg={2}
            sm={4}
            xl={2}
            xs={6}
          >
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Target</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={targetLanguage}
                onChange={handleChangeTarget}
                label="Language"
              >
                <MenuItem value={10}> {targetLanguages[0]} </MenuItem>
                <MenuItem value={20}> {targetLanguages[1]} </MenuItem>
                <MenuItem value={30}> {targetLanguages[2]} </MenuItem>
              </Select>
            </FormControl>
          </Grid> 
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
             
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={6}
          >
            <TextField
              id="outlined-multiline-static"
              label="Source"
              multiline
              rows={22}
              placeholder={sampleJAVACode}
              variant="outlined"
            />
          </Grid>
           <Grid
            item
            lg={6}
            sm={6}
            xl={6}
            xs={6}
          >
            <TextField
              id="outlined-multiline-static"
              label="Target"
              multiline
              rows={22}
              placeholder={samplePythonCode}
              variant="outlined"
            />  
          </Grid>
          <Grid
            lg={6}
            sm={6}
            xl={6}
            xs={6}
          >
            <Button variant="contained" color="primary" className={classes.convertButtonClass} >
              Convert
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
