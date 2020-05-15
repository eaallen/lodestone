import React from 'react';
import {Line} from 'react-chartjs-2';
import {withFirebase} from './Firebase'
function LineChart(props) {
  console.log(props.context.a_time_line)
  let date = []
  let rater = []
  let count = []
  let a_score = []
  let a_date = []
  let b_score = []
  let c_score = []
  let d_score = []
  let e_score = []
  for(let set of props.context.a_time_line){
      
      switch(set.rater){
        case "A":
            date.push(set.date)
            a_score.push(set.count)
            a_date.push(set.date)
            break
        case "B":
            b_score.push(set.count)
            break
        case "C":
            c_score.push(set.count)
            break
        case "D":
            d_score.push(set.count)
            break
        case "E":
            e_score.push(set.count)
            break
        default:
            console.error('error')
    }
  }
  let re = count
  const data = {
    labels: date,
    datasets: [
        {
            label: "Rater A",
            backgroundColor: 'rgba(96, 252, 252,0.5)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: a_score,
          },
          {
            label: "Rater B",
            backgroundColor: 'rgba(84, 214, 214,0.5)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: b_score,
          },
          {
            label: "Rater C",
            backgroundColor: 'rgba(70, 179, 179,0.5)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: c_score,
          },
          {
            label: "Rater D",
            backgroundColor: 'rgba(55, 145, 145,0.5)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: d_score,
          },
          {
            label: "Rater E",
            backgroundColor: 'rgba(37, 107, 107,0.5)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: e_score,
          },
    
    ]
  }
  return (
    <div className="App" > 
        <Line
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

export default withFirebase(LineChart);
