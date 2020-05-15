import React from 'react';
import {Bar} from 'react-chartjs-2';
import {withFirebase} from './Firebase'
import { Button, Spinner } from 'react-bootstrap';
import { render } from '@testing-library/react';
class BarChartBase extends React.Component {
  constructor(props){
    super(props)
  }
  click = () =>{
    this.props.context.set_loading()
  }
  // console.log(props.data)
  render(){
    const data = {
      labels: this.props.data[0],
      datasets: [
        {
          label: this.props.label || "Count",
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 1,
          data: this.props.data[1]
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
                  text:this.props.title_text,
                  fontSize:20
              },
              
              responsive: true,
              }}
          />
      </div>
    );
  }
}
const BarChart = withFirebase(BarChartBase);
export default BarChart
