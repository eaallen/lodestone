import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {withFirebase} from './comps/Firebase'
import BarChart from './comps/BarChart';
import {Row,Col, Container, Spinner} from 'react-bootstrap'
import LineChart from './comps/LineChart';
import ShowNewData from './comps/ShowNewData';
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
  // for precision
  const calc_perc = (dataSet_true,dataSet_all,key_for_lable)=>{
    let a_all = [dataSet_true, dataSet_all]
    let a_data = []
    let a_labels = []
    console.log(a_all)
    for(let icount = 0; icount < a_all[0].length; icount++){
      a_data.push(((a_all[0][icount].count)/(a_all[1][icount].count)).toFixed(3)) //calculate the Precision
      
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
        <Container >
          <h1>
            Overall Agreement Rate <br/>
            {Math.round(((props.context.over_all_agreement * 100) + Number.EPSILON) * 100)/100}%
          </h1>
          <ShowNewData/>
          <p className="text-left p-padding">
            Any agreement rate that is below 90% is not acceptable for this project. Analysis of key processes has 
            been done in order to find out what is wrong and what must change. The following documentation will show the
            problem areas and give solutions. 
          </p>

          <div>
            <h1>
              Raters Answered Correctly
            </h1>
            
              
            <Row>
              <Col>
                <BarChart data={simple_2d_bar(props.context.a_rater_most_correct_3)} title_text="When Faced With 3 Options" label="Correct Answers"/>
              </Col>

              <Col>
                <BarChart data={simple_2d_bar(props.context.a_rater_most_correct_5)} title_text="When Faced With 5 Options" label="Correct Answers"/>
              </Col>
            </Row>
            <ShowNewData/>
            <br></br>
            <p className="text-left p-padding">
              Agreement rates are low across the board. However, it does appear that some raters
              have more natural talent then the others.<br></br>
              Since it is clear that some raters excel at tasks 
              with more options and some do better with less options I suggest separating tasks so that each rater can
              play to their strength. 
              
            </p>
          </div>
          <div>
            <div>
              <h1>
                Raters and Tasks Completed
              </h1>
              <BarChart data={simple_2d_bar(props.context.a_most_task_complete)} title_text="Amount of Tasks per Rater During October" label="Completed Tasks"/>
              <div>
                <ShowNewData/>
              </div> 
            </div>
          </div>
          <div>
            <LineChart/>
          </div>
          <ShowNewData/>
          <p className="text-left p-padding">
            The speed at which raters are to complete their rating is also crucial.
            <br/>
            I recommend interviewing raters that preform the best to get a better understanding of why he/she is doing such a great job. 
            Use the information from the interview as the basis of the next training session   
          </p>
          <div>
            <h1>
              Precision
            </h1>
            <Row>
              <Col>
                <BarChart data={calc_perc(props.context.a_perc_5_true,props.context.a_perc_5_all,"correct_answer_5")} title_text="Precision with 5 labels" label="score out of 1"/>
              </Col>
              <Col>
                <BarChart data={calc_perc(props.context.a_perc_3_true,props.context.a_perc_3_all,"correct_answer_3")} title_text="Precision with 3 labels" label="score out of 1"/>
              </Col>
            </Row>
            <ShowNewData/>
            <p className="text-left p-padding">
              I analyzed the precision for each of the rating labels. Taking the amount of declared positives for each rating label and dividing 
              it by the total amount of declarations for that label, I was able to assess that the we had a low score (less the 35%).  
              The results show that raters are randomly selecting rating labels.  I suggest training the raters on how to 
              appropriately select a rating label. 
            </p>
          </div>
          <div>
            <h1>Considerations</h1>
            <Row>
              <Col className="text-left">
              <h5>What can I do to improve agreement rates overtime?</h5>
                <p className="text-left p-padding">
                  Since the process of labeling is done by humans the best way to increase the agreement rates overtime is by providing annual 
                  training and work shops so that the raters can either learn new skills or get better at the ones they already have.  
                </p>
                <h5>How do I improve precision of a label over time?</h5>
                <p className="text-left p-padding">
                  There a multiple ways to improve precision. The first and quickest way is to make sure that the right algorithms are in place,
                  the correct levels are chosen, and the data is cleaned. Then, a long term solution is to continue to add new data to the
                  model and to continue its training. The more data your model has the more accurate it can be.
                </p>
                <h5>What changes are needed or required to improve my dataset to achieve over 90% agreement, precision, or recall?</h5>
                <p className="text-left p-padding">
                  It appears that most if not all the rating answers were labeled at random. Stopping this 
                  behavior is the first way to achieve 90% agreement and precision while reducing recall. Giving raters 
                  feed back as too when they make a good choice will also be helpful.  
                </p>
                <h5>Why do some raters perform better than others?</h5>
                <p className="text-left p-padding">
                  Some people are just lucky. Other people have a natural gift for what they 
                  are doing. In this case, the best way to find out why some rater preform better than others is to hold interviews. 
                </p>

              </Col>
              <Col className="text-left">
                <h5>How Raters do from month to month?</h5>
                <p className="text-left p-padding">
                  There may be other factors of rater performance that are not visible in the month of October. 
                  Therefore, expanding the range of data over multiple months and even years could show important information. 
                </p>
                <h5>Are Raters more effective at home?</h5>
                <p className="text-left p-padding">
                  With the current working environment turned upside down because of the global pandemic it is important to 
                  know if raters can do better working at home. If this is the case then the company can save money. 
                </p>
                <h5>How are raters doing emotionally?</h5>
                <p className="text-left p-padding">
                  Healthy employees are effective employees. The emotional health of raters is very important because they must make 
                  good judgments quickly. A healthy mind leads to quicker and better decisions. 
                </p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default withFirebase(App);
