import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../app/layout/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activites: Activity [],
    selectedActivity : Activity | undefined,
    selectActivity: (id:string) => void,
    cancelActivity:() => void;
    editMode: boolean;
    openForm: (id?: string) => void;
    closeForm:() => void;
    createActivity: (activity: Activity) => void;
    deleteActivity: (id:string) => void;
    submitting: boolean;

}

export default function ActivityDashboard({activites,selectActivity,
    selectedActivity,cancelActivity,openForm,closeForm,editMode,createActivity,deleteActivity,
    submitting}: Props) {


    return (
        <Grid>
            <Grid.Column width={10}>
               <ActivityList submitting={submitting} activites={activites} selectActivity={selectActivity} deleteActivity={deleteActivity}/>

            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity?.id && !editMode &&
                <ActivityDetails activity={selectedActivity} cancelActivity={cancelActivity} 
                openForm={openForm}
              
                /> } 
                {editMode && 
                <ActivityForm closeForm={closeForm} activity={selectedActivity} createActivity={createActivity} 
                submitting={submitting}
                />
                }
            </Grid.Column>
        </Grid>
    );
}