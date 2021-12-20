import {
	FC,
	Fragment,
	useEffect,
	useContext,
	createElement,
	createContext,
} from "react"

const setMetaTag =
	(type: string, text: string) =>
		document
			.querySelector<HTMLElement>(`meta[name="${type}"]`)!
			.setAttribute("content", text)

const setMetadata =
	(appTitle: string, title: string) => {
		const text = `${title} - ${appTitle}`
		document.title = text
		setMetaTag("keywords", text)
		setMetaTag("og:title", text)
		setMetaTag("description", text)
		setMetaTag("og:description", text)
	}

interface Context {
	appTitle: string,
}

const MetadataContext =
	createContext<Context>({ appTitle: "" })

export const MetadataProvider =
	MetadataContext.Provider

export const Metadata: FC<MetadataPropTypes> = ({ title, children }) => {
	const { appTitle } = useContext(MetadataContext)

	useEffect(() => {
		if (title) {
			setMetadata(appTitle, title)
		}
	}, [title])
	return (
		<Fragment>
			{children}
		</Fragment>
	)
}

export interface MetadataPropTypes {
	title: string,
}