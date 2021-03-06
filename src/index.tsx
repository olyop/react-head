import {
	FC,
	useMemo,
	Fragment,
	useEffect,
	useContext,
	createElement,
} from "react"

import {
	PropTypes,
	PageTitle,
	TitleOptions,
	Configuration,
	PageTitleOptions,
	ProviderPropTypes,
	OnPageTitleChange,
	ParseTitleFunction,
	ConfigurationOptions,
	ParseTitleFunctionOptions,
} from "./types"

import setHead from "./set-head"
import ConfigurationContext from "./configuration-context"
import defaultParseTitleFunction from "./default-parse-title-function"

export const HeadProvider: FC<ProviderPropTypes> =
	({ children, configuration }) => {
		const memoizedConfiguration = useMemo<Configuration>(() => configuration, [])
		return (
			<ConfigurationContext.Provider value={memoizedConfiguration}>
				{children}
			</ConfigurationContext.Provider>
		)
	}

export const Head: FC<PropTypes> =
	({ pageTitle, children }) => {
		const configuration = useContext(ConfigurationContext)

		useEffect(() => {
			setHead(configuration)({ pageTitle })
			configuration.onPageTitleChange(({ pageTitle }))
			return () => {
				setHead(configuration)({ pageTitle: null })
				configuration.onPageTitleChange(({ pageTitle: null }))
			}
		}, [pageTitle])

		return (
			<Fragment>
				{children}
			</Fragment>
		)
	}

export {
	defaultParseTitleFunction,

	PageTitle as HeadPageTitle,
	TitleOptions as HeadTitleOptions,
	Configuration as HeadConfiguration,
	PageTitleOptions as HeadPageTitleOptions,
	OnPageTitleChange as HeadOnPageTitleChange,
	ConfigurationOptions as HeadConfigurationOptions,

	ParseTitleFunction as HeadParseTitleFunction,
	ParseTitleFunctionOptions as HeadParseTitleFunctionOptions,

	PropTypes as HeadPropTypes,
	ProviderPropTypes as HeadProviderPropTypes,
}