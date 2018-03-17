import React, {Component} from 'react';
import {Container, Grid, List, Image, Input, Header, Label, Card} from 'semantic-ui-react';


const UserList = () => (
    <List selection verticalAlign='middle' style={{height:"calc(100vh - 49px - 6rem)", overflowY:"auto"}}>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg' />
        <List.Content>
            <List.Header>Helen</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/christian.jpg' />
        <List.Content>
            <List.Header>Christian</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>
        <List.Item>
        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
        <List.Content>
            <List.Header>Daniel</List.Header>
        </List.Content>
        </List.Item>

    </List>
)
class MainPage extends Component{

    render(){
        const src = 'https://react.semantic-ui.com/assets/images/wireframe/white-image.png'
        return(
            <Container fluid>
                <Grid divided padded>
                    <Grid.Row style={{ height:"100vh"}}>
                        <Grid.Column width={3} >
                            <Header as='h2' style={{marginTop:"1rem"}}>Person Groups</Header>
                            <Input fluid style={{marginTop:"1rem"}} placeholder="Search Person Group..."/>
                            <UserList></UserList>
                        </Grid.Column>
                        <Grid.Column width={3} >
                            <Header as='h2' style={{marginTop:"1rem"}}>Persons</Header>
                            <Input fluid style={{marginTop:"1rem"}} placeholder="Search Person..."/>
                            <UserList></UserList>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header fluid as='h2' style={{marginTop:"1rem"}}>Photos <Label pointing="left">Status</Label></Header>
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

export  {MainPage};