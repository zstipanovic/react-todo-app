import React from 'react';
import { RouterProps } from 'react-router';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase';
import { service } from 'service';
import { firebaseConfig } from 'modules/firebase';
import { login } from 'modules/authentication';
import { AppRoute } from 'const';

interface Props extends RouterProps {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(1, 0, 1),
        },
    })
);

export default function LoginScreen(p: Props) {
    const classes = useStyles();

    const handleLogin = React.useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            service.login(email.value, password.value).then(async () => {
                const userId = await firebaseConfig.auth().currentUser?.uid;
                login(userId ? userId : 'guest');
                p.history.push(AppRoute.Home);
            });
        },
        [p.history]
    );

    const handleAnonymousLogin = React.useCallback(async () => {
        await firebaseConfig.auth().signInAnonymously();
        //const userId = await firebaseConfig.auth().currentUser?.uid;
        //login(userId ? userId : 'UNKNOWN');
        login('guest');
        p.history.push(AppRoute.Home);
    }, [p.history]);

    const handleLoginWithFacebook = React.useCallback(() => {
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.setCustomParameters({
            display: 'popup',
        });
        firebaseConfig.auth().signInWithPopup(provider);
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={handleLoginWithFacebook}
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Sign in with Facebook
                    </Button>
                    <Button
                        onClick={handleAnonymousLogin}
                        fullWidth
                        variant="contained"
                        color="inherit"
                        className={classes.submit}
                    >
                        Sign in anonymously
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
