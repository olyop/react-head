import { SetOptions } from "./types"

const setMetaTag =
	(type: string, value: string) => {
		const element = document.querySelector<HTMLElement>(`meta[name="${type}"]`)
		if (element) {
			element.setAttribute("content", value)
		}
	}

const setHead =
	({ pageTitle, configuration: { title, description, parseTitle } }: SetOptions) => {
		const titleParsed = parseTitle({ title, pageTitle })
		document.title = title
		setMetaTag("keywords", titleParsed)
		setMetaTag("og:title", titleParsed)
		setMetaTag("description", description)
		setMetaTag("og:description", description)
	}

export default setHead