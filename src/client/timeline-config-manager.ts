import { TimelineConfig, EventsBand, MinimapBand } from "timeline"
import { OrderedEvents } from "timeline"
import { VisibleComponents } from 'halicarnassus'

const CIVSLOG_SERVER = '/api'

export default class TimelineConfigManager {
	private readonly battlesZoomLevel = 8
	private readonly warsZoomLevel = 4
	battlesBand: EventsBand
	warsBand: EventsBand
	minimapBand2: MinimapBand
	rootElement: HTMLElement

	getDefaultConfig(): TimelineConfig {
		return {
			center: Date.UTC(1471, 0),
			controlBand: this.battlesBand,
			bands: [
				this.warsBand,
				this.battlesBand,
				this.minimapBand2
			],
			rootElement: this.rootElement,
		}
	}

	async init(rootElement: HTMLElement): Promise<TimelineConfig> {
		this.rootElement = rootElement
		const viewportWidth = this.rootElement.getBoundingClientRect().width
		const response = await fetch(`${CIVSLOG_SERVER}/events/by-tag/battle?viewportWidth=${viewportWidth}&zoomLevel=${this.battlesZoomLevel}`)
		const orderedBattles: OrderedEvents = await response.json()

		const warsResponse = await fetch(`${CIVSLOG_SERVER}/events/by-tag/war?viewportWidth=${viewportWidth}&zoomLevel=${this.warsZoomLevel}`)
		const orderedWars: OrderedEvents = await warsResponse.json()

		this.warsBand = new EventsBand({
			heightRatio: .25,
			label: 'wars',
			orderedEvents: orderedWars,
			zoomLevel: this.warsZoomLevel,
		})

		this.battlesBand = new EventsBand({
			heightRatio: .65,
			label: 'battles',
			orderedEvents: orderedBattles,
			topOffsetRatio: .25,
			zoomLevel: this.battlesZoomLevel,
		})

		this.minimapBand2 = new MinimapBand({	
			targets: [0],
			heightRatio: .1,
			topOffsetRatio: .9,
		})

		return this.getDefaultConfig()
	}

	public updateConfig(visibleComponents: VisibleComponents) {
		if (visibleComponents === VisibleComponents.Map) {
			this.warsBand.updateConfig({
				heightRatio: 0
			})

			this.battlesBand.updateConfig({
				heightRatio: 0
			})

			this.minimapBand2.updateConfig({
				topOffsetRatio: 0,
				heightRatio: 1,
			})
		} else {
			this.warsBand.updateConfig({
				heightRatio: .25,
			})

			this.battlesBand.updateConfig({
				heightRatio: .65,
			})

			this.minimapBand2.updateConfig({
				topOffsetRatio: .9,
				heightRatio: .1,
			})
		}
	}
}