import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, TextField, Button, Typography, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab'
import { useAuth } from '../Context/Auth';
import '../Admin/Admin.css'
import { ApiURI } from '../AppConfig'
import axios from 'axios'

// card styles

const useStyles = makeStyles({
    root: {
      maxWidth: 330,
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    header: {
        marginTop: 12,
        marginBottom: 12,
    },
    content: {
        paddingBottom: 0,
    },
    bodyText: {
        marginBottom: 8,
    },
    input: {
        marginBottom: 12,
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: 6,
    },
  });

function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();
    const referer = props.location.state.referer || '/';
    const classes = useStyles();
    const [credsEmpty, setCredsEmpty] = useState(false);


    function postLogin() {
        setIsError(false);
        setError("");
        
        if (!userName || !password) {
            setCredsEmpty(true);
        } else {
            setCredsEmpty(false);
            axios.post(ApiURI + "/api/token/", {
                "username": userName,
                "password": password
                })
                .then(response => {
                    if (response.status === 200) {
                setAuthTokens(response.data.access);
                setLoggedIn(true);
                    } 
                else {
                    setIsError(true);
                    setError("Ошибка. Обратитесь к администратору");
                }
                })
                .catch(e => {
                        setIsError(true);
                        if (e.response && e.response.status === 401) {setError("Введены неправильные учетные данные")}
                        else if (!error && !e.response) {setError("Сервер аутентификации недоступен")}
                    });
        }
    }
  
    if (isLoggedIn) {
      return <Redirect to={referer} />;
    }
  
    return (
        <div className="Login">
        <Link to="./">Вернуться к расписанию <span role="img" aria-label="hat">🎓</span></Link>  
        {
            credsEmpty && <Alert severity="error">Введите учетные данные</Alert>
        }
        {
            isError && <Alert severity="error">{error}</Alert>
        }
        <Card className={classes.root} raised={true}>
            <CardHeader title="✍ Система управления расписанием" className={classes.header}/>
            <CardContent className={classes.content}>
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom className={classes.bodyText}>
                    Введите учетные данные
                </Typography>
                <TextField 
                    autoFocus={true}
                    required={true}
                    className={classes.input}
                    size="small"
                    id="userName" 
                    label="Имя пользователя" 
                    variant="outlined" 
                    value={userName}
                    onChange={e => {
                    setUserName(e.target.value);
                    }}
                />
                <TextField 
                    required={true}
                    className={classes.input}
                    size="small"
                    id="password" 
                    type="password"
                    label="Пароль" 
                    variant="outlined" 
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button color="primary" onClick={postLogin}>
                Войти
                </Button>
            </CardActions>
        </Card>
        </div>
    );
  }
  
  export default Login;

