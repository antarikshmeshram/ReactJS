import React from 'react';

const Weather = (props) => {    
    return (
        <div>
                { props.city && props.country && <span>City:  { props.city }, { props.country}</span> }
                { props.temperature && <span> Temperature:  { props.temperature }</span> }
                { props.humidity && <span> Humidity: { props.humidity }</span> }
                { props.description[1] && <span> Description: { props.description[1] }</span> }
                { props.error && <span> { props.error } </span> }
       </div>  
    );
}

export default Weather;