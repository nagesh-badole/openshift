import React from 'react'
import './GlobalErrorHandler.scss'

class GlobalErrorHandler extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError (error) {
    return {
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log({error, errorInfo})
  }

  render() {
    if(this.state.hasError) {
      return (
        <div className="page-not-found-container">
        <div className='pnf-details'>
        {/* <img src={pageNotFoundLogo} height='250' width='260' alt="Unknown error"/> */}
            <div className="pnf-error-warning">
                <span>Oops!</span>
            </div>
           
            <div className="pnf-error-pnf">
            <span>Unknown Error</span>
            </div>
            <div className="pnf-error-message-details">
                <span>An error occured while accessing the requested page. Please try reloading the app.</span>
            </div>
            {/* <Button onClick={onGoToHomeClick}>GO TO HOMEPAGE</Button> */}
        </div>
    </div>
      )
    } else {
      return this.props.children;
    }
  }
}

export default GlobalErrorHandler
