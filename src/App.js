import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Bar} from 'react-chartjs-2';
import './App.css';
import {withFirebase} from './comps/Firebase'
import BarChart from './comps/BarChart';
function App(props) {
  const simple_2d_bar = (dataSet)=>{
    let a_data = []
    let a_labels = []  
    for(let item of dataSet){
      console.log(item)
      a_data.push(item.count)
      a_labels.push(item.rater)
    }
    return ([a_labels, a_data])
  }


  return (
    <div className="App">
      <div>
        <h1>Elijah Allen</h1>
        <h3>Coding Challenge</h3>
      </div>
    <div>
      <BarChart data={simple_2d_bar(props.context.a_rater_most_correct_3)}/>
      <BarChart data={simple_2d_bar(props.context.a_rater_most_correct_5)}/>
      <BarChart data={simple_2d_bar(props.context.a_most_task_complete)}/>
    </div>
    </div>
  );
}

export default withFirebase(App);
