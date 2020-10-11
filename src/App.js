import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectNumber: 0,
      currentNumber: 0,
      actionEquation: '',
      showOnlyOne: false,
      resetWhenNumber: false
    };
    this.appendNumber = this.appendNumber.bind(this);
    this.actionEquation = this.actionEquation.bind(this);
    this.equal = this.equal.bind(this);
    this.clear = this.clear.bind(this);
    this.percent = this.percent.bind(this);
    this.minus = this.minus.bind(this);
  }

  appendNumber(event) {
    let collect = this.state.collectNumber;
    let current = this.state.currentNumber;
    let action = this.state.actionEquation;
    let inputNumber = event.target.textContent;
    console.log(current);
    if(this.state.resetWhenNumber) {
      collect = 0;
      current = 0;
    }
    if(this.state.showOnlyOne) {
      current = 0;
    }
    if(current.toString().includes('.') && inputNumber === '.') {

    } else if(current == 0 && inputNumber == '.' || current === '0.') {
      current = current + inputNumber;
    } else if(current == 0) {
      current = parseFloat(current) + parseFloat(inputNumber);
    } else {
      current += inputNumber;
    }
    console.log(current);
    console.log(typeof(current));
    this.setState({ 
      collectNumber: collect,
      currentNumber: current, 
      showOnlyOne: false,
      resetWhenNumber: false
    });
    
  }

  actionEquation(event) {
    let collect = parseFloat(this.state.collectNumber);
    let current = parseFloat(this.state.currentNumber);
    let inputAction = event.target.textContent;
    let action = this.state.actionEquation;
    console.log(collect);
    console.log(current);

    if(collect == 0) {
      collect = current;
    }
    if(action != '' && !this.state.showOnlyOne) {
      switch(action) {
        case '+':
          collect += current;
        break;
        case '-':
          collect -= current;
        break;
        case 'x':
          collect *= current;
        break;
        case '÷':
          collect /= current;
        break;
        default:
          ;
      }
    }
    action = inputAction;
    this.setState({ 
      collectNumber: collect,
      currentNumber: collect == 0 ? current : collect,
      actionEquation: action,
      showOnlyOne: true,
      resetWhenNumber: false
    });
  }

  equal() {
    let collect = parseFloat(this.state.collectNumber);
    let current = parseFloat(this.state.currentNumber);
    let action = this.state.actionEquation;
    if(action != '') {
      switch(action) {
        case '+':
          collect += current;
        break;
        case '-':
          collect -= current;
        break;
        case 'x':
          collect *= current;
        break;
        case '÷':
          collect /= current;
        break;
        default:
          ;
      }
      console.log(collect);
      this.setState({ 
        collectNumber: collect,
        currentNumber: collect,
        actionEquation: '',
        showOnlyOne: false,
        resetWhenNumber: true,
      });
    }
  }

  clear() {
    let current = this.state.currentNumber;

    if(current == 0) {
      this.setState({ 
        collectNumber: 0,
        actionEquation: ''
      })
    } else {
      this.setState({ currentNumber: 0 })
    }
  }

  percent() {
    let current = parseFloat(this.state.currentNumber);

    current = current / 100;
    
    this.setState({
      currentNumber: current
    });
  }

  minus() {
    let current = this.state.currentNumber;
    console.log(typeof(current));
    if(!current.toString().includes('-')) {
      current = '-' + current;
    } else {
      current = current.toString().slice(1);
    }
    
    this.setState({
      currentNumber: current
    });
  }

  render() {
    return (
      <div className="wrapper">
        <section className="display-screen">
          <div className="current">{ this.state.currentNumber }</div>
        </section>
        <section className="btn-wrap">
          <div className="btn-row">
            <button className="btn-action" onClick={this.clear}>{ this.state.collectNumber > 0 || this.state.currentNumber > 0 ? 'C' : 'AC' }</button>
            <button className="btn-action" onClick={this.minus}>+/-</button>
            <button className="btn-action" onClick={this.percent}>%</button>
            <button className={ this.state.actionEquation == '÷' ? "btn-action divide action" : "btn-action divide"} onClick={this.actionEquation}>÷</button>
          </div>
          <div className="btn-row">
            <button className="btn-action" onClick={this.appendNumber}>7</button>
            <button className="btn-action" onClick={this.appendNumber}>8</button>
            <button className="btn-action" onClick={this.appendNumber}>9</button>
            <button className={ this.state.actionEquation == 'x' ? "btn-action multiply action" : "btn-action multiply"} onClick={this.actionEquation}>x</button>
            
          </div>
          <div className="btn-row">
            <button className="btn-action" onClick={this.appendNumber}>4</button>
            <button className="btn-action" onClick={this.appendNumber}>5</button>
            <button className="btn-action" onClick={this.appendNumber}>6</button>
            <button className={ this.state.actionEquation == '-' ? "btn-action subtract action" : "btn-action subtract"} onClick={this.actionEquation}>-</button>
          </div>
          <div className="btn-row">
            <button className="btn-action" onClick={this.appendNumber}>1</button>
            <button className="btn-action" onClick={this.appendNumber}>2</button>
            <button className="btn-action" onClick={this.appendNumber}>3</button>
            <button className={ this.state.actionEquation == '+' ? "btn-action plus action" : "btn-action plus"} onClick={this.actionEquation}>+</button>
          </div>
          <div className="btn-row">
            <button className="btn-action big" onClick={this.appendNumber}>
              <div className="number-0">0</div>
            </button>
            <button className="btn-action" onClick={this.appendNumber}>.</button>
            <button className="btn-action equal" onClick={this.equal}>=</button>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
