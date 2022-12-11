import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './paginas/login'
import Inicio from './paginas/inicio'
import Home from './paginas/home'
import Logout from './paginas/logout'
import Clientes from './paginas/clientes'
import ClienteEdit from './paginas/clientes-edit'
import ClienteRegistrar from './paginas/registrar-cliente'
import RegistrarUsuario from './paginas/registrar-usuario'
import Equipos from './paginas/equipos/equipos'
import RegistrarEquipos from './paginas/equipos/registrar-equipo'
import EditarEquipos from './paginas/equipos/editar-equipo'

import Deporte from './paginas/deportes/deportes'
import RegistrarDeporte from './paginas/deportes/registrar-deporte'
import EditarDeporte from './paginas/deportes/editar-deporte'

import Evento from './paginas/eventos/eventos'
import RegistrarEvento from './paginas/eventos/registrar-evento'
import EditarEvento from './paginas/eventos/editar-evento'

function App() {

  return (

    <Router>
        <Routes>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/" exact element={<Inicio/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/logout" exact element={<Logout/>}/>

          <Route path="/registrar-usuario" exact element={<RegistrarUsuario/>}/>

          <Route path="/equipos" exact element={<Equipos/>}/>
          <Route path="/equipo-registrar" exact element={<RegistrarEquipos/>}/>
          <Route path="/equipo-editar/:idequipo" exact element={<EditarEquipos/>}/>

          <Route path="/deportes" exact element={<Deporte/>}/>
          <Route path="/deporte-registrar" exact element={<RegistrarDeporte/>}/>
          <Route path="/deporte-editar/:iddeporte" exact element={<EditarDeporte/>}/>

          <Route path="/eventos" exact element={<Evento/>}/>
          <Route path="/evento-registrar" exact element={<RegistrarEvento/>}/>
          <Route path="/evento-editar/:idevento" exact element={<EditarEvento/>}/>


          <Route path="/clientes" exact element={<Clientes/>}/>
          <Route path="/clientes-registrar" exact element={<ClienteRegistrar/>}/>
          <Route path="/clientes-edit/:idcliente" exact element={<ClienteEdit/>}/>

        </Routes>
      </Router>


  );
}

export default App;