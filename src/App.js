// import React from 'react';
import React, {Component} from 'react';

// import logo from './logo.svg';
import './App.css';

// function App() {

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originList:[
                {
                    // index:0,
                    text: 'first',
                    checked: true
                },
                {
                    // index:1,
                    text: 'second',
                    checked: false
                },
                {
                    // index:2,
                    text: 'third',
                    checked: true
                }
            ],
            list: [],
            // buttonisOpen:none,
            reactId: 0,
            inputValue: ''
        }
    }

    componentDidMount() {
        this.setState({
            list: this.state.originList
        });
    }

    handleBtClick() {
        const text = this.state.inputValue;
        if (text === '' || text.trim() === '')
            return;
        const item = {text: text, checked: false};
        this.setState({
            originList: [...this.state.originList, item],
            list: [...this.state.list,item],
            inputValue: ''
        })
    }

    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleItemClick(index) {
        const list = [...this.state.list];
        // list.splice(index, 1);
        this.setState({
            list: list
        })

    }

    handleChange(event) {
        const target = event.target;
        const value = target.checked;
        const key = target.name;
        const list = this.state.list;
        list[key].checked = value;
        this.setState({
            list: list
        })
    }



    deleteDom(index) {
        const list = this.state.list;
        const delItem = list[index];
        const newOriginList = this.state.originList.filter(item => {
            if (item.text != delItem.text)
                return item;
        });

        list.splice(index, 1);

        this.setState({
            list: list,
            originList: newOriginList
        })

    }


    handleAll(){
        this.setState({
            list: this.state.originList
        })
    }

    handleFinish() {
        const list = this.state.originList.filter(item => {
            if (item.checked) {
                return item;
            }
        })
        this.setState({
            list: list
        })
    }

    handlePending() {
        const list = this.state.originList.filter(item => {
            if (!item.checked) {
                return item;
            }
        })
        this.setState({
            list: list
        })
    }

    render() {
        return (
            <div className="App">


                {/*<header className="App-header">*/}
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                {/*<p>*/}
                {/*Edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}
                {/*<a*/}
                {/*className="App-link"*/}
                {/*href="https://reactjs.org"*/}
                {/*target="_blank"*/}
                {/*rel="noopener noreferrer"*/}
                {/*>*/}
                {/*Learn React*/}
                {/*</a>*/}
                {/*</header>*/}

                <input value={this.state.inputValue} onChange={this.handleInputChange.bind(this)}/>
                <button onClick={this.handleBtClick.bind(this)}>增加</button>

                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (

                                <li className={`node ${item.checked?'activeItem':''}`} key={index} onClick={this.handleItemClick.bind(this)}>

                                    <input name={index} type="checkbox" checked={item.checked}
                                           onChange={this.handleChange.bind(this)}/>
                                    {item.text}
                                    <button className="btn-show" onClick={this.deleteDom.bind(this,index)}>X</button>

                                    </li>
                            )
                        })
                    }
                </ul>
                <div className="button-group">
                    <a type="button" onClick={this.handleAll.bind(this)} >全部</a>
                    <a type="button" onClick={this.handleFinish.bind(this)}>已完成</a>
                    <a type="button" onClick={this.handlePending.bind(this)}>未完成</a>
                </div>


            </div>
        );
    }
}

export default App;
