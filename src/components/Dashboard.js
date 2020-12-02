import React, {Component} from 'react';
import { connect } from 'react-redux';
import Question from "./Question";
import UnAnQuestion from "./UnAnQuestion";
import './../App.css';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from "@material-ui/core/styles/withStyles";



const styles={
    root: {
        flexGrow: 1,
    },
grid_Contain:{
   // maxWidth: 800,

},
};



class Dashboard extends Component {

    state = {
        showVoted: 1,
    }


    handleFilterClicked = ( showVoted) => {
        this.setState({ showVoted });
    }

    render() {

        const { showVoted } = this.state;
        const { authedUser, questions, users } = this.props;
        const {classes}=this.props;


        const votedIDbyAuthedUser=Object.keys(users[authedUser].answers).sort((a,b)=>questions[b].timestamp-questions[a].timestamp);;
        const unvotedID = Object.keys(questions).filter(q => !votedIDbyAuthedUser.includes(q)).sort((a,b)=>questions[b].timestamp-questions[a].timestamp);;

        return (
          <Grid container className={classes.grid_Contain}
             spacing={6} direction="row"
              justify="center"
              alignItems="center">

              <Grid item sm={12} xs={12}>
              <Paper className={classes.root}>
                          <Tabs
                              value={showVoted}
                              onChange={this.handleFilterClicked }
                              indicatorColor="primary"
                              textColor="primary"
                              centered
                          >
                              <Tab label="Answered" onClick={(event) => this.handleFilterClicked(0)}   />
                              <Tab label="New Questions" onClick={(event) => this.handleFilterClicked(1)} />

                          </Tabs>
                      </Paper>
              </Grid>

              {showVoted === 0 &&

                        <Grid container spacing={6} direction="row"
                              justify="center"
                              alignItems="center">
                          { votedIDbyAuthedUser.map((question ,i)=>(

                              <Grid item sm={6} xs={12} key={i}>
                                  <Question id={question}/>

                              </Grid>
                          ))}
                        </Grid>

              }
              {showVoted === 1 &&

              <Grid container spacing={6} direction="row"
                    justify="center"
                    alignItems="center">
                          { unvotedID.map((question ,i)=>(

                              <Grid item sm={6} xs={12} key={i}>  <UnAnQuestion id={question}/>

                              </Grid>
                          ))}
              </Grid>

              }


          </Grid>
        );
    }
}

function mapStateToProps({ authedUser, questions, users }) {
    return {
        authedUser,
        questions,
        users,
    };
}

export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
