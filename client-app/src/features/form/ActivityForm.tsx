import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';



export default observer( function ActivityForm () {

    const {activityStore} = useStore();
    const {selectedActivity, closeForm,createActivity,updateActivity,loading} = activityStore;

    const intialState =  selectedActivity ?? {
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
      
    act.id ? updateActivity(act) : createActivity(act);
       
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
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' positive type='button' content='Cancel' />
            </Form>

        </Segment>
    );
})