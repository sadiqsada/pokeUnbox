import React from 'react';
import { Alert, Button } from 'antd';

function ErrorNotice(props) {
  return (
    // <div className='error-notice'>
    //   <span>{props.message}</span>
    //   <button onClick={props.clearError}>X</button>
    // </div>
    <>
      <Alert message={props.message} type='error' />
      <Button onClick={props.clearError} type='primary' size='large' danger>
        X
      </Button>
    </>
  );
}

export default ErrorNotice;
