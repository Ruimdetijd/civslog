import { TimelineConfig, EventsBand, MinimapBand } from "timeline"
// import { OrderedTimeline } from "timeline"

// interface OrderedEvent {
// 	event: RawEv3nt
// 	children: OrderedTimeline
// }

const CIVSLOG_SERVER = '/api'

export abstract class ConfigManager {
	abstract getDefaultConfig(): TimelineConfig
	abstract init(rootElement: HTMLElement): Promise<TimelineConfig>
}

export default class EventTimelineConfigManager extends ConfigManager {
	private readonly zoomLevel = 0
	eventsBand: EventsBand
	minimapBand: MinimapBand
	rootElement: HTMLElement

	getDefaultConfig(): TimelineConfig {
		return {
			// center: Date.UTC(1600, 0),
			controlBand: this.eventsBand,
			bands: [
				this.eventsBand,
				this.minimapBand
			],
			rootElement: this.rootElement,
		}
	}

	async init(rootElement: HTMLElement): Promise<TimelineConfig> {
		this.rootElement = rootElement
		const viewportWidth = this.rootElement.getBoundingClientRect().width
		const url = `${CIVSLOG_SERVER}/ordered-event/${location.pathname.slice(1)}?viewportWidth=${viewportWidth}&zoomLevel=${this.zoomLevel}`
		const response = await fetch(url)
		// FIXME any
		const orderedEvent: any = await response.json()

		this.eventsBand = new EventsBand({
			heightRatio: .75,
			events: orderedEvent.children,
			zoomLevel: this.zoomLevel,
		})

		this.minimapBand = new MinimapBand({	
			heightRatio: .25,
			topOffsetRatio: .75,
		})

		return { ...this.getDefaultConfig(), parent: orderedEvent.parent }
	}
}
