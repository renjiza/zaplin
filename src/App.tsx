import React from 'react'


import Nav from './components/navigation'
import Content from './components/content'

class App extends React.Component<any, any> {
	render() {
		return (
			<div className="background">
				<Nav />
				<Content />
			</div>
		)
	}
}

export default App
