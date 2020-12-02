import React , {Component} from 'react';
import {connect} from 'react-redux';
import{handleInitialData} from "../actions/shared";
import {Link, Route} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider }from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import './../App.css';
import Dashboard from "./Dashboard";
import Logon from './Logon';
import Navbar from "./Navbar";
import Navbar2 from "./Navbar22";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import QuestionDetial from "./QuestionDeial";
import NotFound from "./NotFound";

const theme= createMuiTheme({
    palette: {
        primary: {
            light:'#33c9dc',
             main: '#00bcd4',
             dark:'#008394',
        contrastText:'#fff'},
        secondary:{
            light:'#ff6333',
            main: '#ff3d00',
            dark:'#b22a00',
            contrastText:'#fff'},
    },
    typography:{
        useNextVariants:true
    },
    
});


class  App extends Component {

    componentDidMount(){

     this.props.dispatch(handleInitialData())
    }

    render() {
        const { loggedOn } = this.props;

        return (
<MuiThemeProvider theme={theme}>

                <Navbar2/>
                {this.props.loggedOn
                    ? <div className='containerDiv'>

                        <br/>
                       <br/>
                        <Route path='/add' exact component={NewQuestion} loggedOn={this.props.loggedOn}/>
                        <Route path='/' exact component={Dashboard} loggedOn={this.props.loggedOn} />
                        <Route path='/questions/:id' exact component={QuestionDetial} loggedOn={this.props.loggedOn}/>
                        <Route  path='/leaderBoard' exact component={LeaderBoard} loggedOn={this.props.loggedOn} />
                        <Route path='/notFound' exact component={NotFound} loggedOn={this.props.loggedOn} />
                      </div>

                    : <div className='containerDiv'>
                        <Logon />
                    </div>

                }

</MuiThemeProvider>
        );
    }
};

function mapStateToProps({ authedUser }) {

    return {

        loggedOn: authedUser !== null,
    };
}
export default connect(mapStateToProps) (App);
