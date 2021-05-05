import React from 'react';

const Logo = (props: any) => {
  return (
    <img
      alt="Logo"
      height="55"
      width="55"
      src="/static/favicon.png"
      {...props}
    />
  );
};

export default Logo;
