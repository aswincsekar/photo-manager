import React, {Component} from 'react';
import {Button, Menu, Container, Grid, List, Image, Input, Header} from 'semantic-ui-react';
import { connect } from 'react-redux'
import {fetchPersonGroup, selectPersonGroup, selectPerson} from '../actions';
import PropTypes from 'prop-types';
import { fetchFaceGroupsIfNeeded, fetchFacesIfNeeded, toggleFaceSelectionIfNeeded, fetchMoreFacesIfNeeded } from '../actions';
import next from '../assets/next.png';
const mapStateToProps = (state) => {
    const {personGroups, login, faceGroupsForPerson, facesForPerson} = state;
    const auth_token = login.auth_token;
    return {
      personGroups,
      auth_token,
      faceGroupsForPerson,
      facesForPerson
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchPersonGroup: (page, search, auth_token) => {
          dispatch(fetchPersonGroup(page, search, auth_token))
      },
      selectPersonGroup: (pg) => {
        dispatch(selectPersonGroup(pg));
      },
      selectPerson: (pr)=>{
          dispatch(selectPerson(pr));
      },
      fetchFaceGroups: (pr)=>{
        dispatch(fetchFaceGroupsIfNeeded(pr))
      },
      fetchFaces: (pr)=>{
          dispatch(fetchFacesIfNeeded(pr))
      },
      toggleFaceSelection: (pr, fc)=>{
          dispatch(toggleFaceSelectionIfNeeded(pr, fc))
      },
      fetchMoreFaces: (page, pr)=>{
          dispatch(fetchMoreFacesIfNeeded(page, pr))
      }
    
    }
}

const PersonGroupList = ({isLoading, personGroups, selectPersonGroup}) => {
    const listItems = personGroups.map((pg,index)=>(
        <List.Item key={index} active={pg.isSelected} onClick={()=>selectPersonGroup(pg.id)}>
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

const UserList = ({isLoading, persons, selectPerson}) => {
    const listItems = persons.map((pg,index)=>(
        <List.Item active={pg.isSelected} key={index} onClick={()=>selectPerson(pg.id)}>
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

const FaceGroupList = ({faceGroup})=>{
    let fgList = null;
    if(faceGroup!==null && typeof faceGroup !== "undefined"){
        fgList = faceGroup.faceGroupItems.map((fg, index)=>{
            return <Image rounded={true} centered={true} src={fg.face_image} key={fg.id}></Image>
        })
    }else{
        fgList = <div></div>
    }
    return(
        <Image.Group size="small" style={{height:"calc(100vh - 30px - 3rem)", overflowY:"auto"}}>
            {fgList}  
        </Image.Group>
    )
}

const FaceList = ({toggleFaceSelection ,faces, person, fetchMoreFaces})=>{
    let fgList = null;
    let page=0;
    if(faces!==null && typeof faces !== "undefined"){
        fgList = faces.facesItems.map((fg, index)=>{
            if(fg.selected){
                return <Image as="a" onClick={()=>toggleFaceSelection(person, fg.id)} label={{color: 'black', icon:"check",  corner:'left' }} rounded={true} centered={true} src={fg.face_img_url} key={fg.id}></Image>
            }else{
                return <Image as="a" onClick={()=>toggleFaceSelection(person, fg.id)} label={{ color: 'black', icon:"empty heart",  corner:'left' }} rounded={true} centered={true} src={fg.face_img_url} key={fg.id}></Image>
            }
        })
        page = faces.page;
    }else{
        fgList = <div></div>
    }
    return(
        <Image.Group size="small" style={{height:"calc(100vh - 30px - 3rem)", overflowY:"auto"}}>
            {fgList}
            <Image as="a" onClick={()=>{fetchMoreFaces(page+1, person)}} src={next} rounded={true} color="teal"></Image>
        </Image.Group>
    )
}

const SelectedFaceList = ({toggleFaceSelection ,faces, person})=>{
    let fgList = null;
    if(faces!==null && typeof faces !== "undefined"){
        fgList = faces.facesItems.filter((fg)=>fg.selected).map((fg, index)=>{
            return <Image as="a" onClick={()=>toggleFaceSelection(person, fg.id)} label={{ as: 'a', color: 'black', icon:"check",  corner: 'left' }} rounded={true} centered={true} src={fg.face_img_url} key={fg.id}></Image>
        })
    }else{
        fgList = <div></div>
    }
    return(
        <Image.Group size="small" style={{height:"calc(100vh - 30px - 3rem)", overflowY:"auto"}}>
            {fgList}  
        </Image.Group>
    )
}

const NotSelectedFaceList = ({toggleFaceSelection ,faces, person})=>{
    let fgList = null;
    if(faces!==null && typeof faces !== "undefined"){
        fgList = faces.facesItems.filter((fg)=>!fg.selected).map((fg, index)=>{
            return <Image as="a" onClick={()=>toggleFaceSelection(person, fg.id)} label={{ as: 'a', color: 'black', icon:"empty heart",  corner: 'left' }} rounded={true} centered={true} src={fg.face_img_url} key={fg.id}></Image>
        })
    }else{
        fgList = <div></div>
    }
    return(
        <Image.Group size="small" style={{height:"calc(100vh - 30px - 3rem)", overflowY:"auto"}}>
            {fgList}  
        </Image.Group>
    )
}

class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeItem: "face groups",
            activePerson: null,
        }
    }
    componentWillReceiveProps(nextProps){
        const {personGroups} = nextProps;
        const selectedPersonGroup = personGroups.personGroupItems.find((pg)=>{return pg.id===personGroups.selectedPersonGroup});
        if(selectedPersonGroup){
            const selectPerson = selectedPersonGroup.selectedPerson;
            if (selectPerson !== this.state.activePerson){
                this.props.fetchFaceGroups(selectPerson);
                this.props.fetchFaces(selectPerson);
                this.setState(
                    {
                        activePerson: selectPerson
                    }
                )
            } 
        }
        
    }
    handleItemClick = (e, {name}) => {this.setState({activeItem: name})}
    render(){
        const {personGroups, faceGroupsForPerson, facesForPerson} = this.props;
        const {activeItem, activePerson} = this.state;
        const selectedPersonGroup = personGroups.personGroupItems.find((pg)=>{return pg.id===personGroups.selectedPersonGroup});
        let persons = new Array(0);
        let faceGroup = null;
        let faces = null;
        if(selectedPersonGroup){
            persons = selectedPersonGroup.persons;
        }
        if(activePerson){
            faceGroup = faceGroupsForPerson[activePerson];
            faces = facesForPerson[activePerson]
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
                            <Header as='h2' style={{marginTop:"1rem"}}>Persons <Button size="tiny" floated="right">Add</Button></Header>
                            <Input fluid style={{marginTop:"1rem"}} placeholder="Search Person..."/>
                            <UserList selectPerson={this.props.selectPerson} isLoading={personGroups.isLoading} persons={persons}></UserList>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Menu pointing secondary>
                                <Menu.Item name='face groups' active={activeItem === 'face groups'} onClick={this.handleItemClick} />
                                <Menu.Item name='photos' active={activeItem === 'photos'} onClick={this.handleItemClick} />
                                <Menu.Item name='selected' active={activeItem === 'selected'} onClick={this.handleItemClick} />
                                <Menu.Item name='unselected' active={activeItem === 'unselected'} onClick={this.handleItemClick} />
                            </Menu>
                            {activeItem==="face groups"?<FaceGroupList faceGroup={faceGroup}></FaceGroupList>:""}
                            {activeItem==="photos"?<FaceList person={activePerson} toggleFaceSelection={this.props.toggleFaceSelection} faces={faces} fetchMoreFaces={this.props.fetchMoreFaces}></FaceList>:""}
                            {activeItem==="selected"?<SelectedFaceList person={activePerson} toggleFaceSelection={this.props.toggleFaceSelection} faces={faces}></SelectedFaceList>:""}
                            {activeItem==="unselected"?<NotSelectedFaceList person={activePerson} toggleFaceSelection={this.props.toggleFaceSelection} faces={faces}></NotSelectedFaceList>:""}
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
    fetchPersonGroup: PropTypes.func,
    fetchFaceGroups: PropTypes.func,
    faceGroupsForPerson: PropTypes.object,
    fetchFaces: PropTypes.func,
    facesForPerson: PropTypes.object,
    toggleFaceSelection: PropTypes.func,
    fetchMoreFaces: PropTypes.func
}

export default connect(mapStateToProps,mapDispatchToProps)(MainPage);