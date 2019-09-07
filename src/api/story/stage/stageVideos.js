import React, {useEffect, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import {
  Segment,
} from 'semantic-ui-react';


function StageVideos(props) {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({

    accept: 'video/*',
    minSize: 0,
    maxSize: 5242880000,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        src: URL.createObjectURL(file)
      })));
      props.setStageObjects(acceptedFiles, 'stageVideos');
    }
  });


  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.src));
  }, [files]);


  return (

      <Segment className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input  id='stageVideos' name='files' onChange={(e) => this.props.onChangeObjectsHandler(e, 'stageVideos')} ref={ref => this.fileInput = ref} {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          {!isDragActive && 'Click here or drop a file to upload!'}
          {isDragActive && !isDragReject && "Drop it like it's hot!"}
          {isDragReject && "File type not accepted, sorry!"}
        </div>
      </Segment>

  );
}
export default StageVideos;
