import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Login from './pages/dashboard/Login';
import Dashboard from './pages/dashboard/OrphangesList';
import OrphangeEdit from './pages/dashboard/OrphanageEdit';
import OrphanageRegister from './pages/dashboard/OrphangesRegister';
import OrphanageAccept from './pages/dashboard/OrphanageAccept';
import Delete from './pages/dashboard/Delete';
import Save from './pages/dashboard/Save';
import NewPassword from './pages/dashboard/NewPassword';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={NewPassword} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/orphanages-edit/:id" component={OrphangeEdit} />
                <Route path="/orphanages/pending" component={OrphanageRegister} />
                <Route path="/orphanages/accept/:id" component={OrphanageAccept} />
                <Route path="/delete" component={Delete} />
                <Route path="/save" component={Save} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;