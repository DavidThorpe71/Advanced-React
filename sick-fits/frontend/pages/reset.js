import React from 'react';
import Reset from '../components/Reset';

const reset = (props) => {
  const { query } = props;
  return (
    <div>
      <p>Reset your password</p>
      <Reset resetToken={query.resetToken} />
    </div>
  );
};

export default reset;
