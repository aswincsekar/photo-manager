import React, {Component} from 'react';
import {Container, Grid, List, Image, Input, Header, Label, Card} from 'semantic-ui-react';
import { connect } from 'react-redux'
import {fetchPersonGroup, selectPersonGroup} from '../actions';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
    const {personGroups, login} = state;
    const auth_token = login.auth_token;
    return {
      personGroups,
      auth_token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchPersonGroup: (page, search, auth_token) => {
          dispatch(fetchPersonGroup(page, search, auth_token))
      },
      selectPersonGroup: (pg) => {
        dispatch(selectPersonGroup(pg))
      }
    }
}

const PersonGroupList = ({isLoading, personGroups, selectPersonGroup}) => {
    const listItems = personGroups.map((pg,index)=>(
        <List.Item key={index} active={pg.isSelected} onClick={()=>selectPersonGroup(index)}>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg' />
        <List.Content>
            <List.Header>{pg.title}</List.Header>
        </List.Content>
        </List.Item>
    ))
    const LoadingItem = <List.Item>
    <List.Content>
        <List.Header>Loading</List.Header>
    </List.Content>
    </List.Item>;
    return(
        <List selection verticalAlign='middle' style={{height:"calc(100vh - 49px - 6rem)", overflowY:"auto"}}>
        {isLoading?LoadingItem:listItems}
        </List>
    )
}

const ConnectedPersonGroupList = connect(mapStateToProps, mapDispatchToProps)

const UserList = ({isLoading, persons}) => {
    const listItems = persons.map((pg,index)=>(
        <List.Item key={index}>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg' />
        <List.Content>
            <List.Header>{pg.name}</List.Header>
        </List.Content>
        </List.Item>
    ))
    const LoadingItem = <List.Item>
    <List.Content>
        <List.Header>Loading</List.Header>
    </List.Content>
    </List.Item>;
    return(
        <List selection verticalAlign='middle' style={{height:"calc(100vh - 49px - 6rem)", overflowY:"auto"}}>
        {isLoading?LoadingItem:listItems}
        </List>
    )
}

class MainPage extends Component{
    componentDidMount(){
        let {auth_token} = this.props;
    }
    render(){
        const src = 'https://react.semantic-ui.com/assets/images/wireframe/white-image.png';
        const {personGroups} = this.props;
        const selectedPersonGroup = personGroups.personGroupItems[personGroups.selectedPersonGroup];
        let persons = new Array(0);
        if(selectedPersonGroup){
            persons = selectedPersonGroup.persons;
        }
        return(
            <Container fluid>
                <Grid divided padded>
                    <Grid.Row style={{ height:"100vh"}}>
                        <Grid.Column width={3} >
                            <Header as='h2' style={{marginTop:"1rem"}}>Person Groups</Header>
                            <Input fluid style={{marginTop:"1rem"}} placeholder="Search Person Group..."/>
                            <PersonGroupList isLoading={personGroups.isLoading} personGroups={personGroups.personGroupItems} selectPersonGroup={this.props.selectPersonGroup}></PersonGroupList>
                        </Grid.Column>
                        <Grid.Column width={3} >
                            <Header as='h2' style={{marginTop:"1rem"}}>Persons</Header>
                            <Input fluid style={{marginTop:"1rem"}} placeholder="Search Person..."/>
                            <UserList isLoading={personGroups.isLoading} persons={persons}></UserList>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as='h2' style={{marginTop:"1rem"}}>Photos <Label pointing="left">Status</Label></Header>
                            <Card.Group itemsPerRow={4} style={{height:"calc(100vh - 30px - 2rem)", overflowY:"auto"}}>
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='teal' image={src} />
                                <Card color='grey' image={src} />
                                <Card color='grey' image={src} />
                                <Card color='grey' image={src} />
                                <Card color='grey' image={src} />
                                <Card color='grey' image={src} />
                                <Card color='grey' image={src} />
                                <Card color='grey' image={src} />
                                <Card color='grey' image={src} />
                                <Card color='grey' image={src} />
                                <Card color='grey' image={src} />
                            </Card.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

MainPage.propTypes = {
    personGroups: PropTypes.object,
    auth_token: PropTypes.string,
    getPersonGroups: PropTypes.func,
    login: PropTypes.func,
    fetchPersonGroup: PropTypes.func
}

export default connect(mapStateToProps,mapDispatchToProps)(MainPage);