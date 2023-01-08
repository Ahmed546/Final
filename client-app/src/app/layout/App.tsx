import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


function App() {

  const {activityStore} = useStore();


  useEffect(() => {
   activityStore.loadActivities()
  }, [activityStore]);


  



  if (activityStore.loadingInitial === true) { return < LoadingComponent content='App is Loading....' /> }
  return (
    <div >
      <NavBar />

      <Container style={{ marginTop: '7em' }} >



        <ActivityDashboard />

      </Container>

    </div>
  );
}

export default observer(App);
