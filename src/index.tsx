import {
	FC,
	useMemo,
	Fragment,
	useEffect,
	useContext,
	createElement,
	createContext,
} from "react"

const setMetaTag =
	(type: string, text: Parameters<Element["setAttribute"]>[1]) => {
		const element =
			document.querySelector<HTMLElement>(`meta[name="${type}"]`)
		if (element) {
			element.setAttribute("content", text)
		}
	}

interface AppTitle {
	appTitle: string,
}

interface PageTitle {
	pageTitle: string,
}

interface MetadataOptions
	extends AppTitle, PageTitle {}

export type ParseTitleFunction =
	(parseOptions: MetadataOptions) => string

interface ParseTitleOptions {
	parseTitle: ParseTitleFunction,
}

interface SetMetadataOptions
	extends ParseTitleOptions {
	metadata: MetadataOptions,
}

export interface Context
	extends ParseTitleOptions, AppTitle {}

const defaultParseTitleFunction: ParseTitleFunction =
	({ appTitle, pageTitle }) =>
		`${pageTitle} - ${appTitle}`

const setMetadata =
	({ parseTitle, metadata }: SetMetadataOptions) => {
		const title = parseTitle(metadata)
		document.title = title
		setMetaTag("keywords", title)
		setMetaTag("og:title", title)
		setMetaTag("description", title)
		setMetaTag("og:description", title)
	}

const MetadataContext =
	createContext<Context>({ appTitle: "", parseTitle: defaultParseTitleFunction })

export const MetadataProvider: FC<MetadataProviderPropTypes> =
	({ children, appTitle, parseTitle = defaultParseTitleFunction }) => {
		const value = useMemo<Context>(() => ({ appTitle, parseTitle }), [])
		return (
			<MetadataContext.Provider value={value}>
				{children}
			</MetadataContext.Provider>
		)
	}

export interface MetadataProviderPropTypes
	extends AppTitle {
	parseTitle?: ParseTitleFunction,
}

export const Metadata: FC<MetadataPropTypes> =
	({ title, children }) => {
		const { appTitle, parseTitle } =
			useContext(MetadataContext)

		useEffect(() => {
			setMetadata({
				parseTitle,
				metadata: {
					appTitle,
					pageTitle: title,
				},
			})
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