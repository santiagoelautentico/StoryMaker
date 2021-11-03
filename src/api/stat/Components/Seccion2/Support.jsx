import React, { Component, useState } from 'react'
import { Table, Segment, Button, Icon, Secction } from 'semantic-ui-react';
import loadable from '@loadable/component';
const GrafDevice = loadable(() => import('./GrafDevice'));
const Layout = loadable(() => import('./Layout'));

const Header = () => {
    <Layout />

}
const Support = ({ id }) => {
    const [display, setDisplay] = useState('list');
    const handleDisplay = (display) => setDisplay(display);
    return (
        <>
            <Tabla id={id} title='BY OPERATIVE SYSTEM' handleDisplay={handleDisplay}>
                {display === 'list' &&
                    <Table striped id={id} className='tableStories' inverted>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>1 - 2000</Table.Cell>
                                <Table.Cell>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, obcaecati?
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>1 - 2000</Table.Cell>
                                <Table.Cell>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, obcaecati?
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                }
                {display === 'chart' &&
                    <GrafDevice />
                }

            </Tabla>


        </>
    )

};

export default Support && Header;