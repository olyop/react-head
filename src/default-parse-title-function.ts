import { ParseTitleFunction } from "./types"

const defaultParseTitleFunction: ParseTitleFunction =
	({ title, pageTitle }) => {
		if (pageTitle) {
			return `${pageTitle} - ${title}`
		} else {
			return title
		}
	}

export default defaultParseTitleFunction