import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react' 
import axios from 'axios'
export const AppContext = React.createContext()

    const config = {
      apiKey: "AIzaSyAnjHEXFnx3xvl2g6pe5NQBpg_S5cfspsQ",
      authDomain: "elijahallenlode.firebaseapp.com",
      databaseURL: "https://elijahallenlode.firebaseio.com",
      projectId: "elijahallenlode",
      storageBucket: "elijahallenlode.appspot.com",
      messagingSenderId: "801751025632",
      appId: "1:801751025632:web:6795ff4665773fecd28d85",
      measurementId: "G-TF67PQL8TY"
    };
   
    class Firebase extends React.Component {
        constructor(props) {
          super(props)
          this.actions={
            updateUserAuth: this.updateUserAuth,
            doCreateUserWithEmailAndPassword:this.doCreateUserWithEmailAndPassword,
            doSignInWithEmailAndPassword:this.doSignInWithEmailAndPassword,
            doSignInWithGoogle:this.doSignInWithGoogle,
            doSignInWithRedirect:this.doSignInWithRedirect,
            doGetRedirectResult:this.doGetRedirectResult,
            doSignOut:this.doSignOut,
            doPasswordReset:this.doPasswordReset,
            doPasswordUpdate:this.doPasswordUpdate,
            doAddRecord:this.doAddRecord,
            doGetQueryRecord:this.doGetQueryRecord,
            getOneRecord:this.getOneRecord,
            componentDidMount: this.componentDidMount,
            set_loading: this.set_loading,
          }
          this.state = {
            test:'this is comming from the firbase context provider',
            loading: null,
            // user: null
          }
          console.log('here')
          app.initializeApp(config);

          this.auth = app.auth();
          this.db = app.firestore()
          this.googleProvider =new app.auth.GoogleAuthProvider();
          this.auth.onAuthStateChanged(function(user) {
            if (user){
              console.log('we have a user!')
            }else{
              console.log('no user... :(')
            }    
          });
        }

        set_loading = async () =>{
          await this.setState({loading:true})
          this.componentDidMount()
        }
        updateUserAuth = (userInfo) =>{
          // this.state.auth_user = userInfo
          // // this.state.auth_user = userInfo          
          // // this.setState({auth_user: userInfo})
        }
        doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

        doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
        
        doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
        
        //////////////////GOOGLE OAUTH2 REDIRECT/////////////////////
        doSignInWithRedirect = () => this.auth.signInWithRedirect(this.googleProvider);
        doGetRedirectResult = () => this.auth.getRedirectResult();

        doSignOut = () => this.auth.signOut();
        doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
        doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
        doAddRecord = (_collection) => this.db.collection(_collection).doc();
        doGetQueryRecord = (_collection, item_looking_for,filtering_item) => this.db.collection(_collection).where(item_looking_for, '==',filtering_item).get();
        getOneRecord = (_collection, item_wanted) => this.db.collection(_collection).doc(item_wanted)
      
      componentDidMount = async()=>{
        const dataset = ["first","second","third","fourth"]
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OmVhYWxsZW4iLCJpc3MiOiJhZ2VudDplYWFsbGVuOjo0YzBlYWQ5YS1kODE5LTQzMWMtYjVmOS0zNGEwZDE5MzRkOGQiLCJpYXQiOjE1Nzc3MTc5OTcsInJvbGUiOlsidXNlcl9hcGlfcmVhZCIsInVzZXJfYXBpX3dyaXRlIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZSwic2FtbCI6e319.XbV9G84LNvqN6RREjPKFlDLQrTtzUu5KVu46xDS7TOtGnMZ94h1PrNaAkQ6zT-79QOM7Ku2GrZdivguQ_o9jsw';
        axios.defaults.url = "https://api.data.world/v0/sql/eaallen/"+dataset[Math.floor((Math.random() * 4))]
        axios.defaults.method= 'post' 
        let rater_most_correct_3 = await axios({data:{query: "select rater ,COUNT(rater_correct_3) from out WHERE rater_correct_3 = true group by rater ORDER BY rater"}})
        let rater_most_correct_5 = await axios({data:{query: "SELECT rater ,COUNT(rater_correct_5) FROM out WHERE rater_correct_5 = true GROUP BY rater ORDER BY rater"}})
        let most_task_complete = await axios({data:{query: "SELECT rater ,COUNT(task_id) FROM out GROUP BY rater ORDER BY rater"}})
        let perc_5_true = await axios({data:{query: "SELECT out.correct_answer_5 ,COUNT(out.rater_correct_5) FROM out WHERE out.rater_correct_5 = true GROUP BY out.correct_answer_5 ORDER BY out.correct_answer_5"}})
        let perc_5_all = await axios({data:{query: "SELECT out.correct_answer_5 ,COUNT(out.rater_correct_5) FROM out GROUP BY out.correct_answer_5 ORDER BY out.correct_answer_5"}})
        let perc_3_true = await axios({data:{query: "SELECT out.correct_answer_3 ,COUNT(out.rater_correct_3) FROM out WHERE out.rater_correct_3 = true GROUP BY out.correct_answer_3 ORDER BY out.correct_answer_3"}})
        let perc_3_all = await axios({data:{query: "SELECT out.correct_answer_3 ,COUNT(out.rater_correct_3) FROM out GROUP BY out.correct_answer_3 ORDER BY out.correct_answer_3"}})
        let over_all_agreement_query = await axios({data:{query: "SELECT DISTINCT((SELECT COUNT(o.rater_correct_3) FROM out o WHERE o.rater_correct_3 = TRUE)+(SELECT COUNT(o.rater_correct_5) FROM out o WHERE o.rater_correct_3 = TRUE))/((SELECT COUNT(o.rater_correct_5)FROM out o)+(SELECT COUNT(o.rater_correct_3) FROM out o)) AS total_agreement FROM out"}})
        let time_line = await axios({data:{query:"SELECT out.date,out.rater,COUNT(out.rater_correct_3) + COUNT(out.rater_correct_5) as count FROM out where out.rater_correct_3 = true or out.correct_answer_5=true GROUP BY out.date, out.rater ORDER BY out.date"}})
        this.setState({...this.state,
          a_rater_most_correct_3:rater_most_correct_3.data,
          a_rater_most_correct_5:rater_most_correct_5.data,
          a_most_task_complete:most_task_complete.data,
          a_perc_5_true: perc_5_true.data,
          a_perc_5_all: perc_5_all.data,
          a_perc_3_true: perc_3_true.data,
          a_perc_3_all: perc_3_all.data,
          over_all_agreement: over_all_agreement_query.data[0].total_agreement,
          a_time_line: time_line.data,
          loading: false,
        })
        // console.log('response from data.world',perc_3_all.data)
      }
        render(){
          console.log('CONTEXT STATE', this.state)
          if(!this.state.a_time_line){
            return(
              <div>
                loading
              </div>

            )
          }
          return(
            <AppContext.Provider value={{...this.state, ...this.actions }}>
              {this.props.children}
            </AppContext.Provider>
          )
        }
        
    }
export default Firebase;
