import React from 'react'
import RouterComponent from '../RouterComponent';
import GlobalErrorHandler from './GlobalErrorHandler'
import './App.scss'
import { Provider } from 'react-redux'
import store from '../../store/store'
import '../../index.scss'

export class App extends React.Component {

  componentDidMount() {
    const link = document.createElement("link");
    link.href = process.env.PUBLIC_URL + '/css/openlabs-guide.css';
    link.rel = "stylesheet"
    document.head.appendChild(link);
  }

  render() {
    return (
      <div className='App'>
        <Provider store={store}>
          <GlobalErrorHandler>
            <RouterComponent {...this.props} />
          </GlobalErrorHandler>
        </Provider>
      </div>
    )
  }
}

export default App
