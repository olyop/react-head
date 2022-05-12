import { ConfigurationOptions, PageTitleOptions } from "./types"

const setDocumentTitle =
	(value: string) => {
		document.title = value
	}

const setMetaTag =
	(type: string, value: Parameters<HTMLElement["setAttribute"]>[1]) => {
		const element = document.querySelector<HTMLElement>(`meta[name="${type}"]`)
		if (element) {
			element.setAttribute("content", value)
		}
	}

const setHead =
	({ configuration }: ConfigurationOptions) =>
		({ pageTitle }: PageTitleOptions) => {
			const { title, description, parseTitle } = configuration
			const titleParsed = parseTitle({ title, pageTitle })
			setDocumentTitle(titleParsed)
			setMetaTag("keywords", titleParsed)
			setMetaTag("og:title", titleParsed)
			setMetaTag("description", description)
			setMetaTag("og:description", description)
		}

export default setHead