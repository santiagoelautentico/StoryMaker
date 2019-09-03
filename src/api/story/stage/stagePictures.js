import React, {useEffect, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import {
  Segment,
  Placeholder,
  Icon,
  Button,
  List,
  Image,
} from 'semantic-ui-react';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

function StagePictures(props) {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({

    accept: 'image/*',
    minSize: 0,
    maxSize: 5242880,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      props.setPictures(acceptedFiles);
    }
  });


  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);


  return (
    <Segment.Group vertical>
      <Segment  className="stage">
        <Placeholder fluid>
          <Placeholder.Header image >
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
        </Placeholder>

        <aside style={thumbsContainer}>
          <List animated celled verticalAlign='middle'>
            {
              files.map(file => (
                <List.Item
                  onDragStart = {(e) => this.props.onDragStart(e, e.key)}
                  draggable
                  key={file.name}
                  className='slide-out draggable'>
                  <Button key={file.name} floated="right" onClick circular simple color='violet'><Icon name="delete" size='mini'/></Button>
                  <Image size='small' src={file.preview} />
                  <List.Content>
                    <List.Header>{file.name}</List.Header>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </aside>
      </Segment>
      <Segment className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input  id='stagePictures' name='files' onChange={props.onChangeHandler} ref={ref => this.fileInput = ref} {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          {!isDragActive && 'Click here or drop a file to upload!'}
          {isDragActive && !isDragReject && "Drop it like it's hot!"}
          {isDragReject && "File type not accepted, sorry!"}
        </div>
      </Segment>
      </Segment.Group>
  );
}
export default StagePictures;
