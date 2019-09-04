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
                    text: 'first',
                    checked: true
                },
                {
                    text: 'second',
                    checked: false
                },
                {
                    text: 'third',
                    checked: true
                }
            ],
            list: [],
            inputValue: '',
            reactId: 0,

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
            list: this.state.originList,
        })
    }

    handleFinish() {
        const list = this.state.originList.filter(item => {
            if (item.checked) {
                return item;
            }
        })
        this.setState({
            list: list,
        })
    }

    handlePending() {
        const list = this.state.originList.filter(item => {
            if (!item.checked) {
                return item;
            }
        })
        this.setState({
            list: list,
        })
    }

    render() {
        let btnStyle1 = {
            borderWidth:this.state.defaultBorder?'1px':'0px'
        }
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
                <button className="btn-add" onClick={this.handleBtClick.bind(this)}>添加</button>

                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (

                                <li className={`node ${item.checked?'activeItem':''}`} key={index} onClick={this.handleItemClick.bind(this)}>

                                    <input name={index} type="checkbox" checked={item.checked}
                                           onChange={this.handleChange.bind(this)}/>
                                    {item.text}
                                    <a className="btn-del" onClick={this.deleteDom.bind(this,index)}>X</a>

                                    </li>
                            )
                        })
                    }
                </ul>
                <div className="button-group">
                    <a onClick={this.handleAll.bind(this)} >全部</a>
                    <a onClick={this.handleFinish.bind(this)}>已完成</a>
                    <a onClick={this.handlePending.bind(this)}>未完成</a>
                </div>


            </div>
        );
    }
}

export default App;
