import React, {useState, useEffect } from 'react';
import { Segment, Header, Table, Form, Dimmer, Loader } from 'semantic-ui-react';
import loadable from '@loadable/component';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
const GraficaGeneral = loadable(() => import('./Components/GraficaGeneral'));
const Barras = loadable(() => import('./Components/Barras'));
const Story = loadable(() => import('./Components/Seccion1/Story'));
const MostUser2 = loadable(() => import('./Components/MostUser2'));
const LastScore = loadable(() => import('./Components/LastScore'));
const TimeByStage = loadable(() => import('./Components/TimeByStage'));
const MostUserDevice = loadable(() => import('./Components/MostUserDevice'));

const General = () => {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState();
  const [stories, setStories] = useState();
  const protocol =  process.env.REACT_APP_SERVER_PROTOCOL;
  const domain = protocol + '://' + process.env.REACT_APP_SERVER_HOST;
  const server = domain + ':'+ process.env.REACT_APP_SERVER_PORT+'/';

  useEffect(() => {
    const getStories = async () => {
      try {
        setLoading(true);
        await fetch(server+"stories", {
          method: 'get',
          headers: {'Access-Control-Allow-Origin': '*', credentials: 'same-origin', 'Content-Type':'application/json'}
        })
        .then(response => {
          if (response && !response.ok) { throw new Error(response.statusText);}
          return response.json();
        })
        .then(data => {
            if(data) {
              const st = data.stories.filter((s,i) => (s.active === true));
              setStories(st);
              setLoading(false)
            } else {
              console.log('No Data received from the server');
            }
        })
      } catch(e) {
        console.log(e.message)
      }
    }
      getStories();
  }, []);

  return (
    <Segment className='secctionGeneral'>
      {/* FORMULARIO DE CUENTOS */}
      <Segment className='secctionBooks'>
        <Segment inverted className='headerBooks'>
          <Header className='textHeaderBooks' as='h3'>STORIES</Header>
        </Segment>
        <Segment inverted className='TableBooks'>
          <Dimmer active={loading} inverted>
             <Loader disabled={!loading} inverted content='Loading' />
          </Dimmer>
          <MenuList>
            {!loading && stories && stories.length > 0
              && stories.map((s,i) => (
                <MenuItem style={{fontSize: 10}} selected={(s.title === story)} dense={(s.title === story)} key={s.id} id={s.id} selected={(s.title === story)} onClick={() => setStory(s.title)}>{s.title}</MenuItem>
              ))
            }
          </MenuList>
        </Segment>
      </Segment>
      {/* GRAFICAS */}
      <Segment className='flexdirecction'>
        <Segment className='secctionGrafics'>
          <Segment inverted>
            <Segment id='stories' className='containerHeader'>
              <Segment inverted id='stories' className='appInstalled'>
                <Header className='titleGrafica' as='h5'>APP INSTALLED</Header>
              </Segment>
              <Segment inverted id='stories' className='total'>
                <Header className='titleGrafica' as='h5'>TOTAL <a>3000</a></Header>
              </Segment>
            </Segment>
            <GraficaGeneral />
            <Segment id='stories' className='containerHeader'>
              <Segment inverted id='stories' className='appInstalled'>
                <Header className='titleGrafica' as='h5'>STORY COMPLETED</Header>
              </Segment>
              <Segment inverted id='stories' className='total'>
                <Header className='titleGrafica' as='h5'>TOTAL <a>3000</a></Header>
              </Segment>
            </Segment>
            <GraficaGeneral />
            <Barras />
          </Segment>
        </Segment>
        {/* TABLAS */}
        <Segment className='secctionTables'>
          <Segment inverted>
            <Story />
          </Segment>
          <Segment inverted className='tablaGeneral'>
            <LastScore />
            <MostUser2 />
            <TimeByStage />
            <MostUserDevice />
          </Segment>
        </Segment>
      </Segment>
    </Segment>
  )
}


export default General;
