import React from 'react';
import { Switch, Route } from 'react-router'
import StateList from './components/State_All_Form/stateList';
import StateAddForm from './components/State_All_Form/addForm';
import CityAddForm from './components/City_All_Form/addForm';
import AddMovie from './components/Movie_All_Form/addMovie';
import MovieList from './components/Movie_All_Form/movieList';
import Header2 from './components/common/Header';
import cityList from './components/City_All_Form/cityList';
import userList from './components/Users_Theater_List/allUsersList';
import dashboard from './components/All Registration form/dashboard';
import theaterList from './components/Users_Theater_List/allTheaterList';
import { Layout } from 'antd';


const StateTask = (props) => {
    const { Content } = Layout;

    let content = <Content
        className="site-layout-background"
        style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        }}
        >
        <Switch>
            <Route path="/movie" exact component={MovieList} />
            <Route path="/movie/movieAdd" exact component={AddMovie} />
            <Route path="/state" exact component={StateList}/>
            <Route path="/state/stateAdd" exact component={StateAddForm}/>
            <Route path="/city/cityAdd" exact component={CityAddForm}/>
            <Route path="/city" exact component={cityList}/>
            <Route path="/users/" exact component={userList} />
            <Route path="/theaters/" exact component={theaterList} />
            <Route path="/dashboard" exact component={dashboard} />
        </Switch>
    </Content>

    return <>
        <Header2 content={content}/>
    </>
}

export default StateTask