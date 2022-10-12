import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/Agent';
import LoadingComponent from './LoadingComponent';


function App() {

  const [activites, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(res => {
      let activities: Activity[] = [];
      res.forEach(act => {
        act.date = act.date.split('T')[0];
        activities.push(act);
      })
      setActivities(res);
      setLoading(false);
    })
  }, []);

  function HandleSelectActivity(id: string) {

    setSelectedActivity(activites.find(x => x.id === id));

  }
  function HandleCancelActivity() {

    setSelectedActivity(undefined);
  }

  function HandleFormOpen(id?: string) {
    id ? HandleSelectActivity(id) : HandleCancelActivity();
    setEditMode(true);
  }

  function HandleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    if (activity.id) {
      setSubmitting(true);
      agent.Activities.update(activity).then( () => { setActivities([...activites.filter(x => x.id !== activity.id), activity]);
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmitting(false);

    })
  }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(()=> {
        setActivities([...activites, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
      
    }

  }

  function handleDeleteActivity(id: string) {

    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activites.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    

 

  }


  if (loading === true) { return < LoadingComponent content='App is Loading....' /> }
  return (
    <div >
      <NavBar openForm={HandleFormOpen} />

      <Container style={{ marginTop: '7em' }} >
        <ActivityDashboard activites={activites}
          selectedActivity={selectedActivity}
          selectActivity={HandleSelectActivity}
          cancelActivity={HandleCancelActivity}
          editMode={editMode}
          openForm={HandleFormOpen}
          closeForm={HandleFormClose}
          createActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />

      </Container>

    </div>
  );
}

export default App;
