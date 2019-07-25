import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Halicarnassus from 'halicarnassus'
import TimelineConfigManager from './timeline-config-manager'
import EventTimelineConfigManager, { ConfigManager } from './event-config';
import { TimelineConfig } from 'timeline';

async function loadConfig(el: HTMLElement): Promise<TimelineConfig> {
	let config: ConfigManager
	if (location.pathname === '/') {
		config = new TimelineConfigManager()
	} else {
		config = new EventTimelineConfigManager()
	}
	return config.init(el)
}

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('container')
	const element = <Halicarnassus loadConfig={loadConfig} />
	ReactDOM.render(element, container)
});
