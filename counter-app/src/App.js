import NavBar from './components/navbar';
import Counters from './components/counters';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  state = { 
    counters: [
        { id: 1, value: 4 },
        { id: 2, value: 0 },
        { id: 3, value: 0 },
        { id: 4, value: 0 }
    ]
  };

  handleIncrement = (counter) => {
      const counters = [...this.state.counters];
      const index = counters.indexOf(counter)
      counters[index].value++;
      counters[index] = { ...counter };

      this.setState({ counters });
  };

  handleReset = () => {
      const counters = this.state.counters.map(counter => {
          counter.value = 0
          return counter
      });

      this.setState({ counters });
  };

  handleDelete = (counterId) => {
      const counters = this.state.counters.filter(counter => counter.id !== counterId);
      this.setState({
          counters
      });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar totalCounters={this.state.counters.filter(counter => counter.value > 0).length} />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
