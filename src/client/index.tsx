import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Halicarnassus from 'halicarnassus'
import TimelineConfigManager from './timeline-config-manager'

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container')
	const timelineConfig = new TimelineConfigManager()
	const element = <Halicarnassus loadConfig={async (el: HTMLElement) => await timelineConfig.init(el)} />
	ReactDOM.render(element, container)
});
