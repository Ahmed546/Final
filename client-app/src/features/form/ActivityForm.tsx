import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../app/layout/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm:() => void;
    createActivity: (activity: Activity) => void;
    submitting:boolean
}

export default function ActivityForm ({closeForm,activity,createActivity,submitting}: Props) {

    const intialState =  activity ?? {
        id:'',
        title: '',
        date: '',
        description:'',
        category:'',
        city: '',
        venue:'',
    }

    const [act,setAct]= useState<any>(intialState);

   function handleSubmit(){
       createActivity(act);
       
    }

    function handleInputChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) {
    
        const {name,value} = event.target;

        setAct({...act,[name]:value});  
    }

    return(

        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Titile' value={act.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={act.description} name='description' onChange ={handleInputChange}   />
                <Form.Input placeholder='Category'  value={act.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' type='date'  value={act.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City'  value={act.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue'  value={act.venue} name='venue' onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' positive type='button' content='Cancel' />
            </Form>

        </Segment>
    );
}