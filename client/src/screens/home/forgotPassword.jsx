import React, {Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card, Grid, CardContent, Button, Typography, AppBar, Toolbar} from '@material-ui/core';
import Form from 'components/form/form';
import InputField from 'components/form/inputField'; 
import {Link} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const styles = { 
  root: {
    minWidth: 180   
  },

  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 55
  },

  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'

  },
  subHeading: {
    textAlign: 'center',
    fontSize: 15,   
    display: 'block'
  }
};

class ForgotPassWord extends Form {
    state = {
        data: {}
    };

    onSubmit = async() => {
        console.log(this.state);
    }

    render(){ 
        return (
            <Fragment>
                <AppBar position="static" style={{backgroundColor: 'white'}}>
                    <Toolbar>
                        <Typography variant="overline" style={{color: '#006633', fontWeight: 'bolder', fontSize: 18}}>
                            Fixed Assets Register
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{backgroundColor: '#E0E0E0', display: 'block', height: '95vh'}}>
                    <Grid
                        container 
                        alignItems="center"
                        justify="center"
                        style={{minHeight: '75vh'}}
                    >
                        <Grid item xs={10} lg={4} md={4} >
                            <Card style={styles.root} raised>
                                <CardContent>
                                    <LockOutlinedIcon style={styles.image} />
                                    <br />
                                    <Typography variant="h1" style={styles.heading}>
                                        Trouble Logging In ?
                                    </Typography>
                                    <br />
                                    <Typography variant="subtitle2" style={styles.subHeading} color="textSecondary">
                                    Enter your email and we'll send you a link to get back into your account.
                                    </Typography>
                                    <form onSubmit={this.handleSubmit}>
                                        <Grid 
                                            container 
                                            alignItems="center"
                                            justify="center"
                                        >
                                            <Grid item xs={12} md={10} lg={10}>
                                                <InputField
                                                    required
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    autoComplete="email"
                                                    autoFocus={true}
                                                    onChange={this.handleOnChange}
                                                    type="email"
                                                    size="small"
                                                    margin="normal"
                                                    
                                                />
                                            </Grid>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor: "#006633",
                                                        color: "white",
                                                        marginTop: 8
                                                    }}
                                                    >
                                                    Send me Login link
                                                </Button>
                                        </Grid>
                                    </form>
                                </CardContent>
                                <br />
                                <Grid 
                                container 
                                alignItems="center"
                                justify="center"
                                >
                                    <Link
                                    style={{textDecoration: 'none'}}
                                    to={"/"}
                                    >
                                        <Typography style={{color: '#006633', fontWeight: 'bold'}}>
                                            Back to Login
                                        </Typography>
                                    </Link>
                                </Grid>
                                <br/><br />
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}


export default withStyles(styles)(ForgotPassWord);