import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router'

import TopNav from './TopNav'
import Button from './ui/Button'

import styles from '../styles/components/_topbar.scss'

console.log(styles);

@inject("store") @observer
export default class TopBar extends Component {

	constructor(props) {
		super(props);
		this.store = this.props.store
	}

	authenticate(e) {
		if (e) e.preventDefault();
		console.log('CLICKED BUTTON')
		this.store.authenticate()
	}

	render() {
		const { authenticated } = this.store
		return (
			<div className={styles.topbar}>
				<TopNav />
				<Button onClick={this.authenticate.bind(this)} title={authenticated ? 'Log out' : 'Sign in'}/>
			</div>
		)
	}

}
