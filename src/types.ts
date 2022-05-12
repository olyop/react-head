import { PropsWithChildren } from "react"

export interface TitleOptions {
	title: string,
}

export type PageTitle =
	string | null

export interface PageTitleOptions {
	pageTitle: PageTitle,
}

export type OnPageTitleChange =
	({ pageTitle }: PageTitleOptions) => void

export interface ParseTitleFunctionOptions
	extends TitleOptions, PageTitleOptions {}

export type ParseTitleFunction =
	(parseOptions: ParseTitleFunctionOptions) => string

export interface Configuration
	extends TitleOptions {
	description: string,
	parseTitle: ParseTitleFunction,
	onPageTitleChange: OnPageTitleChange,
}

export interface ConfigurationOptions {
	configuration: Configuration,
}

export type ProviderPropTypes =
	PropsWithChildren<ConfigurationOptions>

export type PropTypes =
	PropsWithChildren<PageTitleOptions>