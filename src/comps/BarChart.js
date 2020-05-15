import React from 'react';
import {Bar} from 'react-chartjs-2';
import {withFirebase} from './Firebase'
function BarChart(props) {
  
  // console.log(props.data)
  const data = {
    labels: props.data[0],
    datasets: [
      {
        label: props.label || "Count",
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: props.data[1]
      }
    ]
  }
  return (
    <div className="App" > 
        <Bar
            data={data}
            options={{
            title:{
                display:true,
                text:props.title_text,
                fontSize:20
            },
            
            responsive: true,
            }}
        />   
    </div>
  );
}

export default withFirebase(BarChart);
