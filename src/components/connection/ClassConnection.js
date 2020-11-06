import React from 'react';

class ClassConnection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meet : 'undefined'
    }
  }

  componentDidMount() {
    const jsMeet = async () => window.JitsiMeetJS
    jsMeet().then(value => {
      this.setState({meet: "jeah"})
      console.log(value)
    })
    
  }

  render() {
    return (
      <div>Class Connection {this.state.meet}</div>
    )
  }
}

export default ClassConnection