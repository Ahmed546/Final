import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
interface Props {
    openForm: (id?:string) => void;
}

export default function NavBar ({openForm}: Props) {
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