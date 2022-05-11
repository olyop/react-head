import { createContext } from "react"

import { Configuration } from "./types"

const ConfigurationContext =
	createContext<Configuration>(undefined!)

export default ConfigurationContext