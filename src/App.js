import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {withFirebase} from './comps/Firebase'
import BarChart from './comps/BarChart';
import {Row,Col, Container} from 'react-bootstrap'
function App(props) {
  const simple_2d_bar = (dataSet)=>{
    let a_data = []
    let a_labels = []  
    for(let item of dataSet){
      a_data.push(item.count)
      a_labels.push(item.rater)
    }
    return ([a_labels, a_data])
  }
  const calc_perc = (dataSet_true,dataSet_all,key_for_lable)=>{
    let a_all = [dataSet_true, dataSet_all]
    let a_data = []
    let a_labels = []
    console.log(a_all)
    for(let icount = 0; icount < a_all[0].length; icount++){
      a_data.push(a_all[0][icount].count/a_all[1][icount].count) //calculate the percision
      a_labels.push(a_all[0][icount][key_for_lable])
    }
    return[a_labels,a_data]
  }
 

  return (
    <div className="App">
      <div>
        <h1>Elijah Allen</h1>
        <h3>Coding Challenge</h3>
      </div>
      <div>
        <Container fluid>
          <Row>
            <Col>
              <BarChart data={simple_2d_bar(props.context.a_rater_most_correct_3)}/>
            </Col>
            <Col>
              <div>
                description  
              </div>        
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                description  
              </div>        
            </Col>
            <Col>
              <BarChart data={simple_2d_bar(props.context.a_rater_most_correct_5)}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <BarChart data={simple_2d_bar(props.context.a_most_task_complete)}/>
            </Col>
            <Col>
              <div>
                <br></br>
                <h1>
                  Raters and Tasks Completed
                </h1>
              </div>   
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <br></br>
                <h1>
                  Raters and Tasks Completed
                </h1>
              </div>   
            </Col>
            <Col>
              <BarChart data={calc_perc(props.context.a_perc_5_true,props.context.a_perc_5_all,"correct_answer_5")}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <BarChart data={calc_perc(props.context.a_perc_3_true,props.context.a_perc_3_all,"correct_answer_3")}/>
            </Col>
            <Col>
              <div>
                <br></br>
                <h1>
                  Raters and Tasks Completed
                </h1>
              </div>   
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default withFirebase(App);
