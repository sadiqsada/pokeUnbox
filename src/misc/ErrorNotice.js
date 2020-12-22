import React from 'react';
import { Alert, Button } from 'antd';

function ErrorNotice(props) {
  return (
    <>
      <Alert message={props.message} type='error' />
      <Button onClick={props.clearError} type='primary' size='large' danger>
        X
      </Button>
    </>
  );
}

export default ErrorNotice;
