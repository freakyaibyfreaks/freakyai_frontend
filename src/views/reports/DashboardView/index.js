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
import { 
  sourceLanguages, 
  targetLanguages, 
  sampleJAVACode, 
  samplePythonCode, 
  sampleC_plus_plus_code 
} from '../../../utils/constants/codeConverter/index';
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
  const [sourceLanguage, setSourceLanguage] = React.useState('JAVA');

  // target language
  const [targetLanguage, setTargetLanguage] = React.useState('C++');

  // setting source language value
  const handleChangeSource = (event) => {
    /*
     * if target language is not same target language,
     * set the target language as selected by user
    */ 
    if (event.target.value !== targetLanguage) {
      setSourceLanguage(event.target.value);
    }
  };

  // setting target language value
  const handleChangeTarget = (event) => {

    /*
     * if target language is not same target language,
     * set the target language as selected by user
    */ 
    if (event.target.value !== sourceLanguage) {
      setTargetLanguage(event.target.value);
    }
  }; 

  // preview code for source language
  const getSampleCodeSourceLanguage = () => {
    if (sourceLanguage === sourceLanguages[0]) {

      // returing the sample C++ code
      return sampleC_plus_plus_code;
    }
    if (sourceLanguage === sourceLanguages[1])  {

      // returning the sample JAVA code
      return sampleJAVACode;
    }
    if (sourceLanguage === sourceLanguages[2]) {

      // returning the sample python code
      return samplePythonCode
    }
  } 

  // preview code for target language
  const getSampleCodeTargetLanguage = () => {
    if(targetLanguage === targetLanguages[0]) {

      // returning the sample C++ code
      return sampleC_plus_plus_code;
    }
    if(targetLanguage === targetLanguages[1]) {

      // returning the sample JAVA code
      return sampleJAVACode;
    }
    if(targetLanguage === targetLanguages[2]) {

      // returning the sample python code
      return samplePythonCode;
    }
  }
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
            lg={3}
            sm={3}
            xl={3}
            xs={3}
          >
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">{'Language:'}{sourceLanguage}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={sourceLanguage}
                onChange={handleChangeSource}
                label="sourceLanguage"
              >
                <MenuItem value={sourceLanguages[0]}>{sourceLanguages[0]}</MenuItem>
                <MenuItem value={sourceLanguages[1]}>{sourceLanguages[1]}</MenuItem>
                <MenuItem value={sourceLanguages[2]}>{sourceLanguages[2]}</MenuItem>
              </Select>
            </FormControl>
          </Grid> 
          <Grid item lg={3} sm={3} xl={3} xs={3}
          >
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">{'Language:'}{targetLanguage}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={targetLanguage}
                onChange={handleChangeTarget}
                label="targetLanguage"
              >
                <MenuItem value={targetLanguages[0]}> {targetLanguages[0]} </MenuItem>
                <MenuItem value={targetLanguages[1]}> {targetLanguages[1]} </MenuItem>
                <MenuItem value={targetLanguages[2]}> {targetLanguages[2]} </MenuItem>
              </Select>
            </FormControl>
          </Grid> 
          <Grid item lg={3} sm={6} xl={3} xs={12}>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
             
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={6} >
            <TextField
              id="outlined-multiline-static"
              label="Sample Source Lang Code"
              multiline
              rows={22}
              placeholder={getSampleCodeSourceLanguage()}
              variant="outlined"
            />
          </Grid>
           <Grid item lg={6} sm={6} xl={6} xs={6}>
            <TextField
              id="outlined-multiline-static"
              label="Sample Target Lang Code"
              multiline
              rows={22}
              placeholder={getSampleCodeTargetLanguage()}
              variant="outlined"
            />  
          </Grid>
          <Grid lg={6} sm={6} xl={6}xs={6}>
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
