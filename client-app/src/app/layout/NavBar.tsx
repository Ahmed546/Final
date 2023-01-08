import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';


export default function NavBar () {

    const {activityStore} = useStore();
    const {openForm} = activityStore;
    return (
        <Menu inverted top='fixed'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '5px'}}></img>
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={()=>{openForm()}} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}