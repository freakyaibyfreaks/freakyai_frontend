import React, { useState, useEffect } from 'react';
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
} from '../../utils/constants/codeConverter/index';
import Button from '@material-ui/core/Button';
import useCodeConverter from '../../state/codeConverter/hooks/useCodeConverter';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '70ch',
    },
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  convertButtonClass: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  sourceLangDiv: {
    display: 'flex'
  },
  targetLangDiv: {
    display: 'flex'
  }
}));

const CodeConverter = () => {
  const classes = useStyles();

  // Source language
  const [sourceLanguage, setSourceLanguage] = useState(sourceLanguages['CPP']);

  // target language
  const [targetLanguage, setTargetLanguage] = useState(targetLanguages['JAVA']);

  // source language code
  const [sourceLanguageCode, setSourceLanguageCode] = useState('')

  // target language code
  const [targetLanguageCode, setTargetLanguageCode] = useState('')

  // codeConverter object
  const { codeConverter, toConvert } = useCodeConverter()

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

  // convert code to the diff languages
  const convertCode = () => {
    
    // constructing the request object
    const reqObject = {
      code: sourceLanguageCode,
      sourceLang: sourceLanguage,
      destinationLang: targetLanguage
    }
    
    // calling backend api to convert
    toConvert(JSON.stringify(reqObject))
  }

  useEffect(() => {
 
    // code returned by model
    let convertedCode = '';

    // removing first n unneccessary characters from a string
    if (codeConverter.convert.data && sourceLanguage ==='cpp' && targetLanguage === 'java') {
      // finding the index of ')' character
      let i = Number(codeConverter.convert.data.indexOf(')')) + 1

      // total length of the string
      let len = codeConverter.convert.data.length

      // slicing the code
      convertedCode = codeConverter.convert.data.slice(i, len)
    }

    // removing first n unneccessary characters from a string
    if (codeConverter.convert.data && sourceLanguage ==='python' && targetLanguage === 'java') {
      convertedCode = codeConverter.convert.data.substring(135)
    }

    // removing first n unneccessary characters from a string
    if (codeConverter.convert.data && sourceLanguage ==='java' && targetLanguage === 'cpp') {
      convertedCode = codeConverter.convert.data.substring(135)
    }

    // removing first n unneccessary characters from a string
    if (codeConverter.convert.data && sourceLanguage ==='python' && targetLanguage === 'cpp') {
      
      convertedCode = codeConverter.convert.data.substring(135)
    }

    // removing first n unneccessary characters from a string
    if (codeConverter.convert.data &&  sourceLanguage ==='cpp' && targetLanguage === 'python') {
      convertedCode = codeConverter.convert.data.substring(135)
    }

    // removing first n unneccessary characters from a string
    if (codeConverter.convert.data &&  sourceLanguage ==='java' && targetLanguage === 'python') {
      convertedCode = codeConverter.convert.data.substring(135)
    }        
    // setting the value of the converted code
    setTargetLanguageCode(convertedCode)

  }, [codeConverter.convert]);
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
          <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">{'Language:'}{sourceLanguage}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={sourceLanguage}
                onChange={handleChangeSource}
                label="sourceLanguage"
              >
                <MenuItem value={sourceLanguages['CPP']}>{'CPP'}</MenuItem>
                <MenuItem value={sourceLanguages['JAVA']}>{'JAVA'}</MenuItem>
                <MenuItem value={sourceLanguages['Python']}>{'Python'}</MenuItem>
              </Select>
            </FormControl>
          </Grid> 
          <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">{'Language:'}{targetLanguage}</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={targetLanguage}
                onChange={handleChangeTarget}
                label="targetLanguage"
              >
                <MenuItem value={targetLanguages['CPP']}> {'CPP'} </MenuItem>
                <MenuItem value={targetLanguages['JAVA']}> {'JAVA'} </MenuItem>
                <MenuItem value={targetLanguages['Python']}> {'Python'} </MenuItem>
              </Select>
            </FormControl>
          </Grid>       
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.sourceLangDiv}>
            <TextField
              id="outlined-multiline-static"
              label="Sample Source Lang Code"
              multiline
              rows={22}
              placeholder={getSampleCodeSourceLanguage()}
              variant="outlined"
              onChange={(e) => setSourceLanguageCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.targetLangDiv}>
            <TextField
              id="outlined-multiline-static"
              label="Sample Target Lang Code"
              multiline
              rows={22}
              value={targetLanguageCode}
              placeholder={getSampleCodeTargetLanguage()}
              variant="outlined"
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={6} xl={6}>
            <Button variant="contained" color="primary" className={classes.convertButtonClass} onClick={() => convertCode()}>
              Convert 
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default CodeConverter;
