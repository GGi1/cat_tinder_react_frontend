import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Cats from './pages/Cats'
import NewCat from './pages/NewCat'
import Header from './components/Header'
import { getCats, createCat } from './api'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        cats: [],
        newCatSuccess: false,
      }
    }

    componentWillMount() {
           getCats()
           .then(APIcats => {
               this.setState({
                   cats: APIcats
               })
           })
       }
    // createCat(cat){
    //     return fetch(`${this.state.BASE}/cats`, {
    //         body: JSON.stringify(cat),  // <- we need to stringify the json for fetch
    //         headers: {  // <- We specify that we're sending JSON, and expect JSON back
    //             'Content-Type': 'application/json'
    //         },
    //         method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
    //     })
    //         .then((resp) => {
    //             let json = resp.json()
    //             return json
    //         })
    // }


    handleNewCat(newCatInfo) {
      console.log("New Cat TRY", newCatInfo)
      createCat(newCatInfo)
      .then(successCat => {
          console.log("CREATE SUCCESS!", successCat);
          this.setState({
              newCatSuccess: true
          })
      })
  }
// newCatSubmit(cat){
//   fetch(`${this.state.apiUrl}/cats`,
//      {
//        body: JSON.stringify(cat),  // <- we need to stringify the json for fetch
//        headers: {  // <- We specify that we're sending JSON, and expect JSON back
//        'Content-Type': 'application/json'
//      },
//      method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
//    }
//      )
//      .then((rawResponse)=>{
//     // rawResponse.json() itself returns another promise, we we need to resolve it before continuingg
//     return Promise.all([rawResponse.status, rawResponse.json()])
//   })
//   .then((parsedResponse) =>{
//     if(parsedResponse[0] === 422){ // <- Check for any server side errors
//       this.setState({errors: parsedResponse[1]})
// }
// }
// )
// }
    /*
     * componentWillMount fires everytime the component is rendered
     * to the dom
     */
    // componentWillMount(){
    //   fetch(`${this.state.apiUrl}/cats`)
    //   .then((rawResponse) =>{
    //     return rawResponse.json()
    //   })
    //   .then((parsedResponse)=>{
    //     this.setState({cats: parsedResponse})
    //   })
    // }





  render() {

    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/cats" render={(props) => <Cats cats={this.state.cats}/>} />
            {/* <Route exact path="/" render={(props) => <NewCat handleCat={this.handleNewCat.bind(this)}/>} /> */}
            <Route exact path="/" render={(props) => <NewCat onSubmit={this.handleNewCat.bind(this)} errors={this.state.errors} success={this.state.newCatSuccess} />} />
          </Switch>
      </Router>




      </div>
    );
  }
}

export default App;
