import React from 'react';
import './loadingScreen.css'; 

const LoadingScreen = ({display}) => {
  
    return (

      <div className={`${display}`}>
        <div className={"loading-screen"}>
          <div className="loading-spinner"></div>
        </div>
      </div>
      
    );
};

export default LoadingScreen