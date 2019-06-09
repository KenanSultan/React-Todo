import React, {Component} from 'react';

class App extends Component {
  constructor() {
    super()
    this.addItem = this.addItem.bind(this)
    this.showActive = this.showActive.bind(this)
    this.showDone = this.showDone.bind(this)
    this.showAll = this.showAll.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.changeStatus = this.changeStatus.bind(this)

    this.state = {
      active: ['1','2','3'],
      done: [],
      content: <tr>
                <td key='1'></td>
                <td key='2'></td>
                <td key='3'></td>
                <td key='4'></td>
              </tr>
    }
  }

  addItem() {
    let item = document.getElementById('in')
    let newActive = this.state.active
    newActive.push(item.value)
    this.setState({
      active: newActive,
    })
    item.value = ''
    this.showActive()
  }

  showActive(){
    this.setState({
      content: this.state.active.map((val,i) => {
        return (<tr key={i}>
          <td key='1'>{val}</td>
          <td key='2'>Active</td>
          <td key='3'><button data-name={val} className='btn btn-info' onClick={this.changeStatus}>+</button></td>
          <td key='4'><button data-name={val} data-status='active' className='btn btn-danger' onClick={this.removeItem}>x</button></td>
        </tr>)
      })
    })
  }

  showDone(){
    this.setState({
      content: this.state.done.map((val,i) => {
        return (<tr key={i}>
          <td key='1'>{val}</td>
          <td key='2'>Done</td>
          <td key='3'>+</td>
          <td key='4'><button data-name={val} data-status='done' className='btn btn-danger' onClick={this.removeItem}>x</button></td>
        </tr>)
      })
    })
  }

  showAll(){
    let content1 = this.state.active.map((val,i) => {
        return (<tr key={i}>
          <td key='1'>{val}</td>
          <td key='2'>Active</td>
          <td key='3'><button data-name={val} className='btn btn-info' onClick={this.changeStatus}>+</button></td>
          <td key='4'><button data-name={val} data-status='active' className='btn btn-danger' onClick={this.removeItem}>x</button></td>
        </tr>)
    })
    let content2 = this.state.done.map((val,i) => {
      return (<tr key={content1.length+i}>
        <td key='1'>{val}</td>
        <td key='2'>Done</td>
        <td key='3'>+</td>
        <td key='4'><button data-name={val} data-status='done' className='btn btn-danger' onClick={this.removeItem}>x</button></td>
      </tr>)
    })


    this.setState({
      content: content1.concat(content2)
    })
  }

  removeItem(e){
    let itemName = e.target.getAttribute('data-name')
    let status = e.target.getAttribute('data-status')

    if (status==='active'){
 
      let exActive = this.state.active
      let newActive = []
      for (let i in exActive){
        if (exActive[i] !== itemName){
          newActive.push(exActive[i])
        }
      }
      this.setState({
        active: newActive,
      })

      this.showActive()
    }
    else{
      let exDone = this.state.done
      let newDone = []
      for (let i in exDone){
        if (exDone[i] !== itemName){
          newDone.push(exDone[i])
        }
      }
      this.setState({
        done: newDone
      })
      this.showDone()
    }
  }

  changeStatus(e){
    let itemName = e.target.getAttribute('data-name')
    let exActive = this.state.active
    let newActive = []
    for (let i in exActive){
      if (exActive[i] !== itemName){
        newActive.push(exActive[i])
      }
    }
    this.setState({
      active: newActive
    })
    let newDone = this.state.done
    newDone.push(itemName)
    this.setState({
      done: newDone
    })
    this.showActive()
  }

  render() {
    return <div className='container text-center'>
            <h2 className=''>Todo App</h2>
            <div className="input-group mb-3">
              <input id='in' type="text" className="form-control"/>
              <div className="input-group-append">
                <button className="btn btn-outline-info" type="button" onClick={this.addItem}>add</button>
              </div>
            </div>
            <br></br>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-info" onClick={this.showAll}>All</button>
              <button type="button" className="btn btn-danger" onClick={this.showActive}>Active</button>
              <button type="button" className="btn btn-success" onClick={this.showDone}>Done</button>
            </div>
            <br></br>
            <br></br>
            <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Done</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {this.state.content}
              </tbody>
            </table>
            </div>
          </div>
    
  };
}

export default App;
