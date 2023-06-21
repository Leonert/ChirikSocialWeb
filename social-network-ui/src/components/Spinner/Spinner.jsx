import React from 'react';

const Spinner = ({ p }) => {
  return (
    <div style={{ width: 30, margin: '0px auto', padding: p }}>
      <div style={{ height: 26, width: 26, animation: `$spinner 0.75s linear 0s infinite` }}>
        <svg style={{ height: '100%', width: '100%' }} viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            style={{ stroke: (theme) => theme.palette.primary.main, strokeWidth: 4, opacity: 0.2 }}
          />
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            style={{
              stroke: (theme) => theme.palette.primary.main,
              strokeWidth: 4,
              strokeDasharray: 80,
              strokeDashoffset: 60,
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Spinner;
