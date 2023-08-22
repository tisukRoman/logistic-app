import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

class ErrorBoundaryComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Redirect to='/' />;
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withRouter(ErrorBoundaryComp);
