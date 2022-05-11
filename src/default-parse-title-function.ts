import { ParseTitleFunction } from "./types"

const defaultParseTitleFunction: ParseTitleFunction =
	({ title, pageTitle }) =>
		`${pageTitle} - ${title}`

export default defaultParseTitleFunction